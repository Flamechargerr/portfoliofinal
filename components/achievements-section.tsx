"use client"

import { useState, useRef } from "react"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"

interface Achievement {
    id: number
    title: string
    event: string
    date: string
    description: string
    type: "hackathon" | "certification" | "award" | "competition"
    position?: string
    icon: string
    gradient: string
}

const achievements: Achievement[] = [
    {
        id: 1,
        title: "Meta Data Analyst",
        event: "Professional Certificate",
        date: "2024",
        description: "Comprehensive certification covering data visualization, SQL, and statistical analysis with Python.",
        type: "certification",
        icon: "📊",
        gradient: "from-blue-500 to-cyan-400",
    },
    {
        id: 2,
        title: "IBM GenAI Professional",
        event: "Specialization",
        date: "2024",
        description: "Mastered prompt engineering, LLM integration, and building generative AI applications.",
        type: "certification",
        icon: "🤖",
        gradient: "from-purple-500 to-pink-400",
    },
    {
        id: 3,
        title: "Google Analytics",
        event: "Certification",
        date: "2024",
        description: "Certified in advanced digital analytics and data-driven decision making.",
        type: "certification",
        icon: "📈",
        gradient: "from-green-500 to-emerald-400",
    },
    {
        id: 4,
        title: "Technical Head",
        event: "YaanBarpe Startup",
        date: "2024",
        description: "Leading the technical vision and development of a scalable travel planning platform.",
        type: "award",
        position: "Leadership",
        icon: "🚀",
        gradient: "from-orange-500 to-amber-400",
    },
    {
        id: 5,
        title: "Top Contributor",
        event: "Open Source Engagement",
        date: "2023",
        description: "Recognized for significant contributions to community projects and maintainership.",
        type: "award",
        position: "Honored",
        icon: "🌟",
        gradient: "from-yellow-500 to-lime-400",
    },
    {
        id: 6,
        title: "Software Engineering Intern",
        event: "Intellect Design Arena",
        date: "2024",
        description: "Built microservices and fintech dashboards for enterprise-level applications.",
        type: "certification",
        icon: "💼",
        gradient: "from-indigo-500 to-violet-400",
    },
]

const filterOptions = [
    { key: "all", label: "All", icon: "✨" },
    { key: "award", label: "Awards", icon: "🏆" },
    { key: "certification", label: "Certifications", icon: "📜" },
]

