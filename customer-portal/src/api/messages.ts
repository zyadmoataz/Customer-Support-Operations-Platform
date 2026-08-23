import { supabase } from '@/api/supabase'
import type { TicketMessage, DbMessageJoinItem } from '@/types'

export const messageApi = {
  async getMessages(ticketId: string): Promise<TicketMessage[]> {
    const { data, error } = await supabase
      .from('ticket_messages')
      .select('id, ticket_id, author_id, body, is_internal, created_at, profiles:author_id ( full_name, role )')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true })

    if (error) throw error

    const rawItems = (data || []) as unknown as DbMessageJoinItem[]
    return rawItems.map((item) => ({
      id: item.id,
      ticket_id: item.ticket_id,
      author_id: item.author_id,
      author_name: item.profiles?.full_name || 'User',
      author_role: item.profiles?.role || 'customer',
      body: item.body,
      is_internal: item.is_internal,
      created_at: item.created_at,
    }))
  },

  async sendMessage(ticketId: string, authorId: string, body: string): Promise<TicketMessage> {
    const { data, error } = await supabase
      .from('ticket_messages')
      .insert([
        {
          ticket_id: ticketId,
          author_id: authorId,
          body: body.trim(),
          is_internal: false,
        },
      ])
      .select('id, ticket_id, author_id, body, is_internal, created_at')
      .single()

    if (error) throw error
    return data as TicketMessage
  },
}
