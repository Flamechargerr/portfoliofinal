"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface Project {
    id: number
    title: string
    subtitle: string
    tagline: string
    description: string
    tech: string[]
    image: string
    position: string
    status: "live" | "development"
    github?: string
    liveUrl?: string
    features: string[]
}

interface ProjectModalProps {
    project: Project
    isOpen: boolean
    onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    if (!project) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                    >
                        <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-lorenzo-dark border border-lorenzo-accent/30 rounded-2xl relative">
                            {/* Close Button - Enhanced for Accessibility */}
                            <button
                                onClick={onClose}
                                aria-label="Close modal"
                                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-lorenzo-dark/80 border border-lorenzo-accent/30 rounded-full text-lorenzo-light hover:text-lorenzo-accent hover:border-lorenzo-accent transition-all z-20"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Image Header */}
                            <div className="relative aspect-video w-full">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-contain bg-black/40"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-lorenzo-dark via-transparent to-transparent" />

                                {/* Status Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full ${project.status === "live"
                                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                        : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                        }`}>
                                        {project.status === "live" ? "🟢 LIVE" : "🟡 IN DEVELOPMENT"}
                                    </span>
                                </div>

                                <div className="absolute bottom-0 left-0 p-8">
                                    <h2 className="text-4xl md:text-5xl font-brier text-lorenzo-light uppercase mb-2">
                                        {project.title}
                                    </h2>
                                    <p className="text-lorenzo-accent font-bold uppercase tracking-wider">
                                        {project.subtitle}
                                    </p>
                                    {/* Tagline */}
                                    <p className="text-lorenzo-light/70 text-lg italic mt-2">
                                        "{project.tagline}"
                                    </p>
                                </div>
                            </div>

                            <div className="p-8 md:p-12 space-y-8">
                                {/* Tech Stack */}
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-lorenzo-light/50 mb-4">
                                        Technologies Used
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-4 py-2 border border-lorenzo-accent/20 bg-lorenzo-accent/5 text-lorenzo-accent text-sm font-bold uppercase"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-lorenzo-light/50 mb-4">
                                        About The Project
                                    </h3>
                                    <p className="text-lorenzo-light/80 text-lg leading-relaxed font-mona">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Key Features */}
                                {project.features && project.features.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-lorenzo-light/50 mb-4">
                                            Key Features
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {project.features.map((feature, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="flex items-center gap-3 p-3 bg-lorenzo-accent/5 border border-lorenzo-accent/10 rounded"
                                                >
                                                    <span className="text-lorenzo-accent">✓</span>
                                                    <span className="text-lorenzo-light/80 text-sm">{feature}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Actions - LARGE AND PROMINENT */}
                                <div className="flex flex-wrap gap-4 pt-6 border-t border-lorenzo-light/10">
                                    {project.liveUrl && project.status === "live" && (
                                        <motion.a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 px-10 py-5 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider text-lg hover:bg-lorenzo-light transition-colors rounded-lg shadow-lg shadow-lorenzo-accent/30"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <span className="text-2xl">🚀</span>
                                            LIVE DEMO
                                        </motion.a>
                                    )}
                                    <motion.a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-8 py-5 border-2 border-lorenzo-accent text-lorenzo-accent font-bold uppercase tracking-wider hover:bg-lorenzo-accent/10 transition-colors rounded-lg"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                        View Code
                                    </motion.a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
