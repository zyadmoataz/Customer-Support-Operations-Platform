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
    <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl shadow-black/30">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-950/60">
            <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">ID</th>
            <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Subject</th>
            <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 hidden md:table-cell">Category</th>
            <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Status</th>
            <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 hidden sm:table-cell">Priority</th>
            <th className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 hidden lg:table-cell">Created</th>
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
                className="border-b border-slate-800/60 last:border-0 hover:bg-slate-800/40 cursor-pointer transition-colors group"
              >
                <td className="px-4 py-3">
                  <span className="font-mono text-[11px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                    #{ticket.id.slice(0, 8)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors truncate max-w-[300px]">
                    {ticket.title || ticket.description.slice(0, 50)}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate max-w-[300px] mt-0.5">
                    {ticket.description.slice(0, 80)}{ticket.description.length > 80 ? '...' : ''}
                  </p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-[11px] text-slate-300 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
                    {ticket.category || '—'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${status.bg} ${status.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                  </span>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider ${priority.bg} ${priority.text}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className="text-[11px] text-slate-400">{formatDate(ticket.created_at)}</span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
