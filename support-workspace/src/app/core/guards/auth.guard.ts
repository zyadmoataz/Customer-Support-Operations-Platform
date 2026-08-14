import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = (route) => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);
  const toast = inject(ToastService);

  const user = supabase.currentUser();
  const profile = supabase.currentProfile();

  if (!user) {
    return router.parseUrl('/login');
  }

  const allowedRoles = route.data['roles'] as string[] | undefined;
  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    if (profile.role === 'customer') {
      toast.error('Customers cannot access the Support Workspace.');
      supabase.auth.signOut();
      return router.parseUrl('/login');
    }
    toast.error('You do not have permission to access this area.');
    return false;
  }

  return true;
};
