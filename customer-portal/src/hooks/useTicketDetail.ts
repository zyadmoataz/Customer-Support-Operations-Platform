import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ticketApi, supabase } from '@/api'
import { notify } from '@/lib/toast'

export function useTicketDetailQuery(ticketId?: string) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['ticket_detail', ticketId],
    queryFn: async () => {
      if (!ticketId) throw new Error('Ticket ID is required')
      return await ticketApi.getTicketById(ticketId)
    },
    enabled: Boolean(ticketId),
  })

  // Realtime subscription for ticket status/resolution updates
  useEffect(() => {
    if (!ticketId) return

    const channel = supabase
      .channel(`ticket_realtime_${ticketId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'support_requests',
          filter: `id=eq.${ticketId}`,
        },
        (payload) => {
          if (payload.new) {
            queryClient.setQueryData(['ticket_detail', ticketId], payload.new)
            queryClient.invalidateQueries({ queryKey: ['support_requests'] })
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [ticketId, queryClient])

  return {
    ticket: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  }
}

export function useReopenTicketMutation(
  ticketId?: string,
  options?: { onSuccess?: () => void }
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      if (!ticketId) throw new Error('Ticket ID is required')
      return await ticketApi.reopenTicket(ticketId)
    },
    onSuccess: () => {
      notify.success('Ticket reopened for further assistance!')
      queryClient.invalidateQueries({ queryKey: ['ticket_detail', ticketId] })
      queryClient.invalidateQueries({ queryKey: ['support_requests'] })
      options?.onSuccess?.()
    },
    onError: (err: Error) => {
      notify.error(err.message || 'Failed to reopen ticket')
    },
  })

  return {
    reopenTicket: mutation.mutate,
    reopenTicketAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
