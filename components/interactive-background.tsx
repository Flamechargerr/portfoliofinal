"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Particle {
    x: number
    y: number
    z: number // Depth for 3D effect (parallax)
    size: number
    speedX: number
    speedY: number
    alpha: number
    hue: number
}

export default function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: 0, y: 0, isActive: false })
    const particlesRef = useRef<Particle[]>([])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d", { alpha: false }) // Optimize for solid background
        if (!ctx) return

        let animationFrameId: number
        const particles: Particle[] = []
        const PARTICLE_COUNT = 150
        // Connecting distance. Lines fade out as they get longer.
        const CONNECTION_DISTANCE = 150
        // Mouse repelling distance
        const MOUSE_RADIUS = 200

        const initCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight

            // Re-initialize particles on resize
            particles.length = 0
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                // Generate a random z value between 0.1 (far) and 1 (near)
                const z = Math.random() * 0.9 + 0.1

                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    z: z,
                    // Closer particles are larger
                    size: (Math.random() * 1.5 + 0.5) * z,
                    // Closer particles move slightly faster
                    speedX: (Math.random() - 0.5) * 0.5 * z,
                    speedY: (Math.random() - 0.5) * 0.5 * z,
                    // Base opacity - closer are strictly brighter
                    alpha: z * 0.5,
                    // Color variation (mix of the brand green/lime and subtle blue)
                    hue: Math.random() > 0.5 ? 80 : 200 // 80 is roughly the lime-accent, 200 is tech-blue
                })
            }
            particlesRef.current = particles
        }

        const animate = () => {
            // Fill background with the dark lorenzo theme color
            ctx.fillStyle = "#0A0A0A"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw and update particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]

                // Move
                p.x += p.speedX
                p.y += p.speedY

                // Wrap around edges
                if (p.x < 0) p.x = canvas.width
                if (p.x > canvas.width) p.x = 0
                if (p.y < 0) p.y = canvas.height
                if (p.y > canvas.height) p.y = 0

                // Mouse interaction - repel slightly
                if (mouseRef.current.isActive) {
                    const dx = p.x - mouseRef.current.x
                    const dy = p.y - mouseRef.current.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < MOUSE_RADIUS) {
                        // Repel factor based on distance and depth (z)
                        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS
                        p.x += (dx / distance) * force * p.z * 2
                        p.y += (dy / distance) * force * p.z * 2
                    }
                }

                // Draw Particle (Node)
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.alpha})`
                ctx.fill()

                // Draw Connections (Edges)
                // Only loop through the remaining particles to avoid drawing double lines
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j]

                    // Optimization: only connect particles that are roughly on the same z-plane
                    // This creates a much cooler 3D layered parallax effect.
                    if (Math.abs(p.z - p2.z) > 0.3) continue

                    const dx = p.x - p2.x
                    const dy = p.y - p2.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < CONNECTION_DISTANCE) {
                        // Opacity fades out as distance increases
                        // It is also blended with the depth (z) of the first particle
                        const opacity = (1 - distance / CONNECTION_DISTANCE) * p.z * 0.3

                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.strokeStyle = `hsla(80, 80%, 60%, ${opacity})`
                        ctx.lineWidth = p.z // Closer lines are thicker
                        ctx.stroke()
                    }
                }
            }

            // Draw a subtle radial gradient around the mouse cursor to act as a "flashlight"
            if (mouseRef.current.isActive) {
                const gradient = ctx.createRadialGradient(
                    mouseRef.current.x, mouseRef.current.y, 0,
                    mouseRef.current.x, mouseRef.current.y, MOUSE_RADIUS * 1.5
                )
                gradient.addColorStop(0, "rgba(200, 245, 80, 0.03)") // Brand accent color
                gradient.addColorStop(1, "rgba(200, 245, 80, 0)")

                ctx.fillStyle = gradient
                ctx.fillRect(0, 0, canvas.width, canvas.height)
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        initCanvas()
        animate()

        // Event Listeners
        const handleResize = () => {
            initCanvas()
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY,
                isActive: true
            }
        }

        const handleMouseLeave = () => {
            mouseRef.current.isActive = false
        }

        window.addEventListener("resize", handleResize)
        window.addEventListener("mousemove", handleMouseMove)
        document.body.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
            document.body.removeEventListener("mouseleave", handleMouseLeave)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 z-[-1] pointer-events-none"
            style={{
                background: "#0A0A0A", // Match theme dark bg
                // Adds a slight noise texture on top via CSS class for filmic look
            }}
        />
    )
}
