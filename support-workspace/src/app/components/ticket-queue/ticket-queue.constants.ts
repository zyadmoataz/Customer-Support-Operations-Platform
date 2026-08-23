import { SelectOption } from '../custom-select/custom-select.component';
import { TicketStatus, TicketPriority } from '../../core/models/ticket.model';

export const PAGE_SIZE = 3;

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
    case 'open': return 'bg-brand-surface border-brand-border text-text-primary';
    case 'in_progress': return 'bg-brand-surface border-brand-border text-text-primary';
    case 'resolved': return 'bg-brand-surface border-brand-border text-text-primary';
  }
}

export function getPriorityBadgeClass(priority: TicketPriority): string {
  switch (priority) {
    case 'urgent': return 'bg-brand-surface text-state-danger border-brand-border';
    case 'high': return 'bg-brand-surface text-state-warning border-brand-border';
    case 'medium': return 'bg-brand-surface text-text-primary border-brand-border';
    default: return 'bg-brand-elevated text-text-secondary border-brand-border';
  }
}
