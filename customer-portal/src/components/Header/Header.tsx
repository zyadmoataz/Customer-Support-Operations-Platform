import { useAuth } from '../../context/AuthContext'
import { Shield, Plus, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

interface HeaderProps {
  ticketCount: number
  onOpenCreateModal: () => void
  onOpenProfileModal: () => void
}

export function Header({ ticketCount, onOpenCreateModal, onOpenProfileModal }: HeaderProps) {
  const { user, role, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out safely')
    } catch {
      toast.error('Failed to sign out')
    }
  }

  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-glow text-white font-bold text-sm">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="font-semibold text-white tracking-tight text-sm sm:text-base">Customer Portal</span>
            <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              v1.0 Live
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm transition-all duration-200 shadow-md shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>New Ticket</span>
          </button>

          <button
            onClick={onOpenProfileModal}
            className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-800 text-left hover:opacity-80 transition-opacity"
            title="Edit Profile & Password"
          >
            <div className="text-right">
              <p className="text-xs text-white font-medium truncate max-w-[150px]">{user?.user_metadata?.full_name || user?.email}</p>
              <p className="text-[10px] text-slate-400 capitalize">{role || 'Customer'} • {ticketCount} Requests ⚙️</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-xs text-indigo-300 font-bold uppercase">
              {user?.email?.[0] || 'U'}
            </div>
          </button>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors text-xs font-medium"
            title="Sign Out"
          >
            <span className="hidden sm:inline">Sign Out</span>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
