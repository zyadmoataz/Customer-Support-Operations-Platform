import { useState } from 'react'
import { Inbox, HelpCircle, User, LogOut, Zap, Menu, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  ticketCount: number
}

export function Sidebar({ activeTab, onTabChange, ticketCount }: SidebarProps) {
  const { profile, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: 'tickets', label: 'My Inquiries', icon: <Inbox className="w-4 h-4" />, badge: ticketCount },
    { id: 'faq', label: 'Knowledge Base', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'settings', label: 'Account & Security', icon: <User className="w-4 h-4" /> },
  ]

  const handleSelect = (tab: string) => {
    onTabChange(tab)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <div className="lg:hidden sticky top-0 z-40 w-full h-16 bg-brand-bg/95 backdrop-blur-md border-b border-white/5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 shadow-glow text-text-primary font-bold">
            <Zap className="w-4 h-4 fill-white" />
          </div>
          <span className="font-bold text-text-primary text-base tracking-tight">Optima</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl bg-brand-surface border border-brand-border text-text-secondary hover:text-text-primary"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Fixed Desktop Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 w-64 h-screen bg-brand-bg border-r border-brand-border/80 flex flex-col justify-between p-5 sm:p-6 flex-shrink-0 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Logo */}
          <div className="flex items-center justify-between px-1 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-600 shadow-glow text-text-primary font-bold flex-shrink-0">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <span className="font-extrabold text-text-primary text-xl tracking-tight">Optima</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-text-tertiary hover:text-text-primary p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Card */}
          <div className="p-3.5 rounded-2xl bg-brand-surface border border-brand-border/80 mb-6 flex items-center gap-3 shadow-md shadow-black/20">
            <div className="w-9 h-9 rounded-xl bg-brand-primary/20 text-brand-primary flex items-center justify-center font-bold text-sm border border-brand-hover flex-shrink-0">
              {profile?.full_name?.charAt(0)?.toUpperCase() || 'C'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-text-primary truncate">{profile?.full_name || 'Customer'}</p>
              <span className="text-[10px] text-text-tertiary font-medium">Client Account</span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-brand-primary text-text-primary shadow-md shadow-glow'
                    : 'text-text-tertiary hover:text-text-primary hover:bg-brand-surface'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-elevated text-text-secondary border border-brand-subtle">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Sign Out */}
        <div className="pt-4 border-t border-brand-border">
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-state-danger hover:text-text-primary hover:bg-state-danger-bg border border-state-danger transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}
