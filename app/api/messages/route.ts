import { type NextRequest, NextResponse } from "next/server"

const chatMessages: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId, userInfo } = await request.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0] : "unknown"

    const newMessage = {
      id: crypto.randomUUID(),
      message,
      session_id: sessionId || null,
      user_info: userInfo || {},
      ip_address: ip,
      created_at: new Date().toISOString()
    }
    chatMessages.push(newMessage)

    return NextResponse.json({
      success: true,
      id: newMessage.id,
      timestamp: newMessage.created_at,
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
    return NextResponse.json({ messages: chatMessages.slice(-50).reverse() })
  } catch (error) {
    console.error("❌ Error fetching messages:", error)
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    )
  }
}
