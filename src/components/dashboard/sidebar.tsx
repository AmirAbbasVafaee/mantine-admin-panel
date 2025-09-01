"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  FileText, 
  Bell,
  Menu,
  X
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const menuItems = [
  {
    title: "داشبورد",
    icon: LayoutDashboard,
    href: "/dashboard",
    active: true
  },
  {
    title: "کاربران",
    icon: Users,
    href: "/users",
    badge: "۱۲"
  },
  {
    title: "سفارشات",
    icon: ShoppingCart,
    href: "/orders",
    badge: "۲۴"
  },
  {
    title: "گزارشات",
    icon: BarChart3,
    href: "/reports"
  },
  {
    title: "مستندات",
    icon: FileText,
    href: "/docs"
  },
  {
    title: "تنظیمات",
    icon: Settings,
    href: "/settings"
  }
]

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <Card className={`
        fixed top-0 right-0 h-screen w-64 bg-card border-0 shadow-lg z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:fixed lg:translate-x-0 lg:z-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold">پنل مدیریت</h2>
                <p className="text-sm text-muted-foreground">مدیریت سیستم</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="lg:hidden"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.href}
                variant={item.active ? "default" : "ghost"}
                className="w-full justify-start space-x-3 space-x-reverse"
                asChild
              >
                <a href={item.href}>
                  <item.icon className="w-4 h-4" />
                  <span className="flex-1 text-right">{item.title}</span>
                  {item.badge && (
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              </Button>
            ))}
          </nav>

          <Separator />

          {/* Footer */}
          <div className="p-4">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">مدیر سیستم</p>
                <p className="text-xs text-muted-foreground">admin@example.com</p>
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}
