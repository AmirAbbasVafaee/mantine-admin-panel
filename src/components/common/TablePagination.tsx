"use client"

import { Group, Text, Select, ActionIcon, Box, Stack } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useResponsive } from '@/hooks/useResponsive'

interface TablePaginationProps {
  total: number
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  pageSizeOptions?: number[]
}

export function TablePagination({
  total,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100]
}: TablePaginationProps) {
  const { isDark, colorTheme } = useTheme()
  const { isMobile, isTablet } = useResponsive()

  // Get theme color
  const getThemeColor = () => {
    const colors = {
      blue: '#228be6',
      green: '#40c057',
      purple: '#7950f2',
      orange: '#fd7e14'
    }
    return colors[colorTheme]
  }
  
  const totalPages = Math.ceil(total / pageSize)
  const startItem = (page - 1) * pageSize + 1
  const endItem = Math.min(page * pageSize, total)
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = isMobile ? 3 : 5
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show smart pagination with ellipsis
      if (page <= 3) {
        // Near start
        for (let i = 1; i <= Math.min(3, totalPages); i++) {
          pages.push(i)
        }
        if (totalPages > 3) {
          pages.push('...')
          pages.push(totalPages)
        }
      } else if (page >= totalPages - 2) {
        // Near end
        pages.push(1)
        pages.push('...')
        for (let i = Math.max(totalPages - 2, 2); i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Middle
        pages.push(1)
        pages.push('...')
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== page) {
      onPageChange(pageNumber)
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      onPageChange(page - 1)
    }
  }

  const handleNextPage = () => {
    if (page < totalPages) {
      onPageChange(page + 1)
    }
  }

  if (total === 0) return null

  // Mobile layout
  if (isMobile) {
    return (
      <Box
        style={{
          padding: '16px',
          borderTop: `1px solid ${isDark ? '#373a40' : '#e9ecef'}`,
          backgroundColor: isDark ? '#25262b' : '#ffffff',
          direction: 'rtl',
        }}
      >
        <Stack gap="md" align="center">
          {/* Page info */}
          <Text size="sm" c={isDark ? 'dimmed' : 'dark'} style={{ direction: 'rtl', textAlign: 'center' }}>
            نمایش {startItem} تا {endItem} از {total} مورد
          </Text>

          {/* Items per page selector */}
          <Group gap="xs" align="center">
            <Text size="sm" c={isDark ? 'dimmed' : 'dark'} style={{ direction: 'rtl' }}>
              مورد در صفحه
            </Text>
            <Select
              value={pageSize.toString()}
              onChange={(value) => onPageSizeChange(Number(value))}
              data={pageSizeOptions.map(size => ({ value: size.toString(), label: size.toString() }))}
              size="sm"
              style={{ width: '80px', direction: 'rtl' }}
              styles={{
                input: {
                  backgroundColor: isDark ? '#25262b' : '#ffffff',
                  borderColor: isDark ? '#373a40' : '#ced4da',
                  color: isDark ? '#ffffff' : '#000000',
                  textAlign: 'center',
                  direction: 'rtl',
                }
              }}
            />
          </Group>

          {/* Pagination controls */}
          <Group gap="xs" align="center">
            {/* Previous button */}
            <ActionIcon
              variant="light"
              size="md"
              onClick={handlePreviousPage}
              disabled={page === 1}
              color={isDark ? 'gray' : 'dark'}
              style={{
                opacity: page === 1 ? 0.5 : 1,
              }}
            >
              <IconChevronLeft size={18} />
            </ActionIcon>

            {/* Page numbers */}
            {getPageNumbers().map((pageNumber, index) => (
              <ActionIcon
                key={index}
                variant={pageNumber === page ? 'filled' : 'light'}
                size="md"
                onClick={() => typeof pageNumber === 'number' ? handlePageClick(pageNumber) : null}
                color={pageNumber === page ? colorTheme : isDark ? 'gray' : 'dark'}
                style={{
                  minWidth: '36px',
                  height: '36px',
                  fontSize: '14px',
                  fontWeight: pageNumber === page ? 600 : 400,
                  direction: 'rtl',
                }}
                disabled={pageNumber === '...'}
              >
                {pageNumber === '...' ? '...' : pageNumber}
              </ActionIcon>
            ))}

            {/* Next button */}
            <ActionIcon
              variant="light"
              size="md"
              onClick={handleNextPage}
              disabled={page === totalPages}
              color={isDark ? 'gray' : 'dark'}
              style={{
                opacity: page === totalPages ? 0.5 : 1,
              }}
            >
              <IconChevronRight size={18} />
            </ActionIcon>
          </Group>
        </Stack>
      </Box>
    )
  }

  // Desktop/Tablet layout
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        borderTop: `1px solid ${isDark ? '#373a40' : '#e9ecef'}`,
        backgroundColor: isDark ? '#25262b' : '#ffffff',
        direction: 'rtl',
      }}
    >
      {/* Left side - Page info */}
      <Text size="sm" c={isDark ? 'dimmed' : 'dark'} style={{ direction: 'rtl' }}>
        نمایش {startItem} تا {endItem} از {total} مورد
      </Text>

      {/* Right side - Pagination controls */}
      <Group gap="md" align="center" style={{ direction: 'rtl' }}>
        {/* Items per page selector */}
        <Group gap="xs" align="center">
          <Text size="sm" c={isDark ? 'dimmed' : 'dark'} style={{ direction: 'rtl' }}>
            مورد در صفحه
          </Text>
          <Select
            value={pageSize.toString()}
            onChange={(value) => onPageSizeChange(Number(value))}
            data={pageSizeOptions.map(size => ({ value: size.toString(), label: size.toString() }))}
            size="sm"
            style={{ width: '80px', direction: 'rtl' }}
            styles={{
              input: {
                backgroundColor: isDark ? '#25262b' : '#ffffff',
                borderColor: isDark ? '#373a40' : '#ced4da',
                color: isDark ? '#ffffff' : '#000000',
                textAlign: 'center',
                direction: 'rtl',
              }
            }}
          />
        </Group>

        {/* Pagination controls */}
        <Group gap="xs" align="center">
          {/* Previous button */}
          <ActionIcon
            variant="light"
            size="sm"
            onClick={handlePreviousPage}
            disabled={page === 1}
            color={isDark ? 'gray' : 'dark'}
            style={{
              opacity: page === 1 ? 0.5 : 1,
            }}
          >
            <IconChevronLeft size={16} />
          </ActionIcon>

          {/* Page numbers */}
          {getPageNumbers().map((pageNumber, index) => (
            <ActionIcon
              key={index}
              variant={pageNumber === page ? 'filled' : 'light'}
              size="sm"
              onClick={() => typeof pageNumber === 'number' ? handlePageClick(pageNumber) : null}
              color={pageNumber === page ? colorTheme : isDark ? 'gray' : 'dark'}
              style={{
                minWidth: '32px',
                height: '32px',
                fontSize: '14px',
                fontWeight: pageNumber === page ? 600 : 400,
                direction: 'rtl',
              }}
              disabled={pageNumber === '...'}
            >
              {pageNumber === '...' ? '...' : pageNumber}
            </ActionIcon>
          ))}

          {/* Next button */}
          <ActionIcon
            variant="light"
            size="sm"
            onClick={handleNextPage}
            disabled={page === totalPages}
            color={isDark ? 'gray' : 'dark'}
            style={{
              opacity: page === totalPages ? 0.5 : 1,
            }}
          >
            <IconChevronRight size={16} />
          </ActionIcon>
        </Group>
      </Group>
    </Box>
  )
}
