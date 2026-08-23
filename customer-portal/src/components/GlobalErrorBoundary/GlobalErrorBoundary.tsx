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
        <div className="flex flex-col h-screen w-screen items-center justify-center text-center space-y-4 bg-brand-bg text-text-primary p-4">
          <h1 className="text-2xl font-bold text-state-danger">Something went wrong</h1>
          <p className="text-text-tertiary text-sm">The application encountered a critical error.</p>
          <pre className="bg-brand-surface p-4 rounded-xl text-state-danger text-xs border border-brand-border max-w-md overflow-x-auto">{this.state.errorMessage}</pre>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 mt-4 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-text-primary text-xs font-medium transition-colors"
          >
            Return to Safety
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
