import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ticketApi } from '@/api'
import type { TicketFilters } from '@/api/tickets'
import { notify } from '@/lib/toast'
import type { NewTicketInput } from '@/types'

const PAGE_SIZE = 10

export function useTicketsQuery(
  userId?: string,
  page: number = 1,
  filters: TicketFilters = {}
) {
  const query = useQuery({
    queryKey: ['support_requests', userId, page, filters],
    queryFn: async () => {
      if (!userId) throw new Error('User not authenticated')
      return await ticketApi.getTicketsPaginated(userId, page, PAGE_SIZE, filters)
    },
    enabled: Boolean(userId),
  })

  return {
    tickets: query.data?.tickets || [],
    totalCount: query.data?.totalCount || 0,
    totalPages: Math.ceil((query.data?.totalCount || 0) / PAGE_SIZE),
    currentPage: page,
    pageSize: PAGE_SIZE,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  }
}

export function useCreateTicketMutation(
  userId?: string,
  options?: { onSuccess?: () => void }
) {
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
