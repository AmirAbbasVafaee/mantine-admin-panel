"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign 
} from "lucide-react"

const stats = [
  {
    title: "فروش کل",
    value: "۱۲,۵۴۳,۰۰۰",
    currency: "تومان",
    change: "+۱۲.۵٪",
    changeType: "positive" as const,
    icon: DollarSign,
    iconColor: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/20"
  },
  {
    title: "سفارشات",
    value: "۲,۴۵۶",
    change: "+۸.۲٪",
    changeType: "positive" as const,
    icon: ShoppingCart,
    iconColor: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/20"
  },
  {
    title: "کاربران فعال",
    value: "۱,۲۳۴",
    change: "+۱۵.۳٪",
    changeType: "positive" as const,
    icon: Users,
    iconColor: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/20"
  },
  {
    title: "نرخ تبدیل",
    value: "۳.۲٪",
    change: "+۲.۱٪",
    changeType: "positive" as const,
    icon: TrendingUp,
    iconColor: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20"
  }
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <div className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stat.value}
              {stat.currency && (
                <span className="text-sm font-normal text-muted-foreground mr-1">
                  {stat.currency}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 space-x-reverse mt-2">
              <Badge 
                variant={stat.changeType === "positive" ? "default" : "secondary"}
                className="text-xs"
              >
                {stat.change}
              </Badge>
              <span className="text-xs text-muted-foreground">
                نسبت به ماه گذشته
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
