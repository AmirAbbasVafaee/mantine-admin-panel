"use client"

import {
  Container,
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
  Box,
  ThemeIcon,
} from '@mantine/core'
import {
  IconUsers,
  IconCurrencyDollar,
  IconPackage,
  IconActivity,
  IconArrowUpRight
} from '@tabler/icons-react'

export function ReportsPage() {
  // Mock reports data
  const reportsData = {
    salesReport: {
      totalSales: '۸,۵۰۰,۰۰۰,۰۰۰',
      growthRate: '+۱۲.۵٪',
      monthlyGrowth: '+۸.۳٪',
      quarterlyGrowth: '+۱۵.۷٪',
      yearlyGrowth: '+۲۲.۱٪'
    },
    customerReport: {
      totalCustomers: '۲,۳۴۵',
      newCustomers: '۱۸۹',
      returningCustomers: '۲,۱۵۶',
      customerRetention: '۹۲.۳٪',
      avgOrderValue: '۳,۶۲۵,۰۰۰'
    },
    productReport: {
      totalProducts: '۵۶۷',
      topSelling: 'لپ‌تاپ اپل مک‌بوک پرو',
      lowStock: '۲۳',
      outOfStock: '۸',
      avgRating: '۴.۶'
    },
    performanceReport: {
      websiteUptime: '۹۹.۹٪',
      avgLoadTime: '۱.۲ ثانیه',
      mobileTraffic: '۶۷.۳٪',
      conversionRate: '۳.۸٪',
      bounceRate: '۲۸.۵٪'
    }
  }

  const monthlyData = [
    { month: 'فروردین', sales: 6500000000, customers: 180, orders: 245 },
    { month: 'اردیبهشت', sales: 7200000000, customers: 195, orders: 267 },
    { month: 'خرداد', sales: 6800000000, customers: 188, orders: 251 },
    { month: 'تیر', sales: 7500000000, customers: 210, orders: 289 },
    { month: 'مرداد', sales: 8200000000, customers: 225, orders: 312 },
    { month: 'شهریور', sales: 7800000000, customers: 218, orders: 298 },
    { month: 'مهر', sales: 8500000000, customers: 235, orders: 325 },
    { month: 'آبان', sales: 9200000000, customers: 248, orders: 342 },
    { month: 'آذر', sales: 8800000000, customers: 242, orders: 331 },
    { month: 'دی', sales: 9500000000, customers: 255, orders: 356 },
    { month: 'بهمن', sales: 9800000000, customers: 262, orders: 368 },
    { month: 'اسفند', sales: 8500000000, customers: 245, orders: 325 },
  ]

  const topCategories = [
    { category: 'لپ‌تاپ', sales: 45, percentage: 25, color: 'blue' },
    { category: 'گوشی موبایل', sales: 67, percentage: 37, color: 'green' },
    { category: 'تبلت', sales: 23, percentage: 13, color: 'orange' },
    { category: 'هدفون', sales: 89, percentage: 15, color: 'purple' },
    { category: 'ساعت هوشمند', sales: 34, percentage: 10, color: 'red' },
  ]

  return (
    <Container size="xl" py="md" px="md">
      <Stack gap="lg">
        {/* Page Header */}
        <Group justify="space-between" wrap="wrap" gap="md">
          <Box style={{ minWidth: 0, flex: 1 }}>
            <Title order={2} mb="xs" style={{ fontSize: '2rem' }}>
              گزارشات و تحلیل‌ها
            </Title>
            <Text c="dimmed" size="md">
              تحلیل جامع عملکرد سیستم، فروش و رفتار مشتریان
            </Text>
          </Box>
          <Badge color="blue" size="lg">
            <IconActivity size={14} style={{ marginLeft: '4px' }} />
            گزارشات به‌روز
          </Badge>
        </Group>

        {/* Key Metrics Cards */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
          <Card padding="lg" radius="md" withBorder>
            <Group justify="space-between" wrap="nowrap">
              <Box style={{ minWidth: 0, flex: 1 }}>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>فروش کل</Text>
                <Text fw={700} size="xl" style={{ wordBreak: 'break-word' }}>
                  {reportsData.salesReport.totalSales} تومان
                </Text>
                <Group gap="xs" mt="xs" wrap="nowrap">
                  <IconArrowUpRight size={16} color="green" />
                  <Text size="sm" c="green" fw={500}>{reportsData.salesReport.growthRate}</Text>
                </Group>
              </Box>
              <ThemeIcon size="lg" variant="light" color="green">
                <IconCurrencyDollar size={20} />
              </ThemeIcon>
            </Group>
          </Card>

          <Card padding="lg" radius="md" withBorder>
            <Group justify="space-between" wrap="nowrap">
              <Box style={{ minWidth: 0, flex: 1 }}>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>مشتریان</Text>
                <Text fw={700} size="xl">{reportsData.customerReport.totalCustomers}</Text>
                <Group gap="xs" mt="xs" wrap="nowrap">
                  <IconArrowUpRight size={16} color="blue" />
                  <Text size="sm" c="blue" fw={500}>{reportsData.customerReport.newCustomers} جدید</Text>
                </Group>
              </Box>
              <ThemeIcon size="lg" variant="light" color="blue">
                <IconUsers size={20} />
              </ThemeIcon>
            </Group>
          </Card>

          <Card padding="lg" radius="md" withBorder>
            <Group justify="space-between" wrap="nowrap">
              <Box style={{ minWidth: 0, flex: 1 }}>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>محصولات</Text>
                <Text fw={700} size="xl">{reportsData.productReport.totalProducts}</Text>
                <Group gap="xs" mt="xs" wrap="nowrap">
                  <IconArrowUpRight size={16} color="purple" />
                  <Text size="sm" c="purple" fw={500}>امتیاز {reportsData.productReport.avgRating}</Text>
                </Group>
              </Box>
              <ThemeIcon size="lg" variant="light" color="purple">
                <IconPackage size={20} />
              </ThemeIcon>
            </Group>
          </Card>

          <Card padding="lg" radius="md" withBorder>
            <Group justify="space-between" wrap="nowrap">
              <Box style={{ minWidth: 0, flex: 1 }}>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>عملکرد</Text>
                <Text fw={700} size="xl">{reportsData.performanceReport.websiteUptime}</Text>
                <Group gap="xs" mt="xs" wrap="nowrap">
                  <IconArrowUpRight size={16} color="orange" />
                  <Text size="sm" c="orange" fw={500}>{reportsData.performanceReport.avgLoadTime}</Text>
                </Group>
              </Box>
              <ThemeIcon size="lg" variant="light" color="orange">
                <IconActivity size={20} />
              </ThemeIcon>
            </Group>
          </Card>
        </SimpleGrid>

        {/* Detailed Reports Grid */}
        <Grid gutter="lg">
          {/* Sales by Category */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Card 
              padding="lg" 
              radius="md" 
              withBorder
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Title order={3} mb="lg">
                فروش بر اساس دسته‌بندی
              </Title>
              <Stack gap="md" style={{ flex: 1 }}>
                {topCategories.map((item) => (
                  <div key={item.category}>
                    <Group justify="space-between" mb="xs" wrap="nowrap">
                      <Text size="sm" fw={500} style={{ minWidth: 0, flex: 1 }}>
                        {item.category}
                      </Text>
                      <Text size="sm" c="dimmed" style={{ whiteSpace: 'nowrap' }}>
                        {item.sales} فروش
                      </Text>
                    </Group>
                    <Progress value={item.percentage} color={item.color} size="sm" />
                  </div>
                ))}
              </Stack>
            </Card>
          </Grid.Col>

          {/* Customer Retention */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Card 
              padding="lg" 
              radius="md" 
              withBorder
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Title order={3} mb="lg">
                نگهداری مشتریان
              </Title>
              <Stack gap="lg" style={{ flex: 1 }}>
                <Group justify="space-between">
                  <Text>مشتریان جدید</Text>
                  <Badge color="green" size="lg">{reportsData.customerReport.newCustomers}</Badge>
                </Group>
                <Group justify="space-between">
                  <Text>مشتریان بازگشتی</Text>
                  <Badge color="blue" size="lg">{reportsData.customerReport.returningCustomers}</Badge>
                </Group>
                <Group justify="space-between">
                  <Text>نرخ نگهداری</Text>
                  <Badge color="purple" size="lg">{reportsData.customerReport.customerRetention}</Badge>
                </Group>
                <Group justify="space-between">
                  <Text>میانگین سفارش</Text>
                  <Badge color="orange" size="lg">{reportsData.customerReport.avgOrderValue} تومان</Badge>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Performance Metrics */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          <Card padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="md" wrap="nowrap">
              <Text fw={500}>عملکرد وب‌سایت</Text>
              <Badge color="green">عالی</Badge>
            </Group>
            <Progress value={99.9} color="green" size="lg" />
            <Text size="sm" c="dimmed" mt="xs">آپ‌تایم</Text>
          </Card>

          <Card padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="md" wrap="nowrap">
              <Text fw={500}>نرخ تبدیل</Text>
              <Badge color="blue">۳.۸٪</Badge>
            </Group>
            <Progress value={3.8} color="blue" size="lg" />
            <Text size="sm" c="dimmed" mt="xs">+۰.۵٪ از ماه گذشته</Text>
          </Card>

          <Card padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="md" wrap="nowrap">
              <Text fw={500}>ترافیک موبایل</Text>
              <Badge color="yellow">۶۷.۳٪</Badge>
            </Group>
            <Progress value={67.3} color="yellow" size="lg" />
            <Text size="sm" c="dimmed" mt="xs">+۲.۱٪ از ماه گذشته</Text>
          </Card>
        </SimpleGrid>

        {/* Monthly Trends */}
        <Card padding="lg" radius="md" withBorder>
          <Title order={3} mb="lg">
            روند ماهانه
          </Title>
          <Grid gutter="md">
            {monthlyData.slice(-6).map((month) => (
              <Grid.Col key={month.month} span={{ base: 6, sm: 4, md: 2 }}>
                <Card 
                  padding="sm" 
                  radius="md" 
                  withBorder 
                  className="dashboard-card"
                >
                  <Text size="sm" fw={500} ta="center">
                    {month.month}
                  </Text>
                  <Text size="xs" c="dimmed" ta="center">
                    {month.sales.toLocaleString()} تومان
                  </Text>
                  <Text size="xs" c="dimmed" ta="center">
                    {month.customers} مشتری
                  </Text>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        </Card>
      </Stack>
    </Container>
  )
}
