"use client"

import { useState } from 'react'
import { Stack, Card, Pagination, Alert } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { User, UserFormData } from '@/types/user'
import { useUsers } from '@/hooks/useUsers'
import { PageHeader } from '@/components/common/PageHeader'
import { SearchAndFilter } from '@/components/common/SearchAndFilter'
import { UsersTable } from '@/components/tables/UsersTable'
import { UserModal } from '@/components/modals/UserModal'

export function UsersPage() {
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

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view' | 'delete'>('add')
  const [modalOpened, setModalOpened] = useState(false)
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    status: 'active'
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const itemsPerPage = 10
  const totalPages = Math.ceil(users.length / itemsPerPage)
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

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
    setModalOpened(true)
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
    setSelectedUser(user)
    setModalMode('edit')
    setModalOpened(true)
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setModalMode('view')
    setModalOpened(true)
  }

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user)
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
      result = await addUser(formData)
    } else if (modalMode === 'edit' && selectedUser) {
      result = await updateUser(selectedUser.id, formData)
    }

    if (result?.success) {
      setModalOpened(false)
      setFormErrors({})
    }
  }

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      const result = await deleteUser(selectedUser.id)
      if (result?.success) {
        setModalOpened(false)
      }
    }
  }

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      statusFilter: null,
      roleFilter: null
    })
  }

  const filterOptions = [
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
  ]

  return (
    <Stack gap="lg">
      <PageHeader
        title="مدیریت کاربران"
        description="مدیریت کاربران سیستم و تنظیمات دسترسی"
        actionLabel="افزودن کاربر"
        onAction={handleAddUser}
      />

      <SearchAndFilter
        searchQuery={filters.searchQuery}
        onSearchChange={(value) => setFilters(prev => ({ ...prev, searchQuery: value }))}
        filters={filterOptions}
        onReset={handleResetFilters}
        searchPlaceholder="جستجو در نام، ایمیل یا شماره تلفن..."
      />

      {users.length === 0 ? (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="هیچ کاربری یافت نشد"
          color="blue"
        >
          کاربری با فیلترهای انتخاب شده یافت نشد. لطفاً فیلترها را تغییر دهید یا کاربر جدیدی اضافه کنید.
        </Alert>
      ) : (
        <Card padding="lg" radius="md" withBorder>
          <UsersTable
            users={paginatedUsers}
            onView={handleViewUser}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
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

      <UserModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        user={selectedUser}
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
