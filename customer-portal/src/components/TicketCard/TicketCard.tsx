import { useState } from 'react'
import type { SupportTicket, TicketPriority, TicketStatus } from '@/types'
import { TicketDetailModal } from '@/components/TicketDetail/TicketDetailModal'
import { ChevronRight, CheckCircle2 } from 'lucide-react'

interface TicketCardProps {
  ticket: SupportTicket
}

const statusStyles: Record<TicketStatus, { bg: string; text: string; dot: string; label: string }> = {
  open: { bg: 'bg-state-info-bg border-state-info', text: 'text-state-info', dot: 'bg-state-info', label: 'Open' },
  in_progress: { bg: 'bg-state-warning-bg border-state-warning', text: 'text-state-warning', dot: 'bg-state-warning', label: 'In Progress' },
  resolved: { bg: 'bg-state-success-bg border-state-success', text: 'text-state-success', dot: 'bg-state-success', label: 'Resolved & Verified' },
}

const priorityStyles: Record<TicketPriority, { text: string; bg: string }> = {
  low: { text: 'text-text-tertiary', bg: 'bg-brand-elevated/80 border border-brand-subtle/50' },
  medium: { text: 'text-state-info', bg: 'bg-state-info border border-state-info' },
  high: { text: 'text-state-warning', bg: 'bg-state-warning border border-state-warning' },
  urgent: { text: 'text-state-danger', bg: 'bg-state-danger border border-state-danger' },
}

export function TicketCard({ ticket }: TicketCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const status = statusStyles[ticket.status] || statusStyles.open
  const priority = priorityStyles[ticket.priority] || priorityStyles.medium
  const formattedDate = new Date(ticket.created_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })

  return (
    <>
      <div 
        onClick={() => setIsDetailsOpen(true)}
        className="group rounded-3xl bg-brand-surface border border-brand-border p-5 sm:p-6 flex flex-col justify-between shadow-xl shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-glow cursor-pointer relative"
      >
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${status.bg} ${status.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse`} />
                {status.label}
              </span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider ${priority.bg} ${priority.text}`}>
                {ticket.priority || 'medium'}
              </span>
              {ticket.category && (
                <span className="text-[11px] text-text-tertiary bg-brand-bg/80 px-2 py-0.5 rounded-md border border-brand-border truncate max-w-[140px]">
                  {ticket.category}
                </span>
              )}
            </div>
            <span className="text-[11px] text-text-muted flex-shrink-0 font-medium">{formattedDate}</span>
          </div>

          <h3 className="text-base font-bold text-text-primary group-hover:text-brand-primary transition-colors mb-1.5">
            {ticket.title || ticket.description.slice(0, 50)}
          </h3>
          <p className="text-xs text-text-tertiary line-clamp-2 leading-relaxed">
            {ticket.description}
          </p>

          {ticket.resolution_note && (
            <div className="mt-3.5 p-3 rounded-2xl bg-state-success-bg border border-state-success text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-state-success mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Agent Resolution Summary:</span>
              </div>
              <p className="text-text-secondary line-clamp-2 leading-relaxed">{ticket.resolution_note}</p>
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-brand-border/80 flex items-center justify-between text-[11px] text-text-tertiary">
          <span className="font-mono">ID: {ticket.id.slice(0, 8)}</span>
          <span className="inline-flex items-center gap-1 text-brand-primary group-hover:translate-x-0.5 transition-transform font-semibold">
            <span>View Timeline & Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      <TicketDetailModal
        ticket={ticket}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </>
  )
}

