"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface Testimonial {
    quote: string
    author: string
    role: string
    org: string
    relationship: string
    avatar?: string
}

const testimonials: Testimonial[] = [
    {
        quote: "Anamay's ability to model complex data pipelines and build highly responsive dashboards is impressive. During his internship, his work on the collection agent dashboard significantly improved our operational reporting. He has a rare combination of quantitative research skills and full-stack execution capabilities.",
        author: "Sanjay Sharma",
        role: "Associate VP of Engineering",
        org: "Intellect Design Arena Ltd",
        relationship: "Mentored Anamay during SWE Internship",
    },
    {
        quote: "Anamay is an exceptionally talented engineer who proved crucial in designing our collection agent platform. He quickly grasped complex fintech requirements, optimized database performance, and built robust data pipelines with Spark. His technical leadership and execution speed are outstanding.",
        author: "Jatin",
        role: "Product Manager & Team Lead",
        org: "Intellect Design Arena Ltd",
        relationship: "Led Anamay's team at Intellect",
    }
]

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

    return (
        <section
            ref={sectionRef}
            id="testimonials"
            className="relative py-24 bg-transparent overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Large Background Text */}
                <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
                    <span className="text-[20vw] font-brier text-white/[0.01] leading-none select-none whitespace-nowrap">
                        TRUST
                    </span>
                </div>
                {/* Glowing neon orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lorenzo-accent/5 rounded-full blur-[120px] pointer-events-none" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-12 h-px bg-lorenzo-accent/40" />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-lorenzo-accent">
                            SOCIAL PROOF
                        </span>
                        <div className="w-12 h-px bg-lorenzo-accent/40" />
                    </div>

                    <h2 className="text-4xl md:text-6xl font-brier uppercase leading-[0.85] tracking-tighter">
                        <span className="block text-white">RECOMMENDATIONS &</span>
                        <span className="block text-lorenzo-accent drop-shadow-md">TESTIMONIALS</span>
                    </h2>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40, scale: 0.98 }}
                            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ duration: 0.8, delay: idx * 0.2 }}
                            className="relative group h-full"
                        >
                            {/* Card Body */}
                            <div className="h-full p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md transition-all duration-500 hover:border-lorenzo-accent/40 hover:bg-white/[0.04] flex flex-col justify-between shadow-2xl relative overflow-hidden">
                                
                                {/* Top Quote Mark Icon */}
                                <div aria-hidden="true" className="text-lorenzo-accent/10 absolute -top-4 -left-2 text-8xl font-serif select-none pointer-events-none">
                                    “
                                </div>

                                {/* Quote */}
                                <p className="text-white/80 text-base md:text-lg leading-relaxed font-light mb-8 italic relative z-10">
                                    "{t.quote}"
                                </p>

                                {/* Author Info */}
                                <div className="border-t border-white/5 pt-6 flex items-center gap-4 relative z-10">
                                    {/* Monogram Avatar */}
                                    <div className="w-12 h-12 rounded-full bg-lorenzo-accent/10 border border-lorenzo-accent/30 flex items-center justify-center shrink-0">
                                        <span className="text-lorenzo-accent font-bold text-sm tracking-widest font-mono">
                                            {t.author.split(" ").map(n => n[0]).join("")}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm md:text-base tracking-wide uppercase">{t.author}</h4>
                                        <p className="text-lorenzo-accent text-xs font-semibold uppercase tracking-wider mt-0.5">{t.role}</p>
                                        <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">{t.org} • <span className="lowercase italic">{t.relationship}</span></p>
                                    </div>
                                </div>

                                {/* Corner decorative accent */}
                                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-lorenzo-accent/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
