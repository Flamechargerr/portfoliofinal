"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playSound } from "@/lib/audio"

interface PhysicsTag {
  label: string
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  mass: number
  color: string
}

export default function GravityToybox() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<"gravity" | "orbit">("gravity")

  const tagsList = [
    { label: "React", color: "#c8f550" },
    { label: "Next.js", color: "#ffffff" },
    { label: "TypeScript", color: "#3178c6" },
    { label: "Python", color: "#c8f550" },
    { label: "TensorFlow", color: "#ff6f00" },
    { label: "FastAPI", color: "#009688" },
    { label: "Node.js", color: "#68a063" },
    { label: "Docker", color: "#2496ed" },
    { label: "AWS", color: "#ff9900" },
    { label: "Git", color: "#f05032" },
    { label: "PostgreSQL", color: "#336791" },
    { label: "Pandas", color: "#150458" },
    { label: "Figma", color: "#f24e1e" },
    { label: "Tailwind", color: "#38bdf8" },
    { label: "GraphQL", color: "#e10098" }
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = container.clientWidth
      canvas.height = 360
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Generate physical tags
    const tags: PhysicsTag[] = tagsList.map((item, idx) => {
      const radius = ctx.measureText(item.label).width + 24 // dynamically size radius based on label length
      return {
        label: item.label,
        // Disperse randomly at the top half
        x: radius + Math.random() * (canvas.width - radius * 2),
        y: radius + Math.random() * (canvas.height / 2),
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 2,
        radius: Math.max(radius * 0.75, 45), // clamp radius nicely
        mass: 1,
        color: item.color
      }
    })

    // Mouse Tracking Variables
    let mouseX = 0
    let mouseY = 0
    let isMouseDown = false
    let draggedIndex: number | null = null

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top

      if (isMouseDown && draggedIndex !== null) {
        const tag = tags[draggedIndex]
        tag.vx = (mouseX - tag.x) * 0.25
        tag.vy = (mouseY - tag.y) * 0.25
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      // Check if user clicked/dragged any tag
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i]
        const dx = clickX - tag.x
        const dy = clickY - tag.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < tag.radius) {
          draggedIndex = i
          playSound("click")
          // Inject minor pop energy upwards on tap
          tag.vy -= 8
          tag.vx += (Math.random() - 0.5) * 6
          break
        }
      }
    }

    const handleMouseUp = () => {
      isMouseDown = false
      draggedIndex = null
    }

    // Touch support for mobile layouts
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return
      const rect = canvas.getBoundingClientRect()
      mouseX = e.touches[0].clientX - rect.left
      mouseY = e.touches[0].clientY - rect.top

      if (isMouseDown && draggedIndex !== null) {
        const tag = tags[draggedIndex]
        tag.vx = (mouseX - tag.x) * 0.25
        tag.vy = (mouseY - tag.y) * 0.25
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return
      isMouseDown = true
      const rect = canvas.getBoundingClientRect()
      const clickX = e.touches[0].clientX - rect.left
      const clickY = e.touches[0].clientY - rect.top

      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i]
        const dx = clickX - tag.x
        const dy = clickY - tag.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < tag.radius) {
          draggedIndex = i
          playSound("click")
          tag.vy -= 8
          tag.vx += (Math.random() - 0.5) * 6
          break
        }
      }
    }

    canvas.addEventListener("mousemove", handleMouseMove, { passive: true })
    canvas.addEventListener("mousedown", handleMouseDown, { passive: true })
    window.addEventListener("mouseup", handleMouseUp)
    
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true })
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleMouseUp)

    let animationFrameId: number

    // Main 2D Physics Loop
    const updatePhysics = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Physics factors based on tab selection
      const gravity = activeTab === "gravity" ? 0.28 : 0
      const bounceElasticity = -0.65
      const airResistance = 0.988

      // 1. Solve border collision, gravity, drag attraction
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i]

        if (i !== draggedIndex) {
          // Apply gravity
          tag.vy += gravity
          
          // Easing/Friction
          tag.vx *= airResistance
          tag.vy *= airResistance

          // If orbit mode, pull tags slowly toward the center of the cage
          if (activeTab === "orbit") {
            const centerX = canvas.width / 2
            const centerY = canvas.height / 2
            const toCenterX = centerX - tag.x
            const toCenterY = centerY - tag.y
            const dist = Math.sqrt(toCenterX * toCenterX + toCenterY * toCenterY)
            
            // Central vortex orbit pull
            if (dist > 10) {
              tag.vx += (toCenterX / dist) * 0.12 - (toCenterY / dist) * 0.08
              tag.vy += (toCenterY / dist) * 0.12 + (toCenterX / dist) * 0.08
            }
          }

          // Move tag positions
          tag.x += tag.vx
          tag.y += tag.vy
        } else {
          // Dragged tag tracks mouse springs directly
          tag.x += (mouseX - tag.x) * 0.35
          tag.y += (mouseY - tag.y) * 0.35
        }

        // Bouncing boundaries (Walls & Floors)
        // Left
        if (tag.x - tag.radius < 0) {
          tag.x = tag.radius
          tag.vx *= bounceElasticity
        }
        // Right
        if (tag.x + tag.radius > canvas.width) {
          tag.x = canvas.width - tag.radius
          tag.vx *= bounceElasticity
        }
        // Top
        if (tag.y - tag.radius < 0) {
          tag.y = tag.radius
          tag.vy *= bounceElasticity
        }
        // Bottom
        if (tag.y + tag.radius > canvas.height) {
          tag.y = canvas.height - tag.radius
          tag.vy *= bounceElasticity
          // Snap near zero velocities to prevent micro-twitching on floor
          if (Math.abs(tag.vy) < 0.15) tag.vy = 0
          if (Math.abs(tag.vx) < 0.08) tag.vx = 0
        }

        // Cursor Repel Field (when mouse is active and near any tag)
        const mouseDistX = mouseX - tag.x
        const mouseDistY = mouseY - tag.y
        const distFromMouse = Math.sqrt(mouseDistX * mouseDistX + mouseDistY * mouseDistY)
        const repelRadius = 130
        
        if (distFromMouse < repelRadius && i !== draggedIndex) {
          const force = (1.0 - distFromMouse / repelRadius) * 0.4
          tag.vx -= (mouseDistX / distFromMouse) * force * 4
          tag.vy -= (mouseDistY / distFromMouse) * force * 4
        }
      }

      // 2. Solve Tag-to-Tag Elastic Collisions (nested resolution)
      for (let i = 0; i < tags.length; i++) {
        const t1 = tags[i]
        for (let j = i + 1; j < tags.length; j++) {
          const t2 = tags[j]

          const dx = t2.x - t1.x
          const dy = t2.y - t1.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const minDist = t1.radius + t2.radius

          if (dist < minDist) {
            // Un-overlap correction (push them apart equally)
            const overlap = minDist - dist
            const nx = dx / dist
            const ny = dy / dist

            t1.x -= nx * overlap * 0.5
            t1.y -= ny * overlap * 0.5
            t2.x += nx * overlap * 0.5
            t2.y += ny * overlap * 0.5

            // Elastic velocity resolution (exchange momentum)
            const kx = t1.vx - t2.vx
            const ky = t1.vy - t2.vy
            
            // Standard elastic collision dot product formulas
            const p = 2 * (t1.vx * nx + t1.vy * ny - t2.vx * nx - t2.vy * ny) / (t1.mass + t2.mass)
            
            t1.vx -= p * t2.mass * nx
            t1.vy -= p * t2.mass * ny
            t2.vx += p * t1.mass * nx
            t2.vy += p * t1.mass * ny

            // Play light tick sounds on strong tag collisions
            if (dist < minDist * 0.95 && Math.abs(p) > 1.5) {
              playSound("tick")
            }
          }
        }
      }

      // 3. Render Tags (Frosted Neon Pill capsules)
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i]

        // Capsule backdrop shadow glow
        ctx.beginPath()
        ctx.arc(tag.x, tag.y, tag.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(0, 0, 0, 0.45)"
        ctx.fill()

        // Border line neon glow
        ctx.lineWidth = 1.5
        ctx.strokeStyle = draggedIndex === i ? "#c8f550" : "rgba(255, 255, 255, 0.1)"
        ctx.stroke()

        // Core text center alignment
        ctx.font = "bold 11px sans-serif"
        ctx.fillStyle = draggedIndex === i ? "#c8f550" : tag.color === "#ffffff" ? "rgba(255,255,255,0.9)" : tag.color
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(tag.label.toUpperCase(), tag.x, tag.y)
      }

      animationFrameId = requestAnimationFrame(updatePhysics)
    }

    updatePhysics()

    // Cleanups
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleMouseUp)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mounted, activeTab])

  if (!mounted) return null

  return (
    <div ref={containerRef} className="w-full rounded-2xl bg-zinc-950/80 border border-white/5 relative overflow-hidden backdrop-blur-md p-6">
      {/* Central lighting divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8f550]/30 to-transparent" />

      {/* Control row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-brier uppercase tracking-wider text-white">
            GRAVITY <span className="text-[#c8f550]">TOYBOX</span>
          </h3>
          <p className="text-[11px] text-white/50 uppercase tracking-widest mt-1">
            Drag, throw, and toggle physical skills widgets
          </p>
        </div>

        {/* Tab triggers */}
        <div className="flex items-center gap-1 bg-white/[0.02] border border-white/5 p-1 rounded-full w-fit">
          <button
            onClick={() => { playSound("click"); setActiveTab("gravity"); }}
            className={`px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest rounded-full transition-all ${
              activeTab === "gravity" ? "bg-[#c8f550] text-black" : "text-white/60 hover:text-white"
            }`}
          >
            Gravity Box
          </button>
          <button
            onClick={() => { playSound("click"); setActiveTab("orbit"); }}
            className={`px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest rounded-full transition-all ${
              activeTab === "orbit" ? "bg-[#c8f550] text-black" : "text-white/60 hover:text-white"
            }`}
          >
            Vortex Orbit
          </button>
        </div>
      </div>

      {/* Main interactive physics cage canvas */}
      <div className="relative w-full h-[360px] rounded-xl bg-black/60 border border-white/[0.03] overflow-hidden cursor-grab active:cursor-grabbing">
        {/* Visual Cybergrid inside physics box */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Floating Instruction overlay */}
        <div className="absolute inset-x-0 bottom-4 text-center pointer-events-none opacity-40">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c8f550] animate-pulse">
            • Tap or Toss pills to trigger collision pops •
          </span>
        </div>

        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  )
}
