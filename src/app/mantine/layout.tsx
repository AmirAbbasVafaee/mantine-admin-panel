"use client"

import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { usePathname } from 'next/navigation'

export default function MantineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Extract the current page from the pathname
  const getCurrentPage = () => {
    const path = pathname.split('/').pop()
    if (!path || path === 'mantine') return 'dashboard'
    return path
  }

  return (
    <DashboardLayout activePage={getCurrentPage()}>
      {children}
    </DashboardLayout>
  )
}
