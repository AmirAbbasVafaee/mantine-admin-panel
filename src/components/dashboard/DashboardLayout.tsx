"use client"

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  AppShell,
  Text,
  Group,
  ActionIcon,
  Avatar,
  Menu,
  UnstyledButton,
  Stack,
  Box,
  Burger,
  TextInput,
} from '@mantine/core'
import {
  IconDashboard,
  IconUsers,
  IconShoppingCart,
  IconChartBar,
  IconFileText,
  IconSettings,
  IconBell,
  IconSearch,
  IconSun,
  IconMoon,
  IconLogout,
  IconUser,
  IconChevronDown,
} from '@tabler/icons-react'
import { useResponsive } from '@/hooks/useResponsive'
import { useTheme } from '@/contexts/ThemeContext'
import { NotificationModal } from '@/components/modals/NotificationModal'
import { GlobalSearch } from '@/components/common/GlobalSearch'
import { MobileSearch } from '@/components/common/MobileSearch'

interface DashboardLayoutProps {
  children: React.ReactNode
  activePage: string
}

export function DashboardLayout({ children, activePage }: DashboardLayoutProps) {
  const [opened, setOpened] = useState(false)
  const [notificationModalOpened, setNotificationModalOpened] = useState(false)
  const [bellPosition, setBellPosition] = useState({ top: 0, left: 0 })
  const bellRef = useRef<HTMLButtonElement>(null)
  const { isMobile, isTablet } = useResponsive()

  const router = useRouter()
  const { isDark, toggleTheme, colorTheme, setColorTheme } = useTheme()

  // Calculate bell icon position when notification modal opens
  const handleNotificationClick = () => {
    if (bellRef.current) {
      const rect = bellRef.current.getBoundingClientRect()
      setBellPosition({
        top: rect.bottom + 5, // 5px below the bell icon
        left: rect.left - 10 // Left edge of bell icon - 10px margin
      })
    }
    setNotificationModalOpened(true)
  }

  const user = {
    name: 'احمد محمدی',
    email: 'ahmad@example.com',
    avatar: '',
  }

  const handleLogout = () => {
    // Simple logout - redirect to login page
    router.push('/login')
  }

  const mainLinks = [
    { icon: IconDashboard, label: 'داشبورد', id: 'dashboard', path: '/mantine/dashboard' },
    { icon: IconUsers, label: 'کاربران', id: 'users', path: '/mantine/users' },
    { icon: IconShoppingCart, label: 'سفارشات', id: 'orders', path: '/mantine/orders' },
    { icon: IconFileText, label: 'محصولات', id: 'products', path: '/mantine/products' },
    { icon: IconChartBar, label: 'گزارشات', id: 'reports', path: '/mantine/reports' },
    { icon: IconSettings, label: 'تنظیمات', id: 'settings', path: '/mantine/settings' },
  ]

  const secondaryLinks = [
    { icon: IconLogout, label: 'خروج', action: handleLogout },
  ] as const

  const handleNavigation = (path: string) => {
    router.push(path)
    if (isMobile || isTablet) {
      setOpened(false)
    }
  }

  const handleMobileSearch = (query: string) => {
    console.log('Searching for:', query)
    // Implement mobile search logic here
  }

  const mainItems = mainLinks.map((link) => (
    <UnstyledButton
      key={link.label}
      onClick={() => handleNavigation(link.path)}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '12px 16px',
        borderRadius: '8px',
        marginBottom: '4px',
        backgroundColor: activePage === link.id ? (colorTheme === 'blue' ? 'var(--mantine-color-blue-1)' : colorTheme === 'green' ? 'var(--mantine-color-green-1)' : colorTheme === 'purple' ? 'var(--mantine-color-purple-1)' : 'var(--mantine-color-orange-1)') : 'transparent',
        color: activePage === link.id ? (colorTheme === 'blue' ? 'var(--mantine-color-blue-6)' : colorTheme === 'green' ? 'var(--mantine-color-green-6)' : colorTheme === 'purple' ? 'var(--mantine-color-purple-6)' : 'var(--mantine-color-orange-6)') : isDark ? '#ffffff' : '#495057',
        fontWeight: activePage === link.id ? 600 : 400,
        transition: 'all 0.2s',
        cursor: 'pointer',
      }}
    >
      <link.icon size={20} style={{ marginLeft: '12px' }} />
      <span>{link.label}</span>
    </UnstyledButton>
  ))

  const secondaryItems = secondaryLinks.map((link) => (
    <UnstyledButton
      key={link.label}
      onClick={link.action}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '12px 16px',
        borderRadius: '8px',
        marginBottom: '4px',
        transition: 'all 0.2s',
        color: isDark ? '#ffffff' : '#495057',
        cursor: 'pointer',
      }}
    >
      <link.icon size={20} style={{ marginLeft: '12px' }} />
      <span>{link.label}</span>
    </UnstyledButton>
  ))

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      dir="rtl"
    >
      <AppShell.Header
        style={{
          backgroundColor: isDark ? '#1a1b1e' : '#ffffff',
          borderBottom: `1px solid ${isDark ? '#373a40' : '#e9ecef'}`,
          overflow: 'visible',
        }}
      >
        <Group h="100%" px="md" justify="space-between" wrap="nowrap">
          <Group wrap="nowrap">
            {(isMobile || isTablet) && (
              <Burger
                opened={opened}
                onClick={() => setOpened(!opened)}
                size="sm"
                color={isDark ? '#ffffff' : '#000000'}
              />
            )}
            <Text size="lg" fw={700} c={isDark ? '#ffffff' : '#000000'} style={{ minWidth: 'fit-content' }}>
              پنل مدیریت
            </Text>
          </Group>

          <Group gap="xs" wrap="nowrap" style={{ flex: 1, justifyContent: 'flex-end' }}>
            {!isMobile && <GlobalSearch />}
            {isMobile && <MobileSearch onSearch={handleMobileSearch} />}
            
            <ActionIcon
              variant="light"
              size="lg"
              onClick={toggleTheme}
              color={colorTheme}
            >
              {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
            </ActionIcon>



            <ActionIcon 
              variant="light" 
              size="lg" 
              color={colorTheme} 
              onClick={handleNotificationClick} 
              ref={bellRef}
              style={{ position: 'relative', overflow: 'visible' }}
            >
              <IconBell size={20} />
              {/* Notification Badge */}
              <Box
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#fa5252',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `2px solid ${isDark ? '#1a1b1e' : '#ffffff'}`,
                  zIndex: 10,
                }}
              >
                <Text size="xs" c="white" fw={600} style={{ fontSize: '12px', lineHeight: 1, color: '#ffffff' }}>
                  4
                </Text>
              </Box>
            </ActionIcon>

            <Menu>
              <Menu.Target>
                <UnstyledButton>
                  <Group gap="sm" wrap="nowrap">
                    <Avatar size="md" radius="xl">
                      {user.name.charAt(0)}
                    </Avatar>
                    {!isMobile && (
                      <Box style={{ flex: 1, minWidth: 0 }}>
                        <Text size="sm" fw={500} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {user.name}
                        </Text>
                        <Text c="dimmed" size="xs" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {user.email}
                        </Text>
                      </Box>
                    )}
                    {!isMobile && (
                      <IconChevronDown size={16} />
                    )}
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item 
                  leftSection={<IconUser size={16} />}
                  onClick={() => router.push('/mantine/users')}
                >
                  پروفایل
                </Menu.Item>
                <Menu.Item 
                  leftSection={<IconSettings size={16} />}
                  onClick={() => router.push('/mantine/settings')}
                >
                  تنظیمات
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>انتخاب رنگ</Menu.Label>
                <Box p="xs">
                  <Group gap="xs" justify="center">
                    <ActionIcon
                      variant={colorTheme === 'blue' ? 'filled' : 'light'}
                      size="sm"
                      onClick={() => setColorTheme('blue')}
                      style={{
                        backgroundColor: colorTheme === 'blue' ? '#228be6' : undefined,
                        borderColor: '#228be6',
                        color: colorTheme === 'blue' ? '#ffffff' : '#228be6',
                        transition: 'all 0.2s ease',
                        transform: colorTheme === 'blue' ? 'scale(1.1)' : 'scale(1)',
                        boxShadow: colorTheme === 'blue' ? '0 2px 8px rgba(34, 139, 230, 0.3)' : 'none',
                      }}
                    >
                      <Box style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#228be6' }} />
                    </ActionIcon>
                    <ActionIcon
                      variant={colorTheme === 'green' ? 'filled' : 'light'}
                      size="sm"
                      onClick={() => setColorTheme('green')}
                      style={{
                        backgroundColor: colorTheme === 'green' ? '#40c057' : undefined,
                        borderColor: '#40c057',
                        color: colorTheme === 'green' ? '#ffffff' : '#40c057',
                        transition: 'all 0.2s ease',
                        transform: colorTheme === 'green' ? 'scale(1.1)' : 'scale(1)',
                        boxShadow: colorTheme === 'green' ? '0 2px 8px rgba(64, 192, 87, 0.3)' : 'none',
                      }}
                    >
                      <Box style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#40c057' }} />
                    </ActionIcon>
                    <ActionIcon
                      variant={colorTheme === 'purple' ? 'filled' : 'light'}
                      size="sm"
                      onClick={() => setColorTheme('purple')}
                      style={{
                        backgroundColor: colorTheme === 'purple' ? '#7950f2' : undefined,
                        borderColor: '#7950f2',
                        color: colorTheme === 'purple' ? '#ffffff' : '#7950f2',
                        transition: 'all 0.2s ease',
                        transform: colorTheme === 'purple' ? 'scale(1.1)' : 'scale(1)',
                        boxShadow: colorTheme === 'purple' ? '0 2px 8px rgba(121, 80, 242, 0.3)' : 'none',
                      }}
                    >
                      <Box style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#7950f2' }} />
                    </ActionIcon>
                    <ActionIcon
                      variant={colorTheme === 'orange' ? 'filled' : 'light'}
                      onClick={() => setColorTheme('orange')}
                      size="sm"
                      style={{
                        backgroundColor: colorTheme === 'orange' ? '#fd7e14' : undefined,
                        borderColor: '#fd7e14',
                        color: colorTheme === 'orange' ? '#ffffff' : '#fd7e14',
                        transition: 'all 0.2s ease',
                        transform: colorTheme === 'orange' ? 'scale(1.1)' : 'scale(1)',
                        boxShadow: colorTheme === 'orange' ? '0 2px 8px rgba(253, 126, 20, 0.3)' : 'none',
                      }}
                    >
                      <Box style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#fd7e14' }} />
                    </ActionIcon>
                  </Group>
                </Box>
                <Menu.Divider />
                <Menu.Item 
                  leftSection={<IconLogout size={16} />} 
                  color="red"
                  onClick={handleLogout}
                >
                  خروج
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        style={{
          backgroundColor: isDark ? '#1a1b1e' : '#ffffff',
          borderRight: `1px solid ${isDark ? '#373a40' : '#e9ecef'}`,
        }}
      >
        <AppShell.Section p="md">
          <Text size="lg" fw={700} mb="lg" c={isDark ? '#ffffff' : '#000000'}>
            پنل مدیریت
          </Text>
        </AppShell.Section>

        <AppShell.Section grow p="md">
          <Stack gap="xs">
            {mainItems}
          </Stack>
        </AppShell.Section>

        <AppShell.Section p="md">
          <Stack gap="xs">
            {secondaryItems}
          </Stack>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          backgroundColor: isDark ? '#0c0d0e' : '#f8f9fa',
        }}
      >
        {children}
      </AppShell.Main>

      <NotificationModal
        opened={notificationModalOpened}
        onClose={() => setNotificationModalOpened(false)}
        position={bellPosition}
      />
    </AppShell>
  )
}
