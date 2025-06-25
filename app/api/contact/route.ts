import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, string>
    // Trim all values to avoid "  " (whitespace-only) submissions
    const name = body.name?.trim() ?? ""
    const email = body.email?.trim() ?? ""
    const subject = body.subject?.trim() ?? ""
    const message = body.message?.trim() ?? ""

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Get client IP and user agent
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
    const userAgent = req.headers.get("user-agent") || "unknown"

    // Save to database
    const result = await sql`
      INSERT INTO contact_submissions (name, email, subject, message, ip_address, user_agent)
      VALUES (${name}, ${email}, ${subject}, ${message}, ${ip}, ${userAgent})
      RETURNING id, created_at
    `

    const contactData = {
      id: result[0].id,
      name,
      email,
      subject,
      message,
      created_at: result[0].created_at,
      ip_address: ip,
    }

    console.log("✅ Contact saved to database:", contactData.id)

    // Store urgent notification for manual checking
    await sql`
      INSERT INTO analytics_events (event_name, event_data, session_id, ip_address)
      VALUES ('contact_form_urgent', ${JSON.stringify({
        ...contactData,
        urgent: true,
        needs_attention: true,
      })}, ${Date.now().toString()}, ${ip})
    `

    // Try to send email notification
    let emailStatus = "not_sent"
    const emailResults = []

    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend")
        const resend = new Resend(process.env.RESEND_API_KEY)

        const emailResult = await resend.emails.send({
          from: "Anamay Portfolio <onboarding@resend.dev>",
          to: ["tripathy.anamay23@gmail.com"],
          subject: `🚀 New Portfolio Contact: ${subject}`,
          html: createEmailTemplate(contactData),
          reply_to: email,
        })

        console.log("✅ Email sent successfully:", emailResult.data?.id)
        emailResults.push({ method: "resend", status: "success", id: emailResult.data?.id })
        emailStatus = "sent"
      } catch (resendError: any) {
        console.error("❌ Email sending failed:", resendError.message)
        emailResults.push({ method: "resend", status: "failed", error: resendError.message })

        // Log specific error for debugging
        if (resendError.message?.includes("domain")) {
          console.log("💡 Email failed: Domain verification required in Resend dashboard")
        }
      }
    } else {
      console.log("⚠️ RESEND_API_KEY not configured")
    }

    return NextResponse.json({
      success: true,
      message: "Message received successfully! I'll get back to you within 24 hours.",
      id: contactData.id,
      emailStatus,
      emailResults,
      notification: "Your message is safely stored and I will be notified through the admin dashboard.",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function createEmailTemplate(contactData: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; color: white; text-align: center; margin-bottom: 20px;">
        <h1 style="margin: 0; font-size: 24px;">📧 New Portfolio Contact</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone reached out through your website!</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h3 style="color: #333; margin: 0 0 20px 0;">Contact Details:</h3>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
        <p><strong>Subject:</strong> ${contactData.subject}</p>
        
        <h3 style="color: #333; margin: 20px 0 10px 0;">Message:</h3>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
          <p style="margin: 0; line-height: 1.6;">${contactData.message.replace(/\n/g, "<br>")}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px;">
            <strong>Submission ID:</strong> #${contactData.id}<br>
            <strong>Date:</strong> ${new Date(contactData.created_at).toLocaleString()}<br>
            <strong>IP:</strong> ${contactData.ip_address}
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="mailto:${contactData.email}?subject=Re: ${contactData.subject}" 
             style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Reply to ${contactData.name}
          </a>
        </div>
      </div>
    </div>
  `
}

export async function GET() {
  try {
    const submissions = await sql`
      SELECT id, name, email, subject, created_at
      FROM contact_submissions
      ORDER BY created_at DESC
      LIMIT 10
    `

    return NextResponse.json({
      success: true,
      submissions,
      total: submissions.length,
    })
  } catch (error) {
    console.error("Error fetching contact submissions:", error)
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}
