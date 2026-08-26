import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, Eye, EyeOff, Sparkles, ArrowLeft, Headphones, AlertCircle } from 'lucide-react'
import { loginSchema, signupSchema } from '@/schemas'
import type { LoginFormValues } from '@/schemas'
import { authApi } from '@/api'
import { notify } from '@/lib/toast'
import { PasswordComplexityHelper } from '@/components/ui/PasswordComplexityHelper'

export function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(isSignUp ? signupSchema : loginSchema),
  })

  const currentPassword = watch('password') || ''

  const handleFillDemoCustomer = () => {
    setValue('email', 'customer@portal.com')
    setValue('password', 'password123')
    notify.success('Loaded Customer Demo Credentials!')
  }

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const email = data.email.trim()
      const password = data.password.trim()

      if (isSignUp) {
        await authApi.signup(email, password)
        notify.success('Account created successfully! Welcome to Optima.')
        navigate('/dashboard')
      } else {
        await authApi.login(email, password)
        notify.success('Welcome back to Customer Portal!')
        navigate('/dashboard')
      }
    } catch (err: unknown) {
      const errorObj = err as { message?: string; error_description?: string } | null
      const msg = errorObj?.message || errorObj?.error_description || (err instanceof Error ? err.message : 'Authentication failed')
      notify.error(msg)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel shadow-glow mx-auto border border-brand-border"
    >
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-brand-border/60">
        <button type="button" onClick={() => navigate('/')} className="flex items-center gap-1.5 text-xs text-text-tertiary hover:text-text-primary transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <button type="button" onClick={handleFillDemoCustomer} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary text-[11px] font-semibold border border-brand-hover transition-all">
          <Sparkles className="w-3 h-3 text-brand-primary" />
          <span>Fill Demo User</span>
        </button>
      </div>

      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary text-brand-primary mb-3 shadow-inner">
          <User className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">{isSignUp ? 'Create Customer Account' : 'Customer Portal Sign In'}</h2>
        <p className="text-text-tertiary text-xs sm:text-sm mt-1">{isSignUp ? 'Sign up with strong password to manage support requests' : 'Sign in to access your personal active tickets'}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-1.5">Email Address</label>
          <input 
            type="email" 
            {...register('email')}
            className={`w-full px-4 py-2.5 rounded-xl bg-brand-surface/80 border text-text-primary text-xs placeholder-text-muted focus:outline-none focus:ring-2 transition-all ${
              errors.email ? 'border-state-danger focus:ring-state-danger' : 'border-brand-border focus:border-brand-primary focus:ring-brand-primary/20'
            }`}
            placeholder="customer@portal.com"
          />
          {errors.email && (
            <p className="text-state-danger text-xs mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.email.message}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-1.5">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'} 
              {...register('password')}
              className={`w-full px-4 py-2.5 pr-11 rounded-xl bg-brand-surface/80 border text-text-primary text-xs placeholder-text-muted focus:outline-none focus:ring-2 transition-all ${
                errors.password ? 'border-state-danger focus:ring-state-danger' : 'border-brand-border focus:border-brand-primary focus:ring-brand-primary/20'
              }`}
              placeholder="••••••••"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-colors p-1">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-state-danger text-xs mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{errors.password.message}</span>
            </p>
          )}
        </div>

        {isSignUp && <PasswordComplexityHelper password={currentPassword} />}

        <button disabled={isSubmitting} type="submit" className="w-full py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-text-primary font-medium text-xs sm:text-sm transition-all duration-200 shadow-lg shadow-glow disabled:opacity-50 hover:shadow-glow">
          {isSubmitting ? 'Authenticating...' : isSignUp ? 'Create Customer Account' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center space-y-3 pt-4 border-t border-brand-border/80">
        <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="block w-full text-xs text-text-tertiary hover:text-brand-primary transition-colors font-medium">
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
        <a href="/support/" className="inline-flex items-center gap-1.5 text-[11px] text-state-success hover:text-state-success font-semibold transition-colors">
          <Headphones className="w-3.5 h-3.5" />
          <span>Support Staff? Switch to Support Workspace &rarr;</span>
        </a>
      </div>
    </motion.div>
  )
}
