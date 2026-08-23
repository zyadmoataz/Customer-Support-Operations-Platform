import { Paperclip, Download, FileText, Image as ImageIcon } from 'lucide-react'
import type { TicketAttachment } from '@/types'

interface AttachmentListProps {
  attachments: TicketAttachment[]
  isLoading: boolean
  getDownloadUrl: (path: string) => string
}

export function AttachmentList({ attachments, isLoading, getDownloadUrl }: AttachmentListProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  if (isLoading) {
    return <div className="h-12 rounded-xl bg-slate-950/60 animate-pulse" />
  }

  if (attachments.length === 0) {
    return (
      <div className="py-4 text-center text-xs text-slate-500 bg-slate-950/30 rounded-2xl border border-dashed border-slate-800">
        <Paperclip className="w-4 h-4 mx-auto mb-1 opacity-50" />
        <span>No attachments uploaded for this ticket.</span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto">
      {attachments.map((file) => {
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
                <p className="text-[10px] text-slate-500">{formatFileSize(file.file_size)}</p>
              </div>
            </div>
            <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 flex-shrink-0 ml-2" />
          </a>
        )
      })}
    </div>
  )
}
