import { MessageSquare, User, ShieldCheck } from 'lucide-react'
import type { TicketMessage } from '@/types'

interface MessageThreadProps {
  messages: TicketMessage[]
  isLoading: boolean
  currentUserId?: string
}

export function MessageThread({ messages, isLoading, currentUserId }: MessageThreadProps) {
  if (isLoading) {
    return (
      <div className="space-y-3 py-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-16 rounded-2xl bg-slate-950/60 border border-slate-800/80 animate-pulse" />
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="py-8 text-center rounded-2xl bg-slate-950/40 border border-dashed border-slate-800 p-6">
        <MessageSquare className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-60" />
        <p className="text-xs font-semibold text-slate-300">No replies yet</p>
        <p className="text-[11px] text-slate-500 mt-0.5">Send a message below to communicate directly with our support team.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
      {messages.map((msg) => {
        const isMe = msg.author_id === currentUserId
        const isStaff = msg.author_role === 'agent' || msg.author_role === 'manager'

        return (
          <div
            key={msg.id}
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
              isStaff
                ? 'bg-indigo-950/30 border-indigo-500/30 text-slate-200 ml-2'
                : 'bg-slate-900/90 border-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5">
                {isStaff ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-400 bg-indigo-500/15 px-2 py-0.5 rounded-md border border-indigo-500/30">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{msg.author_name || 'Support Specialist'}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-md">
                    <User className="w-3 h-3 text-slate-400" />
                    <span>{isMe ? 'You' : msg.author_name || 'Customer'}</span>
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-500">
                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{msg.body}</p>
          </div>
        )
      })}
    </div>
  )
}
