import { supabase } from '@/api/supabase'
import type { TicketAttachment, DbAttachmentJoinItem } from '@/types'

export const attachmentApi = {
  async getAttachments(ticketId: string): Promise<TicketAttachment[]> {
    const { data, error } = await supabase
      .from('ticket_attachments')
      .select('id, ticket_id, uploaded_by, file_path, file_name, file_size, file_type, created_at, profiles:uploaded_by ( full_name )')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: false })

    if (error) throw error

    const rawItems = (data || []) as unknown as DbAttachmentJoinItem[]
    return rawItems.map((item) => ({
      id: item.id,
      ticket_id: item.ticket_id,
      uploaded_by: item.uploaded_by,
      uploader_name: item.profiles?.full_name || 'User',
      file_path: item.file_path,
      file_name: item.file_name,
      file_size: item.file_size,
      file_type: item.file_type,
      created_at: item.created_at,
    }))
  },

  async uploadAttachment(ticketId: string, uploaderId: string, file: File): Promise<TicketAttachment> {
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File exceeds maximum allowable limit of 10MB.')
    }

    const fileExt = file.name.split('.').pop()
    const cleanFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    const filePath = `${ticketId}/${cleanFileName}`

    // 1. Upload to Supabase Storage
    const { error: storageError } = await supabase.storage
      .from('attachments')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (storageError) throw storageError

    // 2. Insert record in ticket_attachments table
    const { data, error: dbError } = await supabase
      .from('ticket_attachments')
      .insert([
        {
          ticket_id: ticketId,
          uploaded_by: uploaderId,
          file_path: filePath,
          file_name: file.name,
          file_size: file.size,
          file_type: file.type || fileExt || 'application/octet-stream',
        },
      ])
      .select('id, ticket_id, uploaded_by, file_path, file_name, file_size, file_type, created_at')
      .single()

    if (dbError) throw dbError
    return data as TicketAttachment
  },

  getPublicUrl(filePath: string): string {
    const { data } = supabase.storage.from('attachments').getPublicUrl(filePath)
    return data.publicUrl
  },
}
