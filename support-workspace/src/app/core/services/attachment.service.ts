import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { ToastService } from './toast.service';
import { TicketAttachment, DbAttachmentJoinItem } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class AttachmentService {
  private supabase = inject(SupabaseService);
  private toast = inject(ToastService);

  attachments = signal<TicketAttachment[]>([]);
  loading = signal<boolean>(false);
  uploading = signal<boolean>(false);

  async fetchAttachments(ticketId: string) {
    this.loading.set(true);
    try {
      const { data, error } = await this.supabase
        .from('ticket_attachments')
        .select('id, ticket_id, uploaded_by, file_path, file_name, file_size, file_type, created_at, profiles:uploaded_by ( full_name )')
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const rawItems = (data || []) as unknown as DbAttachmentJoinItem[];
      const formatted: TicketAttachment[] = rawItems.map(item => ({
        id: item.id,
        ticket_id: item.ticket_id,
        uploaded_by: item.uploaded_by,
        uploader_name: item.profiles?.full_name || 'Staff Member',
        file_path: item.file_path,
        file_name: item.file_name,
        file_size: item.file_size,
        file_type: item.file_type,
        created_at: item.created_at
      }));

      this.attachments.set(formatted);
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'Failed to load attachments');
    } finally {
      this.loading.set(false);
    }
  }

  async uploadAttachment(ticketId: string, file: File): Promise<boolean> {
    if (file.size > 10 * 1024 * 1024) {
      this.toast.error('File exceeds maximum limit of 10MB.');
      return false;
    }

    const user = this.supabase.currentUser();
    if (!user) return false;

    this.uploading.set(true);
    try {
      const cleanFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const filePath = `${ticketId}/${cleanFileName}`;

      const { error: storageError } = await this.supabase.storage
        .from('attachments')
        .upload(filePath, file);

      if (storageError) throw storageError;

      const { error: dbError } = await this.supabase
        .from('ticket_attachments')
        .insert([{
          ticket_id: ticketId,
          uploaded_by: user.id,
          file_path: filePath,
          file_name: file.name,
          file_size: file.size,
          file_type: file.type || 'application/octet-stream'
        }]);

      if (dbError) throw dbError;

      this.toast.success('Attachment uploaded successfully!');
      await this.fetchAttachments(ticketId);
      return true;
    } catch (err: unknown) {
      this.toast.error(err instanceof Error ? err.message : 'Failed to upload attachment');
      return false;
    } finally {
      this.uploading.set(false);
    }
  }

  getDownloadUrl(filePath: string): string {
    const { data } = this.supabase.storage.from('attachments').getPublicUrl(filePath);
    return data.publicUrl;
  }
}
