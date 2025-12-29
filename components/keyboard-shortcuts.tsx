"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Shortcut {
    key: string
    label: string
    description: string
    action: () => void
}

export function useKeyboardShortcuts() {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only trigger if not in an input field
            if (
                document.activeElement?.tagName === 'INPUT' ||
                document.activeElement?.tagName === 'TEXTAREA' ||
                document.activeElement?.getAttribute('contenteditable') === 'true'
            ) {
                return
            }

            // G + H: Go Home
            if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
                window.location.href = '/'
            }

            // G + B: Go to Blog
            if (e.key === 'b' && !e.ctrlKey && !e.metaKey) {
                window.location.href = '/blog'
            }

            // G + C: Go to Contact
            if (e.key === 'c' && !e.ctrlKey && !e.metaKey) {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }

            // G + P: Go to Projects
            if (e.key === 'p' && !e.ctrlKey && !e.metaKey) {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }

            // ? or /: Show shortcuts
            if (e.key === '?' || e.key === '/') {
                const event = new CustomEvent('toggle-shortcuts-modal')
                window.dispatchEvent(event)
            }

            // Escape: Close modals
            if (e.key === 'Escape') {
                document.querySelectorAll('[data-modal-open="true"]').forEach(modal => {
                    const closeBtn = modal.querySelector('[data-modal-close]') as HTMLButtonElement
                    closeBtn?.click()
                })
            }

            // T: Scroll to top
            if (e.key === 't' && !e.ctrlKey && !e.metaKey) {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])
}

export function KeyboardShortcutsModal() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleToggle = () => setIsOpen(prev => !prev)
        window.addEventListener('toggle-shortcuts-modal', handleToggle)
        return () => window.removeEventListener('toggle-shortcuts-modal', handleToggle)
    }, [])

    const shortcuts = [
        { key: 'H', description: 'Go to Home' },
        { key: 'B', description: 'Go to Blog' },
        { key: 'P', description: 'Go to Projects' },
        { key: 'C', description: 'Go to Contact' },
        { key: 'T', description: 'Scroll to Top' },
        { key: '?', description: 'Show Shortcuts' },
        { key: 'Esc', description: 'Close Modals' },
    ]

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/80 z-[999]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] w-full max-w-md"
                    >
                        <div className="bg-lorenzo-dark border border-lorenzo-accent/30 p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-brier text-lorenzo-light uppercase">
                                    Keyboard <span className="text-lorenzo-accent">Shortcuts</span>
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center text-lorenzo-light/50 hover:text-lorenzo-accent"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Shortcuts list */}
                            <div className="space-y-3">
                                {shortcuts.map((shortcut) => (
                                    <div
                                        key={shortcut.key}
                                        className="flex items-center justify-between"
                                    >
                                        <span className="text-lorenzo-light/60 text-sm">
                                            {shortcut.description}
                                        </span>
                                        <kbd className="px-3 py-1 bg-lorenzo-accent/10 border border-lorenzo-accent/30 text-lorenzo-accent text-sm font-mono">
                                            {shortcut.key}
                                        </kbd>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <p className="text-xs text-lorenzo-light/40 mt-6 text-center">
                                Press <kbd className="px-1 bg-lorenzo-accent/10 text-lorenzo-accent">Esc</kbd> or click outside to close
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

// Keyboard shortcut hint component
export function ShortcutHint({ shortcut, className = "" }: { shortcut: string; className?: string }) {
    return (
        <kbd className={`hidden md:inline-block ml-2 px-1.5 py-0.5 bg-lorenzo-accent/10 border border-lorenzo-accent/30 text-lorenzo-accent text-xs font-mono ${className}`}>
            {shortcut}
        </kbd>
    )
}
