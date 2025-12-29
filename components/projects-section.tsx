"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import ProjectModal from "@/components/project-modal"

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

const projects: Project[] = [
    {
        id: 1,
        title: "Crime Connect FBI",
        subtitle: "Classified Intelligence System",
        tagline: "React • FastAPI • SQLite • Secure Intelligence Analysis",
        description: "High-fidelity criminal intelligence platform for agent-level data management. Features centralized criminal registries, court system administration, and real-time intelligence gathering with an FBI-cinematic interface.",
        tech: ["React", "FastAPI", "Python", "Tailwind CSS", "Framer Motion", "SQLite"],
        image: "/images/project-crimeconnect.png",
        position: "1ST",
        status: "live",
        github: "https://github.com/Flamechargerr/crime-connect-fbi",
        liveUrl: "https://crime-connect-fbi.vercel.app/",
        features: [
            "Encrypted Agent Authentication",
            "Comprehensive Criminal Database Management",
            "Federal Court System Dashboard",
            "Real-time Intel Analysis Tools"
        ]
    },
    {
        id: 3,
        title: "HackOps",
        subtitle: "Interactive Cybersecurity Training",
        tagline: "Next.js • Tailwind CSS • Gamified Hacking Lab",
        description: "An immersive open-source platform for learning cybersecurity through hands-on challenges. Features simulated terminal environments, password guessing labs, and a competitive global leaderboard.",
        tech: ["React", "Next.js", "Tailwind CSS", "Shadcn UI", "Framer Motion"],
        image: "/images/project-hackops.png",
        position: "2ND",
        status: "live",
        github: "https://github.com/Flamechargerr/HackOps",
        liveUrl: "https://flamechargerr.github.io/HackOps/",
        features: [
            "Interactive Hacking Terminal",
            "Competitive Leaderboard System",
            "Password Strength & Cracking Labs",
            "Mobile-responsive Cybersecurity Hub"
        ]
    },
    {
        id: 4,
        title: "Flora Fight Frenzy",
        subtitle: "Desktop PvZ Reimagined",
        tagline: "Java • JavaFX • Object-Oriented Design Patterns",
        description: "A sophisticated Java-based clone of Plants vs. Zombies, featuring progressive level design, multiple environmental modes (Day/Night), and a robust save/load system built on professional design patterns.",
        tech: ["Java", "JavaFX", "OOP Patterns", "Resource Management"],
        image: "/images/project-flora.png",
        position: "3RD",
        status: "live",
        github: "https://github.com/Flamechargerr/flora-fight-frenzy",
        liveUrl: "https://flora-fight-frenzy.vercel.app/",
        features: [
            "Progressive 5-Level Strategy",
            "Integrated Day/Night Environment Cycles",
            "Comprehensive Save/Load Functionality",
            "Balanced Plant/Zombie Ecosystem"
        ]
    },
    {
        id: 2,
        title: "VARtificial Intelligence",
        subtitle: "AI-Powered Football Predictor",
        tagline: "Machine Learning • Scikit-learn • Premier League Analytics",
        description: "Advanced ML tool designed to predict football match outcomes with high precision. Leverages ensemble models including Naive Bayes and Random Forest, trained on extensive historical Premier League data.",
        tech: ["Next.js", "Python", "Scikit-learn", "Pandas", "Ensemble Learning"],
        image: "/images/project-vartificial.png",
        position: "4TH",
        status: "live",
        github: "https://github.com/Flamechargerr/VARtificial-Intelligence",
        liveUrl: "https://var-tificial-intelligence.vercel.app/",
        features: [
            "Multi-model Prediction Ensemble",
            "Match-day Data Visualization",
            "Historical Performance Analytics",
            "Browser-based ML Execution (Pyodide)"
        ]
    },
]

