import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, FileText, Lock } from 'lucide-react'
import type { SupportTicket, TicketStatus } from '@/types'

interface TicketDetailsModalProps {
  ticket: SupportTicket | null
  isOpen: boolean
  onClose: () => void
}

const statusTimelines: Record<TicketStatus, { step: number; label: string }> = {
  open: { step: 1, label: 'Ticket Submitted & Queued' },
  in_progress: { step: 2, label: 'Under Active Investigation' },
  resolved: { step: 3, label: 'Issue Resolved & Verified' },
}

export function TicketDetailsModal({ ticket, isOpen, onClose }: TicketDetailsModalProps) {
  if (!isOpen || !ticket) return null

  const currentTimeline = statusTimelines[ticket.status] || statusTimelines.open
  const createdDate = new Date(ticket.created_at).toLocaleString()
  const updatedDate = new Date(ticket.updated_at).toLocaleString()

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-xl p-6 sm:p-8 rounded-3xl glass-panel shadow-glow border border-indigo-500/20 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                  ID: #{ticket.id.slice(0, 8)}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {ticket.category || 'General Support'}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">{ticket.title || 'Support Request'}</h2>
            </div>
            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Status Timeline */}
          <div className="mb-6 p-4 rounded-2xl bg-slate-900/90 border border-white/5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Resolution Progress
            </h4>
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
              {[
                { step: 1, label: 'Submitted' },
                { step: 2, label: 'In Triage' },
                { step: 3, label: 'Resolved' },
              ].map((item) => {
                const isPassed = currentTimeline.step >= item.step
                return (
                  <div key={item.step} className="flex flex-col items-center relative z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isPassed ? 'bg-indigo-600 text-white ring-4 ring-indigo-500/20' : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}>
                      {item.step}
                    </div>
                    <span className={`text-[11px] font-medium mt-1.5 ${isPassed ? 'text-slate-200' : 'text-slate-500'}`}>
                      {item.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Customer Description</span>
              </h4>
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {ticket.description}
              </div>
            </div>

            {/* Agent Resolution Summary (If resolved) */}
            {ticket.resolution_note && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Official Resolution Summary</span>
                </div>
                <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {ticket.resolution_note}
                </p>
                <div className="mt-3 pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[11px] text-emerald-400/80">
                  <span className="flex items-center gap-1 font-medium">
                    <Lock className="w-3 h-3" />
                    <span>Ticket Closed & Verified</span>
                  </span>
                  <span>Resolved: {updatedDate}</span>
                </div>
              </div>
            )}

            {/* Metadata Footer */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 font-medium">
              <span>Submitted: {createdDate}</span>
              <span>Priority: <strong className="uppercase text-slate-400">{ticket.priority}</strong></span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
