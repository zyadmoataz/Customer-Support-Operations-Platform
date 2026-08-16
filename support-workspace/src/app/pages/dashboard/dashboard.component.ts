import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { SupabaseService } from '../../core/services/supabase.service';
import { ToastService } from '../../core/services/toast.service';
import { TicketService } from '../../core/services/ticket.service';
import { SupportTicket, TicketStatus } from '../../core/models/ticket.model';
import { WorkspaceSidebarComponent } from '../../components/sidebar/sidebar.component';
import { StatsOverviewComponent } from '../../components/stats-overview/stats-overview.component';
import { TicketQueueComponent } from '../../components/ticket-queue/ticket-queue.component';
import { AnalyticsViewComponent } from '../../components/analytics-view/analytics-view.component';
import { ManagerPanelComponent } from '../../components/manager-panel/manager-panel.component';
import { SettingsViewComponent } from '../../components/settings-view/settings-view.component';
import { ResolutionModalComponent } from '../../components/resolution-modal/resolution-modal.component';
import { FeedbackModalComponent } from '../../components/feedback-modal/feedback-modal.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule, LucideAngularModule, WorkspaceSidebarComponent,
    StatsOverviewComponent, TicketQueueComponent, AnalyticsViewComponent,
    ManagerPanelComponent, SettingsViewComponent, ResolutionModalComponent, FeedbackModalComponent
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardPageComponent implements OnInit {
  private supabase = inject(SupabaseService);
  private router = inject(Router);
  private toast = inject(ToastService);
  private ticketService = inject(TicketService);

  profile = this.supabase.currentProfile;
  currentUser = this.supabase.currentUser;
  tickets = this.ticketService.tickets;
  agents = this.ticketService.agents;
  loading = this.ticketService.loading;

  activeNavTab = signal<string>('queue');
  isResolutionOpen = signal<boolean>(false);
  resolvingTicketId = signal<string | null>(null);
  isFeedbackOpen = signal<boolean>(false);
  feedbackTicketId = signal<string | null>(null);
  currentFeedbackText = signal<string | null>(null);
  currentRatingValue = signal<number | null>(null);

  isManager = computed(() => this.profile()?.role === 'manager');

  ngOnInit() {
    this.ticketService.fetchTickets();
    this.ticketService.fetchAgents();
  }

  handleStatusChange(event: { ticketId: string; newStatus: TicketStatus }) {
    this.ticketService.updateStatus(event.ticketId, event.newStatus);
  }

  openResolutionModal(ticketId: string) {
    this.resolvingTicketId.set(ticketId);
    this.isResolutionOpen.set(true);
  }

  handleConfirmResolve(event: { ticketId: string; note: string }) {
    this.ticketService.resolveTicket(event.ticketId, event.note);
    this.isResolutionOpen.set(false);
  }

  openManagerFeedback(ticket: SupportTicket) {
    this.feedbackTicketId.set(ticket.id);
    this.currentFeedbackText.set(ticket.manager_feedback || '');
    this.currentRatingValue.set(ticket.manager_rating || 5);
    this.isFeedbackOpen.set(true);
  }

  handleSaveFeedback(event: { ticketId: string; feedback: string; rating: number }) {
    this.ticketService.saveFeedback(event.ticketId, event.feedback, event.rating);
    this.isFeedbackOpen.set(false);
  }

  handleClaimTicket(ticketId: string) {
    this.ticketService.claimTicket(ticketId);
  }

  handleAssignTicket(event: { ticketId: string; agentId: string | null }) {
    this.ticketService.assignTicketToAgent(event.ticketId, event.agentId);
  }

  async handleCreateAgent(event: { name: string; email: string; pass: string }) {
    try {
      await this.supabase.createAgentAccount(event.email, event.pass, event.name);
      this.toast.success(`Support Agent created for ${event.name}!`);
      this.ticketService.fetchAgents();
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'Failed to create agent');
    }
  }

  async handleUpdateAgent(event: { agentId: string; name: string; email: string; pass?: string }) {
    try {
      await this.supabase.updateStaffAgent(event.agentId, event.email, event.name, event.pass);
      this.toast.success(`Agent details updated for ${event.name}!`);
      this.ticketService.fetchAgents();
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'Failed to update agent');
    }
  }

  handleToggleAgentStatus(event: { agentId: string; active: boolean }) {
    this.ticketService.toggleAgentActive(event.agentId, event.active);
  }

  handleDeleteAgent(agentId: string) {
    if (confirm('Are you sure you want to remove this agent account?')) {
      this.ticketService.deleteAgent(agentId);
    }
  }

  async handleUpdateProfile(event: { fullName: string; password?: string }) {
    try {
      if (event.fullName) await this.supabase.from('profiles').update({ full_name: event.fullName }).eq('id', this.supabase.currentUser()?.id);
      if (event.password) {
        if (event.password.length < 6) throw new Error('Password must be at least 6 characters');
        const { error } = await this.supabase.auth.updateUser({ password: event.password });
        if (error) throw error;
      }
      this.toast.success('Staff profile updated successfully!');
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'Failed to update profile');
    }
  }

  async handleSignOut() {
    try {
      await this.supabase.auth.signOut();
      this.toast.success('Signed out successfully');
      this.router.navigate(['/login']);
    } catch {
      this.toast.error('Failed to sign out');
    }
  }
}
