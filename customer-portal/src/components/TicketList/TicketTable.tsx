import type { SupportTicket } from '@/types'
import { statusBadge, priorityBadge } from './ticketListConstants'

interface TicketTableProps {
  tickets: SupportTicket[]
  onSelectTicket: (ticket: SupportTicket) => void
}

export function TicketTable({ tickets, onSelectTicket }: TicketTableProps) {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <div className="rounded-2xl bg-brand-surface border border-brand-border overflow-hidden shadow-xl shadow-brand-bg/50">
      <table className="w-full">
        <thead>
          <tr className="border-b border-brand-border bg-brand-bg/60">
            <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wider text-text-tertiary">ID</th>
            <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wider text-text-tertiary">Subject</th>
            <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wider text-text-tertiary hidden md:table-cell">Category</th>
            <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wider text-text-tertiary">Status</th>
            <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wider text-text-tertiary hidden sm:table-cell">Priority</th>
            <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wider text-text-tertiary hidden lg:table-cell">Created</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => {
            const status = statusBadge[ticket.status] || statusBadge.open
            const priority = priorityBadge[ticket.priority] || priorityBadge.medium
            return (
              <tr
                key={ticket.id}
                onClick={() => onSelectTicket(ticket)}
                className="border-b border-brand-border/60 last:border-0 hover:bg-brand-elevated/40 cursor-pointer transition-colors group"
              >
                <td className="px-5 py-4">
                  <span className="font-mono text-xs text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-md border border-brand-primary">
                    #{ticket.id.slice(0, 8)}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm font-semibold text-text-primary group-hover:text-brand-primary transition-colors truncate max-w-[300px]">
                    {ticket.title || ticket.description.slice(0, 50)}
                  </p>
                  <p className="text-xs text-text-muted truncate max-w-[300px] mt-0.5">
                    {ticket.description.slice(0, 80)}{ticket.description.length > 80 ? '...' : ''}
                  </p>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <span className="text-xs text-text-secondary bg-brand-elevated px-2 py-0.5 rounded-md border border-brand-subtle">
                    {ticket.category || '—'}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold border ${status.bg} ${status.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                  </span>
                </td>
                <td className="px-5 py-4 hidden sm:table-cell">
                  <span className={`px-2 py-0.5 rounded-md text-xs uppercase font-bold tracking-wider ${priority.bg} ${priority.text}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-5 py-4 hidden lg:table-cell">
                  <span className="text-xs text-text-tertiary">{formatDate(ticket.created_at)}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
