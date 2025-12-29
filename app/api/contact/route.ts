import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for demo purposes
// In production, use a database like PostgreSQL, MongoDB, or a service like Supabase
const messages: Array<{
    id: string
    name: string
    email: string
    message: string
    createdAt: string
}> = []

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, message } = body

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            )
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            )
        }

        // Create message object
        const newMessage = {
            id: crypto.randomUUID(),
            name: name.trim(),
            email: email.trim().toLowerCase(),
            message: message.trim(),
            createdAt: new Date().toISOString()
        }

        // Store message
        messages.push(newMessage)

        // In production, you would:
        // 1. Save to database
        // 2. Send email notification using services like:
        //    - Resend (https://resend.com)
        //    - SendGrid
        //    - AWS SES
        //    - EmailJS

        // Example with Resend (uncomment when you have API key):
        /*
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
            from: 'portfolio@yourdomain.com',
            to: 'anamay@example.com',
            subject: `New Contact from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        })
        */

        console.log('New contact message received:', newMessage)

        return NextResponse.json({
            success: true,
            message: 'Message received successfully! I\'ll get back to you soon.',
            id: newMessage.id
        })

    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            { error: 'Failed to process message. Please try again.' },
            { status: 500 }
        )
    }
}

export async function GET() {
    // This endpoint could be used for an admin dashboard
    // In production, add authentication
    return NextResponse.json({
        totalMessages: messages.length,
        recentMessages: messages.slice(-5).reverse()
    })
}
