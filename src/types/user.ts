export interface User {
  id: number
  name: string
  email: string
  phone: string
  role: 'admin' | 'moderator' | 'user'
  status: 'active' | 'inactive' | 'suspended'
  avatar?: string
  createdAt: string
  lastLogin?: string
}

export interface UserFormData {
  name: string
  email: string
  phone: string
  role: 'admin' | 'moderator' | 'user'
  status: 'active' | 'inactive' | 'suspended'
}

export interface UserFilters {
  searchQuery: string
  statusFilter: string | null
  roleFilter: string | null
}
