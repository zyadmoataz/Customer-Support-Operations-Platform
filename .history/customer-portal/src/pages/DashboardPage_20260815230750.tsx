import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import type { SupportTicket } from '../types'
import { ticketService } from '../services/ticket.service'
import { notify } from '../lib/toast'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { TicketListView } from '../components/TicketList/TicketListView'
import { FAQView } from '../components/FAQ/FAQView'
import { SettingsView } from '../components/Settings/SettingsView'
import { CreateTicketModal } from '../components/CreateTicketModal/CreateTicketModal'

export function DashboardPage() {
  const { user, profile } = useAuth()
  const [activeNavTab, setActiveNavTab] = useState('tickets')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: tickets = [], isLoading, isError } = useQuery<SupportTicket[]>({
    queryKey: ['support_requests', user?.id],
    queryFn: async () => {
      try {
        return await ticketService.getTickets()
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to load tickets'
        notify.error(msg)
        throw err
      }
    },
    enabled: !!user?.id,
  })

  return (
    <div className="h-screen w-full bg-brand-bg text-slate-100 flex flex-col lg:flex-row overflow-hidden selection:bg-indigo-500/30">
      <Sidebar
        activeTab={activeNavTab}
        onTabChange={(tab) => setActiveNavTab(tab)}
        ticketCount={tickets.length}
      />

      <main className="flex-1 h-full overflow-y-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-10 pb-16">
        <div className="max-w-6xl w-full mx-auto">
          {/* Top Header with Generous Spacing */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/5">
            <div>
              <p className="text-xs text-slate-400 font-medium mb-1">
                Welcome back, <span className="text-white font-semibold">{profile?.full_name || 'Customer'}</span>
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {activeNavTab === 'tickets' && 'Customer Inquiries & Support Desk'}
                {activeNavTab === 'faq' && 'Knowledge Base & Help Center'}
                {activeNavTab === 'settings' && 'Account & Security Preferences'}
              </h1>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all flex-shrink-0 w-fit"
            >
              <Plus className="w-4 h-4 flex-shrink-0" />
              <span>New Support Request</span>
            </button>
          </div>

          {activeNavTab === 'tickets' && (
            <TicketListView tickets={tickets} isLoading={isLoading} isError={isError} />
          )}
          {activeNavTab === 'faq' && <FAQView />}
          {activeNavTab === 'settings' && <SettingsView />}
        </div>
      </main>

      <CreateTicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
