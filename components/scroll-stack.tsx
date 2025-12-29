"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, ReactNode } from "react"

interface ScrollStackItem {
    id: string
    content: ReactNode
    bgColor?: string
}

interface ScrollStackProps {
    items: ScrollStackItem[]
    itemHeight?: number
}

export default function ScrollStack({ items, itemHeight = 400 }: ScrollStackProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{ height: `${items.length * itemHeight}px` }}
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                {items.map((item, index) => {
                    const targetScale = 1 - (items.length - 1 - index) * 0.05
                    const range = [index / items.length, (index + 1) / items.length]

                    return (
                        <ScrollStackCard
                            key={item.id}
                            item={item}
                            index={index}
                            targetScale={targetScale}
                            range={range}
                            progress={scrollYProgress}
                            total={items.length}
                        />
                    )
                })}
            </div>
        </div>
    )
}

interface ScrollStackCardProps {
    item: ScrollStackItem
    index: number
    targetScale: number
    range: number[]
    progress: any
    total: number
}

function ScrollStackCard({ item, index, targetScale, range, progress, total }: ScrollStackCardProps) {
    const scale = useTransform(progress, range, [1, targetScale])
    const y = useTransform(progress, range, [0, -50 * (total - 1 - index)])
    const opacity = useTransform(
        progress,
        [range[0], range[0] + 0.1, range[1] - 0.1, range[1]],
        [0, 1, 1, index === total - 1 ? 1 : 0.8]
    )

    return (
        <motion.div
            className="absolute inset-x-4 md:inset-x-12 top-1/2 -translate-y-1/2"
            style={{
                scale,
                y,
                opacity,
                zIndex: index,
                transformOrigin: "top center"
            }}
        >
            <div
                className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
                style={{
                    backgroundColor: item.bgColor || "#1a1a1a",
                    minHeight: "300px"
                }}
            >
                {item.content}
            </div>
        </motion.div>
    )
}

// Simpler version for showcasing projects or features
export function StackedCards({ children }: { children: ReactNode[] }) {
    return (
        <div className="relative">
            {children.map((child, index) => (
                <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                        zIndex: children.length - index,
                        marginTop: index > 0 ? "-2rem" : 0
                    }}
                >
                    <motion.div
                        className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-lorenzo-accent/20 rounded-xl p-6 shadow-xl"
                        whileHover={{
                            y: -10,
                            scale: 1.02,
                            boxShadow: "0 20px 40px rgba(200, 245, 80, 0.1)"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {child}
                    </motion.div>
                </motion.div>
            ))}
        </div>
    )
}
