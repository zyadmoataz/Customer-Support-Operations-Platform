import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { ToastService } from './toast.service';
import { SupportTicket, TicketStatus, AgentOverview, DbTicketJoinItem } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private supabase = inject(SupabaseService);
  private toast = inject(ToastService);

  tickets = signal<SupportTicket[]>([]);
  agents = signal<AgentOverview[]>([]);
  loading = signal<boolean>(false);

  async fetchTickets() {
    this.loading.set(true);
    try {
      const { data, error } = await this.supabase
        .from('support_requests')
        .select(`id, customer_id, title, description, category, priority, status, assigned_to, resolution_note, manager_feedback, manager_rating, created_at, updated_at, profiles:assigned_to ( full_name )`)
        .order('created_at', { ascending: false });

      const rawData = (data || []) as unknown as DbTicketJoinItem[];
      const formatted: SupportTicket[] = rawData.map((item: DbTicketJoinItem) => ({
        ...item,
        assigned_agent_name: item.profiles?.full_name || null
      }));
      this.tickets.set(formatted);
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'Failed to fetch tickets');
    } finally {
      this.loading.set(false);
    }
  }

  async fetchAgents() {
    try {
      const { data, error } = await this.supabase.rpc('get_agents_overview');
      if (error) throw error;
      this.agents.set((data as AgentOverview[]) || []);
    } catch (err: unknown) {
      console.error('Failed to fetch agents:', err);
    }
  }

  async updateStatus(ticketId: string, newStatus: TicketStatus) {
    try {
      const { error } = await this.supabase
        .from('support_requests')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', ticketId);

      if (error) throw error;
      this.toast.success(`Ticket status updated to ${newStatus.replace('_', ' ')}`);
      this.tickets.update(list => list.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'Failed to update ticket status');
    }
  }

  async resolveTicket(ticketId: string, note: string) {
    try {
      const { error } = await this.supabase
        .from('support_requests')
        .update({ status: 'resolved', resolution_note: note, updated_at: new Date().toISOString() })
        .eq('id', ticketId);

      if (error) throw error;
      this.toast.success('Ticket locked and marked as Resolved!');
      await this.fetchTickets();
      await this.fetchAgents();
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'Failed to resolve ticket');
    }
  }

  async saveFeedback(ticketId: string, feedback: string, rating: number) {
    try {
      const { error } = await this.supabase
        .from('support_requests')
        .update({ manager_feedback: feedback, manager_rating: rating, updated_at: new Date().toISOString() })
        .eq('id', ticketId);

      if (error) throw error;
      this.toast.success(`Manager Review & ${rating}-Star Rating recorded!`);
      await this.fetchTickets();
      await this.fetchAgents();
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'Failed to save feedback');
    }
  }

  async claimTicket(ticketId: string) {
    const currentUserId = this.supabase.currentUser()?.id;
    if (!currentUserId) return;
    try {
      const { error } = await this.supabase
        .from('support_requests')
        .update({ assigned_to: currentUserId, status: 'in_progress', updated_at: new Date().toISOString() })
        .eq('id', ticketId);

      if (error) throw error;
      this.toast.success('Ticket claimed and added to your active tasks!');
      await this.fetchTickets();
      await this.fetchAgents();
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'Failed to claim ticket');
    }
  }

  async assignTicketToAgent(ticketId: string, agentId: string | null) {
    try {
      const isUnassign = !agentId || agentId === 'unassigned';
      const newStatus = isUnassign ? 'open' : 'in_progress';
      const targetAgentId = isUnassign ? null : agentId;

      const { error } = await this.supabase
        .from('support_requests')
        .update({
          assigned_to: targetAgentId,
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', ticketId);

      if (error) throw error;

      if (isUnassign) {
        this.toast.success('Ticket unassigned and returned to Open Queue.');
      } else {
        const agent = this.agents().find(a => a.id === agentId);
        const agentName = agent?.full_name || 'Specialist';
        this.toast.success(`Assigned to ${agentName} (now in their Active Tasks)!`);
      }

      await this.fetchTickets();
      await this.fetchAgents();
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'Failed to assign ticket');
    }
  }

  async toggleAgentActive(agentId: string, active: boolean) {
    try {
      const { error } = await this.supabase.rpc('toggle_agent_status', { target_user_id: agentId, active_status: active });
      if (error) throw error;
      this.toast.success(`Agent ${active ? 'activated' : 'deactivated'} successfully!`);
      await this.fetchAgents();
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'Failed to update agent status');
    }
  }

  async deleteAgent(agentId: string) {
    try {
      const { error } = await this.supabase.rpc('delete_staff_agent', { target_user_id: agentId });
      if (error) throw error;
      this.toast.success('Agent account removed and tickets unassigned!');
      await this.fetchAgents();
      await this.fetchTickets();
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'Failed to delete agent');
    }
  }
}
