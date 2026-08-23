import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, MessageSquare, Paperclip } from 'lucide-react'
import type { SupportTicket } from '@/types'
import { useAuth } from '@/context/AuthContext'
import {
  useTicketDetailQuery,
  useReopenTicketMutation,
  useConversationQuery,
  useSendMessageMutation,
  useAttachmentsQuery,
  useUploadAttachmentMutation,
} from '@/hooks'
import { MessageThread } from './MessageThread'
import { MessageInput } from './MessageInput'
import { AttachmentList } from './AttachmentList'
import { AttachmentUploader } from './AttachmentUploader'
import { TicketOverviewTab } from './TicketOverviewTab'

interface TicketDetailModalProps {
  ticket: SupportTicket | null
  isOpen: boolean
  onClose: () => void
}

export function TicketDetailModal({ ticket: initialTicket, isOpen, onClose }: TicketDetailModalProps) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'messages' | 'attachments'>('overview')

  const { ticket = initialTicket } = useTicketDetailQuery(initialTicket?.id)
  const { reopenTicket, isPending: isReopening } = useReopenTicketMutation(initialTicket?.id)

  const { messages, isLoading: isMsgLoading } = useConversationQuery(ticket?.id)
  const { sendMessage, isPending: isSending } = useSendMessageMutation(ticket?.id, user?.id)

  const { attachments, isLoading: isAttLoading, getDownloadUrl } = useAttachmentsQuery(ticket?.id)
  const { uploadAttachment, isPending: isUploading } = useUploadAttachmentMutation(ticket?.id, user?.id)

  if (!isOpen || !ticket) return null


  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-brand-bg/90 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-3xl p-6 sm:p-8 rounded-3xl glass-panel shadow-glow border border-brand-primary max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-brand-border flex-shrink-0">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-md border border-brand-primary">
                  ID: #{ticket.id.slice(0, 8)}
                </span>
                <span className="text-xs text-text-tertiary">{ticket.category || 'Support'}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight truncate max-w-[450px]">
                {ticket.title || 'Support Request'}
              </h2>
            </div>
            <button onClick={onClose} className="text-text-tertiary hover:text-text-primary p-1.5 rounded-xl hover:bg-brand-surface transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 my-3 rounded-2xl bg-brand-bg/80 border border-brand-border flex-shrink-0">
            {(
              [
                { id: 'overview', label: 'Overview & Status', icon: FileText },
                { id: 'messages', label: `Messages (${messages.length})`, icon: MessageSquare },
                { id: 'attachments', label: `Attachments (${attachments.length})`, icon: Paperclip },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                    active ? 'bg-brand-primary text-text-primary shadow-sm' : 'text-text-tertiary hover:text-text-primary'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {activeTab === 'overview' && (
              <TicketOverviewTab ticket={ticket} onReopen={reopenTicket} isReopening={isReopening} />
            )}

            {activeTab === 'messages' && (
              <div className="space-y-3">
                <MessageThread messages={messages} isLoading={isMsgLoading} currentUserId={user?.id} />
                <MessageInput
                  isResolved={ticket.status === 'resolved'}
                  isSending={isSending}
                  isReopening={isReopening}
                  onSendMessage={sendMessage}
                  onReopenTicket={reopenTicket}
                />
              </div>
            )}

            {activeTab === 'attachments' && (
              <div className="space-y-4">
                <AttachmentUploader isUploading={isUploading} onUploadFile={uploadAttachment} />
                <AttachmentList
                  attachments={attachments}
                  isLoading={isAttLoading}
                  customerId={ticket.customer_id}
                  getDownloadUrl={getDownloadUrl}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
