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
  open: { bg: 'bg-sky-500/10 border-sky-500/25', text: 'text-sky-400', dot: 'bg-sky-400', label: 'Open' },
  in_progress: { bg: 'bg-amber-500/10 border-amber-500/25', text: 'text-amber-400', dot: 'bg-amber-400', label: 'In Progress' },
  resolved: { bg: 'bg-emerald-500/10 border-emerald-500/25', text: 'text-emerald-400', dot: 'bg-emerald-400', label: 'Resolved' },
}

export const priorityBadge: Record<TicketPriority, { text: string; bg: string }> = {
  low: { text: 'text-slate-400', bg: 'bg-slate-800/80 border border-slate-700/50' },
  medium: { text: 'text-sky-300', bg: 'bg-sky-950/60 border border-sky-500/20' },
  high: { text: 'text-amber-300', bg: 'bg-amber-950/60 border border-amber-500/20' },
  urgent: { text: 'text-rose-300', bg: 'bg-rose-950/60 border border-rose-500/20' },
}
