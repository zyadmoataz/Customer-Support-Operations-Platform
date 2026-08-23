import type { SupportTicket } from '@/types'
import { Inbox, Clock, CheckCircle2 } from 'lucide-react'

interface StatsCardsProps {
  tickets: SupportTicket[]
  totalCount?: number
}

export function StatsCards({ tickets, totalCount }: StatsCardsProps) {
  const total = totalCount ?? tickets.length
  const openCount = tickets.filter(
    (t) => t.status === 'open' || t.status === 'in_progress',
  ).length
  const resolvedTickets = tickets.filter(
    (t) => t.status === 'resolved',
  )
  const resolvedCount = resolvedTickets.length

  const stats = [
    {
      label: 'Total Inquiries',
      value: total,
      subtext: 'Lifetime submitted requests',
      icon: <Inbox className="w-5 h-5 text-brand-primary" />,
      accentBorder: 'hover:border-brand-primary',
    },
    {
      label: 'Active In Triage',
      value: openCount,
      subtext: openCount === 0 ? 'All caught up' : 'Under active investigation',
      icon: <Clock className="w-5 h-5 text-state-info" />,
      accentBorder: 'hover:border-state-info',
    },
    {
      label: 'Resolved Issues',
      value: resolvedCount,
      subtext: 'Verified with resolution report',
      icon: <CheckCircle2 className="w-5 h-5 text-state-success" />,
      accentBorder: 'hover:border-state-success',
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`rounded-3xl bg-brand-surface border border-brand-border p-5 sm:p-6 shadow-xl shadow-brand-bg/50 transition-all duration-300 hover:-translate-y-1 ${stat.accentBorder} hover:shadow-glow flex flex-col justify-between`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-text-tertiary">
              {stat.label}
            </span>
            <div className="p-2.5 rounded-xl bg-brand-bg/80 border border-brand-border/80">
              {stat.icon}
            </div>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-text-primary tracking-tight block">
              {stat.value}
            </span>
            <span className="text-xs text-text-tertiary font-medium mt-1 block">
              {stat.subtext}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
