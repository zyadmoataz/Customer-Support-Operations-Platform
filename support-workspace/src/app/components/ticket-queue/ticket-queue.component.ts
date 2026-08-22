import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { SupportTicket, TicketStatus, TicketPriority, AgentOverview } from '../../core/models/ticket.model';
import { CustomSelectComponent, SelectOption } from '../custom-select/custom-select.component';
import {
  PAGE_SIZE,
  PRIORITY_OPTIONS,
  CATEGORY_OPTIONS,
  DATE_RANGE_OPTIONS,
  STATUS_OPTIONS,
  getStatusBadgeClass,
  getPriorityBadgeClass,
} from './ticket-queue.constants';

@Component({
  selector: 'app-ticket-queue',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, CustomSelectComponent],
  templateUrl: './ticket-queue.component.html'
})
export class TicketQueueComponent {
  tickets = input<SupportTicket[]>([]);
  agents = input<AgentOverview[]>([]);
  loading = input<boolean>(false);
  userRole = input<string | null>(null);
  currentUserId = input<string | null>(null);

  statusChange = output<{ ticketId: string; newStatus: TicketStatus }>();
  requestResolve = output<string>();
  openFeedback = output<SupportTicket>();
  claimTicket = output<string>();
  assignTicket = output<{ ticketId: string; agentId: string | null }>();

  agentViewTab = signal<'available' | 'active' | 'history'>('available');
  managerStatusTab = signal<string>('all');
  searchQuery = signal<string>('');
  priorityFilter = signal<string>('all');
  categoryFilter = signal<string>('all');
  dateRangeFilter = signal<string>('all');
  showFilters = signal<boolean>(false);
  currentPage = signal<number>(1);

  readonly priorityOptions = PRIORITY_OPTIONS;
  readonly categoryOptions = CATEGORY_OPTIONS;
  readonly dateRangeOptions = DATE_RANGE_OPTIONS;
  readonly statusOptions = STATUS_OPTIONS;

  assignAgentOptions = computed<SelectOption[]>(() => {
    const list: SelectOption[] = [{ value: 'unassigned', label: 'Unassigned (Open Queue)' }];
    this.agents().forEach(ag => {
      list.push({ value: ag.id, label: `${ag.full_name} (${ag.total_assigned} active)` });
    });
    return list;
  });

  activeFilterCount = computed(() =>
    [
      this.priorityFilter() !== 'all',
      this.categoryFilter() !== 'all',
      this.dateRangeFilter() !== 'all',
    ].filter(Boolean).length
  );

  private allFilteredTickets = computed(() => {
    const isMgr = this.userRole() === 'manager';
    const myId = this.currentUserId();
    const query = this.searchQuery().toLowerCase();
    let list = this.tickets();

    if (!isMgr) {
      if (this.agentViewTab() === 'available') list = list.filter(t => !t.assigned_to && t.status === 'open');
      else if (this.agentViewTab() === 'active') list = list.filter(t => t.assigned_to === myId && t.status !== 'resolved');
      else list = list.filter(t => t.assigned_to === myId && t.status === 'resolved');
    } else if (this.managerStatusTab() !== 'all') {
      list = list.filter(t => t.status === this.managerStatusTab());
    }

    if (query) {
      list = list.filter(t => (t.title || '').toLowerCase().includes(query) || t.description.toLowerCase().includes(query));
    }
    if (this.priorityFilter() !== 'all') list = list.filter(t => t.priority === this.priorityFilter());
    if (this.categoryFilter() !== 'all') list = list.filter(t => t.category === this.categoryFilter());
    if (this.dateRangeFilter() !== 'all') {
      const days = this.dateRangeFilter() === '7d' ? 7 : this.dateRangeFilter() === '30d' ? 30 : 90;
      const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
      list = list.filter(t => new Date(t.created_at).getTime() >= cutoff);
    }
    return list;
  });

  totalFilteredCount = computed(() => this.allFilteredTickets().length);
  totalPages = computed(() => Math.ceil(this.totalFilteredCount() / PAGE_SIZE) || 1);

  filteredTickets = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.allFilteredTickets().slice(start, start + PAGE_SIZE);
  });

  fromItem = computed(() => this.totalFilteredCount() === 0 ? 0 : (this.currentPage() - 1) * PAGE_SIZE + 1);
  toItem = computed(() => Math.min(this.currentPage() * PAGE_SIZE, this.totalFilteredCount()));

  nextPage() { if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1); }
  prevPage() { if (this.currentPage() > 1) this.currentPage.update(p => p - 1); }
  goToPage(page: number) { if (page >= 1 && page <= this.totalPages()) this.currentPage.set(page); }

  clearAllFilters() {
    this.priorityFilter.set('all');
    this.categoryFilter.set('all');
    this.dateRangeFilter.set('all');
    this.searchQuery.set('');
    this.currentPage.set(1);
  }

  toggleFilters() { this.showFilters.update(v => !v); }
  onFilterChange() { this.currentPage.set(1); }

  getPageNumbers(): (number | string)[] {
    const total = this.totalPages();
    const current = this.currentPage();
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: (number | string)[] = [1];
    if (current > 3) pages.push('...');
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
    if (current < total - 2) pages.push('...');
    pages.push(total);
    return pages;
  }

  handleAssignAgent(ticketId: string, agentValue: string) {
    this.assignTicket.emit({ ticketId, agentId: agentValue === 'unassigned' ? null : agentValue });
  }

  handleSelectChange(ticket: SupportTicket, newStatus: string) {
    if (newStatus === 'resolved') { this.requestResolve.emit(ticket.id); return; }
    this.statusChange.emit({ ticketId: ticket.id, newStatus: newStatus as TicketStatus });
  }

  getStatusClass(status: TicketStatus): string { return getStatusBadgeClass(status); }
  getPriorityClass(priority: TicketPriority): string { return getPriorityBadgeClass(priority); }
}
