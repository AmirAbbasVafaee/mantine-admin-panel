"use client"

import { useState } from 'react'
import { Stack, Card, Pagination, Alert, Container } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { Product, ProductFormData } from '@/types/product'
import { useProducts } from '@/hooks/useProducts'
import { PageHeader } from '@/components/common/PageHeader'
import { SearchAndFilter } from '@/components/common/SearchAndFilter'
import { ProductsTable } from '@/components/tables/ProductsTable'
import { ProductModal } from '@/components/modals/ProductModal'
import { useTheme } from '@/contexts/ThemeContext'

export function ProductsPage() {
  const { isDark } = useTheme()
  const {
    products,
    loading,
    filters,
    setFilters,
    addProduct,
    updateProduct,
    deleteProduct,
    validateForm
  } = useProducts()

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view' | 'delete'>('add')
  const [modalOpened, setModalOpened] = useState(false)
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: '',
    price: '',
    stock: '0',
    status: 'available',
    description: '',
    sku: ''
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const itemsPerPage = 10
  const totalPages = Math.ceil(products.length / itemsPerPage)
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleAddProduct = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '0',
      status: 'available',
      description: '',
      sku: ''
    })
    setFormErrors({})
    setModalMode('add')
    setModalOpened(true)
  }

  const handleEditProduct = (product: Product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock.toString(),
      status: product.status,
      description: product.description,
      sku: product.sku
    })
    setFormErrors({})
    setSelectedProduct(product)
    setModalMode('edit')
    setModalOpened(true)
  }

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setModalMode('view')
    setModalOpened(true)
  }

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product)
    setModalMode('delete')
    setModalOpened(true)
  }

  const handleSubmit = async () => {
    const errors = validateForm(formData)
    setFormErrors(errors)

    if (Object.keys(errors).length > 0) {
      return
    }

    let result
    if (modalMode === 'add') {
      result = await addProduct(formData)
    } else if (modalMode === 'edit' && selectedProduct) {
      result = await updateProduct(selectedProduct.id, formData)
    }

    if (result?.success) {
      setModalOpened(false)
      setFormErrors({})
    }
  }

  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      const result = await deleteProduct(selectedProduct.id)
      if (result?.success) {
        setModalOpened(false)
      }
    }
  }

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      categoryFilter: null,
      statusFilter: null
    })
  }

  const filterOptions = [
    {
      key: 'category',
      label: 'دسته‌بندی',
      value: filters.categoryFilter,
      onChange: (value: string | null) => setFilters(prev => ({ ...prev, categoryFilter: value })),
      data: [
        { value: 'لپ‌تاپ', label: 'لپ‌تاپ' },
        { value: 'گوشی موبایل', label: 'گوشی موبایل' },
        { value: 'تبلت', label: 'تبلت' },
        { value: 'صوتی', label: 'صوتی' },
        { value: 'پوشیدنی', label: 'پوشیدنی' },
        { value: 'لوازم جانبی', label: 'لوازم جانبی' }
      ]
    },
    {
      key: 'status',
      label: 'وضعیت',
      value: filters.statusFilter,
      onChange: (value: string | null) => setFilters(prev => ({ ...prev, statusFilter: value })),
      data: [
        { value: 'available', label: 'موجود' },
        { value: 'low_stock', label: 'موجودی کم' },
        { value: 'out_of_stock', label: 'ناموجود' }
      ]
    }
  ]

  return (
    <Container size="xl" py="md" px={isDark ? "xs" : "md"}>
      <Stack gap="lg">
        <PageHeader
          title="مدیریت محصولات"
          description="مدیریت کاتالوگ محصولات و موجودی"
          actionLabel="افزودن محصول"
          onAction={handleAddProduct}
        />

        <SearchAndFilter
          searchQuery={filters.searchQuery}
          onSearchChange={(value) => setFilters(prev => ({ ...prev, searchQuery: value }))}
          filters={filterOptions}
          onReset={handleResetFilters}
          searchPlaceholder="جستجو در نام محصول، کد محصول یا دسته‌بندی..."
        />

        {products.length === 0 ? (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="هیچ محصولی یافت نشد"
            color="blue"
          >
            محصولی با فیلترهای انتخاب شده یافت نشد. لطفاً فیلترها را تغییر دهید یا محصول جدیدی اضافه کنید.
          </Alert>
        ) : (
          <Card padding="lg" radius="md" withBorder>
            <ProductsTable
              products={paginatedProducts}
              onView={handleViewProduct}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
            
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <Pagination
                  total={totalPages}
                  value={currentPage}
                  onChange={setCurrentPage}
                  withEdges
                />
              </div>
            )}
          </Card>
        )}

        <ProductModal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          product={selectedProduct}
          formData={formData}
          onFormChange={setFormData}
          onSubmit={handleSubmit}
          onDelete={handleConfirmDelete}
          loading={loading}
          errors={formErrors}
          mode={modalMode}
        />
      </Stack>
    </Container>
  )
}
