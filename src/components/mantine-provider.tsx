"use client"

import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext'

const lightTheme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Vazir, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  defaultRadius: 'md',
  colors: {
    blue: [
      '#e7f5ff', '#d0ebff', '#a5d8ff', '#74c0fc', '#4dabf7', '#339af0', '#228be6', '#1c7ed6', '#1971c2', '#1864ab',
    ],
  },
  components: {
    Card: { 
      defaultProps: { 
        shadow: 'sm', 
        radius: 'md', 
        withBorder: true,
      },
      styles: {
        root: {
          backgroundColor: '#ffffff',
          borderColor: '#e9ecef',
        }
      }
    },
    Button: { 
      defaultProps: { 
        radius: 'md',
      },
    },
    ActionIcon: { 
      defaultProps: { 
        radius: 'md',
      },
    },
    TextInput: { 
      defaultProps: { 
        radius: 'md',
      },
    },
    Badge: { 
      defaultProps: { 
        radius: 'sm',
      },
    },
  },
})

const darkTheme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Vazir, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  defaultRadius: 'md',
  colors: {
    blue: [
      '#e7f5ff', '#d0ebff', '#a5d8ff', '#74c0fc', '#4dabf7', '#339af0', '#228be6', '#1c7ed6', '#1971c2', '#1864ab',
    ],
  },
  components: {
    Card: { 
      defaultProps: { 
        shadow: 'sm', 
        radius: 'md', 
        withBorder: true,
      },
      styles: {
        root: {
          backgroundColor: '#1a1b1e',
          borderColor: '#373a40',
        }
      }
    },
    Button: { 
      defaultProps: { 
        radius: 'md',
      },
    },
    ActionIcon: { 
      defaultProps: { 
        radius: 'md',
      },
    },
    TextInput: { 
      defaultProps: { 
        radius: 'md',
      },
    },
    Badge: { 
      defaultProps: { 
        radius: 'sm',
      },
    },
  },
})

function MantineProviderWithTheme({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme()
  
  console.log('🔍 MantineProviderWithTheme - isDark:', isDark, 'Theme:', isDark ? 'dark' : 'light')
  
  return (
    <MantineProvider 
      theme={isDark ? darkTheme : lightTheme}
      defaultColorScheme={isDark ? "dark" : "light"}
      forceColorScheme={isDark ? "dark" : "light"}
    >
      <Notifications position="top-right" />
      {children}
    </MantineProvider>
  )
}

export function MantineAppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MantineProviderWithTheme>
        {children}
      </MantineProviderWithTheme>
    </ThemeProvider>
  )
}
