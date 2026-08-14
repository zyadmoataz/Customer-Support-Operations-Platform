import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { AnimatePresence } from 'framer-motion'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary/GlobalErrorBoundary'
import type { ReactNode } from 'react'

const queryClient = new QueryClient()

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, role, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-brand-bg text-indigo-400">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/" replace />
  }

  if (role && role !== 'customer') {
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center text-center space-y-4 bg-brand-bg text-slate-100 p-4">
        <h1 className="text-2xl font-bold text-rose-500">Access Restricted</h1>
        <p className="text-slate-400 text-sm">This portal is for customers only. Please access the Support Operations Workspace.</p>
        <a href="http://localhost:4200" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors">
          Go to Support Workspace
        </a>
      </div>
    )
  }

  return <>{children}</>
}

function AppRoutes() {
  const { session, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-brand-bg text-indigo-400">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-bg bg-radial-glow bg-no-repeat text-slate-100 flex flex-col selection:bg-indigo-500/30">
      <AnimatePresence mode="wait">
        <Routes>
          <Route 
            path="/" 
            element={
              session ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <div className="flex-1 flex items-center justify-center p-4">
                  <LoginPage />
                </div>
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

function App() {
  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster 
            position="top-right" 
            toastOptions={{ 
              className: 'bg-slate-900/90 text-white border border-white/10 backdrop-blur-md rounded-2xl shadow-xl',
              duration: 3500
            }} 
          />
          <AppRoutes />
        </AuthProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  )
}

export default App
