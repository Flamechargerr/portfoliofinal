"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

interface CurrentProject {
    id: number
    name: string
    description: string
    progress: number
    tech: string[]
    status: "in-progress" | "planning" | "testing"
    startDate: string
    targetDate: string
}

const currentProjects: CurrentProject[] = [
    {
        id: 1,
        name: "AI Study Assistant",
        description: "Building an intelligent study companion using LLMs that helps students with homework, explains concepts, and creates personalized learning paths.",
        progress: 65,
        tech: ["Python", "LangChain", "Next.js", "OpenAI"],
        status: "in-progress",
        startDate: "Nov 2024",
        targetDate: "Jan 2025",
    },
    {
        id: 2,
        name: "Portfolio V3",
        description: "Redesigning my portfolio with advanced 3D effects, interactive elements, and a blog section. (You're looking at it!)",
        progress: 85,
        tech: ["Next.js", "Three.js", "Framer Motion", "TailwindCSS"],
        status: "testing",
        startDate: "Dec 2024",
        targetDate: "Dec 2024",
    },
    {
        id: 3,
        name: "YaanBarpe Platform",
        description: "Leading the development of the core platform features including user authentication, dashboard, and payment integration.",
        progress: 40,
        tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
        status: "in-progress",
        startDate: "Oct 2024",
        targetDate: "Feb 2025",
    },
]

const statusColors = {
    "in-progress": { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500" },
    "planning": { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500" },
    "testing": { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500" },
}

export default function CurrentlyWorkingSection() {
    const [activeProject, setActiveProject] = useState<CurrentProject>(currentProjects[0])
    const [progress, setProgress] = useState(0)
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

    // Animate progress bar
    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                setProgress(activeProject.progress)
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [isInView, activeProject])

    return (
        <section ref={sectionRef} className="py-24 bg-lorenzo-dark overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-px bg-lorenzo-accent" />
                        <span className="text-xs font-bold uppercase tracking-widest text-lorenzo-accent flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            LIVE STATUS
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-brier uppercase leading-[0.9] tracking-tight">
                        <span className="block text-lorenzo-light">CURRENTLY</span>
                        <span className="block text-lorenzo-accent">BUILDING</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Project List */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        {currentProjects.map((project) => (
                            <motion.button
                                key={project.id}
                                onClick={() => {
                                    setActiveProject(project)
                                    setProgress(0)
                                    setTimeout(() => setProgress(project.progress), 100)
                                }}
                                className={`
                  w-full text-left p-4 border transition-all
                  ${activeProject.id === project.id
                                        ? "border-lorenzo-accent bg-lorenzo-accent/5"
                                        : "border-lorenzo-light/10 hover:border-lorenzo-accent/50"}
                `}
                                whileHover={{ x: 5 }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-lorenzo-light uppercase">{project.name}</span>
                                    <span className={`text-xs px-2 py-1 ${statusColors[project.status].bg} ${statusColors[project.status].text} uppercase`}>
                                        {project.status.replace("-", " ")}
                                    </span>
                                </div>
                                <div className="h-1 bg-lorenzo-light/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-lorenzo-accent"
                                        initial={{ width: 0 }}
                                        animate={{ width: activeProject.id === project.id ? `${progress}%` : `${project.progress}%` }}
                                        transition={{ duration: 1 }}
                                    />
                                </div>
                                <div className="text-xs text-lorenzo-light/50 mt-2">{project.progress}% complete</div>
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Active Project Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="p-8 border border-lorenzo-accent/20 bg-lorenzo-dark/50 h-full"
                            >
                                {/* Project Header */}
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-brier text-lorenzo-accent uppercase mb-2">
                                            {activeProject.name}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm text-lorenzo-light/50">
                                            <span>Started: {activeProject.startDate}</span>
                                            <span>•</span>
                                            <span>Target: {activeProject.targetDate}</span>
                                        </div>
                                    </div>
                                    <div className={`px-4 py-2 ${statusColors[activeProject.status].bg} ${statusColors[activeProject.status].text} ${statusColors[activeProject.status].border} border uppercase text-sm font-bold`}>
                                        {activeProject.status.replace("-", " ")}
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-lorenzo-light/70 text-lg mb-8 font-mona">
                                    {activeProject.description}
                                </p>

                                {/* Progress Circle */}
                                <div className="flex items-center gap-8 mb-8">
                                    <div className="relative w-32 h-32">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle
                                                cx="64"
                                                cy="64"
                                                r="56"
                                                stroke="rgba(200, 245, 80, 0.1)"
                                                strokeWidth="8"
                                                fill="none"
                                            />
                                            <motion.circle
                                                cx="64"
                                                cy="64"
                                                r="56"
                                                stroke="#c8f550"
                                                strokeWidth="8"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeDasharray={352}
                                                initial={{ strokeDashoffset: 352 }}
                                                animate={{ strokeDashoffset: 352 - (352 * progress) / 100 }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-3xl font-brier text-lorenzo-accent">{progress}%</span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm text-lorenzo-light/50 uppercase tracking-wider mb-2">Progress</div>
                                        <div className="h-3 bg-lorenzo-light/10 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-lorenzo-accent/50 to-lorenzo-accent rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                <div>
                                    <div className="text-sm text-lorenzo-light/50 uppercase tracking-wider mb-3">Tech Stack</div>
                                    <div className="flex flex-wrap gap-2">
                                        {activeProject.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-4 py-2 border border-lorenzo-accent/30 text-lorenzo-accent text-sm font-bold uppercase"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
