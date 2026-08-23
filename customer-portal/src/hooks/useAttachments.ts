import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { attachmentApi } from '@/api'
import { notify } from '@/lib/toast'

export function useAttachmentsQuery(ticketId?: string) {
  const query = useQuery({
    queryKey: ['ticket_attachments', ticketId],
    queryFn: async () => {
      if (!ticketId) return []
      return await attachmentApi.getAttachments(ticketId)
    },
    enabled: Boolean(ticketId),
  })

  return {
    attachments: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    getDownloadUrl: attachmentApi.getPublicUrl,
  }
}

export function useUploadAttachmentMutation(
  ticketId?: string,
  userId?: string,
  options?: { onSuccess?: () => void }
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      if (!ticketId || !userId) throw new Error('Missing ticket or user session')
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size exceeds the 10MB limit')
      }
      return await attachmentApi.uploadAttachment(ticketId, userId, file)
    },
    onSuccess: () => {
      notify.success('Attachment uploaded successfully!')
      queryClient.invalidateQueries({ queryKey: ['ticket_attachments', ticketId] })
      options?.onSuccess?.()
    },
    onError: (err: Error) => {
      notify.error(err.message || 'Failed to upload attachment')
    },
  })

  return {
    uploadAttachment: mutation.mutate,
    uploadAttachmentAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}
