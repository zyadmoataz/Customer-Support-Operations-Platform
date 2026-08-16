import { Component, input, output, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-resolution-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './resolution-modal.component.html'
})
export class ResolutionModalComponent {
  private toast = inject(ToastService);

  isOpen = input<boolean>(false);
  ticketId = input<string | null>(null);
  close = output<void>();
  resolve = output<{ ticketId: string; note: string }>();

  note = '';
  submitting = signal(false);

  handleConfirm() {
    const id = this.ticketId();
    const cleanNote = this.note.trim();

    if (!id) return;

    if (!cleanNote || cleanNote.length < 10) {
      this.toast.error('Please provide a detailed resolution report (minimum 10 characters)');
      return;
    }

    this.resolve.emit({ ticketId: id, note: cleanNote });
    this.note = '';
  }
}
