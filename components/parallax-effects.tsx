"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxLayerProps {
    children: React.ReactNode
    speed?: number
    className?: string
}

export function ParallaxLayer({ children, speed = 0.5, className = "" }: ParallaxLayerProps) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

    return (
        <motion.div ref={ref} style={{ y }} className={className}>
            {children}
        </motion.div>
    )
}

interface ParallaxContainerProps {
    children: React.ReactNode
    className?: string
}

export function ParallaxContainer({ children, className = "" }: ParallaxContainerProps) {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            {children}
        </div>
    )
}

// Pre-configured parallax backgrounds
export function ParallaxBackground() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.2])

    return (
        <motion.div
            ref={ref}
            className="absolute inset-0 z-0"
            style={{ y: backgroundY, opacity }}
        >
            {/* Grid overlay */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(200, 245, 80, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(200, 245, 80, 0.03) 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Floating orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-lorenzo-accent/5 blur-3xl"
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-lorenzo-accent/5 blur-3xl"
                animate={{
                    x: [0, -30, 0],
                    y: [0, 50, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, delay: 2 }}
            />
        </motion.div>
    )
}
