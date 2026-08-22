import { useState } from 'react'
import type { TicketFilters } from '@/api/tickets'
import {
  Search, X, LayoutGrid, LayoutList, Filter, CalendarDays
} from 'lucide-react'
import {
  STATUS_OPTIONS, PRIORITY_OPTIONS, CATEGORY_OPTIONS, DATE_RANGE_OPTIONS
} from './ticketListConstants'
import { SelectFilter } from './SelectFilter'

interface TicketToolbarProps {
  filters: TicketFilters
  totalCount: number
  viewMode: 'table' | 'cards'
  onViewModeChange: (mode: 'table' | 'cards') => void
  onFiltersChange: (filters: TicketFilters) => void
}

export function TicketToolbar({
  filters,
  totalCount,
  viewMode,
  onViewModeChange,
  onFiltersChange,
}: TicketToolbarProps) {
  const [searchInput, setSearchInput] = useState(filters.search || '')
  const [showFilters, setShowFilters] = useState(false)

  const activeFilterCount = [
    filters.status && filters.status !== 'all',
    filters.priority && filters.priority !== 'all',
    filters.category && filters.category !== 'all',
    filters.dateRange && filters.dateRange !== 'all',
  ].filter(Boolean).length

  const handleSearchSubmit = () => {
    onFiltersChange({ ...filters, search: searchInput || undefined })
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearchSubmit()
  }

  const clearSearch = () => {
    setSearchInput('')
    onFiltersChange({ ...filters, search: undefined })
  }

  const updateFilter = (key: keyof TicketFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value === 'all' ? undefined : value })
  }

  const clearAllFilters = () => {
    setSearchInput('')
    onFiltersChange({})
  }

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 mb-4 shadow-lg shadow-black/30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <div className="flex items-center px-3 py-2 rounded-xl bg-slate-950/90 border border-slate-800 focus-within:border-indigo-500 transition-all flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 flex-shrink-0 mr-2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              onBlur={handleSearchSubmit}
              placeholder="Search by title, description, category..."
              className="w-full bg-transparent border-0 p-0 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
            {searchInput && (
              <button onClick={clearSearch} className="text-slate-500 hover:text-slate-300 p-0.5">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
              showFilters || activeFilterCount > 0
                ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300'
                : 'bg-slate-950/90 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-indigo-600 text-white font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">
            {totalCount} ticket{totalCount !== 1 ? 's' : ''}
          </span>
          <div className="flex items-center p-0.5 rounded-lg bg-slate-950/80 border border-slate-800">
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Table view"
            >
              <LayoutList className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onViewModeChange('cards')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'cards' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Card view"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
          <SelectFilter
            label="Status"
            value={filters.status || 'all'}
            options={STATUS_OPTIONS}
            onChange={(v) => updateFilter('status', v)}
          />
          <SelectFilter
            label="Priority"
            value={filters.priority || 'all'}
            options={PRIORITY_OPTIONS}
            onChange={(v) => updateFilter('priority', v)}
          />
          <SelectFilter
            label="Category"
            value={filters.category || 'all'}
            options={CATEGORY_OPTIONS}
            onChange={(v) => updateFilter('category', v)}
          />
          <SelectFilter
            label="Date"
            value={filters.dateRange || 'all'}
            options={DATE_RANGE_OPTIONS}
            onChange={(v) => updateFilter('dateRange', v)}
            icon={<CalendarDays className="w-3 h-3 text-slate-400" />}
          />
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold px-2 py-1 rounded-lg hover:bg-rose-500/10 transition-all"
            >
              Clear All
            </button>
          )}
        </div>
      )}
    </div>
  )
}
