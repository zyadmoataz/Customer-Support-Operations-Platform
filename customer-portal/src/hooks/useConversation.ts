import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { messageApi, supabase } from '@/api'
import { notify } from '@/lib/toast'
import type { TicketMessage } from '@/types'

export function useConversationQuery(ticketId?: string) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['ticket_messages', ticketId],
    queryFn: async () => {
      if (!ticketId) return []
      return await messageApi.getMessages(ticketId)
    },
    enabled: Boolean(ticketId),
  })

  // Realtime subscription for conversation updates
  useEffect(() => {
    if (!ticketId) return

    const channel = supabase
      .channel(`messages_realtime_${ticketId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'ticket_messages',
          filter: `ticket_id=eq.${ticketId}`,
        },
        (payload) => {
          if (payload.new && !payload.new.is_internal) {
            queryClient.invalidateQueries({ queryKey: ['ticket_messages', ticketId] })
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [ticketId, queryClient])

  return {
    messages: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  }
}

export function useSendMessageMutation(
  ticketId?: string,
  userId?: string,
  options?: { onSuccess?: () => void }
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (body: string) => {
      if (!ticketId || !userId) throw new Error('Missing ticket or user session')
      return await messageApi.sendMessage(ticketId, userId, body)
    },
    onSuccess: (newMessage) => {
      notify.success('Message delivered to support agent!')
      queryClient.setQueryData<TicketMessage[]>(['ticket_messages', ticketId], (old = []) => {
        if (old.some((m) => m.id === newMessage.id)) return old
        return [...old, newMessage]
      })
      queryClient.invalidateQueries({ queryKey: ['ticket_messages', ticketId] })
      options?.onSuccess?.()
    },
    onError: (err: Error) => {
      notify.error(err.message || 'Failed to send message')
    },
  })

  return {
    sendMessage: mutation.mutate,
    sendMessageAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
