"use client"

import { motion } from "framer-motion"

interface GradientTextProps {
    children: React.ReactNode
    className?: string
    animate?: boolean
}

export default function GradientText({ children, className = "", animate = true }: GradientTextProps) {
    if (animate) {
        return (
            <motion.span
                className={`bg-gradient-to-r from-lorenzo-accent via-yellow-400 to-lorenzo-accent bg-[length:200%_auto] bg-clip-text text-transparent ${className}`}
                animate={{
                    backgroundPosition: ["0% center", "200% center"],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {children}
            </motion.span>
        )
    }

    return (
        <span className={`bg-gradient-to-r from-lorenzo-accent to-yellow-400 bg-clip-text text-transparent ${className}`}>
            {children}
        </span>
    )
}

// Shimmer text effect
export function ShimmerText({ children, className = "" }: GradientTextProps) {
    return (
        <motion.span
            className={`relative inline-block ${className}`}
            style={{
                background: "linear-gradient(90deg, #c8f550 0%, #fff 50%, #c8f550 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
            }}
            animate={{
                backgroundPosition: ["200% 0", "-200% 0"],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
            }}
        >
            {children}
        </motion.span>
    )
}

// Split text animation
export function SplitText({ children, className = "" }: { children: string; className?: string }) {
    const letters = children.split("")

    return (
        <span className={className}>
            {letters.map((letter, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="inline-block"
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </span>
    )
}
