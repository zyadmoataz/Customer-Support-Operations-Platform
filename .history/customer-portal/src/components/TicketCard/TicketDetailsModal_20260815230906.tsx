import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, FileText, Lock } from "lucide-react";
import type { SupportTicket, TicketStatus } from "../../types/ticket";

interface TicketDetailsModalProps {
  ticket: SupportTicket | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusMap: Record<
  TicketStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  open: {
    label: "Open • In Queue",
    bg: "bg-sky-500/10 border-sky-500/25",
    text: "text-sky-400",
    dot: "bg-sky-400",
  },
  in_progress: {
    label: "In Progress • Under Investigation",
    bg: "bg-amber-500/10 border-amber-500/25",
    text: "text-amber-400",
    dot: "bg-amber-400",
  },
  resolved: {
    label: "Resolved & Verified",
    bg: "bg-emerald-500/10 border-emerald-500/25",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
  },
};

export function TicketDetailsModal({
  ticket,
  isOpen,
  onClose,
}: TicketDetailsModalProps) {
  if (!isOpen || !ticket) return null;

  const status = statusMap[ticket.status] || statusMap.open;
  const createdDate = new Date(ticket.created_at).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <AnimatePresence>
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md'>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          className='w-full max-w-2xl p-6 sm:p-8 rounded-3xl glass-panel shadow-glow border border-indigo-500/20 max-h-[90vh] overflow-y-auto'
        >
          {/* Header */}
          <div className='flex items-start justify-between gap-4 pb-4 border-b border-slate-800'>
            <div>
              <div className='flex items-center gap-2 mb-1.5'>
                <span className='font-mono text-xs text-indigo-400 font-bold px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20'>
                  ID: {ticket.id.slice(0, 8)}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${status.bg} ${status.text}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse`}
                  />
                  {status.label}
                </span>
              </div>
              <h2 className='text-xl font-bold text-white tracking-tight'>
                {ticket.title || "Support Request"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className='p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors'
            >
              <X className='w-5 h-5' />
            </button>
          </div>

          {/* Ticket Metadata Pill Grid */}
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 my-5 text-xs'>
            <div className='p-3 rounded-2xl bg-slate-900/80 border border-white/5'>
              <span className='text-slate-400 block mb-1'>Category</span>
              <span className='font-semibold text-white'>
                {ticket.category || "General Inquiries"}
              </span>
            </div>
            <div className='p-3 rounded-2xl bg-slate-900/80 border border-white/5'>
              <span className='text-slate-400 block mb-1'>Priority Level</span>
              <span className='font-bold uppercase tracking-wider text-amber-400'>
                {ticket.priority}
              </span>
            </div>
            <div className='p-3 rounded-2xl bg-slate-900/80 border border-white/5 col-span-2 sm:col-span-1'>
              <span className='text-slate-400 block mb-1'>Submitted On</span>
              <span className='font-medium text-slate-300'>{createdDate}</span>
            </div>
          </div>

          {/* Description */}
          <div className='space-y-2 mb-6'>
            <h4 className='text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5'>
              <FileText className='w-3.5 h-3.5 text-indigo-400' />
              <span>Issue Description</span>
            </h4>
            <div className='p-4 rounded-2xl bg-slate-900/90 border border-white/5 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap'>
              {ticket.description}
            </div>
          </div>

          {/* Official Support Resolution (if present) */}
          {ticket.resolution_note && (
            <div className='space-y-2 mb-6'>
              <h4 className='text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5'>
                <CheckCircle2 className='w-3.5 h-3.5' />
                <span>Official Support Resolution</span>
              </h4>
              <div className='p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/25 text-xs sm:text-sm text-slate-200 leading-relaxed'>
                {ticket.resolution_note}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className='pt-4 border-t border-slate-800 flex items-center justify-between'>
            <span className='text-xs text-slate-500 flex items-center gap-1.5'>
              <Lock className='w-3.5 h-3.5' />
              <span>Tenant Isolation Active (RLS)</span>
            </span>
            <button
              onClick={onClose}
              className='px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors'
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
