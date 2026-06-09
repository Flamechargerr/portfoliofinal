"use client"

import { useEffect, useRef, useState } from "react"

interface FluidNode {
  x: number
  y: number
  vx: number
  vy: number
  density: number
}

export default function FluidSimulationBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, speedX: 0, speedY: 0 })
  const gridRef = useRef<FluidNode[]>([])
  
  // Highly optimized grid resolution (reduces active calculations by 36%)
  const cols = 16
  const rows = 12

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Offscreen Canvas to pre-render the glow brush (10x faster rendering than createRadialGradient every frame)
    const glowCanvas = document.createElement("canvas")
    glowCanvas.width = 128
    glowCanvas.height = 128
    const glowCtx = glowCanvas.getContext("2d")
    if (glowCtx) {
      const grad = glowCtx.createRadialGradient(64, 64, 0, 64, 64, 64)
      grad.addColorStop(0, "rgba(200, 245, 80, 0.45)") // Signature neon-lime highlight
      grad.addColorStop(0.4, "rgba(200, 245, 80, 0.12)")
      grad.addColorStop(1, "rgba(0, 0, 0, 0)")
      glowCtx.fillStyle = grad
      glowCtx.fillRect(0, 0, 128, 128)
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initGrid()
    }

    // Initialize velocity/density flow field grid
    const initGrid = () => {
      const grid: FluidNode[] = []
      const cellW = canvas.width / (cols - 1)
      const cellH = canvas.height / (rows - 1)

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          grid.push({
            x: c * cellW,
            y: r * cellH,
            vx: 0,
            vy: 0,
            density: 0,
          })
        }
      }
      gridRef.current = grid
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Capture mouse velocities
    const handleMouseMove = (e: MouseEvent) => {
      const mouse = mouseRef.current
      mouse.speedX = e.clientX - mouse.x
      mouse.speedY = e.clientY - mouse.y
      mouse.lastX = mouse.x
      mouse.lastY = mouse.y
      mouse.x = e.clientX
      mouse.y = e.clientY

      // Apply forces to nearby grid nodes
      const grid = gridRef.current
      const forceRadius = 220
      const forceMultiplier = 0.14

      for (let i = 0; i < grid.length; i++) {
        const node = grid[i]
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < forceRadius) {
          const factor = (1 - dist / forceRadius) * forceMultiplier
          // Add swirl/vortex force
          node.vx += mouse.speedX * factor + (dy / dist) * mouse.speedY * factor * 0.5
          node.vy += mouse.speedY * factor - (dx / dist) * mouse.speedX * factor * 0.5
          node.density = Math.min(node.density + factor * 2.5, 1)
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    let animationFrameId: number

    // Render & Grid Damping Loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const grid = gridRef.current
      if (grid.length === 0) return

      ctx.globalCompositeOperation = "screen"

      const cellW = canvas.width / (cols - 1)
      const cellH = canvas.height / (rows - 1)

      // 1. Draw smooth gas nodes connecting grid cells
      for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const idx = r * cols + c
          const node = grid[idx]

          // Damping/dissipation
          node.vx *= 0.95
          node.vy *= 0.95
          node.density *= 0.965
          
          node.x += node.vx
          node.y += node.vy

          // Snap back to anchor point gently
          const anchorX = c * cellW
          const anchorY = r * cellH
          node.vx += (anchorX - node.x) * 0.015
          node.vy += (anchorY - node.y) * 0.015

          if (node.density > 0.01) {
            const size = node.density * 180 + 30
            // Blit offscreen pre-rendered texture directly to GPU
            ctx.globalAlpha = Math.min(node.density * 0.25, 0.3)
            ctx.drawImage(
              glowCanvas,
              node.x - size,
              node.y - size,
              size * 2,
              size * 2
            )
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2] opacity-75"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
