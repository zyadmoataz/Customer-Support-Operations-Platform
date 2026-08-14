import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/login.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { 
    path: 'dashboard', 
    component: DashboardPageComponent,
    canActivate: [authGuard],
    data: { roles: ['agent', 'manager'] }
  },
  { path: '**', redirectTo: 'login' }
];
