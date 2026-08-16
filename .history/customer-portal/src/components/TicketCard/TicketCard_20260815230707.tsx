import { useState } from 'react'
import type { SupportTicket, TicketPriority, TicketStatus } from '../../types'
import { TicketDetailsModal } from './TicketDetailsModal'
import { ChevronRight, CheckCircle2 } from 'lucide-react'

interface TicketCardProps {
  ticket: SupportTicket
}

const statusStyles: Record<TicketStatus, { bg: string; text: string; dot: string; label: string }> = {
  open: { bg: 'bg-sky-500/10 border-sky-500/25', text: 'text-sky-400', dot: 'bg-sky-400', label: 'Open' },
  in_progress: { bg: 'bg-amber-500/10 border-amber-500/25', text: 'text-amber-400', dot: 'bg-amber-400', label: 'In Progress' },
  resolved: { bg: 'bg-emerald-500/10 border-emerald-500/25', text: 'text-emerald-400', dot: 'bg-emerald-400', label: 'Resolved & Verified' },
}

const priorityStyles: Record<TicketPriority, { text: string; bg: string }> = {
  low: { text: 'text-slate-400', bg: 'bg-slate-800/80 border border-slate-700/50' },
  medium: { text: 'text-sky-300', bg: 'bg-sky-950/60 border border-sky-500/20' },
  high: { text: 'text-amber-300', bg: 'bg-amber-950/60 border border-amber-500/20' },
  urgent: { text: 'text-rose-300', bg: 'bg-rose-950/60 border border-rose-500/20' },
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
        className="group rounded-3xl bg-slate-900 border border-slate-800 p-5 sm:p-6 flex flex-col justify-between shadow-xl shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-glow cursor-pointer relative"
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
                <span className="text-[11px] text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-800 truncate max-w-[140px]">
                  {ticket.category}
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-500 flex-shrink-0 font-medium">{formattedDate}</span>
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-1.5">
            {ticket.title || ticket.description.slice(0, 50)}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {ticket.description}
          </p>

          {ticket.resolution_note && (
            <div className="mt-3.5 p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-400 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Agent Resolution Summary:</span>
              </div>
              <p className="text-slate-300 line-clamp-2 leading-relaxed">{ticket.resolution_note}</p>
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-mono">ID: {ticket.id.slice(0, 8)}</span>
          <span className="inline-flex items-center gap-1 text-indigo-400 group-hover:translate-x-0.5 transition-transform font-semibold">
            <span>View Timeline & Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      <TicketDetailsModal
        ticket={ticket}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </>
  )
}
