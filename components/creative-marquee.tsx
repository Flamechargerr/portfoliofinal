"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ThreeDMarquee } from "@/components/ui/3d-marquee"

const images = [
    "/images/project-showcase.png",
    "/images/project-medrag.png",
    "/images/project-crimeconnect.png",
    "/images/project-hackops.png",
    "/images/project-vartificial.png",
    "/images/project-smartmaps3d.png",
    "/images/project-emiplatform.png",
    "/images/tech-workspace.png",
    "/images/data-viz.png",
    "/images/code-abstract.png",
    "/images/project-game.png",
    "/images/project-flora.png"
]

export default function CreativeMarquee() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

    return (
        <section ref={sectionRef} className="py-24 bg-black overflow-hidden relative border-t border-white/5">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-12 h-px bg-lorenzo-accent/30" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8f550]">
                            VISUAL GRID
                        </span>
                        <div className="w-12 h-px bg-lorenzo-accent/30" />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-brier text-lorenzo-light uppercase mb-3">
                        SYSTEM <span className="text-[#c8f550]">ARCHITECTURE</span> WALL
                    </h3>
                    <p className="text-lorenzo-light/50 max-w-md mx-auto text-sm leading-relaxed">
                        A dynamic, tilted perspective wall showcasing interface captures, blueprints, and database graphs across my shipped systems.
                    </p>
                </motion.div>

                {/* 3D Marquee */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="relative"
                >
                    <ThreeDMarquee images={images} />
                </motion.div>
            </div>
        </section>
    )
}
