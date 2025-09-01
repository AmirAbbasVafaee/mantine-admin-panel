"use client"

import { Table, Group, ActionIcon, Badge, Avatar, Text } from '@mantine/core'
import { IconEye, IconEdit, IconTrash } from '@tabler/icons-react'
import { User } from '@/types/user'
import { getStatusBadge, getRoleBadge } from '@/utils/formatting'

interface UsersTableProps {
  users: User[]
  onView: (user: User) => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

export function UsersTable({ users, onView, onEdit, onDelete }: UsersTableProps) {
  return (
    <Table>
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
        {users.map((user) => {
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
  )
}
