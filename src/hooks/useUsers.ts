import { useState, useCallback } from 'react'
import { User, UserFormData, UserFilters } from '@/types/user'
import { users as initialUsers } from '@/data/users'
import { validateUserForm } from '@/utils/validation'

export function useUsers() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<UserFilters>({
    searchQuery: '',
    statusFilter: null,
    roleFilter: null,
  })

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         user.phone.includes(filters.searchQuery)
    const matchesStatus = !filters.statusFilter || user.status === filters.statusFilter
    const matchesRole = !filters.roleFilter || user.role === filters.roleFilter
    return matchesSearch && matchesStatus && matchesRole
  })

  const addUser = useCallback(async (userData: UserFormData) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser: User = {
        id: Math.max(...users.map(u => u.id)) + 1,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        status: userData.status,
        createdAt: new Date().toLocaleDateString('fa-IR'),
      }
      
      setUsers(prev => [...prev, newUser])
      return { success: true }
    } catch {
      return { success: false, error: 'خطا در افزودن کاربر' }
    } finally {
      setLoading(false)
    }
  }, [users])

  const updateUser = useCallback(async (id: number, userData: UserFormData) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setUsers(prev => prev.map(user => 
        user.id === id 
          ? { ...user, ...userData }
          : user
      ))
      return { success: true }
    } catch {
      return { success: false, error: 'خطا در بروزرسانی کاربر' }
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteUser = useCallback(async (id: number) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setUsers(prev => prev.filter(user => user.id !== id))
      return { success: true }
    } catch {
      return { success: false, error: 'خطا در حذف کاربر' }
    } finally {
      setLoading(false)
    }
  }, [])

  const validateForm = useCallback((data: UserFormData) => {
    return validateUserForm(data)
  }, [])

  return {
    users: filteredUsers,
    loading,
    filters,
    setFilters,
    addUser,
    updateUser,
    deleteUser,
    validateForm,
  }
}
