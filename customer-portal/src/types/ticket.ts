export type TicketStatus = 'open' | 'in_progress' | 'resolved';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface SupportTicket {
  id: string;
  customer_id: string;
  title: string;
  description: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  assigned_to?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface NewTicketInput {
  title: string;
  description: string;
  category: string;
  priority: TicketPriority;
}
