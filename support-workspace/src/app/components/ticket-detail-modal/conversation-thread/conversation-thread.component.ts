import { Component, input, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ConversationService } from '../../../core/services/conversation.service';
import { SupportTicket } from '../../../core/models/ticket.model';

@Component({
  selector: 'app-conversation-thread',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './conversation-thread.component.html'
})
export class ConversationThreadComponent {
  conversationService = inject(ConversationService);

  ticket = input.required<SupportTicket>();
  currentUserId = input<string | null>(null);

  replyText = signal<string>('');
  isInternalNote = signal<boolean>(false);
  sending = signal<boolean>(false);

  constructor() {
    effect(() => {
      const t = this.ticket();
      if (t?.id) {
        this.conversationService.fetchMessages(t.id);
      }
    }, { allowSignalWrites: true });
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.handleSend();
    }
  }

  async handleSend() {
    const text = this.replyText().trim();
    if (!text || this.sending()) return;

    this.sending.set(true);
    const ok = await this.conversationService.sendMessage(
      this.ticket().id,
      text,
      this.isInternalNote()
    );

    if (ok) {
      this.replyText.set('');
    }
    this.sending.set(false);
  }
}
