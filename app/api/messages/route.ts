import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    const { data: messages, error } = await supabase
      .from("chat_messages")
      .select("id, message, session_id, user_info, created_at, ip_address")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      throw error
    }

    const { count } = await supabase.from("chat_messages").select("*", { count: "exact", head: true })

    return NextResponse.json({
      messages,
      total: count || 0,
      hasMore: offset + limit < (count || 0),
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

    const { data: result, error } = await supabase
      .from("chat_messages")
      .insert({
        message: message.trim(),
        session_id: sessionId,
        user_info: userInfo || {},
        ip_address: ip,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    console.log("New chatbot message saved to Supabase:", result.id)

    return NextResponse.json({
      success: true,
      message: "Message stored successfully",
      id: result.id,
    })
  } catch (error) {
    console.error("Error storing message:", error)
    return NextResponse.json({ error: "Failed to store message" }, { status: 500 })
  }
}
