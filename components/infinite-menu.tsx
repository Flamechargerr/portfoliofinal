"use client"

import { motion, useMotionValue, animate } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface InfiniteMenuItem {
    id: string
    label: string
    image?: string
    href?: string
}

interface InfiniteMenuProps {
    items: InfiniteMenuItem[]
    speed?: number
    direction?: "left" | "right"
    pauseOnHover?: boolean
}

export default function InfiniteMenu({
    items,
    speed = 30,
    direction = "left",
    pauseOnHover = true
}: InfiniteMenuProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null)
    const [isPaused, setIsPaused] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)

    // Double the items for seamless loop
    const duplicatedItems = [...items, ...items, ...items]

    useEffect(() => {
        if (isPaused) return

        const itemWidth = 200 // Width of each item
        const totalWidth = items.length * itemWidth
        const startPosition = direction === "left" ? 0 : -totalWidth
        const endPosition = direction === "left" ? -totalWidth : 0

        x.set(startPosition)

        const controls = animate(x, endPosition, {
            duration: speed,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
        })

        return () => controls.stop()
    }, [x, items.length, speed, direction, isPaused])

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden py-8"
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        >
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-lorenzo-dark to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-lorenzo-dark to-transparent z-10" />

            <motion.div
                className="flex gap-6"
                style={{ x }}
            >
                {duplicatedItems.map((item, index) => (
                    <motion.div
                        key={`${item.id}-${index}`}
                        className="relative flex-shrink-0 w-44 h-56 rounded-2xl overflow-hidden cursor-pointer group"
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        whileHover={{ scale: 1.08, y: -12 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {/* Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />

                        {/* Background glow on hover */}
                        <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                                background: "radial-gradient(circle at center, rgba(200, 245, 80, 0.15) 0%, transparent 70%)"
                            }}
                        />

                        {/* Icon Container */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                            {item.image ? (
                                <motion.div
                                    className="relative w-20 h-20 mb-4"
                                    animate={{
                                        scale: hoveredId === item.id ? 1.15 : 1,
                                        y: hoveredId === item.id ? -5 : 0
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={item.image}
                                        alt={item.label}
                                        className="w-full h-full object-contain filter drop-shadow-lg"
                                        style={{
                                            filter: hoveredId === item.id
                                                ? "drop-shadow(0 0 20px rgba(200, 245, 80, 0.5))"
                                                : "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))"
                                        }}
                                    />
                                </motion.div>
                            ) : (
                                <div className="w-20 h-20 mb-4 rounded-xl bg-lorenzo-accent/20 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-lorenzo-accent">
                                        {item.label.charAt(0)}
                                    </span>
                                </div>
                            )}

                            {/* Label */}
                            <motion.h3
                                className="text-sm font-bold uppercase tracking-wider text-center transition-colors"
                                animate={{
                                    color: hoveredId === item.id ? "#c8f550" : "#ffffff"
                                }}
                            >
                                {item.label}
                            </motion.h3>
                        </div>

                        {/* Border glow */}
                        <motion.div
                            className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                            style={{ borderColor: "rgba(200, 245, 80, 0.1)" }}
                            animate={{
                                borderColor: hoveredId === item.id ? "rgba(200, 245, 80, 0.6)" : "rgba(200, 245, 80, 0.1)",
                                boxShadow: hoveredId === item.id
                                    ? "0 0 30px rgba(200, 245, 80, 0.2), inset 0 0 20px rgba(200, 245, 80, 0.05)"
                                    : "none"
                            }}
                        />

                        {/* Corner accents */}
                        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-lorenzo-accent/30 group-hover:border-lorenzo-accent transition-colors" />
                        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-lorenzo-accent/30 group-hover:border-lorenzo-accent transition-colors" />
                        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-lorenzo-accent/30 group-hover:border-lorenzo-accent transition-colors" />
                        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-lorenzo-accent/30 group-hover:border-lorenzo-accent transition-colors" />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

// Vertical infinite scroll version
export function InfiniteMenuVertical({
    items,
    speed = 20
}: {
    items: InfiniteMenuItem[]
    speed?: number
}) {
    const y = useMotionValue(0)
    const duplicatedItems = [...items, ...items, ...items]

    useEffect(() => {
        const itemHeight = 80
        const totalHeight = items.length * itemHeight

        const controls = animate(y, -totalHeight, {
            duration: speed,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
        })

        return () => controls.stop()
    }, [y, items.length, speed])

    return (
        <div className="relative h-80 overflow-hidden">
            {/* Gradient masks */}
            <div className="absolute left-0 right-0 top-0 h-16 bg-gradient-to-b from-lorenzo-dark to-transparent z-10" />
            <div className="absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-lorenzo-dark to-transparent z-10" />

            <motion.div className="flex flex-col gap-4" style={{ y }}>
                {duplicatedItems.map((item, index) => (
                    <motion.div
                        key={`${item.id}-${index}`}
                        className="px-6 py-3 rounded-lg bg-lorenzo-accent/10 border border-lorenzo-accent/20"
                        whileHover={{
                            scale: 1.02,
                            backgroundColor: "rgba(200, 245, 80, 0.2)",
                            borderColor: "#c8f550"
                        }}
                    >
                        <span className="text-lorenzo-light font-medium">{item.label}</span>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
