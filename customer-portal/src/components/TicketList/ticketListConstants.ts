import type { TicketStatus, TicketPriority } from '@/types'

export const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'open', label: 'Active (Open / In Progress)' },
  { value: 'resolved', label: 'Resolved' },
]

export const PRIORITY_OPTIONS = [
  { value: 'all', label: 'All Priorities' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

export const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All Categories' },
  { value: 'Technical Issue', label: 'Technical Issue' },
  { value: 'Billing & Plans', label: 'Billing & Plans' },
  { value: 'Account Access', label: 'Account Access' },
  { value: 'Feature Request', label: 'Feature Request' },
]

export const DATE_RANGE_OPTIONS = [
  { value: 'all', label: 'All Time' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
]

export const statusBadge: Record<TicketStatus, { bg: string; text: string; dot: string; label: string }> = {
  open: { bg: 'bg-brand-surface border border-brand-border', text: 'text-text-primary', dot: 'bg-state-info', label: 'Open' },
  in_progress: { bg: 'bg-brand-surface border border-brand-border', text: 'text-text-primary', dot: 'bg-state-warning', label: 'In Progress' },
  resolved: { bg: 'bg-brand-surface border border-brand-border', text: 'text-text-primary', dot: 'bg-state-success', label: 'Resolved' },
}

export const priorityBadge: Record<TicketPriority, { text: string; bg: string }> = {
  low: { text: 'text-text-secondary', bg: 'bg-brand-elevated/80 border border-brand-border' },
  medium: { text: 'text-text-primary', bg: 'bg-brand-surface border border-brand-border' },
  high: { text: 'text-state-warning', bg: 'bg-brand-surface border border-brand-border' },
  urgent: { text: 'text-state-danger', bg: 'bg-brand-surface border border-brand-border' },
}
