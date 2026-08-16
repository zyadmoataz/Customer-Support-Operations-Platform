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
      <div className="lg:hidden sticky top-0 z-40 w-full h-16 bg-slate-950/95 backdrop-blur-md border-b border-white/5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 shadow-glow text-white font-bold">
            <Zap className="w-4 h-4 fill-white" />
          </div>
          <span className="font-bold text-white text-base tracking-tight">Optima</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
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
        className={`fixed lg:sticky top-0 left-0 z-50 w-64 h-screen bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between p-5 sm:p-6 flex-shrink-0 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Logo */}
          <div className="flex items-center justify-between px-1 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-600 shadow-glow text-white font-bold flex-shrink-0">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <span className="font-extrabold text-white text-xl tracking-tight">Optima</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Card */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800/80 mb-6 flex items-center gap-3 shadow-md shadow-black/20">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-sm border border-indigo-500/30 flex-shrink-0">
              {profile?.full_name?.charAt(0)?.toUpperCase() || 'C'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{profile?.full_name || 'Customer'}</p>
              <span className="text-[10px] text-slate-400 font-medium">Client Account</span>
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
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Sign Out */}
        <div className="pt-4 border-t border-slate-900">
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-white hover:bg-rose-950/40 border border-rose-500/20 transition-all shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}
