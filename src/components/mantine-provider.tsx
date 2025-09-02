"use client"

import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { ThemeProvider, useTheme, ColorTheme } from '@/contexts/ThemeContext'

// Function to create theme with specific color
const createColorTheme = (colorTheme: ColorTheme, isDark: boolean) => {
  const colorPalettes = {
    blue: [
      '#e7f5ff', '#d0ebff', '#a5d8ff', '#74c0fc', '#4dabf7', '#339af0', '#228be6', '#1c7ed6', '#1971c2', '#1864ab',
    ] as const,
    green: [
      '#ebfbee', '#d3f9d8', '#b2f2bb', '#8ce99a', '#69db7c', '#51cf66', '#40c057', '#37b24d', '#2f9e44', '#2b8a3e',
    ] as const,
    purple: [
      '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95',
    ] as const,
    orange: [
      '#fff4e6', '#ffe8cc', '#ffd8a8', '#ffc078', '#ffa94d', '#ff922b', '#fd7e14', '#f76707', '#e8590c', '#d63384',
    ] as const,
  }

  return createTheme({
    primaryColor: colorTheme,
    fontFamily: 'Vazir, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    defaultRadius: 'md',
    colors: {
      [colorTheme]: colorPalettes[colorTheme],
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
            backgroundColor: isDark ? '#1a1b1e' : '#ffffff',
            borderColor: isDark ? '#373a40' : '#e9ecef',
            color: isDark ? '#ffffff' : '#000000',
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
      Table: {
        styles: {
          root: {
            backgroundColor: isDark ? '#1a1b1e' : '#ffffff',
            color: isDark ? '#ffffff' : '#000000',
          },
          thead: {
            backgroundColor: isDark ? '#25262b' : '#f8f9fa',
          },
          tbody: {
            backgroundColor: isDark ? '#1a1b1e' : '#ffffff',
          },
          th: {
            backgroundColor: isDark ? '#25262b' : '#f8f9fa',
            borderBottom: `1px solid ${isDark ? '#373a40' : '#e9ecef'}`,
            color: isDark ? '#ffffff' : '#000000',
          },
          td: {
            borderBottom: `1px solid ${isDark ? '#25262b' : '#f8f9fa'}`,
            color: isDark ? '#ffffff' : '#000000',
          },
          tr: {
            '&:hover': {
              backgroundColor: isDark ? '#25262b' : '#f8f9fa',
            }
          }
        },
      },
    },
    other: {
      '--mantine-color-gray-0': isDark ? '#25262b' : '#f8f9fa',
      '--mantine-color-gray-3': isDark ? '#373a40' : '#e9ecef',
      '--mantine-color-text': isDark ? '#ffffff' : '#000000',
    },
  })
}

function MantineProviderWithTheme({ children }: { children: React.ReactNode }) {
  const { isDark, colorTheme } = useTheme()
  
  const theme = createColorTheme(colorTheme, isDark)
  
  return (
    <MantineProvider 
      theme={theme}
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
