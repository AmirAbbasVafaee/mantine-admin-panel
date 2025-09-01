export interface Order {
  id: string
  customer: string
  email: string
  phone: string
  products: string[]
  amount: string
  status: 'completed' | 'pending' | 'processing' | 'shipped' | 'cancelled'
  date: string
  paymentMethod: string
  shippingAddress: string
  trackingNumber?: string
  notes?: string
}

export interface OrderFormData {
  customer: string
  email: string
  products: string
  amount: string
  status: 'completed' | 'pending' | 'processing' | 'shipped' | 'cancelled'
  paymentMethod: 'online' | 'card' | 'cash'
  shippingAddress: string
}

export interface OrderFilters {
  searchQuery: string
  statusFilter: string | null
  dateFilter: string | null
}
