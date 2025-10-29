import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get dashboard statistics
    const [totalContacts, totalMessages, totalEvents, recentContacts, recentMessages, popularEvents] =
      await Promise.all([
        // Total contact submissions
        sql`SELECT COUNT(*) as count FROM contact_submissions`,

        // Total chat messages
        sql`SELECT COUNT(*) as count FROM chat_messages`,

        // Total analytics events
        sql`SELECT COUNT(*) as count FROM analytics_events`,

        // Recent contact submissions
        sql`
        SELECT name, email, subject, created_at
        FROM contact_submissions
        ORDER BY created_at DESC
        LIMIT 5
      `,

        // Recent chat messages
        sql`
        SELECT message, session_id, created_at
        FROM chat_messages
        ORDER BY created_at DESC
        LIMIT 5
      `,

        // Popular events
        sql`
        SELECT event_name, COUNT(*) as count
        FROM analytics_events
        GROUP BY event_name
        ORDER BY count DESC
        LIMIT 5
      `,
      ])

    return NextResponse.json({
      success: true,
      stats: {
        totalContacts: totalContacts[0].count,
        totalMessages: totalMessages[0].count,
        totalEvents: totalEvents[0].count,
      },
      recentActivity: {
        contacts: recentContacts,
        messages: recentMessages,
        popularEvents,
      },
    })
  } catch (error) {
    console.error("Dashboard error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
