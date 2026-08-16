import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { SupabaseService } from '../../core/services/supabase.service';
import { ToastService } from '../../core/services/toast.service';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address').transform(v => v.trim()),
  password: z.string().min(6, 'Password must be at least 6 characters').transform(v => v.trim())
});

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
  formErrors = signal<Record<string, string>>({});

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  fillDemo(email: string, pass: string) {
    this.loginForm.patchValue({ email, password: pass });
    this.toast.success(`Loaded credentials for ${email.split('@')[0]}!`);
  }

  async onSubmit() {
    this.formErrors.set({});
    
    const raw = this.loginForm.getRawValue();
    const cleaned = { email: raw.email.trim(), password: raw.password.trim() };

    const result = loginSchema.safeParse(cleaned);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err: z.ZodIssue) => {
        if (err.path[0]) errors[err.path[0].toString()] = err.message;
      });
      this.formErrors.set(errors);
      return;
    }

    this.loading.set(true);
    
    try {
      const { error } = await this.supabase.auth.signInWithPassword({
        email: result.data.email,
        password: result.data.password
      });
      
      if (error) throw error;
      
      this.toast.success('Successfully logged in!');
      this.router.navigate(['/dashboard']);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid login credentials';
      this.toast.error(errorMessage);
    } finally {
      this.loading.set(false);
    }
  }
}
