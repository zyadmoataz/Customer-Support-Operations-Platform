import { Component, input, inject, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { AttachmentService } from '../../../core/services/attachment.service';
import { SupportTicket } from '../../../core/models/ticket.model';

@Component({
  selector: 'app-attachment-panel',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './attachment-panel.component.html'
})
export class AttachmentPanelComponent {
  attachmentService = inject(AttachmentService);

  ticket = input.required<SupportTicket>();

  customerAttachments = computed(() => {
    const cid = this.ticket()?.customer_id;
    return this.attachmentService.attachments().filter(a => a.uploaded_by === cid);
  });

  staffAttachments = computed(() => {
    const cid = this.ticket()?.customer_id;
    return this.attachmentService.attachments().filter(a => a.uploaded_by !== cid);
  });

  constructor() {
    effect(() => {
      const t = this.ticket();
      if (t?.id) {
        this.attachmentService.fetchAttachments(t.id);
      }
    }, { allowSignalWrites: true });
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.attachmentService.uploadAttachment(this.ticket().id, input.files[0]);
    }
  }

  getDownloadUrl(filePath: string): string {
    return this.attachmentService.getDownloadUrl(filePath);
  }
}
