import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ToastService, ToastItem } from '../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './toast-container.component.html'
})
export class ToastContainerComponent {
  public toastService = inject(ToastService);

  getStyles(type: ToastItem['type']): string {
    switch (type) {
      case 'success':
        return 'bg-brand-bg/95 border-state-success shadow-none text-text-primary';
      case 'error':
        return 'bg-brand-bg/95 border-state-danger shadow-none text-text-primary';
      case 'info':
        return 'bg-brand-bg/95 border-state-warning shadow-none text-text-primary';
    }
  }
}
