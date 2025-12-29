"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, animate, useTransform } from "framer-motion"
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js"
import { Radar } from "react-chartjs-2"

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

// Particle explosion effect component
function ParticleExplosion({ x, y, color, onComplete }: { x: number; y: number; color: string; onComplete: () => void }) {
    const particles = useMemo(() =>
        Array.from({ length: 12 }, (_, i) => ({
            id: i,
            angle: (i * 30) * (Math.PI / 180),
            distance: 40 + Math.random() * 30,
            size: 4 + Math.random() * 4,
            delay: Math.random() * 0.1
        })), []
    )

    useEffect(() => {
        const timer = setTimeout(onComplete, 600)
        return () => clearTimeout(timer)
    }, [onComplete])

    return (
        <div
            className="fixed pointer-events-none z-50"
            style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
        >
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: color,
                        boxShadow: `0 0 10px ${color}`
                    }}
                    initial={{
                        x: 0,
                        y: 0,
                        opacity: 1,
                        scale: 1
                    }}
                    animate={{
                        x: Math.cos(particle.angle) * particle.distance,
                        y: Math.sin(particle.angle) * particle.distance,
                        opacity: 0,
                        scale: 0
                    }}
                    transition={{
                        duration: 0.5,
                        delay: particle.delay,
                        ease: "easeOut"
                    }}
                />
            ))}
            {/* Central burst */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: 20,
                    height: 20,
                    backgroundColor: color,
                    left: -10,
                    top: -10,
                    boxShadow: `0 0 20px ${color}`
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            />
        </div>
    )
}

// Simple subtle background decoration (no orbiting items)

// Selection indicator removed for cleaner look

// 3D Tilt container component
function TiltContainer({ children, className }: { children: React.ReactNode; className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const rotateX = useMotionValue(0)
    const rotateY = useMotionValue(0)

    const springConfig = { stiffness: 150, damping: 20 }
    const springRotateX = useSpring(rotateX, springConfig)
    const springRotateY = useSpring(rotateY, springConfig)

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const mouseX = e.clientX - centerX
        const mouseY = e.clientY - centerY

        // Limit rotation to ±10 degrees
        const maxRotation = 10
        rotateX.set((mouseY / (rect.height / 2)) * -maxRotation)
        rotateY.set((mouseX / (rect.width / 2)) * maxRotation)
    }, [rotateX, rotateY])

    const handleMouseLeave = useCallback(() => {
        rotateX.set(0)
        rotateY.set(0)
    }, [rotateX, rotateY])

    return (
        <motion.div
            ref={containerRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
        >
            {children}
        </motion.div>
    )
}

// Skill categories with colors and icons
const skillCategories = [
    { id: "all", label: "All Skills", icon: "🎯", color: "#c8f550" },
    { id: "frontend", label: "Frontend", icon: "🎨", color: "#60a5fa" },
    { id: "backend", label: "Backend", icon: "⚙️", color: "#f472b6" },
    { id: "data", label: "Data Science", icon: "📊", color: "#a78bfa" },
    { id: "tools", label: "Tools & DevOps", icon: "🛠️", color: "#34d399" },
]

// Enhanced skills data with descriptions and sub-skills
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

// Skill level badges
const getSkillLevel = (value: number): { label: string; color: string; emoji: string } => {
    if (value >= 90) return { label: "Expert", color: "#c8f550", emoji: "🏆" }
    if (value >= 80) return { label: "Advanced", color: "#60a5fa", emoji: "⭐" }
    if (value >= 70) return { label: "Proficient", color: "#a78bfa", emoji: "💪" }
    if (value >= 60) return { label: "Intermediate", color: "#f59e0b", emoji: "📈" }
    return { label: "Learning", color: "#6b7280", emoji: "🌱" }
}

