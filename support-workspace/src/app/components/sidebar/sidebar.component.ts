import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Profile } from '../../core/services/supabase.service';

@Component({
  selector: 'app-workspace-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './sidebar.component.html'
})
export class WorkspaceSidebarComponent {
  profile = input<Profile | null>(null);
  activeTab = input<string>('queue');
  tabChange = output<string>();
  signOut = output<void>();

  isMobileOpen = signal<boolean>(false);

  selectTab(tab: string) {
    this.tabChange.emit(tab);
    this.isMobileOpen.set(false);
  }
}
