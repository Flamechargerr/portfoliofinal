import { NextResponse } from 'next/server'

export async function GET() {
    // Health check endpoint for monitoring
    const healthCheck = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0',
        services: {
            api: 'operational',
            blog: 'operational',
            contact: 'operational',
            analytics: 'operational'
        }
    }

    return NextResponse.json(healthCheck)
}
