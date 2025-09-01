import { useState, useCallback } from 'react'
import { Product, ProductFormData, ProductFilters } from '@/types/product'
import { products as initialProducts } from '@/data/products'
import { validateProductForm } from '@/utils/validation'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<ProductFilters>({
    searchQuery: '',
    categoryFilter: null,
    statusFilter: null,
  })

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(filters.searchQuery.toLowerCase())
    const matchesCategory = !filters.categoryFilter || product.category === filters.categoryFilter
    const matchesStatus = !filters.statusFilter || product.status === filters.statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const addProduct = useCallback(async (productData: ProductFormData) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newProduct: Product = {
        id: Math.max(...products.map(p => p.id)) + 1,
        name: productData.name,
        category: productData.category,
        price: productData.price,
        stock: parseInt(productData.stock),
        status: productData.status,
        sales: 0,
        rating: 0,
        sku: productData.sku,
        description: productData.description,
        weight: '0 کیلوگرم',
        dimensions: '0 × 0 × 0 سانتی‌متر',
        warranty: '1 سال',
      }
      
      setProducts(prev => [...prev, newProduct])
      return { success: true }
    } catch (error) {
      return { success: false, error: 'خطا در افزودن محصول' }
    } finally {
      setLoading(false)
    }
  }, [products])

  const updateProduct = useCallback(async (id: number, productData: ProductFormData) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProducts(prev => prev.map(product => 
        product.id === id 
          ? { 
              ...product, 
              name: productData.name,
              category: productData.category,
              price: productData.price,
              stock: parseInt(productData.stock),
              status: productData.status,
              sku: productData.sku,
              description: productData.description,
            }
          : product
      ))
      return { success: true }
    } catch (error) {
      return { success: false, error: 'خطا در بروزرسانی محصول' }
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteProduct = useCallback(async (id: number) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProducts(prev => prev.filter(product => product.id !== id))
      return { success: true }
    } catch (error) {
      return { success: false, error: 'خطا در حذف محصول' }
    } finally {
      setLoading(false)
    }
  }, [])

  const validateForm = useCallback((data: ProductFormData) => {
    return validateProductForm(data)
  }, [])

  return {
    products: filteredProducts,
    loading,
    filters,
    setFilters,
    addProduct,
    updateProduct,
    deleteProduct,
    validateForm,
  }
}
