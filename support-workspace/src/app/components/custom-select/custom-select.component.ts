import { Component, input, output, signal, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="relative w-full">
      @if (label()) {
        <label class="block text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-1.5">
          {{ label() }}
        </label>
      }

      <button
        type="button"
        (click)="toggleOpen()"
        [disabled]="disabled()"
        [class]="'w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-brand-surface border text-xs text-text-primary transition-all text-left ' +
          (isOpen() ? 'border-state-success ring-2 ring-state-success ' : 'border-brand-subtle/80 hover:border-brand-hover ') +
          (disabled() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer')"
      >
        <span class="font-medium truncate text-text-secondary">{{ selectedLabel() }}</span>
        <lucide-icon
          [name]="'chevron-down'"
          [class]="'w-3.5 h-3.5 text-text-tertiary transition-transform duration-200 ' + (isOpen() ? 'rotate-180 text-state-success' : '')"
        ></lucide-icon>
      </button>

      @if (isOpen()) {
        <div class="absolute z-50 mt-1.5 w-full min-w-[200px] max-h-60 overflow-y-auto rounded-2xl bg-brand-surface border border-brand-subtle/80 shadow-2xl p-1.5 space-y-1 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100">
          @for (opt of options(); track opt.value) {
            <button
              type="button"
              (click)="selectOption(opt.value)"
              [class]="'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ' +
                (opt.value === value() 
                  ? 'bg-state-success/20 text-state-success font-semibold border border-state-success' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-brand-elevated')"
            >
              <span class="truncate">{{ opt.label }}</span>
              @if (opt.value === value()) {
                <lucide-icon [name]="'check'" class="w-3.5 h-3.5 text-state-success flex-shrink-0 ml-2"></lucide-icon>
              }
            </button>
          }
        </div>
      }
    </div>
  `
})
export class CustomSelectComponent {
  private elementRef = inject(ElementRef);

  options = input<SelectOption[]>([]);
  value = input<string>('');
  label = input<string>('');
  disabled = input<boolean>(false);
  valueChange = output<string>();

  isOpen = signal<boolean>(false);

  selectedLabel(): string {
    const found = this.options().find(o => o.value === this.value());
    return found ? found.label : (this.options()[0]?.label || 'Select...');
  }

  toggleOpen() {
    if (!this.disabled()) {
      this.isOpen.update(v => !v);
    }
  }

  selectOption(val: string) {
    this.valueChange.emit(val);
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
