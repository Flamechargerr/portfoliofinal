"use client"

import { useState, useEffect } from "react"
import { useKeyboardShortcuts } from "@/components/keyboard-shortcuts"
import MacBookScrollIntro from "@/components/macbook-scroll-intro"

export default function HomeClientWrapper({ children }: { children: React.ReactNode }) {
  useKeyboardShortcuts()
  const [showIntro, setShowIntro] = useState(false)

  // Prevent browser from restoring scroll position on reload
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual"
      }
      // If inside iframe, skip intro
      if (window.self !== window.top) {
        setShowIntro(false)
      }
    }
  }, [])

  // Force scroll to top when intro dismisses
  const handleIntroComplete = () => {
    setShowIntro(false)
    // Triple-force: native scroll reset
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    // Also after next frame (after Lenis catches up)
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    })
  }

  return (
    <main id="main-content" className="relative cursor-none md:cursor-none">
      {/* MacBook Scrollytelling Intro */}
      {showIntro && <MacBookScrollIntro onComplete={handleIntroComplete} />}
      {children}
    </main>
  )
}
