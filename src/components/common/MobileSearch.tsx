"use client"

import { useState, useRef, useEffect, useMemo } from 'react'
import { ActionIcon, Box, TextInput, Transition, Text, Group, Avatar, Badge, Stack, Divider, ScrollArea } from '@mantine/core'
import { IconSearch, IconX } from '@tabler/icons-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useResponsive } from '@/hooks/useResponsive'
import { useUsers } from '@/hooks/useUsers'
import { useProducts } from '@/hooks/useProducts'
import { useOrders } from '@/hooks/useOrders'
import { useRouter } from 'next/navigation'

interface SearchResult {
  type: 'user' | 'product' | 'order'
  id: string
  title: string
  subtitle: string
  icon: string
  badge?: { text: string; color: string }
  data: any
}

interface MobileSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function MobileSearch({ onSearch, placeholder = "جستجو..." }: MobileSearchProps) {
  const { isDark, colorTheme } = useTheme()
  const { isMobile } = useResponsive()
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Data hooks
  const { users } = useUsers()
  const { products } = useProducts()
  const { orders } = useOrders()

  // Memoize search results
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
          subtitle: `${product.category} - ${product.price} تومان`,
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
          subtitle: `${order.customer} - ${order.amount} تومان`,
          icon: '#',
          badge: { text: order.status === 'completed' ? 'تکمیل شده' : order.status === 'pending' ? 'در انتظار' : order.status === 'processing' ? 'در حال پردازش' : 'ارسال شده', color: order.status === 'completed' ? 'green' : order.status === 'pending' ? 'yellow' : 'blue' },
          data: order
        })
      }
    })

    return searchResults.slice(0, 8) // Limit to 8 results for mobile
  }, [searchQuery, users, products, orders])

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
        setSearchQuery('')
      }
    }

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
      // Focus input when expanded
      setTimeout(() => inputRef.current?.focus(), 100)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpanded])

  const handleToggle = () => {
    if (isExpanded) {
      setIsExpanded(false)
      setSearchQuery('')
    } else {
      setIsExpanded(true)
    }
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  const handleClear = () => {
    setSearchQuery('')
    setIsExpanded(false)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery)
    }
  }

  const handleResultClick = (result: SearchResult) => {
    setIsExpanded(false)
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
  }

  if (!isMobile) return null

  return (
    <Box ref={searchRef} style={{ position: 'relative' }}>
      {/* Search Icon Button */}
      <ActionIcon
        variant="light"
        size="lg"
        onClick={handleToggle}
        color={colorTheme}
        style={{
          transition: 'all 0.2s ease',
          transform: isExpanded ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        <IconSearch size={20} />
      </ActionIcon>

      {/* Expanded Search Input and Results */}
      <Transition
        mounted={isExpanded}
        transition="slide-down"
        duration={200}
        timingFunction="ease"
      >
        {(styles) => (
          <Box
            style={{
              ...styles,
              position: 'fixed', // Changed from absolute to fixed
              top: '80px', // Position below header
              right: '16px', // Position from right edge
              width: 'calc(100vw - 32px)', // Full width minus margins
              maxWidth: '400px', // Maximum width
              zIndex: 1000,
            }}
          >
            <Box
              style={{
                backgroundColor: isDark ? '#25262b' : '#ffffff',
                border: `1px solid ${isDark ? '#373a40' : '#e9ecef'}`,
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                overflow: 'hidden',
                direction: 'rtl',
                maxHeight: 'calc(100vh - 120px)', // Limit height to prevent covering entire screen
              }}
            >
              {/* Search Input */}
              <Box style={{ padding: '12px', borderBottom: `1px solid ${isDark ? '#373a40' : '#e9ecef'}` }}>
                <form onSubmit={handleSubmit}>
                  <TextInput
                    ref={inputRef}
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={(event) => handleSearch(event.currentTarget.value)}
                    rightSection={
                      searchQuery && (
                        <ActionIcon
                          variant="subtle"
                          size="sm"
                          onClick={handleClear}
                          color={isDark ? 'gray' : 'dark'}
                        >
                          <IconX size={14} />
                        </ActionIcon>
                      )
                    }
                    size="sm"
                    styles={{
                      input: {
                        backgroundColor: isDark ? '#25262b' : '#ffffff',
                        borderColor: isDark ? '#373a40' : '#ced4da',
                        color: isDark ? '#ffffff' : '#000000',
                        direction: 'rtl',
                        textAlign: 'right',
                      }
                    }}
                  />
                </form>
              </Box>

              {/* Search Results */}
              {results.length > 0 && (
                <Box>
                  <Box p="xs" style={{ borderBottom: `1px solid ${isDark ? '#373a40' : '#e9ecef'}` }}>
                    <Text size="xs" c={isDark ? 'dimmed' : 'dark'} style={{ textAlign: 'center' }}>
                      نتایج جستجو ({results.length})
                    </Text>
                  </Box>
                  
                  <ScrollArea h={Math.min(300, results.length * 60)} type="auto">
                    <Stack gap={0}>
                      {results.map((result, index) => (
                        <Box key={`${result.type}-${result.id}`}>
                          <Group
                            p="xs"
                            gap="sm"
                            align="center"
                            style={{
                              cursor: 'pointer',
                              transition: 'background-color 0.2s',
                            }}
                            onClick={() => handleResultClick(result)}
                          >
                            {/* Icon */}
                            <Avatar size="sm" radius="md" color={result.type === 'user' ? 'blue' : result.type === 'product' ? 'green' : 'orange'}>
                              {result.icon}
                            </Avatar>

                            {/* Content */}
                            <Box style={{ flex: 1, minWidth: 0 }}>
                              <Text fw={500} size="xs" style={{ color: isDark ? '#ffffff' : '#000000' }}>
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
                            <Divider color={isDark ? '#373a40' : '#e9ecef'} style={{ margin: '0 8px' }} />
                          )}
                        </Box>
                      ))}
                    </Stack>
                  </ScrollArea>
                </Box>
              )}

              {/* No Results Message */}
              {searchQuery.length >= 2 && results.length === 0 && (
                <Box p="md" style={{ textAlign: 'center' }}>
                  <Text size="sm" c={isDark ? 'dimmed' : 'dark'}>
                    هیچ نتیجه‌ای یافت نشد
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Transition>
    </Box>
  )
}
