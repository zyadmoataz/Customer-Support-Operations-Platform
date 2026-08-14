import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  errorMessage: string
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: ''
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col h-screen w-screen items-center justify-center text-center space-y-4 bg-slate-950 text-slate-50 p-4">
          <h1 className="text-2xl font-bold text-rose-500">Something went wrong</h1>
          <p className="text-slate-400 text-sm">The application encountered a critical error.</p>
          <pre className="bg-slate-900 p-4 rounded-xl text-rose-300 text-xs border border-white/5 max-w-md overflow-x-auto">{this.state.errorMessage}</pre>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 mt-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
          >
            Return to Safety
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
