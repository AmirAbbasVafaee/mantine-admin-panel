"use client"

import { useState } from 'react'
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
  useMantineTheme,
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

interface DashboardLayoutProps {
  children: React.ReactNode
  activePage: string
}

export function DashboardLayout({ children, activePage }: DashboardLayoutProps) {
  const [isDark, setIsDark] = useState(false)
  const [opened, setOpened] = useState(false)
  const { isMobile, isTablet } = useResponsive()
  const theme = useMantineTheme()
  const router = useRouter()

  const user = {
    name: 'احمد محمدی',
    email: 'ahmad@example.com',
    avatar: '',
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
    { icon: IconLogout, label: 'خروج' },
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
    if (isMobile || isTablet) {
      setOpened(false)
    }
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
        backgroundColor: activePage === link.id ? 'var(--mantine-color-blue-1)' : 'transparent',
        color: activePage === link.id ? 'var(--mantine-color-blue-6)' : '#495057',
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
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '12px 16px',
        borderRadius: '8px',
        marginBottom: '4px',
        transition: 'all 0.2s',
        color: '#495057',
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
        }}
      >
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={() => setOpened(!opened)}
              hiddenFrom="sm"
              size="sm"
            />
            <Text size="lg" fw={700} c={isDark ? '#ffffff' : '#000000'}>
              پنل مدیریت
            </Text>
          </Group>

          <Group gap="sm">
            <TextInput
              placeholder="جستجو..."
              leftSection={<IconSearch size={16} />}
              size="sm"
              style={{ width: 200 }}
            />
            
            <ActionIcon
              variant="light"
              size="lg"
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
            </ActionIcon>

            <ActionIcon variant="light" size="lg">
              <IconBell size={20} />
            </ActionIcon>

            <Menu>
              <Menu.Target>
                <UnstyledButton>
                  <Group gap="sm">
                    <Avatar size="md" radius="xl">
                      {user.name.charAt(0)}
                    </Avatar>
                    <Box style={{ flex: 1 }}>
                      <Text size="sm" fw={500}>
                        {user.name}
                      </Text>
                      <Text c="dimmed" size="xs">
                        {user.email}
                      </Text>
                    </Box>
                    <IconChevronDown size={16} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item leftSection={<IconUser size={16} />}>
                  پروفایل
                </Menu.Item>
                <Menu.Item leftSection={<IconSettings size={16} />}>
                  تنظیمات
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item leftSection={<IconLogout size={16} />} color="red">
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
    </AppShell>
  )
}
