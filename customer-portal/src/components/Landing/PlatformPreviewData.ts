export interface PreviewTicket {
  id: string
  customer: string
  company: string
  title: string
  category: string
  priority: 'urgent' | 'high' | 'medium'
  status: 'in_progress' | 'resolved'
  assigned: string
  time: string
  resolution: string | null
}

export const MOCK_PREVIEW_TICKETS: PreviewTicket[] = [
  {
    id: 'OPS-9482',
    customer: 'Stripe Billing Tech Lead',
    company: 'NovaPay Global',
    title: 'Webhook signature verification timing out on production endpoint',
    category: 'Technical / API Integration',
    priority: 'urgent',
    status: 'in_progress',
    assigned: 'Elena Rostova (Senior Support Engineer)',
    time: '4 mins ago',
    resolution: 'Isolated clock drift issue in AWS region. Updated webhook timestamp tolerance threshold to 300s.',
  },
  {
    id: 'OPS-9478',
    customer: 'VP of Engineering',
    company: 'CloudScale Infrastructure',
    title: 'Enterprise SSO SAML 2.0 directory federation sync error',
    category: 'Account & Security',
    priority: 'high',
    status: 'resolved',
    assigned: 'Marcus Chen (Security Operations)',
    time: '18 mins ago',
    resolution: 'Refreshed Okta X.509 signing certificate and re-provisioned SCIM user group mappings.',
  },
  {
    id: 'OPS-9471',
    customer: 'Lead DevOps Architect',
    company: 'DevFlow Systems',
    title: 'Automated database migration failed on secondary replica',
    category: 'Technical Issue',
    priority: 'urgent',
    status: 'in_progress',
    assigned: 'Sarah Jenkins (Infrastructure Triage)',
    time: '32 mins ago',
    resolution: null,
  },
  {
    id: 'OPS-9465',
    customer: 'Finance Director',
    company: 'HyperSync AI',
    title: 'Annual enterprise multi-seat billing reconciliation request',
    category: 'Billing & Plans',
    priority: 'medium',
    status: 'resolved',
    assigned: 'David Miller (Support Manager)',
    time: '1 hour ago',
    resolution: 'Consolidated 45 seat licenses under unified annual contract with volume discount.',
  },
]
