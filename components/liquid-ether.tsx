"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface LiquidEtherProps {
    className?: string
    colors?: string[]
    speed?: number
    blur?: number
    opacity?: number
}

export default function LiquidEther({
    className = "",
    colors = ["#c8f550", "#22c55e", "#3b82f6", "#8b5cf6"],
    speed = 0.5,
    blur = 100,
    opacity = 0.3
}: LiquidEtherProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let time = 0

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resize()
        window.addEventListener("resize", resize)

        const blobs: Blob[] = colors.map((color, index) => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 200 + 150,
            xSpeed: (Math.random() - 0.5) * speed,
            ySpeed: (Math.random() - 0.5) * speed,
            color
        }))

        interface Blob {
            x: number
            y: number
            radius: number
            xSpeed: number
            ySpeed: number
            color: string
        }

        const animate = () => {
            time += 0.01

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            blobs.forEach((blob, index) => {
                // Update position with sin/cos for organic movement
                blob.x += blob.xSpeed + Math.sin(time + index) * 0.5
                blob.y += blob.ySpeed + Math.cos(time + index * 0.5) * 0.5

                // Wrap around edges
                if (blob.x < -blob.radius) blob.x = canvas.width + blob.radius
                if (blob.x > canvas.width + blob.radius) blob.x = -blob.radius
                if (blob.y < -blob.radius) blob.y = canvas.height + blob.radius
                if (blob.y > canvas.height + blob.radius) blob.y = -blob.radius

                // Draw blob with gradient
                const gradient = ctx.createRadialGradient(
                    blob.x, blob.y, 0,
                    blob.x, blob.y, blob.radius
                )
                gradient.addColorStop(0, blob.color)
                gradient.addColorStop(1, "transparent")

                ctx.beginPath()
                ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2)
                ctx.fillStyle = gradient
                ctx.fill()
            })

            animationRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", resize)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [colors, speed])

    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{
                    filter: `blur(${blur}px)`,
                    opacity
                }}
            />
        </div>
    )
}

// Simpler CSS-based liquid effect
export function LiquidBackground({ className = "" }: { className?: string }) {
    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            {/* Blob 1 */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full opacity-30"
                style={{
                    background: "radial-gradient(circle, #c8f550 0%, transparent 70%)",
                    filter: "blur(60px)",
                    left: "10%",
                    top: "20%"
                }}
                animate={{
                    x: [0, 100, -50, 0],
                    y: [0, -80, 60, 0],
                    scale: [1, 1.2, 0.9, 1]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Blob 2 */}
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full opacity-20"
                style={{
                    background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
                    filter: "blur(80px)",
                    right: "15%",
                    top: "30%"
                }}
                animate={{
                    x: [0, -80, 50, 0],
                    y: [0, 60, -40, 0],
                    scale: [1, 0.8, 1.1, 1]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Blob 3 */}
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full opacity-25"
                style={{
                    background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
                    filter: "blur(70px)",
                    left: "40%",
                    bottom: "10%"
                }}
                animate={{
                    x: [0, 50, -80, 0],
                    y: [0, -50, 80, 0],
                    scale: [1, 1.1, 0.95, 1]
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    )
}

// Gradient mesh effect
export function GradientMesh({ className = "" }: { className?: string }) {
    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            <svg
                className="absolute inset-0 w-full h-full opacity-30"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <filter id="liquid-filter">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.01"
                            numOctaves="3"
                            result="noise"
                        >
                            <animate
                                attributeName="baseFrequency"
                                dur="30s"
                                values="0.01;0.02;0.01"
                                repeatCount="indefinite"
                            />
                        </feTurbulence>
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale="50"
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                    <linearGradient id="liquid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c8f550" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                </defs>
                <rect
                    width="100%"
                    height="100%"
                    fill="url(#liquid-gradient)"
                    filter="url(#liquid-filter)"
                />
            </svg>
        </div>
    )
}
