import { useState } from 'react'
import type { SupportTicket } from '@/types'
import type { TicketFilters } from '@/api/tickets'
import { StatsCards } from '@/components/StatsCards/StatsCards'
import { TicketCard } from '@/components/TicketCard/TicketCard'
import { TicketDetailsModal } from '@/components/TicketCard/TicketDetailsModal'
import { TicketToolbar } from './TicketToolbar'
import { TicketTable } from './TicketTable'
import { TicketPagination } from './TicketPagination'
import { LoadingSkeleton, ErrorState, EmptyState } from './TicketStates'

interface TicketListViewProps {
  tickets: SupportTicket[]
  totalCount: number
  totalPages: number
  currentPage: number
  isLoading: boolean
  isError: boolean
  filters: TicketFilters
  onFiltersChange: (filters: TicketFilters) => void
  onPageChange: (page: number) => void
}

export function TicketListView({
  tickets,
  totalCount,
  totalPages,
  currentPage,
  isLoading,
  isError,
  filters,
  onFiltersChange,
  onPageChange,
}: TicketListViewProps) {
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)

  const hasActiveFilters = Boolean(
    (filters.status && filters.status !== 'all') ||
    (filters.priority && filters.priority !== 'all') ||
    (filters.category && filters.category !== 'all') ||
    (filters.dateRange && filters.dateRange !== 'all') ||
    filters.search
  )

  return (
    <div>
      <StatsCards tickets={tickets} totalCount={totalCount} />

      <TicketToolbar
        filters={filters}
        totalCount={totalCount}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onFiltersChange={onFiltersChange}
      />

      {isLoading ? (
        <LoadingSkeleton viewMode={viewMode} />
      ) : isError ? (
        <ErrorState />
      ) : tickets.length === 0 ? (
        <EmptyState hasFilters={hasActiveFilters} />
      ) : viewMode === 'table' ? (
        <TicketTable tickets={tickets} onSelectTicket={setSelectedTicket} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}

      <TicketPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        onPageChange={onPageChange}
      />

      {selectedTicket && (
        <TicketDetailsModal
          ticket={selectedTicket}
          isOpen={Boolean(selectedTicket)}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  )
}
