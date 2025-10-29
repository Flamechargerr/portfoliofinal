import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get urgent contact notifications
    const urgentEvents = await sql`
      SELECT 
        ae.id,
        ae.event_data,
        ae.created_at,
        cs.name,
        cs.email,
        cs.subject,
        cs.message,
        cs.id as contact_id
      FROM analytics_events ae
      LEFT JOIN contact_submissions cs ON (ae.event_data->>'id')::int = cs.id
      WHERE ae.event_name = 'contact_form_urgent'
      ORDER BY ae.created_at DESC
      LIMIT 20
    `

    // Get recent contact submissions
    const recentContacts = await sql`
      SELECT id, name, email, subject, message, created_at, ip_address
      FROM contact_submissions
      ORDER BY created_at DESC
      LIMIT 20
    `

    // Get chat message count
    const chatStats = await sql`
      SELECT COUNT(*) as total_messages
      FROM chat_messages
    `

    return NextResponse.json({
      success: true,
      urgent_contacts: urgentEvents,
      recent_contacts: recentContacts,
      total_urgent: urgentEvents.length,
      total_recent: recentContacts.length,
      total_chat_messages: chatStats[0].total_messages,
      message:
        urgentEvents.length > 0
          ? `You have ${urgentEvents.length} contact submissions that need your attention!`
          : "No urgent notifications at the moment.",
    })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}
