import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { SupabaseService } from '../../core/services/supabase.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './login.component.html'
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private supabase = inject(SupabaseService);
  private router = inject(Router);
  private toast = inject(ToastService);

  loading = signal(false);
  showPassword = signal(false);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  get emailControl() {
    return this.loginForm.controls.email;
  }

  get passwordControl() {
    return this.loginForm.controls.password;
  }

  fillDemo(email: string, pass: string) {
    this.loginForm.patchValue({ email, password: pass });
    this.toast.success(`Loaded credentials for ${email.split('@')[0]}!`);
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { email, password } = this.loginForm.getRawValue();

    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim()
      });

      if (error) throw error;

      if (data?.user) {
        const { data: profile } = await this.supabase
          .from('profiles')
          .select('is_active, role')
          .eq('id', data.user.id)
          .single();

        if (profile && profile.is_active === false) {
          await this.supabase.auth.signOut();
          throw new Error('Your staff account has been deactivated. Please contact your manager.');
        }
      }

      this.toast.success('Successfully logged into Workspace!');
      this.router.navigate(['/dashboard']);
    } catch (err: unknown) {
      const errorObj = err as { message?: string; error_description?: string } | null;
      const errorMessage = errorObj?.message || errorObj?.error_description || (err instanceof Error ? err.message : 'Invalid login credentials');
      this.toast.error(errorMessage);
    } finally {
      this.loading.set(false);
    }
  }
}
