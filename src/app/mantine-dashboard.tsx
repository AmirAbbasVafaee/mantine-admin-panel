"use client"

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
  Grid,
  Card,
  SimpleGrid,
  Container,
  Title,
  Badge,
  Table,
  Button,
  TextInput,
  ThemeIcon,
  Burger,
  useMantineTheme,
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
  IconPlus,
  IconEye,
  IconEdit,
  IconTrash,
  IconTrendingUp,
  IconActivity,
  IconCurrencyDollar,
} from '@tabler/icons-react'
import { useState, useEffect } from 'react'

// Mock data
const stats = [
  {
    title: 'فروش کل',
    value: '۱۲,۵۴۳,۰۰۰',
    currency: 'تومان',
    change: '+۱۲.۵٪',
    changeType: 'positive' as const,
    icon: IconCurrencyDollar,
    color: 'green',
  },
  {
    title: 'سفارشات',
    value: '۲,۴۵۶',
    change: '+۸.۲٪',
    changeType: 'positive' as const,
    icon: IconShoppingCart,
    color: 'blue',
  },
  {
    title: 'کاربران فعال',
    value: '۱,۲۳۴',
    change: '+۱۵.۳٪',
    changeType: 'positive' as const,
    icon: IconUsers,
    color: 'violet',
  },
  {
    title: 'نرخ تبدیل',
    value: '۳.۲٪',
    change: '+۲.۱٪',
    changeType: 'positive' as const,
    icon: IconTrendingUp,
    color: 'orange',
  },
]

