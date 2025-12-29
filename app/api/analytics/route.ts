import { NextRequest, NextResponse } from 'next/server'

// Analytics storage (in production, use a proper analytics service)
interface PageView {
    page: string
    timestamp: string
    userAgent: string
    referrer: string
}

interface AnalyticsEvent {
    event: string
    data: Record<string, unknown>
    timestamp: string
}

const pageViews: PageView[] = []
const events: AnalyticsEvent[] = []

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { type, page, event, data } = body

        if (type === 'pageview') {
            const pageView: PageView = {
                page: page || '/',
                timestamp: new Date().toISOString(),
                userAgent: request.headers.get('user-agent') || 'unknown',
                referrer: request.headers.get('referer') || 'direct'
            }
            pageViews.push(pageView)

            return NextResponse.json({ success: true, type: 'pageview' })
        }

        if (type === 'event') {
            const analyticsEvent: AnalyticsEvent = {
                event: event || 'unknown',
                data: data || {},
                timestamp: new Date().toISOString()
            }
            events.push(analyticsEvent)

            return NextResponse.json({ success: true, type: 'event' })
        }

        return NextResponse.json(
            { error: 'Invalid analytics type' },
            { status: 400 }
        )

    } catch (error) {
        console.error('Analytics error:', error)
        return NextResponse.json(
            { error: 'Failed to track' },
            { status: 500 }
        )
    }
}

export async function GET() {
    // Analytics summary endpoint
    // In production, add authentication

    const now = new Date()
    const today = now.toISOString().split('T')[0]

    const todayViews = pageViews.filter(pv =>
        pv.timestamp.startsWith(today)
    ).length

    const pageCounts: Record<string, number> = {}
    pageViews.forEach(pv => {
        pageCounts[pv.page] = (pageCounts[pv.page] || 0) + 1
    })

    const eventCounts: Record<string, number> = {}
    events.forEach(e => {
        eventCounts[e.event] = (eventCounts[e.event] || 0) + 1
    })

    return NextResponse.json({
        summary: {
            totalPageViews: pageViews.length,
            todayPageViews: todayViews,
            totalEvents: events.length,
            topPages: Object.entries(pageCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5),
            topEvents: Object.entries(eventCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
        }
    })
}
