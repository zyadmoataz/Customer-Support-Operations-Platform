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
        className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-brand-surface/90 border border-brand-hover text-brand-primary text-[11px] sm:text-xs font-semibold mb-6 shadow-glow max-w-full"
      >
        <span className="w-2 h-2 rounded-full bg-state-success animate-pulse flex-shrink-0" />
        <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-brand-primary" /> Next-Gen Operations Platform</span>
        <span className="hidden xs:inline sm:inline text-text-muted">•</span>
        <span className="text-text-secondary flex items-center gap-1"><Shield className="w-3 h-3 text-state-success" /> SOC 2 Certified</span>
      </motion.div>

      {/* Hero Headline */}
      <motion.h1 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-text-primary tracking-tight leading-[1.12]"
      >
        Transform Customer Inquiries Into <br className="hidden sm:inline" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-accent to-state-success">
          Seamless Operational Clarity.
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 sm:mt-6 text-text-secondary text-xs sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed font-normal"
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
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-2xl bg-brand-primary hover:bg-brand-primary-hover text-text-primary font-semibold text-xs sm:text-sm shadow-xl shadow-glow transition-all hover:scale-[1.02]"
        >
          <span>Launch Customer Portal</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <a
          href="/support/"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-2xl bg-brand-surface/90 hover:bg-brand-elevated text-state-success border border-state-success font-semibold text-xs sm:text-sm transition-all shadow-md hover:scale-[1.02]"
        >
          <Headphones className="w-4 h-4 text-state-success" />
          <span>Launch Staff Workspace</span>
        </a>
      </motion.div>

      {/* Value Assurance Checklist */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-text-tertiary font-medium">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-state-success flex-shrink-0" />
          <span>Real-time Triage & SLA Tracking</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-state-success flex-shrink-0" />
          <span>Row-Level Security (RLS) Isolation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-state-success flex-shrink-0" />
          <span>Instant Setup in &lt; 2 Minutes</span>
        </div>
      </div>

      {/* Social Proof Logos Bar */}
      <div className="mt-12 sm:mt-16 pt-8 border-t border-brand-border">
        <p className="text-[11px] sm:text-xs font-semibold text-text-tertiary uppercase tracking-widest mb-6">
          Powering Support Operations for Global High-Growth Companies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all">
          <span className="font-extrabold text-base sm:text-xl text-text-secondary tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-primary" /> ACME Corp
          </span>
          <span className="font-extrabold text-base sm:text-xl text-text-secondary tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-state-success" /> NovaPay Global
          </span>
          <span className="font-extrabold text-base sm:text-xl text-text-secondary tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-state-info" /> CloudScale Inc
          </span>
          <span className="font-extrabold text-base sm:text-xl text-text-secondary tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-state-warning" /> HyperSync AI
          </span>
          <span className="font-extrabold text-base sm:text-xl text-text-secondary tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-state-danger" /> DevFlow HQ
          </span>
        </div>
      </div>
    </section>
  )
}
