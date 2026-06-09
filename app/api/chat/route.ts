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
    - B.Tech Data Science Engineering student at MIT Manipal (Expected May 2027)
    - Quantitative Research Analyst (Simulation) at J.P. Morgan QR (June 2026) - modeled natural gas pricing engines and credit risk logistic regression models
    - Software Engineering Intern at Intellect Design Arena (June 2025 - July 2025) - fintech systems, Spark pipelines, agent dashboards
    - Web Developer Executive at E-Cell, MIT Manipal (August 2024 - May 2025) - led development of the MES 2025 entrepreneurship summit website and event-day digital infrastructure
    - Premium Tier Developer (AI Pro) at Google Developer Program (2021 - Present) - early beta Taskmate contributor, Gemini Pro prototypes
    - Certifications: Johns Hopkins ML, IBM GenAI & LLMs, Meta Data Analyst, Google Prompting Essentials, ISB Finance, J.P. Morgan QR
    
    Projects:
    - ChargerOS: Browser operating system simulation (React 19, TS 5.9, Vite 7) with 59 built-in apps, drag-and-drop window manager
    - MedRAG: Clinical GenAI RAG platform (Python, LangChain, FAISS, Flask, Docker) with Groq/Gemini fallback and hallucination controls
    - CrimeConnect: Law enforcement graph intelligence and PageRank system (TypeScript, D3.js, Supabase)
    - VARtificial Intelligence: AI-powered sports match predictor (Python, XGBoost, Optuna)
    - HackOps: Interactive cybersecurity training simulator and password-guessing CTF
    
    Skills: React, Next.js, TypeScript, Python, Apache Spark, FAISS, Machine Learning, Data Analytics, SQL, Docker, Quant Risk Modeling
    Contact: tripathy.anamay23@gmail.com, +91 9877454747
    GitHub: https://github.com/Flamechargerr
    LinkedIn: https://www.linkedin.com/in/anamay-tripathy/

    Be helpful, friendly, and informative. Answer questions about his projects, experience, skills, and how to contact him. 
    If someone wants to get in touch, encourage them to use the contact form on the website or reach out directly via email.
    Keep responses concise but informative. Use emojis occasionally to make conversations more engaging.`

    const result = await streamText({
      model: openai("gpt-4o-mini"), // Using gpt-4o-mini for better reliability
      system: systemPrompt,
      messages,
    })

    return result.toTextStreamResponse()
  } catch (error: any) {
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
