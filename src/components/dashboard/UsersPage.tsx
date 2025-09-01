"use client"

import { useState } from 'react'
import { Container, Title, Text, Group, Button, Stack, Box } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { PageHeader } from '@/components/common/PageHeader'
import { SearchAndFilter } from '@/components/common/SearchAndFilter'
import { UsersTable } from '@/components/tables/UsersTable'
import { UserModal } from '@/components/modals/UserModal'
import { useUsers } from '@/hooks/useUsers'
import { User, UserFormData } from '@/types/user'
import { useTheme } from '@/contexts/ThemeContext'

export function UsersPage() {
  const { isDark } = useTheme()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view' | 'delete'>('add')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    status: 'active'
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  
  const {
    users,
    loading,
    filters,
    setFilters,
    addUser,
    updateUser,
    deleteUser,
    validateForm
  } = useUsers()

  const handleAddUser = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'user',
      status: 'active'
    })
    setFormErrors({})
    setModalMode('add')
    setSelectedUser(null)
    setIsModalOpen(true)
  }

  const handleEditUser = (user: User) => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status
    })
    setFormErrors({})
    setModalMode('edit')
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleViewUser = (user: User) => {
    setModalMode('view')
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleDeleteUser = (user: User) => {
    setModalMode('delete')
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
    setFormErrors({})
  }

  const handleFormSubmit = async () => {
    const errors = validateForm(formData)
    setFormErrors(errors)

    if (Object.keys(errors).length > 0) {
      return
    }

    if (modalMode === 'add') {
      await addUser(formData)
    } else if (modalMode === 'edit' && selectedUser) {
      await updateUser(selectedUser.id, formData)
    }
    handleModalClose()
  }

  const handleDeleteConfirm = async () => {
    if (selectedUser) {
      await deleteUser(selectedUser.id)
      handleModalClose()
    }
  }

  return (
    <Container size="xl" py="md" px={isDark ? "xs" : "md"}>
      <Stack gap="lg">
        <PageHeader
          title="مدیریت کاربران"
          description="افزودن، ویرایش و مدیریت کاربران سیستم"
          actionLabel="افزودن کاربر جدید"
          onAction={handleAddUser}
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
                { value: 'active', label: 'فعال' },
                { value: 'inactive', label: 'غیرفعال' },
                { value: 'suspended', label: 'معلق' }
              ]
            },
            {
              key: 'role',
              label: 'نقش',
              value: filters.roleFilter,
              onChange: (value: string | null) => setFilters(prev => ({ ...prev, roleFilter: value })),
              data: [
                { value: 'admin', label: 'مدیر' },
                { value: 'moderator', label: 'ناظر' },
                { value: 'user', label: 'کاربر' }
              ]
            }
          ]}
          onReset={() => setFilters({ searchQuery: '', statusFilter: null, roleFilter: null })}
          searchPlaceholder="جستجو در کاربران..."
        />

        <UsersTable
          users={users}
          onEdit={handleEditUser}
          onView={handleViewUser}
          onDelete={handleDeleteUser}
        />

        <UserModal
          opened={isModalOpen}
          onClose={handleModalClose}
          mode={modalMode}
          user={selectedUser}
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
