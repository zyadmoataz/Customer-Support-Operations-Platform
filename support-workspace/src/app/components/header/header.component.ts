import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Headphones, LogOut, Settings } from 'lucide-angular';
import { Profile } from '../../core/services/supabase.service';

@Component({
  selector: 'app-workspace-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header.component.html'
})
export class WorkspaceHeaderComponent {
  profile = input<Profile | null>(null);
  signOut = output<void>();
  profileClick = output<void>();
}
