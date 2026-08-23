import { useState, useRef } from 'react'
import { Upload, Loader2 } from 'lucide-react'

interface AttachmentUploaderProps {
  isUploading: boolean
  onUploadFile: (file: File) => void
}

export function AttachmentUploader({ isUploading, onUploadFile }: AttachmentUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file) return
    onUploadFile(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => !isUploading && fileInputRef.current?.click()}
      className={`p-3.5 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center ${
        dragActive
          ? 'border-brand-primary bg-brand-primary/10'
          : 'border-brand-border hover:border-brand-primary bg-brand-bg/40'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        disabled={isUploading}
      />
      <div className="flex items-center justify-center gap-2 text-xs font-semibold text-text-secondary">
        {isUploading ? (
          <>
            <Loader2 className="w-4 h-4 text-brand-primary animate-spin" />
            <span>Uploading attachment...</span>
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 text-brand-primary" />
            <span>Click or drag a file to attach (Max 10MB)</span>
          </>
        )}
      </div>
    </div>
  )
}
