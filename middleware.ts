import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Handle preflight OPTIONS requests
  if (request.method === "OPTIONS" && request.nextUrl.pathname.startsWith("/api/")) {
    const response = new NextResponse(null, { status: 204 })
    const origin = request.headers.get("origin")
    const host = request.headers.get("host")
    const isAllowed = origin && (
      origin.startsWith("http://localhost:") ||
      origin.startsWith("https://localhost:") ||
      origin.includes("127.0.0.1") ||
      (host && origin.includes(host))
    )
    if (origin) {
      response.headers.set("Access-Control-Allow-Origin", isAllowed ? origin : `https://${host || "yourdomain.com"}`)
    }
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.set("Access-Control-Max-Age", "86400")
    return response
  }

  // Add CORS headers for API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const response = NextResponse.next()
    const origin = request.headers.get("origin")
    const host = request.headers.get("host")
    const isAllowed = origin && (
      origin.startsWith("http://localhost:") ||
      origin.startsWith("https://localhost:") ||
      origin.includes("127.0.0.1") ||
      (host && origin.includes(host))
    )

    if (origin) {
      response.headers.set("Access-Control-Allow-Origin", isAllowed ? origin : `https://${host || "yourdomain.com"}`)
    }
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

    return response
  }

  // Rate limiting for contact form (simple implementation)
  if (request.nextUrl.pathname === "/api/contact" && request.method === "POST") {
    const ip = (request as any).ip || request.headers.get("x-forwarded-for") || "unknown"
    // In production, implement proper rate limiting with Redis or similar
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
}
