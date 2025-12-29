"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

const reasons = [
    {
        icon: "📜",
        title: "8+ Certifications",
        description: "Meta, IBM, Google-verified skills in data analysis, AI/ML, and analytics",
        color: "#c8f550",
        number: "01"
    },
    {
        icon: "💻",
        title: "Production Code",
        description: "50K+ lines across 15+ projects shipped to real users",
        color: "#c8f550",
        number: "02"
    },
    {
        icon: "🏢",
        title: "Industry Leader",
        description: "Tech Head @ YaanBarpe, Intern @ Intellect Design Arena",
        color: "#c8f550",
        number: "03"
    },
    {
        icon: "⚡",
        title: "Rapid Delivery",
        description: "Agile methodology, MVP in weeks not months",
        color: "#c8f550",
        number: "04"
    },
    {
        icon: "🔧",
        title: "Full Stack Mastery",
        description: "Frontend → Backend → Data → DevOps → AI/ML",
        color: "#c8f550",
        number: "05"
    },
    {
        icon: "🔒",
        title: "Security First",
        description: "Enterprise-grade security baked into every line",
        color: "#c8f550",
        number: "06"
    }
]

export default function WhyWorkWithMe() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

    return (
        <section ref={sectionRef} className="relative py-24 bg-lorenzo-dark overflow-hidden">
            {/* Parallax Background Elements */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: backgroundY }}
            >
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(200,245,80,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(200,245,80,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

                {/* Large floating numbers */}
                <motion.div
                    className="absolute top-10 right-10 text-[30vw] font-brier text-lorenzo-accent/[0.02] leading-none select-none"
                    style={{ opacity }}
                >
                    WHY
                </motion.div>
            </motion.div>

            {/* Glowing orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-lorenzo-accent/10 rounded-full blur-[100px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-lorenzo-accent/5 rounded-full blur-[80px]"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* Section Header with Parallax */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <motion.div
                        className="flex items-center justify-center gap-4 mb-6"
                        initial={{ scale: 0.8 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <motion.div
                            className="w-16 h-px bg-gradient-to-r from-transparent to-lorenzo-accent"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: 64 } : {}}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-lorenzo-accent">
                            THE DIFFERENCE
                        </span>
                        <motion.div
                            className="w-16 h-px bg-gradient-to-l from-transparent to-lorenzo-accent"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: 64 } : {}}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        />
                    </motion.div>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-brier uppercase leading-[0.9] tracking-tight">
                        <motion.span
                            className="block text-lorenzo-light"
                            initial={{ x: -50, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : {}}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            WHY WORK
                        </motion.span>
                        <motion.span
                            className="block text-transparent bg-clip-text bg-gradient-to-r from-lorenzo-accent via-lime-300 to-lorenzo-accent"
                            initial={{ x: 50, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : {}}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            WITH ME?
                        </motion.span>
                    </h2>

                    <motion.p
                        className="text-lorenzo-light/50 text-lg mt-6 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        Verified skills. Proven results. A passion for building products that matter.
                    </motion.p>
                </motion.div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ delay: 0.2 + index * 0.1, duration: 0.6, ease: "easeOut" }}
                            className={`group relative overflow-hidden cursor-pointer
                                ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
                                ${index === 3 ? 'lg:col-span-2' : ''}
                            `}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        >
                            {/* Card Background */}
                            <div className="relative h-full p-8 bg-gradient-to-br from-lorenzo-light/[0.08] to-lorenzo-light/[0.02] backdrop-blur-sm border border-lorenzo-light/10 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-lorenzo-accent/50 group-hover:bg-lorenzo-light/[0.05]">

                                {/* Number Badge */}
                                <div className="absolute top-4 right-4 text-xs font-mono text-lorenzo-accent/30 group-hover:text-lorenzo-accent/60 transition-colors">
                                    {reason.number}
                                </div>

                                {/* Glow Effect on Hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-lorenzo-accent/0 via-lorenzo-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                />

                                {/* Animated Border Glow */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background: 'linear-gradient(45deg, transparent, rgba(200,245,80,0.1), transparent)',
                                    }}
                                />

                                {/* Icon with Animation */}
                                <motion.div
                                    className="text-5xl mb-6 filter drop-shadow-lg"
                                    whileHover={{
                                        scale: 1.2,
                                        rotate: [0, -10, 10, -5, 0],
                                        transition: { duration: 0.5 }
                                    }}
                                >
                                    {reason.icon}
                                </motion.div>

                                {/* Content */}
                                <h3 className="text-xl md:text-2xl font-bold text-lorenzo-light uppercase tracking-wider mb-3 group-hover:text-lorenzo-accent transition-colors duration-300">
                                    {reason.title}
                                </h3>
                                <p className="text-lorenzo-light/50 text-sm md:text-base leading-relaxed group-hover:text-lorenzo-light/70 transition-colors duration-300">
                                    {reason.description}
                                </p>

                                {/* Bottom Accent Line */}
                                <motion.div
                                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-lorenzo-accent to-lime-300 rounded-full"
                                    initial={{ width: "0%" }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                />

                                {/* Corner Accent */}
                                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-lorenzo-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-full" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex justify-center mt-16"
                >
                    <a
                        href="#contact"
                        className="group relative inline-flex items-center gap-4 px-10 py-5 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider overflow-hidden rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(200,245,80,0.4)]"
                    >
                        <span className="relative z-10">Let's Build Together</span>
                        <motion.svg
                            className="w-5 h-5 relative z-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            whileHover={{ x: 5 }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </motion.svg>

                        {/* Shine effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                        />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
