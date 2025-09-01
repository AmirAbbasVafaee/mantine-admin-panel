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
  Tabs,
  Pagination,
  Select,
  Modal,
  Textarea,
  NumberInput,
  Switch,
  Divider,
  RingProgress,
  Progress,
  Timeline,
  Alert,
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
  IconPackage,
  IconTruck,
  IconCreditCard,
  IconCalendar,
  IconFilter,
  IconDownload,
  IconRefresh,
  IconCheck,
  IconX,
  IconAlertCircle,
  IconInfoCircle,
  IconStar,
  IconMessage,
  IconPhone,
  IconMail,
  IconMapPin,
  IconBuilding,
  IconId,
  IconLock,
  IconShield,
  IconDatabase,
  IconServer,
  IconCloud,
  IconWifi,
  IconCpu,
  IconDeviceFloppy,
  IconNetwork,
  IconKey,
  IconPalette,
  IconLanguage,
  IconVolume,
  IconNotification,
  IconHelp,
  IconBook,
  IconQuestionMark,
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

const users = [
  {
    id: 1,
    name: 'احمد محمدی',
    email: 'ahmad@example.com',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    role: 'admin',
    status: 'active',
    joinDate: '۱۴۰۲/۰۱/۱۵',
    lastLogin: '۱۴۰۲/۱۲/۱۵',
  },
  {
    id: 2,
    name: 'فاطمه احمدی',
    email: 'fateme@example.com',
    phone: '۰۹۱۸۷۶۵۴۳۲۱',
    role: 'user',
    status: 'active',
    joinDate: '۱۴۰۲/۰۳/۲۰',
    lastLogin: '۱۴۰۲/۱۲/۱۴',
  },
  {
    id: 3,
    name: 'علی رضایی',
    email: 'ali@example.com',
    phone: '۰۹۱۵۵۵۵۵۵۵۵',
    role: 'moderator',
    status: 'inactive',
    joinDate: '۱۴۰۲/۰۲/۱۰',
    lastLogin: '۱۴۰۲/۱۱/۲۸',
  },
]

