import { NextResponse } from "next/server"

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      stats: {
        totalContacts: 0,
        totalMessages: 0,
        totalEvents: 0,
      },
      recentActivity: {
        contacts: [],
        messages: [],
        popularEvents: [],
      },
    })
  } catch (error) {
    console.error("Dashboard error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
