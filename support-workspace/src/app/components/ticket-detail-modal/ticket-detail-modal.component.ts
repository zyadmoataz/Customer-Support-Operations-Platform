import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { SupportTicket, TicketStatus, TicketPriority, AgentOverview } from '../../core/models/ticket.model';
import { ConversationThreadComponent } from './conversation-thread/conversation-thread.component';
import { AttachmentPanelComponent } from './attachment-panel/attachment-panel.component';
import { CustomSelectComponent, SelectOption } from '../custom-select/custom-select.component';
import { STATUS_OPTIONS, getStatusBadgeClass, getPriorityBadgeClass } from '../ticket-queue/ticket-queue.constants';

@Component({
  selector: 'app-ticket-detail-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ConversationThreadComponent, AttachmentPanelComponent, CustomSelectComponent],
  templateUrl: './ticket-detail-modal.component.html'
})
export class TicketDetailModalComponent {
  ticket = input<SupportTicket | null>(null);
  isOpen = input<boolean>(false);
  userRole = input<string | null>(null);
  currentUserId = input<string | null>(null);
  agents = input<AgentOverview[]>([]);

  closeModal = output<void>();
  claimTicket = output<string>();
  statusChange = output<{ ticketId: string; newStatus: TicketStatus }>();
  requestResolve = output<string>();
  assignTicket = output<{ ticketId: string; agentId: string | null }>();

  activeTab = signal<'discussion' | 'attachments' | 'info'>('discussion');
  readonly statusOptions = STATUS_OPTIONS;

  getStatusClass(status: TicketStatus): string { return getStatusBadgeClass(status); }
  getPriorityClass(priority: TicketPriority): string { return getPriorityBadgeClass(priority); }


  handleStatusSelect(ticket: SupportTicket, newStatus: string) {
    if (newStatus === 'resolved') {
      this.requestResolve.emit(ticket.id);
      return;
    }
    this.statusChange.emit({ ticketId: ticket.id, newStatus: newStatus as TicketStatus });
  }

  handleAssign(ticketId: string, agentVal: string) {
    this.assignTicket.emit({ ticketId, agentId: agentVal === 'unassigned' ? null : agentVal });
  }

  getAgentOptions(): SelectOption[] {
    const list: SelectOption[] = [{ value: 'unassigned', label: 'Unassigned (Open Queue)' }];
    this.agents()
      .filter(ag => ag.is_active !== false)
      .forEach(ag => list.push({ value: ag.id, label: `${ag.full_name} (${ag.total_assigned} active)` }));
    return list;
  }
}
