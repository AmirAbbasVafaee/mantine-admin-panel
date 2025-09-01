"use client"

import { Modal, Button, Stack, Alert, Group } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { Product, ProductFormData } from '@/types/product'
import { ProductForm } from '@/components/forms/ProductForm'

interface ProductModalProps {
  opened: boolean
  onClose: () => void
  product?: Product | null
  formData: ProductFormData
  onFormChange: (data: ProductFormData) => void
  onSubmit: () => void
  onDelete?: () => void
  loading: boolean
  errors?: Record<string, string>
  mode: 'add' | 'edit' | 'view' | 'delete'
}

export function ProductModal({
  opened,
  onClose,
  product,
  formData,
  onFormChange,
  onSubmit,
  onDelete,
  loading,
  errors,
  mode
}: ProductModalProps) {
  const getTitle = () => {
    switch (mode) {
      case 'add': return 'افزودن محصول جدید'
      case 'edit': return 'ویرایش محصول'
      case 'view': return 'مشاهده محصول'
      case 'delete': return 'حذف محصول'
      default: return 'محصول'
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
            آیا از حذف محصول "{product?.name}" اطمینان دارید؟ این عملیات قابل بازگشت نیست.
          </Alert>
          
          <Stack gap="sm">
            <div>
              <strong>نام محصول:</strong> {product?.name}
            </div>
            <div>
              <strong>کد محصول:</strong> {product?.sku}
            </div>
            <div>
              <strong>قیمت:</strong> {product?.price} تومان
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
            <strong>نام محصول:</strong> {product?.name}
          </div>
          <div>
            <strong>دسته‌بندی:</strong> {product?.category}
          </div>
          <div>
            <strong>قیمت:</strong> {product?.price} تومان
          </div>
          <div>
            <strong>موجودی:</strong> {product?.stock} عدد
          </div>
          <div>
            <strong>وضعیت:</strong> {product?.status}
          </div>
          <div>
            <strong>فروش:</strong> {product?.sales} فروش
          </div>
          <div>
            <strong>امتیاز:</strong> {product?.rating} از ۵
          </div>
          <div>
            <strong>کد محصول:</strong> {product?.sku}
          </div>
          <div>
            <strong>توضیحات:</strong> {product?.description}
          </div>
          <div>
            <strong>وزن:</strong> {product?.weight}
          </div>
          <div>
            <strong>ابعاد:</strong> {product?.dimensions}
          </div>
          <div>
            <strong>گارانتی:</strong> {product?.warranty}
          </div>
          
          <Group justify="flex-end">
            <Button variant="light" onClick={onClose}>
              بستن
            </Button>
          </Group>
        </Stack>
      ) : (
        <Stack gap="lg">
          <ProductForm
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
