"use client"

import { useState } from 'react'
import { Stack, Card, Pagination, Alert } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { Order, OrderFormData } from '@/types/order'
import { useOrders } from '@/hooks/useOrders'
import { PageHeader } from '@/components/common/PageHeader'
import { SearchAndFilter } from '@/components/common/SearchAndFilter'
import { OrdersTable } from '@/components/tables/OrdersTable'
import { OrderModal } from '@/components/modals/OrderModal'

export function OrdersPage() {
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

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view' | 'delete'>('add')
  const [modalOpened, setModalOpened] = useState(false)
  const [formData, setFormData] = useState<OrderFormData>({
    customer: '',
    email: '',
    products: '',
    amount: '',
    status: 'pending',
    paymentMethod: 'online',
    shippingAddress: ''
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const itemsPerPage = 10
  const totalPages = Math.ceil(orders.length / itemsPerPage)
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleAddOrder = () => {
    setFormData({
      customer: '',
      email: '',
      products: '',
      amount: '',
      status: 'pending',
      paymentMethod: 'online',
      shippingAddress: ''
    })
    setFormErrors({})
    setModalMode('add')
    setModalOpened(true)
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
    setSelectedOrder(order)
    setModalMode('edit')
    setModalOpened(true)
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setModalMode('view')
    setModalOpened(true)
  }

  const handleDeleteOrder = (order: Order) => {
    setSelectedOrder(order)
    setModalMode('delete')
    setModalOpened(true)
  }

  const handleSubmit = async () => {
    const errors = validateForm(formData)
    setFormErrors(errors)

    if (Object.keys(errors).length > 0) {
      return
    }

    let result
    if (modalMode === 'add') {
      result = await addOrder(formData)
    } else if (modalMode === 'edit' && selectedOrder) {
      result = await updateOrder(selectedOrder.id, formData)
    }

    if (result?.success) {
      setModalOpened(false)
      setFormErrors({})
    }
  }

  const handleConfirmDelete = async () => {
    if (selectedOrder) {
      const result = await deleteOrder(selectedOrder.id)
      if (result?.success) {
        setModalOpened(false)
      }
    }
  }

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      statusFilter: null,
      dateFilter: null
    })
  }

  const filterOptions = [
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
  ]

  return (
    <Stack gap="lg">
      <PageHeader
        title="مدیریت سفارشات"
        description="مدیریت و پیگیری سفارشات مشتریان"
        actionLabel="افزودن سفارش"
        onAction={handleAddOrder}
      />

      <SearchAndFilter
        searchQuery={filters.searchQuery}
        onSearchChange={(value) => setFilters(prev => ({ ...prev, searchQuery: value }))}
        filters={filterOptions}
        onReset={handleResetFilters}
        searchPlaceholder="جستجو در شماره سفارش، نام مشتری یا ایمیل..."
      />

      {orders.length === 0 ? (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="هیچ سفارشی یافت نشد"
          color="blue"
        >
          سفارشی با فیلترهای انتخاب شده یافت نشد. لطفاً فیلترها را تغییر دهید یا سفارش جدیدی اضافه کنید.
        </Alert>
      ) : (
        <Card padding="lg" radius="md" withBorder>
          <OrdersTable
            orders={paginatedOrders}
            onView={handleViewOrder}
            onEdit={handleEditOrder}
            onDelete={handleDeleteOrder}
          />
          
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <Pagination
                total={totalPages}
                value={currentPage}
                onChange={setCurrentPage}
                withEdges
              />
            </div>
          )}
        </Card>
      )}

      <OrderModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        order={selectedOrder}
        formData={formData}
        onFormChange={setFormData}
        onSubmit={handleSubmit}
        onDelete={handleConfirmDelete}
        loading={loading}
        errors={formErrors}
        mode={modalMode}
      />
    </Stack>
  )
}
