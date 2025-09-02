"use client"

import { useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { colorTheme } = useTheme()

  useEffect(() => {
    // Remove all existing theme classes
    document.body.classList.remove('theme-blue', 'theme-green', 'theme-purple', 'theme-orange')
    
    // Add current theme class
    document.body.classList.add(`theme-${colorTheme}`)
  }, [colorTheme])

  return <>{children}</>
}
