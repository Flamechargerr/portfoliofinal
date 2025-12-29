"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application error:', error)
    }, [error])

    return (
        <main className="min-h-screen bg-lorenzo-dark flex items-center justify-center px-6">
            <div className="text-center max-w-2xl">
                {/* Error Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-8xl mb-8"
                >
                    ⚠️
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-3xl md:text-4xl font-brier text-lorenzo-light uppercase mb-4">
                        Something Went Wrong
                    </h1>
                    <p className="text-lorenzo-light/60 mb-8">
                        We encountered an unexpected error. Don't worry, our team has been notified
                        and we're working on fixing it.
                    </p>
                </motion.div>

                {/* Error details (development only) */}
                {process.env.NODE_ENV === 'development' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8 p-4 bg-red-900/20 border border-red-500/20 rounded text-left overflow-auto"
                    >
                        <p className="text-red-400 text-sm font-mono break-all">
                            {error.message}
                        </p>
                        {error.digest && (
                            <p className="text-red-400/60 text-xs mt-2">
                                Error ID: {error.digest}
                            </p>
                        )}
                    </motion.div>
                )}

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={reset}
                        className="px-8 py-4 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider hover:bg-lorenzo-accent/90 transition-colors"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="px-8 py-4 border-2 border-lorenzo-accent text-lorenzo-accent font-bold uppercase tracking-wider hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all"
                    >
                        Go Home
                    </Link>
                </motion.div>

                {/* Decorative corners */}
                <motion.div
                    className="fixed top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-lorenzo-accent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                />
                <motion.div
                    className="fixed bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-lorenzo-accent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                />
            </div>
        </main>
    )
}
