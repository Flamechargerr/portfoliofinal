"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const currentProjects = [
    {
        title: "YaanBarpe MVP",
        description: "Building a full-stack travel planning platform with AI-powered recommendations",
        tech: ["Next.js", "Python", "OpenAI", "PostgreSQL"],
        progress: 75,
        status: "In Development",
    },
    {
        title: "ML Research Paper",
        description: "Exploring novel approaches to sentiment analysis using transformer models",
        tech: ["PyTorch", "Hugging Face", "NLP"],
        progress: 40,
        status: "Research Phase",
    },
    {
        title: "Portfolio Redesign",
        description: "This very site! Implementing cutting-edge web technologies and animations",
        tech: ["Next.js 15", "Framer Motion", "TypeScript"],
        progress: 90,
        status: "Almost Done",
    },
]

const learningStack = [
    { name: "Rust", icon: "🦀", progress: 25 },
    { name: "Go", icon: "🐹", progress: 35 },
    { name: "Kubernetes", icon: "☸️", progress: 45 },
    { name: "System Design", icon: "🏗️", progress: 60 },
]

export default function CurrentWorkSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

    return (
        <section
            ref={sectionRef}
            className="relative py-24 bg-lorenzo-dark overflow-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: "radial-gradient(circle at 2px 2px, rgba(200,245,80,0.3) 1px, transparent 0)",
                    backgroundSize: "40px 40px"
                }} />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
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
                            CURRENT FOCUS
                        </span>
                        <div className="w-12 h-px bg-lorenzo-accent" />
                    </div>

                    <h2 className="text-5xl md:text-7xl font-brier uppercase leading-[0.9] tracking-tight">
                        <span className="text-lorenzo-light">WHAT I'M</span>
                        <br />
                        <span className="text-lorenzo-accent">WORKING ON</span>
                    </h2>
                </motion.div>

                {/* Current Projects Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
                    {currentProjects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="group p-6 border border-lorenzo-accent/20 hover:border-lorenzo-accent/50 bg-lorenzo-dark/50 backdrop-blur-sm transition-all"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className={`text-xs uppercase tracking-wider px-3 py-1 ${project.status === "In Development" ? "bg-blue-500/20 text-blue-400" :
                                        project.status === "Research Phase" ? "bg-purple-500/20 text-purple-400" :
                                            "bg-lorenzo-accent/20 text-lorenzo-accent"
                                    }`}>
                                    {project.status}
                                </span>
                                <span className="text-lorenzo-accent font-bold text-lg">
                                    {project.progress}%
                                </span>
                            </div>

                            <h3 className="text-xl font-brier text-lorenzo-light uppercase mb-3 group-hover:text-lorenzo-accent transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-lorenzo-light/60 text-sm mb-4 leading-relaxed">
                                {project.description}
                            </p>

                            {/* Progress Bar */}
                            <div className="w-full h-1 bg-lorenzo-light/10 mb-4">
                                <motion.div
                                    className="h-full bg-lorenzo-accent"
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: `${project.progress}%` } : {}}
                                    transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                                />
                            </div>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map(tech => (
                                    <span key={tech} className="text-xs px-2 py-1 border border-lorenzo-accent/30 text-lorenzo-accent/80">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Currently Learning */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className="p-8 border border-lorenzo-accent/20 bg-lorenzo-accent/5"
                >
                    <h3 className="text-2xl font-brier text-lorenzo-accent uppercase mb-6 flex items-center gap-3">
                        <span className="text-3xl">📚</span>
                        Currently Learning
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {learningStack.map((skill, i) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.6 + i * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl mb-2">{skill.icon}</div>
                                <div className="text-lorenzo-light font-bold text-sm mb-2">{skill.name}</div>
                                <div className="w-full h-1 bg-lorenzo-light/10">
                                    <motion.div
                                        className="h-full bg-lorenzo-accent"
                                        initial={{ width: 0 }}
                                        animate={isInView ? { width: `${skill.progress}%` } : {}}
                                        transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }}
                                    />
                                </div>
                                <div className="text-xs text-lorenzo-light/40 mt-1">{skill.progress}%</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
