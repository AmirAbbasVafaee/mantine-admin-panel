"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Activity
} from "lucide-react"

const statsData = [
  {
    title: "کل کاربران",
    value: "۲,۴۵۶",
    change: "+۱۲.۵٪",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "سفارشات امروز",
    value: "۱۸۹",
    change: "+۸.۲٪",
    trend: "up",
    icon: ShoppingCart,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    title: "درآمد ماهانه",
    value: "۱۲,۵۴۰,۰۰۰",
    change: "+۱۵.۳٪",
    trend: "up",
    icon: DollarSign,
    color: "text-purple-600",
    bgColor: "bg-purple-100"
  },
  {
    title: "نرخ تبدیل",
    value: "۳.۲٪",
    change: "-۲.۱٪",
    trend: "down",
    icon: Activity,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <Card key={index} className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center space-x-2 space-x-reverse mt-2">
              {stat.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <Badge 
                variant={stat.trend === "up" ? "default" : "destructive"}
                className="text-xs"
              >
                {stat.change}
              </Badge>
              <span className="text-xs text-muted-foreground">از ماه گذشته</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
