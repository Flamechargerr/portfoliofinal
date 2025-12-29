"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface TimelineEvent {
    year: string
    title: string
    organization: string
    logo: string
    description: string
    position: string
}

const timeline: TimelineEvent[] = [
    {
        year: "2024",
        title: "Technical Head",
        organization: "YaanBarpe Startup",
        logo: "🚀",
        description: "Leading development teams, architecting scalable solutions, building MVP from scratch.",
        position: "1ST",
    },
    {
        year: "2024",
        title: "Data Analyst & Web Dev Intern",
        organization: "Intellect Design Arena",
        logo: "💼",
        description: "Built fintech solutions, data visualization dashboards, and enterprise applications.",
        position: "2ND",
    },
    {
        year: "2024",
        title: "Professional Certifications",
        organization: "Meta, IBM, Google",
        logo: "🏆",
        description: "Meta Data Analyst, IBM GenAI Professional, Google Analytics certified.",
        position: "3RD",
    },
    {
        year: "2023",
        title: "B.Tech Data Science",
        organization: "MIT Manipal",
        logo: "🎓",
        description: "Started journey in Data Science Engineering. Class Representative & E-Cell Executive.",
        position: "4TH",
    },
]

export default function ExperienceSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="relative min-h-screen bg-lorenzo-light text-lorenzo-dark py-24 overflow-hidden"
        >
            {/* Background Number */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none">
                <span className="text-[40vw] font-brier text-lorenzo-dark/[0.03] leading-none">
                    02
                </span>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-px bg-lorenzo-dark" />
                        <span className="text-xs font-bold uppercase tracking-widest text-lorenzo-dark/60">
                            CAREER RESULTS
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-brier uppercase leading-[0.9] tracking-tight">
                        <span className="block text-lorenzo-dark">MY</span>
                        <span className="block text-lorenzo-accent">JOURNEY</span>
                    </h2>
                </motion.div>

                {/* Timeline - Career Results Table Style */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b-2 border-lorenzo-dark">
                                <th className="text-left py-4 pr-4 text-xs font-bold uppercase tracking-widest text-lorenzo-dark/50 w-20">
                                    POS
                                </th>
                                <th className="text-left py-4 pr-4 text-xs font-bold uppercase tracking-widest text-lorenzo-dark/50 w-24">
                                    YEAR
                                </th>
                                <th className="text-left py-4 pr-4 text-xs font-bold uppercase tracking-widest text-lorenzo-dark/50">
                                    ROLE
                                </th>
                                <th className="text-left py-4 pr-4 text-xs font-bold uppercase tracking-widest text-lorenzo-dark/50 hidden md:table-cell">
                                    ORGANIZATION
                                </th>
                                <th className="text-left py-4 text-xs font-bold uppercase tracking-widest text-lorenzo-dark/50 hidden lg:table-cell">
                                    DETAILS
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {timeline.map((event, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="border-b border-lorenzo-dark/10 hover:bg-lorenzo-accent/10 transition-colors group"
                                >
                                    <td className="py-6 pr-4">
                                        <span className="text-2xl md:text-3xl font-brier italic text-lorenzo-accent">
                                            {event.position}
                                        </span>
                                    </td>
                                    <td className="py-6 pr-4">
                                        <span className="text-lg font-bold text-lorenzo-dark">
                                            {event.year}
                                        </span>
                                    </td>
                                    <td className="py-6 pr-4">
                                        <span className="text-lg md:text-xl font-brier text-lorenzo-dark uppercase">
                                            {event.title}
                                        </span>
                                        <span className="block md:hidden text-sm text-lorenzo-dark/50 mt-1">
                                            {event.organization}
                                        </span>
                                    </td>
                                    <td className="py-6 pr-4 hidden md:table-cell">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{event.logo}</span>
                                            <span className="text-lorenzo-accent font-bold uppercase text-sm">
                                                {event.organization}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-6 hidden lg:table-cell">
                                        <span className="text-sm text-lorenzo-dark/60 font-mona">
                                            {event.description}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Summary Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {[
                        { value: "2", label: "Years Active" },
                        { value: "15+", label: "Projects Built" },
                        { value: "3", label: "Companies" },
                        { value: "8+", label: "Certifications" },
                    ].map((stat, i) => (
                        <div key={i} className="p-6 bg-lorenzo-dark text-center">
                            <div className="text-3xl md:text-4xl font-brier text-lorenzo-accent mb-2">
                                {stat.value}
                            </div>
                            <div className="text-xs font-bold uppercase tracking-wider text-lorenzo-light/60">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* LinkedIn CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    className="flex justify-center mt-16"
                >
                    <a
                        href="https://www.linkedin.com/in/anamay-tripathy-b53829296/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-4 px-10 py-5 bg-lorenzo-dark text-lorenzo-accent font-bold uppercase tracking-wider hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span>Full Story on LinkedIn</span>
                        <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
