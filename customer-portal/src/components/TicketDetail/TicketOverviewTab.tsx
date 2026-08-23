import { CheckCircle2, FileText, Lock, RotateCcw } from 'lucide-react'
import type { SupportTicket, TicketStatus } from '@/types'

interface TicketOverviewTabProps {
  ticket: SupportTicket
  onReopen: () => void
  isReopening: boolean
}

const statusTimelines: Record<TicketStatus, { step: number; label: string }> = {
  open: { step: 1, label: 'Submitted & Queued' },
  in_progress: { step: 2, label: 'Under Investigation' },
  resolved: { step: 3, label: 'Resolved & Verified' },
}

export function TicketOverviewTab({ ticket, onReopen, isReopening }: TicketOverviewTabProps) {
  const currentTimeline = statusTimelines[ticket.status] || statusTimelines.open
  const createdDate = new Date(ticket.created_at).toLocaleString()
  const updatedDate = new Date(ticket.updated_at).toLocaleString()

  return (
    <div className="space-y-4">
      {/* Progress Timeline */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Resolution Progress</h4>
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
          {[
            { step: 1, label: 'Submitted' },
            { step: 2, label: 'In Triage' },
            { step: 3, label: 'Resolved' },
          ].map((item) => {
            const isPassed = currentTimeline.step >= item.step
            return (
              <div key={item.step} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isPassed ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/20' : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {item.step}
                </div>
                <span className={`text-[10px] font-medium mt-1 ${isPassed ? 'text-slate-200' : 'text-slate-500'}`}>
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Description */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-indigo-400" />
          <span>Customer Issue Description</span>
        </h4>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
          {ticket.description}
        </div>
      </div>

      {/* Resolution Summary */}
      {ticket.resolution_note && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Official Resolution Report</span>
          </div>
          <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{ticket.resolution_note}</p>
          <div className="mt-3 pt-2 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-2 text-[11px] text-emerald-400/80">
            <span className="flex items-center gap-1 font-medium">
              <Lock className="w-3 h-3" />
              <span>Resolved: {updatedDate}</span>
            </span>
            <button
              onClick={onReopen}
              disabled={isReopening}
              className="flex items-center gap-1 text-amber-300 hover:text-amber-200 font-bold bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/30 transition-colors"
            >
              <RotateCcw className={`w-3 h-3 ${isReopening ? 'animate-spin' : ''}`} />
              <span>Reopen Request</span>
            </button>
          </div>
        </div>
      )}

      {/* Metadata Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 font-medium">
        <span>Submitted: {createdDate}</span>
        <span>Priority: <strong className="uppercase text-slate-400">{ticket.priority}</strong></span>
      </div>
    </div>
  )
}
