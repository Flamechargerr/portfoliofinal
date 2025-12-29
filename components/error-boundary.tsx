"use client"

import { Component, ReactNode } from 'react'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo)
        // You could send this to an error tracking service
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="min-h-[400px] flex items-center justify-center bg-lorenzo-dark">
                    <div className="text-center p-8">
                        <div className="text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-brier text-lorenzo-light uppercase mb-4">
                            Something went wrong
                        </h2>
                        <p className="text-lorenzo-light/60 mb-6 max-w-md">
                            We encountered an unexpected error. Please try refreshing the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider hover:bg-lorenzo-accent/90 transition-colors"
                        >
                            Refresh Page
                        </button>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <pre className="mt-6 p-4 bg-red-900/20 border border-red-500/20 text-red-400 text-xs text-left overflow-auto max-w-2xl">
                                {this.state.error.message}
                            </pre>
                        )}
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

// Simple fallback component for sections
export function SectionErrorFallback({ sectionName }: { sectionName: string }) {
    return (
        <div className="py-20 bg-lorenzo-dark">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
                <div className="text-4xl mb-4">🛠️</div>
                <p className="text-lorenzo-light/50">
                    The {sectionName} section couldn't load. Please refresh the page.
                </p>
            </div>
        </div>
    )
}
