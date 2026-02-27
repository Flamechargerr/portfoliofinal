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
            <div ref={ref} className="relative py-24 overflow-hidden bg-lorenzo-dark">
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
                        className="flex items-center justify-center gap-4"
                    >
                        {/* Left lightsaber line */}
                        <div className="relative h-px w-24 md:w-32 overflow-hidden">
                            <motion.div
                                className="absolute top-0 right-0 h-full"
                                initial={{ width: 0, opacity: 0 }}
                                animate={isInView ? { width: "100%", opacity: 1 } : {}}
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                style={{
                                    background: "linear-gradient(to left, rgba(200,245,80,0.7), transparent)",
                                    boxShadow: "0 0 12px rgba(200,245,80,0.3)",
                                }}
                            />
                        </div>

                        {/* Pulsing diamond */}
                        <motion.div
                            className="relative flex items-center justify-center"
                            initial={{ scale: 0, rotate: 45 }}
                            animate={isInView ? { scale: 1, rotate: 45 } : {}}
                            transition={{ duration: 0.4, delay: 0.4, type: "spring" }}
                        >
                            <div className="w-2.5 h-2.5 bg-lorenzo-accent/60 shadow-[0_0_12px_rgba(200,245,80,0.4)]" />
                            <div className="absolute w-2.5 h-2.5 bg-lorenzo-accent/30 animate-ping" />
                        </motion.div>

                        {/* Label */}
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-lorenzo-accent/70 -rotate-0">
                            {label}
                        </span>

                        {/* Pulsing diamond */}
                        <motion.div
                            className="relative flex items-center justify-center"
                            initial={{ scale: 0, rotate: 45 }}
                            animate={isInView ? { scale: 1, rotate: 45 } : {}}
                            transition={{ duration: 0.4, delay: 0.4, type: "spring" }}
                        >
                            <div className="w-2.5 h-2.5 bg-lorenzo-accent/60 shadow-[0_0_12px_rgba(200,245,80,0.4)]" />
                            <div className="absolute w-2.5 h-2.5 bg-lorenzo-accent/30 animate-ping" />
                        </motion.div>

                        {/* Right lightsaber line */}
                        <div className="relative h-px w-24 md:w-32 overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 h-full"
                                initial={{ width: 0, opacity: 0 }}
                                animate={isInView ? { width: "100%", opacity: 1 } : {}}
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                style={{
                                    background: "linear-gradient(to right, rgba(200,245,80,0.7), transparent)",
                                    boxShadow: "0 0 12px rgba(200,245,80,0.3)",
                                }}
                            />
                        </div>
                    </motion.div>

                    {sublabel && (
                        <motion.p
                            className="text-lorenzo-light/30 text-sm mt-4 font-mona"
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6 }}
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
            <div ref={ref} className="py-14 bg-lorenzo-dark flex justify-center">
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
        <div ref={ref} className="py-8 bg-lorenzo-dark">
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
