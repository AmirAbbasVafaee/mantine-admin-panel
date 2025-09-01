import { useState, useCallback } from 'react'
import { Order, OrderFormData, OrderFilters } from '@/types/order'
import { orders as initialOrders } from '@/data/orders'
import { validateOrderForm } from '@/utils/validation'

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<OrderFilters>({
    searchQuery: '',
    statusFilter: null,
    dateFilter: null,
  })

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.customer.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         order.email.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         order.id.includes(filters.searchQuery)
    const matchesStatus = !filters.statusFilter || order.status === filters.statusFilter
    const matchesDate = !filters.dateFilter || order.date === filters.dateFilter
    return matchesSearch && matchesStatus && matchesDate
  })

  const addOrder = useCallback(async (orderData: OrderFormData) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newOrder: Order = {
        id: `#${Math.floor(Math.random() * 9000) + 1000}`,
        customer: orderData.customer,
        email: orderData.email,
        phone: '۰۹۱۲۳۴۵۶۷۸۹', // Mock phone
        products: orderData.products.split(',').map(p => p.trim()),
        amount: orderData.amount,
        status: orderData.status,
        date: new Date().toLocaleDateString('fa-IR'),
        paymentMethod: orderData.paymentMethod,
        shippingAddress: orderData.shippingAddress,
        trackingNumber: `TRK-${Math.floor(Math.random() * 900000000) + 100000000}`,
      }
      
      setOrders(prev => [...prev, newOrder])
      return { success: true }
    } catch {
      return { success: false, error: 'خطا در افزودن سفارش' }
    } finally {
      setLoading(false)
    }
  }, [])

  const updateOrder = useCallback(async (id: string, orderData: OrderFormData) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setOrders(prev => prev.map(order => 
        order.id === id 
          ? { 
              ...order, 
              customer: orderData.customer,
              email: orderData.email,
              products: orderData.products.split(',').map(p => p.trim()),
              amount: orderData.amount,
              status: orderData.status,
              paymentMethod: orderData.paymentMethod,
              shippingAddress: orderData.shippingAddress,
            }
          : order
      ))
      return { success: true }
    } catch {
      return { success: false, error: 'خطا در بروزرسانی سفارش' }
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteOrder = useCallback(async (id: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setOrders(prev => prev.filter(order => order.id !== id))
      return { success: true }
    } catch {
      return { success: false, error: 'خطا در حذف سفارش' }
    } finally {
      setLoading(false)
    }
  }, [])

  const validateForm = useCallback((data: OrderFormData) => {
    return validateOrderForm(data)
  }, [])

  return {
    orders: filteredOrders,
    loading,
    filters,
    setFilters,
    addOrder,
    updateOrder,
    deleteOrder,
    validateForm,
  }
}
