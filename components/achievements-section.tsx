"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

interface Achievement {
    id: number
    title: string
    event: string
    date: string
    description: string
    type: "hackathon" | "certification" | "award" | "competition"
    position?: string
    icon: string
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
    },
    {
        id: 2,
        title: "IBM GenAI Professional",
        event: "Specialization",
        date: "2024",
        description: "Mastered prompt engineering, LLM integration, and building generative AI applications.",
        type: "certification",
        icon: "🤖",
    },
    {
        id: 3,
        title: "Google Analytics",
        event: "Certification",
        date: "2024",
        description: "Certified in advanced digital analytics and data-driven decision making.",
        type: "certification",
        icon: "📈",
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
    },
    {
        id: 6,
        title: "Software Engineering Intern",
        event: "Intellect Design Arena",
        date: "2024",
        description: "Built microservices and fintech dashboards for enterprise-level applications.",
        type: "certification",
        icon: "💼",
    },
]

const typeColors = {
    hackathon: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500" },
    certification: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500" },
    award: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500" },
    competition: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500" },
}

export default function AchievementsSection() {
    const [activeFilter, setActiveFilter] = useState<string>("all")
    const [hoveredId, setHoveredId] = useState<number | null>(null)
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

    const filteredAchievements = activeFilter === "all"
        ? achievements
        : achievements.filter(a => a.type === activeFilter)

    return (
        <section ref={sectionRef} className="py-24 bg-lorenzo-light overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-12 h-px bg-lorenzo-dark" />
                        <span className="text-xs font-bold uppercase tracking-widest text-lorenzo-dark/60">
                            QUALIFICATIONS
                        </span>
                        <div className="w-12 h-px bg-lorenzo-dark" />
                    </div>

                    <h2 className="text-4xl md:text-6xl font-brier uppercase leading-[0.9] tracking-tight">
                        <span className="text-lorenzo-dark">ACHIEVEMENTS &</span>
                        <br />
                        <span className="text-lorenzo-accent">CERTIFICATIONS</span>
                    </h2>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    {["all", "award", "competition", "certification"].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`
                px-6 py-3 font-bold uppercase text-sm tracking-wider transition-all
                ${activeFilter === filter
                                    ? "bg-lorenzo-dark text-lorenzo-accent"
                                    : "bg-transparent text-lorenzo-dark border border-lorenzo-dark/20 hover:border-lorenzo-dark"}
              `}
                        >
                            {filter}
                        </button>
                    ))}
                </motion.div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredAchievements.map((achievement, index) => (
                            <motion.div
                                key={achievement.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-white p-6 border border-lorenzo-dark/10 hover:border-lorenzo-accent transition-all cursor-pointer overflow-hidden"
                                onMouseEnter={() => setHoveredId(achievement.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                whileHover={{ y: -5 }}
                            >
                                {/* Background Icon */}
                                <motion.div
                                    className="absolute -right-4 -bottom-4 text-8xl opacity-5 group-hover:opacity-20 transition-opacity"
                                    animate={{ scale: hoveredId === achievement.id ? 1.2 : 1 }}
                                >
                                    {achievement.icon}
                                </motion.div>

                                {/* Type Badge */}
                                <div className={`inline-flex items-center gap-2 px-3 py-1 ${typeColors[achievement.type].bg} ${typeColors[achievement.type].text} text-xs font-bold uppercase mb-4`}>
                                    {achievement.type}
                                </div>

                                {/* Icon */}
                                <div className="text-4xl mb-4">{achievement.icon}</div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-lorenzo-dark uppercase mb-2">
                                    {achievement.title}
                                </h3>
                                <p className="text-sm text-lorenzo-accent font-bold mb-2">
                                    {achievement.event}
                                </p>
                                <p className="text-sm text-lorenzo-dark/60 mb-4">
                                    {achievement.description}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-lorenzo-dark/10">
                                    <span className="text-sm font-bold text-lorenzo-dark/50">{achievement.date}</span>
                                    {achievement.position && (
                                        <span className="px-3 py-1 bg-lorenzo-accent text-lorenzo-dark text-xs font-bold uppercase">
                                            {achievement.position}
                                        </span>
                                    )}
                                </div>

                                {/* Hover line */}
                                <motion.div
                                    className="absolute bottom-0 left-0 h-1 bg-lorenzo-accent"
                                    initial={{ width: 0 }}
                                    animate={{ width: hoveredId === achievement.id ? "100%" : 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
