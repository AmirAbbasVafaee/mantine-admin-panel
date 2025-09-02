"use client"

import { useState, useMemo } from 'react'
import { Table, Group, ActionIcon, Badge, Text, Box } from '@mantine/core'
import { IconEye, IconEdit, IconTrash } from '@tabler/icons-react'
import { Order } from '@/types/order'
import { getStatusBadge } from '@/utils/formatting'
import { useResponsive } from '@/hooks/useResponsive'
import { TablePagination } from '@/components/common/TablePagination'

interface OrdersTableProps {
  orders: Order[]
  onView: (order: Order) => void
  onEdit: (order: Order) => void
  onDelete: (order: Order) => void
}

export function OrdersTable({ orders, onView, onEdit, onDelete }: OrdersTableProps) {
  const { isMobile } = useResponsive()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Calculate paginated data
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return orders.slice(startIndex, endIndex)
  }, [orders, currentPage, pageSize])

  // Reset to first page when page size changes
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setCurrentPage(1)
  }

  // Reset to first page when orders array changes
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
        <Table style={{ minWidth: isMobile ? 800 : 'auto' }}>
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
            {paginatedOrders.map((order) => {
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
      </Box>

      {/* Pagination */}
      <TablePagination
        total={orders.length}
        page={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </Box>
  )
}
