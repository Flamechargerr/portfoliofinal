"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { playSound } from "@/lib/audio"
import { SplineScene } from "@/components/ui/splite"

import { CreativePlayground } from "@/components/ui/creative-playground"

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

    return (
        <div className="py-20 bg-lorenzo-dark relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-12 h-px bg-lorenzo-accent/30" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8f550]">
                            CREATIVE PLAYGROUND
                        </span>
                        <div className="w-12 h-px bg-lorenzo-accent/30" />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-brier text-lorenzo-light uppercase mb-3">
                        BEYOND THE <span className="text-[#c8f550]">CODE</span>
                    </h3>
                    <p className="text-lorenzo-light/50 max-w-md mx-auto text-sm leading-relaxed">
                        A few interactive details and personal hallmarks that outline who I am outside compiling scripts.
                    </p>
                </motion.div>

                {/* 1. DYNAMIC FACTS BENTO GRID */}
                <motion.div 
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                >
                    {funFacts.map((fact, index) => (
                        <motion.div
                            key={fact.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.1 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group p-6 rounded-2xl border border-white/10 hover:border-[#c8f550]/40 bg-white/5 hover:bg-white/10 text-center cursor-pointer overflow-hidden transition-all duration-300"
                            onMouseEnter={() => {
                                setHoveredIndex(index)
                                playSound("tick")
                            }}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => playSound("click")}
                            whileHover={{ y: -5 }}
                        >
                            {/* Glow backlights */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#c8f550]/0 to-[#c8f550]/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <motion.div
                                className="text-4xl mb-3 flex justify-center"
                                animate={{
                                    scale: hoveredIndex === index ? 1.25 : 1,
                                    rotate: hoveredIndex === index ? [0, -8, 8, 0] : 0
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {fact.emoji}
                            </motion.div>
                            <div className="text-sm font-bold text-white uppercase tracking-wider mb-2">{fact.title}</div>
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{
                                    opacity: hoveredIndex === index ? 1 : 0,
                                    height: hoveredIndex === index ? "auto" : 0
                                }}
                                className="text-xs text-white/50 group-hover:text-white/80 transition-colors overflow-hidden"
                            >
                                {fact.description}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

