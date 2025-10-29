import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not set")
      return new Response(
        JSON.stringify({
          error: "AI service is not configured. Please contact the administrator.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Enhanced system prompt with more context
    const systemPrompt = `You are Anamay Tripathy's AI assistant. You help visitors learn about Anamay's background, projects, skills, and experience. 

    Here's what you know about Anamay:
    - B.Tech Data Science Engineering student at MIT Manipal (Class of 2027)
    - Technical Head at YaanBarpe startup (6 months) - Leading technical development, managing 5 developers
    - Data Analyst & Web Dev Intern at Intellect Design Arena (3 months) - Fintech solutions, data analysis
    - E-Cell Executive at MIT Manipal - Organizing entrepreneurship events, managing website
    - Class Representative at Student Council MIT - Representing 60+ students
    - Meta Data Analyst Certified - Statistical analysis, Tableau dashboards, 95% score
    - IBM GenAI Professional - Built 3 AI applications, prompt engineering, RAG systems
    
    Projects:
    - CrimeConnect: Case management system for law enforcement (React, Node.js, MongoDB) - Ready for deployment
    - VARtificial Intelligence: AI-powered sports match predictor (Python, ML, 85%+ accuracy) - Live
    - HackOps: Interactive cybersecurity learning platform (JavaScript, Node.js) - Live
    - Flora Fight Frenzy: Plants vs Zombies inspired tower defense game (JavaScript, HTML5 Canvas) - UI Complete
    
    Skills: React, Node.js, Python, Data Analysis, Machine Learning, SQL, Tableau, DevOps, Leadership
    Contact: tripathy.anamay23@gmail.com, +91 9877454747
    GitHub: https://github.com/Flamechargerr
    LinkedIn: https://www.linkedin.com/in/anamay-Tripathy-b53829296/

    Be helpful, friendly, and informative. Answer questions about his projects, experience, skills, and how to contact him. 
    If someone wants to get in touch, encourage them to use the contact form on the website or reach out directly via email.
    Keep responses concise but informative. Use emojis occasionally to make conversations more engaging.`

    const result = await streamText({
      model: openai("gpt-4o-mini"), // Using gpt-4o-mini for better reliability
      system: systemPrompt,
      messages,
      maxTokens: 500,
      temperature: 0.7,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API Error:", error)

    // More specific error handling
    if (error.message?.includes("API key")) {
      return new Response(
        JSON.stringify({
          error: "AI service authentication failed. Please check configuration.",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    if (error.message?.includes("rate limit")) {
      return new Response(
        JSON.stringify({
          error: "AI service is temporarily busy. Please try again in a moment.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    return new Response(
      JSON.stringify({
        error: "I'm having trouble processing your request right now. Please try again in a moment.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
