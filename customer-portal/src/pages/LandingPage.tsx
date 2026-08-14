import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Shield, Headphones, Zap, Lock, ArrowRight, CheckCircle2, Layers } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function LandingPage() {
  const navigate = useNavigate()
  const { session } = useAuth()

  return (
    <div className="min-h-screen w-full bg-brand-bg bg-radial-glow bg-no-repeat text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-30 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-glow text-white font-bold text-sm">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold text-white tracking-tight text-sm sm:text-base">Support Platform</span>
              <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                Milestone 1 Live
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="http://localhost:4200" 
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40 text-xs font-semibold transition-all"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Staff Workspace</span>
            </a>
            
            <button
              onClick={() => navigate(session ? '/dashboard' : '/login')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm transition-all shadow-md shadow-indigo-600/20"
            >
              <span>{session ? 'Go to Dashboard' : 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-6 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>PostgreSQL + Supabase RLS Active • Dual Frontends Online</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-3xl leading-tight"
        >
          Enterprise Support <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">
            Operations Platform
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed"
        >
          A unified, real-time customer support architecture with fine-grained role-based access control, PostgreSQL row-level security, and reactive interfaces.
        </motion.p>

        {/* Dual Portal Launcher Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mt-12 text-left"
        >
          {/* Customer Portal Card */}
          <div className="relative group rounded-3xl glass-panel p-8 border border-indigo-500/30 transition-all duration-300 hover:border-indigo-500/60 hover:shadow-glow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                React 18 + Vite
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">Customer Portal</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Submit support tickets with category & priority, track real-time issue progress, search ticket history, and manage profile settings.
            </p>

            <div className="mt-6 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>Submit & search tickets with instant validation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>Row-Level Security (only view own tickets)</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/20"
              >
                <span>Launch Customer Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] text-slate-500">customer&#64;portal.com</span>
            </div>
          </div>

          {/* Support Workspace Card */}
          <div className="relative group rounded-3xl glass-panel p-8 border border-emerald-500/30 transition-all duration-300 hover:border-emerald-500/60 hover:shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Angular 17 Signals
              </span>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">Support Staff Workspace</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Triage active ticket queue, update statuses (`In Progress` $\rightarrow$ `Resolved`), and access the Executive Manager Console.
            </p>

            <div className="mt-6 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Fine-grained reactive triage with Angular Signals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Manager Console for queue distribution & metrics</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
              <a
                href="http://localhost:4200"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-md shadow-emerald-600/20"
              >
                <span>Launch Staff Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-[11px] text-slate-500">agent&#64;support.com</span>
            </div>
          </div>
        </motion.div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full mt-16 text-left">
          <div className="p-5 rounded-2xl glass-panel border border-white/5">
            <div className="p-2 rounded-xl bg-slate-900 w-fit text-indigo-400 mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-white">PostgreSQL RLS Security</h4>
            <p className="text-xs text-slate-400 mt-1">Data protection enforced at the database level with PostgreSQL row policies.</p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-white/5">
            <div className="p-2 rounded-xl bg-slate-900 w-fit text-sky-400 mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-white">Fine-Grained Signals</h4>
            <p className="text-xs text-slate-400 mt-1">Angular Signals and TanStack React Query for instantaneous state updates.</p>
          </div>

          <div className="p-5 rounded-2xl glass-panel border border-white/5">
            <div className="p-2 rounded-xl bg-slate-900 w-fit text-emerald-400 mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-white">Role-Based Access</h4>
            <p className="text-xs text-slate-400 mt-1">Strict isolation between Customer, Support Agent, and Manager privileges.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>Customer Support Operations Platform • Milestone 1 Architecture</p>
      </footer>
    </div>
  )
}
