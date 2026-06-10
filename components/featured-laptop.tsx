"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MacbookScroll } from "@/components/ui/macbook-scroll"

export default function FeaturedLaptop() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

    return (
        <section ref={sectionRef} className="py-24 bg-lorenzo-dark overflow-hidden relative border-t border-white/5">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-6"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-12 h-px bg-lorenzo-accent/30" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8f550]">
                            FLAGSHIP SYSTEM
                        </span>
                        <div className="w-12 h-px bg-lorenzo-accent/30" />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-brier text-lorenzo-light uppercase mb-3">
                        SHIPPING <span className="text-[#c8f550]">CHARGER OS</span>
                    </h3>
                    <p className="text-lorenzo-light/50 max-w-md mx-auto text-sm leading-relaxed">
                        An interactive browser desktop operating system simulation. Scroll down to witness the fold-open hardware emulator.
                    </p>
                </motion.div>

                {/* Macbook Scroll */}
                <div className="w-full flex justify-center -mt-24 md:-mt-12">
                    <MacbookScroll
                        title={
                            <span className="text-xl md:text-3xl font-brier uppercase text-lorenzo-light">
                                Interactive OS Simulation <br /> <span className="text-lorenzo-accent">59 built-in apps</span>
                            </span>
                        }
                        src="/images/project-chargeros.png"
                        showGradient={true}
                    />
                </div>
            </div>
        </section>
    )
}
