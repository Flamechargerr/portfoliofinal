"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { playSound } from "@/lib/audio"

// Skill level badges
const getSkillLevel = (value: number): { label: string; color: string; emoji: string } => {
    if (value >= 90) return { label: "Expert", color: "#c8f550", emoji: "🏆" }
    if (value >= 80) return { label: "Advanced", color: "#60a5fa", emoji: "⭐" }
    if (value >= 70) return { label: "Proficient", color: "#a78bfa", emoji: "💪" }
    if (value >= 60) return { label: "Intermediate", color: "#f59e0b", emoji: "📈" }
    return { label: "Learning", color: "#6b7280", emoji: "🌱" }
}

// Skill categories with colors and icons
const skillCategories = [
    { id: "all", label: "All Skills", icon: "🎯", color: "#c8f550" },
    { id: "frontend", label: "Frontend", icon: "🎨", color: "#60a5fa" },
    { id: "backend", label: "Backend", icon: "⚙️", color: "#f472b6" },
    { id: "data", label: "Data Science", icon: "📊", color: "#a78bfa" },
    { id: "tools", label: "Tools & DevOps", icon: "🛠️", color: "#34d399" },
]

// Detailed skills data
const skillsData = {
    all: {
        labels: ["Frontend", "Backend", "Data Science", "DevOps", "UI/UX", "Problem Solving"],
        data: [90, 80, 85, 70, 75, 95],
        descriptions: [
            "Building beautiful, responsive user interfaces",
            "Scalable server-side applications and APIs",
            "ML models, data analysis, and visualization",
            "CI/CD, cloud infrastructure, and automation",
            "User research, prototyping, and design systems",
            "Algorithmic thinking and optimization"
        ],
        subSkills: [
            ["React", "Next.js", "TypeScript"],
            ["Node.js", "Python", "FastAPI"],
            ["Pandas", "TensorFlow", "SQL"],
            ["Docker", "AWS", "Git"],
            ["Figma", "Tailwind", "Motion"],
            ["DSA", "System Design", "Debugging"]
        ],
        experience: ["4 years", "3 years", "3 years", "2 years", "2 years", "5 years"]
    },
    frontend: {
        labels: ["React", "Next.js", "TypeScript", "CSS/Tailwind", "Three.js", "Framer Motion"],
        data: [95, 90, 85, 90, 60, 80],
        descriptions: [
            "Component architecture, hooks, state management",
            "SSR, SSG, API routes, and full-stack apps",
            "Type-safe code, generics, and advanced patterns",
            "Responsive design, animations, utility-first",
            "3D graphics, WebGL, and immersive experiences",
            "Smooth animations and gesture interactions"
        ],
        subSkills: [
            ["Hooks", "Context", "Redux"],
            ["App Router", "RSC", "Edge"],
            ["Generics", "Utility Types", "Zod"],
            ["Flexbox", "Grid", "Animations"],
            ["Shaders", "Models", "Lighting"],
            ["Variants", "Gestures", "Layout"]
        ],
        experience: ["4 years", "3 years", "3 years", "4 years", "1 year", "2 years"]
    },
    backend: {
        labels: ["Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB", "REST APIs"],
        data: [85, 90, 75, 80, 85, 90],
        descriptions: [
            "Express, NestJS, and async programming",
            "Flask, Django, scripting, and automation",
            "High-performance async Python APIs",
            "Relational DB design and optimization",
            "Document databases and aggregations",
            "RESTful design, authentication, and security"
        ],
        subSkills: [
            ["Express", "NestJS", "Async"],
            ["Flask", "Django", "Scripts"],
            ["Pydantic", "Async", "Docs"],
            ["Joins", "Indexes", "ORM"],
            ["Aggregation", "Atlas", "Indexes"],
            ["Auth", "Versioning", "Docs"]
        ],
        experience: ["3 years", "4 years", "2 years", "3 years", "3 years", "4 years"]
    },
    data: {
        labels: ["Python", "Pandas", "TensorFlow", "Data Viz", "SQL", "ML Models"],
        data: [90, 85, 70, 80, 85, 75],
        descriptions: [
            "Data manipulation and scientific computing",
            "DataFrames, cleaning, and transformations",
            "Neural networks and deep learning",
            "Matplotlib, Plotly, and dashboards",
            "Complex queries and data engineering",
            "Classification, regression, clustering"
        ],
        subSkills: [
            ["NumPy", "SciPy", "Jupyter"],
            ["Cleaning", "Merging", "Analysis"],
            ["Keras", "CNNs", "RNNs"],
            ["Plotly", "Seaborn", "D3.js"],
            ["CTEs", "Windows", "Optimization"],
            ["Sklearn", "XGBoost", "Evaluation"]
        ],
        experience: ["4 years", "3 years", "2 years", "3 years", "4 years", "2 years"]
    },
    tools: {
        labels: ["Git", "Docker", "AWS", "Linux", "VS Code", "Vercel"],
        data: [90, 70, 65, 75, 95, 85],
        descriptions: [
            "Version control, branching, and collaboration",
            "Containerization and microservices",
            "Cloud services and serverless",
            "CLI, scripting, and administration",
            "Extensions, debugging, and productivity",
            "Deployment, edge functions, and analytics"
        ],
        subSkills: [
            ["Branching", "Merge", "Rebase"],
            ["Compose", "Images", "Networks"],
            ["EC2", "S3", "Lambda"],
            ["Bash", "Vim", "SSH"],
            ["Debug", "Extensions", "Tasks"],
            ["Deploy", "Edge", "Analytics"]
        ],
        experience: ["5 years", "2 years", "2 years", "3 years", "4 years", "3 years"]
    },
}

