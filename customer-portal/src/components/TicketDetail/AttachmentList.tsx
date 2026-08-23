import { Paperclip, Download, FileText, Image as ImageIcon, User, Shield } from 'lucide-react'
import type { TicketAttachment } from '@/types'

interface AttachmentListProps {
  attachments: TicketAttachment[]
  isLoading: boolean
  customerId?: string
  getDownloadUrl: (path: string) => string
}

export function AttachmentList({ attachments, isLoading, customerId, getDownloadUrl }: AttachmentListProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  if (isLoading) {
    return <div className="h-16 rounded-2xl bg-slate-950/60 animate-pulse" />
  }

  if (attachments.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-slate-500 bg-slate-950/30 rounded-2xl border border-dashed border-slate-800 p-6">
        <Paperclip className="w-6 h-6 mx-auto mb-2 opacity-50 text-indigo-400" />
        <p className="font-semibold text-slate-300">No Documents Attached</p>
        <p className="text-[11px] text-slate-500 mt-0.5">Use the upload box above to attach diagnostic logs, screenshots, or receipts.</p>
      </div>
    )
  }

  const customerFiles = customerId ? attachments.filter((f) => f.uploaded_by === customerId) : attachments
  const staffFiles = customerId ? attachments.filter((f) => f.uploaded_by !== customerId) : []

  return (
    <div className="space-y-4">
      {/* 1. Customer Uploads */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" />
          <span>Your Uploads ({customerFiles.length})</span>
        </h4>
        {customerFiles.length === 0 ? (
          <p className="text-[11px] text-slate-500 italic px-1">No files uploaded by you yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {customerFiles.map((file) => {
              const isImg = file.file_type.startsWith('image/')
              const url = getDownloadUrl(file.file_path)

              return (
                <a
                  key={file.id}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 text-indigo-400">
                      {isImg ? <ImageIcon className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white group-hover:text-indigo-300 truncate transition-colors">
                        {file.file_name}
                      </p>
                      <p className="text-[10px] text-slate-500">{formatFileSize(file.file_size)} • Your Submission</p>
                    </div>
                  </div>
                  <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 flex-shrink-0 ml-2" />
                </a>
              )
            })}
          </div>
        )}
      </div>

      {/* 2. Staff Attachments */}
      {staffFiles.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Support Specialist Attachments ({staffFiles.length})</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {staffFiles.map((file) => {
              const isImg = file.file_type.startsWith('image/')
              const url = getDownloadUrl(file.file_path)

              return (
                <a
                  key={file.id}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
                      {isImg ? <ImageIcon className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white group-hover:text-emerald-300 truncate transition-colors">
                        {file.file_name}
                      </p>
                      <p className="text-[10px] text-slate-500">{formatFileSize(file.file_size)} • By Support Specialist</p>
                    </div>
                  </div>
                  <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 flex-shrink-0 ml-2" />
                </a>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
