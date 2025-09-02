"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Container, 
  Card, 
  TextInput, 
  PasswordInput, 
  Button, 
  Title, 
  Text, 
  Group, 
  ActionIcon, 
  Box,
  Alert,
  Stack
} from '@mantine/core'
import { IconSun, IconMoon, IconAlertCircle, IconLogin } from '@tabler/icons-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function LoginPage() {
  const router = useRouter()
  const { isDark } = useTheme()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Hardcoded credentials (for demo purposes)
  const validCredentials = {
    username: 'admin',
    password: 'admin123'
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (username === validCredentials.username && password === validCredentials.password) {
      // Successful login - redirect to dashboard
      router.push('/mantine/dashboard')
    } else {
      setError('نام کاربری یا رمز عبور اشتباه است')
    }
    
    setIsLoading(false)
  }

  return (
    <Container size="xs" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Card 
        shadow="sm" 
        padding="xl" 
        radius="md" 
        withBorder
        style={{ 
          width: '100%',
          maxWidth: '400px',
          backgroundColor: isDark ? '#25262b' : '#ffffff',
          borderColor: isDark ? '#373a40' : '#e9ecef'
        }}
      >
        {/* Header */}
        <Title order={2} mb="xl" style={{ color: isDark ? '#ffffff' : '#000000', textAlign: 'center' }}>
          ورود به پنل مدیریت
        </Title>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <Stack gap="md">
            <TextInput
              label="نام کاربری"
              placeholder="نام کاربری خود را وارد کنید"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              size="md"
              styles={{
                label: {
                  color: isDark ? '#ffffff' : '#000000',
                  marginBottom: '8px',
                  fontWeight: 500
                },
                input: {
                  backgroundColor: isDark ? '#2c2e33' : '#ffffff',
                  borderColor: isDark ? '#373a40' : '#ced4da',
                  color: isDark ? '#ffffff' : '#000000',
                  direction: 'rtl',
                  textAlign: 'right'
                }
              }}
            />

            <PasswordInput
              label="رمز عبور"
              placeholder="رمز عبور خود را وارد کنید"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              size="md"
              styles={{
                label: {
                  color: isDark ? '#ffffff' : '#000000',
                  marginBottom: '8px',
                  fontWeight: 500
                },
                input: {
                  backgroundColor: isDark ? '#2c2e33' : '#ffffff',
                  borderColor: isDark ? '#373a40' : '#ced4da',
                  color: isDark ? '#ffffff' : '#000000',
                  direction: 'rtl',
                  textAlign: 'right'
                },
                innerInput: {
                  direction: 'rtl',
                  textAlign: 'right'
                }
              }}
            />

            {/* Error Message */}
            {error && (
              <Alert 
                icon={<IconAlertCircle size={16} />} 
                title="خطا در ورود" 
                color="red"
                variant="light"
                style={{
                  backgroundColor: isDark ? '#2c2e33' : '#fff5f5',
                  borderColor: isDark ? '#373a40' : '#fed7d7'
                }}
              >
                {error}
              </Alert>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              loading={isLoading}
              leftSection={<IconLogin size={16} />}
              size="md"
              fullWidth
              style={{
                marginTop: '16px',
                backgroundColor: isDark ? '#228be6' : '#228be6',
                color: '#ffffff'
              }}
            >
              {isLoading ? 'در حال ورود...' : 'ورود'}
            </Button>
          </Stack>
        </form>

        {/* Demo Credentials Info */}
        <Box mt="xl" p="md" style={{
          backgroundColor: isDark ? '#2c2e33' : '#f8f9fa',
          borderRadius: '8px',
          border: `1px solid ${isDark ? '#373a40' : '#e9ecef'}`
        }}>
          <Text size="sm" c={isDark ? 'dimmed' : 'dark'} ta="center" fw={500}>
            اطلاعات ورود برای تست:
          </Text>
          <Text size="xs" c={isDark ? 'dimmed' : 'dark'} ta="center" mt="xs">
            نام کاربری: <strong>admin</strong>
          </Text>
          <Text size="xs" c={isDark ? 'dimmed' : 'dark'} ta="center">
            رمز عبور: <strong>admin123</strong>
          </Text>
        </Box>


      </Card>
    </Container>
  )
}
