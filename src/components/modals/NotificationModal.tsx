"use client"

import { useState, useEffect, useRef } from 'react'
import {
  Box,
  Text,
  Group,
  Badge,
  Stack,
  ActionIcon,
  Divider,
  ScrollArea,
  Button,
  ThemeIcon,
} from '@mantine/core'
import {
  IconBell,
  IconX,
  IconCheck,
  IconAlertCircle,
  IconFileInfo,
  IconClock,
} from '@tabler/icons-react'
import { useTheme } from '@/contexts/ThemeContext'

interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'warning' | 'error' | 'info'
  timestamp: Date
  isRead: boolean
}

interface NotificationModalProps {
  opened: boolean
  onClose: () => void
  position: { top: number; left: number }
}

export function NotificationModal({ opened, onClose, position }: NotificationModalProps) {
  const { isDark } = useTheme()
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (opened) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [opened, onClose])

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'سفارش جدید',
      message: 'سفارش #1239 با موفقیت ثبت شد',
      type: 'success',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      isRead: false,
    },
    {
      id: '2',
      title: 'پرداخت ناموفق',
      message: 'پرداخت سفارش #1238 با خطا مواجه شد',
      type: 'error',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      isRead: false,
    },
    {
      id: '3',
      title: 'محصول جدید',
      message: 'محصول "لپ تاپ گیمینگ" به انبار اضافه شد',
      type: 'info',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: true,
    },
    {
      id: '4',
      title: 'هشدار موجودی',
      message: 'موجودی محصول "هدفون بلوتوث" کمتر از 10 عدد است',
      type: 'warning',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: true,
    },
    {
      id: '5',
      title: 'بک‌آپ موفق',
      message: 'بک‌آپ پایگاه داده با موفقیت انجام شد',
      type: 'success',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      isRead: true,
    },
    {
      id: '6',
      title: 'به‌روزرسانی سیستم',
      message: 'به‌روزرسانی امنیتی جدید در دسترس است',
      type: 'info',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      isRead: true,
    },
  ])

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <IconCheck size={16} />
      case 'warning':
        return <IconAlertCircle size={16} />
      case 'error':
        return <IconX size={16} />
      case 'info':
        return <IconFileInfo size={16} />
      default:
        return <IconFileInfo size={16} />
    }
  }

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'green'
      case 'warning':
        return 'yellow'
      case 'error':
        return 'red'
      case 'info':
        return 'blue'
      default:
        return 'blue'
    }
  }

  const getNotificationIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return '#40c057'
      case 'warning':
        return '#fcc419'
      case 'error':
        return '#fa5252'
      case 'info':
        return '#339af0'
      default:
        return '#339af0'
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'همین الان'
    if (diffInMinutes < 60) return `${diffInMinutes} دقیقه پیش`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ساعت پیش`
    return `${Math.floor(diffInMinutes / 1440)} روز پیش`
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  if (!opened) return null

  return (
    <Box
      ref={dropdownRef}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        width: '360px',
        maxHeight: '480px',
        backgroundColor: isDark ? '#25262b' : '#ffffff',
        border: `1px solid ${isDark ? '#373a40' : '#e9ecef'}`,
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        p="md"
        style={{
          borderBottom: `1px solid ${isDark ? '#373a40' : '#e9ecef'}`,
          backgroundColor: isDark ? '#2c2e33' : '#f8f9fa',
        }}
      >
        <Group justify="space-between" align="center">
          <Group gap="sm">
            <IconBell size={18} />
            <Text fw={600} size="sm">اعلان‌ها</Text>
            {unreadCount > 0 && (
              <Badge color="red" size="xs" variant="filled">
                {unreadCount}
              </Badge>
            )}
          </Group>
          <ActionIcon
            variant="subtle"
            size="sm"
            onClick={onClose}
            color={isDark ? 'gray' : 'dark'}
          >
            <IconX size={14} />
          </ActionIcon>
        </Group>
      </Box>

      {/* Actions */}
      {unreadCount > 0 && (
        <Box p="xs" style={{ borderBottom: `1px solid ${isDark ? '#373a40' : '#e9ecef'}` }}>
          <Button
            variant="subtle"
            size="xs"
            onClick={markAllAsRead}
            color={isDark ? 'gray' : 'dark'}
            fullWidth
          >
            علامت‌گذاری همه به عنوان خوانده شده
          </Button>
        </Box>
      )}

      {/* Notifications List */}
      <ScrollArea h={350} type="auto">
        <Stack gap={0}>
          {notifications.map((notification, index) => (
            <Box key={notification.id}>
              <Group
                p="sm"
                gap="sm"
                align="flex-start"
                style={{
                  backgroundColor: notification.isRead 
                    ? 'transparent' 
                    : (isDark ? '#2c2e33' : '#f8f9fa'),
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onClick={() => markAsRead(notification.id)}
              >
                {/* Notification Icon */}
                <ThemeIcon
                  size="sm"
                  variant="light"
                  color={getNotificationColor(notification.type)}
                  style={{
                    backgroundColor: isDark ? '#2c2e33' : '#f8f9fa',
                    border: `1px solid ${getNotificationIconColor(notification.type)}20`,
                    flexShrink: 0,
                  }}
                >
                  {getNotificationIcon(notification.type)}
                </ThemeIcon>

                {/* Notification Content */}
                <Box style={{ flex: 1, minWidth: 0 }}>
                  <Group justify="space-between" align="flex-start" mb="xs">
                    <Text
                      fw={500}
                      size="sm"
                      style={{
                        color: isDark ? '#ffffff' : '#000000',
                        lineHeight: 1.3,
                      }}
                    >
                      {notification.title}
                    </Text>
                    {!notification.isRead && (
                      <Box
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#339af0',
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </Group>
                  
                  <Text
                    size="xs"
                    c={isDark ? 'dimmed' : 'dark'}
                    style={{ lineHeight: 1.3, marginBottom: '6px' }}
                  >
                    {notification.message}
                  </Text>
                  
                  <Group gap="xs" align="center">
                    <IconClock size={10} color={isDark ? '#909296' : '#6c757d'} />
                    <Text size="xs" c="dimmed">
                      {formatTimeAgo(notification.timestamp)}
                    </Text>
                  </Group>
                </Box>
              </Group>
              
              {index < notifications.length - 1 && (
                <Divider
                  color={isDark ? '#373a40' : '#e9ecef'}
                  style={{ margin: '0 12px' }}
                />
              )}
            </Box>
          ))}
        </Stack>
      </ScrollArea>

      {/* Footer */}
      <Box p="xs" style={{ borderTop: `1px solid ${isDark ? '#373a40' : '#e9ecef'}` }}>
        <Button
          variant="subtle"
          size="xs"
          onClick={onClose}
          color={isDark ? 'gray' : 'dark'}
          fullWidth
        >
          بستن
        </Button>
      </Box>
    </Box>
  )
}
