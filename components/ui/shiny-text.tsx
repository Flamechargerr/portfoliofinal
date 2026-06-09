"use client"
import React from "react"

interface ShinyTextProps {
  text: string
  className?: string
  speed?: number // in seconds
  shimmerColor?: string
}

export default function ShinyText({
  text,
  className = "",
  speed = 3,
  shimmerColor = "#c8f550"
}: ShinyTextProps) {
  return (
    <span className="relative inline-flex">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes text-shimmer {
          0% { background-position: 120% 0; }
          100% { background-position: -120% 0; }
        }
      `}} />
      <span
        className={`inline-block text-transparent bg-clip-text ${className}`}
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.4) 25%, ${shimmerColor} 50%, rgba(255,255,255,0.4) 75%)`,
          backgroundSize: "200% auto",
          animation: `text-shimmer ${speed}s linear infinite`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {text}
      </span>
    </span>
  )
}
