"use client"

import { Modal, Button, Stack, Alert, Group } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { Order, OrderFormData } from '@/types/order'
import { OrderForm } from '@/components/forms/OrderForm'

interface OrderModalProps {
  opened: boolean
  onClose: () => void
  order?: Order | null
  formData: OrderFormData
  onFormChange: (data: OrderFormData) => void
  onSubmit: () => void
  onDelete?: () => void
  loading: boolean
  errors?: Record<string, string>
  mode: 'add' | 'edit' | 'view' | 'delete'
}

export function OrderModal({
  opened,
  onClose,
  order,
  formData,
  onFormChange,
  onSubmit,
  onDelete,
  loading,
  errors,
  mode
}: OrderModalProps) {
  const getTitle = () => {
    switch (mode) {
      case 'add': return 'افزودن سفارش جدید'
      case 'edit': return 'ویرایش سفارش'
      case 'view': return 'مشاهده سفارش'
      case 'delete': return 'حذف سفارش'
      default: return 'سفارش'
    }
  }

  const getSubmitLabel = () => {
    switch (mode) {
      case 'add': return 'افزودن'
      case 'edit': return 'بروزرسانی'
      case 'delete': return 'حذف'
      default: return 'تایید'
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={getTitle()}
      size="lg"
      centered
    >
      {mode === 'delete' ? (
        <Stack gap="lg">
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="تایید حذف"
            color="red"
          >
            آیا از حذف سفارش "{order?.id}" اطمینان دارید؟ این عملیات قابل بازگشت نیست.
          </Alert>
          
          <Stack gap="sm">
            <div>
              <strong>شماره سفارش:</strong> {order?.id}
            </div>
            <div>
              <strong>مشتری:</strong> {order?.customer}
            </div>
            <div>
              <strong>مبلغ:</strong> {order?.amount} تومان
            </div>
          </Stack>
          
          <Group justify="flex-end" gap="sm">
            <Button variant="light" onClick={onClose}>
              انصراف
            </Button>
            <Button
              color="red"
              onClick={onDelete}
              loading={loading}
            >
              {getSubmitLabel()}
            </Button>
          </Group>
        </Stack>
      ) : mode === 'view' ? (
        <Stack gap="lg">
          <div>
            <strong>شماره سفارش:</strong> {order?.id}
          </div>
          <div>
            <strong>مشتری:</strong> {order?.customer}
          </div>
          <div>
            <strong>ایمیل:</strong> {order?.email}
          </div>
          <div>
            <strong>تلفن:</strong> {order?.phone}
          </div>
          <div>
            <strong>محصولات:</strong> {order?.products.join(', ')}
          </div>
          <div>
            <strong>مبلغ:</strong> {order?.amount} تومان
          </div>
          <div>
            <strong>وضعیت:</strong> {order?.status}
          </div>
          <div>
            <strong>تاریخ:</strong> {order?.date}
          </div>
          <div>
            <strong>روش پرداخت:</strong> {order?.paymentMethod}
          </div>
          <div>
            <strong>آدرس ارسال:</strong> {order?.shippingAddress}
          </div>
          {order?.trackingNumber && (
            <div>
              <strong>شماره پیگیری:</strong> {order.trackingNumber}
            </div>
          )}
          {order?.notes && (
            <div>
              <strong>یادداشت:</strong> {order.notes}
            </div>
          )}
          
          <Group justify="flex-end">
            <Button variant="light" onClick={onClose}>
              بستن
            </Button>
          </Group>
        </Stack>
      ) : (
        <Stack gap="lg">
          <OrderForm
            data={formData}
            onChange={onFormChange}
            errors={errors}
          />
          
          <Group justify="flex-end" gap="sm">
            <Button variant="light" onClick={onClose}>
              انصراف
            </Button>
            <Button
              onClick={onSubmit}
              loading={loading}
            >
              {getSubmitLabel()}
            </Button>
          </Group>
        </Stack>
      )}
    </Modal>
  )
}
