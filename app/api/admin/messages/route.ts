import { type NextRequest, NextResponse } from "next/server"

// Mock data for demonstration
const mockData = {
  totalMessages: 47,
  totalContacts: 12,
  recentActivity: [
    {
      id: "1",
      type: "contact",
      name: "John Doe",
      subject: "Project Collaboration",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    },
    {
      id: "2",
      type: "message",
      message: "Tell me about Anamay's experience",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    },
    {
      id: "3",
      type: "contact",
      name: "Sarah Wilson",
      subject: "Job Opportunity",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
      id: "4",
      type: "message",
      message: "What are his technical skills?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    },
  ],
  popularQuestions: [
    { question: "Tell me about Anamay's projects", count: 23 },
    { question: "What are his technical skills?", count: 18 },
    { question: "His experience and roles?", count: 15 },
    { question: "How to contact him?", count: 12 },
  ],
}

export async function GET(req: NextRequest) {
  try {
    // Simple auth check (use proper auth in production)
    const authHeader = req.headers.get("authorization")
    if (!authHeader || !authHeader.includes("admin-secret-key")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In production, fetch real data from database
    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Admin API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
