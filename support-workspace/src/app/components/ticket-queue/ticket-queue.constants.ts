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
    case 'open': return 'bg-state-info-bg border-state-info text-state-info';
    case 'in_progress': return 'bg-state-warning-bg border-state-warning text-state-warning';
    case 'resolved': return 'bg-state-success-bg border-state-success text-state-success';
  }
}

export function getPriorityBadgeClass(priority: TicketPriority): string {
  switch (priority) {
    case 'urgent': return 'bg-state-danger/20 text-state-danger border-state-danger';
    case 'high': return 'bg-state-warning-bg text-state-warning border-state-warning';
    case 'medium': return 'bg-state-info-bg text-state-info border-state-info';
    default: return 'bg-brand-elevated text-text-secondary border-brand-subtle';
  }
}
