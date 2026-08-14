import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Live System Pill */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-6 shadow-sm hover:border-indigo-500/50 transition-colors"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Enterprise Support Engine • PostgreSQL RLS Active</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl leading-[1.1]"
      >
        Customer Support <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">
          Operations Platform
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-5 text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed"
      >
        Dual frontend architecture connecting customers, support agents, and operations managers to a unified real-time database with strict role isolation.
      </motion.p>
    </div>
  )
}
