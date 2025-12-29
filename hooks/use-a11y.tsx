"use client"

import { useEffect, RefObject } from "react"

// Accessibility improvement hook
export function useA11y() {
    useEffect(() => {
        // Add skip to content link functionality
        const handleKeyDown = (e: KeyboardEvent) => {
            // Skip to main content with Tab at page load
            if (e.key === 'Tab' && !e.shiftKey) {
                const skipLink = document.getElementById('skip-to-content')
                if (skipLink && document.activeElement === document.body) {
                    skipLink.focus()
                }
            }
        }

        // Handle escape key to close modals
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                // Close any open modals
                document.querySelectorAll('[data-modal-open="true"]').forEach(modal => {
                    const closeButton = modal.querySelector('[data-modal-close]') as HTMLButtonElement
                    closeButton?.click()
                })
            }
        }

        // Reduce motion for users who prefer it
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
        if (prefersReducedMotion.matches) {
            document.documentElement.classList.add('reduce-motion')
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keydown', handleEscape)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keydown', handleEscape)
        }
    }, [])
}

// Focus trap for modals
export function useFocusTrap(isOpen: boolean, containerRef: RefObject<HTMLElement | null>) {
    useEffect(() => {
        if (!isOpen || !containerRef.current) return

        const container = containerRef.current
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault()
                    lastElement?.focus()
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault()
                    firstElement?.focus()
                }
            }
        }

        container.addEventListener('keydown', handleTab)
        firstElement?.focus()

        return () => container.removeEventListener('keydown', handleTab)
    }, [isOpen, containerRef])
}

// Announce content changes for screen readers
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    const announcer = document.getElementById('a11y-announcer') || createAnnouncer()
    announcer.setAttribute('aria-live', priority)
    announcer.textContent = message

    // Clear after announcement
    setTimeout(() => {
        announcer.textContent = ''
    }, 1000)
}

function createAnnouncer(): HTMLElement {
    const announcer = document.createElement('div')
    announcer.id = 'a11y-announcer'
    announcer.setAttribute('aria-live', 'polite')
    announcer.setAttribute('aria-atomic', 'true')
    announcer.className = 'sr-only'
    document.body.appendChild(announcer)
    return announcer
}

// Skip to content link component
export function SkipToContent() {
    return (
        <a
            id="skip-to-content"
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-lorenzo-accent focus:text-lorenzo-dark focus:font-bold focus:uppercase focus:tracking-wider"
        >
            Skip to main content
        </a>
    )
}

// Visually hidden component for screen readers
export function VisuallyHidden({ children }: { children: React.ReactNode }) {
    return (
        <span className="sr-only">
            {children}
        </span>
    )
}

// Live region for dynamic content updates
export function LiveRegion({
    children,
    ariaLive = 'polite',
    className = ''
}: {
    children: React.ReactNode
    ariaLive?: 'polite' | 'assertive' | 'off'
    className?: string
}) {
    return (
        <div
            role="status"
            aria-live={ariaLive}
            aria-atomic="true"
            className={className}
        >
            {children}
        </div>
    )
}
