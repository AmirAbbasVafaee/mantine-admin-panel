"use client"

import { useState } from 'react'
import { Container, Stack } from '@mantine/core'
import { PageHeader } from '@/components/common/PageHeader'
import { SearchAndFilter } from '@/components/common/SearchAndFilter'
import { OrdersTable } from '@/components/tables/OrdersTable'
import { OrderModal } from '@/components/modals/OrderModal'
import { useOrders } from '@/hooks/useOrders'
import { Order, OrderFormData } from '@/types/order'
import { useTheme } from '@/contexts/ThemeContext'

export function OrdersPage() {
  const { isDark } = useTheme()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view' | 'delete'>('add')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [formData, setFormData] = useState<OrderFormData>({
    customer: '',
    email: '',
    products: '',
    amount: '',
    status: 'pending',
    paymentMethod: 'cash',
    shippingAddress: ''
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  
  const {
    orders,
    loading,
    filters,
    setFilters,
    addOrder,
    updateOrder,
    deleteOrder,
    validateForm
  } = useOrders()

  const handleAddOrder = () => {
    setFormData({
      customer: '',
      email: '',
      products: '',
      amount: '',
      status: 'pending',
      paymentMethod: 'cash',
      shippingAddress: ''
    })
    setFormErrors({})
    setModalMode('add')
    setSelectedOrder(null)
    setIsModalOpen(true)
  }

  const handleEditOrder = (order: Order) => {
    setFormData({
      customer: order.customer,
      email: order.email,
      products: order.products.join(', '),
      amount: order.amount,
      status: order.status,
      paymentMethod: order.paymentMethod as OrderFormData['paymentMethod'],
      shippingAddress: order.shippingAddress
    })
    setFormErrors({})
    setModalMode('edit')
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const handleViewOrder = (order: Order) => {
    setModalMode('view')
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const handleDeleteOrder = (order: Order) => {
    setModalMode('delete')
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedOrder(null)
    setFormErrors({})
  }

  const handleFormSubmit = async () => {
    const errors = validateForm(formData)
    setFormErrors(errors)

    if (Object.keys(errors).length > 0) {
      return
    }

    if (modalMode === 'add') {
      await addOrder(formData)
    } else if (modalMode === 'edit' && selectedOrder) {
      await updateOrder(selectedOrder.id, formData)
    }
    handleModalClose()
  }

  const handleDeleteConfirm = async () => {
    if (selectedOrder) {
      await deleteOrder(selectedOrder.id)
      handleModalClose()
    }
  }

  return (
    <Container size="xl" py="md" px={isDark ? "xs" : "md"}>
      <Stack gap="lg">
        <PageHeader
          title="مدیریت سفارشات"
          description="مدیریت سفارشات مشتریان و پیگیری وضعیت ارسال"
          actionLabel="افزودن سفارش جدید"
          onAction={handleAddOrder}
        />

        <SearchAndFilter
          searchQuery={filters.searchQuery}
          onSearchChange={(value) => setFilters(prev => ({ ...prev, searchQuery: value }))}
          filters={[
            {
              key: 'status',
              label: 'وضعیت',
              value: filters.statusFilter,
              onChange: (value: string | null) => setFilters(prev => ({ ...prev, statusFilter: value })),
              data: [
                { value: 'pending', label: 'در انتظار' },
                { value: 'processing', label: 'در حال پردازش' },
                { value: 'shipped', label: 'ارسال شده' },
                { value: 'completed', label: 'تکمیل شده' },
                { value: 'cancelled', label: 'لغو شده' }
              ]
            },
            {
              key: 'date',
              label: 'تاریخ',
              value: filters.dateFilter,
              onChange: (value: string | null) => setFilters(prev => ({ ...prev, dateFilter: value })),
              data: [
                { value: '۱۴۰۲/۱۲/۱۵', label: '۱۴۰۲/۱۲/۱۵' },
                { value: '۱۴۰۲/۱۲/۱۴', label: '۱۴۰۲/۱۲/۱۴' },
                { value: '۱۴۰۲/۱۲/۱۳', label: '۱۴۰۲/۱۲/۱۳' },
                { value: '۱۴۰۲/۱۲/۱۲', label: '۱۴۰۲/۱۲/۱۲' },
                { value: '۱۴۰۲/۱۲/۱۱', label: '۱۴۰۲/۱۲/۱۱' }
              ]
            }
          ]}
          onReset={() => setFilters({ searchQuery: '', statusFilter: null, dateFilter: null })}
          searchPlaceholder="جستجو در سفارشات..."
        />

        <OrdersTable
          orders={orders}
          onEdit={handleEditOrder}
          onView={handleViewOrder}
          onDelete={handleDeleteOrder}
        />

        <OrderModal
          opened={isModalOpen}
          onClose={handleModalClose}
          mode={modalMode}
          order={selectedOrder}
          formData={formData}
          onFormChange={setFormData}
          onSubmit={handleFormSubmit}
          onDelete={handleDeleteConfirm}
          loading={loading}
          errors={formErrors}
        />
      </Stack>
    </Container>
  )
}
