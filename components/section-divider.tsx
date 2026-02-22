"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface SectionDividerProps {
    label: string
    sublabel?: string
    variant?: "line" | "chapter" | "dot"
}

export default function SectionDivider({ label, sublabel, variant = "line" }: SectionDividerProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })

    if (variant === "chapter") {
        return (
            <div ref={ref} className="relative py-20 overflow-hidden bg-lorenzo-dark">
                {/* Large background number */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1 }}
                >
                    <span className="text-[20vw] font-brier text-lorenzo-accent/[0.03] uppercase leading-none select-none">
                        {label}
                    </span>
                </motion.div>

                <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center gap-6"
                    >
                        <motion.div
                            className="h-px bg-gradient-to-r from-transparent to-lorenzo-accent/50"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: 80 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-lorenzo-accent/70">
                            {label}
                        </span>
                        <motion.div
                            className="h-px bg-gradient-to-l from-transparent to-lorenzo-accent/50"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: 80 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        />
                    </motion.div>
                    {sublabel && (
                        <motion.p
                            className="text-lorenzo-light/30 text-sm mt-3 font-mona"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.5 }}
                        >
                            {sublabel}
                        </motion.p>
                    )}
                </div>
            </div>
        )
    }

    if (variant === "dot") {
        return (
            <div ref={ref} className="py-12 bg-lorenzo-dark flex justify-center">
                <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-lorenzo-accent/40"
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : {}}
                            transition={{ delay: 0.1 * i, type: "spring" }}
                        />
                    ))}
                </motion.div>
            </div>
        )
    }

    // Default "line" variant
    return (
        <div ref={ref} className="py-6 bg-lorenzo-dark">
            <motion.div
                className="max-w-[1400px] mx-auto px-6 md:px-12"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
            >
                <div className="h-px bg-gradient-to-r from-transparent via-lorenzo-accent/20 to-transparent" />
            </motion.div>
        </div>
    )
}
