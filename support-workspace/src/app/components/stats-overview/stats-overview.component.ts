import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { SupportTicket } from '../../core/models/ticket.model';

@Component({
  selector: 'app-stats-overview',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './stats-overview.component.html'
})
export class StatsOverviewComponent {
  tickets = input<SupportTicket[]>([]);

  totalCount = computed(() => this.tickets().length);
  pendingCount = computed(() => this.tickets().filter(t => t.status === 'open' || t.status === 'in_progress').length);
  resolvedCount = computed(() => this.tickets().filter(t => t.status === 'resolved' || t.status === 'closed').length);
}
