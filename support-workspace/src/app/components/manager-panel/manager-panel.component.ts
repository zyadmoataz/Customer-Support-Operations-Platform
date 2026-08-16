import { Component, input, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { AgentOverview } from '../../core/models/ticket.model';
import { ToastService } from '../../core/services/toast.service';

import { PasswordComplexityComponent } from '../password-complexity/password-complexity.component';

@Component({
  selector: 'app-manager-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, PasswordComplexityComponent],
  templateUrl: './manager-panel.component.html'
})
export class ManagerPanelComponent {
  private toast = inject(ToastService);

  agents = input<AgentOverview[]>([]);
  createAgent = output<{ name: string; email: string; pass: string }>();
  updateAgent = output<{ agentId: string; name: string; email: string; pass?: string }>();
  toggleStatus = output<{ agentId: string; active: boolean }>();
  deleteAgent = output<string>();

  agentName = '';
  agentEmail = '';
  agentPassword = '';

  editingAgent: AgentOverview | null = null;
  editName = '';
  editEmail = '';
  editPassword = '';

  private validatePassword(pwd: string): string | null {
    if (pwd.length < 8) return 'Password must be at least 8 characters long';
    if (!/[A-Z]/.test(pwd)) return 'Password must contain at least one uppercase letter (A-Z)';
    if (!/[a-z]/.test(pwd)) return 'Password must contain at least one lowercase letter (a-z)';
    if (!/[0-9]/.test(pwd)) return 'Password must contain at least one number (0-9)';
    if (!/[^A-Za-z0-9]/.test(pwd)) return 'Password must contain at least one special character (!@#$%^&*)';
    return null;
  }

  handleCreateAgent() {
    const name = this.agentName.trim();
    const email = this.agentEmail.trim().toLowerCase();
    const pass = this.agentPassword.trim();

    if (!name || name.length < 2) {
      this.toast.error('Agent full name must be at least 2 characters');
      return;
    }
    if (!email || !email.includes('@')) {
      this.toast.error('Please enter a valid staff email');
      return;
    }
    
    const pwdErr = this.validatePassword(pass);
    if (pwdErr) {
      this.toast.error(pwdErr);
      return;
    }

    this.createAgent.emit({ name, email, pass });
    this.agentName = '';
    this.agentEmail = '';
    this.agentPassword = '';
  }

  openEdit(ag: AgentOverview) {
    this.editingAgent = ag;
    this.editName = ag.full_name;
    this.editEmail = ag.email || '';
    this.editPassword = '';
  }

  handleSaveEdit() {
    if (!this.editingAgent) return;
    const name = this.editName.trim();
    const email = this.editEmail.trim().toLowerCase();
    const pass = this.editPassword.trim();

    if (!name || name.length < 2) {
      this.toast.error('Agent full name must be at least 2 characters');
      return;
    }
    if (!email || !email.includes('@')) {
      this.toast.error('Please enter a valid staff email');
      return;
    }

    if (pass) {
      const pwdErr = this.validatePassword(pass);
      if (pwdErr) {
        this.toast.error(pwdErr);
        return;
      }
    }

    this.updateAgent.emit({
      agentId: this.editingAgent.id,
      name,
      email,
      pass: pass || undefined
    });
    this.editingAgent = null;
  }
}
