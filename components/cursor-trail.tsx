"use client"

import { useEffect, useRef } from "react"

export default function CursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const pointsRef = useRef<{ x: number; y: number; age: number }[]>([])
    const mouseRef = useRef({ x: -100, y: -100 })
    const isVisibleRef = useRef(false)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY }
            isVisibleRef.current = true
        }

        const handleMouseLeave = () => {
            isVisibleRef.current = false
        }

        window.addEventListener("mousemove", handleMouseMove)
        document.body.addEventListener("mouseleave", handleMouseLeave)

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        const tick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            if (isVisibleRef.current) {
                // Add new point at current mouse position
                pointsRef.current.push({
                    x: mouseRef.current.x,
                    y: mouseRef.current.y,
                    age: 0
                })
            }

            // Limit history length to make trail length dynamic
            if (pointsRef.current.length > 25) {
                pointsRef.current.shift()
            }

            // Draw curved connector trail
            if (pointsRef.current.length > 1) {
                ctx.beginPath()
                ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y)

                for (let i = 1; i < pointsRef.current.length; i++) {
                    const xc = (pointsRef.current[i].x + pointsRef.current[i - 1].x) / 2
                    const yc = (pointsRef.current[i].y + pointsRef.current[i - 1].y) / 2
                    ctx.quadraticCurveTo(pointsRef.current[i - 1].x, pointsRef.current[i - 1].y, xc, yc)
                }

                ctx.strokeStyle = "rgba(200, 245, 80, 0.25)"
                ctx.lineWidth = 3
                ctx.lineCap = "round"
                ctx.lineJoin = "round"
                ctx.stroke()
                
                // Draw glowing particles along points for digital look
                pointsRef.current.forEach((point, index) => {
                    const ratio = index / pointsRef.current.length
                    ctx.beginPath()
                    ctx.arc(point.x, point.y, ratio * 2.5, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(200, 245, 80, ${ratio * 0.4})`
                    ctx.fill()
                })
            }

            // Decay trail when mouse stops moving
            if (pointsRef.current.length > 0) {
                if (Math.random() > 0.4) {
                    pointsRef.current.shift()
                }
            }

            animationFrameId = requestAnimationFrame(tick)
        }

        animationFrameId = requestAnimationFrame(tick)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            document.body.removeEventListener("mouseleave", handleMouseLeave)
            window.removeEventListener("resize", resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9997] hidden md:block"
        />
    )
}
