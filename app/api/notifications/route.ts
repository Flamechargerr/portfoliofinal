import { NextResponse } from "next/server"

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      urgent_contacts: [],
      recent_contacts: [],
      total_urgent: 0,
      total_recent: 0,
      total_chat_messages: 0,
      message: "No urgent notifications at the moment.",
    })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}
