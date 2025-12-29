export async function trackEvent(eventName: string, data: Record<string, any> = {}) {
  try {
    if (typeof window === "undefined") return // Only run on client side

    await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: eventName,
        data: {
          ...data,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        },
      }),
    })
  } catch (error) {
    console.error("Failed to track event:", error)
  }
}
