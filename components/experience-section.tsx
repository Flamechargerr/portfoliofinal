"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

interface TimelineEvent {
    year: string
    title: string
    organization: string
    logo: string
    description: string
    position: string
    highlight?: boolean
}

const timeline: TimelineEvent[] = [
    {
        year: "2024",
        title: "Technical Head",
        organization: "YaanBarpe Startup",
        logo: "🚀",
        description: "Leading development teams, architecting scalable solutions, building MVP from scratch.",
        position: "01",
        highlight: true,
    },
    {
        year: "2024",
        title: "Data Analyst & Web Dev Intern",
        organization: "Intellect Design Arena",
        logo: "💼",
        description: "Built fintech solutions, data visualization dashboards, and enterprise applications.",
        position: "02",
    },
    {
        year: "2024",
        title: "Professional Certifications",
        organization: "Meta, IBM, Google",
        logo: "🏆",
        description: "Meta Data Analyst, IBM GenAI Professional, Google Analytics certified.",
        position: "03",
    },
    {
        year: "2023",
        title: "B.Tech Data Science",
        organization: "MIT Manipal",
        logo: "🎓",
        description: "Started journey in Data Science Engineering. Class Representative & E-Cell Executive.",
        position: "04",
    },
]

export default function ExperienceSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"])

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="relative min-h-screen bg-transparent text-white py-16 md:py-20 overflow-hidden"
        >
            {/* Parallax Background Elements */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: backgroundY }}
            >
                {/* Large Background Text */}
                <motion.div className="absolute top-1/2 left-0 -translate-y-1/2">
                    <span className="text-[25vw] font-brier text-white/[0.02] leading-none select-none mix-blend-overlay">
                        STORY
                    </span>
                </motion.div>

                {/* Diagonal Lines Pattern */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_100px,rgba(200,245,80,0.02)_100px,rgba(200,245,80,0.02)_101px)]" />
            </motion.div>

            {/* Animated Gradient Orbs */}
            <motion.div
                className="absolute top-20 right-20 w-72 h-72 bg-lorenzo-accent/5 rounded-full blur-[100px]"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* Section Header with Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="mb-20"
                >
                    <motion.div
                        className="flex items-center gap-6 mb-8"
                        initial={{ x: -30, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 1 } : {}}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                            CAREER PATH
                        </span>
                        <motion.div
                            className="h-[1px] bg-white/10"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: 96 } : {}}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        />
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-brier uppercase leading-[0.85] tracking-tighter">
                        <motion.span
                            className="block text-white"
                            initial={{ x: -50, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : {}}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            MY
                        </motion.span>
                        <motion.span
                            className="block text-lorenzo-accent drop-shadow-md"
                            initial={{ x: -50, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : {}}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            JOURNEY
                        </motion.span>
                    </h2>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Animated Timeline Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] transform md:-translate-x-1/2" style={{ background: 'linear-gradient(to bottom, rgba(200,245,80,0.05), rgba(200,245,80,0.02))' }}>
                        <motion.div
                            className="w-full"
                            style={{
                                height: lineHeight,
                                background: 'linear-gradient(to bottom, rgba(200,245,80,0.8), rgba(200,245,80,0.3))',
                                boxShadow: '0 0 15px rgba(200,245,80,0.3), 0 0 30px rgba(200,245,80,0.1)',
                            }}
                        />
                    </div>

                    {/* Timeline Events */}
                    <div className="space-y-12 md:space-y-0">
                        {timeline.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
                                className={`relative flex flex-col md:flex-row items-start gap-8 py-8 md:py-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Timeline Node */}
                                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 top-8 md:top-1/2">
                                    <motion.div
                                        className={`w-4 h-4 rounded-full border-2 timeline-dot-pulse ${event.highlight
                                            ? 'bg-lorenzo-accent border-lorenzo-accent shadow-[0_0_20px_rgba(200,245,80,0.6)]'
                                            : 'bg-lorenzo-dark border-lorenzo-accent'
                                            }`}
                                        whileHover={{ scale: 1.5 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </div>

                                <motion.div
                                    className={`ml-8 md:ml-0 md:w-[calc(50%-40px)] ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className={`relative p-6 md:p-8 bg-white/[0.02] backdrop-blur-md border rounded-2xl overflow-hidden group hover:bg-white/[0.04] transition-all duration-500 ${event.highlight ? 'border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]' : 'border-white/5 hover:border-white/10'
                                        }`}>
                                        {/* Highlight Glow */}
                                        {event.highlight && (
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                                        )}

                                        {/* Position Number */}
                                        <div className="absolute top-4 right-4 text-4xl md:text-5xl font-brier text-white/5 group-hover:text-white/10 transition-colors">
                                            {event.position}
                                        </div>

                                        {/* Year Badge */}
                                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6 relative z-10">
                                            <span className="text-xl">{event.logo}</span>
                                            <span className="text-[11px] font-bold text-white tracking-[0.2em] uppercase">
                                                {event.year}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider mb-2 group-hover:text-lorenzo-accent transition-colors relative z-10">
                                            {event.title}
                                        </h3>

                                        {/* Organization */}
                                        <p className="text-lorenzo-accent font-bold text-[11px] uppercase tracking-[0.2em] mb-4 relative z-10 opacity-90">
                                            {event.organization}
                                        </p>

                                        {/* Description */}
                                        <p className="text-white/60 font-light text-sm leading-relaxed relative z-10">
                                            {event.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Summary Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                >
                    {[
                        { value: "2+", label: "Years Active", icon: "⏱️" },
                        { value: "15+", label: "Projects Built", icon: "🛠️" },
                        { value: "3", label: "Companies", icon: "🏢" },
                        { value: "8+", label: "Certifications", icon: "🏆" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            className="group relative p-6 md:p-8 bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            <div className="absolute top-4 right-4 text-2xl opacity-30 group-hover:opacity-60 transition-opacity">
                                {stat.icon}
                            </div>
                            <div className="text-3xl md:text-5xl font-brier text-white group-hover:text-lorenzo-accent transition-colors mb-2">
                                {stat.value}
                            </div>
                            <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* LinkedIn CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1 }}
                    className="flex justify-center mt-16"
                >
                    <a
                        href="https://www.linkedin.com/in/anamay-tripathy/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-4 px-10 py-5 bg-transparent border-2 border-lorenzo-accent text-lorenzo-accent font-bold uppercase tracking-wider overflow-hidden rounded-full transition-all duration-300 hover:bg-lorenzo-accent hover:text-lorenzo-dark hover:shadow-[0_0_40px_rgba(200,245,80,0.3)]"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span>Full Story on LinkedIn</span>
                        <motion.svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            whileHover={{ x: 5 }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </motion.svg>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
