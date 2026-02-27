"use client"

import type React from "react"

import { useEffect } from "react"
import Lenis from "lenis"

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    })

    // Force scroll to top on init (defeats browser scroll restoration)
    lenis.scrollTo(0, { immediate: true })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

      // Expose lenis on window so other components can reset it
      ; (window as any).__lenis = lenis

    return () => {
      delete (window as any).__lenis
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
