"use client"

import { Table, Group, ActionIcon, Badge, Text, Avatar } from '@mantine/core'
import { IconEye, IconEdit, IconTrash } from '@tabler/icons-react'
import { Product } from '@/types/product'
import { getStatusBadge } from '@/utils/formatting'

interface ProductsTableProps {
  products: Product[]
  onView: (product: Product) => void
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export function ProductsTable({ products, onView, onEdit, onDelete }: ProductsTableProps) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>محصول</Table.Th>
          <Table.Th>دسته‌بندی</Table.Th>
          <Table.Th>قیمت</Table.Th>
          <Table.Th>موجودی</Table.Th>
          <Table.Th>وضعیت</Table.Th>
          <Table.Th>فروش</Table.Th>
          <Table.Th>امتیاز</Table.Th>
          <Table.Th>کد محصول</Table.Th>
          <Table.Th>عملیات</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {products.map((product) => {
          const statusBadge = getStatusBadge(product.status)
          
          return (
            <Table.Tr key={product.id}>
              <Table.Td>
                <Group gap="sm">
                  <Avatar size="md" radius="md">
                    {product.name.charAt(0)}
                  </Avatar>
                  <div>
                    <Text fw={500}>{product.name}</Text>
                    <Text size="sm" c="dimmed" lineClamp={1}>
                      {product.description}
                    </Text>
                  </div>
                </Group>
              </Table.Td>
              <Table.Td>
                <Text size="sm">{product.category}</Text>
              </Table.Td>
              <Table.Td>
                <Text fw={500}>{product.price} تومان</Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm">{product.stock} عدد</Text>
              </Table.Td>
              <Table.Td>
                <Badge color={statusBadge.color} variant="light">
                  {statusBadge.label}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Text size="sm">{product.sales} فروش</Text>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <Text size="sm">{product.rating}</Text>
                  <Text size="sm" c="yellow">★</Text>
                </Group>
              </Table.Td>
              <Table.Td>
                <Text size="sm" fw={500}>{product.sku}</Text>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon
                    variant="light"
                    size="sm"
                    onClick={() => onView(product)}
                    title="مشاهده"
                  >
                    <IconEye size={16} />
                  </ActionIcon>
                  <ActionIcon
                    variant="light"
                    size="sm"
                    onClick={() => onEdit(product)}
                    title="ویرایش"
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon
                    variant="light"
                    size="sm"
                    color="red"
                    onClick={() => onDelete(product)}
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
