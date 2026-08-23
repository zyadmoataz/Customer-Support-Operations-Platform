import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'

interface SelectFilterProps {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  icon?: React.ReactNode
}

export function SelectFilter({
  label,
  value,
  options,
  onChange,
  icon,
}: SelectFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selected = options.find((o) => o.value === value) || options[0]

  return (
    <div className="relative flex items-center gap-1.5">
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={label}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-bg/90 border text-xs text-text-primary transition-all text-left ${
          isOpen
            ? 'border-brand-primary ring-2 ring-brand-primary bg-brand-surface'
            : 'border-brand-border hover:border-brand-subtle'
        }`}
      >
        <span className="font-medium text-text-secondary truncate max-w-[140px]">
          {selected?.label || label}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-text-tertiary transition-transform duration-200 flex-shrink-0 ${
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
          <div className="absolute top-full left-0 mt-1.5 z-50 min-w-[170px] max-h-60 overflow-y-auto rounded-2xl bg-brand-surface border border-brand-subtle/80 shadow-2xl p-1.5 space-y-1 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all text-left ${
                  opt.value === value
                    ? 'bg-brand-primary/25 text-brand-primary font-semibold border border-brand-hover'
                    : 'text-text-secondary hover:text-text-primary hover:bg-brand-elevated'
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {opt.value === value && (
                  <Check className="w-3.5 h-3.5 text-brand-primary flex-shrink-0 ml-2" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
