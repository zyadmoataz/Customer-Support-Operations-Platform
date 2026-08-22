import { Inbox, RefreshCw } from 'lucide-react'

interface LoadingSkeletonProps {
  viewMode: 'table' | 'cards'
}

export function LoadingSkeleton({ viewMode }: LoadingSkeletonProps) {
  if (viewMode === 'table') {
    return (
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-4 border-b border-slate-800/60 last:border-0">
            <div className="w-20 h-4 rounded animate-shimmer" />
            <div className="flex-1 h-4 rounded animate-shimmer" />
            <div className="w-16 h-4 rounded animate-shimmer hidden md:block" />
            <div className="w-20 h-4 rounded animate-shimmer" />
            <div className="w-16 h-4 rounded animate-shimmer hidden sm:block" />
          </div>
        ))}
      </div>
    )
  }
  return (
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
  )
}

export function ErrorState() {
  return (
    <div className="text-center py-16 p-6 rounded-3xl glass-panel border border-rose-500/20 max-w-md mx-auto">
      <RefreshCw className="w-8 h-8 text-rose-400 mx-auto mb-3 animate-spin" />
      <h4 className="text-sm font-bold text-white mb-1">Failed to Load Support Tickets</h4>
      <p className="text-xs text-slate-400">Please verify your internet connection or check back momentarily.</p>
    </div>
  )
}

interface EmptyStateProps {
  hasFilters: boolean
}

export function EmptyState({ hasFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-16 p-8 rounded-3xl glass-panel border border-white/5 max-w-lg mx-auto">
      <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
        <Inbox className="w-6 h-6 text-slate-400" />
      </div>
      <h4 className="text-base font-bold text-white mb-1">No Tickets Found</h4>
      <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
        {hasFilters
          ? 'No tickets match your current filters. Try adjusting or clearing filters.'
          : 'You have not submitted any support tickets yet.'}
      </p>
    </div>
  )
}
