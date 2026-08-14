import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Profile } from '../../core/services/supabase.service';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './profile-modal.component.html'
})
export class ProfileModalComponent {
  isOpen = input<boolean>(false);
  profile = input<Profile | null>(null);
  close = output<void>();
  save = output<{ fullName: string; password?: string }>();

  fullName = '';
  newPassword = '';
  saving = signal(false);

  ngOnInit() {
    if (this.profile()?.full_name) {
      this.fullName = this.profile()!.full_name;
    }
  }

  handleSave() {
    this.save.emit({
      fullName: this.fullName.trim(),
      password: this.newPassword.trim() || undefined
    });
  }
}
