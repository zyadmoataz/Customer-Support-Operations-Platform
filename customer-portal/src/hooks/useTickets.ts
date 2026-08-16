import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ticketApi } from '@/api'
import { notify } from '@/lib/toast'
import type { SupportTicket, NewTicketInput } from '@/types'

// 1. Custom Hook for Fetching Customer Support Tickets
export function useTicketsQuery(userId?: string) {
  const query = useQuery<SupportTicket[]>({
    queryKey: ['support_requests', userId],
    queryFn: async () => {
      try {
        return await ticketApi.getTickets()
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to load tickets'
        notify.error(msg)
        throw err
      }
    },
    enabled: Boolean(userId),
  })

  return {
    tickets: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  }
}

// 2. Custom Hook for Creating a New Support Ticket
export function useCreateTicketMutation(userId?: string, options?: { onSuccess?: () => void }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (input: NewTicketInput) => {
      if (!userId) throw new Error('User not authenticated')
      return await ticketApi.createTicket(input, userId)
    },
    onSuccess: () => {
      notify.success('Support ticket submitted to the engineering queue!')
      queryClient.invalidateQueries({ queryKey: ['support_requests', userId] })
      options?.onSuccess?.()
    },
    onError: (err: Error) => {
      notify.error(err.message || 'Failed to create ticket')
    },
  })

  return {
    createTicket: mutation.mutate,
    createTicketAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
