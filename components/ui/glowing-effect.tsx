"use client"

import type React from "react"
import { memo, useCallback, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { animate } from "motion"

interface GlowingEffectProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
  icon?: React.ReactNode
}

export const GlowingEffect = memo(({ children, className, title, description, icon }: GlowingEffectProps) => {
  const glowRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLLIElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!glowRef.current || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    animate(
      glowRef.current,
      {
        left: `${x}px`,
        top: `${y}px`,
      },
      { duration: 0.2, easing: "ease-out" },
    )
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  return (
    <li
      ref={containerRef}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50",
        className,
      )}
    >
      <>
        <div
          ref={glowRef}
          className={cn(
            "pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            "[--spread:60deg] [--radius:300px]",
            "[mask-image:radial-gradient(var(--radius),#000_0%,#000_calc(var(--radius)-var(--spread)),#00000000_calc(var(--radius)))]",
          )}
          style={{
            width: "600px",
            height: "600px",
          }}
        >
          <div
            className={cn(
              "animate-spin-slow absolute inset-0",
              "[background:conic-gradient(from_0deg,#00000000,#fff,#00000000_calc(var(--spread)*2deg))]",
            )}
          />
        </div>
        <div className="relative z-10">
          {icon && <div className="mb-4 text-primary">{icon}</div>}
          {title && <h3 className="mb-2 text-xl font-semibold">{title}</h3>}
          {description && <h2 className="text-base md:leading-[1.375rem] text-muted-foreground">{description}</h2>}
          {children}
        </div>
      </>
    </li>
  )
})

GlowingEffect.displayName = "GlowingEffect"
