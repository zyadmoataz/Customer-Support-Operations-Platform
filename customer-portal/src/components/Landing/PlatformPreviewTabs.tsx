import { CheckCircle2, Star } from 'lucide-react'
import type { PreviewTicket } from './PlatformPreviewData'

interface PlatformPreviewTabsProps {
  activeTab: 'queue' | 'resolution' | 'sla'
  activeFilter: 'all' | 'urgent' | 'resolved'
  onFilterChange: (filter: 'all' | 'urgent' | 'resolved') => void
  filteredTickets: PreviewTicket[]
}

export function PlatformPreviewTabs({
  activeTab,
  activeFilter,
  onFilterChange,
  filteredTickets,
}: PlatformPreviewTabsProps) {
  if (activeTab === 'resolution') {
    return (
      <div className="p-4 sm:p-6 rounded-2xl bg-brand-surface/60 border border-white/5 space-y-4 text-xs sm:text-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-brand-primary font-bold">OPS-9482</span>
            <span className="font-semibold text-text-primary">Production Webhook Verification</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-state-success-bg text-state-success border border-state-success w-fit">
            Resolution Verified
          </span>
        </div>
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-state-success flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Standardized Resolution Report</span>
          </span>
          <p className="p-4 rounded-xl bg-state-success-bg border border-state-success text-text-secondary leading-relaxed">
            Investigated server logs in US-East-1. Configured NTP synchronization and increased signature tolerance window to 300s.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-brand-bg/80 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-state-warning">
            <Star className="w-4 h-4 text-state-warning" />
            <span className="font-bold">Manager Quality Score: 5.0 / 5.0</span>
          </div>
          <span className="text-xs text-text-tertiary">Audited by Operations QA Lead</span>
        </div>
      </div>
    )
  }

  if (activeTab === 'sla') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-brand-surface/80 border border-white/5 space-y-2 hover:-translate-y-1 hover:border-brand-primary transition-all">
          <span className="text-xs text-text-tertiary font-medium">First Contact Resolution (FCR)</span>
          <div className="text-2xl font-bold text-state-success">88.4%</div>
          <p className="text-xs text-text-tertiary">Issues resolved in first customer interaction.</p>
        </div>
        <div className="p-5 rounded-2xl bg-brand-surface/80 border border-white/5 space-y-2 hover:-translate-y-1 hover:border-brand-primary transition-all">
          <span className="text-xs text-text-tertiary font-medium">SLA Compliance Rate</span>
          <div className="text-2xl font-bold text-brand-primary">99.8%</div>
          <p className="text-xs text-text-tertiary">High & Urgent tickets handled within 15 min.</p>
        </div>
        <div className="p-5 rounded-2xl bg-brand-surface/80 border border-white/5 space-y-2 hover:-translate-y-1 hover:border-brand-primary transition-all">
          <span className="text-xs text-text-tertiary font-medium">Staff Workload Balance</span>
          <div className="text-2xl font-bold text-state-warning">Optimal (1:4)</div>
          <p className="text-xs text-text-tertiary">Average active tickets per engineer.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-brand-surface/80 border border-white/5 text-xs font-semibold">
          <button onClick={() => onFilterChange('all')} className={`px-3 py-1 rounded-lg transition-all ${activeFilter === 'all' ? 'bg-brand-primary text-text-primary' : 'text-text-tertiary hover:text-text-primary'}`}>All</button>
          <button onClick={() => onFilterChange('urgent')} className={`px-3 py-1 rounded-lg transition-all ${activeFilter === 'urgent' ? 'bg-state-danger text-text-primary' : 'text-text-tertiary hover:text-text-primary'}`}>Urgent</button>
          <button onClick={() => onFilterChange('resolved')} className={`px-3 py-1 rounded-lg transition-all ${activeFilter === 'resolved' ? 'bg-state-success text-text-primary' : 'text-text-tertiary hover:text-text-primary'}`}>Resolved</button>
        </div>
      </div>
      <div className="space-y-3">
        {filteredTickets.map((t) => (
          <div key={t.id} className="p-4 sm:p-5 rounded-2xl bg-brand-surface/60 border border-white/5 hover:border-brand-primary flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-brand-primary px-2 py-0.5 rounded bg-brand-primary/10">{t.id}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${t.priority === 'urgent' ? 'bg-state-danger text-state-danger' : 'bg-state-info text-state-info'}`}>{t.priority}</span>
                <span className="text-[11px] text-text-tertiary">{t.category}</span>
                <span className="text-[11px] text-text-muted">• {t.time}</span>
              </div>
              <h4 className="text-sm font-semibold text-text-primary">{t.title}</h4>
              <p className="text-xs text-text-tertiary">Reported by <strong className="text-text-secondary">{t.customer}</strong> ({t.company})</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${t.status === 'resolved' ? 'bg-state-success-bg text-state-success border-state-success' : 'bg-state-warning-bg text-state-warning border-state-warning'}`}>{t.status === 'resolved' ? 'Resolved' : 'In Progress'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
