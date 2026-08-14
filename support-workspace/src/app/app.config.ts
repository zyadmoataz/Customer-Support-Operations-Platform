import { ApplicationConfig, ErrorHandler, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { GlobalErrorHandler } from './core/errors/global-error-handler';
import { 
  LucideAngularModule, 
  Headphones, 
  Shield, 
  Search, 
  Eye, 
  EyeOff, 
  LogOut, 
  Inbox, 
  Clock, 
  CheckCircle2, 
  Zap, 
  X, 
  Check, 
  AlertCircle, 
  Info 
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimations(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    importProvidersFrom(
      LucideAngularModule.pick({ 
        Headphones, 
        Shield, 
        Search, 
        Eye, 
        EyeOff, 
        LogOut, 
        Inbox, 
        Clock, 
        CheckCircle2, 
        Zap, 
        X, 
        Check, 
        AlertCircle, 
        Info 
      })
    )
  ]
};
