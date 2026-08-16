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
  assigned_agent_name?: string | null;
  resolution_note?: string | null;
  manager_feedback?: string | null;
  manager_rating?: number | null;
  created_at: string;
  updated_at?: string;
}

export interface DbTicketJoinItem extends Omit<SupportTicket, 'assigned_agent_name'> {
  profiles?: {
    full_name: string;
  } | null;
}

export interface AgentOverview {
  id: string;
  email?: string;
  full_name: string;
  role: string;
  is_active: boolean;
  total_assigned: number;
  total_resolved: number;
  avg_rating: number;
  total_ratings: number;
}
