import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, role, loading } = useAuth()

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
      <div className="flex flex-col h-screen w-screen items-center justify-center text-center space-y-4 bg-brand-bg text-slate-100 p-4">
        <h1 className="text-2xl font-bold text-rose-500">Access Restricted</h1>
        <p className="text-slate-400 text-sm">This portal is for customers only. Please access the Support Operations Workspace.</p>
        <a href="/support/" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors">
          Go to Support Workspace
        </a>
      </div>
    )
  }

  return <>{children}</>
}
