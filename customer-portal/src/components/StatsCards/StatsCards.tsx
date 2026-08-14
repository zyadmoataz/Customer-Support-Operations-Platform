import type { SupportTicket } from '../../types/ticket'
import { Inbox, Clock, CheckCircle2 } from 'lucide-react'

interface StatsCardsProps {
  tickets: SupportTicket[]
}

export function StatsCards({ tickets }: StatsCardsProps) {
  const total = tickets.length
  const openCount = tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length
  const resolvedCount = tickets.filter(t => t.status === 'resolved').length

  const stats = [
    {
      label: 'Total Requests',
      value: total,
      icon: <Inbox className="w-5 h-5 text-indigo-400" />,
      bgGlow: 'from-indigo-500/10 to-transparent',
      borderColor: 'border-indigo-500/20',
    },
    {
      label: 'In Progress / Open',
      value: openCount,
      icon: <Clock className="w-5 h-5 text-sky-400" />,
      bgGlow: 'from-sky-500/10 to-transparent',
      borderColor: 'border-sky-500/20',
    },
    {
      label: 'Resolved Issues',
      value: resolvedCount,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      bgGlow: 'from-emerald-500/10 to-transparent',
      borderColor: 'border-emerald-500/20',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div 
          key={idx}
          className={`relative overflow-hidden rounded-2xl glass-panel p-5 border ${stat.borderColor} transition-all duration-300 hover:scale-[1.01]`}
        >
          <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br ${stat.bgGlow} blur-xl pointer-events-none`} />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">{stat.label}</span>
            <div className="p-2 rounded-xl bg-slate-900/60 border border-white/5">
              {stat.icon}
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-white tracking-tight">{stat.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
