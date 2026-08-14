import { ErrorHandler, Injectable, Injector, inject } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private injector = inject(Injector);

  handleError(error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'An unexpected application error occurred.';
    console.error('An unexpected error occurred:', error);
    try {
      const toast = this.injector.get(ToastService);
      toast.error(errorMsg, 5000);
    } catch (e) {
      console.error('Failed to show toast for error:', e);
    }
  }
}
