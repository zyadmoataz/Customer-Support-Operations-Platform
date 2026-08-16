export type TicketStatus = 'open' | 'in_progress' | 'resolved'
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface SupportTicket {
  id: string
  customer_id: string
  assigned_to?: string | null
  assigned_agent_name?: string | null
  title?: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  category?: string
  created_at: string
  updated_at: string
  resolution_note?: string | null
  manager_rating?: number | null
  manager_feedback?: string | null
}

export interface NewTicketInput {
  title: string
  description: string
  priority: TicketPriority
  category: string
}