const recentOrders = [
  {
    id: '#۱۲۳۴',
    customer: 'احمد محمدی',
    email: 'ahmad@example.com',
    amount: '۲,۵۰۰,۰۰۰',
    status: 'completed',
    date: '۱۴۰۲/۱۲/۱۵',
  },
  {
    id: '#۱۲۳۵',
    customer: 'فاطمه احمدی',
    email: 'fateme@example.com',
    amount: '۱,۸۰۰,۰۰۰',
    status: 'pending',
    date: '۱۴۰۲/۱۲/۱۴',
  },
  {
    id: '#۱۲۳۶',
    customer: 'علی رضایی',
    email: 'ali@example.com',
    amount: '۳,۲۰۰,۰۰۰',
    status: 'processing',
    date: '۱۴۰۲/۱۲/۱۳',
  },
  {
    id: '#۱۲۳۷',
    customer: 'مریم کریمی',
    email: 'maryam@example.com',
    amount: '۹۵۰,۰۰۰',
    status: 'cancelled',
    date: '۱۴۰۲/۱۲/۱۲',
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge color="green">تکمیل شده</Badge>
    case 'pending':
      return <Badge color="yellow">در انتظار</Badge>
    case 'processing':
      return <Badge color="blue">در حال پردازش</Badge>
    case 'cancelled':
      return <Badge color="red">لغو شده</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

// Custom hook for responsive behavior
function useResponsive() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return { isMobile, isTablet }
}

export default function MantineDashboard() {
  const [opened, setOpened] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const { isMobile, isTablet } = useResponsive()
  const theme = useMantineTheme()

  const user = {
    name: 'مدیر سیستم',
    email: 'admin@example.com',
    image: '',
  }

  const mainLinks = [
    { icon: IconDashboard, label: 'داشبورد', active: true },
    { icon: IconUsers, label: 'کاربران', badge: '۱۲' },
    { icon: IconShoppingCart, label: 'سفارشات', badge: '۲۴' },
    { icon: IconChartBar, label: 'گزارشات' },
    { icon: IconFileText, label: 'مستندات' },
    { icon: IconSettings, label: 'تنظیمات' },
  ]

  const secondaryLinks = [
    { icon: IconLogout, label: 'خروج' },
  ]

  const mainItems = mainLinks.map((link) => (
    <UnstyledButton
      key={link.label}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '8px 12px',
        fontSize: '14px',
        fontWeight: 500,
        borderRadius: '6px',
        transition: 'all 0.2s',
        backgroundColor: link.active ? '#e7f5ff' : 'transparent',
        color: link.active ? '#1971c2' : '#495057',
      }}
    >
      <link.icon size={20} style={{ marginLeft: '12px' }} />
      <span style={{ flex: 1, textAlign: 'right' }}>{link.label}</span>
      {link.badge && (
        <Badge size="xs" variant="light" style={{ marginRight: 'auto' }}>
          {link.badge}
        </Badge>
      )}
    </UnstyledButton>
  ))

  const secondaryItems = secondaryLinks.map((link) => (
    <UnstyledButton
      key={link.label}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '8px 12px',
        fontSize: '14px',
        fontWeight: 500,
        borderRadius: '6px',
        transition: 'all 0.2s',
        color: '#495057',
      }}
    >
      <link.icon size={20} style={{ marginLeft: '12px' }} />
      <span style={{ flex: 1, textAlign: 'right' }}>{link.label}</span>
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
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          {/* Mobile Burger Menu */}
          {isMobile && (
            <Burger
              opened={opened}
              onClick={() => setOpened(!opened)}
              size="sm"
              color="gray.6"
            />
          )}

          <Group justify="space-between" style={{ flex: 1 }}>
            <Title order={3}>پنل مدیریت</Title>

            <Group gap="xs">
              {/* Search Input - Hide on mobile */}
              {!isMobile && (
                <TextInput
                  placeholder="جستجو..."
                  leftSection={<IconSearch size={16} />}
                  size="sm"
                  style={{ width: 300 }}
                />
              )}

              {/* Theme Toggle - Hide on mobile */}
              {!isMobile && (
                <ActionIcon
                  variant="default"
                  onClick={() => setIsDark(!isDark)}
                  size="lg"
                  aria-label="تغییر تم"
                >
                  {isDark ? (
                    <IconSun size={18} />
                  ) : (
                    <IconMoon size={18} />
                  )}
                </ActionIcon>
              )}

              <ActionIcon variant="default" size="lg" aria-label="اعلان‌ها">
                <IconBell size={18} />
              </ActionIcon>

              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <UnstyledButton>
                    <Group gap={7}>
                      <Avatar size={32} radius="xl" />
                      {/* User Info - Hide on very small screens */}
                      {!isTablet && (
                        <>
                          <Box style={{ flex: 1 }}>
                            <Text size="sm" fw={500}>
                              {user.name}
                            </Text>
                            <Text c="dimmed" size="xs">
                              {user.email}
                            </Text>
                          </Box>
                          <IconChevronDown size={12} />
                        </>
                      )}
                    </Group>
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item leftSection={<IconUser size={14} />}>
                    پروفایل
                  </Menu.Item>
                  <Menu.Item leftSection={<IconSettings size={14} />}>
                    تنظیمات
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item leftSection={<IconLogout size={14} />} color="red">
                    خروج
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section grow>
          <Stack gap="xs">
            {mainItems}
          </Stack>
        </AppShell.Section>

        <AppShell.Section>
          <Stack gap="xs">
            {secondaryItems}
          </Stack>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="xl">
          <Stack gap="lg">
            {/* Welcome Section */}
            <Box>
              <Title order={2} mb="xs">
                خوش آمدید! 👋
              </Title>
              <Text c="dimmed">
                اینجا خلاصه‌ای از فعالیت‌های شما را مشاهده می‌کنید.
              </Text>
            </Box>

            {/* Stats Cards */}
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
              {stats.map((stat) => (
                <Card key={stat.title} padding="lg" radius="md" withBorder>
                  <Group justify="space-between">
                    <div>
                      <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                        {stat.title}
                      </Text>
                      <Text fw={700} size="xl">
                        {stat.value}
                        {stat.currency && (
                          <Text component="span" size="sm" c="dimmed" fw={400}>
                            {' '}
                            {stat.currency}
                          </Text>
                        )}
                      </Text>
                    </div>
                    <ThemeIcon
                      size="lg"
                      variant="light"
                      color={stat.color}
                    >
                      <stat.icon size={20} />
                    </ThemeIcon>
                  </Group>
                  <Group gap="xs" mt="md">
                    <Badge
                      variant="light"
                      color={stat.changeType === 'positive' ? 'green' : 'red'}
                      size="sm"
                    >
                      {stat.change}
                    </Badge>
                    <Text size="xs" c="dimmed">
                      نسبت به ماه گذشته
                    </Text>
                  </Group>
                </Card>
              ))}
            </SimpleGrid>

            {/* Charts and Tables Row */}
            <Grid>
              <Grid.Col span={{ base: 12, lg: 8 }}>
                <Card padding="lg" radius="md" withBorder>
                  <Group justify="space-between" mb="md">
                    <Title order={3}>سفارشات اخیر</Title>
                    <Button variant="light" size="sm">
                      مشاهده همه
                    </Button>
                  </Group>

                  <Box style={{ overflowX: 'auto' }}>
                    <Table>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>مشتری</Table.Th>
                          <Table.Th>مبلغ</Table.Th>
                          <Table.Th>وضعیت</Table.Th>
                          <Table.Th>تاریخ</Table.Th>
                          <Table.Th>عملیات</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {recentOrders.map((order) => (
                          <Table.Tr key={order.id}>
                            <Table.Td>
                              <Group gap="sm">
                                <Avatar size="sm" radius="xl" />
                                <div>
                                  <Text fw={500} size="sm">
                                    {order.customer}
                                  </Text>
                                  <Text c="dimmed" size="xs">
                                    {order.email}
                                  </Text>
                                </div>
                              </Group>
                            </Table.Td>
                            <Table.Td>
                              <Text fw={500}>{order.amount} تومان</Text>
                            </Table.Td>
                            <Table.Td>{getStatusBadge(order.status)}</Table.Td>
                            <Table.Td>
                              <Text size="sm" c="dimmed">
                                {order.date}
                              </Text>
                            </Table.Td>
                            <Table.Td>
                              <Group gap="xs">
                                <ActionIcon variant="light" size="sm">
                                  <IconEye size={16} />
                                </ActionIcon>
                                <ActionIcon variant="light" size="sm">
                                  <IconEdit size={16} />
                                </ActionIcon>
                                <ActionIcon variant="light" size="sm" color="red">
                                  <IconTrash size={16} />
                                </ActionIcon>
                              </Group>
                            </Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                    </Table>
                  </Box>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, lg: 4 }}>
                <Stack gap="md">
                  {/* Activity Summary */}
                  <Card padding="lg" radius="md" withBorder>
                    <Title order={3} mb="md">
                      خلاصه فعالیت
                    </Title>
                    <Stack gap="md">
                      <Group justify="space-between">
                        <Group gap="sm">
                          <ThemeIcon size="lg" variant="light" color="green">
                            <IconTrendingUp size={20} />
                          </ThemeIcon>
                          <div>
                            <Text size="sm" fw={500}>
                              فروش امروز
                            </Text>
                            <Text size="xs" c="dimmed">
                              ۲۴ سفارش جدید
                            </Text>
                          </div>
                        </Group>
                        <Badge color="green">+۱۲٪</Badge>
                      </Group>

                      <Group justify="space-between">
                        <Group gap="sm">
                          <ThemeIcon size="lg" variant="light" color="blue">
                            <IconChartBar size={20} />
                          </ThemeIcon>
                          <div>
                            <Text size="sm" fw={500}>
                              کاربران فعال
                            </Text>
                            <Text size="xs" c="dimmed">
                              ۱,۲۳۴ کاربر
                            </Text>
                          </div>
                        </Group>
                        <Badge color="blue">+۸٪</Badge>
                      </Group>

                      <Group justify="space-between">
                        <Group gap="sm">
                          <ThemeIcon size="lg" variant="light" color="violet">
                            <IconActivity size={20} />
                          </ThemeIcon>
                          <div>
                            <Text size="sm" fw={500}>
                              رویدادهای امروز
                            </Text>
                            <Text size="xs" c="dimmed">
                              ۵ رویداد
                            </Text>
                          </div>
                        </Group>
                        <Badge variant="light">جدید</Badge>
                      </Group>
                    </Stack>
                  </Card>

                  {/* Quick Actions */}
                  <Card padding="lg" radius="md" withBorder>
                    <Title order={3} mb="md">
                      عملیات سریع
                    </Title>
                    <Stack gap="sm">
                      <Button variant="light" leftSection={<IconPlus size={16} />} fullWidth>
                        ایجاد سفارش جدید
                      </Button>
                      <Button variant="light" leftSection={<IconUsers size={16} />} fullWidth>
                        افزودن کاربر
                      </Button>
                      <Button variant="light" leftSection={<IconChartBar size={16} />} fullWidth>
                        گزارش جدید
                      </Button>
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