export default function AchievementsSection() {
    const [activeFilter, setActiveFilter] = useState<string>("all")
    const [hoveredId, setHoveredId] = useState<number | null>(null)
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])

    const filteredAchievements = activeFilter === "all"
        ? achievements
        : achievements.filter(a => a.type === activeFilter)

    return (
        <section ref={sectionRef} className="relative py-24 bg-lorenzo-dark overflow-hidden">
            {/* Parallax Background */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: backgroundY }}
            >
                {/* Large Background Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="text-[20vw] font-brier text-lorenzo-accent/[0.02] leading-none select-none whitespace-nowrap">
                        CERTIFIED
                    </span>
                </div>

                {/* Hexagon Grid Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                                <polygon points="25,0 50,14.4 50,43.4 25,57.7 0,43.4 0,14.4" fill="none" stroke="#c8f550" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#hexagons)" />
                    </svg>
                </div>
            </motion.div>

            {/* Floating Orbs */}
            <motion.div
                className="absolute top-20 left-20 w-64 h-64 bg-lorenzo-accent/5 rounded-full blur-[100px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/5 rounded-full blur-[80px]"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
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
                            CREDENTIALS
                        </span>
                        <motion.div
                            className="w-16 h-px bg-gradient-to-l from-transparent to-lorenzo-accent"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: 64 } : {}}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        />
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-brier uppercase leading-[0.9] tracking-tight">
                        <motion.span
                            className="block text-lorenzo-light"
                            initial={{ x: -50, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : {}}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            ACHIEVEMENTS &
                        </motion.span>
                        <motion.span
                            className="block text-transparent bg-clip-text bg-gradient-to-r from-lorenzo-accent via-lime-300 to-lorenzo-accent"
                            initial={{ x: 50, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : {}}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            CERTIFICATIONS
                        </motion.span>
                    </h2>

                    <motion.p
                        className="text-lorenzo-light/50 text-lg mt-6 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        Verified credentials from industry leaders. Every badge earned, every skill proven.
                    </motion.p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {filterOptions.map((filter) => (
                        <motion.button
                            key={filter.key}
                            onClick={() => setActiveFilter(filter.key)}
                            className={`
                                relative px-6 py-3 font-bold uppercase text-sm tracking-wider rounded-full transition-all duration-300 overflow-hidden
                                ${activeFilter === filter.key
                                    ? "bg-lorenzo-accent text-lorenzo-dark shadow-[0_0_30px_rgba(200,245,80,0.4)]"
                                    : "bg-lorenzo-light/5 text-lorenzo-light/70 border border-lorenzo-light/10 hover:border-lorenzo-accent/50 hover:text-lorenzo-accent"
                                }
                            `}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="flex items-center gap-2">
                                <span>{filter.icon}</span>
                                <span>{filter.label}</span>
                            </span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredAchievements.map((achievement, index) => (
                            <motion.div
                                key={achievement.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className="group relative"
                                onMouseEnter={() => setHoveredId(achievement.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <motion.div
                                    className="relative h-full p-6 md:p-8 bg-gradient-to-br from-lorenzo-light/[0.08] to-lorenzo-light/[0.02] backdrop-blur-sm border border-lorenzo-light/10 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-lorenzo-accent/50"
                                    whileHover={{ y: -8, scale: 1.02 }}
                                >
                                    {/* Background Gradient Glow */}
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                                    />

                                    {/* Background Icon */}
                                    <motion.div
                                        className="absolute -right-4 -bottom-4 text-[120px] opacity-5 group-hover:opacity-15 transition-all duration-500"
                                        animate={{ scale: hoveredId === achievement.id ? 1.1 : 1 }}
                                    >
                                        {achievement.icon}
                                    </motion.div>

                                    {/* Type Badge */}
                                    <motion.div
                                        className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${achievement.gradient} text-white text-xs font-bold uppercase tracking-wider rounded-full mb-6`}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {achievement.type}
                                    </motion.div>

                                    {/* Icon */}
                                    <motion.div
                                        className="text-5xl mb-4 filter drop-shadow-lg"
                                        animate={{
                                            rotate: hoveredId === achievement.id ? [0, -5, 5, 0] : 0,
                                            scale: hoveredId === achievement.id ? 1.1 : 1
                                        }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {achievement.icon}
                                    </motion.div>

                                    {/* Content */}
                                    <h3 className="text-xl md:text-2xl font-bold text-lorenzo-light uppercase tracking-wider mb-2 group-hover:text-lorenzo-accent transition-colors duration-300">
                                        {achievement.title}
                                    </h3>
                                    <p className="text-lorenzo-accent font-bold text-sm uppercase tracking-wider mb-3">
                                        {achievement.event}
                                    </p>
                                    <p className="text-lorenzo-light/50 text-sm leading-relaxed mb-6">
                                        {achievement.description}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-lorenzo-light/10">
                                        <span className="text-sm font-bold text-lorenzo-light/40">{achievement.date}</span>
                                        {achievement.position && (
                                            <motion.span
                                                className="px-4 py-1.5 bg-lorenzo-accent/20 text-lorenzo-accent text-xs font-bold uppercase rounded-full"
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                {achievement.position}
                                            </motion.span>
                                        )}
                                    </div>

                                    {/* Animated bottom line */}
                                    <motion.div
                                        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${achievement.gradient} rounded-full`}
                                        initial={{ width: 0 }}
                                        animate={{ width: hoveredId === achievement.id ? "100%" : 0 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </motion.div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Bottom Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16"
                >
                    {[
                        { value: "8+", label: "Certifications" },
                        { value: "3", label: "Industry Leaders" },
                        { value: "100%", label: "Verified" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            className="text-center"
                            whileHover={{ scale: 1.1 }}
                        >
                            <div className="text-4xl md:text-5xl font-brier text-transparent bg-clip-text bg-gradient-to-r from-lorenzo-accent to-lime-300">
                                {stat.value}
                            </div>
                            <div className="text-xs font-bold uppercase tracking-wider text-lorenzo-light/40 mt-2">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