const products = [
  {
    id: 1,
    name: 'لپ‌تاپ اپل مک‌بوک پرو',
    category: 'لپ‌تاپ',
    price: '۸۵,۰۰۰,۰۰۰',
    stock: 15,
    status: 'available',
    sales: 45,
    rating: 4.8,
  },
  {
    id: 2,
    name: 'گوشی سامسونگ گلکسی S24',
    category: 'گوشی موبایل',
    price: '۳۲,۰۰۰,۰۰۰',
    stock: 28,
    status: 'available',
    sales: 67,
    rating: 4.6,
  },
  {
    id: 3,
    name: 'تبلت اپل آی‌پد پرو',
    category: 'تبلت',
    price: '۲۸,۰۰۰,۰۰۰',
    stock: 8,
    status: 'low_stock',
    sales: 23,
    rating: 4.9,
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
    case 'active':
    case 'available':
      return <Badge color="green">تکمیل شده</Badge>
    case 'pending':
      return <Badge color="yellow">در انتظار</Badge>
    case 'processing':
      return <Badge color="blue">در حال پردازش</Badge>
    case 'cancelled':
    case 'suspended':
      return <Badge color="red">لغو شده</Badge>
    case 'inactive':
      return <Badge color="gray">غیرفعال</Badge>
    case 'low_stock':
      return <Badge color="orange">موجودی کم</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

const getRoleBadge = (role: string) => {
  switch (role) {
    case 'admin':
      return <Badge color="red">مدیر</Badge>
    case 'moderator':
      return <Badge color="blue">ناظر</Badge>
    case 'user':
      return <Badge color="gray">کاربر</Badge>
    default:
      return <Badge>{role}</Badge>
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

// Page Components
function DashboardPage() {
  return (
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
              <ThemeIcon size="lg" variant="light" color={stat.color}>
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
  )
}

function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [roleFilter, setRoleFilter] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    status: 'active',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Filter and search users
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery)
    const matchesStatus = !statusFilter || user.status === statusFilter
    const matchesRole = !roleFilter || user.role === roleFilter
    return matchesSearch && matchesStatus && matchesRole
  })

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  // Form validation
  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      errors.name = 'نام کاربر الزامی است'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'ایمیل الزامی است'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'ایمیل معتبر نیست'
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'شماره تلفن الزامی است'
    } else if (!/^09\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'شماره تلفن معتبر نیست'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      if (isEditModalOpen && selectedUser) {
        // Update user logic would go here
        console.log('Updating user:', { ...selectedUser, ...formData })
      } else {
        // Add user logic would go here
        console.log('Adding new user:', formData)
      }
      
      // Reset form and close modal
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'user',
        status: 'active',
      })
      setFormErrors({})
      setIsAddModalOpen(false)
      setIsEditModalOpen(false)
      setSelectedUser(null)
    }
  }

  // Handle edit user
  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    })
    setFormErrors({})
    setIsEditModalOpen(true)
  }

  // Handle view user
  const handleViewUser = (user: any) => {
    setSelectedUser(user)
    setIsViewModalOpen(true)
  }

  // Handle delete user
  const handleDeleteUser = (user: any) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  // Confirm delete
  const confirmDelete = () => {
    console.log('Deleting user:', selectedUser)
    setIsDeleteModalOpen(false)
    setSelectedUser(null)
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Box>
          <Title order={2} mb="xs">
            مدیریت کاربران
          </Title>
          <Text c="dimmed">
            مشاهده و مدیریت کاربران سیستم
          </Text>
        </Box>
        <Button 
          leftSection={<IconPlus size={16} />}
          onClick={() => {
            setFormData({
              name: '',
              email: '',
              phone: '',
              role: 'user',
              status: 'active',
            })
            setFormErrors({})
            setIsAddModalOpen(true)
          }}
        >
          افزودن کاربر جدید
        </Button>
      </Group>

      {/* Filters and Search */}
      <Card padding="lg" radius="md" withBorder>
        <Group gap="md" wrap="wrap">
          <TextInput
            placeholder="جستجو بر اساس نام، ایمیل یا شماره تلفن..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1, minWidth: 300 }}
          />
          <Select
            placeholder="فیلتر بر اساس وضعیت"
            value={statusFilter}
            onChange={setStatusFilter}
            data={[
              { value: 'active', label: 'فعال' },
              { value: 'inactive', label: 'غیرفعال' },
              { value: 'suspended', label: 'معلق' },
            ]}
            clearable
            style={{ minWidth: 150 }}
          />
          <Select
            placeholder="فیلتر بر اساس نقش"
            value={roleFilter}
            onChange={setRoleFilter}
            data={[
              { value: 'admin', label: 'مدیر' },
              { value: 'moderator', label: 'ناظر' },
              { value: 'user', label: 'کاربر' },
            ]}
            clearable
            style={{ minWidth: 150 }}
          />
          <Button
            variant="light"
            leftSection={<IconRefresh size={16} />}
            onClick={() => {
              setSearchQuery('')
              setStatusFilter(null)
              setRoleFilter(null)
              setCurrentPage(1)
            }}
          >
            پاک کردن فیلترها
          </Button>
        </Group>
      </Card>

      {/* Users Table */}
      <Card padding="lg" radius="md" withBorder>
        <Box style={{ overflowX: 'auto' }}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>کاربر</Table.Th>
                <Table.Th>نقش</Table.Th>
                <Table.Th>وضعیت</Table.Th>
                <Table.Th>تاریخ عضویت</Table.Th>
                <Table.Th>آخرین ورود</Table.Th>
                <Table.Th>عملیات</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginatedUsers.map((user) => (
                <Table.Tr key={user.id}>
                  <Table.Td>
                    <Group gap="sm">
                      <Avatar size="sm" radius="xl" />
                      <div>
                        <Text fw={500} size="sm">
                          {user.name}
                        </Text>
                        <Text c="dimmed" size="xs">
                          {user.email}
                        </Text>
                        <Text c="dimmed" size="xs">
                          {user.phone}
                        </Text>
                      </div>
                    </Group>
                  </Table.Td>
                  <Table.Td>{getRoleBadge(user.role)}</Table.Td>
                  <Table.Td>{getStatusBadge(user.status)}</Table.Td>
                  <Table.Td>
                    <Text size="sm" c="dimmed">
                      {user.joinDate}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" c="dimmed">
                      {user.lastLogin}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon 
                        variant="light" 
                        size="sm"
                        onClick={() => handleViewUser(user)}
                        title="مشاهده جزئیات"
                      >
                        <IconEye size={16} />
                      </ActionIcon>
                      <ActionIcon 
                        variant="light" 
                        size="sm"
                        onClick={() => handleEditUser(user)}
                        title="ویرایش کاربر"
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon 
                        variant="light" 
                        size="sm" 
                        color="red"
                        onClick={() => handleDeleteUser(user)}
                        title="حذف کاربر"
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>

        {/* Pagination */}
        {totalPages > 1 && (
          <Group justify="center" mt="lg">
            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={setCurrentPage}
              withEdges
              size="sm"
            />
          </Group>
        )}

        {/* Results Summary */}
        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">
            نمایش {startIndex + 1} تا {Math.min(startIndex + itemsPerPage, filteredUsers.length)} از {filteredUsers.length} کاربر
          </Text>
          <Text size="sm" c="dimmed">
            صفحه {currentPage} از {totalPages}
          </Text>
        </Group>
      </Card>

      {/* Add User Modal */}
      <Modal
        opened={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="افزودن کاربر جدید"
        size="md"
        centered
      >
        <Stack gap="md">
          <TextInput
            label="نام کامل"
            placeholder="نام و نام خانوادگی"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={formErrors.name}
            required
          />
          <TextInput
            label="ایمیل"
            placeholder="example@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={formErrors.email}
            required
          />
          <TextInput
            label="شماره تلفن"
            placeholder="09123456789"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={formErrors.phone}
            required
          />
          <Select
            label="نقش کاربر"
            value={formData.role}
            onChange={(value) => setFormData({ ...formData, role: value || 'user' })}
            data={[
              { value: 'admin', label: 'مدیر' },
              { value: 'moderator', label: 'ناظر' },
              { value: 'user', label: 'کاربر' },
            ]}
            required
          />
          <Select
            label="وضعیت"
            value={formData.status}
            onChange={(value) => setFormData({ ...formData, status: value || 'active' })}
            data={[
              { value: 'active', label: 'فعال' },
              { value: 'inactive', label: 'غیرفعال' },
              { value: 'suspended', label: 'معلق' },
            ]}
            required
          />
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={() => setIsAddModalOpen(false)}>
              انصراف
            </Button>
            <Button onClick={handleSubmit}>
              افزودن کاربر
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        opened={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="ویرایش کاربر"
        size="md"
        centered
      >
        <Stack gap="md">
          <TextInput
            label="نام کامل"
            placeholder="نام و نام خانوادگی"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={formErrors.name}
            required
          />
          <TextInput
            label="ایمیل"
            placeholder="example@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={formErrors.email}
            required
          />
          <TextInput
            label="شماره تلفن"
            placeholder="09123456789"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={formErrors.phone}
            required
          />
          <Select
            label="نقش کاربر"
            value={formData.role}
            onChange={(value) => setFormData({ ...formData, role: value || 'user' })}
            data={[
              { value: 'admin', label: 'مدیر' },
              { value: 'moderator', label: 'ناظر' },
              { value: 'user', label: 'کاربر' },
            ]}
            required
          />
          <Select
            label="وضعیت"
            value={formData.status}
            onChange={(value) => setFormData({ ...formData, status: value || 'active' })}
            data={[
              { value: 'active', label: 'فعال' },
              { value: 'inactive', label: 'غیرفعال' },
              { value: 'suspended', label: 'معلق' },
            ]}
            required
          />
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={() => setIsEditModalOpen(false)}>
              انصراف
            </Button>
            <Button onClick={handleSubmit}>
              ذخیره تغییرات
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* View User Modal */}
      <Modal
        opened={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="جزئیات کاربر"
        size="md"
        centered
      >
        {selectedUser && (
          <Stack gap="md">
            <Group>
              <Avatar size="lg" radius="xl" />
              <div>
                <Title order={4}>{selectedUser.name}</Title>
                <Text c="dimmed">{selectedUser.email}</Text>
              </div>
            </Group>
            
            <Divider />
            
            <SimpleGrid cols={2} spacing="md">
              <Box>
                <Text size="sm" c="dimmed">نقش</Text>
                <Text fw={500}>{getRoleBadge(selectedUser.role)}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">وضعیت</Text>
                <Text fw={500}>{getStatusBadge(selectedUser.status)}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">شماره تلفن</Text>
                <Text fw={500}>{selectedUser.phone}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">تاریخ عضویت</Text>
                <Text fw={500}>{selectedUser.joinDate}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">آخرین ورود</Text>
                <Text fw={500}>{selectedUser.lastLogin}</Text>
              </Box>
            </SimpleGrid>

            <Group justify="flex-end" mt="md">
              <Button variant="light" onClick={() => setIsViewModalOpen(false)}>
                بستن
              </Button>
              <Button 
                onClick={() => {
                  setIsViewModalOpen(false)
                  handleEditUser(selectedUser)
                }}
              >
                ویرایش کاربر
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="تأیید حذف"
        size="sm"
        centered
      >
        {selectedUser && (
          <Stack gap="md">
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="هشدار"
              color="red"
              variant="light"
            >
              آیا از حذف کاربر <strong>{selectedUser.name}</strong> اطمینان دارید؟
              این عملیات غیرقابل بازگشت است.
            </Alert>
            
            <Group justify="flex-end" mt="md">
              <Button variant="light" onClick={() => setIsDeleteModalOpen(false)}>
                انصراف
              </Button>
              <Button color="red" onClick={confirmDelete}>
                حذف کاربر
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Stack>
  )
}

function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [dateFilter, setDateFilter] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    customer: '',
    email: '',
    products: '',
    amount: '',
    status: 'pending',
    paymentMethod: 'online',
    shippingAddress: '',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Enhanced orders data with more details
  const enhancedOrders = [
    {
      id: '#۱۲۳۴',
      customer: 'احمد محمدی',
      email: 'ahmad@example.com',
      phone: '۰۹۱۲۳۴۵۶۷۸۹',
      products: ['لپ‌تاپ اپل', 'ماوس بی‌سیم'],
      amount: '۲,۵۰۰,۰۰۰',
      status: 'completed',
      date: '۱۴۰۲/۱۲/۱۵',
      paymentMethod: 'کارت اعتباری',
      shippingAddress: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
      trackingNumber: 'TRK-۱۲۳۴۵۶۷۸۹',
      notes: 'تحویل در منزل',
    },
    {
      id: '#۱۲۳۵',
      customer: 'فاطمه احمدی',
      email: 'fateme@example.com',
      phone: '۰۹۱۸۷۶۵۴۳۲۱',
      products: ['گوشی سامسونگ', 'کیف محافظ'],
      amount: '۱,۸۰۰,۰۰۰',
      status: 'pending',
      date: '۱۴۰۲/۱۲/۱۴',
      paymentMethod: 'پرداخت آنلاین',
      shippingAddress: 'اصفهان، خیابان چهارباغ، پلاک ۴۵۶',
      trackingNumber: '',
      notes: '',
    },
    {
      id: '#۱۲۳۶',
      customer: 'علی رضایی',
      email: 'ali@example.com',
      phone: '۰۹۱۵۵۵۵۵۵۵۵',
      products: ['تبلت اپل', 'قلم استایلوس'],
      amount: '۳,۲۰۰,۰۰۰',
      status: 'processing',
      date: '۱۴۰۲/۱۲/۱۳',
      paymentMethod: 'کارت اعتباری',
      shippingAddress: 'مشهد، خیابان امام رضا، پلاک ۷۸۹',
      trackingNumber: 'TRK-۹۸۷۶۵۴۳۲۱',
      notes: 'تحویل در محل کار',
    },
    {
      id: '#۱۲۳۷',
      customer: 'مریم کریمی',
      email: 'maryam@example.com',
      phone: '۰۹۱۹۹۹۹۹۹۹۹',
      products: ['هدفون سونی'],
      amount: '۹۵۰,۰۰۰',
      status: 'cancelled',
      date: '۱۴۰۲/۱۲/۱۲',
      paymentMethod: 'پرداخت آنلاین',
      shippingAddress: 'شیراز، خیابان زند، پلاک ۲۳۴',
      trackingNumber: '',
      notes: 'لغو شده توسط مشتری',
    },
    {
      id: '#۱۲۳۸',
      customer: 'حسین نوری',
      email: 'hossein@example.com',
      phone: '۰۹۱۱۱۱۱۱۱۱۱',
      products: ['ساعت هوشمند', 'بند چرمی'],
      amount: '۱,۲۰۰,۰۰۰',
      status: 'shipped',
      date: '۱۴۰۲/۱۲/۱۱',
      paymentMethod: 'کارت اعتباری',
      shippingAddress: 'تبریز، خیابان امام، پلاک ۵۶۷',
      trackingNumber: 'TRK-۵۵۵۵۵۵۵۵۵',
      notes: 'تحویل در صبح',
    },
  ]

  // Filter and search orders
  const filteredOrders = enhancedOrders.filter((order) => {
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.includes(searchQuery) ||
                         order.products.some(product => product.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = !statusFilter || order.status === statusFilter
    const matchesDate = !dateFilter || order.date === dateFilter
    return matchesSearch && matchesStatus && matchesDate
  })

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage)

  // Form validation
  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.customer.trim()) {
      errors.customer = 'نام مشتری الزامی است'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'ایمیل الزامی است'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'ایمیل معتبر نیست'
    }
    
    if (!formData.products.trim()) {
      errors.products = 'محصولات الزامی است'
    }
    
    if (!formData.amount.trim()) {
      errors.amount = 'مبلغ الزامی است'
    } else if (!/^\d+$/.test(formData.amount.replace(/[^\d]/g, ''))) {
      errors.amount = 'مبلغ معتبر نیست'
    }
    
    if (!formData.shippingAddress.trim()) {
      errors.shippingAddress = 'آدرس ارسال الزامی است'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      if (isEditModalOpen && selectedOrder) {
        console.log('Updating order:', { ...selectedOrder, ...formData })
      } else {
        console.log('Adding new order:', formData)
      }
      
      setFormData({
        customer: '',
        email: '',
        products: '',
        amount: '',
        status: 'pending',
        paymentMethod: 'online',
        shippingAddress: '',
      })
      setFormErrors({})
      setIsAddModalOpen(false)
      setIsEditModalOpen(false)
      setSelectedOrder(null)
    }
  }

  // Handle edit order
  const handleEditOrder = (order: any) => {
    setSelectedOrder(order)
    setFormData({
      customer: order.customer,
      email: order.email,
      products: order.products.join(', '),
      amount: order.amount,
      status: order.status,
      paymentMethod: order.paymentMethod === 'کارت اعتباری' ? 'card' : 'online',
      shippingAddress: order.shippingAddress,
    })
    setFormErrors({})
    setIsEditModalOpen(true)
  }

  // Handle view order
  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setIsViewModalOpen(true)
  }

  // Handle delete order
  const handleDeleteOrder = (order: any) => {
    setSelectedOrder(order)
    setIsDeleteModalOpen(true)
  }

  // Confirm delete
  const confirmDelete = () => {
    console.log('Deleting order:', selectedOrder)
    setIsDeleteModalOpen(false)
    setSelectedOrder(null)
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Box>
          <Title order={2} mb="xs">
            مدیریت سفارشات
          </Title>
          <Text c="dimmed">
            مشاهده و مدیریت سفارشات مشتریان
          </Text>
        </Box>
        <Button 
          leftSection={<IconPlus size={16} />}
          onClick={() => {
            setFormData({
              customer: '',
              email: '',
              products: '',
              amount: '',
              status: 'pending',
              paymentMethod: 'online',
              shippingAddress: '',
            })
            setFormErrors({})
            setIsAddModalOpen(true)
          }}
        >
          ایجاد سفارش جدید
        </Button>
      </Group>

      {/* Filters and Search */}
      <Card padding="lg" radius="md" withBorder>
        <Group gap="md" wrap="wrap">
          <TextInput
            placeholder="جستجو بر اساس مشتری، ایمیل، شماره سفارش یا محصولات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1, minWidth: 300 }}
          />
          <Select
            placeholder="فیلتر بر اساس وضعیت"
            value={statusFilter}
            onChange={setStatusFilter}
            data={[
              { value: 'completed', label: 'تکمیل شده' },
              { value: 'pending', label: 'در انتظار' },
              { value: 'processing', label: 'در حال پردازش' },
              { value: 'shipped', label: 'ارسال شده' },
              { value: 'cancelled', label: 'لغو شده' },
            ]}
            clearable
            style={{ minWidth: 150 }}
          />
          <Select
            placeholder="فیلتر بر اساس تاریخ"
            value={dateFilter}
            onChange={setDateFilter}
            data={[
              { value: '۱۴۰۲/۱۲/۱۵', label: '۱۴۰۲/۱۲/۱۵' },
              { value: '۱۴۰۲/۱۲/۱۴', label: '۱۴۰۲/۱۲/۱۴' },
              { value: '۱۴۰۲/۱۲/۱۳', label: '۱۴۰۲/۱۲/۱۳' },
              { value: '۱۴۰۲/۱۲/۱۲', label: '۱۴۰۲/۱۲/۱۲' },
              { value: '۱۴۰۲/۱۲/۱۱', label: '۱۴۰۲/۱۲/۱۱' },
            ]}
            clearable
            style={{ minWidth: 150 }}
          />
          <Button
            variant="light"
            leftSection={<IconRefresh size={16} />}
            onClick={() => {
              setSearchQuery('')
              setStatusFilter(null)
              setDateFilter(null)
              setCurrentPage(1)
            }}
          >
            پاک کردن فیلترها
          </Button>
        </Group>
      </Card>

      {/* Orders Table */}
      <Card padding="lg" radius="md" withBorder>
        <Box style={{ overflowX: 'auto' }}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>شماره سفارش</Table.Th>
                <Table.Th>مشتری</Table.Th>
                <Table.Th>محصولات</Table.Th>
                <Table.Th>مبلغ</Table.Th>
                <Table.Th>وضعیت</Table.Th>
                <Table.Th>تاریخ</Table.Th>
                <Table.Th>عملیات</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginatedOrders.map((order) => (
                <Table.Tr key={order.id}>
                  <Table.Td>
                    <Text fw={500} size="sm">
                      {order.id}
                    </Text>
                  </Table.Td>
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
                        <Text c="dimmed" size="xs">
                          {order.phone}
                        </Text>
                      </div>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">
                      {order.products.join(', ')}
                    </Text>
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
                      <ActionIcon 
                        variant="light" 
                        size="sm"
                        onClick={() => handleViewOrder(order)}
                        title="مشاهده جزئیات"
                      >
                        <IconEye size={16} />
                      </ActionIcon>
                      <ActionIcon 
                        variant="light" 
                        size="sm"
                        onClick={() => handleEditOrder(order)}
                        title="ویرایش سفارش"
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon 
                        variant="light" 
                        size="sm" 
                        color="red"
                        onClick={() => handleDeleteOrder(order)}
                        title="حذف سفارش"
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>

        {/* Pagination */}
        {totalPages > 1 && (
          <Group justify="center" mt="lg">
            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={setCurrentPage}
              withEdges
              size="sm"
            />
          </Group>
        )}

        {/* Results Summary */}
        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">
            نمایش {startIndex + 1} تا {Math.min(startIndex + itemsPerPage, filteredOrders.length)} از {filteredOrders.length} سفارش
          </Text>
          <Text size="sm" c="dimmed">
            صفحه {currentPage} از {totalPages}
          </Text>
        </Group>
      </Card>

      {/* Add Order Modal */}
      <Modal
        opened={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="ایجاد سفارش جدید"
        size="lg"
        centered
      >
        <Stack gap="md">
          <SimpleGrid cols={2}>
            <TextInput
              label="نام مشتری"
              placeholder="نام و نام خانوادگی"
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              error={formErrors.customer}
              required
            />
            <TextInput
              label="ایمیل"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={formErrors.email}
              required
            />
          </SimpleGrid>
          
          <Textarea
            label="محصولات"
            placeholder="محصولات سفارش (جدا شده با کاما)"
            value={formData.products}
            onChange={(e) => setFormData({ ...formData, products: e.target.value })}
            error={formErrors.products}
            required
            rows={3}
          />
          
          <SimpleGrid cols={2}>
            <TextInput
              label="مبلغ (تومان)"
              placeholder="۲,۵۰۰,۰۰۰"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              error={formErrors.amount}
              required
            />
            <Select
              label="وضعیت"
              value={formData.status}
              onChange={(value) => setFormData({ ...formData, status: value || 'pending' })}
              data={[
                { value: 'pending', label: 'در انتظار' },
                { value: 'processing', label: 'در حال پردازش' },
                { value: 'shipped', label: 'ارسال شده' },
                { value: 'completed', label: 'تکمیل شده' },
                { value: 'cancelled', label: 'لغو شده' },
              ]}
              required
            />
          </SimpleGrid>
          
          <Select
            label="روش پرداخت"
            value={formData.paymentMethod}
            onChange={(value) => setFormData({ ...formData, paymentMethod: value || 'online' })}
            data={[
              { value: 'online', label: 'پرداخت آنلاین' },
              { value: 'card', label: 'کارت اعتباری' },
              { value: 'cash', label: 'پرداخت نقدی' },
            ]}
            required
          />
          
          <Textarea
            label="آدرس ارسال"
            placeholder="آدرس کامل ارسال"
            value={formData.shippingAddress}
            onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
            error={formErrors.shippingAddress}
            required
            rows={3}
          />
          
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={() => setIsAddModalOpen(false)}>
              انصراف
            </Button>
            <Button onClick={handleSubmit}>
              ایجاد سفارش
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Edit Order Modal */}
      <Modal
        opened={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="ویرایش سفارش"
        size="lg"
        centered
      >
        <Stack gap="md">
          <SimpleGrid cols={2}>
            <TextInput
              label="نام مشتری"
              placeholder="نام و نام خانوادگی"
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              error={formErrors.customer}
              required
            />
            <TextInput
              label="ایمیل"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={formErrors.email}
              required
            />
          </SimpleGrid>
          
          <Textarea
            label="محصولات"
            placeholder="محصولات سفارش (جدا شده با کاما)"
            value={formData.products}
            onChange={(e) => setFormData({ ...formData, products: e.target.value })}
            error={formErrors.products}
            required
            rows={3}
          />
          
          <SimpleGrid cols={2}>
            <TextInput
              label="مبلغ (تومان)"
              placeholder="۲,۵۰۰,۰۰۰"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              error={formErrors.amount}
              required
            />
            <Select
              label="وضعیت"
              value={formData.status}
              onChange={(value) => setFormData({ ...formData, status: value || 'pending' })}
              data={[
                { value: 'pending', label: 'در انتظار' },
                { value: 'processing', label: 'در حال پردازش' },
                { value: 'shipped', label: 'ارسال شده' },
                { value: 'completed', label: 'تکمیل شده' },
                { value: 'cancelled', label: 'لغو شده' },
              ]}
              required
            />
          </SimpleGrid>
          
          <Select
            label="روش پرداخت"
            value={formData.paymentMethod}
            onChange={(value) => setFormData({ ...formData, paymentMethod: value || 'online' })}
            data={[
              { value: 'online', label: 'پرداخت آنلاین' },
              { value: 'card', label: 'کارت اعتباری' },
              { value: 'cash', label: 'پرداخت نقدی' },
            ]}
            required
          />
          
          <Textarea
            label="آدرس ارسال"
            placeholder="آدرس کامل ارسال"
            value={formData.shippingAddress}
            onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
            error={formErrors.shippingAddress}
            required
            rows={3}
          />
          
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={() => setIsEditModalOpen(false)}>
              انصراف
            </Button>
            <Button onClick={handleSubmit}>
              ذخیره تغییرات
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* View Order Modal */}
      <Modal
        opened={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="جزئیات سفارش"
        size="lg"
        centered
      >
        {selectedOrder && (
          <Stack gap="md">
            <Group>
              <Avatar size="lg" radius="xl" />
              <div>
                <Title order={4}>{selectedOrder.customer}</Title>
                <Text c="dimmed">{selectedOrder.email}</Text>
                <Text c="dimmed" size="sm">{selectedOrder.phone}</Text>
              </div>
            </Group>
            
            <Divider />
            
            <SimpleGrid cols={2} spacing="md">
              <Box>
                <Text size="sm" c="dimmed">شماره سفارش</Text>
                <Text fw={500}>{selectedOrder.id}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">وضعیت</Text>
                <Text fw={500}>{getStatusBadge(selectedOrder.status)}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">مبلغ</Text>
                <Text fw={500}>{selectedOrder.amount} تومان</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">تاریخ سفارش</Text>
                <Text fw={500}>{selectedOrder.date}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">روش پرداخت</Text>
                <Text fw={500}>{selectedOrder.paymentMethod}</Text>
              </Box>
              {selectedOrder.trackingNumber && (
                <Box>
                  <Text size="sm" c="dimmed">شماره پیگیری</Text>
                  <Text fw={500}>{selectedOrder.trackingNumber}</Text>
                </Box>
              )}
            </SimpleGrid>
            
            <Box>
              <Text size="sm" c="dimmed" mb="xs">محصولات</Text>
              <Card withBorder p="sm">
                {selectedOrder.products.map((product: string, index: number) => (
                  <Text key={index} size="sm">• {product}</Text>
                ))}
              </Card>
            </Box>
            
            <Box>
              <Text size="sm" c="dimmed" mb="xs">آدرس ارسال</Text>
              <Text size="sm">{selectedOrder.shippingAddress}</Text>
            </Box>
            
            {selectedOrder.notes && (
              <Box>
                <Text size="sm" c="dimmed" mb="xs">یادداشت</Text>
                <Text size="sm">{selectedOrder.notes}</Text>
              </Box>
            )}

            <Group justify="flex-end" mt="md">
              <Button variant="light" onClick={() => setIsViewModalOpen(false)}>
                بستن
              </Button>
              <Button 
                onClick={() => {
                  setIsViewModalOpen(false)
                  handleEditOrder(selectedOrder)
                }}
              >
                ویرایش سفارش
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="تأیید حذف"
        size="sm"
        centered
      >
        {selectedOrder && (
          <Stack gap="md">
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="هشدار"
              color="red"
              variant="light"
            >
              آیا از حذف سفارش <strong>{selectedOrder.id}</strong> اطمینان دارید؟
              این عملیات غیرقابل بازگشت است.
            </Alert>
            
            <Group justify="flex-end" mt="md">
              <Button variant="light" onClick={() => setIsDeleteModalOpen(false)}>
                انصراف
              </Button>
              <Button color="red" onClick={confirmDelete}>
                حذف سفارش
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Stack>
  )
}

function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'available',
    description: '',
    sku: '',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Enhanced products data with more details
  const enhancedProducts = [
    {
      id: 1,
      name: 'لپ‌تاپ اپل مک‌بوک پرو',
      category: 'لپ‌تاپ',
      price: '۸۵,۰۰۰,۰۰۰',
      stock: 15,
      status: 'available',
      sales: 45,
      rating: 4.8,
      sku: 'MBP-001',
      description: 'لپ‌تاپ اپل مک‌بوک پرو با پردازنده M2 و ۱۶ گیگابایت رم',
      image: '',
      weight: '۱.۴ کیلوگرم',
      dimensions: '۳۰.۴۱ × ۲۱.۲۴ × ۱.۵۶ سانتی‌متر',
      warranty: '۲ سال',
    },
    {
      id: 2,
      name: 'گوشی سامسونگ گلکسی S24',
      category: 'گوشی موبایل',
      price: '۳۲,۰۰۰,۰۰۰',
      stock: 28,
      status: 'available',
      sales: 67,
      rating: 4.6,
      sku: 'S24-001',
      description: 'گوشی هوشمند سامسونگ گلکسی S24 با دوربین ۲۰۰ مگاپیکسل',
      image: '',
      weight: '۱۶۷ گرم',
      dimensions: '۱۴۷ × ۷۰.۶ × ۷.۶ میلی‌متر',
      warranty: '۱ سال',
    },
    {
      id: 3,
      name: 'تبلت اپل آی‌پد پرو',
      category: 'تبلت',
      price: '۲۸,۰۰۰,۰۰۰',
      stock: 8,
      status: 'low_stock',
      sales: 23,
      rating: 4.9,
      sku: 'IPAD-001',
      description: 'تبلت اپل آی‌پد پرو با نمایشگر ۱۲.۹ اینچی و قلم Apple Pencil',
      image: '',
      weight: '۶۸۲ گرم',
      dimensions: '۲۸۰.۶ × ۲۱۴.۹ × ۵.۹ میلی‌متر',
      warranty: '۱ سال',
    },
    {
      id: 4,
      name: 'هدفون سونی WH-1000XM5',
      category: 'صوتی',
      price: '۱۲,۰۰۰,۰۰۰',
      stock: 0,
      status: 'out_of_stock',
      sales: 89,
      rating: 4.7,
      sku: 'SONY-001',
      description: 'هدفون بی‌سیم سونی با قابلیت حذف نویز و کیفیت صدای بالا',
      image: '',
      weight: '۲۵۰ گرم',
      dimensions: '۱۶۵ × ۷۶.۵ × ۲۲۷ میلی‌متر',
      warranty: '۲ سال',
    },
    {
      id: 5,
      name: 'ساعت هوشمند اپل واچ',
      category: 'پوشیدنی',
      price: '۱۸,۰۰۰,۰۰۰',
      stock: 12,
      status: 'available',
      sales: 34,
      rating: 4.5,
      sku: 'WATCH-001',
      description: 'ساعت هوشمند اپل واچ با قابلیت‌های سلامتی و ورزشی',
      image: '',
      weight: '۳۰.۵ گرم',
      dimensions: '۴۱ × ۳۵ × ۱۰.۷ میلی‌متر',
      warranty: '۱ سال',
    },
  ]

  // Filter and search products
  const filteredProducts = enhancedProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !categoryFilter || product.category === categoryFilter
    const matchesStatus = !statusFilter || product.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  // Form validation
  const validateForm = () => {
    const errors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      errors.name = 'نام محصول الزامی است'
    }
    
    if (!formData.category.trim()) {
      errors.category = 'دسته‌بندی الزامی است'
    }
    
    if (!formData.price.trim()) {
      errors.price = 'قیمت الزامی است'
    } else if (!/^\d+$/.test(formData.price.replace(/[^\d]/g, ''))) {
      errors.price = 'قیمت معتبر نیست'
    }
    
    if (!formData.stock.trim()) {
      errors.stock = 'موجودی الزامی است'
    } else if (!/^\d+$/.test(formData.stock)) {
      errors.stock = 'موجودی معتبر نیست'
    }
    
    if (!formData.sku.trim()) {
      errors.sku = 'کد محصول الزامی است'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      if (isEditModalOpen && selectedProduct) {
        console.log('Updating product:', { ...selectedProduct, ...formData })
      } else {
        console.log('Adding new product:', formData)
      }
      
      setFormData({
        name: '',
        category: '',
        price: '',
        stock: '',
        status: 'available',
        description: '',
        sku: '',
      })
      setFormErrors({})
      setIsAddModalOpen(false)
      setIsEditModalOpen(false)
      setSelectedProduct(null)
    }
  }

  // Handle edit product
  const handleEditProduct = (product: any) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock.toString(),
      status: product.status,
      description: product.description,
      sku: product.sku,
    })
    setFormErrors({})
    setIsEditModalOpen(true)
  }

  // Handle view product
  const handleViewProduct = (product: any) => {
    setSelectedProduct(product)
    setIsViewModalOpen(true)
  }

  // Handle delete product
  const handleDeleteProduct = (product: any) => {
    setSelectedProduct(product)
    setIsDeleteModalOpen(true)
  }

  // Confirm delete
  const confirmDelete = () => {
    console.log('Deleting product:', selectedProduct)
    setIsDeleteModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Box>
          <Title order={2} mb="xs">
            مدیریت محصولات
          </Title>
          <Text c="dimmed">
            مشاهده و مدیریت محصولات فروشگاه
          </Text>
        </Box>
        <Button 
          leftSection={<IconPlus size={16} />}
          onClick={() => {
            setFormData({
              name: '',
              category: '',
              price: '',
              stock: '',
              status: 'available',
              description: '',
              sku: '',
            })
            setFormErrors({})
            setIsAddModalOpen(true)
          }}
        >
          افزودن محصول جدید
        </Button>
      </Group>

      {/* Filters and Search */}
      <Card padding="lg" radius="md" withBorder>
        <Group gap="md" wrap="wrap">
          <TextInput
            placeholder="جستجو بر اساس نام، کد محصول یا دسته‌بندی..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1, minWidth: 300 }}
          />
          <Select
            placeholder="فیلتر بر اساس دسته‌بندی"
            value={categoryFilter}
            onChange={setCategoryFilter}
            data={[
              { value: 'لپ‌تاپ', label: 'لپ‌تاپ' },
              { value: 'گوشی موبایل', label: 'گوشی موبایل' },
              { value: 'تبلت', label: 'تبلت' },
              { value: 'صوتی', label: 'صوتی' },
              { value: 'پوشیدنی', label: 'پوشیدنی' },
            ]}
            clearable
            style={{ minWidth: 150 }}
          />
          <Select
            placeholder="فیلتر بر اساس وضعیت"
            value={statusFilter}
            onChange={setStatusFilter}
            data={[
              { value: 'available', label: 'موجود' },
              { value: 'low_stock', label: 'موجودی کم' },
              { value: 'out_of_stock', label: 'ناموجود' },
            ]}
            clearable
            style={{ minWidth: 150 }}
          />
          <Button
            variant="light"
            leftSection={<IconRefresh size={16} />}
            onClick={() => {
              setSearchQuery('')
              setCategoryFilter(null)
              setStatusFilter(null)
              setCurrentPage(1)
            }}
          >
            پاک کردن فیلترها
          </Button>
        </Group>
      </Card>

      {/* Products Table */}
      <Card padding="lg" radius="md" withBorder>
        <Box style={{ overflowX: 'auto' }}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>محصول</Table.Th>
                <Table.Th>کد محصول</Table.Th>
                <Table.Th>دسته‌بندی</Table.Th>
                <Table.Th>قیمت</Table.Th>
                <Table.Th>موجودی</Table.Th>
                <Table.Th>وضعیت</Table.Th>
                <Table.Th>عملیات</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {paginatedProducts.map((product) => (
                <Table.Tr key={product.id}>
                  <Table.Td>
                    <Group gap="sm">
                      <Avatar size="sm" radius="xl" />
                      <div>
                        <Text fw={500} size="sm">
                          {product.name}
                        </Text>
                        <Group gap="xs">
                          <IconStar size={14} style={{ color: '#ffd700' }} />
                          <Text size="xs" c="dimmed">
                            {product.rating}
                          </Text>
                        </Group>
                        <Text size="xs" c="dimmed">
                          {product.sales} فروش
                        </Text>
                      </div>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={500}>{product.sku}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{product.category}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text fw={500}>{product.price} تومان</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={500}>{product.stock}</Text>
                  </Table.Td>
                  <Table.Td>{getStatusBadge(product.status)}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon 
                        variant="light" 
                        size="sm"
                        onClick={() => handleViewProduct(product)}
                        title="مشاهده جزئیات"
                      >
                        <IconEye size={16} />
                      </ActionIcon>
                      <ActionIcon 
                        variant="light" 
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                        title="ویرایش محصول"
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon 
                        variant="light" 
                        size="sm" 
                        color="red"
                        onClick={() => handleDeleteProduct(product)}
                        title="حذف محصول"
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>

        {/* Pagination */}
        {totalPages > 1 && (
          <Group justify="center" mt="lg">
            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={setCurrentPage}
              withEdges
              size="sm"
            />
          </Group>
        )}

        {/* Results Summary */}
        <Group justify="space-between" mt="md">
          <Text size="sm" c="dimmed">
            نمایش {startIndex + 1} تا {Math.min(startIndex + itemsPerPage, filteredProducts.length)} از {filteredProducts.length} محصول
          </Text>
          <Text size="sm" c="dimmed">
            صفحه {currentPage} از {totalPages}
          </Text>
        </Group>
      </Card>

      {/* Add Product Modal */}
      <Modal
        opened={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="افزودن محصول جدید"
        size="lg"
        centered
      >
        <Stack gap="md">
          <SimpleGrid cols={2}>
            <TextInput
              label="نام محصول"
              placeholder="نام کامل محصول"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={formErrors.name}
              required
            />
            <TextInput
              label="کد محصول (SKU)"
              placeholder="MBP-001"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              error={formErrors.sku}
              required
            />
          </SimpleGrid>
          
          <SimpleGrid cols={2}>
            <Select
              label="دسته‌بندی"
              value={formData.category}
              onChange={(value) => setFormData({ ...formData, category: value || '' })}
              data={[
                { value: 'لپ‌تاپ', label: 'لپ‌تاپ' },
                { value: 'گوشی موبایل', label: 'گوشی موبایل' },
                { value: 'تبلت', label: 'تبلت' },
                { value: 'صوتی', label: 'صوتی' },
                { value: 'پوشیدنی', label: 'پوشیدنی' },
              ]}
              error={formErrors.category}
              required
            />
            <Select
              label="وضعیت"
              value={formData.status}
              onChange={(value) => setFormData({ ...formData, status: value || 'available' })}
              data={[
                { value: 'available', label: 'موجود' },
                { value: 'low_stock', label: 'موجودی کم' },
                { value: 'out_of_stock', label: 'ناموجود' },
              ]}
              required
            />
          </SimpleGrid>
          
          <SimpleGrid cols={2}>
            <TextInput
              label="قیمت (تومان)"
              placeholder="۸۵,۰۰۰,۰۰۰"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              error={formErrors.price}
              required
            />
            <NumberInput
              label="موجودی"
              placeholder="۱۵"
              value={formData.stock}
              onChange={(value) => setFormData({ ...formData, stock: value?.toString() || '' })}
              error={formErrors.stock}
              min={0}
              required
            />
          </SimpleGrid>
          
          <Textarea
            label="توضیحات"
            placeholder="توضیحات کامل محصول"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
          />
          
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={() => setIsAddModalOpen(false)}>
              انصراف
            </Button>
            <Button onClick={handleSubmit}>
              افزودن محصول
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        opened={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="ویرایش محصول"
        size="lg"
        centered
      >
        <Stack gap="md">
          <SimpleGrid cols={2}>
            <TextInput
              label="نام محصول"
              placeholder="نام کامل محصول"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={formErrors.name}
              required
            />
            <TextInput
              label="کد محصول (SKU)"
              placeholder="MBP-001"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              error={formErrors.sku}
              required
            />
          </SimpleGrid>
          
          <SimpleGrid cols={2}>
            <Select
              label="دسته‌بندی"
              value={formData.category}
              onChange={(value) => setFormData({ ...formData, category: value || '' })}
              data={[
                { value: 'لپ‌تاپ', label: 'لپ‌تاپ' },
                { value: 'گوشی موبایل', label: 'گوشی موبایل' },
                { value: 'تبلت', label: 'تبلت' },
                { value: 'صوتی', label: 'صوتی' },
                { value: 'پوشیدنی', label: 'پوشیدنی' },
              ]}
              error={formErrors.category}
              required
            />
            <Select
              label="وضعیت"
              value={formData.status}
              onChange={(value) => setFormData({ ...formData, status: value || 'available' })}
              data={[
                { value: 'available', label: 'موجود' },
                { value: 'low_stock', label: 'موجودی کم' },
                { value: 'out_of_stock', label: 'ناموجود' },
              ]}
              required
            />
          </SimpleGrid>
          
          <SimpleGrid cols={2}>
            <TextInput
              label="قیمت (تومان)"
              placeholder="۸۵,۰۰۰,۰۰۰"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              error={formErrors.price}
              required
            />
            <NumberInput
              label="موجودی"
              placeholder="۱۵"
              value={formData.stock}
              onChange={(value) => setFormData({ ...formData, stock: value?.toString() || '' })}
              error={formErrors.stock}
              min={0}
              required
            />
          </SimpleGrid>
          
          <Textarea
            label="توضیحات"
            placeholder="توضیحات کامل محصول"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
          />
          
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={() => setIsEditModalOpen(false)}>
              انصراف
            </Button>
            <Button onClick={handleSubmit}>
              ذخیره تغییرات
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* View Product Modal */}
      <Modal
        opened={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="جزئیات محصول"
        size="lg"
        centered
      >
        {selectedProduct && (
          <Stack gap="md">
            <Group>
              <Avatar size="lg" radius="xl" />
              <div>
                <Title order={4}>{selectedProduct.name}</Title>
                <Text c="dimmed">{selectedProduct.sku}</Text>
                <Group gap="xs">
                  <IconStar size={16} style={{ color: '#ffd700' }} />
                  <Text size="sm">{selectedProduct.rating}</Text>
                  <Text size="sm" c="dimmed">({selectedProduct.sales} فروش)</Text>
                </Group>
              </div>
            </Group>
            
            <Divider />
            
            <SimpleGrid cols={2} spacing="md">
              <Box>
                <Text size="sm" c="dimmed">دسته‌بندی</Text>
                <Text fw={500}>{selectedProduct.category}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">وضعیت</Text>
                <Text fw={500}>{getStatusBadge(selectedProduct.status)}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">قیمت</Text>
                <Text fw={500}>{selectedProduct.price} تومان</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">موجودی</Text>
                <Text fw={500}>{selectedProduct.stock}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">وزن</Text>
                <Text fw={500}>{selectedProduct.weight}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">ابعاد</Text>
                <Text fw={500}>{selectedProduct.dimensions}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed">گارانتی</Text>
                <Text fw={500}>{selectedProduct.warranty}</Text>
              </Box>
            </SimpleGrid>
            
            <Box>
              <Text size="sm" c="dimmed" mb="xs">توضیحات</Text>
              <Text size="sm">{selectedProduct.description}</Text>
            </Box>

            <Group justify="flex-end" mt="md">
              <Button variant="light" onClick={() => setIsViewModalOpen(false)}>
                بستن
              </Button>
              <Button 
                onClick={() => {
                  setIsViewModalOpen(false)
                  handleEditProduct(selectedProduct)
                }}
              >
                ویرایش محصول
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="تأیید حذف"
        size="sm"
        centered
      >
        {selectedProduct && (
          <Stack gap="md">
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="هشدار"
              color="red"
              variant="light"
            >
              آیا از حذف محصول <strong>{selectedProduct.name}</strong> اطمینان دارید؟
              این عملیات غیرقابل بازگشت است.
            </Alert>
            
            <Group justify="flex-end" mt="md">
              <Button variant="light" onClick={() => setIsDeleteModalOpen(false)}>
                انصراف
              </Button>
              <Button color="red" onClick={confirmDelete}>
                حذف محصول
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Stack>
  )
}

function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState('pdf')
  const [isLoading, setIsLoading] = useState(false)

  // Mock analytics data
  const analyticsData = {
    totalRevenue: '۱۲۵,۰۰۰,۰۰۰',
    totalOrders: 1247,
    totalCustomers: 892,
    averageOrderValue: '۱۰۰,۲۴۰',
    growthRate: 15.8,
    topProducts: [
      { name: 'لپ‌تاپ اپل مک‌بوک پرو', sales: 45, revenue: '۳۸,۲۵۰,۰۰۰' },
      { name: 'گوشی سامسونگ گلکسی S24', sales: 67, revenue: '۲۱,۴۴۰,۰۰۰' },
      { name: 'تبلت اپل آی‌پد پرو', sales: 23, revenue: '۶,۴۴۰,۰۰۰' },
      { name: 'هدفون سونی WH-1000XM5', sales: 89, revenue: '۱۰,۶۸۰,۰۰۰' },
      { name: 'ساعت هوشمند اپل واچ', sales: 34, revenue: '۶,۱۲۰,۰۰۰' },
    ],
    salesByCategory: [
      { category: 'لپ‌تاپ', sales: 156, revenue: '۴۲,۵۰۰,۰۰۰' },
      { category: 'گوشی موبایل', sales: 234, revenue: '۳۸,۲۰۰,۰۰۰' },
      { category: 'تبلت', sales: 89, revenue: '۱۸,۵۰۰,۰۰۰' },
      { category: 'صوتی', sales: 167, revenue: '۱۵,۸۰۰,۰۰۰' },
      { category: 'پوشیدنی', sales: 78, revenue: '۱۰,۰۰۰,۰۰۰' },
    ],
    monthlyRevenue: [
      { month: 'فروردین', revenue: 85000000 },
      { month: 'اردیبهشت', revenue: 92000000 },
      { month: 'خرداد', revenue: 88000000 },
      { month: 'تیر', revenue: 95000000 },
      { month: 'مرداد', revenue: 102000000 },
      { month: 'شهریور', revenue: 98000000 },
      { month: 'مهر', revenue: 105000000 },
      { month: 'آبان', revenue: 112000000 },
      { month: 'آذر', revenue: 108000000 },
      { month: 'دی', revenue: 115000000 },
      { month: 'بهمن', revenue: 118000000 },
      { month: 'اسفند', revenue: 125000000 },
    ],
    recentActivity: [
      { type: 'order', message: 'سفارش جدید #۱۲۳۹ ثبت شد', time: '۲ دقیقه پیش', amount: '۲,۵۰۰,۰۰۰' },
      { type: 'payment', message: 'پرداخت سفارش #۱۲۳۸ تکمیل شد', time: '۱۵ دقیقه پیش', amount: '۱,۸۰۰,۰۰۰' },
      { type: 'user', message: 'کاربر جدید ثبت نام کرد', time: '۱ ساعت پیش', amount: '' },
      { type: 'product', message: 'محصول جدید اضافه شد', time: '۲ ساعت پیش', amount: '' },
      { type: 'order', message: 'سفارش #۱۲۳۷ لغو شد', time: '۳ ساعت پیش', amount: '۹۵۰,۰۰۰' },
    ],
  }

  // Handle export
  const handleExport = () => {
    setIsLoading(true)
    // Simulate export process
    setTimeout(() => {
      console.log(`Exporting report in ${exportFormat} format`)
      setIsLoading(false)
      setIsExportModalOpen(false)
    }, 2000)
  }

  // Get status color for activity items
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'order': return 'blue'
      case 'payment': return 'green'
      case 'user': return 'orange'
      case 'product': return 'purple'
      default: return 'gray'
    }
  }

  // Get activity icon
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return <IconShoppingCart size={16} />
      case 'payment': return <IconCreditCard size={16} />
      case 'user': return <IconUser size={16} />
      case 'product': return <IconPackage size={16} />
      default: return <IconInfoCircle size={16} />
    }
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Box>
          <Title order={2} mb="xs">
            گزارشات و تحلیل‌ها
          </Title>
          <Text c="dimmed">
            مشاهده آمار و تحلیل‌های فروشگاه
          </Text>
        </Box>
        <Button 
          leftSection={<IconDownload size={16} />}
          onClick={() => setIsExportModalOpen(true)}
        >
          خروجی گزارش
        </Button>
      </Group>

      {/* Filters */}
      <Card padding="lg" radius="md" withBorder>
        <Group gap="md" wrap="wrap">
          <Select
            label="دوره زمانی"
            value={selectedPeriod}
            onChange={(value) => setSelectedPeriod(value || 'month')}
            data={[
              { value: 'week', label: 'هفته جاری' },
              { value: 'month', label: 'ماه جاری' },
              { value: 'quarter', label: 'فصل جاری' },
              { value: 'year', label: 'سال جاری' },
            ]}
            style={{ minWidth: 150 }}
          />
          <Select
            label="دسته‌بندی"
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value || 'all')}
            data={[
              { value: 'all', label: 'همه دسته‌ها' },
              { value: 'laptop', label: 'لپ‌تاپ' },
              { value: 'mobile', label: 'گوشی موبایل' },
              { value: 'tablet', label: 'تبلت' },
              { value: 'audio', label: 'صوتی' },
              { value: 'wearable', label: 'پوشیدنی' },
            ]}
            style={{ minWidth: 150 }}
          />
          <Button
            variant="light"
            leftSection={<IconRefresh size={16} />}
            onClick={() => {
              setSelectedPeriod('month')
              setSelectedCategory('all')
              setDateRange([null, null])
            }}
          >
            بازنشانی فیلترها
          </Button>
        </Group>
      </Card>

      {/* Key Metrics */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        <Card padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <ThemeIcon size="lg" radius="md" color="blue">
              <IconCurrencyDollar size={20} />
            </ThemeIcon>
            <Badge color="green" variant="light">
              +{analyticsData.growthRate}%
            </Badge>
          </Group>
          <Text size="lg" fw={700}>
            {analyticsData.totalRevenue} تومان
          </Text>
          <Text size="sm" c="dimmed">
            درآمد کل
          </Text>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <ThemeIcon size="lg" radius="md" color="green">
              <IconShoppingCart size={20} />
            </ThemeIcon>
            <Badge color="blue" variant="light">
              {analyticsData.totalOrders}
            </Badge>
          </Group>
          <Text size="lg" fw={700}>
            {analyticsData.totalOrders.toLocaleString('fa-IR')}
          </Text>
          <Text size="sm" c="dimmed">
            تعداد سفارشات
          </Text>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <ThemeIcon size="lg" radius="md" color="orange">
              <IconUsers size={20} />
            </ThemeIcon>
            <Badge color="green" variant="light">
              +۱۲%
            </Badge>
          </Group>
          <Text size="lg" fw={700}>
            {analyticsData.totalCustomers.toLocaleString('fa-IR')}
          </Text>
          <Text size="sm" c="dimmed">
            مشتریان فعال
          </Text>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <ThemeIcon size="lg" radius="md" color="purple">
              <IconTrendingUp size={20} />
            </ThemeIcon>
            <Badge color="blue" variant="light">
              {analyticsData.averageOrderValue}
            </Badge>
          </Group>
          <Text size="lg" fw={700}>
            {analyticsData.averageOrderValue} تومان
          </Text>
          <Text size="sm" c="dimmed">
            میانگین سفارش
          </Text>
        </Card>
      </SimpleGrid>

      {/* Charts and Analytics */}
      <Grid>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Card padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="md">
              <Title order={3}>درآمد ماهانه</Title>
              <Button variant="light" size="sm">مشاهده جزئیات</Button>
            </Group>
            <Box style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Stack align="center" gap="md">
                <IconChartBar size={48} style={{ color: '#228be6' }} />
                <Text c="dimmed">نمودار درآمد ماهانه</Text>
                <Text size="sm" c="dimmed">در اینجا نمودار تعاملی نمایش داده می‌شود</Text>
              </Stack>
            </Box>
            <SimpleGrid cols={3} mt="md">
              {analyticsData.monthlyRevenue.slice(-3).map((item, index) => (
                <Box key={index} ta="center">
                  <Text size="sm" c="dimmed">{item.month}</Text>
                  <Text fw={500}>{(item.revenue / 1000000).toFixed(0)}M</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack gap="md">
            <Card padding="lg" radius="md" withBorder>
              <Title order={3} mb="md">فروش بر اساس دسته‌بندی</Title>
              <Stack gap="sm">
                {analyticsData.salesByCategory.map((item, index) => (
                  <Box key={index}>
                    <Group justify="space-between" mb="xs">
                      <Text size="sm">{item.category}</Text>
                      <Text size="sm" fw={500}>{item.revenue}</Text>
                    </Group>
                    <Progress 
                      value={(item.sales / 724) * 100} 
                      size="sm" 
                      color={['blue', 'green', 'orange', 'purple', 'red'][index]}
                    />
                    <Text size="xs" c="dimmed" mt={4}>
                      {item.sales} فروش
                    </Text>
                  </Box>
                ))}
              </Stack>
            </Card>

            <Card padding="lg" radius="md" withBorder>
              <Title order={3} mb="md">محصولات پرفروش</Title>
              <Stack gap="sm">
                {analyticsData.topProducts.slice(0, 3).map((product, index) => (
                  <Group key={index} justify="space-between">
                    <Box>
                      <Text size="sm" fw={500}>{product.name}</Text>
                      <Text size="xs" c="dimmed">{product.sales} فروش</Text>
                    </Box>
                    <Text size="sm" fw={500}>{product.revenue}</Text>
                  </Group>
                ))}
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>

      {/* Recent Activity */}
      <Card padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={3}>فعالیت‌های اخیر</Title>
          <Button variant="light" size="sm">مشاهده همه</Button>
        </Group>
        <Stack gap="md">
          {analyticsData.recentActivity.map((activity, index) => (
            <Group key={index} gap="md">
              <ThemeIcon 
                size="md" 
                radius="xl" 
                color={getActivityColor(activity.type)}
              >
                {getActivityIcon(activity.type)}
              </ThemeIcon>
              <Box style={{ flex: 1 }}>
                <Text size="sm">{activity.message}</Text>
                <Text size="xs" c="dimmed">{activity.time}</Text>
              </Box>
              {activity.amount && (
                <Text size="sm" fw={500} c="green">
                  {activity.amount} تومان
                </Text>
              )}
            </Group>
          ))}
        </Stack>
      </Card>

      {/* Performance Metrics */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card padding="lg" radius="md" withBorder>
            <Title order={3} mb="md">عملکرد سیستم</Title>
            <Stack gap="md">
              <Box>
                <Group justify="space-between" mb="xs">
                  <Text size="sm">استفاده از CPU</Text>
                  <Text size="sm" fw={500}>۶۸%</Text>
                </Group>
                <Progress value={68} size="sm" color="blue" />
              </Box>
              <Box>
                <Group justify="space-between" mb="xs">
                  <Text size="sm">استفاده از RAM</Text>
                  <Text size="sm" fw={500}>۴۲%</Text>
                </Group>
                <Progress value={42} size="sm" color="green" />
              </Box>
              <Box>
                <Group justify="space-between" mb="xs">
                  <Text size="sm">فضای ذخیره‌سازی</Text>
                  <Text size="sm" fw={500}>۸۵%</Text>
                </Group>
                <Progress value={85} size="sm" color="orange" />
              </Box>
              <Box>
                <Group justify="space-between" mb="xs">
                  <Text size="sm">پهنای باند</Text>
                  <Text size="sm" fw={500}>۲۳%</Text>
                </Group>
                <Progress value={23} size="sm" color="purple" />
              </Box>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card padding="lg" radius="md" withBorder>
            <Title order={3} mb="md">آمار بازدید</Title>
            <Stack gap="md">
              <Group justify="space-between">
                <Text size="sm">بازدید امروز</Text>
                <Text size="sm" fw={500}>۲,۴۵۶</Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm">بازدید هفته</Text>
                <Text size="sm" fw={500}>۱۲,۸۹۰</Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm">بازدید ماه</Text>
                <Text size="sm" fw={500}>۴۵,۶۷۲</Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm">نرخ تبدیل</Text>
                <Text size="sm" fw={500}>۳.۲%</Text>
              </Group>
              <Divider />
              <RingProgress
                size={80}
                thickness={8}
                sections={[{ value: 32, color: 'blue' }]}
                label={
                  <Text ta="center" size="xs" fw={500}>
                    ۳۲%
                  </Text>
                }
              />
              <Text size="xs" c="dimmed" ta="center">
                نرخ تبدیل کلی
              </Text>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Export Modal */}
      <Modal
        opened={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="خروجی گزارش"
        size="sm"
        centered
      >
        <Stack gap="md">
          <Select
            label="فرمت خروجی"
            value={exportFormat}
            onChange={(value) => setExportFormat(value || 'pdf')}
            data={[
              { value: 'pdf', label: 'PDF' },
              { value: 'excel', label: 'Excel' },
              { value: 'csv', label: 'CSV' },
              { value: 'json', label: 'JSON' },
            ]}
            required
          />
          
          <Alert
            icon={<IconInfoCircle size={16} />}
            title="اطلاعات"
            color="blue"
            variant="light"
          >
            گزارش شامل تمام آمار و تحلیل‌های انتخاب شده خواهد بود.
          </Alert>
          
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={() => setIsExportModalOpen(false)}>
              انصراف
            </Button>
            <Button 
              onClick={handleExport}
              loading={isLoading}
              leftSection={<IconDownload size={16} />}
            >
              دانلود گزارش
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  )
}

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Profile form data
  const [profileData, setProfileData] = useState({
    firstName: 'احمد',
    lastName: 'محمدی',
    email: 'ahmad@example.com',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    company: 'شرکت فناوری پیشرو',
    position: 'مدیر فنی',
    bio: 'مدیر فنی با ۸ سال تجربه در زمینه توسعه نرم‌افزار',
  })

  // Password form data
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderUpdates: true,
    productUpdates: false,
    systemAlerts: true,
    marketingEmails: false,
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    loginAlerts: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    ipWhitelist: false,
    allowedIPs: '',
  })

  // System settings
  const [systemSettings, setSystemSettings] = useState({
    language: 'fa',
    timezone: 'Asia/Tehran',
    dateFormat: 'YYYY/MM/DD',
    currency: 'IRR',
    theme: 'light',
    autoBackup: true,
    backupFrequency: 'daily',
  })

  // Handle profile save
  const handleProfileSave = () => {
    setIsLoading(true)
    setTimeout(() => {
      console.log('Saving profile:', profileData)
      setIsLoading(false)
      setIsProfileModalOpen(false)
    }, 1000)
  }

  // Handle password change
  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('رمز عبور جدید و تکرار آن یکسان نیستند')
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      console.log('Changing password:', passwordData)
      setIsLoading(false)
      setIsPasswordModalOpen(false)
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    }, 1000)
  }

  // Handle backup
  const handleBackup = () => {
    setIsLoading(true)
    setTimeout(() => {
      console.log('Creating backup...')
      setIsLoading(false)
      setIsBackupModalOpen(false)
    }, 2000)
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Box>
          <Title order={2} mb="xs">
            تنظیمات
          </Title>
          <Text c="dimmed">
            مدیریت تنظیمات سیستم و حساب کاربری
          </Text>
        </Box>
        <Button 
          leftSection={<IconDeviceFloppy size={16} />}
          onClick={() => console.log('Saving all settings')}
        >
          ذخیره همه تنظیمات
        </Button>
      </Group>

      <Tabs value={activeTab} onChange={(value) => setActiveTab(value || 'profile')}>
        <Tabs.List>
          <Tabs.Tab value="profile" leftSection={<IconUser size={16} />}>
            پروفایل
          </Tabs.Tab>
          <Tabs.Tab value="notifications" leftSection={<IconBell size={16} />}>
            اعلان‌ها
          </Tabs.Tab>
          <Tabs.Tab value="security" leftSection={<IconShield size={16} />}>
            امنیت
          </Tabs.Tab>
          <Tabs.Tab value="system" leftSection={<IconSettings size={16} />}>
            سیستم
          </Tabs.Tab>
        </Tabs.List>

        {/* Profile Tab */}
        <Tabs.Panel value="profile" pt="md">
          <Card padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="lg">
              <Title order={3}>اطلاعات پروفایل</Title>
              <Button 
                variant="light" 
                leftSection={<IconEdit size={16} />}
                onClick={() => setIsProfileModalOpen(true)}
              >
                ویرایش
              </Button>
            </Group>
            
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
              <Box>
                <Text size="sm" c="dimmed" mb="xs">نام و نام خانوادگی</Text>
                <Text fw={500}>{profileData.firstName} {profileData.lastName}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed" mb="xs">ایمیل</Text>
                <Text fw={500}>{profileData.email}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed" mb="xs">شماره تلفن</Text>
                <Text fw={500}>{profileData.phone}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed" mb="xs">شرکت</Text>
                <Text fw={500}>{profileData.company}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed" mb="xs">سمت</Text>
                <Text fw={500}>{profileData.position}</Text>
              </Box>
              <Box>
                <Text size="sm" c="dimmed" mb="xs">درباره</Text>
                <Text fw={500}>{profileData.bio}</Text>
              </Box>
            </SimpleGrid>

            <Divider my="lg" />

            <Group>
              <Button 
                variant="light" 
                leftSection={<IconKey size={16} />}
                onClick={() => setIsPasswordModalOpen(true)}
              >
                تغییر رمز عبور
              </Button>
              <Button 
                variant="light" 
                leftSection={<IconDownload size={16} />}
                onClick={() => setIsBackupModalOpen(true)}
              >
                پشتیبان‌گیری
              </Button>
            </Group>
          </Card>
        </Tabs.Panel>

        {/* Notifications Tab */}
        <Tabs.Panel value="notifications" pt="md">
          <Card padding="lg" radius="md" withBorder>
            <Title order={3} mb="lg">تنظیمات اعلان‌ها</Title>
            
            <Stack gap="lg">
              <Box>
                <Text fw={500} mb="md">کانال‌های اعلان</Text>
                <Stack gap="sm">
                  <Switch
                    label="اعلان‌های ایمیل"
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      emailNotifications: e.currentTarget.checked
                    })}
                  />
                  <Switch
                    label="اعلان‌های پیامک"
                    checked={notificationSettings.smsNotifications}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      smsNotifications: e.currentTarget.checked
                    })}
                  />
                  <Switch
                    label="اعلان‌های مرورگر"
                    checked={notificationSettings.pushNotifications}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      pushNotifications: e.currentTarget.checked
                    })}
                  />
                </Stack>
              </Box>

              <Divider />

              <Box>
                <Text fw={500} mb="md">نوع اعلان‌ها</Text>
                <Stack gap="sm">
                  <Switch
                    label="به‌روزرسانی سفارشات"
                    checked={notificationSettings.orderUpdates}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      orderUpdates: e.currentTarget.checked
                    })}
                  />
                  <Switch
                    label="به‌روزرسانی محصولات"
                    checked={notificationSettings.productUpdates}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      productUpdates: e.currentTarget.checked
                    })}
                  />
                  <Switch
                    label="هشدارهای سیستم"
                    checked={notificationSettings.systemAlerts}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      systemAlerts: e.currentTarget.checked
                    })}
                  />
                  <Switch
                    label="ایمیل‌های تبلیغاتی"
                    checked={notificationSettings.marketingEmails}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      marketingEmails: e.currentTarget.checked
                    })}
                  />
                </Stack>
              </Box>
            </Stack>
          </Card>
        </Tabs.Panel>

        {/* Security Tab */}
        <Tabs.Panel value="security" pt="md">
          <Card padding="lg" radius="md" withBorder>
            <Title order={3} mb="lg">تنظیمات امنیتی</Title>
            
            <Stack gap="lg">
              <Box>
                <Text fw={500} mb="md">احراز هویت دو مرحله‌ای</Text>
                <Group>
                  <Switch
                    label="فعال‌سازی احراز هویت دو مرحله‌ای"
                    checked={securitySettings.twoFactorAuth}
                    onChange={(e) => setSecuritySettings({
                      ...securitySettings,
                      twoFactorAuth: e.currentTarget.checked
                    })}
                  />
                  <Button variant="light" size="sm">
                    تنظیم
                  </Button>
                </Group>
              </Box>

              <Divider />

              <Box>
                <Text fw={500} mb="md">هشدارهای ورود</Text>
                <Switch
                  label="اعلان ورود از دستگاه‌های جدید"
                  checked={securitySettings.loginAlerts}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    loginAlerts: e.currentTarget.checked
                  })}
                />
              </Box>

              <Divider />

              <Box>
                <Text fw={500} mb="md">مدیریت نشست</Text>
                <SimpleGrid cols={2}>
                  <NumberInput
                    label="مدت زمان نشست (دقیقه)"
                    value={securitySettings.sessionTimeout}
                    onChange={(value) => setSecuritySettings({
                      ...securitySettings,
                      sessionTimeout: typeof value === 'number' ? value : 30
                    })}
                    min={5}
                    max={480}
                  />
                  <NumberInput
                    label="انقضای رمز عبور (روز)"
                    value={securitySettings.passwordExpiry}
                    onChange={(value) => setSecuritySettings({
                      ...securitySettings,
                      passwordExpiry: typeof value === 'number' ? value : 90
                    })}
                    min={30}
                    max={365}
                  />
                </SimpleGrid>
              </Box>

              <Divider />

              <Box>
                <Text fw={500} mb="md">فهرست سفید IP</Text>
                <Switch
                  label="محدود کردن دسترسی به IP های خاص"
                  checked={securitySettings.ipWhitelist}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    ipWhitelist: e.currentTarget.checked
                  })}
                />
                {securitySettings.ipWhitelist && (
                  <TextInput
                    label="IP های مجاز (جدا شده با کاما)"
                    placeholder="192.168.1.1, 10.0.0.1"
                    value={securitySettings.allowedIPs}
                    onChange={(e) => setSecuritySettings({
                      ...securitySettings,
                      allowedIPs: e.target.value
                    })}
                    mt="sm"
                  />
                )}
              </Box>
            </Stack>
          </Card>
        </Tabs.Panel>

        {/* System Tab */}
        <Tabs.Panel value="system" pt="md">
          <Card padding="lg" radius="md" withBorder>
            <Title order={3} mb="lg">تنظیمات سیستم</Title>
            
            <Stack gap="lg">
              <SimpleGrid cols={{ base: 1, md: 2 }}>
                <Select
                  label="زبان"
                  value={systemSettings.language}
                  onChange={(value) => setSystemSettings({
                    ...systemSettings,
                    language: value || 'fa'
                  })}
                  data={[
                    { value: 'fa', label: 'فارسی' },
                    { value: 'en', label: 'English' },
                    { value: 'ar', label: 'العربية' },
                  ]}
                />
                <Select
                  label="منطقه زمانی"
                  value={systemSettings.timezone}
                  onChange={(value) => setSystemSettings({
                    ...systemSettings,
                    timezone: value || 'Asia/Tehran'
                  })}
                  data={[
                    { value: 'Asia/Tehran', label: 'تهران (UTC+3:30)' },
                    { value: 'UTC', label: 'UTC (UTC+0)' },
                    { value: 'America/New_York', label: 'نیویورک (UTC-5)' },
                  ]}
                />
              </SimpleGrid>

              <SimpleGrid cols={{ base: 1, md: 2 }}>
                <Select
                  label="فرمت تاریخ"
                  value={systemSettings.dateFormat}
                  onChange={(value) => setSystemSettings({
                    ...systemSettings,
                    dateFormat: value || 'YYYY/MM/DD'
                  })}
                  data={[
                    { value: 'YYYY/MM/DD', label: '۱۴۰۲/۱۲/۱۵' },
                    { value: 'DD/MM/YYYY', label: '۱۵/۱۲/۱۴۰۲' },
                    { value: 'MM/DD/YYYY', label: '۱۲/۱۵/۱۴۰۲' },
                  ]}
                />
                <Select
                  label="واحد پول"
                  value={systemSettings.currency}
                  onChange={(value) => setSystemSettings({
                    ...systemSettings,
                    currency: value || 'IRR'
                  })}
                  data={[
                    { value: 'IRR', label: 'ریال ایران' },
                    { value: 'USD', label: 'دلار آمریکا' },
                    { value: 'EUR', label: 'یورو' },
                  ]}
                />
              </SimpleGrid>

              <Divider />

              <Box>
                <Text fw={500} mb="md">پشتیبان‌گیری خودکار</Text>
                <Group>
                  <Switch
                    label="فعال‌سازی پشتیبان‌گیری خودکار"
                    checked={systemSettings.autoBackup}
                    onChange={(e) => setSystemSettings({
                      ...systemSettings,
                      autoBackup: e.currentTarget.checked
                    })}
                  />
                  <Select
                    label="فرکانس پشتیبان‌گیری"
                    value={systemSettings.backupFrequency}
                    onChange={(value) => setSystemSettings({
                      ...systemSettings,
                      backupFrequency: value || 'daily'
                    })}
                    data={[
                      { value: 'daily', label: 'روزانه' },
                      { value: 'weekly', label: 'هفتگی' },
                      { value: 'monthly', label: 'ماهانه' },
                    ]}
                    disabled={!systemSettings.autoBackup}
                  />
                </Group>
              </Box>

              <Divider />

              <Box>
                <Text fw={500} mb="md">ظاهر</Text>
                <Select
                  label="تم"
                  value={systemSettings.theme}
                  onChange={(value) => setSystemSettings({
                    ...systemSettings,
                    theme: value || 'light'
                  })}
                  data={[
                    { value: 'light', label: 'روشن' },
                    { value: 'dark', label: 'تیره' },
                    { value: 'auto', label: 'خودکار' },
                  ]}
                />
              </Box>
            </Stack>
          </Card>
        </Tabs.Panel>
      </Tabs>

      {/* Profile Edit Modal */}
      <Modal
        opened={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title="ویرایش پروفایل"
        size="lg"
        centered
      >
        <Stack gap="md">
          <SimpleGrid cols={2}>
            <TextInput
              label="نام"
              value={profileData.firstName}
              onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
              required
            />
            <TextInput
              label="نام خانوادگی"
              value={profileData.lastName}
              onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
              required
            />
          </SimpleGrid>
          
          <SimpleGrid cols={2}>
            <TextInput
              label="ایمیل"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              required
            />
            <TextInput
              label="شماره تلفن"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              required
            />
          </SimpleGrid>
          
          <SimpleGrid cols={2}>
            <TextInput
              label="شرکت"
              value={profileData.company}
              onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
            />
            <TextInput
              label="سمت"
              value={profileData.position}
              onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
            />
          </SimpleGrid>
          
          <Textarea
            label="درباره"
            value={profileData.bio}
            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
            rows={3}
          />
          
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={() => setIsProfileModalOpen(false)}>
              انصراف
            </Button>
            <Button onClick={handleProfileSave} loading={isLoading}>
              ذخیره تغییرات
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Password Change Modal */}
      <Modal
        opened={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="تغییر رمز عبور"
        size="md"
        centered
      >
        <Stack gap="md">
          <TextInput
            label="رمز عبور فعلی"
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            required
          />
          <TextInput
            label="رمز عبور جدید"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            required
          />
          <TextInput
            label="تکرار رمز عبور جدید"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            required
          />
          
          <Alert
            icon={<IconInfoCircle size={16} />}
            title="نکات امنیتی"
            color="blue"
            variant="light"
          >
            رمز عبور باید حداقل ۸ کاراکتر و شامل حروف بزرگ، کوچک و اعداد باشد.
          </Alert>
          
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={() => setIsPasswordModalOpen(false)}>
              انصراف
            </Button>
            <Button onClick={handlePasswordChange} loading={isLoading}>
              تغییر رمز عبور
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Backup Modal */}
      <Modal
        opened={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        title="پشتیبان‌گیری از سیستم"
        size="md"
        centered
      >
        <Stack gap="md">
          <Alert
            icon={<IconInfoCircle size={16} />}
            title="اطلاعات پشتیبان‌گیری"
            color="blue"
            variant="light"
          >
            این عملیات تمام داده‌های سیستم را در یک فایل فشرده ذخیره می‌کند.
          </Alert>
          
          <SimpleGrid cols={2}>
            <Box>
              <Text size="sm" c="dimmed">آخرین پشتیبان</Text>
              <Text fw={500}>۱۴۰۲/۱۲/۱۵ - ۱۴:۳۰</Text>
            </Box>
            <Box>
              <Text size="sm" c="dimmed">حجم فایل</Text>
              <Text fw={500}>۲۵۶ مگابایت</Text>
            </Box>
          </SimpleGrid>
          
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={() => setIsBackupModalOpen(false)}>
              انصراف
            </Button>
            <Button 
              onClick={handleBackup} 
              loading={isLoading}
              leftSection={<IconDownload size={16} />}
            >
              ایجاد پشتیبان
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  )
}

