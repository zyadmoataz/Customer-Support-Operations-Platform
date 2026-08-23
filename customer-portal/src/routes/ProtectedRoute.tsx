import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, user, profile, role, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-brand-bg text-indigo-400">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  if (role && role !== 'customer') {
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center text-center space-y-5 bg-brand-bg text-slate-100 p-6">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 max-w-md w-full shadow-glow space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto text-xl font-bold">
            🛡️
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Staff Account Detected</h1>
            <p className="text-slate-400 text-xs mt-1">
              You are currently authenticated as a Staff Member (<strong className="text-indigo-400 uppercase">{role}</strong>: {user?.email || profile?.full_name}).
            </p>
          </div>
          <p className="text-slate-400 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
            The <strong>Customer Portal</strong> is reserved for client ticket submissions. Staff triage and operations take place inside the <strong>Support Workspace</strong>.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
            <a
              href="/support/"
              className="w-full flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/25 transition-all text-center"
            >
              Open Support Workspace
            </a>
            <button
              onClick={() => signOut()}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition-all text-center"
            >
              Switch / Sign Out
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
