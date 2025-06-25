import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    const messages = await sql`
      SELECT id, message, session_id, user_info, created_at, ip_address
      FROM chat_messages
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset};
    `

    const [{ count }] = await sql`SELECT COUNT(*)::int FROM chat_messages;`

    return NextResponse.json({
      messages,
      total: count,
      hasMore: offset + limit < count,
    })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message, userInfo } = await req.json()

    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
    const sessionId = userInfo?.sessionId || Date.now().toString()

    const [inserted] = await sql`
      INSERT INTO chat_messages (message, session_id, user_info, ip_address)
      VALUES (${message.trim()}, ${sessionId}, ${JSON.stringify(userInfo || {})}, ${ip})
      RETURNING id, created_at;
    `

    return NextResponse.json({
      success: true,
      id: inserted.id,
      created_at: inserted.created_at,
    })
  } catch (error) {
    console.error("Error storing message:", error)
    return NextResponse.json({ error: "Failed to store message" }, { status: 500 })
  }
}
