import { Component, input, output, signal, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-feedback-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './feedback-modal.component.html'
})
export class FeedbackModalComponent implements OnChanges {
  private toast = inject(ToastService);

  isOpen = input<boolean>(false);
  ticketId = input<string | null>(null);
  currentFeedback = input<string | null>(null);
  currentRating = input<number | null>(null);

  close = output<void>();
  saveFeedback = output<{ ticketId: string; feedback: string; rating: number }>();

  feedback = '';
  rating = signal<number>(5);

  ngOnChanges() {
    this.feedback = this.currentFeedback() || '';
    this.rating.set(this.currentRating() || 5);
  }

  handleConfirm() {
    const id = this.ticketId();
    const cleanFeedback = this.feedback.trim();

    if (!id) return;

    if (!cleanFeedback || cleanFeedback.length < 5) {
      this.toast.error('Please enter at least 5 characters of feedback for the agent');
      return;
    }

    const currentRate = this.rating();
    if (currentRate < 1 || currentRate > 5) {
      this.toast.error('Rating must be between 1 and 5 stars');
      return;
    }

    this.saveFeedback.emit({ 
      ticketId: id, 
      feedback: cleanFeedback,
      rating: currentRate
    });
  }
}
