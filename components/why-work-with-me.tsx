"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const reasons = [
    {
        icon: "📜",
        title: "8+ Certifications",
        description: "Meta, IBM, Google-verified skills",
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: "💻",
        title: "Production Code",
        description: "50K+ lines across 15+ projects",
        color: "from-green-500 to-emerald-500"
    },
    {
        icon: "🏢",
        title: "Industry Experience",
        description: "Tech Head @ YaanBarpe, Intern @ Intellect",
        color: "from-purple-500 to-pink-500"
    },
    {
        icon: "⚡",
        title: "Fast & Efficient",
        description: "Agile methodology, rapid prototyping",
        color: "from-yellow-500 to-orange-500"
    },
    {
        icon: "🔧",
        title: "Full Stack",
        description: "Frontend → Backend → Data → DevOps",
        color: "from-red-500 to-rose-500"
    },
    {
        icon: "🔒",
        title: "Security First",
        description: "Best practices baked into every project",
        color: "from-indigo-500 to-violet-500"
    }
]

export default function WhyWorkWithMe() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

    return (
        <div ref={sectionRef} className="py-20 bg-lorenzo-light">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-12 h-px bg-lorenzo-dark" />
                        <span className="text-xs font-bold uppercase tracking-widest text-lorenzo-dark/60">
                            WHY CHOOSE ME
                        </span>
                        <div className="w-12 h-px bg-lorenzo-dark" />
                    </div>

                    <h2 className="text-4xl md:text-6xl font-brier uppercase leading-[0.9] tracking-tight text-lorenzo-dark">
                        WHY <span className="text-lorenzo-accent">WORK</span> WITH ME
                    </h2>
                    <p className="text-lorenzo-dark/60 text-lg mt-4 max-w-2xl mx-auto">
                        Here's what I bring to the table — verified skills, proven experience, and a passion for building great products.
                    </p>
                </motion.div>

                {/* Reasons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-8 bg-white border border-lorenzo-dark/10 hover:border-lorenzo-accent rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            {/* Background Gradient on Hover */}
                            <motion.div
                                className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                            />

                            {/* Icon */}
                            <motion.div
                                className="text-5xl mb-4"
                                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 0.3 }}
                            >
                                {reason.icon}
                            </motion.div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-lorenzo-dark uppercase tracking-wider mb-2 group-hover:text-lorenzo-accent transition-colors">
                                {reason.title}
                            </h3>
                            <p className="text-lorenzo-dark/60 text-sm">
                                {reason.description}
                            </p>

                            {/* Bottom Line */}
                            <motion.div
                                className="absolute bottom-0 left-0 h-1 bg-lorenzo-accent"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
