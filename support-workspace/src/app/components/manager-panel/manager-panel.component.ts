import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { SupportTicket } from '../../core/models/ticket.model';

@Component({
  selector: 'app-manager-panel',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './manager-panel.component.html'
})
export class ManagerPanelComponent {
  tickets = input<SupportTicket[]>([]);
  reassignAll = output<void>();

  unassignedCount = computed(() => this.tickets().filter(t => !t.assigned_to).length);
  urgentCount = computed(() => this.tickets().filter(t => t.priority === 'urgent' && t.status !== 'resolved').length);
}
