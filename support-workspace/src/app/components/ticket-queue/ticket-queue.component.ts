import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { SupportTicket, TicketStatus, TicketPriority, AgentOverview } from '../../core/models/ticket.model';
import { CustomSelectComponent, SelectOption } from '../custom-select/custom-select.component';

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

  assignAgentOptions = computed<SelectOption[]>(() => {
    const list: SelectOption[] = [
      { value: 'unassigned', label: 'Unassigned (Open Queue)' }
    ];
    this.agents().forEach(ag => {
      list.push({
        value: ag.id,
        label: `${ag.full_name} (${ag.total_assigned} active)`
      });
    });
    return list;
  });

  statusOptions: SelectOption[] = [
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Mark as Resolved...' }
  ];

  filteredTickets = computed(() => {
    const isMgr = this.userRole() === 'manager';
    const myId = this.currentUserId();
    const query = this.searchQuery().toLowerCase();
    const all = this.tickets();

    let list = all;

    if (!isMgr) {
      if (this.agentViewTab() === 'available') {
        list = all.filter(t => !t.assigned_to && t.status === 'open');
      } else if (this.agentViewTab() === 'active') {
        list = all.filter(t => t.assigned_to === myId && t.status !== 'resolved');
      } else {
        list = all.filter(t => t.assigned_to === myId && t.status === 'resolved');
      }
    } else {
      if (this.managerStatusTab() !== 'all') {
        list = list.filter(t => t.status === this.managerStatusTab());
      }
    }

    if (query) {
      list = list.filter(t => (t.title || '').toLowerCase().includes(query) || t.description.toLowerCase().includes(query));
    }

    return list;
  });

  handleAssignAgent(ticketId: string, agentValue: string) {
    const agentId = agentValue === 'unassigned' ? null : agentValue;
    this.assignTicket.emit({ ticketId, agentId });
  }

  handleSelectChange(ticket: SupportTicket, newStatus: string) {
    if (newStatus === 'resolved') {
      this.requestResolve.emit(ticket.id);
      return;
    }
    this.statusChange.emit({ ticketId: ticket.id, newStatus: newStatus as TicketStatus });
  }

  getStatusClass(status: TicketStatus): string {
    switch (status) {
      case 'open': return 'bg-sky-500/15 border-sky-500/30 text-sky-300';
      case 'in_progress': return 'bg-amber-500/15 border-amber-500/30 text-amber-300';
      case 'resolved': return 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300';
    }
  }

  getPriorityClass(priority: TicketPriority): string {
    switch (priority) {
      case 'urgent': return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'high': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'medium': return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  }
}
