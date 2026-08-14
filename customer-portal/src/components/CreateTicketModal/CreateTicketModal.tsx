import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../services/supabase'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { NewTicketInput } from '../../types/ticket'
import { X } from 'lucide-react'

const createTicketSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title too long'),
  category: z.string().min(1, 'Please select a category'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  description: z.string().min(10, 'Please describe your issue with at least 10 characters'),
})

interface CreateTicketModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateTicketModal({ isOpen, onClose }: CreateTicketModalProps) {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewTicketInput>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: { priority: 'medium', category: 'Technical Issue' }
  })

  const mutation = useMutation({
    mutationFn: async (data: NewTicketInput) => {
      const { error } = await supabase.from('support_requests').insert({
        customer_id: user?.id,
        title: data.title,
        description: data.description,
        category: data.category,
        priority: data.priority,
        status: 'open',
      })
      if (error) throw error
    },
    onSuccess: () => {
      toast.success('Support ticket created successfully!')
      queryClient.invalidateQueries({ queryKey: ['tickets'] })
      reset()
      onClose()
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to create ticket')
    }
  })

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-lg p-6 sm:p-8 rounded-3xl glass-panel shadow-glow border border-indigo-500/20"
        >
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Create Support Request</h2>
              <p className="text-xs text-slate-400 mt-0.5">Submit your request to our engineering support team</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Ticket Subject</label>
              <input {...register('title')} placeholder="e.g. Cannot access payment checkout" className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
              {errors.title && <p className="text-rose-400 text-xs mt-1">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Category</label>
                <select {...register('category')} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500">
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Billing & Plans">Billing & Plans</option>
                  <option value="Account Access">Account Access</option>
                  <option value="Feature Request">Feature Request</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Priority</label>
                <select {...register('priority')} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Description</label>
              <textarea {...register('description')} rows={3} placeholder="Please provide detailed steps to reproduce..." className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
              {errors.description && <p className="text-rose-400 text-xs mt-1">{errors.description.message}</p>}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-medium transition-colors">Cancel</button>
              <button type="submit" disabled={mutation.isPending} className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50">
                {mutation.isPending ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
