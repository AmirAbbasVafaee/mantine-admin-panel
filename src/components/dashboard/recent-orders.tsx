"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal } from "lucide-react"

const ordersData = [
  {
    id: "#۱۲۳۴۵",
    customer: "علی محمدی",
    email: "ali@example.com",
    amount: "۲,۵۰۰,۰۰۰",
    status: "تکمیل شده",
    date: "۱۴۰۲/۱۲/۱۵",
    avatar: "/avatars/01.png"
  },
  {
    id: "#۱۲۳۴۶",
    customer: "فاطمه احمدی",
    email: "fateme@example.com",
    amount: "۱,۸۰۰,۰۰۰",
    status: "در حال پردازش",
    date: "۱۴۰۲/۱۲/۱۴",
    avatar: "/avatars/02.png"
  },
  {
    id: "#۱۲۳۴۷",
    customer: "محمد رضایی",
    email: "mohammad@example.com",
    amount: "۳,۲۰۰,۰۰۰",
    status: "ارسال شده",
    date: "۱۴۰۲/۱۲/۱۳",
    avatar: "/avatars/03.png"
  },
  {
    id: "#۱۲۳۴۸",
    customer: "زهرا کریمی",
    email: "zahra@example.com",
    amount: "۹۵۰,۰۰۰",
    status: "لغو شده",
    date: "۱۴۰۲/۱۲/۱۲",
    avatar: "/avatars/04.png"
  },
  {
    id: "#۱۲۳۴۹",
    customer: "حسین نوری",
    email: "hossein@example.com",
    amount: "۴,۵۰۰,۰۰۰",
    status: "تکمیل شده",
    date: "۱۴۰۲/۱۲/۱۱",
    avatar: "/avatars/05.png"
  }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "تکمیل شده":
      return <Badge className="bg-green-100 text-green-800">تکمیل شده</Badge>
    case "در حال پردازش":
      return <Badge className="bg-yellow-100 text-yellow-800">در حال پردازش</Badge>
    case "ارسال شده":
      return <Badge className="bg-blue-100 text-blue-800">ارسال شده</Badge>
    case "لغو شده":
      return <Badge variant="destructive">لغو شده</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export function RecentOrders() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">سفارشات اخیر</CardTitle>
        <Button variant="outline" size="sm">
          مشاهده همه
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">شماره سفارش</TableHead>
              <TableHead className="text-right">مشتری</TableHead>
              <TableHead className="text-right">مبلغ</TableHead>
              <TableHead className="text-right">وضعیت</TableHead>
              <TableHead className="text-right">تاریخ</TableHead>
              <TableHead className="text-right">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersData.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium text-right">{order.id}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={order.avatar} alt={order.customer} />
                      <AvatarFallback>{order.customer.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-right">
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-right">{order.amount} تومان</TableCell>
                <TableCell className="text-right">{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">{order.date}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2 space-x-reverse justify-end">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
