import { SelectOption } from '../custom-select/custom-select.component';
import { TicketStatus, TicketPriority } from '../../core/models/ticket.model';

export const PAGE_SIZE = 10;

export const PRIORITY_OPTIONS: SelectOption[] = [
  { value: 'all', label: 'All Priorities' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export const CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'Technical Issue', label: 'Technical Issue' },
  { value: 'Billing & Plans', label: 'Billing & Plans' },
  { value: 'Account Access', label: 'Account Access' },
  { value: 'Feature Request', label: 'Feature Request' },
];

export const DATE_RANGE_OPTIONS: SelectOption[] = [
  { value: 'all', label: 'All Time' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
];

export const STATUS_OPTIONS: SelectOption[] = [
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Mark as Resolved...' }
];

export function getStatusBadgeClass(status: TicketStatus): string {
  switch (status) {
    case 'open': return 'bg-sky-500/15 border-sky-500/30 text-sky-300';
    case 'in_progress': return 'bg-amber-500/15 border-amber-500/30 text-amber-300';
    case 'resolved': return 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300';
  }
}

export function getPriorityBadgeClass(priority: TicketPriority): string {
  switch (priority) {
    case 'urgent': return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    case 'high': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    case 'medium': return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
    default: return 'bg-slate-800 text-slate-300 border-slate-700';
  }
}
