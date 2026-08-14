import type { SupportTicket, TicketPriority, TicketStatus } from '../../types/ticket'

interface TicketCardProps {
  ticket: SupportTicket
}

const statusBadgeStyles: Record<TicketStatus, { bg: string; text: string; dot: string; label: string }> = {
  open: { bg: 'bg-sky-500/10 border-sky-500/20', text: 'text-sky-400', dot: 'bg-sky-400', label: 'Open' },
  in_progress: { bg: 'bg-amber-500/10 border-amber-500/20', text: 'text-amber-400', dot: 'bg-amber-400', label: 'In Progress' },
  resolved: { bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400', label: 'Resolved' },
}

const priorityBadgeStyles: Record<TicketPriority, { text: string; bg: string }> = {
  low: { text: 'text-slate-400', bg: 'bg-slate-800' },
  medium: { text: 'text-sky-300', bg: 'bg-sky-950/60' },
  high: { text: 'text-amber-300', bg: 'bg-amber-950/60' },
  urgent: { text: 'text-rose-300', bg: 'bg-rose-950/60' },
}

export function TicketCard({ ticket }: TicketCardProps) {
  const status = statusBadgeStyles[ticket.status] || statusBadgeStyles.open
  const priority = priorityBadgeStyles[ticket.priority] || priorityBadgeStyles.medium
  const formattedDate = new Date(ticket.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className="group relative rounded-2xl glass-panel p-5 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-glow">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${status.bg} ${status.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse`} />
            {status.label}
          </span>
          <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider ${priority.bg} ${priority.text}`}>
            {ticket.priority || 'medium'}
          </span>
          {ticket.category && (
            <span className="text-[11px] text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded-md border border-white/5">
              {ticket.category}
            </span>
          )}
        </div>
        <span className="text-[11px] text-slate-500">{formattedDate}</span>
      </div>

      <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors mb-1.5">
        {ticket.title || ticket.description.slice(0, 50)}
      </h3>
      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
        {ticket.description}
      </p>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
        <span>ID: {ticket.id.slice(0, 8)}...</span>
        <span className="text-slate-400">Assigned: {ticket.assigned_to ? 'Support Agent' : 'Queue Pending'}</span>
      </div>
    </div>
  )
}
