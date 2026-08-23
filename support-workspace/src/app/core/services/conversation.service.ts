import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { ToastService } from './toast.service';
import { TicketMessage, DbMessageJoinItem } from '../models/ticket.model';
import { RealtimeChannel } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class ConversationService {
  private supabase = inject(SupabaseService);
  private toast = inject(ToastService);

  messages = signal<TicketMessage[]>([]);
  loading = signal<boolean>(false);
  private currentChannel: RealtimeChannel | null = null;

  async fetchMessages(ticketId: string) {
    this.loading.set(true);
    try {
      const { data, error } = await this.supabase
        .from('ticket_messages')
        .select('id, ticket_id, author_id, body, is_internal, created_at, profiles:author_id ( full_name, role )')
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const rawItems = (data || []) as unknown as DbMessageJoinItem[];
      const formatted: TicketMessage[] = rawItems.map(item => ({
        id: item.id,
        ticket_id: item.ticket_id,
        author_id: item.author_id,
        author_name: item.profiles?.full_name || 'Staff Member',
        author_role: item.profiles?.role || 'agent',
        body: item.body,
        is_internal: item.is_internal,
        created_at: item.created_at
      }));

      this.messages.set(formatted);
      this.subscribeToMessages(ticketId);
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'Failed to fetch conversation');
    } finally {
      this.loading.set(false);
    }
  }

  async sendMessage(ticketId: string, body: string, isInternal: boolean): Promise<boolean> {
    const user = this.supabase.currentUser();
    if (!user) {
      this.toast.error('Session expired. Please log in again.');
      return false;
    }

    try {
      const { error } = await this.supabase
        .from('ticket_messages')
        .insert([{
          ticket_id: ticketId,
          author_id: user.id,
          body: body.trim(),
          is_internal: isInternal
        }]);

      if (error) throw error;
      this.toast.success(isInternal ? 'Internal note recorded privately.' : 'Reply sent to customer.');
      await this.fetchMessages(ticketId);
      return true;
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'Failed to send message');
      return false;
    }
  }

  private subscribeToMessages(ticketId: string) {
    if (this.currentChannel) {
      this.supabase.removeChannel(this.currentChannel);
    }

    this.currentChannel = this.supabase
      .channel(`staff_messages_${ticketId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'ticket_messages', filter: `ticket_id=eq.${ticketId}` },
        () => {
          this.fetchMessages(ticketId);
        }
      )
      .subscribe();
  }

  unsubscribe() {
    if (this.currentChannel) {
      this.supabase.removeChannel(this.currentChannel);
      this.currentChannel = null;
    }
    this.messages.set([]);
  }
}
