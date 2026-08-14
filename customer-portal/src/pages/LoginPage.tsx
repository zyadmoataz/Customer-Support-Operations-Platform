import { useState } from 'react'
import { supabase } from '../services/supabase'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { User, Eye, EyeOff, Sparkles, ArrowLeft, Headphones } from 'lucide-react'

const authSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type AuthFormValues = z.infer<typeof authSchema>

export function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
  })

  const handleFillDemoCustomer = () => {
    setValue('email', 'customer@portal.com')
    setValue('password', 'password123')
    toast.success('Filled Demo Customer Credentials!')
  }

  const onSubmit = async (data: AuthFormValues) => {
    try {
      const email = data.email.trim()
      const password = data.password.trim()

      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: email.split('@')[0], role: 'customer' } }
        })
        if (error) throw error
        toast.success('Account created! Please sign in.')
        setIsSignUp(false)
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        toast.success('Welcome back!')
        navigate('/dashboard')
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed'
      toast.error(errorMessage)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md p-8 rounded-3xl glass-panel shadow-glow mx-auto"
    >
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800/60">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <button
          type="button"
          onClick={handleFillDemoCustomer}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-[11px] font-semibold border border-indigo-500/30 transition-all"
          title="Autofill test credentials"
        >
          <Sparkles className="w-3 h-3 text-indigo-400" />
          <span>Fill Demo User</span>
        </button>
      </div>

      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-3">
          <User className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">{isSignUp ? 'Create Customer Account' : 'Customer Portal'}</h2>
        <p className="text-slate-400 text-sm mt-1">{isSignUp ? 'Sign up to manage your support requests' : 'Sign in to access your active tickets'}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Email Address</label>
          <input 
            type="email" 
            {...register('email')}
            className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-rose-500/50 focus:ring-rose-500/40' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
            placeholder="customer@portal.com"
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-rose-400 text-xs mt-1.5 font-medium">
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'} 
              {...register('password')}
              className={`w-full px-4 py-2.5 pr-11 rounded-xl bg-slate-900/80 border text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${errors.password ? 'border-rose-500/50 focus:ring-rose-500/40' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'}`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <AnimatePresence>
            {errors.password && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-rose-400 text-xs mt-1.5 font-medium">
                {errors.password.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <button 
          disabled={isSubmitting}
          type="submit" 
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-indigo-500/40"
        >
          {isSubmitting ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center space-y-3 pt-4 border-t border-slate-800/80">
        <button 
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="block w-full text-xs text-slate-400 hover:text-indigo-400 transition-colors font-medium"
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>

        <a 
          href="/support" 
          className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
        >
          <Headphones className="w-3.5 h-3.5" />
          <span>Support Staff? Switch to Support Workspace &rarr;</span>
        </a>
      </div>
    </motion.div>
  )
}
