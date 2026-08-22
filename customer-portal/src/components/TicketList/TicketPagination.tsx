import { ChevronLeft, ChevronRight } from 'lucide-react'

interface TicketPaginationProps {
  currentPage: number
  totalPages: number
  totalCount: number
  onPageChange: (page: number) => void
}

function generatePageNumbers(current: number, total: number): (number | string)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | string)[] = [1]
  if (current > 3) pages.push('...')
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i)
  }
  if (current < total - 2) pages.push('...')
  pages.push(total)
  return pages
}

export function TicketPagination({
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
}: TicketPaginationProps) {
  if (totalPages <= 1) return null

  const fromItem = totalCount === 0 ? 0 : (currentPage - 1) * 10 + 1
  const toItem = Math.min(currentPage * 10, totalCount)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 px-1">
      <span className="text-xs text-slate-400 font-medium">
        Showing {fromItem}–{toItem} of {totalCount} tickets
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-indigo-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Prev
        </button>
        {generatePageNumbers(currentPage, totalPages).map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="px-2 text-xs text-slate-500">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                currentPage === p
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500/40'
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-indigo-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Next
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
