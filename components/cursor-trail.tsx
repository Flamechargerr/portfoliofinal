"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export default function CursorTrail() {
    const [isMounted, setIsMounted] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 200 }
    const x = useSpring(cursorX, springConfig)
    const y = useSpring(cursorY, springConfig)

    useEffect(() => {
        setIsMounted(true)

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
            setIsVisible(true)
        }

        const handleMouseLeave = () => {
            setIsVisible(false)
        }

        window.addEventListener("mousemove", moveCursor)
        document.body.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            window.removeEventListener("mousemove", moveCursor)
            document.body.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [cursorX, cursorY])

    if (!isMounted) return null

    // Create trail particles
    const particles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        delay: i * 0.05,
        scale: 1 - i * 0.1,
        opacity: 0.5 - i * 0.05,
    }))

    return (
        <div className="fixed inset-0 pointer-events-none z-[9997] hidden md:block">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute w-2 h-2 rounded-full bg-lorenzo-accent/30"
                    style={{
                        x,
                        y,
                        scale: particle.scale,
                        opacity: isVisible ? particle.opacity : 0,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    transition={{
                        delay: particle.delay,
                        duration: 0.2,
                    }}
                />
            ))}
        </div>
    )
}