export default function MantineDashboard() {
  const [opened, setOpened] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [activePage, setActivePage] = useState('dashboard')
  const { isMobile, isTablet } = useResponsive()
  const theme = useMantineTheme()

  const user = {
    name: 'مدیر سیستم',
    email: 'admin@example.com',
    image: '',
  }

  const mainLinks = [
    { icon: IconDashboard, label: 'داشبورد', id: 'dashboard' },
    { icon: IconUsers, label: 'کاربران', id: 'users', badge: '۱۲' },
    { icon: IconShoppingCart, label: 'سفارشات', id: 'orders', badge: '۲۴' },
    { icon: IconPackage, label: 'محصولات', id: 'products' },
    { icon: IconChartBar, label: 'گزارشات', id: 'reports' },
    { icon: IconSettings, label: 'تنظیمات', id: 'settings' },
  ]

  const secondaryLinks = [
    { icon: IconLogout, label: 'خروج' },
  ]

  const mainItems = mainLinks.map((link) => (
    <UnstyledButton
      key={link.label}
      onClick={() => setActivePage(link.id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '8px 12px',
        fontSize: '14px',
        fontWeight: 500,
        borderRadius: '6px',
        transition: 'all 0.2s',
        backgroundColor: activePage === link.id ? '#e7f5ff' : 'transparent',
        color: activePage === link.id ? '#1971c2' : '#495057',
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

  // Render different pages based on activePage
  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />
      case 'users':
        return <UsersPage />
      case 'orders':
        return <OrdersPage />
      case 'products':
        return <ProductsPage />
      case 'reports':
        return <ReportsPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <DashboardPage />
    }
  }

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
          {renderPage()}
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
