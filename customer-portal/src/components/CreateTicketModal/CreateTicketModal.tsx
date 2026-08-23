import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { createTicketSchema } from '@/schemas'
import type { CreateTicketFormValues } from '@/schemas'
import { useCreateTicketMutation } from '@/hooks'
import { CustomSelect } from '@/components/ui/CustomSelect'

interface CreateTicketModalProps {
  isOpen: boolean
  onClose: () => void
}

const CATEGORIES = [
  { value: 'Technical Issue', label: 'Technical Issue' },
  { value: 'Billing & Plans', label: 'Billing & Plans' },
  { value: 'Account Access', label: 'Account Access' },
  { value: 'Feature Request', label: 'Feature Request' },
]

const PRIORITIES = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' },
  { value: 'urgent', label: 'Urgent SLA Priority' },
]

export function CreateTicketModal({ isOpen, onClose }: CreateTicketModalProps) {
  const { user } = useAuth()
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<CreateTicketFormValues>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      category: 'Technical Issue',
    },
  })

  const { createTicket, isPending } = useCreateTicketMutation(user?.id, {
    onSuccess: () => {
      reset()
      onClose()
    },
  })

  if (!isOpen) return null

  const onValidSubmit = (data: CreateTicketFormValues) => {
    createTicket(data)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-lg p-5 sm:p-8 rounded-3xl glass-panel shadow-glow border border-brand-primary max-h-[92vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-brand-border">
            <div>
              <h2 className="text-xl font-bold text-text-primary tracking-tight">Create Support Request</h2>
              <p className="text-xs text-text-tertiary mt-0.5">Submit your inquiry to the active engineering queue</p>
            </div>
            <button onClick={onClose} className="text-text-tertiary hover:text-text-primary p-1.5 rounded-xl hover:bg-brand-surface border border-transparent hover:border-brand-border transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onValidSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-1.5">Ticket Subject *</label>
              <input 
                {...register('title')} 
                placeholder="e.g. Authentication token expiring prematurely" 
                className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-surface border text-text-primary text-xs placeholder-text-muted focus:outline-none focus:ring-2 transition-all ${
                  errors.title ? 'border-state-danger focus:ring-state-danger' : 'border-brand-border focus:border-brand-primary focus:ring-brand-primary/20'
                }`} 
              />
              {errors.title && <p className="text-state-danger text-xs mt-1 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3 flex-shrink-0" /><span>{errors.title.message}</span></p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Controller name="category" control={control} render={({ field }) => (
                <CustomSelect label="Category" required value={field.value} onChange={field.onChange} options={CATEGORIES} error={errors.category?.message} />
              )} />
              <Controller name="priority" control={control} render={({ field }) => (
                <CustomSelect label="Priority" required value={field.value} onChange={field.onChange} options={PRIORITIES} error={errors.priority?.message} />
              )} />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-1.5">Issue Description *</label>
              <textarea 
                {...register('description')} 
                rows={4} 
                placeholder="Describe the issue in detail, including steps to reproduce and observed behavior..." 
                className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-surface border text-text-primary text-xs placeholder-text-muted focus:outline-none focus:ring-2 transition-all ${
                  errors.description ? 'border-state-danger focus:ring-state-danger' : 'border-brand-border focus:border-brand-primary focus:ring-brand-primary/20'
                }`} 
              />
              {errors.description && <p className="text-state-danger text-xs mt-1 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3 flex-shrink-0" /><span>{errors.description.message}</span></p>}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-border">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-text-tertiary hover:text-text-primary hover:bg-brand-elevated text-xs font-semibold transition-colors">Cancel</button>
              <button type="submit" disabled={isPending} className="px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-text-primary text-xs font-semibold transition-all shadow-md shadow-glow disabled:opacity-50">
                {isPending ? 'Submitting Request...' : 'Submit Support Request'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
