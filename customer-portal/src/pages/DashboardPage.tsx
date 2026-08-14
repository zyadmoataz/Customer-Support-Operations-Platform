import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../services/supabase'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Header } from '../components/Header/Header'
import { StatsCards } from '../components/StatsCards/StatsCards'
import { TicketCard } from '../components/TicketCard/TicketCard'
import { CreateTicketModal } from '../components/CreateTicketModal/CreateTicketModal'
import { ProfileModal } from '../components/ProfileModal/ProfileModal'
import type { SupportTicket } from '../types/ticket'
import { Search, Inbox } from 'lucide-react'

export function DashboardPage() {
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'resolved'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const { data: tickets = [], isLoading, isError } = useQuery<SupportTicket[]>({
    queryKey: ['tickets', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('support_requests')
        .select('*')
        .eq('customer_id', user?.id)
        .order('created_at', { ascending: false })
      
      if (error) {
        toast.error('Failed to load tickets: ' + error.message)
        throw error
      }
      return data as SupportTicket[]
    },
    enabled: !!user?.id,
  })

  const filteredTickets = tickets.filter(t => {
    const matchesTab = activeTab === 'all' 
      ? true 
      : activeTab === 'open' 
        ? t.status === 'open' || t.status === 'in_progress' 
        : t.status === 'resolved' || t.status === 'closed'

    const matchesSearch = (t.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  return (
    <div className="min-h-screen w-full bg-brand-bg text-slate-100 flex flex-col">
      <Header 
        ticketCount={tickets.length} 
        onOpenCreateModal={() => setIsModalOpen(true)} 
        onOpenProfileModal={() => setIsProfileOpen(true)} 
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards tickets={tickets} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-white/5 w-fit">
            {(['all', 'open', 'resolved'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your tickets..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="h-36 rounded-2xl glass-panel animate-pulse bg-slate-900/40" />
            ))}
          </div>
        ) : isError ? (
          <div className="p-8 rounded-2xl glass-panel text-center text-rose-400 text-sm">
            Failed to load support requests. Please try refreshing.
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="p-12 rounded-3xl glass-panel text-center border-dashed border-slate-800">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-3">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-white">No Tickets Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {searchQuery ? 'No requests matched your query.' : 'You have no tickets in this view. Click "New Ticket" to create one.'}
            </p>
            {!searchQuery && (
              <button onClick={() => setIsModalOpen(true)} className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors">
                Create First Ticket
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTickets.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </main>

      <CreateTicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  )
}
