"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Menu, 
  Search, 
  Bell, 
  Settings,
  TrendingUp,
  BarChart3,
  Calendar,
  Clock,
  Users
} from "lucide-react"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Button variant="ghost" size="sm">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
          <h1 className="text-lg font-bold">پنل مدیریت</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-row-reverse">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(false)} />
        
        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Desktop Header */}
          <div className="hidden lg:block border-b bg-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="جستجو..."
                    className="pr-10 pl-4 py-2 border rounded-lg bg-background text-sm"
                  />
                </div>
                <Button variant="ghost" size="sm">
                  <Bell className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
              <div className="text-right">
                <h1 className="text-2xl font-bold">داشبورد</h1>
                <p className="text-muted-foreground">خوش آمدید! اینجا خلاصه‌ای از فعالیت‌های شما را مشاهده می‌کنید.</p>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <StatsCards />

            {/* Charts and Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Orders */}
              <div className="lg:col-span-2">
                <RecentOrders />
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                {/* Activity Summary */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">خلاصه فعالیت</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">فروش امروز</p>
                          <p className="text-xs text-muted-foreground">۲۴ سفارش جدید</p>
                        </div>
                      </div>
                      <Badge variant="default">+۱۲٪</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">کاربران فعال</p>
                          <p className="text-xs text-muted-foreground">۱,۲۳۴ کاربر</p>
                        </div>
                      </div>
                      <Badge variant="default">+۸٪</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">رویدادهای امروز</p>
                          <p className="text-xs text-muted-foreground">۵ رویداد</p>
                        </div>
                      </div>
                      <Badge variant="secondary">جدید</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* System Status */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">وضعیت سیستم</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">سرور اصلی</span>
                      </div>
                      <span className="text-xs text-muted-foreground">آنلاین</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">پایگاه داده</span>
                      </div>
                      <span className="text-xs text-muted-foreground">آنلاین</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">CDN</span>
                      </div>
                      <span className="text-xs text-muted-foreground">کند</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">ایمیل</span>
                      </div>
                      <span className="text-xs text-muted-foreground">آنلاین</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">عملیات سریع</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Clock className="w-4 h-4 ml-2" />
                      ایجاد سفارش جدید
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="w-4 h-4 ml-2" />
                      افزودن کاربر
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="w-4 h-4 ml-2" />
                      گزارش جدید
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
