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
        return 'bg-slate-950/95 border-emerald-500/40 shadow-emerald-500/10 text-slate-100';
      case 'error':
        return 'bg-slate-950/95 border-rose-500/40 shadow-rose-500/10 text-slate-100';
      case 'info':
        return 'bg-slate-950/95 border-amber-500/40 shadow-amber-500/10 text-slate-100';
    }
  }
}
