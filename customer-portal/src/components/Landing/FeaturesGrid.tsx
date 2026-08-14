import { Lock, Zap, Shield, Sparkles } from 'lucide-react'

export function FeaturesGrid() {
  const features = [
    {
      icon: <Lock className="w-5 h-5 text-indigo-400" />,
      title: "PostgreSQL Row Security",
      desc: "Built-in PostgreSQL RLS policies guarantee customers can only access their own private support requests."
    },
    {
      icon: <Zap className="w-5 h-5 text-sky-400" />,
      title: "Fine-Grained Reactivity",
      desc: "Angular Signals and TanStack React Query ensure seamless real-time queue synchronization."
    },
    {
      icon: <Shield className="w-5 h-5 text-emerald-400" />,
      title: "Role Privilege Separation",
      desc: "Distinct experiences for Customers, Support Agents, and Operations Managers with zero overlap."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      title: "Zero-Dependency Toast",
      desc: "Lightweight, native signals-driven notification system with auto-dismissal and semantic status codes."
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl w-full mt-14 text-left">
      {features.map((feat, idx) => (
        <div key={idx} className="p-5 rounded-2xl glass-panel border border-white/5 hover:border-white/10 transition-colors">
          <div className="p-2 rounded-xl bg-slate-900 w-fit mb-3">
            {feat.icon}
          </div>
          <h4 className="text-sm font-semibold text-white">{feat.title}</h4>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{feat.desc}</p>
        </div>
      ))}
    </div>
  )
}
