import { type NextRequest, NextResponse } from "next/server"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

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
    // Store message in memory
    chatMessages.push(newMessage)

    // Store in Supabase if configured
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error: dbError } = await supabase
          .from('chat_messages')
          .insert([
            {
              id: newMessage.id,
              message: newMessage.message,
              session_id: newMessage.session_id,
              user_info: newMessage.user_info,
              ip_address: newMessage.ip_address,
              created_at: newMessage.created_at
            }
          ])
        if (dbError) {
          console.error("Failed to save chat message to Supabase:", dbError)
        }
      } catch (dbErr) {
        console.error("Supabase exception saving chat message:", dbErr)
      }
    }

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
    // If Supabase is configured, query chat messages from database
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50)
        
        if (!error && data) {
          return NextResponse.json({ 
            messages: data.map((item: any) => ({
              id: item.id,
              message: item.message,
              sessionId: item.session_id,
              userInfo: item.user_info,
              ipAddress: item.ip_address,
              created_at: item.created_at
            })) 
          })
        }
      } catch (dbErr) {
        console.error("Failed to query chat messages from Supabase:", dbErr)
      }
    }

    return NextResponse.json({ messages: chatMessages.slice(-50).reverse() })
  } catch (error) {
    console.error("❌ Error fetching messages:", error)
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    )
  }
}
