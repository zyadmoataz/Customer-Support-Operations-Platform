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
          <div key={i} className="h-16 rounded-2xl bg-brand-bg/60 border border-brand-border/80 animate-pulse" />
        ))}
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="py-8 text-center rounded-2xl bg-brand-bg/40 border border-dashed border-brand-border p-6">
        <MessageSquare className="w-8 h-8 text-text-tertiary mx-auto mb-3" />
        <p className="text-text-secondary font-medium mb-1">No messages yet</p>
        <p className="text-sm text-text-muted">Start the conversation below.</p>
      </div>
    )
  }

  return (
    <div className="space-y-5 flex-1 min-h-0 py-2 px-1">
      {messages.map((msg) => {
        const isMe = msg.author_id === currentUserId
        const isStaff = msg.author_role === 'agent' || msg.author_role === 'manager'

        return (
          <div
            key={msg.id}
            className={`p-5 rounded-2xl border transition-all ${
              isStaff
                ? 'bg-brand-surface border-brand-border text-text-primary ml-2'
                : 'bg-brand-surface/90 border-brand-border text-text-primary'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                {isStaff ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-text-primary bg-brand-elevated px-2 py-0.5 rounded-md border border-brand-border">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{msg.author_name || 'Support Specialist'}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-text-secondary bg-brand-elevated px-2 py-0.5 rounded-md border border-brand-border">
                    <User className="w-3 h-3 text-text-tertiary" />
                    <span>{isMe ? 'You' : msg.author_name || 'Customer'}</span>
                  </span>
                )}
              </div>
              <span className="text-[10px] text-text-muted">
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
