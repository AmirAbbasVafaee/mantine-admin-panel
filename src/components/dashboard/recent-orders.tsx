"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"

const orders = [
  {
    id: "#۱۲۳۴",
    customer: "احمد محمدی",
    email: "ahmad@example.com",
    amount: "۲,۵۰۰,۰۰۰",
    status: "completed",
    date: "۱۴۰۲/۱۲/۱۵",
    avatar: "/avatars/01.png"
  },
  {
    id: "#۱۲۳۵",
    customer: "فاطمه احمدی",
    email: "fateme@example.com",
    amount: "۱,۸۰۰,۰۰۰",
    status: "pending",
    date: "۱۴۰۲/۱۲/۱۴",
    avatar: "/avatars/02.png"
  },
  {
    id: "#۱۲۳۶",
    customer: "علی رضایی",
    email: "ali@example.com",
    amount: "۳,۲۰۰,۰۰۰",
    status: "processing",
    date: "۱۴۰۲/۱۲/۱۳",
    avatar: "/avatars/03.png"
  },
  {
    id: "#۱۲۳۷",
    customer: "مریم کریمی",
    email: "maryam@example.com",
    amount: "۹۵۰,۰۰۰",
    status: "cancelled",
    date: "۱۴۰۲/۱۲/۱۲",
    avatar: "/avatars/04.png"
  },
  {
    id: "#۱۲۳۸",
    customer: "حسین نوری",
    email: "hossein@example.com",
    amount: "۴,۵۰۰,۰۰۰",
    status: "completed",
    date: "۱۴۰۲/۱۲/۱۱",
    avatar: "/avatars/05.png"
  }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">تکمیل شده</Badge>
    case "pending":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">در انتظار</Badge>
    case "processing":
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">در حال پردازش</Badge>
    case "cancelled":
      return <Badge variant="destructive">لغو شده</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export function RecentOrders() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">سفارشات اخیر</CardTitle>
          <Button variant="outline" size="sm">
            مشاهده همه
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">مشتری</TableHead>
              <TableHead className="text-right">مبلغ</TableHead>
              <TableHead className="text-right">وضعیت</TableHead>
              <TableHead className="text-right">تاریخ</TableHead>
              <TableHead className="text-right">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="text-right">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={order.avatar} alt={order.customer} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {order.customer.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {order.amount} تومان
                </TableCell>
                <TableCell className="text-right">
                  {getStatusBadge(order.status)}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {order.date}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2 space-x-reverse">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
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
