import { Zap, Shield, ArrowUpRight, Globe, Share2, MessageSquare } from 'lucide-react'

export function LandingFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative w-full border-t border-white/10 bg-slate-950 text-slate-400 text-xs py-14 lg:py-20 overflow-hidden">
      {/* Top subtle radiant glow */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-indigo-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={scrollToTop}
              className="flex items-center gap-3 cursor-pointer select-none group w-fit"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 shadow-glow text-white font-bold group-hover:scale-105 transition-transform">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <span className="font-extrabold text-white text-xl tracking-tight">Optima</span>
            </div>
            
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Customer Operations Reimagined. The mission-critical infrastructure connecting end-customers, frontline support agents, and operations managers.
            </p>

            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px] font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>All Systems Operational • 99.99% SLA Uptime</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <span className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer">
                <Globe className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer">
                <MessageSquare className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all cursor-pointer">
                <Share2 className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div className="space-y-3.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Platform</h4>
            <ul className="space-y-2.5">
              <li><a href="#platform-preview" className="hover:text-white transition-colors flex items-center gap-1 group"><span>Resolution Desk</span><ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" /></a></li>
              <li><a href="#features" className="hover:text-white transition-colors flex items-center gap-1 group"><span>Triage Automation</span><ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" /></a></li>
              <li><a href="#metrics" className="hover:text-white transition-colors flex items-center gap-1 group"><span>Impact & Analytics</span><ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" /></a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors flex items-center gap-1 group"><span>Tiered Pricing</span><ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" /></a></li>
            </ul>
          </div>

          {/* Column 2: Portals & Workspaces */}
          <div className="space-y-3.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Workspaces</h4>
            <ul className="space-y-2.5">
              <li><a href="/login" className="hover:text-white transition-colors">Customer Portal</a></li>
              <li><a href="/support/" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">Support Staff Workspace</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
              <li><a href="/login" className="hover:text-white transition-colors">Developer REST APIs</a></li>
            </ul>
          </div>

          {/* Column 3: Trust & Compliance */}
          <div className="space-y-3.5">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Trust & Security</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-1.5 text-slate-300"><Shield className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" /><span>SOC 2 Type II Certified</span></li>
              <li className="flex items-center gap-1.5 text-slate-300"><Shield className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" /><span>Row-Level Security (RLS)</span></li>
              <li className="flex items-center gap-1.5 text-slate-300"><Shield className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" /><span>ISO 27001 Compliant</span></li>
              <li className="flex items-center gap-1.5 text-slate-300"><Shield className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" /><span>GDPR & CCPA Ready</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Optima Platform Inc. All rights reserved. Enterprise Support Operations.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#security" className="hover:text-slate-300 transition-colors">Security Whitepaper</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
