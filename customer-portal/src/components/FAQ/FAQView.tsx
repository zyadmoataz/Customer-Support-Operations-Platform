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
    <div className="space-y-6 w-full">
      <div className="p-6 rounded-3xl bg-brand-surface border border-brand-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-brand-elevated text-brand-primary border border-brand-border">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-text-primary">Support Knowledge Base & Guidelines</h3>
            <p className="text-xs text-text-tertiary">
              Find instant answers to common questions about ticket lifecycles and resolution policies.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-5 rounded-2xl glass-panel border border-brand-border">
            <h4 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-primary" />
              <span>{faq.q}</span>
            </h4>
            <p className="text-xs text-text-tertiary leading-relaxed pl-6">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
