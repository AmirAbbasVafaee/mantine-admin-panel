"use client"

import { TextInput, Select, Textarea, NumberInput, Stack } from '@mantine/core'
import { ProductFormData } from '@/types/product'

interface ProductFormProps {
  data: ProductFormData
  onChange: (data: ProductFormData) => void
  errors?: Record<string, string>
}

export function ProductForm({ data, onChange, errors }: ProductFormProps) {
  const handleChange = (field: keyof ProductFormData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Stack gap="md">
      <TextInput
        label="نام محصول"
        placeholder="نام کامل محصول را وارد کنید"
        value={data.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors?.name}
        required
      />
      
      <Select
        label="دسته‌بندی"
        placeholder="دسته‌بندی محصول را انتخاب کنید"
        value={data.category}
        onChange={(value) => handleChange('category', value || '')}
        data={[
          { value: 'لپ‌تاپ', label: 'لپ‌تاپ' },
          { value: 'گوشی موبایل', label: 'گوشی موبایل' },
          { value: 'تبلت', label: 'تبلت' },
          { value: 'صوتی', label: 'صوتی' },
          { value: 'پوشیدنی', label: 'پوشیدنی' },
          { value: 'لوازم جانبی', label: 'لوازم جانبی' },
        ]}
        error={errors?.category}
        required
      />
      
      <TextInput
        label="قیمت (تومان)"
        placeholder="قیمت محصول را وارد کنید"
        value={data.price}
        onChange={(e) => handleChange('price', e.target.value)}
        error={errors?.price}
        required
      />
      
      <NumberInput
        label="موجودی"
        placeholder="تعداد موجودی را وارد کنید"
        value={parseInt(data.stock)}
        onChange={(value) => handleChange('stock', value?.toString() || '0')}
        error={errors?.stock}
        min={0}
        required
      />
      
      <Select
        label="وضعیت"
        placeholder="وضعیت محصول را انتخاب کنید"
        value={data.status}
        onChange={(value) => handleChange('status', value as ProductFormData['status'])}
        data={[
          { value: 'available', label: 'موجود' },
          { value: 'low_stock', label: 'موجودی کم' },
          { value: 'out_of_stock', label: 'ناموجود' },
        ]}
        error={errors?.status}
        required
      />
      
      <TextInput
        label="کد محصول (SKU)"
        placeholder="کد منحصر به فرد محصول"
        value={data.sku}
        onChange={(e) => handleChange('sku', e.target.value)}
        error={errors?.sku}
        required
      />
      
      <Textarea
        label="توضیحات"
        placeholder="توضیحات کامل محصول را وارد کنید"
        value={data.description}
        onChange={(e) => handleChange('description', e.target.value)}
        error={errors?.description}
        minRows={3}
      />
    </Stack>
  )
}
