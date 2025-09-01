"use client"

import { Table, Group, ActionIcon, Badge, Text } from '@mantine/core'
import { IconEye, IconEdit, IconTrash } from '@tabler/icons-react'
import { Order } from '@/types/order'
import { getStatusBadge } from '@/utils/formatting'

interface OrdersTableProps {
  orders: Order[]
  onView: (order: Order) => void
  onEdit: (order: Order) => void
  onDelete: (order: Order) => void
}

export function OrdersTable({ orders, onView, onEdit, onDelete }: OrdersTableProps) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>شماره سفارش</Table.Th>
          <Table.Th>مشتری</Table.Th>
          <Table.Th>محصولات</Table.Th>
          <Table.Th>مبلغ</Table.Th>
          <Table.Th>وضعیت</Table.Th>
          <Table.Th>تاریخ</Table.Th>
          <Table.Th>روش پرداخت</Table.Th>
          <Table.Th>عملیات</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {orders.map((order) => {
          const statusBadge = getStatusBadge(order.status)
          
          return (
            <Table.Tr key={order.id}>
              <Table.Td>
                <Text fw={500}>{order.id}</Text>
              </Table.Td>
              <Table.Td>
                <div>
                  <Text fw={500}>{order.customer}</Text>
                  <Text size="sm" c="dimmed">{order.email}</Text>
                </div>
              </Table.Td>
              <Table.Td>
                <Text size="sm">
                  {order.products.slice(0, 2).join(', ')}
                  {order.products.length > 2 && ` +${order.products.length - 2} مورد دیگر`}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text fw={500}>{order.amount} تومان</Text>
              </Table.Td>
              <Table.Td>
                <Badge color={statusBadge.color} variant="light">
                  {statusBadge.label}
                </Badge>
              </Table.Td>
              <Table.Td>{order.date}</Table.Td>
              <Table.Td>
                <Text size="sm">{order.paymentMethod}</Text>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon
                    variant="light"
                    size="sm"
                    onClick={() => onView(order)}
                    title="مشاهده"
                  >
                    <IconEye size={16} />
                  </ActionIcon>
                  <ActionIcon
                    variant="light"
                    size="sm"
                    onClick={() => onEdit(order)}
                    title="ویرایش"
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon
                    variant="light"
                    size="sm"
                    color="red"
                    onClick={() => onDelete(order)}
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
