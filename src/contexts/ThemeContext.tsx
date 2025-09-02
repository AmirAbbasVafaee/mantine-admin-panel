"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type ColorTheme = 'blue' | 'green' | 'purple' | 'orange'

interface ThemeContextType {
  isDark: boolean
  colorTheme: ColorTheme
  toggleTheme: () => void
  setTheme: (isDark: boolean) => void
  setColorTheme: (theme: ColorTheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false)
  const [colorTheme, setColorTheme] = useState<ColorTheme>('blue')

  // Load theme preferences from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('dashboard-theme')
    const savedColorTheme = localStorage.getItem('dashboard-color-theme')
    
    if (savedTheme !== null) {
      setIsDark(savedTheme === 'dark')
    } else {
      // Default to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(prefersDark)
    }

    if (savedColorTheme !== null) {
      setColorTheme(savedColorTheme as ColorTheme)
    }
  }, [])

  // Save theme preferences to localStorage
  useEffect(() => {
    localStorage.setItem('dashboard-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    localStorage.setItem('dashboard-color-theme', colorTheme)
  }, [colorTheme])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const setTheme = (dark: boolean) => {
    setIsDark(dark)
  }

  const setColorThemeHandler = (theme: ColorTheme) => {
    setColorTheme(theme)
  }

  return (
    <ThemeContext.Provider value={{ 
      isDark, 
      colorTheme, 
      toggleTheme, 
      setTheme, 
      setColorTheme: setColorThemeHandler 
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
