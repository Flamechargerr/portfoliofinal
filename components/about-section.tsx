"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
    const [hoveredStat, setHoveredStat] = useState<number | null>(null)

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative min-h-screen bg-lorenzo-dark py-24 overflow-hidden"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/data-viz.png"
                    alt="Data Visualization"
                    fill
                    className="object-cover opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-lorenzo-dark via-lorenzo-dark/95 to-lorenzo-dark" />
            </div>

            {/* Large Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-[1]">
                <span className="text-[25vw] font-brier text-white/[0.05] uppercase whitespace-nowrap">
                    CODER
                </span>
            </div>

            {/* Tech Divider Top */}
            <div className="absolute top-0 left-0 right-0 h-8 tech-divider opacity-50" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-px bg-lorenzo-accent" />
                        <span className="text-xs font-bold uppercase tracking-widest text-lorenzo-accent">
                            THE MISSION
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-brier uppercase leading-[0.9] tracking-tight">
                        <span className="block text-lorenzo-light">REDEFINING</span>
                        <span className="block text-lorenzo-accent">LIMITS</span>
                        <motion.span
                            className="block text-lorenzo-light/20 text-3xl md:text-5xl mt-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.5 }}
                        >
                            IN TECHNOLOGY
                        </motion.span>
                    </h2>
                </motion.div>

                {/* Content Grid - Anamay Style */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    {/* Main Text Column */}
                    <motion.div
                        className="lg:col-span-7"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="text-xl md:text-2xl text-lorenzo-light/80 leading-relaxed mb-8 font-mona">
                            I'm <span className="text-lorenzo-accent font-bold">Anamay Tripathy</span>, a passionate
                            Data Science Engineering student at MIT Manipal, driven by the intersection of
                            data and technology. Every line of code is a step towards innovation.
                        </p>
                        <p className="text-lg text-lorenzo-light/60 leading-relaxed mb-8 font-mona">
                            As the <span className="text-lorenzo-accent">Technical Head at YaanBarpe</span>, I lead development
                            teams, architect scalable solutions, and turn ideas into production-ready applications.
                            From building fintech dashboards at <span className="text-lorenzo-accent">Intellect Design Arena</span>
                            to creating AI-powered solutions—I'm always pushing boundaries.
                        </p>

                        {/* Image with Hotspot Effect */}
                        <motion.div
                            className="relative aspect-video rounded-lg overflow-hidden my-12 group"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.4 }}
                            data-cursor="EXPLORE"
                        >
                            <Image
                                src="/images/tech-workspace.png"
                                alt="Workspace"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-lorenzo-dark/80 via-transparent to-transparent" />

                            {/* Hotspot Markers */}
                            <motion.div
                                className="absolute top-1/3 left-1/4 w-4 h-4 bg-lorenzo-accent rounded-full cursor-pointer"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <span className="absolute inset-0 bg-lorenzo-accent rounded-full animate-ping opacity-50" />
                            </motion.div>
                            <motion.div
                                className="absolute top-1/2 right-1/3 w-4 h-4 bg-lorenzo-accent rounded-full cursor-pointer"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            >
                                <span className="absolute inset-0 bg-lorenzo-accent rounded-full animate-ping opacity-50" />
                            </motion.div>

                            {/* Corner accents */}
                            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-lorenzo-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-lorenzo-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>

                        {/* Quote */}
                        <motion.div
                            className="border-l-4 border-lorenzo-accent pl-6 py-4 my-12"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.6 }}
                        >
                            <p className="text-2xl md:text-3xl font-brier italic text-lorenzo-light">
                                "The only way to predict the future is to build it."
                            </p>
                            <span className="text-sm text-lorenzo-accent uppercase tracking-wider mt-4 block">
                                — My Philosophy
                            </span>
                        </motion.div>

                        {/* CTA */}
                        <div className="flex flex-wrap gap-4">
                            <motion.a
                                href="mailto:tripathy.anamay23@gmail.com"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider text-sm hover:shadow-lg hover:shadow-lorenzo-accent/30 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                data-cursor="EMAIL"
                            >
                                <span>Let's Build Together</span>
                                <motion.svg
                                    className="w-4 h-4"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </motion.svg>
                            </motion.a>

                            <motion.a
                                href="/resume.pdf"
                                download
                                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-lorenzo-accent text-lorenzo-accent font-bold uppercase tracking-wider text-sm hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                data-cursor="DOWNLOAD"
                            >
                                <span>Download CV</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Stats Column with Hover Effects */}
                    <motion.div
                        className="lg:col-span-5"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { value: "2+", label: "YEARS", sub: "Active Experience", icon: "🚀" },
                                { value: "8+", label: "CERTS", sub: "Meta, IBM, etc.", icon: "📜" },
                                { value: "570+", label: "COMMITS", sub: "Active Contributor", icon: "💻" },
                                { value: "75+", label: "STARS", sub: "GitHub Projects", icon: "⭐" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    className="relative p-6 border border-lorenzo-accent/20 hover:border-lorenzo-accent transition-all duration-300 group cursor-pointer overflow-hidden"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    onMouseEnter={() => setHoveredStat(i)}
                                    onMouseLeave={() => setHoveredStat(null)}
                                    whileHover={{ scale: 1.02 }}
                                    data-cursor="VIEW"
                                >
                                    {/* Background Icon */}
                                    <motion.div
                                        className="absolute -right-4 -bottom-4 text-6xl opacity-10 group-hover:opacity-30 transition-opacity"
                                        animate={{ scale: hoveredStat === i ? 1.2 : 1 }}
                                    >
                                        {stat.icon}
                                    </motion.div>

                                    <motion.div
                                        className="text-4xl md:text-5xl font-brier text-lorenzo-accent mb-2"
                                        animate={{ scale: hoveredStat === i ? 1.1 : 1 }}
                                    >
                                        {stat.value}
                                    </motion.div>
                                    <div className="text-sm font-bold text-lorenzo-light uppercase tracking-wider">
                                        {stat.label}
                                    </div>
                                    <div className="text-xs text-lorenzo-light/40 mt-1">
                                        {stat.sub}
                                    </div>

                                    {/* Corner accent on hover */}
                                    <motion.div
                                        className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-lorenzo-accent"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: hoveredStat === i ? 1 : 0 }}
                                    />

                                    {/* Bottom line animation */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-1 bg-lorenzo-accent"
                                        initial={{ width: 0 }}
                                        animate={{ width: hoveredStat === i ? "100%" : 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Roles - with Images */}
                        <div className="mt-8 space-y-4">
                            {[
                                { title: "Technical Head", org: "YaanBarpe Startup", year: "2024", color: "from-green-500 to-emerald-600" },
                                { title: "Data Analyst & Web Dev Intern", org: "Intellect Design Arena", year: "2024", color: "from-blue-500 to-cyan-600" },
                                { title: "Class Rep & E-Cell", org: "MIT Manipal", year: "2023-27", color: "from-purple-500 to-pink-600" },
                            ].map((role, i) => (
                                <motion.div
                                    key={i}
                                    className="group flex items-center justify-between p-4 border-b border-lorenzo-light/10 hover:bg-lorenzo-accent/5 transition-all cursor-pointer"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.7 + i * 0.1 }}
                                    whileHover={{ x: 10 }}
                                    data-cursor="VIEW"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Color indicator */}
                                        <div className={`w-2 h-12 bg-gradient-to-b ${role.color} rounded-full`} />
                                        <div>
                                            <div className="text-lorenzo-light font-bold uppercase text-sm group-hover:text-lorenzo-accent transition-colors">
                                                {role.title}
                                            </div>
                                            <div className="text-lorenzo-light/50 text-xs">{role.org}</div>
                                        </div>
                                    </div>
                                    <div className="text-lorenzo-accent font-brier text-lg">{role.year}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Tech Divider Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-8 tech-divider opacity-50 rotate-180" />
        </section>
    )
}
