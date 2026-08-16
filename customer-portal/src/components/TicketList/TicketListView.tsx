import { useState } from 'react'
import type { SupportTicket } from '@/types'
import { StatsCards } from '@/components/StatsCards/StatsCards'
import { TicketCard } from '@/components/TicketCard/TicketCard'
import { Search, Inbox, RefreshCw, X } from 'lucide-react'

interface TicketListViewProps {
  tickets: SupportTicket[]
  isLoading: boolean
  isError: boolean
}

export function TicketListView({ tickets, isLoading, isError }: TicketListViewProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'open' | 'resolved'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const openTickets = tickets.filter(t => t.status === 'open' || t.status === 'in_progress')
  const resolvedTickets = tickets.filter(t => t.status === 'resolved')

  const filteredTickets = tickets.filter((t) => {
    const matchesTab = activeFilter === 'all' 
      ? true 
      : activeFilter === 'open' 
        ? t.status === 'open' || t.status === 'in_progress' 
        : t.status === 'resolved'

    const matchesSearch = (t.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.category || '').toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  return (
    <div>
      <StatsCards tickets={tickets} />

      {/* Control Bar: Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6">
        <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-2xl bg-slate-900/80 border border-white/5 overflow-x-auto max-w-full flex-nowrap scrollbar-none w-full sm:w-fit">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeFilter === 'all' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>All Requests</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300 font-bold">
              {tickets.length}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('open')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeFilter === 'open' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Active in Triage</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300 font-bold">
              {openTickets.length}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('resolved')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeFilter === 'resolved' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Resolved</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300 font-bold">
              {resolvedTickets.length}
            </span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 focus-within:border-indigo-500 transition-all w-full sm:w-72 shadow-inner">
          <Search className="w-4 h-4 text-slate-400 flex-shrink-0 mr-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inquiries..."
            className="w-full bg-transparent border-0 p-0 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-slate-500 hover:text-slate-300 p-0.5">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Ticket List Display */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-44 rounded-3xl glass-panel p-6 border border-white/5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-24 h-5 rounded-full animate-shimmer" />
                <div className="w-20 h-4 rounded animate-shimmer" />
              </div>
              <div className="w-3/4 h-5 rounded animate-shimmer" />
              <div className="w-full h-4 rounded animate-shimmer" />
              <div className="w-1/2 h-3 rounded animate-shimmer" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-16 p-6 rounded-3xl glass-panel border border-rose-500/20 max-w-md mx-auto">
          <RefreshCw className="w-8 h-8 text-rose-400 mx-auto mb-3 animate-spin" />
          <h4 className="text-sm font-bold text-white mb-1">Failed to Load Support Tickets</h4>
          <p className="text-xs text-slate-400">Please verify your internet connection or check back momentarily.</p>
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl glass-panel border border-white/5 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Inbox className="w-6 h-6 text-slate-400" />
          </div>
          <h4 className="text-base font-bold text-white mb-1">No Inquiries Found</h4>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
            {searchQuery
              ? `No requests match "${searchQuery}". Try refining your keywords or resetting filters.`
              : activeFilter === 'open'
              ? 'You have no tickets currently under active triage.'
              : activeFilter === 'resolved'
              ? 'You do not have any resolved tickets yet.'
              : 'You have not submitted any support tickets yet.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  )
}
