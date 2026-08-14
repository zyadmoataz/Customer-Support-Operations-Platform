import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { SupportTicket, TicketStatus, TicketPriority } from '../../core/models/ticket.model';

@Component({
  selector: 'app-ticket-queue',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './ticket-queue.component.html'
})
export class TicketQueueComponent {
  tickets = input<SupportTicket[]>([]);
  loading = input<boolean>(false);
  statusChange = output<{ ticketId: string; newStatus: TicketStatus }>();

  activeTab = signal<string>('all');
  searchQuery = signal<string>('');

  filteredTickets = computed(() => {
    const tab = this.activeTab();
    const query = this.searchQuery().toLowerCase();

    return this.tickets().filter(t => {
      const matchesTab = tab === 'all' ? true : t.status === tab;
      const matchesQuery = (t.title || '').toLowerCase().includes(query) || t.description.toLowerCase().includes(query);
      return matchesTab && matchesQuery;
    });
  });

  getStatusClass(status: TicketStatus): string {
    switch (status) {
      case 'open': return 'bg-sky-500/10 border-sky-500/20 text-sky-400';
      case 'in_progress': return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
      case 'resolved': return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
      default: return 'bg-slate-500/10 border-slate-500/20 text-slate-400';
    }
  }

  getPriorityClass(priority: TicketPriority): string {
    switch (priority) {
      case 'urgent': return 'bg-rose-950/60 text-rose-300';
      case 'high': return 'bg-amber-950/60 text-amber-300';
      case 'medium': return 'bg-sky-950/60 text-sky-300';
      default: return 'bg-slate-800 text-slate-400';
    }
  }
}
