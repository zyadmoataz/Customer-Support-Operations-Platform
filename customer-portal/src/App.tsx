import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/context/AuthContext'
import { GlobalErrorBoundary } from '@/components/GlobalErrorBoundary/GlobalErrorBoundary'
import { AppRoutes } from '@/routes/AppRoutes'
import { queryClient } from '@/lib/queryClient'

export function App() {
  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'bg-slate-900/90 text-white border border-white/10 backdrop-blur-md rounded-2xl shadow-xl',
              duration: 3500,
            }}
          />
          <AppRoutes />
        </AuthProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  )
}

export default App