// Animated counter component
function AnimatedCounter({ value, duration = 1.2 }: { value: number; duration?: number }) {
    const [displayValue, setDisplayValue] = useState(0)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return
        let start = 0
        const end = value
        if (start === end) return

        const totalMiliseconds = duration * 1000
        const incrementTime = Math.abs(Math.floor(totalMiliseconds / end))
        
        const timer = setInterval(() => {
            start += 1
            setDisplayValue(start)
            if (start >= end) {
                clearInterval(timer)
            }
        }, incrementTime)

        return () => clearInterval(timer)
    }, [value, duration, mounted])

    if (!mounted) return <span>0</span>
    return <span>{displayValue}</span>
}

// Skill detail modal/panel
function SkillDetailPanel({
    skill,
    value,
    description,
    subSkills,
    experience,
    onClose
}: {
    skill: string
    value: number
    description: string
    subSkills: string[]
    experience: string
    onClose: () => void
}) {
    const level = getSkillLevel(value)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [onClose])

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-md z-[90]"
                onClick={onClose}
            />
            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[91] w-[90vw] max-w-md pointer-events-auto"
            >
                <div className="bg-[#1b1c11]/90 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#c8f550]/20 hover:text-[#c8f550] transition-colors"
                    >
                        <span className="text-sm font-bold">✕</span>
                    </button>

                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl">
                            {level.emoji}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-2xl font-bold text-white">{skill}</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <span
                                    className="px-3 py-1 rounded-full text-xs font-bold uppercase"
                                    style={{ backgroundColor: `${level.color}20`, color: level.color }}
                                >
                                    {level.label}
                                </span>
                                <span className="text-white/50 text-sm">{experience} experience</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-6">
                        <div className="flex justify-between mb-2">
                            <span className="text-white/70 text-sm">Proficiency</span>
                            <span className="text-[#c8f550] font-bold">
                                <AnimatedCounter value={value} />%
                            </span>
                        </div>
                        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{
                                    background: `linear-gradient(90deg, ${level.color}, #c8f550)`
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${value}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/70 text-sm mb-6 leading-relaxed">
                        {description}
                    </p>

                    {/* Sub-skills */}
                    <div>
                        <span className="text-white/40 text-xs uppercase tracking-widest mb-3 block">Related Tech Stack</span>
                        <div className="flex flex-wrap gap-2">
                            {subSkills.map((subSkill, i) => (
                                <motion.span
                                    key={subSkill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white hover:border-[#c8f550]/40 hover:bg-[#c8f550]/10 transition-colors text-xs font-medium cursor-default"
                                >
                                    {subSkill}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

// Interactive skill card
function InteractiveSkillCard({
    skill,
    value,
    index,
    isSelected,
    onClick,
    delay = 0,
}: {
    skill: string
    value: number
    index: number
    isSelected: boolean
    onClick: (e: React.MouseEvent) => void
    delay?: number
}) {
    const level = getSkillLevel(value)

    return (
        <motion.div
            onClick={onClick}
            onMouseEnter={() => playSound("tick")}
            className={`p-5 border rounded-2xl transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                    ? "bg-[#c8f550]/20 border-[#c8f550] shadow-lg shadow-[#c8f550]/10"
                    : "bg-white/5 border-white/10 hover:border-[#c8f550]/40"
            }`}
            whileHover={{ y: -5, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            role="button"
            aria-pressed={isSelected}
        >
            {/* Glow on hover */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#c8f550]/0 via-[#c8f550]/5 to-[#c8f550]/0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
            />

            <div className="relative z-10">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2.5">
                        <span className="text-xl">{level.emoji}</span>
                        <span className="font-bold text-white tracking-wide">{skill}</span>
                    </div>
                    <span className="text-[#c8f550] font-bold text-lg">
                        <AnimatedCounter value={value} />%
                    </span>
                </div>

                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{
                            background: `linear-gradient(90deg, ${level.color}, #c8f550)`
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 1, delay: delay + 0.2 }}
                    />
                </div>

                <div className="flex justify-between items-center mt-3">
                    <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: level.color }}
                    >
                        {level.label}
                    </span>
                    <span className="text-xs text-white/40 group-hover:text-[#c8f550]/80 transition-colors">
                        {isSelected ? "Click to close" : "Click for details →"}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}

// Clean background circles decoration
function RotatingBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-lorenzo-accent/10 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-lorenzo-accent/15 rounded-full" />
        </div>
    )
}

export default function SkillsRadar() {
    const sectionRef = useRef<HTMLDivElement>(null)
    // once: false ensures that the entrance transitions run again every single time it scrolls in!
    const inViewDetector = useInView(sectionRef, { once: false, amount: 0.05 })
    const [isInView, setIsInView] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [activeCategory, setActiveCategory] = useState<keyof typeof skillsData>("all")
    const [selectedSkill, setSelectedSkill] = useState<number | null>(null)

    const currentSkills = skillsData[activeCategory]

    useEffect(() => {
        setMounted(true)
    }, [])

    // Sync viewport detector
    useEffect(() => {
        setIsInView(inViewDetector)
    }, [inViewDetector])

    // Mount fallback to prevent empty state in hot reload
    useEffect(() => {
        if (!mounted) return
        const timer = setTimeout(() => {
            setIsInView(true)
        }, 400)
        return () => clearTimeout(timer)
    }, [mounted])

    // Handle category filter clicks
    const handleCategoryChange = useCallback((categoryId: keyof typeof skillsData) => {
        setSelectedSkill(null)
        setActiveCategory(categoryId)
        playSound("click")
    }, [])

    const handleSkillClick = useCallback((index: number) => {
        setSelectedSkill(selectedSkill === index ? null : index)
        playSound("click")
    }, [selectedSkill])

    if (!mounted) return null

    return (
        <div ref={sectionRef} className="py-20 bg-lorenzo-dark relative overflow-hidden">
            {/* Animated background */}
            <RotatingBackground />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-12 h-px bg-[#c8f550]" />
                        <span className="text-xs font-bold uppercase tracking-widest text-lorenzo-accent">
                            ARCHITECTURE
                        </span>
                        <div className="w-12 h-px bg-[#c8f550]" />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-brier text-lorenzo-light uppercase mb-4">
                        SYSTEMS <span className="text-[#c8f550]">ARCHITECTURE</span>
                    </h3>
                    <p className="text-lorenzo-light/50 max-w-lg mx-auto text-sm leading-relaxed">
                        Interactive 3D Spline visualization of my development pipelines, technical nodes, and engineering architecture. Drag and rotate to explore.
                    </p>
                </motion.div>

                {/* 1. INTERACTIVE 3D SPLINE SHOWCASE - Stacked Widescreen with Continuous Float Loop */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="w-full mb-16"
                >
                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative w-full h-[550px] md:h-[650px] lg:h-[720px] rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-zinc-950/80 backdrop-blur-md flex items-center justify-center select-none"
                    >
                        {/* Interactive 3D Spline Backdrop with watermark clipping */}
                        <iframe
                            src="https://my.spline.design/3ddiagram-bhPtViCxVebX07oBXN35RwZ2/"
                            style={{ border: "none", height: "calc(100% + 48px)", width: "100%", position: "absolute", top: 0, left: 0 }}
                            title="3D Interactive Spline Diagram"
                            className="pointer-events-auto z-0"
                        />

                        {/* Central Watermark Shield overlay */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 text-[10px] font-bold text-white/50 uppercase tracking-[0.25em] flex items-center gap-2 pointer-events-none">
                            <span className="w-1.5 h-1.5 bg-[#c8f550] rounded-full animate-pulse shadow-[0_0_6px_#c8f550]" />
                            3D INTERACTIVE DIAGRAM
                        </div>
                    </motion.div>
                </motion.div>

                {/* 2. DYNAMIC DEEP-DIVE SKILLS EXPLORER SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center mt-20 mb-8"
                >
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-8 h-px bg-lorenzo-accent/30" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c8f550]">
                            DEEP DIVE EXPLORER
                        </span>
                        <div className="w-8 h-px bg-lorenzo-accent/30" />
                    </div>
                    <h4 className="text-2xl md:text-3xl font-brier text-white uppercase text-center mb-4">
                        TECHNICAL <span className="text-[#c8f550]">CORE INVENTORY</span>
                    </h4>
                    <p className="text-white/50 text-xs max-w-md mx-auto text-center leading-relaxed">
                        Filter by expertise layers to review detailed proficiency metrics, codebases, and sub-skills. Click cards to launch deep-dive audits.
                    </p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-3 mb-10"
                >
                    {skillCategories.map((category, i) => (
                        <motion.button
                            key={category.id}
                            onClick={() => handleCategoryChange(category.id as keyof typeof skillsData)}
                            className={`relative px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border rounded-xl overflow-hidden ${
                                activeCategory === category.id
                                    ? "text-black bg-[#c8f550] border-[#c8f550]"
                                    : "bg-transparent text-white/70 border-white/10 hover:border-[#c8f550] hover:text-[#c8f550]"
                            }`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <span className="text-sm">{category.icon}</span>
                                {category.label}
                            </span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Interactive Grid of Cards - Re-keyed to activeCategory to trigger countups on select */}
                <motion.div
                    key={activeCategory + "-" + isInView}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                    {currentSkills.labels.map((skill, i) => (
                        <InteractiveSkillCard
                            key={skill}
                            skill={skill}
                            value={currentSkills.data[i]}
                            index={i}
                            isSelected={selectedSkill === i}
                            onClick={() => handleSkillClick(i)}
                            delay={i * 0.05}
                        />
                    ))}
                </motion.div>

                {/* Popup Details Modal */}
                <AnimatePresence>
                    {selectedSkill !== null && (
                        <SkillDetailPanel
                            skill={currentSkills.labels[selectedSkill]}
                            value={currentSkills.data[selectedSkill]}
                            description={currentSkills.descriptions[selectedSkill]}
                            subSkills={currentSkills.subSkills[selectedSkill]}
                            experience={currentSkills.experience[selectedSkill]}
                            onClose={() => setSelectedSkill(null)}
                        />
                    )}
                </AnimatePresence>

                {/* Enhanced Stats foundational row - Re-keyed to isInView to trigger on every scroll */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {[
                        { label: "Technologies", value: 25, suffix: "+", icon: "💻", color: "#c8f550" },
                        { label: "Frameworks", value: 10, suffix: "+", icon: "⚡", color: "#60a5fa" },
                        { label: "Years Coding", value: 4, suffix: "+", icon: "⏰", color: "#a78bfa" },
                        { label: "Avg. Proficiency", value: 82, suffix: "%", icon: "📊", color: "#34d399" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label + "-" + isInView}
                            onMouseEnter={() => playSound("tick")}
                            onClick={() => playSound("click")}
                            className="relative p-5 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl text-center group overflow-hidden cursor-pointer"
                            whileHover={{ y: -5, borderColor: stat.color }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                        >
                            {/* Hover glow */}
                            <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{
                                    background: `radial-gradient(circle at center, ${stat.color}10, transparent 70%)`
                                }}
                            />
                            <div className="relative z-10">
                                <div className="text-3xl mb-3">{stat.icon}</div>
                                <div className="text-3xl font-bold" style={{ color: stat.color }}>
                                    <AnimatedCounter value={stat.value} />
                                    {stat.suffix}
                                </div>
                                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
