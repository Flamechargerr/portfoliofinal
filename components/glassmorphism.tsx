"use client"

import { motion } from "framer-motion"

export default function GlassmorphismCard({
    children,
    className = "",
    blur = "md"
}: {
    children: React.ReactNode
    className?: string
    blur?: "sm" | "md" | "lg" | "xl"
}) {
    const blurClasses = {
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
        lg: "backdrop-blur-lg",
        xl: "backdrop-blur-xl",
    }

    return (
        <motion.div
            className={`
        bg-white/5 ${blurClasses[blur]} 
        border border-white/10 
        shadow-lg shadow-black/10
        ${className}
      `}
            whileHover={{
                boxShadow: "0 0 30px rgba(200, 245, 80, 0.1)",
                borderColor: "rgba(200, 245, 80, 0.3)"
            }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    )
}

// Glassmorphism stat card
export function GlassStatCard({
    value,
    label,
    icon
}: {
    value: string
    label: string
    icon?: React.ReactNode
}) {
    return (
        <GlassmorphismCard className="p-6 text-center">
            {icon && (
                <div className="text-3xl mb-3">{icon}</div>
            )}
            <div className="text-3xl md:text-4xl font-brier text-lorenzo-accent mb-1">
                {value}
            </div>
            <div className="text-xs text-lorenzo-light/60 uppercase tracking-wider">
                {label}
            </div>
        </GlassmorphismCard>
    )
}

// Glassmorphism navigation pill
export function GlassNavPill({
    children,
    active = false,
    onClick
}: {
    children: React.ReactNode
    active?: boolean
    onClick?: () => void
}) {
    return (
        <motion.button
            onClick={onClick}
            className={`
        px-6 py-3 rounded-full 
        ${active
                    ? "bg-lorenzo-accent text-lorenzo-dark"
                    : "bg-white/5 backdrop-blur-md border border-white/10 text-lorenzo-light hover:bg-white/10"
                }
        font-bold text-sm uppercase tracking-wider
        transition-colors
      `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.button>
    )
}
