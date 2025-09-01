"use client"

import { TextInput, Select, Textarea, Stack } from '@mantine/core'
import { OrderFormData } from '@/types/order'

interface OrderFormProps {
  data: OrderFormData
  onChange: (data: OrderFormData) => void
  errors?: Record<string, string>
}

export function OrderForm({ data, onChange, errors }: OrderFormProps) {
  const handleChange = (field: keyof OrderFormData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Stack gap="md">
      <TextInput
        label="نام مشتری"
        placeholder="نام کامل مشتری را وارد کنید"
        value={data.customer}
        onChange={(e) => handleChange('customer', e.target.value)}
        error={errors?.customer}
        required
      />
      
      <TextInput
        label="ایمیل"
        placeholder="example@email.com"
        value={data.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors?.email}
        required
      />
      
      <Textarea
        label="محصولات"
        placeholder="محصولات را با کاما جدا کنید"
        value={data.products}
        onChange={(e) => handleChange('products', e.target.value)}
        error={errors?.products}
        required
        minRows={2}
      />
      
      <TextInput
        label="مبلغ (تومان)"
        placeholder="مبلغ سفارش را وارد کنید"
        value={data.amount}
        onChange={(e) => handleChange('amount', e.target.value)}
        error={errors?.amount}
        required
      />
      
      <Select
        label="وضعیت"
        placeholder="وضعیت سفارش را انتخاب کنید"
        value={data.status}
        onChange={(value) => handleChange('status', value as OrderFormData['status'])}
        data={[
          { value: 'pending', label: 'در انتظار' },
          { value: 'processing', label: 'در حال پردازش' },
          { value: 'shipped', label: 'ارسال شده' },
          { value: 'completed', label: 'تکمیل شده' },
          { value: 'cancelled', label: 'لغو شده' },
        ]}
        error={errors?.status}
        required
      />
      
      <Select
        label="روش پرداخت"
        placeholder="روش پرداخت را انتخاب کنید"
        value={data.paymentMethod}
        onChange={(value) => handleChange('paymentMethod', value as OrderFormData['paymentMethod'])}
        data={[
          { value: 'online', label: 'پرداخت آنلاین' },
          { value: 'card', label: 'کارت اعتباری' },
          { value: 'cash', label: 'نقدی' },
        ]}
        error={errors?.paymentMethod}
        required
      />
      
      <Textarea
        label="آدرس ارسال"
        placeholder="آدرس کامل ارسال را وارد کنید"
        value={data.shippingAddress}
        onChange={(e) => handleChange('shippingAddress', e.target.value)}
        error={errors?.shippingAddress}
        required
        minRows={3}
      />
    </Stack>
  )
}
