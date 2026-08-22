import { motion } from 'framer-motion'
import { ArrowRight, Headphones, CheckCircle2, Shield, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="relative pt-12 sm:pt-20 pb-12 sm:pb-16 text-center max-w-5xl mx-auto px-4 overflow-hidden">
      {/* Background Radial Glow & Grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] h-[250px] sm:h-[380px] bg-radial-glow rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Pill Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-[11px] sm:text-xs font-semibold mb-6 shadow-glow max-w-full"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
        <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-indigo-400" /> Next-Gen Operations Platform</span>
        <span className="hidden xs:inline sm:inline text-slate-600">•</span>
        <span className="text-slate-300 flex items-center gap-1"><Shield className="w-3 h-3 text-emerald-400" /> SOC 2 Certified</span>
      </motion.div>

      {/* Hero Headline */}
      <motion.h1 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.12]"
      >
        Transform Customer Inquiries Into <br className="hidden sm:inline" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">
          Seamless Operational Clarity.
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 sm:mt-6 text-slate-300 text-xs sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed font-normal"
      >
        The unified customer support operations platform connecting end-users, support agents, and operations managers. Triage requests in seconds, protect enterprise SLAs, and deliver 5-star resolutions.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
      >
        <button
          onClick={() => navigate('/login')}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02]"
        >
          <span>Launch Customer Portal</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <a
          href="/support/"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 font-semibold text-xs sm:text-sm transition-all shadow-md hover:scale-[1.02]"
        >
          <Headphones className="w-4 h-4 text-emerald-400" />
          <span>Launch Staff Workspace</span>
        </a>
      </motion.div>

      {/* Value Assurance Checklist */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400 font-medium">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Real-time Triage & SLA Tracking</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Row-Level Security (RLS) Isolation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Instant Setup in &lt; 2 Minutes</span>
        </div>
      </div>

      {/* Social Proof Logos Bar */}
      <div className="mt-12 sm:mt-16 pt-8 border-t border-white/5">
        <p className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
          Powering Support Operations for Global High-Growth Companies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all">
          <span className="font-extrabold text-base sm:text-xl text-slate-300 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> ACME Corp
          </span>
          <span className="font-extrabold text-base sm:text-xl text-slate-300 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> NovaPay Global
          </span>
          <span className="font-extrabold text-base sm:text-xl text-slate-300 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> CloudScale Inc
          </span>
          <span className="font-extrabold text-base sm:text-xl text-slate-300 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> HyperSync AI
          </span>
          <span className="font-extrabold text-base sm:text-xl text-slate-300 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> DevFlow HQ
          </span>
        </div>
      </div>
    </section>
  )
}
