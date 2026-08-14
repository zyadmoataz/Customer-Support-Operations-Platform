export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  category?: string;
  status: TicketStatus;
  priority: TicketPriority;
  customer_id: string;
  assigned_to?: string | null;
  created_at: string;
  updated_at?: string;
}
