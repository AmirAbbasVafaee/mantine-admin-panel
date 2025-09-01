import type { Metadata } from "next"
import "./globals.css"
import { MantineAppProvider } from "@/components/mantine-provider"

export const metadata: Metadata = {
  title: "داشبورد مدیریتی - Next.js + Mantine",
  description: "داشبورد مدیریتی زیبا با استفاده از Next.js، TypeScript، Tailwind CSS و کامپوننت‌های Mantine با پشتیبانی کامل RTL",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning={true}>
        <MantineAppProvider>
          {children}
        </MantineAppProvider>
      </body>
    </html>
  )
}
