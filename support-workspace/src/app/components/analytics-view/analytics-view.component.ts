import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { SupportTicket, AgentOverview } from '../../core/models/ticket.model';

@Component({
  selector: 'app-analytics-view',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './analytics-view.component.html'
})
export class AnalyticsViewComponent {
  tickets = input<SupportTicket[]>([]);
  agents = input<AgentOverview[]>([]);
  userRole = input<string | null>(null);
  currentUserId = input<string | null>(null);

  isManager = computed(() => this.userRole() === 'manager');
  myId = computed(() => this.currentUserId());

  totalTicketsCount = computed(() => this.tickets().length);
  resolvedTicketsCount = computed(() => this.tickets().filter(t => t.status === 'resolved').length);
  inProgressCount = computed(() => this.tickets().filter(t => t.status === 'in_progress').length);
  openQueueCount = computed(() => this.tickets().filter(t => t.status === 'open' && !t.assigned_to).length);
  urgentCount = computed(() => this.tickets().filter(t => t.priority === 'urgent' && t.status !== 'resolved').length);
  activeStaffCount = computed(() => this.agents().filter(a => a.is_active).length);

  orgReviewedCount = computed(() => this.tickets().filter(t => typeof t.manager_rating === 'number' && (t.manager_rating as number) > 0).length);
  orgAvgRating = computed(() => {
    const list = this.tickets().filter(t => typeof t.manager_rating === 'number' && (t.manager_rating as number) > 0);
    return list.length === 0 ? '5.0 / 5.0' : `${(list.reduce((acc, t) => acc + (t.manager_rating || 0), 0) / list.length).toFixed(1)} / 5.0`;
  });
  orgResolutionRate = computed(() => {
    const total = this.tickets().length;
    return total === 0 ? '100%' : `${Math.round((this.resolvedTicketsCount() / total) * 100)}%`;
  });
  avgLoadPerAgent = computed(() => {
    const staff = this.activeStaffCount();
    if (staff === 0) return '0.0';
    return (this.inProgressCount() / staff).toFixed(1);
  });

  myClaimedTickets = computed(() => this.tickets().filter(t => t.assigned_to === this.myId()));
  myActiveCount = computed(() => this.tickets().filter(t => t.assigned_to === this.myId() && t.status === 'in_progress').length);
  myResolvedCount = computed(() => this.tickets().filter(t => t.assigned_to === this.myId() && t.status === 'resolved').length);
  myReviewedTickets = computed(() => this.tickets().filter(t => t.assigned_to === this.myId() && typeof t.manager_rating === 'number' && (t.manager_rating as number) > 0));
  myReviewedCount = computed(() => this.myReviewedTickets().length);
  myAvgRating = computed(() => {
    const list = this.myReviewedTickets();
    return list.length === 0 ? 'Unrated' : `${(list.reduce((acc, t) => acc + (t.manager_rating || 0), 0) / list.length).toFixed(1)} / 5.0`;
  });
  myResolutionRate = computed(() => {
    const total = this.myClaimedTickets().length;
    return total === 0 ? '100%' : `${Math.round((this.myResolvedCount() / total) * 100)}%`;
  });

  categoryBreakdown = computed(() => {
    const categories = ['Technical Issue', 'Billing & Plans', 'Account Access', 'Feature Request'];
    const total = this.tickets().length || 1;
    return categories.map(cat => {
      const count = this.tickets().filter(t => t.category === cat).length;
      return {
        category: cat,
        count,
        percent: Math.round((count / total) * 100)
      };
    });
  });

  priorityBreakdown = computed(() => {
    const priorities = [
      { key: 'urgent', label: 'Urgent SLA (15m)', color: 'text-state-danger bg-state-danger/10 border-state-danger' },
      { key: 'high', label: 'High Priority (2h)', color: 'text-state-warning bg-state-warning-bg border-state-warning' },
      { key: 'medium', label: 'Medium Priority (4h)', color: 'text-state-info bg-state-info-bg border-state-info' },
      { key: 'low', label: 'Low Priority (24h)', color: 'text-text-tertiary bg-brand-elevated border-brand-border' },
    ];
    const total = this.tickets().length || 1;
    return priorities.map(p => {
      const count = this.tickets().filter(t => t.priority === p.key).length;
      return {
        ...p,
        count,
        percent: Math.round((count / total) * 100)
      };
    });
  });
}
