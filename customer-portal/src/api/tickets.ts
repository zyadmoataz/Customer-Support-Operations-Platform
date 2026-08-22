import { supabase } from '@/api/supabase'
import type { SupportTicket, NewTicketInput } from '@/types'

const TICKET_COLUMNS = 'id, customer_id, title, description, category, priority, status, created_at, updated_at, resolution_note, assigned_to'

export interface PaginatedTicketsResult {
  tickets: SupportTicket[]
  totalCount: number
}

export interface TicketFilters {
  status?: string
  priority?: string
  category?: string
  dateRange?: 'all' | '7d' | '30d' | '90d'
  search?: string
}

export const ticketApi = {
  async getTicketsPaginated(
    customerId: string,
    page: number,
    pageSize: number,
    filters: TicketFilters = {}
  ): Promise<PaginatedTicketsResult> {
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = supabase
      .from('support_requests')
      .select(TICKET_COLUMNS, { count: 'exact' })
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false })

    if (filters.status && filters.status !== 'all') {
      if (filters.status === 'open') {
        query = query.in('status', ['open', 'in_progress'])
      } else {
        query = query.eq('status', filters.status)
      }
    }

    if (filters.priority && filters.priority !== 'all') {
      query = query.eq('priority', filters.priority)
    }

    if (filters.category && filters.category !== 'all') {
      query = query.eq('category', filters.category)
    }

    if (filters.dateRange && filters.dateRange !== 'all') {
      const now = new Date()
      const daysMap: Record<string, number> = { '7d': 7, '30d': 30, '90d': 90 }
      const days = daysMap[filters.dateRange]
      if (days) {
        const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString()
        query = query.gte('created_at', cutoff)
      }
    }

    if (filters.search) {
      const term = `%${filters.search}%`
      query = query.or(`title.ilike.${term},description.ilike.${term},category.ilike.${term}`)
    }

    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) throw error
    return {
      tickets: (data || []) as SupportTicket[],
      totalCount: count ?? 0,
    }
  },

  async createTicket(input: NewTicketInput, customerId: string): Promise<SupportTicket> {
    const { data, error } = await supabase
      .from('support_requests')
      .insert([
        {
          title: input.title.trim(),
          description: input.description.trim(),
          priority: input.priority,
          category: input.category,
          customer_id: customerId,
          status: 'open',
        },
      ])
      .select(TICKET_COLUMNS)
      .single()

    if (error) throw error
    return data as SupportTicket
  },
}
