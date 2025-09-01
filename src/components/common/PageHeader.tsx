"use client"

import { Group, Title, Text, Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

interface PageHeaderProps {
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  actionIcon?: React.ReactNode
}

export function PageHeader({
  title,
  description,
  actionLabel,
  onAction,
  actionIcon = <IconPlus size={16} />
}: PageHeaderProps) {
  return (
    <Group justify="space-between" mb="lg">
      <div>
        <Title order={2} mb="xs">{title}</Title>
        {description && (
          <Text c="dimmed" size="sm">{description}</Text>
        )}
      </div>
      
      {actionLabel && onAction && (
        <Button
          leftSection={actionIcon}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </Group>
  )
}
