import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Headphones, ArrowRight, Zap } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export function LandingNav() {
  const navigate = useNavigate()
  const { session } = useAuth()
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { id: 'platform-preview', label: 'Product' },
    { id: 'features', label: 'Capabilities' },
    { id: 'metrics', label: 'Impact' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'faq', label: 'FAQ' },
  ]

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-950/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/50' 
        : 'bg-slate-950/60 backdrop-blur-lg border-b border-white/5'
    }`}>
      {/* Radiant bottom highlight */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Brand Identity */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none group flex-shrink-0" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-600 shadow-glow text-white font-bold group-hover:scale-105 group-hover:shadow-indigo-500/50 transition-all flex-shrink-0">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-extrabold text-white text-base sm:text-xl tracking-tight leading-tight">Optima</span>
            <span className="hidden md:inline text-[10px] text-slate-400 font-medium tracking-wide">Support Operations Platform</span>
          </div>
        </div>

        {/* Aceternity Style Floating Pill Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-slate-900/70 border border-white/10 text-xs font-semibold text-slate-300 shadow-inner">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              onMouseEnter={() => setHoveredTab(link.id)}
              onMouseLeave={() => setHoveredTab(null)}
              className="relative px-4 py-2 rounded-full text-slate-300 hover:text-white transition-colors"
            >
              {hoveredTab === link.id && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-indigo-500/20 border border-indigo-500/40 shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <a 
            href="/support" 
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 h-9 sm:h-11 px-3 sm:px-5 rounded-xl sm:rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-emerald-500/50 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-emerald-500/20 hover:scale-[1.02]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
            <span className="hidden xs:inline sm:inline">Staff Console</span>
            <span className="inline xs:hidden sm:hidden text-[11px]">Staff</span>
          </a>
          
          <button
            onClick={() => navigate(session ? '/dashboard' : '/login')}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 h-9 sm:h-11 px-3.5 sm:px-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-[1.02]"
          >
            <span>{session ? 'Dashboard' : 'Customer Portal'}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white flex-shrink-0" />
          </button>
        </div>
      </div>
    </header>
  )
}
