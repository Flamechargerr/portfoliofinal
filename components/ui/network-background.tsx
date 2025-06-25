"use client"

import { useEffect, useRef, useCallback } from "react"

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const nodesRef = useRef<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
    }>
  >([])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const nodes = nodesRef.current

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update node positions
    nodes.forEach((node) => {
      node.x += node.vx
      node.y += node.vy

      // Bounce off edges
      if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1
      if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1

      // Keep nodes in bounds
      node.x = Math.max(0, Math.min(canvas.width, node.x))
      node.y = Math.max(0, Math.min(canvas.height, node.y))
    })

    // Draw connections (optimized)
    ctx.strokeStyle = "rgba(34, 197, 94, 0.08)"
    ctx.lineWidth = 1

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          // Reduced connection distance
          const opacity = (100 - distance) / 100
          ctx.strokeStyle = `rgba(34, 197, 94, ${opacity * 0.1})`
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.stroke()
        }
      }
    }

    // Draw nodes
    ctx.fillStyle = "rgba(34, 197, 94, 0.3)"
    nodes.forEach((node) => {
      ctx.beginPath()
      ctx.arc(node.x, node.y, 1, 0, Math.PI * 2)
      ctx.fill()
    })

    animationRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    // Reduced node count for better performance
    const nodeCount = 20
    const nodes: Array<{
      x: number
      y: number
      vx: number
      vy: number
    }> = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2, // Slower movement
        vy: (Math.random() - 0.5) * 0.2,
      })
    }

    nodesRef.current = nodes

    const handleResize = () => {
      resizeCanvas()
      // Reposition nodes on resize
      nodes.forEach((node) => {
        if (node.x > canvas.width) node.x = canvas.width
        if (node.y > canvas.height) node.y = canvas.height
      })
    }

    window.addEventListener("resize", handleResize, { passive: true })
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}
