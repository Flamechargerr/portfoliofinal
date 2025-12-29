"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const timelineEvents = [
    {
        year: "2023",
        title: "Academic Foundation",
        subtitle: "MIT Manipal",
        items: [
            "Started B.Tech in Data Science Engineering",
            "Class Representative",
            "E-Cell Member"
        ],
        icon: "🎓",
        color: "from-blue-500 to-cyan-500"
    },
    {
        year: "2024",
        title: "Leadership & Industry",
        subtitle: "Building & Growing",
        items: [
            "Technical Head @ YaanBarpe Startup",
            "Data Analyst Intern @ Intellect Design Arena",
            "Built CrimeConnect, VARtificial, HackOps",
            "8+ Professional Certifications"
        ],
        icon: "🚀",
        color: "from-lorenzo-accent to-green-400"
    },
    {
        year: "2025+",
        title: "Goals & Vision",
        subtitle: "What's Next",
        items: [
            "Open Source Contributions",
            "AI/ML Research Projects",
            "Full-time Role @ Top Tech Company",
            "Building Products that Matter"
        ],
        icon: "🎯",
        color: "from-purple-500 to-pink-500"
    }
]

export default function JourneyTimeline() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

    return (
        <div ref={sectionRef} className="py-20 bg-lorenzo-dark">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-12 h-px bg-lorenzo-accent" />
                        <span className="text-xs font-bold uppercase tracking-widest text-lorenzo-accent">
                            MY JOURNEY
                        </span>
                        <div className="w-12 h-px bg-lorenzo-accent" />
                    </div>

                    <h2 className="text-4xl md:text-6xl font-brier uppercase leading-[0.9] tracking-tight">
                        <span className="text-lorenzo-light">THE </span>
                        <span className="text-lorenzo-accent">TIMELINE</span>
                    </h2>
                    <p className="text-lorenzo-light/50 text-lg mt-4 max-w-2xl mx-auto">
                        A quick look at my journey from student to developer to leader.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Central Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-lorenzo-accent/20 hidden md:block" />

                    <div className="space-y-12 md:space-y-0">
                        {timelineEvents.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.2 }}
                                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                            >
                                {/* Year Badge */}
                                <motion.div
                                    className="absolute left-1/2 transform -translate-x-1/2 z-10 hidden md:flex items-center justify-center"
                                    whileHover={{ scale: 1.2 }}
                                >
                                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center text-3xl shadow-lg shadow-lorenzo-accent/30`}>
                                        {event.icon}
                                    </div>
                                </motion.div>

                                {/* Content Card */}
                                <motion.div
                                    className={`flex-1 ${index % 2 === 0 ? "md:text-right md:pr-24" : "md:text-left md:pl-24"}`}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="bg-lorenzo-dark/50 border border-lorenzo-accent/20 p-8 rounded-xl hover:border-lorenzo-accent transition-all">
                                        {/* Mobile Icon */}
                                        <div className="md:hidden text-4xl mb-4">{event.icon}</div>

                                        {/* Year */}
                                        <span className="text-5xl md:text-6xl font-brier text-lorenzo-accent/30">
                                            {event.year}
                                        </span>

                                        {/* Title & Subtitle */}
                                        <h3 className="text-2xl font-brier text-lorenzo-light uppercase mt-2">
                                            {event.title}
                                        </h3>
                                        <p className="text-lorenzo-accent text-sm uppercase tracking-wider mb-4">
                                            {event.subtitle}
                                        </p>

                                        {/* Items */}
                                        <ul className={`space-y-2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                                            {event.items.map((item, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                                    transition={{ delay: index * 0.2 + i * 0.1 }}
                                                    className="text-lorenzo-light/60 text-sm flex items-center gap-2"
                                                    style={{ justifyContent: index % 2 === 0 ? "flex-end" : "flex-start" }}
                                                >
                                                    {index % 2 !== 0 && <span className="text-lorenzo-accent">→</span>}
                                                    {item}
                                                    {index % 2 === 0 && <span className="text-lorenzo-accent">←</span>}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>

                                {/* Empty space for the other side */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
