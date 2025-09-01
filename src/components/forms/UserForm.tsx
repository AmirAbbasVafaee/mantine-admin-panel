"use client"

import { TextInput, Select, Stack } from '@mantine/core'
import { UserFormData } from '@/types/user'

interface UserFormProps {
  data: UserFormData
  onChange: (data: UserFormData) => void
  errors?: Record<string, string>
}

export function UserForm({ data, onChange, errors }: UserFormProps) {
  const handleChange = (field: keyof UserFormData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Stack gap="md">
      <TextInput
        label="نام کاربر"
        placeholder="نام کامل کاربر را وارد کنید"
        value={data.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors?.name}
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
      
      <TextInput
        label="شماره تلفن"
        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
        value={data.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
        error={errors?.phone}
        required
      />
      
      <Select
        label="نقش"
        placeholder="نقش کاربر را انتخاب کنید"
        value={data.role}
        onChange={(value) => handleChange('role', value as UserFormData['role'])}
        data={[
          { value: 'admin', label: 'مدیر' },
          { value: 'moderator', label: 'ناظر' },
          { value: 'user', label: 'کاربر' },
        ]}
        error={errors?.role}
        required
      />
      
      <Select
        label="وضعیت"
        placeholder="وضعیت کاربر را انتخاب کنید"
        value={data.status}
        onChange={(value) => handleChange('status', value as UserFormData['status'])}
        data={[
          { value: 'active', label: 'فعال' },
          { value: 'inactive', label: 'غیرفعال' },
          { value: 'suspended', label: 'معلق' },
        ]}
        error={errors?.status}
        required
      />
    </Stack>
  )
}
