"use client"

import { useState } from 'react'
import { 
  Stack, 
  Card, 
  Group, 
  Text, 
  Title, 
  Tabs, 
  TextInput, 
  Select, 
  Switch, 
  NumberInput, 
  Button,
  Modal,
  Alert,
  Divider,
  Textarea,
  Box,
  SimpleGrid,
  Container
} from '@mantine/core'
import { 
  IconUser, 
  IconBell, 
  IconShield, 
  IconSettings, 
  IconDeviceFloppy,
  IconLock,
  IconAlertCircle,
  IconDatabase
} from '@tabler/icons-react'
import { 
  ProfileData, 
  PasswordData, 
  NotificationSettings, 
  SecuritySettings, 
  SystemSettings 
} from '@/types/settings'
import { useTheme } from '@/contexts/ThemeContext'

export function SettingsPage() {
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState('profile')
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Profile form data
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'احمد',
    lastName: 'محمدی',
    email: 'ahmad@example.com',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    company: 'شرکت فناوری پیشرو',
    position: 'مدیر فنی',
    bio: 'مدیر فنی با ۸ سال تجربه در زمینه توسعه نرم‌افزار',
  })

  // Password form data
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderUpdates: true,
    productUpdates: false,
    systemAlerts: true,
    marketingEmails: false,
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: true,
    loginAlerts: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    ipWhitelist: false,
    allowedIPs: '',
  })

  // System settings
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    language: 'fa',
    timezone: 'Asia/Tehran',
    dateFormat: 'YYYY/MM/DD',
    currency: 'IRR',
    theme: 'light',
    autoBackup: true,
    backupFrequency: 'daily',
  })

  // Handle profile save
  const handleProfileSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsProfileModalOpen(false)
  }

  // Handle password change
  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('رمز عبور جدید و تکرار آن مطابقت ندارند')
      return
    }
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsPasswordModalOpen(false)
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }

  // Handle backup
  const handleBackup = async () => {
    setIsLoading(true)
    // Simulate backup process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    setIsBackupModalOpen(false)
  }

  return (
    <Container size="xl" py="md" px={isDark ? "xs" : "md"}>
      <Stack gap="lg">
        <Group justify="space-between">
          <Box>
            <Title order={2} mb="xs" c={isDark ? '#ffffff' : '#000000'}>تنظیمات</Title>
            <Text c={isDark ? '#adb5bd' : 'dimmed'}>مدیریت تنظیمات سیستم و حساب کاربری</Text>
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
              <Button variant="light" onClick={() => setIsProfileModalOpen(true)}>
                ویرایش پروفایل
              </Button>
            </Group>
            
            <Stack gap="md">
              <Group>
                <Text fw={500}>نام:</Text>
                <Text>{profileData.firstName} {profileData.lastName}</Text>
              </Group>
              <Group>
                <Text fw={500}>ایمیل:</Text>
                <Text>{profileData.email}</Text>
              </Group>
              <Group>
                <Text fw={500}>تلفن:</Text>
                <Text>{profileData.phone}</Text>
              </Group>
              <Group>
                <Text fw={500}>شرکت:</Text>
                <Text>{profileData.company}</Text>
              </Group>
              <Group>
                <Text fw={500}>سمت:</Text>
                <Text>{profileData.position}</Text>
              </Group>
              <Group>
                <Text fw={500}>بیوگرافی:</Text>
                <Text>{profileData.bio}</Text>
              </Group>
            </Stack>

            <Divider my="lg" />

            <Group>
              <Button variant="light" onClick={() => setIsPasswordModalOpen(true)}>
                تغییر رمز عبور
              </Button>
            </Group>
          </Card>
        </Tabs.Panel>

        {/* Notifications Tab */}
        <Tabs.Panel value="notifications" pt="md">
          <Card padding="lg" radius="md" withBorder>
            <Title order={3} mb="lg">تنظیمات اعلان‌ها</Title>
            
            <Stack gap="lg">
              <div>
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
                    label="اعلان‌های push"
                    checked={notificationSettings.pushNotifications}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings,
                      pushNotifications: e.currentTarget.checked
                    })}
                  />
                </Stack>
              </div>

              <Divider />

              <div>
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
              </div>
            </Stack>
          </Card>
        </Tabs.Panel>

        {/* Security Tab */}
        <Tabs.Panel value="security" pt="md">
          <Card padding="lg" radius="md" withBorder>
            <Title order={3} mb="lg">تنظیمات امنیتی</Title>
            
            <Stack gap="lg">
              <div>
                <Text fw={500} mb="md">احراز هویت دو مرحله‌ای</Text>
                <Switch
                  label="فعال‌سازی احراز هویت دو مرحله‌ای"
                  checked={securitySettings.twoFactorAuth}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    twoFactorAuth: e.currentTarget.checked
                  })}
                />
              </div>

              <Divider />

              <div>
                <Text fw={500} mb="md">هشدارهای ورود</Text>
                <Switch
                  label="اعلان ورود از دستگاه‌های جدید"
                  checked={securitySettings.loginAlerts}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    loginAlerts: e.currentTarget.checked
                  })}
                />
              </div>

              <Divider />

              <div>
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
              </div>

              <Divider />

              <div>
                <Text fw={500} mb="md">فیلتر IP</Text>
                <Switch
                  label="فعال‌سازی فیلتر IP"
                  checked={securitySettings.ipWhitelist}
                  onChange={(e) => setSecuritySettings({
                    ...securitySettings,
                    ipWhitelist: e.currentTarget.checked
                  })}
                />
                {securitySettings.ipWhitelist && (
                  <TextInput
                    label="IP های مجاز (با کاما جدا کنید)"
                    placeholder="192.168.1.1, 10.0.0.1"
                    value={securitySettings.allowedIPs}
                    onChange={(e) => setSecuritySettings({
                      ...securitySettings,
                      allowedIPs: e.target.value
                    })}
                    mt="sm"
                  />
                )}
              </div>
            </Stack>
          </Card>
        </Tabs.Panel>

        {/* System Tab */}
        <Tabs.Panel value="system" pt="md">
          <Card padding="lg" radius="md" withBorder>
            <Title order={3} mb="lg">تنظیمات سیستم</Title>
            
            <Stack gap="lg">
              <SimpleGrid cols={2}>
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

              <SimpleGrid cols={2}>
                <Select
                  label="فرمت تاریخ"
                  value={systemSettings.dateFormat}
                  onChange={(value) => setSystemSettings({
                    ...systemSettings,
                    dateFormat: value || 'YYYY/MM/DD'
                  })}
                  data={[
                    { value: 'YYYY/MM/DD', label: 'YYYY/MM/DD' },
                    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
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
                    { value: 'IRR', label: 'تومان (IRR)' },
                    { value: 'USD', label: 'دلار (USD)' },
                    { value: 'EUR', label: 'یورو (EUR)' },
                  ]}
                />
              </SimpleGrid>

              <Select
                label="تم"
                value={systemSettings.theme}
                onChange={(value) => setSystemSettings({
                  ...systemSettings,
                  theme: value as SystemSettings['theme']
                })}
                data={[
                  { value: 'light', label: 'روشن' },
                  { value: 'dark', label: 'تیره' },
                  { value: 'auto', label: 'خودکار' },
                ]}
              />

              <Divider />

              <div>
                <Text fw={500} mb="md">پشتیبان‌گیری خودکار</Text>
                <Switch
                  label="فعال‌سازی پشتیبان‌گیری خودکار"
                  checked={systemSettings.autoBackup}
                  onChange={(e) => setSystemSettings({
                    ...systemSettings,
                    autoBackup: e.currentTarget.checked
                  })}
                />
                {systemSettings.autoBackup && (
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
                    mt="sm"
                  />
                )}
              </div>

              <Group>
                <Button 
                  leftSection={<IconDatabase size={16} />}
                  onClick={() => setIsBackupModalOpen(true)}
                >
                  پشتیبان‌گیری دستی
                </Button>
              </Group>
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
          <TextInput
            label="نام"
            value={profileData.firstName}
            onChange={(e) => setProfileData({
              ...profileData,
              firstName: e.target.value
            })}
          />
          <TextInput
            label="نام خانوادگی"
            value={profileData.lastName}
            onChange={(e) => setProfileData({
              ...profileData,
              lastName: e.target.value
            })}
          />
          <TextInput
            label="ایمیل"
            value={profileData.email}
            onChange={(e) => setProfileData({
              ...profileData,
              email: e.target.value
            })}
          />
          <TextInput
            label="تلفن"
            value={profileData.phone}
            onChange={(e) => setProfileData({
              ...profileData,
              phone: e.target.value
            })}
          />
          <TextInput
            label="شرکت"
            value={profileData.company}
            onChange={(e) => setProfileData({
              ...profileData,
              company: e.target.value
            })}
          />
          <TextInput
            label="سمت"
            value={profileData.position}
            onChange={(e) => setProfileData({
              ...profileData,
              position: e.target.value
            })}
          />
          <Textarea
            label="بیوگرافی"
            value={profileData.bio}
            onChange={(e) => setProfileData({
              ...profileData,
              bio: e.target.value
            })}
            minRows={3}
          />
          
          <Group justify="flex-end" gap="sm">
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
            onChange={(e) => setPasswordData({
              ...passwordData,
              currentPassword: e.target.value
            })}
          />
          <TextInput
            label="رمز عبور جدید"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({
              ...passwordData,
              newPassword: e.target.value
            })}
          />
          <TextInput
            label="تکرار رمز عبور جدید"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({
              ...passwordData,
              confirmPassword: e.target.value
            })}
          />
          
          <Group justify="flex-end" gap="sm">
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
        <Stack gap="lg">
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="اطلاعات پشتیبان‌گیری"
            color="blue"
          >
            این عملیات تمام داده‌های سیستم را در یک فایل فشرده ذخیره می‌کند.
            مدت زمان این عملیات ممکن است چند دقیقه طول بکشد.
          </Alert>
          
          <Group justify="flex-end" gap="sm">
            <Button variant="light" onClick={() => setIsBackupModalOpen(false)}>
              انصراف
            </Button>
            <Button 
              leftSection={<IconDatabase size={16} />}
              onClick={handleBackup} 
              loading={isLoading}
            >
              شروع پشتیبان‌گیری
            </Button>
          </Group>
        </Stack>
      </Modal>
        </Stack>
      </Container>
    )
}
