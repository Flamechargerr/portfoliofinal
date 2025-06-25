import { NextResponse } from "next/server"

export async function POST() {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          error: "RESEND_API_KEY not configured",
          solution: "Add your Resend API key to environment variables",
        },
        { status: 400 },
      )
    }

    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Test email
    const result = await resend.emails.send({
      from: "Portfolio Test <onboarding@resend.dev>",
      to: "tripathy.anamay23@gmail.com",
      subject: "🧪 Email Test from Portfolio",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>✅ Email Integration Test</h2>
          <p>If you're reading this, your email integration is working!</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Status:</strong> Email delivery successful</p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully!",
      emailId: result.data?.id,
    })
  } catch (error: any) {
    console.error("Test email failed:", error)

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: error.response?.data || "Unknown error",
        solution: error.message?.includes("domain")
          ? "You need to verify your domain in Resend dashboard or use onboarding@resend.dev"
          : "Check your RESEND_API_KEY and try again",
      },
      { status: 500 },
    )
  }
}
