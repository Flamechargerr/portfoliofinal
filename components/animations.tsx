"use client"

import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
    value: number
    suffix?: string
    prefix?: string
    duration?: number
    className?: string
}

export function AnimatedCounter({
    value,
    suffix = "",
    prefix = "",
    duration = 2,
    className = ""
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        if (!isInView) return

        let startTime: number
        let animationFrame: number

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

            // Easing function (easeOutExpo)
            const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

            setDisplayValue(Math.floor(easedProgress * value))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
    }, [isInView, value, duration])

    return (
        <span ref={ref} className={className}>
            {prefix}{displayValue}{suffix}
        </span>
    )
}

// Animated text reveal
interface TextRevealProps {
    text: string
    className?: string
    delay?: number
}

export function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })

    const words = text.split(" ")

    return (
        <div ref={ref} className={className}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-2">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "100%" }}
                        animate={isInView ? { y: 0 } : {}}
                        transition={{
                            duration: 0.5,
                            delay: delay + i * 0.05,
                            ease: [0.33, 1, 0.68, 1]
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </div>
    )
}

// Character-by-character reveal
export function CharacterReveal({ text, className = "", delay = 0 }: TextRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })

    const characters = text.split("")

    return (
        <div ref={ref} className={className}>
            {characters.map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        duration: 0.3,
                        delay: delay + i * 0.02,
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </div>
    )
}

// Staggered list animation
interface StaggerListProps {
    children: React.ReactNode[]
    className?: string
    staggerDelay?: number
}

export function StaggerList({ children, className = "", staggerDelay = 0.1 }: StaggerListProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <div ref={ref} className={className}>
            {children.map((child, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        duration: 0.5,
                        delay: i * staggerDelay,
                        ease: [0.33, 1, 0.68, 1]
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </div>
    )
}

// Hover scale animation wrapper
export function HoverScale({
    children,
    scale = 1.05,
    className = ""
}: {
    children: React.ReactNode
    scale?: number
    className?: string
}) {
    return (
        <motion.div
            className={className}
            whileHover={{ scale }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            {children}
        </motion.div>
    )
}

// Fade in on scroll
interface FadeInProps {
    children: React.ReactNode
    direction?: "up" | "down" | "left" | "right"
    delay?: number
    className?: string
}

export function FadeIn({
    children,
    direction = "up",
    delay = 0,
    className = ""
}: FadeInProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })

    const directionOffset = {
        up: { y: 30 },
        down: { y: -30 },
        left: { x: 30 },
        right: { x: -30 }
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, ...directionOffset[direction] }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.33, 1, 0.68, 1]
            }}
        >
            {children}
        </motion.div>
    )
}

// Parallax scroll effect
interface ParallaxProps {
    children: React.ReactNode
    speed?: number
    className?: string
}

export function Parallax({ children, speed = 0.5, className = "" }: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return
            const rect = ref.current.getBoundingClientRect()
            const scrolled = window.innerHeight - rect.top
            setOffset(scrolled * speed * 0.1)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [speed])

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y: offset }}>
                {children}
            </motion.div>
        </div>
    )
}

// Rotate on hover
export function RotateOnHover({
    children,
    degrees = 5,
    className = ""
}: {
    children: React.ReactNode
    degrees?: number
    className?: string
}) {
    return (
        <motion.div
            className={className}
            whileHover={{ rotate: degrees }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
            {children}
        </motion.div>
    )
}

// Pulse animation for attention
export function Pulse({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            className={className}
            animate={{
                scale: [1, 1.02, 1],
                opacity: [1, 0.8, 1]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            {children}
        </motion.div>
    )
}
