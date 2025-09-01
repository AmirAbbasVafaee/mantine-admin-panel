export interface Product {
  id: number
  name: string
  category: string
  price: string
  stock: number
  status: 'available' | 'low_stock' | 'out_of_stock'
  sales: number
  rating: number
  sku: string
  description: string
  image?: string
  weight: string
  dimensions: string
  warranty: string
}

export interface ProductFormData {
  name: string
  category: string
  price: string
  stock: string
  status: 'available' | 'low_stock' | 'out_of_stock'
  description: string
  sku: string
}

export interface ProductFilters {
  searchQuery: string
  categoryFilter: string | null
  statusFilter: string | null
}
