import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { event, data } = await req.json()

    if (!event) {
      return NextResponse.json({ error: "Event name is required" }, { status: 400 })
    }

    // Get client IP
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
    const sessionId = data?.sessionId || Date.now().toString()

    // Save to database
    const result = await sql`
      INSERT INTO analytics_events (event_name, event_data, session_id, ip_address)
      VALUES (${event}, ${JSON.stringify(data || {})}, ${sessionId}, ${ip})
      RETURNING id, created_at
    `

    return NextResponse.json({
      success: true,
      message: "Event tracked successfully",
      id: result[0].id,
    })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = Number.parseInt(searchParams.get("limit") || "100")
    const eventName = searchParams.get("event")

    let query = sql`
      SELECT id, event_name, event_data, session_id, created_at
      FROM analytics_events
    `

    if (eventName) {
      query = sql`
        SELECT id, event_name, event_data, session_id, created_at
        FROM analytics_events
        WHERE event_name = ${eventName}
      `
    }

    const events = await sql`
      ${query}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `

    const totalCount = await sql`
      SELECT COUNT(*) as count FROM analytics_events
      ${eventName ? sql`WHERE event_name = ${eventName}` : sql``}
    `

    return NextResponse.json({
      events,
      total: totalCount[0].count,
    })
  } catch (error) {
    console.error("Analytics fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
