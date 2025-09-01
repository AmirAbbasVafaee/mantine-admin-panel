"use client"

import { Modal, Button, Stack, Alert, Group } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { User, UserFormData } from '@/types/user'
import { UserForm } from '@/components/forms/UserForm'

interface UserModalProps {
  opened: boolean
  onClose: () => void
  user?: User | null
  formData: UserFormData
  onFormChange: (data: UserFormData) => void
  onSubmit: () => void
  onDelete?: () => void
  loading: boolean
  errors?: Record<string, string>
  mode: 'add' | 'edit' | 'view' | 'delete'
}

export function UserModal({
  opened,
  onClose,
  user,
  formData,
  onFormChange,
  onSubmit,
  onDelete,
  loading,
  errors,
  mode
}: UserModalProps) {
  const getTitle = () => {
    switch (mode) {
      case 'add': return 'افزودن کاربر جدید'
      case 'edit': return 'ویرایش کاربر'
      case 'view': return 'مشاهده کاربر'
      case 'delete': return 'حذف کاربر'
      default: return 'کاربر'
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
            آیا از حذف کاربر "{user?.name}" اطمینان دارید؟ این عملیات قابل بازگشت نیست.
          </Alert>
          
          <Stack gap="sm">
            <div>
              <strong>نام:</strong> {user?.name}
            </div>
            <div>
              <strong>ایمیل:</strong> {user?.email}
            </div>
            <div>
              <strong>نقش:</strong> {user?.role}
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
            <strong>نام:</strong> {user?.name}
          </div>
          <div>
            <strong>ایمیل:</strong> {user?.email}
          </div>
          <div>
            <strong>تلفن:</strong> {user?.phone}
          </div>
          <div>
            <strong>نقش:</strong> {user?.role}
          </div>
          <div>
            <strong>وضعیت:</strong> {user?.status}
          </div>
          <div>
            <strong>تاریخ عضویت:</strong> {user?.createdAt}
          </div>
          <div>
            <strong>آخرین ورود:</strong> {user?.lastLogin || '-'}
          </div>
          
          <Group justify="flex-end">
            <Button variant="light" onClick={onClose}>
              بستن
            </Button>
          </Group>
        </Stack>
      ) : (
        <Stack gap="lg">
          <UserForm
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
