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
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
          {{ label() }}
        </label>
      }

      <button
        type="button"
        (click)="toggleOpen()"
        [disabled]="disabled()"
        [class]="'w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-900 border text-xs text-white transition-all text-left ' +
          (isOpen() ? 'border-emerald-500 ring-2 ring-emerald-500/20 ' : 'border-slate-700/80 hover:border-slate-600 ') +
          (disabled() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer')"
      >
        <span class="font-medium truncate text-slate-200">{{ selectedLabel() }}</span>
        <lucide-icon
          [name]="'chevron-down'"
          [class]="'w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ' + (isOpen() ? 'rotate-180 text-emerald-400' : '')"
        ></lucide-icon>
      </button>

      @if (isOpen()) {
        <div class="absolute z-50 mt-1.5 w-full min-w-[200px] max-h-60 overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl p-1.5 space-y-1 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100">
          @for (opt of options(); track opt.value) {
            <button
              type="button"
              (click)="selectOption(opt.value)"
              [class]="'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ' +
                (opt.value === value() 
                  ? 'bg-emerald-600/20 text-emerald-300 font-semibold border border-emerald-500/30' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800')"
            >
              <span class="truncate">{{ opt.label }}</span>
              @if (opt.value === value()) {
                <lucide-icon [name]="'check'" class="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 ml-2"></lucide-icon>
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
