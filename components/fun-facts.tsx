"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface FunFact {
    emoji: string
    title: string
    description: string
}

const funFacts: FunFact[] = [
    { emoji: "🚀", title: "15+ Projects Shipped", description: "From concept to deployment across web, ML & games" },
    { emoji: "🎮", title: "Gamer at Heart", description: "Love playing competitive games & building game mechanics" },
    { emoji: "☕", title: "Coffee Powered", description: "My code runs on caffeine - 4+ cups daily" },
    { emoji: "🌙", title: "Night Owl", description: "Most productive between midnight and 4 AM" },
    { emoji: "🏃", title: "Fitness Balance", description: "Balance coding with regular workouts and sports" },
    { emoji: "🎵", title: "Lo-fi Coder", description: "Can't code without lo-fi hip hop in the background" },
]

export default function FunFactsSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

    return (
        <div ref={sectionRef} className="py-16 bg-lorenzo-dark">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h3 className="text-2xl md:text-3xl font-brier text-lorenzo-light uppercase mb-2">
                        BEYOND THE <span className="text-lorenzo-accent">CODE</span>
                    </h3>
                    <p className="text-lorenzo-light/50">A few things that make me, me</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {funFacts.map((fact, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.1 }}
                            className="relative group p-6 border border-lorenzo-accent/20 hover:border-lorenzo-accent bg-lorenzo-dark/50 text-center cursor-pointer overflow-hidden"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            whileHover={{ y: -5 }}
                        >
                            <motion.div
                                className="text-4xl mb-3"
                                animate={{
                                    scale: hoveredIndex === index ? 1.3 : 1,
                                    rotate: hoveredIndex === index ? [0, -10, 10, 0] : 0
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {fact.emoji}
                            </motion.div>
                            <div className="text-sm font-bold text-lorenzo-light uppercase mb-1">{fact.title}</div>
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{
                                    opacity: hoveredIndex === index ? 1 : 0,
                                    height: hoveredIndex === index ? "auto" : 0
                                }}
                                className="text-xs text-lorenzo-light/50 overflow-hidden"
                            >
                                {fact.description}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
