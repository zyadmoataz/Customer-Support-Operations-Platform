import { CheckCircle2 } from 'lucide-react'

interface PasswordComplexityHelperProps {
  password: string
}

export function PasswordComplexityHelper({ password }: PasswordComplexityHelperProps) {
  if (!password) return null

  const checks = [
    { label: 'Min 8 characters', pass: password.length >= 8 },
    { label: '1 uppercase letter (A-Z)', pass: /[A-Z]/.test(password) },
    { label: '1 number (0-9)', pass: /[0-9]/.test(password) },
    { label: '1 special symbol (!@#$)', pass: /[^A-Za-z0-9]/.test(password) },
  ]

  return (
    <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-white/5 text-[11px] space-y-1.5 text-slate-400">
      <span className="font-semibold text-slate-300 block mb-1">Password Requirements:</span>
      {checks.map((check, idx) => (
        <div key={idx} className={`flex items-center gap-1.5 ${check.pass ? 'text-emerald-400 font-medium' : 'text-slate-400'}`}>
          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{check.label}</span>
        </div>
      ))}
    </div>
  )
}
