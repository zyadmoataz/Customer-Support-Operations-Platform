import { ArrowRight, Headphones, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function CtaBanner() {
  const navigate = useNavigate()

  return (
    <section className="w-full max-w-6xl mx-auto my-16 px-4">
      <div className="rounded-3xl glass-panel p-8 sm:p-14 border border-brand-hover bg-gradient-to-tr from-indigo-950/40 via-slate-900/90 to-emerald-950/30 text-center relative overflow-hidden shadow-glow">
        {/* Background Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-state-success-bg rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-primary/10 text-brand-primary border border-brand-primary mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Ready for Production Scale</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-text-primary tracking-tight leading-tight">
            Start Delivering World-Class Customer Support Today.
          </h2>
          <p className="text-sm sm:text-base text-text-secondary mt-4 max-w-2xl mx-auto leading-relaxed">
            Join thousands of modern support teams who resolved customer tickets 4x faster with OptimaSupport.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-brand-primary hover:bg-brand-primary-hover text-text-primary font-semibold text-sm shadow-xl shadow-glow transition-all hover:scale-[1.02]"
            >
              <span>Launch Customer Experience Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="/support/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-brand-surface hover:bg-brand-elevated text-state-success border border-state-success font-semibold text-sm transition-all hover:scale-[1.02]"
            >
              <Headphones className="w-4 h-4 text-state-success" />
              <span>Launch Staff Operations Console</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
