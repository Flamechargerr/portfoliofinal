import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

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

        // Store message in memory
        messages.push(newMessage)

        // Store message in database if configured
        if (isSupabaseConfigured() && supabase) {
            try {
                const { error: dbError } = await supabase
                    .from('contacts')
                    .insert([
                        {
                            id: newMessage.id,
                            name: newMessage.name,
                            email: newMessage.email,
                            message: newMessage.message,
                            created_at: newMessage.createdAt
                        }
                    ])
                if (dbError) {
                    console.error('Failed to save contact message to Supabase:', dbError)
                }
            } catch (dbErr) {
                console.error('Supabase exception saving contact message:', dbErr)
            }
        }

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
    // If Supabase is configured, fetch messages from database
    if (isSupabaseConfigured() && supabase) {
        try {
            const { data, error } = await supabase
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5)
            
            if (!error && data) {
                const { count, error: countError } = await supabase
                    .from('contacts')
                    .select('*', { count: 'exact', head: true })
                
                return NextResponse.json({
                    totalMessages: countError ? data.length : (count || 0),
                    recentMessages: data.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        email: item.email,
                        message: item.message,
                        createdAt: item.created_at
                    }))
                })
            }
        } catch (dbError) {
            console.error('Failed to fetch contact messages from Supabase:', dbError)
        }
    }

    return NextResponse.json({
        totalMessages: messages.length,
        recentMessages: messages.slice(-5).reverse()
    })
}
