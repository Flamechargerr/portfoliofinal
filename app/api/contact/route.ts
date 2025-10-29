import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields (trim whitespace)
    const trimmedName = name?.trim()
    const trimmedEmail = email?.trim()
    const trimmedSubject = subject?.trim()
    const trimmedMessage = message?.trim()

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      return NextResponse.json(
        {
          error: "All fields are required",
        },
        { status: 400 },
      )
    }

    // Get client info
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0] : "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    // Save to database
    const result = await sql`
      INSERT INTO contact_submissions (name, email, subject, message, ip_address, user_agent)
      VALUES (${trimmedName}, ${trimmedEmail}, ${trimmedSubject}, ${trimmedMessage}, ${ip}, ${userAgent})
      RETURNING id, created_at
    `

    console.log("✅ Contact saved to database:", result[0])

    // Send email notification
    let emailStatus = "not_sent"
    try {
      const emailResult = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "tripathy.anamay23@gmail.com",
        replyTo: trimmedEmail,
        subject: `🚀 New Portfolio Contact: ${trimmedSubject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px;">
            <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
                📧 New Contact Form Submission
              </h2>
              
              <div style="margin-bottom: 20px;">
                <p style="margin: 8px 0;"><strong>👤 Name:</strong> ${trimmedName}</p>
                <p style="margin: 8px 0;"><strong>📧 Email:</strong> ${trimmedEmail}</p>
                <p style="margin: 8px 0;"><strong>📋 Subject:</strong> ${trimmedSubject}</p>
                <p style="margin: 8px 0;"><strong>🕒 Time:</strong> ${new Date().toLocaleString()}</p>
                <p style="margin: 8px 0;"><strong>🌐 IP:</strong> ${ip}</p>
              </div>
              
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea;">
                <h3 style="margin-top: 0; color: #333;">💬 Message:</h3>
                <p style="line-height: 1.6; color: #555;">${trimmedMessage}</p>
              </div>
              
              <div style="margin-top: 25px; text-align: center;">
                <a href="mailto:${trimmedEmail}?subject=Re: ${trimmedSubject}" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                  📧 Reply to ${trimmedName}
                </a>
              </div>
            </div>
          </div>
        `,
      })

      console.log("✅ Email sent successfully:", emailResult)
      emailStatus = "sent"

      // Send auto-reply to user
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: trimmedEmail,
        subject: `Thank you for contacting Anamay Tripathy`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px;">
            <div style="background: white; padding: 30px; border-radius: 8px;">
              <h2 style="color: #333; margin-bottom: 20px;">🙏 Thank You for Reaching Out!</h2>
              
              <p style="line-height: 1.6; color: #555;">Hi ${trimmedName},</p>
              
              <p style="line-height: 1.6; color: #555;">
                Thank you for your message regarding "<strong>${trimmedSubject}</strong>". 
                I've received your inquiry and will get back to you within 24 hours.
              </p>
              
              <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 0; color: #666; font-style: italic;">Your message: "${trimmedMessage}"</p>
              </div>
              
              <p style="line-height: 1.6; color: #555;">
                In the meantime, feel free to check out my projects and connect with me on social media:
              </p>
              
              <div style="text-align: center; margin: 25px 0;">
                <a href="https://github.com/Flamechargerr" style="margin: 0 10px; color: #667eea; text-decoration: none;">🔗 GitHub</a>
                <a href="https://www.linkedin.com/in/anamay-tripathy-b53829296/" style="margin: 0 10px; color: #667eea; text-decoration: none;">🔗 LinkedIn</a>
              </div>
              
              <p style="line-height: 1.6; color: #555;">
                Best regards,<br>
                <strong>Anamay Tripathy</strong><br>
                <em>Data Science Engineering Student | Full Stack Developer</em>
              </p>
            </div>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError)
      emailStatus = "failed"
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      id: result[0].id,
      emailStatus,
    })
  } catch (error) {
    console.error("❌ Contact form error:", error)
    return NextResponse.json(
      {
        error: "Failed to process contact form",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
