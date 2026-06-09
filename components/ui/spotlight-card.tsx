"use client"
import React, { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { playSound } from "@/lib/audio"

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  innerClassName?: string
  spotlightColor?: string
  borderColor?: string
  enableTilt?: boolean
  maxTilt?: number
}

export default function SpotlightCard({
  children,
  className = "",
  innerClassName = "",
  spotlightColor = "rgba(200, 245, 80, 0.12)",
  borderColor = "rgba(200, 245, 80, 0.35)",
  enableTilt = false,
  maxTilt = 8,
  onClick,
  ...props
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    containerRef.current.style.setProperty("--mouse-x", `${x}px`)
    containerRef.current.style.setProperty("--mouse-y", `${y}px`)

    if (enableTilt) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) / (rect.width / 2)
      const deltaY = (e.clientY - centerY) / (rect.height / 2)
      rotateX.set(-deltaY * maxTilt)
      rotateY.set(deltaX * maxTilt)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (enableTilt) {
      rotateX.set(0)
      rotateY.set(0)
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    playSound("click")
    if (onClick) {
      onClick(e)
    }
  }

  if (!mounted) {
    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/40 p-[1px] transition-all duration-300 ${className}`}
        style={{
          background: "rgba(255, 255, 255, 0.05)",
        }}
        {...(props as any)}
      >
        <div className={`relative h-full w-full rounded-[15px] bg-zinc-950/98 overflow-hidden ${innerClassName || "p-6 md:p-8"}`}>
          <div className="relative z-10 h-full w-full">{children}</div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true)
        playSound("tick")
      }}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/40 p-[1px] transition-all duration-300 ${className}`}
      style={{
        background: isHovered
          ? `radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), ${borderColor}, transparent 80%)`
          : "rgba(255, 255, 255, 0.05)",
        rotateX: enableTilt ? rotateXSpring : 0,
        rotateY: enableTilt ? rotateYSpring : 0,
        transformStyle: enableTilt ? "preserve-3d" : "flat",
        perspective: enableTilt ? 1000 : undefined,
      }}
      {...(props as any)}
    >
      <div className={`relative h-full w-full rounded-[15px] bg-zinc-950/98 overflow-hidden ${innerClassName || "p-6 md:p-8"}`} style={{ transformStyle: enableTilt ? "preserve-3d" : "flat" }}>
        {/* Spotlight radial gradient overlay */}
        <div
          className="pointer-events-none absolute -inset-px rounded-[15px] opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 80%)`,
          }}
        />
        {/* Interactive border shine reflection */}
        <div className="relative z-10 h-full w-full" style={{ transform: enableTilt ? "translateZ(15px)" : undefined, transformStyle: enableTilt ? "preserve-3d" : "flat" }}>
          {children}
        </div>
      </div>
    </motion.div>
  )
}


