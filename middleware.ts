import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Add CORS headers for API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const response = NextResponse.next()

    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

    return response
  }

  // Rate limiting for contact form (simple implementation)
  if (request.nextUrl.pathname === "/api/contact" && request.method === "POST") {
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    // In production, implement proper rate limiting with Redis or similar
    console.log(`Contact form submission from IP: ${ip}`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
}
