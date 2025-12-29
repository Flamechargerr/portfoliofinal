"use client"

import { useEffect } from 'react'

export function useAnalytics() {
    useEffect(() => {
        // Track initial page view
        trackPageView(window.location.pathname)

        // Track navigation changes
        const handleRouteChange = () => {
            trackPageView(window.location.pathname)
        }

        window.addEventListener('popstate', handleRouteChange)
        return () => window.removeEventListener('popstate', handleRouteChange)
    }, [])
}

export async function trackPageView(page: string) {
    try {
        await fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'pageview', page })
        })
    } catch (error) {
        // Silently fail - analytics shouldn't break the app
        console.debug('Analytics tracking failed:', error)
    }
}

export async function trackEvent(event: string, data?: Record<string, unknown>) {
    try {
        await fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'event', event, data })
        })
    } catch (error) {
        console.debug('Event tracking failed:', error)
    }
}

// Track specific user interactions
export function trackClick(element: string) {
    trackEvent('click', { element, timestamp: new Date().toISOString() })
}

export function trackScroll(section: string) {
    trackEvent('scroll', { section, timestamp: new Date().toISOString() })
}

export function trackFormSubmit(formName: string, success: boolean) {
    trackEvent('form_submit', { formName, success, timestamp: new Date().toISOString() })
}

export function trackDownload(fileName: string) {
    trackEvent('download', { fileName, timestamp: new Date().toISOString() })
}

export function trackExternalLink(url: string) {
    trackEvent('external_link', { url, timestamp: new Date().toISOString() })
}
