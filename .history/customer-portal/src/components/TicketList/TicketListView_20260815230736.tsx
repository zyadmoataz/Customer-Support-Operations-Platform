import { useState } from 'react'
import type { SupportTicket } from '../../types'
import { StatsCards } from '../StatsCards/StatsCards'
import { TicketCard } from '../TicketCard/TicketCard'
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/80 border border-white/5 w-fit">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activeFilter === 'all' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>All</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300">{tickets.length}</span>
          </button>

          <button
            onClick={() => setActiveFilter('open')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activeFilter === 'open' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Active</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300">{openTickets.length}</span>
          </button>

          <button
            onClick={() => setActiveFilter('resolved')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activeFilter === 'resolved' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Resolved</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300">{resolvedTickets.length}</span>
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 focus-within:border-indigo-500 transition-all w-full sm:w-80 shadow-inner">
          <Search className="w-4 h-4 text-slate-400 flex-shrink-0 mr-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets by keyword..."
            className="w-full bg-transparent border-0 p-0 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white p-0.5">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Loading Skeleton States */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-44 rounded-3xl glass-panel p-6 border border-white/5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-24 h-5 rounded-full animate-shimmer" />
                  <div className="w-16 h-4 rounded animate-shimmer" />
                </div>
                <div className="w-3/4 h-5 rounded animate-shimmer" />
                <div className="w-full h-10 rounded animate-shimmer" />
              </div>
              <div className="w-full h-4 rounded animate-shimmer mt-4" />
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="p-8 rounded-3xl glass-panel text-center border border-rose-500/20">
          <p className="text-sm text-rose-400 font-semibold mb-3">Failed to load support requests.</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="p-12 rounded-3xl glass-panel text-center border border-dashed border-slate-800">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-3">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-white">No Tickets in this View</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
            {searchQuery ? 'No support requests matched your search criteria.' : 'You have no tickets currently matching this filter status.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  )
}
