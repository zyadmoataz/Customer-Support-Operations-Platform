import { useState } from 'react'
import type { SupportTicket, TicketPriority, TicketStatus } from '@/types'
import { TicketDetailModal } from '@/components/TicketDetail/TicketDetailModal'
import { ChevronRight, CheckCircle2 } from 'lucide-react'

interface TicketCardProps {
  ticket: SupportTicket
}

const statusStyles: Record<TicketStatus, { bg: string; text: string; dot: string; label: string }> = {
  open: { bg: 'bg-brand-surface border border-brand-border', text: 'text-text-primary', dot: 'bg-state-info', label: 'Open' },
  in_progress: { bg: 'bg-brand-surface border border-brand-border', text: 'text-text-primary', dot: 'bg-state-warning', label: 'In Progress' },
  resolved: { bg: 'bg-brand-surface border border-brand-border', text: 'text-text-primary', dot: 'bg-state-success', label: 'Resolved & Verified' },
}

const priorityStyles: Record<TicketPriority, { text: string; bg: string }> = {
  low: { text: 'text-text-secondary', bg: 'bg-brand-elevated/80 border border-brand-border' },
  medium: { text: 'text-text-primary', bg: 'bg-brand-surface border border-brand-border' },
  high: { text: 'text-state-warning', bg: 'bg-brand-surface border border-brand-border' },
  urgent: { text: 'text-state-danger', bg: 'bg-brand-surface border border-brand-border' },
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
        className="group rounded-3xl bg-brand-surface border border-brand-border p-5 sm:p-6 flex flex-col justify-between shadow-xl shadow-brand-bg/50 transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-glow cursor-pointer relative"
      >
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${status.bg} ${status.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider ${priority.bg} ${priority.text}`}>
                {ticket.priority || 'medium'}
              </span>
              {ticket.category && (
                <span className="text-xs text-text-secondary font-medium">
                  {ticket.category}
                </span>
              )}
            </div>
            <span className="text-[11px] text-text-muted flex-shrink-0 font-medium">{formattedDate}</span>
          </div>

          <h3 className="text-base font-bold text-text-primary group-hover:text-brand-primary transition-colors mb-1.5">
            {ticket.title || ticket.description.slice(0, 50)}
          </h3>
          <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
            {ticket.description}
          </p>

          {ticket.resolution_note && (
            <div className="mt-3.5 p-3 rounded-2xl bg-brand-elevated border border-brand-border text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-brand-primary mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Agent Resolution Summary:</span>
              </div>
              <p className="text-text-primary line-clamp-2 leading-relaxed">{ticket.resolution_note}</p>
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

