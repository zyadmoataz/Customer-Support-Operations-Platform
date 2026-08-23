import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
}

interface CustomSelectProps {
  value: string
  onChange: (val: string) => void
  options: SelectOption[]
  label?: string
  required?: boolean
  error?: string
}

export function CustomSelect({
  value,
  onChange,
  options,
  label,
  required,
  error,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selected = options.find((o) => o.value === value) || options[0]

  return (
    <div className="relative">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-1.5">
          {label} {required && <span className="text-state-danger">*</span>}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-brand-surface border text-xs text-text-primary transition-all text-left ${
          isOpen
            ? 'border-brand-primary ring-2 ring-brand-primary'
            : 'border-brand-border hover:border-brand-subtle'
        } ${error ? 'border-state-danger' : ''}`}
      >
        <span className="font-medium text-text-secondary">{selected?.label}</span>
        <ChevronDown
          className={`w-4 h-4 text-text-tertiary transition-transform ${
            isOpen ? 'rotate-180 text-brand-primary' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          {/* Click-outside backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Floating Dropdown Menu */}
          <div className="absolute z-50 mt-1.5 w-full rounded-2xl bg-brand-surface border border-brand-subtle/80 shadow-2xl p-1.5 space-y-1 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                  opt.value === value
                    ? 'bg-brand-primary/20 text-brand-primary font-semibold border border-brand-hover'
                    : 'text-text-secondary hover:text-text-primary hover:bg-brand-elevated'
                }`}
              >
                <span>{opt.label}</span>
                {opt.value === value && (
                  <Check className="w-3.5 h-3.5 text-brand-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
