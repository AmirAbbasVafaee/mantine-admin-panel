"use client"

import { 
  Stack, 
  Card, 
  Group, 
  Text, 
  Title, 
  SimpleGrid, 
  Progress, 
  RingProgress, 
  Badge,
  Grid,
  Container,
  Box,
  ThemeIcon
} from '@mantine/core'
import { 
  IconTrendingUp, 
  IconUsers, 
  IconShoppingCart, 
  IconCurrencyDollar,
  IconPackage,
  IconStar,
  IconActivity,
  IconArrowUpRight,
  IconArrowDownRight
} from '@tabler/icons-react'

export function DashboardPage() {
  // Mock dashboard data
  const dashboardData = {
    stats: {
      totalRevenue: '۱۲,۵۰۰,۰۰۰,۰۰۰',
      totalOrders: '۲,۳۴۵',
      totalCustomers: '۱,۲۳۴',
      totalProducts: '۵۶۷',
      growthRate: '+۱۵.۳٪',
      orderGrowth: '+۱۲.۵٪',
      customerGrowth: '+۸.۲٪',
      productGrowth: '+۵.۷٪'
    },
    recentOrders: [
      { id: '#۱۲۳۹', customer: 'علی احمدی', amount: '۲,۵۰۰,۰۰۰', status: 'completed', date: '۲ دقیقه پیش' },
      { id: '#۱۲۳۸', customer: 'فاطمه محمدی', amount: '۱,۸۰۰,۰۰۰', status: 'processing', date: '۱۵ دقیقه پیش' },
      { id: '#۱۲۳۷', customer: 'محمد رضایی', amount: '۳,۲۰۰,۰۰۰', status: 'shipped', date: '۱ ساعت پیش' },
      { id: '#۱۲۳۶', customer: 'زهرا کریمی', amount: '۹۵۰,۰۰۰', status: 'pending', date: '۲ ساعت پیش' },
      { id: '#۱۲۳۵', customer: 'حسین نوری', amount: '۴,۱۰۰,۰۰۰', status: 'completed', date: '۳ ساعت پیش' },
    ],
    topProducts: [
      { name: 'لپ‌تاپ اپل مک‌بوک پرو', sales: 45, revenue: '۳,۸۲۵,۰۰۰,۰۰۰', growth: '+۲۳٪' },
      { name: 'گوشی سامسونگ گلکسی S24', sales: 67, revenue: '۲,۱۴۴,۰۰۰,۰۰۰', growth: '+۱۸٪' },
      { name: 'تبلت اپل آی‌پد پرو', sales: 23, revenue: '۶۴۴,۰۰۰,۰۰۰', growth: '+۱۲٪' },
      { name: 'هدفون سونی WH-1000XM5', sales: 89, revenue: '۱,۰۶۸,۰۰۰,۰۰۰', growth: '+۳۱٪' },
      { name: 'ساعت هوشمند اپل واچ', sales: 34, revenue: '۶۱۲,۰۰۰,۰۰۰', growth: '+۹٪' },
    ],
    salesByCategory: [
      { category: 'لپ‌تاپ', sales: 45, percentage: 25, color: 'blue' },
      { category: 'گوشی موبایل', sales: 67, percentage: 37, color: 'green' },
      { category: 'تبلت', sales: 23, percentage: 13, color: 'orange' },
      { category: 'صوتی', sales: 89, percentage: 15, color: 'purple' },
      { category: 'پوشیدنی', sales: 34, percentage: 10, color: 'red' },
    ],
    monthlyRevenue: [
      { month: 'فروردین', revenue: 8500000000 },
      { month: 'اردیبهشت', revenue: 9200000000 },
      { month: 'خرداد', revenue: 8800000000 },
      { month: 'تیر', revenue: 9500000000 },
      { month: 'مرداد', revenue: 10200000000 },
      { month: 'شهریور', revenue: 9800000000 },
      { month: 'مهر', revenue: 10500000000 },
      { month: 'آبان', revenue: 11200000000 },
      { month: 'آذر', revenue: 10800000000 },
      { month: 'دی', revenue: 11500000000 },
      { month: 'بهمن', revenue: 11800000000 },
      { month: 'اسفند', revenue: 12500000000 },
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green'
      case 'processing': return 'blue'
      case 'shipped': return 'orange'
      case 'pending': return 'yellow'
      default: return 'gray'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'تکمیل شده'
      case 'processing': return 'در حال پردازش'
      case 'shipped': return 'ارسال شده'
      case 'pending': return 'در انتظار'
      default: return 'نامشخص'
    }
  }

  return (
    <Container size="xl" py="md">
      <Stack gap="lg">
        {/* Page Header */}
        <Group justify="space-between">
          <Box>
            <Title order={2} mb="xs">داشبورد اصلی</Title>
            <Text c="dimmed">نمای کلی عملکرد سیستم و آمار فروش</Text>
          </Box>
          <Badge color="green" size="lg">
            <IconActivity size={14} style={{ marginLeft: '4px' }} />
            سیستم فعال
          </Badge>
        </Group>

        {/* Key Metrics Cards */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
          <Card padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>فروش کل</Text>
                <Text fw={700} size="xl">{dashboardData.stats.totalRevenue} تومان</Text>
                <Group gap="xs" mt="xs">
                  <IconArrowUpRight size={16} color="green" />
                  <Text size="sm" c="green" fw={500}>{dashboardData.stats.growthRate}</Text>
                </Group>
              </div>
              <ThemeIcon size="lg" variant="light" color="green">
                <IconCurrencyDollar size={20} />
              </ThemeIcon>
            </Group>
          </Card>

          <Card padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>سفارشات</Text>
                <Text fw={700} size="xl">{dashboardData.stats.totalOrders}</Text>
                <Group gap="xs" mt="xs">
                  <IconArrowUpRight size={16} color="blue" />
                  <Text size="sm" c="blue" fw={500}>{dashboardData.stats.orderGrowth}</Text>
                </Group>
              </div>
              <ThemeIcon size="lg" variant="light" color="blue">
                <IconShoppingCart size={20} />
              </ThemeIcon>
            </Group>
          </Card>

          <Card padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>مشتریان</Text>
                <Text fw={700} size="xl">{dashboardData.stats.totalCustomers}</Text>
                <Group gap="xs" mt="xs">
                  <IconArrowUpRight size={16} color="purple" />
                  <Text size="sm" c="purple" fw={500}>{dashboardData.stats.customerGrowth}</Text>
                </Group>
              </div>
              <ThemeIcon size="lg" variant="light" color="purple">
                <IconUsers size={20} />
              </ThemeIcon>
            </Group>
          </Card>

          <Card padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>محصولات</Text>
                <Text fw={700} size="xl">{dashboardData.stats.totalProducts}</Text>
                <Group gap="xs" mt="xs">
                  <IconArrowUpRight size={16} color="orange" />
                  <Text size="sm" c="orange" fw={500}>{dashboardData.stats.productGrowth}</Text>
                </Group>
              </div>
              <ThemeIcon size="lg" variant="light" color="orange">
                <IconPackage size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </SimpleGrid>

        {/* Charts and Analytics */}
        <Grid gutter="lg">
          {/* Sales by Category */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Card padding="lg" radius="md" withBorder>
              <Title order={3} mb="lg">فروش بر اساس دسته‌بندی</Title>
              <Stack gap="md">
                {dashboardData.salesByCategory.map((item) => (
                  <div key={item.category}>
                    <Group justify="space-between" mb="xs">
                      <Text size="sm" fw={500}>{item.category}</Text>
                      <Text size="sm" c="dimmed">{item.sales} فروش</Text>
                    </Group>
                    <Progress value={item.percentage} color={item.color} size="sm" />
                  </div>
                ))}
              </Stack>
            </Card>
          </Grid.Col>

          {/* Recent Orders */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Card padding="lg" radius="md" withBorder>
              <Title order={3} mb="lg">سفارشات اخیر</Title>
              <Stack gap="sm">
                {dashboardData.recentOrders.map((order) => (
                  <Group key={order.id} justify="space-between" p="xs" style={{ border: '1px solid #f0f0f0', borderRadius: '8px' }}>
                    <div>
                      <Text fw={500} size="sm">{order.id}</Text>
                      <Text size="xs" c="dimmed">{order.customer}</Text>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <Text fw={500} size="sm">{order.amount} تومان</Text>
                      <Badge color={getStatusColor(order.status)} size="xs">
                        {getStatusLabel(order.status)}
                      </Badge>
                    </div>
                    <Text size="xs" c="dimmed">{order.date}</Text>
                  </Group>
                ))}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Top Products */}
        <Card padding="lg" radius="md" withBorder>
          <Title order={3} mb="lg">محصولات پرفروش</Title>
          <Stack gap="sm">
            {dashboardData.topProducts.map((product, index) => (
              <Group key={product.name} justify="space-between" p="md" style={{ 
                border: '1px solid #f0f0f0', 
                borderRadius: '8px',
                backgroundColor: index < 3 ? '#f8f9fa' : 'white'
              }}>
                <Group gap="md">
                  <Badge color={index < 3 ? 'blue' : 'gray'} size="lg">
                    #{index + 1}
                  </Badge>
                  <div>
                    <Text fw={500}>{product.name}</Text>
                    <Text size="sm" c="dimmed">{product.sales} فروش</Text>
                  </div>
                </Group>
                <div style={{ textAlign: 'left' }}>
                  <Text fw={500}>{product.revenue} تومان</Text>
                  <Text size="sm" c="green" fw={500}>{product.growth}</Text>
                </div>
              </Group>
            ))}
          </Stack>
        </Card>

        {/* Performance Metrics */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} gap="lg">
          <Card padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="md">
              <Text fw={500}>عملکرد سیستم</Text>
              <Badge color="green">عالی</Badge>
            </Group>
            <RingProgress
              size={80}
              thickness={8}
              sections={[{ value: 85, color: 'green' }]}
              label={
                <Text ta="center" size="xs" fw={700}>
                  ۸۵٪
                </Text>
              }
            />
          </Card>

          <Card padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="md">
              <Text fw={500}>بازدید روزانه</Text>
              <Badge color="blue">۲,۴۵۶</Badge>
            </Group>
            <Progress value={75} color="blue" size="lg" />
            <Text size="sm" c="dimmed" mt="xs">+۱۲٪ از دیروز</Text>
          </Card>

          <Card padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="md">
              <Text fw={500}>رضایت مشتریان</Text>
              <Badge color="yellow">۴.۸/۵</Badge>
            </Group>
            <Group gap="xs" justify="center">
              {[1, 2, 3, 4, 5].map((star) => (
                <IconStar
                  key={star}
                  size={20}
                  fill={star <= 4 ? '#ffd700' : 'none'}
                  color="#ffd700"
                />
              ))}
            </Group>
            <Text size="sm" c="dimmed" ta="center" mt="xs">
              بر اساس ۲۳۴ نظر
            </Text>
          </Card>
        </SimpleGrid>
      </Stack>
    </Container>
  )
}
