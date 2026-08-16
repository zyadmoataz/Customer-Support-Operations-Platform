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

  // Overall counts
  totalTicketsCount = computed(() => this.tickets().length);
  resolvedTicketsCount = computed(() => this.tickets().filter(t => t.status === 'resolved').length);
  inProgressCount = computed(() => this.tickets().filter(t => t.status === 'in_progress').length);
  openQueueCount = computed(() => this.tickets().filter(t => t.status === 'open' && !t.assigned_to).length);
  urgentCount = computed(() => this.tickets().filter(t => t.priority === 'urgent' && t.status !== 'resolved').length);
  activeStaffCount = computed(() => this.agents().filter(a => a.is_active).length);

  // Manager Quality & CSAT metrics
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

  // Agent Personal metrics
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

  // Category breakdown for analytics
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

  // Priority breakdown for analytics
  priorityBreakdown = computed(() => {
    const priorities = [
      { key: 'urgent', label: 'Urgent SLA (15m)', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
      { key: 'high', label: 'High Priority (2h)', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
      { key: 'medium', label: 'Medium Priority (4h)', color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' },
      { key: 'low', label: 'Low Priority (24h)', color: 'text-slate-400 bg-slate-500/10 border-slate-500/20' },
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
