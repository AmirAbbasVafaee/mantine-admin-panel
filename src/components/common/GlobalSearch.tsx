"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import {
  TextInput,
  Box,
  Text,
  Group,
  Avatar,
  Badge,
  ActionIcon,
  Stack,
  Divider,
  ScrollArea,
} from '@mantine/core'
import { IconSearch, IconX } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { useUsers } from '@/hooks/useUsers'
import { useProducts } from '@/hooks/useProducts'
import { useOrders } from '@/hooks/useOrders'
import { User } from '@/types/user'
import { Product } from '@/types/product'
import { Order } from '@/types/order'

interface SearchResult {
  type: 'user' | 'product' | 'order'
  id: string | number
  title: string
  subtitle: string
  icon: string
  badge?: { text: string; color: string }
  data: User | Product | Order
}

export function GlobalSearch() {
  const { isDark } = useTheme()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Data hooks
  const { users } = useUsers()
  const { products } = useProducts()
  const { orders } = useOrders()

  // Memoize search results to prevent unnecessary recalculations
  const results = useMemo(() => {
    if (searchQuery.trim().length < 2) {
      return []
    }

    const query = searchQuery.toLowerCase()
    const searchResults: SearchResult[] = []

    // Search users
    users.forEach(user => {
      if (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.includes(query)
      ) {
        searchResults.push({
          type: 'user',
          id: user.id,
          title: user.name,
          subtitle: user.email,
          icon: user.name.charAt(0),
          badge: { text: user.role === 'admin' ? 'مدیر' : user.role === 'moderator' ? 'ناظر' : 'کاربر', color: user.role === 'admin' ? 'red' : user.role === 'moderator' ? 'blue' : 'gray' },
          data: user
        })
      }
    })

    // Search products
    products.forEach(product => {
      if (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query)
      ) {
        searchResults.push({
          type: 'product',
          id: product.id,
          title: product.name,
          subtitle: `${product.category} - ${product.price.toString()} تومان`,
          icon: product.name.charAt(0),
          badge: { text: product.status === 'available' ? 'موجود' : product.status === 'low_stock' ? 'موجودی کم' : 'ناموجود', color: product.status === 'available' ? 'green' : product.status === 'low_stock' ? 'yellow' : 'red' },
          data: product
        })
      }
    })

    // Search orders
    orders.forEach(order => {
      if (
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.email.toLowerCase().includes(query)
      ) {
        searchResults.push({
          type: 'order',
          id: order.id,
          title: `سفارش ${order.id}`,
          subtitle: `${order.customer} - ${order.amount.toString()} تومان`,
          icon: '#',
          badge: { text: order.status === 'completed' ? 'تکمیل شده' : order.status === 'pending' ? 'در انتظار' : order.status === 'processing' ? 'در حال پردازش' : 'ارسال شده', color: order.status === 'completed' ? 'green' : order.status === 'pending' ? 'yellow' : 'blue' },
          data: order
        })
      }
    })

    // Limit results to 10
    return searchResults.slice(0, 10)
  }, [searchQuery, users, products, orders])

  // Update isOpen based on search query length
  useEffect(() => {
    setIsOpen(searchQuery.length >= 2)
  }, [searchQuery])

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleResultClick = useCallback((result: SearchResult) => {
    setIsOpen(false)
    setSearchQuery('')
    
    // Navigate to appropriate page
    switch (result.type) {
      case 'user':
        router.push('/mantine/users')
        break
      case 'product':
        router.push('/mantine/products')
        break
      case 'order':
        router.push('/mantine/orders')
        break
    }
  }, [router])

  const clearSearch = useCallback(() => {
    setSearchQuery('')
    setIsOpen(false)
  }, [])

  return (
    <Box ref={searchRef} style={{ position: 'relative' }}>
      <TextInput
        placeholder="جستجو..."
        leftSection={<IconSearch size={16} />}
        rightSection={
          searchQuery && (
            <ActionIcon
              variant="subtle"
              size="sm"
              onClick={clearSearch}
              color={isDark ? 'gray' : 'dark'}
            >
              <IconX size={14} />
            </ActionIcon>
          )
        }
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
        size="sm"
        style={{ width: 200, minWidth: 'fit-content' }}
        styles={{
          input: {
            backgroundColor: isDark ? '#25262b' : '#ffffff',
            borderColor: isDark ? '#373a40' : '#ced4da',
            color: isDark ? '#ffffff' : '#000000',
          }
        }}
      />

      {/* Search Results Dropdown */}
      {isOpen && (
        <Box
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            width: '400px',
            maxHeight: '500px',
            backgroundColor: isDark ? '#25262b' : '#ffffff',
            border: `1px solid ${isDark ? '#373a40' : '#e9ecef'}`,
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            marginTop: '8px',
          }}
        >
          <Box p="md" style={{ borderBottom: `1px solid ${isDark ? '#373a40' : '#e9ecef'}` }}>
            <Text size="sm" fw={500} c={isDark ? '#ffffff' : '#000000'}>
              نتایج جستجو ({results.length})
            </Text>
          </Box>

          {results.length > 0 ? (
            <ScrollArea h={400} type="auto">
              <Stack gap={0}>
                {results.map((result, index) => (
                  <Box key={`${result.type}-${result.id}`}>
                    <Group
                      p="md"
                      gap="md"
                      align="center"
                      style={{
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                      }}
                      onClick={() => handleResultClick(result)}
                    >
                      {/* Icon */}
                      <Avatar size="md" radius="md" color={result.type === 'user' ? 'blue' : result.type === 'product' ? 'green' : 'orange'}>
                        {result.icon}
                      </Avatar>

                      {/* Content */}
                      <Box style={{ flex: 1, minWidth: 0 }}>
                        <Text fw={500} size="sm" style={{ color: isDark ? '#ffffff' : '#000000' }}>
                          {result.title}
                        </Text>
                        <Text size="xs" c={isDark ? 'dimmed' : 'dark'} style={{ marginTop: '2px' }}>
                          {result.subtitle}
                        </Text>
                      </Box>

                      {/* Badge */}
                      {result.badge && (
                        <Badge color={result.badge.color} size="xs" variant="light">
                          {result.badge.text}
                        </Badge>
                      )}
                    </Group>
                    
                    {index < results.length - 1 && (
                      <Divider color={isDark ? '#373a40' : '#e9ecef'} style={{ margin: '0 16px' }} />
                    )}
                  </Box>
                ))}
              </Stack>
            </ScrollArea>
          ) : searchQuery.length >= 2 ? (
            /* Empty State Message - Only show when user has typed at least 2 characters */
            <Box p="md" style={{ textAlign: 'center' }}>
              <Text size="sm" c={isDark ? 'dimmed' : 'dark'}>
                هیچ نتیجه‌ای یافت نشد
              </Text>
            </Box>
          ) : null}
        </Box>
      )}
    </Box>
  )
}
