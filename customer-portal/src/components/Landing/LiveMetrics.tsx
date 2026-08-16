import { Zap, Clock, ShieldCheck, Heart } from 'lucide-react'

export function LiveMetrics() {
  const metrics = [
    {
      stat: "4.2x",
      label: "Faster Resolution Speed",
      desc: "Structured triage and instant agent claiming eliminates handoff delays.",
      icon: <Zap className="w-5 h-5 text-indigo-400" />
    },
    {
      stat: "< 12 min",
      label: "Avg First Response Time",
      desc: "Urgent enterprise escalations are routed directly to active tier-1 staff.",
      icon: <Clock className="w-5 h-5 text-sky-400" />
    },
    {
      stat: "99.8%",
      label: "SLA Commitment Met",
      desc: "Zero breach guarantee with automated operational escalation tracking.",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
    },
    {
      stat: "98.6%",
      label: "Customer CSAT Score",
      desc: "Formal resolution reports and quality assurance reviews drive customer retention.",
      icon: <Heart className="w-5 h-5 text-rose-400" />
    }
  ]

  return (
    <section id="metrics" className="w-full max-w-6xl mx-auto my-16 px-4">
      <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-indigo-500/20 bg-gradient-to-r from-indigo-950/20 via-slate-900/60 to-emerald-950/20 shadow-glow">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Proven Impact on Global Support Operations
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Real operational metrics achieved by modern engineering and support teams worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-glow flex flex-col justify-between">
              <div>
                <div className="p-2.5 rounded-xl bg-slate-800/80 w-fit mb-4">
                  {m.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                  {m.stat}
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">{m.label}</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
