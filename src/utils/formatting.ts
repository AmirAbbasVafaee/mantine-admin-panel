export const formatCurrency = (amount: string | number): string => {
  const num = typeof amount === 'string' ? parseInt(amount.replace(/[^\d]/g, '')) : amount
  return num.toLocaleString('fa-IR') + ' تومان'
}

export const formatDate = (date: string): string => {
  return date // Assuming dates are already in Persian format
}

export const formatPhone = (phone: string): string => {
  return phone // Assuming phones are already in Persian format
}

export const getStatusBadge = (status: string) => {
  const statusConfig = {
    active: { color: 'green', label: 'فعال' },
    inactive: { color: 'gray', label: 'غیرفعال' },
    suspended: { color: 'red', label: 'معلق' },
    completed: { color: 'green', label: 'تکمیل شده' },
    pending: { color: 'yellow', label: 'در انتظار' },
    processing: { color: 'blue', label: 'در حال پردازش' },
    shipped: { color: 'cyan', label: 'ارسال شده' },
    cancelled: { color: 'red', label: 'لغو شده' },
    available: { color: 'green', label: 'موجود' },
    low_stock: { color: 'orange', label: 'موجودی کم' },
    out_of_stock: { color: 'red', label: 'ناموجود' },
  }
  
  const config = statusConfig[status as keyof typeof statusConfig] || { color: 'gray', label: status }
  return { color: config.color, label: config.label }
}

export const getRoleBadge = (role: string) => {
  const roleConfig = {
    admin: { color: 'red', label: 'مدیر' },
    moderator: { color: 'blue', label: 'ناظر' },
    user: { color: 'gray', label: 'کاربر' },
  }
  
  const config = roleConfig[role as keyof typeof roleConfig] || { color: 'gray', label: role }
  return { color: config.color, label: config.label }
}
