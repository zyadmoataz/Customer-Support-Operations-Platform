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
  userRole = input<string | null>(null);
  currentUserId = input<string | null>(null);

  isManager = computed(() => this.userRole() === 'manager');

  stat1Label = computed(() => this.isManager() ? 'Total Inflow' : 'Available Queue');
  stat1Subtext = computed(() => this.isManager() ? 'Organization tickets' : 'Unassigned requests');
  stat1Value = computed(() => {
    if (this.isManager()) return this.tickets().length;
    return this.tickets().filter(t => !t.assigned_to && t.status === 'open').length;
  });

  stat2Label = computed(() => this.isManager() ? 'Active In-Progress' : 'My Active Tasks');
  stat2Subtext = computed(() => this.isManager() ? 'Currently being handled' : 'Claimed by you');
  stat2Value = computed(() => {
    if (this.isManager()) return this.tickets().filter(t => t.status === 'in_progress').length;
    const myId = this.currentUserId();
    return this.tickets().filter(t => t.assigned_to === myId && t.status === 'in_progress').length;
  });

  stat3Label = computed(() => this.isManager() ? 'Resolved Total' : 'My Resolved Tasks');
  stat3Subtext = computed(() => this.isManager() ? 'Locked with resolution report' : 'Completed by you');
  stat3Value = computed(() => {
    if (this.isManager()) return this.tickets().filter(t => t.status === 'resolved').length;
    const myId = this.currentUserId();
    return this.tickets().filter(t => t.assigned_to === myId && t.status === 'resolved').length;
  });

  stat4Label = computed(() => this.isManager() ? 'Org CSAT Score' : 'My QA Rating');
  stat4Subtext = computed(() => this.isManager() ? 'Manager audited quality' : 'Supervisor verified');
  stat4Value = computed(() => {
    const isMgr = this.isManager();
    const myId = this.currentUserId();
    const relevantTickets = isMgr 
      ? this.tickets() 
      : this.tickets().filter(t => t.assigned_to === myId);

    const rated = relevantTickets.filter(t => typeof t.manager_rating === 'number' && (t.manager_rating as number) > 0);
    if (rated.length === 0) return isMgr ? '5.0 / 5' : 'Unrated';
    const sum = rated.reduce((acc, t) => acc + (t.manager_rating || 0), 0);
    return `${(sum / rated.length).toFixed(1)} / 5`;
  });
}
