import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const faqs = [
    {
      q: "How does OptimaSupport prevent queue collisions when multiple agents are active?",
      a: "The platform uses real-time state locking. When an engineer clicks 'Claim Ticket', the system binds the ticket to the agent's ID and transitions the status to 'In Progress', removing it from the unassigned pool instantaneously for all other team members."
    },
    {
      q: "How does customer data isolation and security work?",
      a: "Customer accounts operate under strict cryptographic multi-tenancy. Customers can only view and manage tickets belonging to their authenticated session, while internal staff notes, employee directories, and management audits are protected."
    },
    {
      q: "What happens when an engineer marks an issue as Resolved?",
      a: "To ensure full accountability, the engineer must provide a standardized resolution summary outlining root causes and solutions. Once resolved, the ticket is locked to preserve audit history and immediately routes to the Manager Console for QA auditing."
    },
    {
      q: "How does Manager QA and 5-Star Rating work?",
      a: "Operations Managers have executive oversight over all resolved tickets. Managers audit resolution speed, clarity, and customer satisfaction, assigning a 1 to 5 star score and qualitative coaching feedback."
    },
    {
      q: "How fast can an enterprise team migrate to OptimaSupport?",
      a: "Teams can deploy in under 2 minutes. With pre-configured role models for Customers, Support Agents, and Operations Managers, no complicated database migrations or custom coding are required to start triaging tickets immediately."
    }
  ]

  return (
    <section id="faq" className="w-full max-w-5xl mx-auto my-16 px-4">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Everything you need to know about our support workflows, security, and SLAs.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="rounded-2xl glass-panel border border-white/10 overflow-hidden transition-all">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-5 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-white hover:text-indigo-300 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>{faq.q}</span>
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openIdx === idx ? 'rotate-180 text-indigo-400' : ''}`} />
            </button>
            {openIdx === idx && (
              <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
