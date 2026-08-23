import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function PricingSection() {
  const navigate = useNavigate()

  const plans = [
    {
      name: "Starter Growth",
      price: "$29",
      period: "per agent / month",
      desc: "Perfect for fast-growing startups seeking a clean, structured customer portal.",
      features: [
        "Full Customer Self-Serve Portal",
        "Real-time ticket lifecycle tracking",
        "Category & priority schema validation",
        "Standard business hour SLAs",
        "Community support & docs"
      ],
      cta: "Start 14-Day Free Trial",
      popular: false
    },
    {
      name: "Scale Business",
      price: "$79",
      period: "per agent / month",
      desc: "For high-velocity support teams requiring advanced triage and executive QA oversight.",
      features: [
        "Everything in Starter Growth",
        "3-Tier Operational Triage Queue",
        "1-Click Ticket Claiming & Assignment",
        "Standardized Agent Resolution Reports",
        "Executive Manager 5-Star QA Audits",
        "15-Minute Urgent SLA Guarantees"
      ],
      cta: "Launch Scale Workspace",
      popular: true
    },
    {
      name: "Enterprise Dedicated",
      price: "$199",
      period: "per agent / month",
      desc: "For global enterprises demanding cryptographic multi-tenancy and dedicated SLAs.",
      features: [
        "Everything in Scale Business",
        "Cryptographic Row-Level Security (RLS)",
        "Automated Staff Capacity & Roster Provisioning",
        "Custom SAML 2.0 / Okta SSO Integration",
        "99.99% Enterprise Uptime SLA",
        "24/7 Dedicated Support Engineering"
      ],
      cta: "Contact Enterprise Sales",
      popular: false
    }
  ]

  return (
    <section id="pricing" className="w-full max-w-6xl mx-auto my-16 px-4">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-state-success-bg text-state-success border border-state-success mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simple, Transparent Pricing</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
          Choose the Right Plan for Your Scale
        </h2>
        <p className="text-xs sm:text-sm text-text-tertiary mt-2">
          Transparent pricing with zero hidden fees. Upgrade, downgrade, or cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {plans.map((p, idx) => (
          <div
            key={idx}
            className={`rounded-3xl glass-panel p-6 sm:p-8 border transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-glow flex flex-col justify-between relative ${
              p.popular 
                ? 'border-brand-primary shadow-glow bg-gradient-to-b from-indigo-950/30 to-slate-900/80 scale-[1.02]' 
                : 'border-white/10'
            }`}
          >
            {p.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-text-primary text-[10px] font-bold uppercase tracking-wider shadow-md">
                Most Popular for Teams
              </div>
            )}

            <div>
              <h3 className="text-lg font-bold text-text-primary mb-1">{p.name}</h3>
              <p className="text-xs text-text-tertiary mb-6 leading-relaxed">{p.desc}</p>

              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/10">
                <span className="text-4xl font-extrabold text-text-primary tracking-tight">{p.price}</span>
                <span className="text-xs text-text-tertiary">{p.period}</span>
              </div>

              <div className="space-y-3 mb-8">
                {p.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs text-text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-state-success flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate('/login')}
              className={`w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
                p.popular
                  ? 'bg-brand-primary hover:bg-brand-primary-hover text-text-primary shadow-glow'
                  : 'bg-brand-surface hover:bg-brand-elevated text-text-secondary border border-white/10'
              }`}
            >
              <span>{p.cta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
