"use client"

import { useState, useMemo } from 'react'
import { Table, Group, ActionIcon, Badge, Avatar, Text, Box } from '@mantine/core'
import { IconEye, IconEdit, IconTrash } from '@tabler/icons-react'
import { User } from '@/types/user'
import { getStatusBadge, getRoleBadge } from '@/utils/formatting'
import { useResponsive } from '@/hooks/useResponsive'
import { TablePagination } from '@/components/common/TablePagination'

interface UsersTableProps {
  users: User[]
  onView: (user: User) => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

export function UsersTable({ users, onView, onEdit, onDelete }: UsersTableProps) {
  const { isMobile } = useResponsive()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Calculate paginated data
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return users.slice(startIndex, endIndex)
  }, [users, currentPage, pageSize])

  // Reset to first page when page size changes
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setCurrentPage(1)
  }

  // Reset to first page when users array changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Box>
      {/* Table */}
      <Box 
        style={{ 
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: '-ms-autohiding-scrollbar'
        }}
      >
        <Table style={{ minWidth: isMobile ? 850 : 'auto' }}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>کاربر</Table.Th>
              <Table.Th>ایمیل</Table.Th>
              <Table.Th>تلفن</Table.Th>
              <Table.Th>نقش</Table.Th>
              <Table.Th>وضعیت</Table.Th>
              <Table.Th>تاریخ عضویت</Table.Th>
              <Table.Th>آخرین ورود</Table.Th>
              <Table.Th>عملیات</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedUsers.map((user) => {
              const statusBadge = getStatusBadge(user.status)
              const roleBadge = getRoleBadge(user.role)
              
              return (
                <Table.Tr key={user.id}>
                  <Table.Td>
                    <Group gap="sm">
                      <Avatar size="md" radius="xl">
                        {user.name.charAt(0)}
                      </Avatar>
                      <div>
                        <Text fw={500}>{user.name}</Text>
                      </div>
                    </Group>
                  </Table.Td>
                  <Table.Td>{user.email}</Table.Td>
                  <Table.Td>{user.phone}</Table.Td>
                  <Table.Td>
                    <Badge color={roleBadge.color} variant="light">
                      {roleBadge.label}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge color={statusBadge.color} variant="light">
                      {statusBadge.label}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{user.createdAt}</Table.Td>
                  <Table.Td>{user.lastLogin || '-'}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon
                        variant="light"
                        size="sm"
                        onClick={() => onView(user)}
                        title="مشاهده"
                      >
                        <IconEye size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="light"
                        size="sm"
                        onClick={() => onEdit(user)}
                        title="ویرایش"
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="light"
                        size="sm"
                        color="red"
                        onClick={() => onDelete(user)}
                        title="حذف"
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              )
            })}
          </Table.Tbody>
        </Table>
      </Box>

      {/* Pagination */}
      <TablePagination
        total={users.length}
        page={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </Box>
  )
}
