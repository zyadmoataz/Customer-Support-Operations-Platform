import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-password-complexity',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    @if (password().length > 0) {
      <div class="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-[11px] space-y-1.5 mt-2 animate-fade-in">
        <p class="text-slate-400 font-semibold uppercase tracking-wider text-[10px] mb-1">Password Requirements:</p>
        @for (rule of rules(); track rule.label) {
          <div class="flex items-center gap-2 transition-all">
            <lucide-icon 
              [name]="rule.passed ? 'check-circle-2' : 'circle'" 
              [class]="'w-3.5 h-3.5 ' + (rule.passed ? 'text-emerald-400' : 'text-slate-600')"
            ></lucide-icon>
            <span [class]="rule.passed ? 'text-emerald-300 font-medium' : 'text-slate-400'">{{ rule.label }}</span>
          </div>
        }
      </div>
    }
  `
})
export class PasswordComplexityComponent {
  password = input<string>('');

  rules = computed(() => {
    const pwd = this.password() || '';
    return [
      { label: 'Min 8 characters', passed: pwd.length >= 8 },
      { label: '1 uppercase letter (A-Z)', passed: /[A-Z]/.test(pwd) },
      { label: '1 number (0-9)', passed: /[0-9]/.test(pwd) },
      { label: '1 special symbol (!@#$)', passed: /[^A-Za-z0-9]/.test(pwd) }
    ];
  });

  isValid = computed(() => this.rules().every(r => r.passed));
}