export default function ProjectsSection() {
    const [hoveredId, setHoveredId] = useState<number | null>(null)
    const [activeProject, setActiveProject] = useState<Project>(projects[0])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

    const openProject = (project: Project) => {
        setSelectedProject(project)
        setIsModalOpen(true)
    }

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative min-h-screen bg-lorenzo-dark py-24 overflow-hidden"
        >
            {/* ... background elements ... */}
            <div className="absolute inset-0 z-0 opacity-10">
                <Image
                    src="/images/code-abstract.png"
                    alt="Background"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-lorenzo-dark via-lorenzo-dark/95 to-lorenzo-dark" />
            </div>

            {/* Large Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-[1]">
                <span className="text-[20vw] font-brier text-white/[0.05] uppercase whitespace-nowrap">
                    PROJECTS
                </span>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* ... header ... */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-px bg-lorenzo-accent" />
                        <span className="text-xs font-bold uppercase tracking-widest text-lorenzo-accent">
                            HALL OF FAME
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-brier uppercase leading-[0.9] tracking-tight">
                        <span className="block text-lorenzo-light">FEATURED</span>
                        <span className="block text-lorenzo-accent">PROJECTS</span>
                    </h2>
                </motion.div>

                {/* Interactive Project Gallery */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                    {/* Featured Project Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
                        data-cursor="VIEW"
                        onClick={() => openProject(activeProject)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={activeProject.image}
                                    alt={activeProject.title}
                                    fill
                                    className="object-contain bg-black/20 transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-lorenzo-dark via-lorenzo-dark/50 to-transparent" />

                                {/* Project Info Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <span className="text-6xl md:text-8xl font-brier italic text-lorenzo-accent/30">
                                        {activeProject.position}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-brier text-lorenzo-light uppercase mt-2">
                                        {activeProject.title}
                                    </h3>
                                    <p className="text-lorenzo-accent text-sm uppercase tracking-wider mt-2">
                                        {activeProject.subtitle}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Hover Effect Border */}
                        <motion.div
                            className="absolute inset-0 border-2 border-transparent group-hover:border-lorenzo-accent transition-colors duration-300 pointer-events-none"
                        />

                        {/* Corner Accents */}
                        <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-lorenzo-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-lorenzo-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-lorenzo-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-lorenzo-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>

                    {/* Project List */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 }}
                        className="space-y-4"
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className={`
                  group relative p-6 border transition-all duration-300 cursor-pointer
                  ${activeProject.id === project.id
                                        ? "border-lorenzo-accent bg-lorenzo-accent/10"
                                        : "border-lorenzo-light/10 hover:border-lorenzo-accent/50"}
                `}
                                onMouseEnter={() => {
                                    setHoveredId(project.id)
                                    setActiveProject(project)
                                }}
                                onMouseLeave={() => setHoveredId(null)}
                                onClick={() => openProject(project)}
                                data-cursor="OPEN"
                            >
                                {/* ... content same as before ... */}
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        {/* Position Number */}
                                        <span className="text-3xl font-brier italic text-lorenzo-accent">
                                            {project.position}
                                        </span>

                                        {/* Project Info */}
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-xl font-brier text-lorenzo-light uppercase">
                                                    {project.title}
                                                </h3>
                                                {/* Status Badge */}
                                                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${project.status === "live"
                                                    ? "bg-green-500/20 text-green-400"
                                                    : "bg-yellow-500/20 text-yellow-400"
                                                    }`}>
                                                    {project.status === "live" ? "🟢 LIVE" : "🟡 DEV"}
                                                </span>
                                            </div>
                                            <p className="text-sm text-lorenzo-light/50">
                                                {project.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <motion.svg
                                        className="w-6 h-6 text-lorenzo-accent opacity-0 group-hover:opacity-100 transition-opacity"
                                        animate={{ x: hoveredId === project.id ? 5 : 0 }}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </motion.svg>
                                </div>

                                {/* Tech Stack - Visible on hover/active */}
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: activeProject.id === project.id ? "auto" : 0,
                                        opacity: activeProject.id === project.id ? 1 : 0
                                    }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4 space-y-3">
                                        <p className="text-sm text-lorenzo-light/60">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 text-xs font-bold uppercase tracking-wider border border-lorenzo-accent/30 text-lorenzo-accent"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-4 mt-4 pt-2 border-t border-lorenzo-light/10">
                                            <button
                                                className="text-xs font-bold uppercase tracking-wider text-lorenzo-light hover:text-lorenzo-accent flex items-center gap-2"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openProject(project);
                                                }}
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                                View Details
                                            </button>
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-bold uppercase tracking-wider text-lorenzo-light hover:text-lorenzo-accent flex items-center gap-2"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                GitHub
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Active Indicator */}
                                <motion.div
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-lorenzo-accent origin-top"
                                    initial={{ scaleY: 0 }}
                                    animate={{ scaleY: activeProject.id === project.id ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    className="flex justify-center"
                >
                    <motion.a
                        href="https://github.com/Flamechargerr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-4 px-10 py-5 border-2 border-lorenzo-accent text-lorenzo-accent font-bold uppercase tracking-wider hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        data-cursor="GITHUB"
                    >
                        <span>View All On GitHub</span>
                        <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject!}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            {/* Tire Track Divider */}
            <div className="absolute bottom-0 left-0 right-0 h-8 tire-track opacity-50" />
        </section>
    )
}
