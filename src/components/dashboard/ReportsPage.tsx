"use client"

import { useState } from 'react'
import { 
  Stack, 
  Card, 
  Group, 
  Text, 
  Title, 
  SimpleGrid, 
  Progress, 
  RingProgress, 
  Select, 
  Button,
  Modal,
  Alert,
  Timeline,
  Badge,
  ThemeIcon
} from '@mantine/core'
import { 
  IconTrendingUp, 
  IconUsers, 
  IconShoppingCart, 
  IconCurrencyDollar,
  IconDownload,
  IconRefresh,
  IconChartBar,
  IconActivity,
  IconStar,
  IconAlertCircle
} from '@tabler/icons-react'

export function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState('pdf')
  const [isLoading, setIsLoading] = useState(false)

  // Mock analytics data
  const analyticsData = {
    totalRevenue: '۱۲,۵۰۰,۰۰۰,۰۰۰',
    totalOrders: '۲,۳۴۵',
    totalCustomers: '۱,۲۳۴',
    averageOrderValue: '۵,۳۳۰,۰۰۰',
    growthRate: '+۱۵.۳٪',
    topProducts: [
      { name: 'لپ‌تاپ اپل مک‌بوک پرو', sales: 45, revenue: '۳,۸۲۵,۰۰۰,۰۰۰' },
      { name: 'گوشی سامسونگ گلکسی S24', sales: 67, revenue: '۲,۱۴۴,۰۰۰,۰۰۰' },
      { name: 'تبلت اپل آی‌پد پرو', sales: 23, revenue: '۶۴۴,۰۰۰,۰۰۰' },
      { name: 'هدفون سونی WH-1000XM5', sales: 89, revenue: '۱,۰۶۸,۰۰۰,۰۰۰' },
      { name: 'ساعت هوشمند اپل واچ', sales: 34, revenue: '۶۱۲,۰۰۰,۰۰۰' },
    ],
    salesByCategory: [
      { category: 'لپ‌تاپ', sales: 45, percentage: 25 },
      { category: 'گوشی موبایل', sales: 67, percentage: 37 },
      { category: 'تبلت', sales: 23, percentage: 13 },
      { category: 'صوتی', sales: 89, percentage: 15 },
      { category: 'پوشیدنی', sales: 34, percentage: 10 },
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
    ],
    recentActivity: [
      { action: 'سفارش جدید', description: 'سفارش #۱۲۳۹ ثبت شد', time: '۲ دقیقه پیش', type: 'order' },
      { action: 'پرداخت موفق', description: 'پرداخت سفارش #۱۲۳۸ تکمیل شد', time: '۱۵ دقیقه پیش', type: 'payment' },
      { action: 'محصول جدید', description: 'محصول "هدفون بی‌سیم" اضافه شد', time: '۱ ساعت پیش', type: 'product' },
      { action: 'کاربر جدید', description: 'کاربر "علی احمدی" ثبت نام کرد', time: '۲ ساعت پیش', type: 'user' },
      { action: 'فروش بالا', description: 'فروش روزانه به ۵۰ میلیون تومان رسید', time: '۳ ساعت پیش', type: 'sales' },
    ]
  }

  const handleExport = async () => {
    setIsLoading(true)
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    setIsExportModalOpen(false)
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'order': return 'blue'
      case 'payment': return 'green'
      case 'product': return 'orange'
      case 'user': return 'purple'
      case 'sales': return 'red'
      default: return 'gray'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return <IconShoppingCart size={16} />
      case 'payment': return <IconCurrencyDollar size={16} />
      case 'product': return <IconChartBar size={16} />
      case 'user': return <IconUsers size={16} />
      case 'sales': return <IconTrendingUp size={16} />
      default: return <IconActivity size={16} />
    }
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={2} mb="xs">گزارشات و تحلیل</Title>
          <Text c="dimmed">تحلیل جامع عملکرد فروشگاه و آمار کلی</Text>
        </div>
        <Group>
          <Select
            placeholder="انتخاب دوره"
            value={selectedPeriod}
            onChange={(value) => setSelectedPeriod(value || 'month')}
            data={[
              { value: 'week', label: 'هفته جاری' },
              { value: 'month', label: 'ماه جاری' },
              { value: 'quarter', label: 'فصل جاری' },
              { value: 'year', label: 'سال جاری' },
            ]}
            style={{ width: 150 }}
          />
          <Select
            placeholder="انتخاب دسته‌بندی"
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
            style={{ width: 150 }}
          />
          <Button
            leftSection={<IconDownload size={16} />}
            onClick={() => setIsExportModalOpen(true)}
          >
            خروجی گزارش
          </Button>
        </Group>
      </Group>

      {/* Key Metrics Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        <Card padding="lg" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>فروش کل</Text>
              <Text fw={700} size="xl">{analyticsData.totalRevenue} تومان</Text>
              <Text size="sm" c="green" fw={500}>
                <IconTrendingUp size={14} style={{ display: 'inline', marginLeft: '4px' }} />
                {analyticsData.growthRate}
              </Text>
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
              <Text fw={700} size="xl">{analyticsData.totalOrders}</Text>
              <Text size="sm" c="blue" fw={500}>+۱۲.۵٪ از ماه گذشته</Text>
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
              <Text fw={700} size="xl">{analyticsData.totalCustomers}</Text>
              <Text size="sm" c="purple" fw={500}>+۸.۲٪ از ماه گذشته</Text>
            </div>
            <ThemeIcon size="lg" variant="light" color="purple">
              <IconUsers size={20} />
            </ThemeIcon>
          </Group>
        </Card>

        <Card padding="lg" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>میانگین سفارش</Text>
              <Text fw={700} size="xl">{analyticsData.averageOrderValue} تومان</Text>
              <Text size="sm" c="orange" fw={500}>+۵.۷٪ از ماه گذشته</Text>
            </div>
            <ThemeIcon size="lg" variant="light" color="orange">
              <IconTrendingUp size={20} />
            </ThemeIcon>
          </Group>
        </Card>
      </SimpleGrid>

      {/* Charts and Analytics */}
              <SimpleGrid cols={{ base: 1, lg: 2 }}>
        {/* Sales by Category */}
        <Card padding="lg" radius="md" withBorder>
          <Title order={3} mb="lg">فروش بر اساس دسته‌بندی</Title>
          <Stack gap="md">
            {analyticsData.salesByCategory.map((item) => (
              <div key={item.category}>
                <Group justify="space-between" mb="xs">
                  <Text size="sm" fw={500}>{item.category}</Text>
                  <Text size="sm" c="dimmed">{item.sales} فروش</Text>
                </Group>
                <Progress value={item.percentage} color="blue" size="sm" />
              </div>
            ))}
          </Stack>
        </Card>

        {/* Recent Activity */}
        <Card padding="lg" radius="md" withBorder>
          <Title order={3} mb="lg">فعالیت‌های اخیر</Title>
          <Timeline active={1} bulletSize={24} lineWidth={2}>
            {analyticsData.recentActivity.map((activity, index) => (
              <Timeline.Item
                key={index}
                bullet={getActivityIcon(activity.type)}
                title={activity.action}
                color={getActivityColor(activity.type)}
              >
                <Text size="sm" c="dimmed" mb={4}>
                  {activity.description}
                </Text>
                <Text size="xs" c="dimmed">
                  {activity.time}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>
      </SimpleGrid>

      {/* System Performance */}
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
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

      {/* Export Modal */}
      <Modal
        opened={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="خروجی گزارش"
        size="md"
        centered
      >
        <Stack gap="lg">
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="انتخاب فرمت"
            color="blue"
          >
            فرمت مورد نظر برای خروجی گزارش را انتخاب کنید.
          </Alert>

          <Select
            label="فرمت خروجی"
            placeholder="انتخاب کنید"
            value={exportFormat}
            onChange={(value) => setExportFormat(value || 'pdf')}
            data={[
              { value: 'pdf', label: 'PDF' },
              { value: 'excel', label: 'Excel' },
              { value: 'csv', label: 'CSV' },
              { value: 'json', label: 'JSON' },
            ]}
          />

          <Group justify="flex-end" gap="sm">
            <Button variant="light" onClick={() => setIsExportModalOpen(false)}>
              انصراف
            </Button>
            <Button
              leftSection={<IconDownload size={16} />}
              onClick={handleExport}
              loading={isLoading}
            >
              دانلود گزارش
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  )
}
