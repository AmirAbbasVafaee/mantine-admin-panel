"use client"

import { Card, Group, TextInput, Select, Button } from '@mantine/core'
import { IconSearch, IconRefresh } from '@tabler/icons-react'

interface SearchAndFilterProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  filters: Array<{
    key: string
    label: string
    value: string | null
    onChange: (value: string | null) => void
    data: Array<{ value: string; label: string }>
  }>
  onReset: () => void
  searchPlaceholder?: string
}

export function SearchAndFilter({
  searchQuery,
  onSearchChange,
  filters,
  onReset,
  searchPlaceholder = "جستجو..."
}: SearchAndFilterProps) {
  return (
    <Card padding="lg" radius="md" withBorder>
      <Group gap="md" wrap="wrap">
        <TextInput
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          leftSection={<IconSearch size={16} />}
          style={{ flex: 1, minWidth: 300 }}
        />
        
        {filters.map((filter) => (
          <Select
            key={filter.key}
            placeholder={filter.label}
            value={filter.value}
            onChange={filter.onChange}
            data={filter.data}
            clearable
            style={{ minWidth: 150 }}
          />
        ))}
        
        <Button
          variant="light"
          leftSection={<IconRefresh size={16} />}
          onClick={onReset}
        >
          پاک کردن فیلترها
        </Button>
      </Group>
    </Card>
  )
}
