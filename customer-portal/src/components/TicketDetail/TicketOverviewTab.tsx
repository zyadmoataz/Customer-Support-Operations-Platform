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
      <div className="p-4 rounded-2xl bg-brand-surface/90 border border-brand-border">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-3">Resolution Progress</h4>
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-brand-elevated -translate-y-1/2 z-0" />
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
                    isPassed ? 'bg-brand-primary text-text-primary ring-4 ring-brand-primary' : 'bg-brand-elevated text-text-muted border border-brand-subtle'
                  }`}
                >
                  {item.step}
                </div>
                <span className={`text-[10px] font-medium mt-1 ${isPassed ? 'text-text-secondary' : 'text-text-muted'}`}>
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Description */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-1.5 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-brand-primary" />
          <span>Customer Issue Description</span>
        </h4>
        <div className="p-4 rounded-2xl bg-brand-surface/60 border border-brand-border text-xs sm:text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
          {ticket.description}
        </div>
      </div>

      {/* Resolution Summary */}
      {ticket.resolution_note && (
        <div className="p-4 rounded-2xl bg-state-success-bg border border-state-success text-xs">
          <div className="flex items-center gap-1.5 font-bold text-state-success mb-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Official Resolution Report</span>
          </div>
          <p className="text-text-secondary leading-relaxed whitespace-pre-wrap">{ticket.resolution_note}</p>
          <div className="mt-3 pt-2 border-t border-state-success flex flex-wrap items-center justify-between gap-2 text-[11px] text-state-success/80">
            <span className="flex items-center gap-1 font-medium">
              <Lock className="w-3 h-3" />
              <span>Resolved: {updatedDate}</span>
            </span>
            <button
              onClick={onReopen}
              disabled={isReopening}
              className="flex items-center gap-1 text-state-warning hover:text-state-warning font-bold bg-state-warning px-2.5 py-1 rounded-lg border border-state-warning transition-colors"
            >
              <RotateCcw className={`w-3 h-3 ${isReopening ? 'animate-spin' : ''}`} />
              <span>Reopen Request</span>
            </button>
          </div>
        </div>
      )}

      {/* Metadata Footer */}
      <div className="pt-3 border-t border-brand-border/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-text-muted font-medium">
        <span>Submitted: {createdDate}</span>
        <span>Priority: <strong className="uppercase text-text-tertiary">{ticket.priority}</strong></span>
      </div>
    </div>
  )
}
