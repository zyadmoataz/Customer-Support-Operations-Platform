import { Component, input, output, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Profile } from '../../core/services/supabase.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-settings-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings-view.component.html'
})
export class SettingsViewComponent {
  private toast = inject(ToastService);

  profile = input<Profile | null>(null);
  save = output<{ fullName: string; password?: string }>();

  name = '';
  password = '';
  confirmPassword = '';

  constructor() {
    effect(() => {
      const p = this.profile();
      if (p) this.name = p.full_name;
    });
  }

  private validatePassword(pwd: string): string | null {
    if (pwd.length < 8) return 'Password must be at least 8 characters long';
    if (!/[A-Z]/.test(pwd)) return 'Password must contain at least one uppercase letter (A-Z)';
    if (!/[a-z]/.test(pwd)) return 'Password must contain at least one lowercase letter (a-z)';
    if (!/[0-9]/.test(pwd)) return 'Password must contain at least one number (0-9)';
    if (!/[^A-Za-z0-9]/.test(pwd)) return 'Password must contain at least one special character (!@#$%^&*)';
    return null;
  }

  handleSave() {
    const trimmedName = this.name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      this.toast.error('Full name must be at least 2 characters');
      return;
    }

    const trimmedPass = this.password.trim();
    if (trimmedPass) {
      const err = this.validatePassword(trimmedPass);
      if (err) {
        this.toast.error(err);
        return;
      }
      if (trimmedPass !== this.confirmPassword.trim()) {
        this.toast.error('Passwords do not match');
        return;
      }
    }

    this.save.emit({
      fullName: trimmedName,
      password: trimmedPass || undefined
    });
    this.password = '';
    this.confirmPassword = '';
  }
}
