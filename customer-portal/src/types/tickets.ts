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

export interface TicketMessage {
  id: string
  ticket_id: string
  author_id: string
  author_name?: string | null
  author_role?: string | null
  body: string
  is_internal: boolean
  created_at: string
}

export interface DbMessageJoinItem {
  id: string
  ticket_id: string
  author_id: string
  body: string
  is_internal: boolean
  created_at: string
  profiles?: {
    full_name: string
    role: string
  } | null
}

export interface TicketAttachment {
  id: string
  ticket_id: string
  uploaded_by: string
  uploader_name?: string | null
  file_path: string
  file_name: string
  file_size: number
  file_type: string
  created_at: string
}

export interface DbAttachmentJoinItem {
  id: string
  ticket_id: string
  uploaded_by: string
  file_path: string
  file_name: string
  file_size: number
  file_type: string
  created_at: string
  profiles?: {
    full_name: string
  } | null
}




