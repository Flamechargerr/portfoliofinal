import { type NextRequest, NextResponse } from "next/server"


export async function POST(request: NextRequest) {
  try {
    const { message, sessionId, userInfo } = await request.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Get client IP
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0] : "unknown"

    // Store message in database
    const result = await sql`
      INSERT INTO chat_messages (message, session_id, user_info, ip_address)
      VALUES (${message}, ${sessionId || null}, ${JSON.stringify(userInfo || {})}, ${ip})
      RETURNING id, created_at
    `

    console.log("✅ Message saved to database:", result[0])

    return NextResponse.json({
      success: true,
      id: result[0].id,
      timestamp: result[0].created_at,
    })
  } catch (error) {
    console.error("❌ Error saving message:", error)
    return NextResponse.json(
      {
        error: "Failed to save message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const messages = await sql`
      SELECT id, message, session_id, user_info, created_at, ip_address
      FROM chat_messages 
      ORDER BY created_at DESC 
      LIMIT 50
    `

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("❌ Error fetching messages:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch messages",
      },
      { status: 500 },
    )
  }
}
