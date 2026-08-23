import { useState } from 'react'
import { Send, RotateCcw, Lock } from 'lucide-react'

interface MessageInputProps {
  isResolved: boolean
  isSending: boolean
  isReopening: boolean
  onSendMessage: (body: string) => void
  onReopenTicket: () => void
}

export function MessageInput({
  isResolved,
  isSending,
  isReopening,
  onSendMessage,
  onReopenTicket,
}: MessageInputProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim() || isSending || isResolved) return
    onSendMessage(text.trim())
    setText('')
  }

  if (isResolved) {
    return (
      <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-amber-300">
          <Lock className="w-4 h-4 flex-shrink-0" />
          <span>Ticket is completed and locked. Need further support?</span>
        </div>
        <button
          type="button"
          onClick={onReopenTicket}
          disabled={isReopening}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md shadow-amber-600/20 transition-all disabled:opacity-50 flex-shrink-0"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isReopening ? 'animate-spin' : ''}`} />
          <span>{isReopening ? 'Reopening...' : 'Reopen Ticket'}</span>
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message or provide additional info to the support team..."
        rows={2}
        disabled={isSending}
        className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 focus:border-indigo-500 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all resize-none disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!text.trim() || isSending}
        className="self-end h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Send className="w-3.5 h-3.5" />
        <span>{isSending ? 'Sending...' : 'Send'}</span>
      </button>
    </form>
  )
}
