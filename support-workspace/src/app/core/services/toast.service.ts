import { Injectable, signal } from '@angular/core';

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _toasts = signal<ToastItem[]>([]);
  public toasts = this._toasts.asReadonly();

  success(message: string, duration = 3000) {
    this.add(message, 'success', duration);
  }

  error(message: string, duration = 4000) {
    this.add(message, 'error', duration);
  }

  info(message: string, duration = 3000) {
    this.add(message, 'info', duration);
  }

  private add(message: string, type: 'success' | 'error' | 'info', duration: number) {
    const id = Math.random().toString(36).substring(2, 9);
    const item: ToastItem = { id, message, type };

    this._toasts.update(list => [...list, item]);

    setTimeout(() => {
      this.dismiss(id);
    }, duration);
  }

  dismiss(id: string) {
    this._toasts.update(list => list.filter(t => t.id !== id));
  }
}
