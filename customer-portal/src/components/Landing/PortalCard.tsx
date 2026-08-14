import type { ReactNode } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

interface PortalCardProps {
  icon: ReactNode
  badge: string
  title: string
  description: string
  features: string[]
  actionLabel: string
  actionHref?: string
  onActionClick?: () => void
  accountEmail: string
  accentColor: 'indigo' | 'emerald'
}

export function PortalCard({
  icon,
  badge,
  title,
  description,
  features,
  actionLabel,
  actionHref,
  onActionClick,
  accountEmail,
  accentColor
}: PortalCardProps) {
  const isIndigo = accentColor === 'indigo'
  const borderClass = isIndigo ? 'border-indigo-500/30 hover:border-indigo-500/60' : 'border-emerald-500/30 hover:border-emerald-500/60'
  const badgeClass = isIndigo ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
  const buttonClass = isIndigo ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'
  const iconColor = isIndigo ? 'text-indigo-400' : 'text-emerald-400'

  return (
    <div className={`relative group rounded-3xl glass-panel p-8 border ${borderClass} transition-all duration-300 hover:shadow-glow flex flex-col justify-between`}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center justify-center">
            {icon}
          </div>
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badgeClass}`}>
            {badge}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white transition-colors">{title}</h3>
        <p className="text-xs text-slate-400 mt-2 leading-relaxed">{description}</p>

        <div className="mt-6 space-y-2 text-xs text-slate-300">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircle2 className={`w-4 h-4 ${iconColor} flex-shrink-0`} />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
        {actionHref ? (
          <a
            href={actionHref}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-semibold transition-all shadow-md ${buttonClass}`}
          >
            <span>{actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        ) : (
          <button
            onClick={onActionClick}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-semibold transition-all shadow-md ${buttonClass}`}
          >
            <span>{actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
        <span className="text-[11px] text-slate-500 font-mono">{accountEmail}</span>
      </div>
    </div>
  )
}
