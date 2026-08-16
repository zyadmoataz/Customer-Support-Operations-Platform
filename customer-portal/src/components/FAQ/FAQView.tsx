import { HelpCircle, CheckCircle2 } from 'lucide-react'

export function FAQView() {
  const faqs = [
    {
      q: "What are the response time SLAs?",
      a: "Urgent requests are triaged by active support staff within 15 minutes. High and Medium tickets receive responses within 1 to 4 hours."
    },
    {
      q: "How does ticket resolution work?",
      a: "When a support agent finishes resolving your request, they lock the ticket with a full resolution report explaining the steps taken."
    },
    {
      q: "Is my personal data secure?",
      a: "Yes. PostgreSQL Row Level Security (RLS) guarantees that only you and authorized support staff can view your support requests."
    }
  ]

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="p-6 rounded-3xl glass-panel border border-indigo-500/20 bg-gradient-to-r from-indigo-950/20 to-slate-900/60">
        <div className="flex items-center gap-3 mb-2">
          <HelpCircle className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">Support Knowledge Base & Guidelines</h3>
        </div>
        <p className="text-xs text-slate-400">
          Find instant answers to common questions about ticket lifecycles and resolution policies.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-5 rounded-2xl glass-panel border border-white/5">
            <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>{faq.q}</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed pl-6">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