// Animated counter component
function AnimatedCounter({ value, duration = 1.5 }: { value: number; duration?: number }) {
    const [displayValue, setDisplayValue] = useState(0)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return
        const controls = animate(0, value, {
            duration,
            onUpdate: (latest) => setDisplayValue(Math.round(latest)),
        })
        return () => controls.stop()
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-4 z-50 w-full max-w-md"
        >
            <div className="bg-gradient-to-br from-lorenzo-dark via-lorenzo-dark to-lorenzo-accent/10 border-2 border-lorenzo-accent/30 rounded-2xl p-6 shadow-2xl shadow-lorenzo-accent/10 backdrop-blur-xl">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-lorenzo-accent/20 transition-colors"
                >
                    <span className="text-lorenzo-light">✕</span>
                </button>

                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-lorenzo-accent/30 to-lorenzo-accent/10 flex items-center justify-center text-3xl">
                        {level.emoji}
                    </div>
                    <div className="flex-1">
                        <h4 className="text-2xl font-bold text-lorenzo-light">{skill}</h4>
                        <div className="flex items-center gap-2 mt-1">
                            <span
                                className="px-3 py-1 rounded-full text-xs font-bold uppercase"
                                style={{ backgroundColor: `${level.color}20`, color: level.color }}
                            >
                                {level.label}
                            </span>
                            <span className="text-lorenzo-light/50 text-sm">{experience} exp</span>
                        </div>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                    <div className="flex justify-between mb-2">
                        <span className="text-lorenzo-light/70 text-sm">Proficiency</span>
                        <span className="text-lorenzo-accent font-bold"><AnimatedCounter value={value} />%</span>
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
                <p className="text-lorenzo-light/70 text-sm mb-6 leading-relaxed">
                    {description}
                </p>

                {/* Sub-skills */}
                <div>
                    <span className="text-lorenzo-light/50 text-xs uppercase tracking-widest mb-3 block">Related Skills</span>
                    <div className="flex flex-wrap gap-2">
                        {subSkills.map((subSkill, i) => (
                            <motion.span
                                key={subSkill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="px-3 py-1.5 rounded-lg bg-lorenzo-accent/10 border border-lorenzo-accent/30 text-lorenzo-accent text-sm font-medium hover:bg-lorenzo-accent/20 transition-colors cursor-default"
                            >
                                {subSkill}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// Interactive skill card with click functionality
function InteractiveSkillCard({
    skill,
    value,
    index,
    isHovered,
    isSelected,
    isFocused = false,
    onClick,
    delay = 0,
    direction = "left"
}: {
    skill: string
    value: number
    index: number
    isHovered: boolean
    isSelected: boolean
    isFocused?: boolean
    onClick: (e: React.MouseEvent) => void
    delay?: number
    direction?: "left" | "right"
}) {
    const level = getSkillLevel(value)

    return (
        <motion.div
            onClick={onClick}
            className={`p-4 border rounded-xl transition-all cursor-pointer relative overflow-hidden group ${isSelected
                ? "bg-lorenzo-accent/20 border-lorenzo-accent shadow-lg shadow-lorenzo-accent/20"
                : isHovered || isFocused
                    ? "bg-lorenzo-accent/10 border-lorenzo-accent/50"
                    : "bg-white/5 border-white/10 hover:border-lorenzo-accent/30"
                } ${isFocused ? "ring-2 ring-lorenzo-accent ring-offset-2 ring-offset-lorenzo-dark" : ""}`}
            whileHover={{ x: direction === "left" ? 10 : -10, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: direction === "left" ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            tabIndex={0}
            role="button"
            aria-pressed={isSelected}
            aria-label={`${skill}: ${value}% proficiency, ${level.label}`}
        >
            {/* Focus pulse animation */}
            {isFocused && (
                <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-lorenzo-accent"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            )}

            {/* Glow effect on hover */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-lorenzo-accent/0 via-lorenzo-accent/10 to-lorenzo-accent/0"
                initial={{ x: "-100%" }}
                animate={isHovered || isSelected || isFocused ? { x: "100%" } : { x: "-100%" }}
                transition={{ duration: 0.6 }}
            />

            <div className="relative z-10">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                        <motion.span
                            className="text-lg"
                            animate={isFocused ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                            transition={{ duration: 0.5, repeat: isFocused ? Infinity : 0 }}
                        >
                            {level.emoji}
                        </motion.span>
                        <span className="font-bold text-white">{skill}</span>
                    </div>
                    <span className="text-lorenzo-accent font-bold text-lg">
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
                        transition={{ duration: 1, delay: delay + 0.3 }}
                    />
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span
                        className="text-xs font-medium"
                        style={{ color: level.color }}
                    >
                        {level.label}
                    </span>
                    <motion.span
                        className="text-xs text-lorenzo-light/50"
                        animate={isSelected ? { color: "#c8f550" } : { color: "rgba(255,255,255,0.5)" }}
                    >
                        {isSelected ? "Click to close" : isFocused ? "Press Enter" : "Click for details"}
                    </motion.span>
                </div>
            </div>
        </motion.div>
    )
}

// Clean, subtle background decoration
function RotatingBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Visible concentric circles for depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-lorenzo-accent/15 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-lorenzo-accent/20 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-lorenzo-accent/25 rounded-full" />
        </div>
    )
}

export default function SkillsRadar() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
    const [activeCategory, setActiveCategory] = useState<keyof typeof skillsData>("all")
    const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)
    const [selectedSkill, setSelectedSkill] = useState<number | null>(null)
    const [isAnimating, setIsAnimating] = useState(false)
    const [focusedSkill, setFocusedSkill] = useState<number>(0)
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])

    const currentSkills = skillsData[activeCategory]
    const currentCategoryColor = skillCategories.find(c => c.id === activeCategory)?.color || "#c8f550"

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isInView) return

            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault()
                    setFocusedSkill((prev) => (prev + 1) % currentSkills.labels.length)
                    break
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault()
                    setFocusedSkill((prev) => (prev - 1 + currentSkills.labels.length) % currentSkills.labels.length)
                    break
                case 'Enter':
                case ' ':
                    e.preventDefault()
                    handleSkillClick(focusedSkill)
                    break
                case 'Escape':
                    setSelectedSkill(null)
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isInView, currentSkills.labels.length, focusedSkill])

    // Handle category change with animation
    const handleCategoryChange = useCallback((categoryId: keyof typeof skillsData) => {
        if (isAnimating) return
        setIsAnimating(true)
        setSelectedSkill(null)
        setFocusedSkill(0)
        setActiveCategory(categoryId)
        setTimeout(() => setIsAnimating(false), 500)
    }, [isAnimating])

    // Handle skill click with particle effect
    const handleSkillClick = useCallback((index: number, event?: React.MouseEvent) => {
        const isDeselecting = selectedSkill === index
        setSelectedSkill(isDeselecting ? null : index)

        // Add particle explosion on selection
        if (!isDeselecting && event) {
            const newParticle = {
                id: Date.now(),
                x: event.clientX,
                y: event.clientY,
                color: currentCategoryColor
            }
            setParticles(prev => [...prev, newParticle])
        }
    }, [selectedSkill, currentCategoryColor])

    // Remove particle after animation
    const removeParticle = useCallback((id: number) => {
        setParticles(prev => prev.filter(p => p.id !== id))
    }, [])

    const data = {
        labels: currentSkills.labels,
        datasets: [
            {
                label: "Skill Level",
                data: currentSkills.data,
                backgroundColor: `${currentCategoryColor}20`,
                borderColor: currentCategoryColor,
                borderWidth: 3,
                pointBackgroundColor: currentCategoryColor,
                pointBorderColor: "#1b1c11",
                pointBorderWidth: 2,
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: currentCategoryColor,
                pointHoverBorderWidth: 3,
                pointRadius: 8,
                pointHoverRadius: 14,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 800,
            easing: "easeOutQuart" as const,
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                backgroundColor: "rgba(27, 28, 17, 0.98)",
                titleColor: currentCategoryColor,
                titleFont: {
                    size: 16,
                    weight: "bold" as const,
                },
                bodyColor: "#fff",
                bodyFont: {
                    size: 14,
                },
                borderColor: currentCategoryColor,
                borderWidth: 2,
                padding: 20,
                cornerRadius: 12,
                displayColors: false,
                callbacks: {
                    title: function (context: any) {
                        return `${context[0].label}`
                    },
                    label: function (context: any) {
                        const value = context.raw
                        const level = getSkillLevel(value)
                        const idx = context.dataIndex
                        return [
                            `${level.emoji} ${value}% proficiency`,
                            `Level: ${level.label}`,
                            ``,
                            `Click skill card for details →`
                        ]
                    },
                },
            },
        },
        scales: {
            r: {
                angleLines: {
                    color: `${currentCategoryColor}15`,
                    lineWidth: 1,
                },
                grid: {
                    color: `${currentCategoryColor}10`,
                    circular: true,
                    lineWidth: 1,
                },
                pointLabels: {
                    color: "rgba(255, 255, 255, 0.85)",
                    font: {
                        size: 14,
                        weight: "bold" as const,
                        family: "'Inter', sans-serif",
                    },
                    padding: 20,
                },
                ticks: {
                    display: false,
                    stepSize: 20,
                },
                suggestedMin: 0,
                suggestedMax: 100,
            },
        },
        interaction: {
            intersect: false,
            mode: "index" as const,
        },
        onHover: (event: any, chartElement: any) => {
            if (chartElement.length > 0) {
                setHoveredSkill(chartElement[0].index)
            } else {
                setHoveredSkill(null)
            }
        },
        onClick: (event: any, chartElement: any) => {
            if (chartElement.length > 0) {
                handleSkillClick(chartElement[0].index)
            }
        },
    }

    return (
        <div ref={sectionRef} className="py-20 bg-lorenzo-dark relative overflow-hidden">
            {/* Animated background */}
            <RotatingBackground />

            {/* Particle explosions portal */}
            {particles.map(particle => (
                <ParticleExplosion
                    key={particle.id}
                    x={particle.x}
                    y={particle.y}
                    color={particle.color}
                    onComplete={() => removeParticle(particle.id)}
                />
            ))}

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <motion.div
                            className="w-12 h-px"
                            style={{ backgroundColor: currentCategoryColor }}
                            layoutId="line-left"
                        />
                        <span className="text-xs font-bold uppercase tracking-widest text-lorenzo-accent">
                            EXPERTISE
                        </span>
                        <motion.div
                            className="w-12 h-px"
                            style={{ backgroundColor: currentCategoryColor }}
                            layoutId="line-right"
                        />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-brier text-lorenzo-light uppercase mb-4">
                        SKILL <span style={{ color: currentCategoryColor }}>RADAR</span>
                    </h3>
                    <p className="text-lorenzo-light/50 max-w-lg mx-auto">
                        Click on categories to explore different skill sets. Click on skill cards or radar points for detailed insights.
                    </p>
                </motion.div>

                {/* Enhanced Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {skillCategories.map((category, i) => (
                        <motion.button
                            key={category.id}
                            onClick={() => handleCategoryChange(category.id as keyof typeof skillsData)}
                            className={`relative px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all border-2 rounded-xl overflow-hidden ${activeCategory === category.id
                                ? "text-lorenzo-dark"
                                : "bg-transparent text-lorenzo-light/70 border-lorenzo-light/20 hover:border-lorenzo-accent hover:text-lorenzo-accent"
                                }`}
                            style={{
                                borderColor: activeCategory === category.id ? category.color : undefined,
                            }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            {/* Active background */}
                            {activeCategory === category.id && (
                                <motion.div
                                    layoutId="active-category"
                                    className="absolute inset-0"
                                    style={{ backgroundColor: category.color }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                <span className="text-base">{category.icon}</span>
                                {category.label}
                            </span>
                        </motion.button>
                    ))}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Skills List - Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="hidden lg:block space-y-3"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory + "-left"}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-3"
                            >
                                {currentSkills.labels.slice(0, 3).map((skill, i) => (
                                    <InteractiveSkillCard
                                        key={skill}
                                        skill={skill}
                                        value={currentSkills.data[i]}
                                        index={i}
                                        isHovered={hoveredSkill === i}
                                        isSelected={selectedSkill === i}
                                        isFocused={focusedSkill === i}
                                        onClick={(e) => handleSkillClick(i, e)}
                                        delay={i * 0.1}
                                        direction="left"
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Radar Chart - Center with 3D Tilt */}
                    <TiltContainer className="h-[400px] md:h-[500px] relative">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                            className="h-full relative"
                        >
                            {/* Subtle static glow for depth */}
                            <div
                                className="absolute inset-0 blur-3xl rounded-full opacity-20"
                                style={{ backgroundColor: currentCategoryColor }}
                            />

                            <Radar data={data} options={options} />

                            {/* Skill Detail Panel */}
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
                        </motion.div>
                    </TiltContainer>

                    {/* Skills List - Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="hidden lg:block space-y-3"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory + "-right"}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-3"
                            >
                                {currentSkills.labels.slice(3).map((skill, i) => (
                                    <InteractiveSkillCard
                                        key={skill}
                                        skill={skill}
                                        value={currentSkills.data[i + 3]}
                                        index={i + 3}
                                        isHovered={hoveredSkill === i + 3}
                                        isSelected={selectedSkill === i + 3}
                                        isFocused={focusedSkill === i + 3}
                                        onClick={(e) => handleSkillClick(i + 3, e)}
                                        delay={i * 0.1}
                                        direction="right"
                                    />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Mobile Skills List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="lg:hidden mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                    {currentSkills.labels.map((skill, i) => (
                        <InteractiveSkillCard
                            key={skill}
                            skill={skill}
                            value={currentSkills.data[i]}
                            index={i}
                            isHovered={hoveredSkill === i}
                            isSelected={selectedSkill === i}
                            isFocused={focusedSkill === i}
                            onClick={(e) => handleSkillClick(i, e)}
                            delay={i * 0.05}
                            direction="left"
                        />
                    ))}
                </motion.div>

                {/* Enhanced Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {[
                        { label: "Technologies", value: 25, suffix: "+", icon: "💻", color: "#c8f550" },
                        { label: "Frameworks", value: 10, suffix: "+", icon: "⚡", color: "#60a5fa" },
                        { label: "Years Coding", value: 4, suffix: "+", icon: "⏰", color: "#a78bfa" },
                        { label: "Avg. Proficiency", value: 82, suffix: "%", icon: "📊", color: "#34d399" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="relative p-5 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl text-center group overflow-hidden"
                            whileHover={{ y: -5, borderColor: stat.color }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
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

                {/* Interactive tip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-8 space-y-2"
                >
                    <p className="text-lorenzo-light/40 text-sm">
                        💡 Click on any skill card or radar point to see detailed breakdown
                    </p>
                    <p className="text-lorenzo-light/30 text-xs">
                        ⌨️ Use arrow keys to navigate • Enter to select • Escape to close
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
