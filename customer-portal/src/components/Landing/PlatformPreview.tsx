import { useState } from 'react'
import { Inbox, CheckCircle2, Clock, Star, Zap } from 'lucide-react'
import { MOCK_PREVIEW_TICKETS } from './PlatformPreviewData'
import { PlatformPreviewTabs } from './PlatformPreviewTabs'

export function PlatformPreview() {
  const [activeTab, setActiveTab] = useState<'queue' | 'resolution' | 'sla'>('queue')
  const [activeFilter, setActiveFilter] = useState<'all' | 'urgent' | 'resolved'>('all')

  const filteredTickets = MOCK_PREVIEW_TICKETS.filter((t) => {
    if (activeFilter === 'urgent') return t.priority === 'urgent'
    if (activeFilter === 'resolved') return t.status === 'resolved'
    return true
  })

  return (
    <section id="platform-preview" className="w-full max-w-6xl mx-auto my-12 px-4">
      <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 shadow-glow relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-indigo-500/15 to-transparent blur-2xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-2">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Interactive Command Center Preview</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Live Support Operations Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Simulate real-world customer triage, agent workflows, and managerial SLA compliance.
            </p>
          </div>

          {/* Perspective Switcher */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-white/10 overflow-x-auto max-w-full flex-nowrap scrollbar-none self-stretch sm:self-start md:self-auto">
            <button
              onClick={() => setActiveTab('queue')}
              className={`flex-1 sm:flex-initial px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'queue' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Triage Queue
            </button>
            <button
              onClick={() => setActiveTab('resolution')}
              className={`flex-1 sm:flex-initial px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'resolution' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Resolution Desk
            </button>
            <button
              onClick={() => setActiveTab('sla')}
              className={`flex-1 sm:flex-initial px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'sla' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              SLA Analytics
            </button>
          </div>
        </div>

        {/* Live Operational Telemetry Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/5 hover:-translate-y-1 hover:border-indigo-500/40 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Active Queue</span>
              <Inbox className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">1,284</div>
            <span className="text-[11px] text-emerald-400 font-medium">↑ 14% triage velocity</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/5 hover:-translate-y-1 hover:border-indigo-500/40 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Avg First Response</span>
              <Clock className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">11m 42s</div>
            <span className="text-[11px] text-sky-400 font-medium">96.8% within SLA target</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/5 hover:-translate-y-1 hover:border-indigo-500/40 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>CSAT Score</span>
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">98.6%</div>
            <span className="text-[11px] text-amber-400 font-medium">4.93 / 5.0 QA score</span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-white/5 hover:-translate-y-1 hover:border-indigo-500/40 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>SLA Compliance</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">99.8%</div>
            <span className="text-[11px] text-emerald-400 font-medium">Zero breaches this month</span>
          </div>
        </div>

        {/* Tab Content Components */}
        <PlatformPreviewTabs
          activeTab={activeTab}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          filteredTickets={filteredTickets}
        />
      </div>
    </section>
  )
}
