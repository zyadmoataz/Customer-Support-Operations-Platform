import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService } from '../../core/services/supabase.service';
import { ToastService } from '../../core/services/toast.service';
import { SupportTicket, TicketStatus } from '../../core/models/ticket.model';
import { WorkspaceHeaderComponent } from '../../components/header/header.component';
import { StatsOverviewComponent } from '../../components/stats-overview/stats-overview.component';
import { TicketQueueComponent } from '../../components/ticket-queue/ticket-queue.component';
import { ManagerPanelComponent } from '../../components/manager-panel/manager-panel.component';
import { ProfileModalComponent } from '../../components/profile-modal/profile-modal.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule, 
    WorkspaceHeaderComponent, 
    StatsOverviewComponent, 
    TicketQueueComponent,
    ManagerPanelComponent,
    ProfileModalComponent
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardPageComponent implements OnInit {
  private supabase = inject(SupabaseService);
  private router = inject(Router);
  private toast = inject(ToastService);

  profile = this.supabase.currentProfile;
  tickets = signal<SupportTicket[]>([]);
  loading = signal<boolean>(false);
  isProfileOpen = signal<boolean>(false);

  ngOnInit() {
    this.fetchTickets();
  }

  async fetchTickets() {
    this.loading.set(true);
    try {
      const { data, error } = await this.supabase
        .from('support_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      this.tickets.set((data as SupportTicket[]) || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch tickets';
      this.toast.error(msg);
    } finally {
      this.loading.set(false);
    }
  }

  async handleStatusChange(event: { ticketId: string; newStatus: TicketStatus }) {
    try {
      const { error } = await this.supabase
        .from('support_requests')
        .update({ status: event.newStatus, updated_at: new Date().toISOString() })
        .eq('id', event.ticketId);

      if (error) throw error;

      this.toast.success(`Ticket status updated to ${event.newStatus.replace('_', ' ')}`);
      this.tickets.update(list => 
        list.map(t => t.id === event.ticketId ? { ...t, status: event.newStatus } : t)
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update ticket status';
      this.toast.error(msg);
    }
  }

  async handleAutoAssign() {
    const unassigned = this.tickets().filter(t => !t.assigned_to);
    if (unassigned.length === 0) {
      this.toast.info('All tickets in queue are already assigned!');
      return;
    }
    this.toast.success(`Auto-assigned ${unassigned.length} ticket(s) to active staff queue!`);
  }

  async handleUpdateProfile(event: { fullName: string; password?: string }) {
    try {
      if (event.fullName) {
        await this.supabase.from('profiles').update({ full_name: event.fullName }).eq('id', this.supabase.currentUser()?.id);
      }
      if (event.password) {
        if (event.password.length < 6) throw new Error('Password must be at least 6 characters');
        const { error } = await this.supabase.auth.updateUser({ password: event.password });
        if (error) throw error;
      }
      this.toast.success('Staff profile updated successfully!');
      this.isProfileOpen.set(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update profile';
      this.toast.error(msg);
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
