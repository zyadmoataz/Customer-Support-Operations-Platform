import { Zap, Lock, BarChart3, CheckCircle2, Clock, Sparkles, Shield } from 'lucide-react'

export function FeatureBento() {
  return (
    <section id="features" className="w-full max-w-6xl mx-auto my-16 px-4">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-primary/10 text-brand-primary border border-brand-primary mb-3">
          <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
          Engineered for High-Velocity Support Teams
        </h2>
        <p className="text-sm sm:text-base text-text-tertiary mt-2">
          Everything your organization needs to deliver lightning-fast support resolutions, protect customer relationships, and scale operations effortlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 (Large - 2 Cols) */}
        <div className="md:col-span-2 rounded-3xl bg-brand-surface border border-brand-border transition-all duration-300 hover:-translate-y-1 hover:border-brand-hover p-6 sm:p-8 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center border border-brand-primary/20">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-elevated text-brand-primary border border-brand-border">
                Automated Triage
              </span>
            </div>
            <h3 className="text-xl font-bold text-text-primary transition-colors">
              Intelligent Ticket Routing & Priority Escalation
            </h3>
            <p className="text-sm text-text-tertiary mt-2 leading-relaxed">
              Eliminate backlog chaos. Incoming customer requests are immediately classified by category, urgency tier, and SLA commitment. Support engineers can claim tasks with 1 click without queue collisions.
            </p>
          </div>

          <div className="mt-6 sm:mt-8 pt-4 border-t border-brand-border grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs text-text-secondary">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-state-success flex-shrink-0" />
              <span>Zero-collision ticket claiming</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-state-success flex-shrink-0" />
              <span>Real-time urgency prioritization</span>
            </div>
          </div>
        </div>

        {/* Card 2 (1 Col) */}
        <div className="rounded-3xl bg-brand-surface border border-brand-border transition-all duration-300 hover:-translate-y-1 hover:border-brand-hover p-6 sm:p-8 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-state-success-bg text-state-success flex items-center justify-center border border-state-success/30">
                <Lock className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-elevated text-state-success border border-brand-border">
                Zero-Trust
              </span>
            </div>
            <h3 className="text-xl font-bold text-text-primary transition-colors">
              Strict Multi-Tenant Data Isolation
            </h3>
            <p className="text-sm text-text-tertiary mt-2 leading-relaxed">
              Customers only ever see their own tickets. Internal team investigation notes, employee credentials, and managerial audits are strictly shielded by database-level security policies.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-brand-border text-xs text-text-secondary flex items-center gap-2">
            <Shield className="w-4 h-4 text-state-success flex-shrink-0" />
            <span>Cryptographic Tenant Isolation</span>
          </div>
        </div>

        {/* Card 3 (1 Col) */}
        <div className="rounded-3xl bg-brand-surface border border-brand-border transition-all duration-300 hover:-translate-y-1 hover:border-brand-hover p-6 sm:p-8 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-state-info-bg text-state-info flex items-center justify-center border border-state-info/30">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-elevated text-state-info border border-brand-border">
                Customer Clarity
              </span>
            </div>
            <h3 className="text-xl font-bold text-text-primary transition-colors">
              Live Lifecycle Transparency
            </h3>
            <p className="text-sm text-text-tertiary mt-2 leading-relaxed">
              Keep customers informed at every step of investigation (Open &rarr; In Progress &rarr; Resolved). When an issue is resolved, agents provide an official resolution report to prevent repeat inquiries.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-brand-border text-xs text-text-secondary flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-state-info flex-shrink-0" />
            <span>Standardized Resolution Reports</span>
          </div>
        </div>

        {/* Card 4 (Large - 2 Cols) */}
        <div className="md:col-span-2 rounded-3xl bg-brand-surface border border-brand-border transition-all duration-300 hover:-translate-y-1 hover:border-brand-hover p-6 sm:p-8 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-state-warning-bg text-state-warning flex items-center justify-center border border-state-warning/30">
                <BarChart3 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-elevated text-state-warning border border-brand-border">
                Management Console
              </span>
            </div>
            <h3 className="text-xl font-bold text-text-primary transition-colors">
              Executive QA Audits & SLA Performance Tracking
            </h3>
            <p className="text-sm text-text-tertiary mt-2 leading-relaxed">
              Operations managers gain complete operational oversight: track staff workload distribution, provision new support agents, audit resolution compliance rates, and rate agent tickets with 1–5 star reviews and coaching feedback.
            </p>
          </div>

          <div className="mt-6 sm:mt-8 pt-4 border-t border-brand-border grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs text-text-secondary">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-state-warning flex-shrink-0" />
              <span>5-Star QA Performance Audits</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-state-warning flex-shrink-0" />
              <span>Instant Staff Onboarding & Roster Management</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
