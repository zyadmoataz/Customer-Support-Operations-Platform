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
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-white/5 space-y-4 text-xs sm:text-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-indigo-400 font-bold">OPS-9482</span>
            <span className="font-semibold text-white">Production Webhook Verification</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 w-fit">
            Resolution Verified
          </span>
        </div>
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Standardized Resolution Report</span>
          </span>
          <p className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-slate-300 leading-relaxed">
            Investigated server logs in US-East-1. Configured NTP synchronization and increased signature tolerance window to 300s.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-amber-400">
            <Star className="w-4 h-4 fill-amber-400" />
            <span className="font-bold">Manager Quality Score: 5.0 / 5.0</span>
          </div>
          <span className="text-xs text-slate-400">Audited by Operations QA Lead</span>
        </div>
      </div>
    )
  }

  if (activeTab === 'sla') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2 hover:-translate-y-1 hover:border-indigo-500/40 transition-all">
          <span className="text-xs text-slate-400 font-medium">First Contact Resolution (FCR)</span>
          <div className="text-2xl font-bold text-emerald-400">88.4%</div>
          <p className="text-xs text-slate-400">Issues resolved in first customer interaction.</p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2 hover:-translate-y-1 hover:border-indigo-500/40 transition-all">
          <span className="text-xs text-slate-400 font-medium">SLA Compliance Rate</span>
          <div className="text-2xl font-bold text-indigo-400">99.8%</div>
          <p className="text-xs text-slate-400">High & Urgent tickets handled within 15 min.</p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2 hover:-translate-y-1 hover:border-indigo-500/40 transition-all">
          <span className="text-xs text-slate-400 font-medium">Staff Workload Balance</span>
          <div className="text-2xl font-bold text-amber-400">Optimal (1:4)</div>
          <p className="text-xs text-slate-400">Average active tickets per engineer.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-white/5 text-xs font-semibold">
          <button onClick={() => onFilterChange('all')} className={`px-3 py-1 rounded-lg transition-all ${activeFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>All</button>
          <button onClick={() => onFilterChange('urgent')} className={`px-3 py-1 rounded-lg transition-all ${activeFilter === 'urgent' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'}`}>Urgent</button>
          <button onClick={() => onFilterChange('resolved')} className={`px-3 py-1 rounded-lg transition-all ${activeFilter === 'resolved' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}>Resolved</button>
        </div>
      </div>
      <div className="space-y-3">
        {filteredTickets.map((t) => (
          <div key={t.id} className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10">{t.id}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${t.priority === 'urgent' ? 'bg-rose-950/70 text-rose-300' : 'bg-sky-950/70 text-sky-300'}`}>{t.priority}</span>
                <span className="text-[11px] text-slate-400">{t.category}</span>
                <span className="text-[11px] text-slate-500">• {t.time}</span>
              </div>
              <h4 className="text-sm font-semibold text-white">{t.title}</h4>
              <p className="text-xs text-slate-400">Reported by <strong className="text-slate-300">{t.customer}</strong> ({t.company})</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${t.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/10 text-amber-300 border-amber-500/30'}`}>{t.status === 'resolved' ? 'Resolved' : 'In Progress'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
