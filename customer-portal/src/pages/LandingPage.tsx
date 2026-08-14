import { useNavigate } from 'react-router-dom'
import { Shield, Headphones, ArrowRight, Layers } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { HeroSection } from '../components/Landing/HeroSection'
import { PortalCard } from '../components/Landing/PortalCard'
import { FeaturesGrid } from '../components/Landing/FeaturesGrid'

export function LandingPage() {
  const navigate = useNavigate()
  const { session } = useAuth()

  return (
    <div className="min-h-screen w-full bg-brand-bg bg-radial-glow bg-no-repeat text-slate-100 flex flex-col">
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
              href="/support" 
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

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col items-center justify-center">
        <HeroSection />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mt-12 text-left">
          <PortalCard
            icon={<Shield className="w-6 h-6 text-indigo-400" />}
            badge="React 18 + Vite"
            title="Customer Experience Portal"
            description="Submit support tickets with category & priority, track real-time issue progress, and manage personal security settings."
            features={[
              "Submit & search tickets with instant validation",
              "Row-Level Security (only view own tickets)"
            ]}
            actionLabel="Launch Customer Portal"
            onActionClick={() => navigate('/login')}
            accountEmail="customer@portal.com"
            accentColor="indigo"
          />

          <PortalCard
            icon={<Headphones className="w-6 h-6 text-emerald-400" />}
            badge="Angular 17 Signals"
            title="Support Staff Workspace"
            description="Triage active ticket queue, update statuses (In Progress → Resolved), and access the Executive Manager Console."
            features={[
              "Fine-grained reactive triage with Angular Signals",
              "Manager Console for queue distribution & metrics"
            ]}
            actionLabel="Launch Staff Workspace"
            actionHref="/support"
            accountEmail="agent@support.com"
            accentColor="emerald"
          />
        </div>

        <FeaturesGrid />
      </main>

      <footer className="w-full border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>Customer Support Operations Platform • Milestone 1 Architecture</p>
      </footer>
    </div>
  )
}
