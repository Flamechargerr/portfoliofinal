"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface Skill {
    name: string
    level: number
    projects: number
    icon: string
}

interface SkillCategory {
    id: string
    name: string
    skills: Skill[]
}

const skillCategories: SkillCategory[] = [
    {
        id: "frontend",
        name: "FRONT END",
        skills: [
            { name: "JavaScript", level: 90, projects: 8, icon: "⚡" },
            { name: "React/Next.js", level: 85, projects: 6, icon: "⚛️" },
            { name: "TypeScript", level: 75, projects: 4, icon: "📘" },
            { name: "HTML/CSS", level: 95, projects: 10, icon: "🎨" },
        ],
    },
    {
        id: "backend",
        name: "BACK END",
        skills: [
            { name: "Node.js", level: 80, projects: 5, icon: "🟢" },
            { name: "Python", level: 85, projects: 7, icon: "🐍" },
            { name: "Java", level: 75, projects: 4, icon: "☕" },
            { name: "Express/Flask", level: 75, projects: 5, icon: "🚂" },
            { name: "MongoDB/SQL", level: 80, projects: 4, icon: "🗄️" },
        ],
    },
    {
        id: "datascience",
        name: "DATA SCIENCE",
        skills: [
            { name: "Pandas/NumPy", level: 85, projects: 6, icon: "🐼" },
            { name: "Scikit-learn", level: 75, projects: 4, icon: "🤖" },
            { name: "TensorFlow", level: 65, projects: 2, icon: "🧠" },
            { name: "Tableau", level: 70, projects: 3, icon: "📊" },
        ],
    },
    {
        id: "tools",
        name: "TOOLS",
        skills: [
            { name: "Git/GitHub", level: 90, projects: 15, icon: "📦" },
            { name: "Docker", level: 65, projects: 3, icon: "🐳" },
            { name: "AWS", level: 60, projects: 2, icon: "☁️" },
            { name: "Figma", level: 70, projects: 4, icon: "🎯" },
        ],
    },
]

export default function SkillsSection() {
    const [activeCategory, setActiveCategory] = useState("frontend")
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

    const activeSkills = skillCategories.find(cat => cat.id === activeCategory)?.skills || []

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="relative min-h-screen bg-transparent text-white py-16 md:py-20 overflow-hidden"
        >


            {/* Background Number */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-none z-[1]">
                <span className="text-[40vw] font-brier text-white/[0.02] leading-none mix-blend-overlay">
                    01
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
                    <div className="flex items-center gap-6 mb-8">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                            TECH SPECS
                        </span>
                        <div className="w-24 h-[1px] bg-white/10" />
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-brier uppercase leading-[0.85] tracking-tighter">
                        <span className="block text-white">SKILLS &</span>
                        <span className="block text-lorenzo-accent">TECHNOLOGIES</span>
                    </h2>
                </motion.div>

                {/* Category Tabs - Racing Style with Hover Effects */}
                <motion.div
                    className="flex gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    {skillCategories.map((category, index) => (
                        <motion.button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`
                relative px-6 py-3 font-bold uppercase text-xs tracking-[0.2em] transition-all overflow-hidden flex-shrink-0 whitespace-nowrap rounded-full border
                ${activeCategory === category.id
                                    ? "bg-white/10 border-white/20 text-white"
                                    : "bg-transparent text-white/50 border-white/5 hover:border-white/20 hover:text-white"}
              `}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            data-cursor="SELECT"
                        >
                            <span className="flex items-center gap-3 relative z-10">
                                <span className="text-[10px] opacity-40 font-brier">0{index + 1}</span>
                                <span>{category.name}</span>
                            </span>

                            {activeCategory === category.id && (
                                <motion.div
                                    className="absolute inset-0 border border-white/30 rounded-full"
                                    layoutId="activeTab"
                                />
                            )}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Skills Display - Interactive Cards */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {activeSkills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative p-6 md:p-8 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-pointer overflow-hidden"
                                onMouseEnter={() => setHoveredSkill(skill.name)}
                                onMouseLeave={() => setHoveredSkill(null)}
                                data-cursor="VIEW"
                            >
                                {/* Background Icon */}
                                <motion.div
                                    className="absolute -right-4 -top-4 text-8xl opacity-5 group-hover:opacity-20 transition-all"
                                    animate={{
                                        scale: hoveredSkill === skill.name ? 1.2 : 1,
                                        rotate: hoveredSkill === skill.name ? 10 : 0
                                    }}
                                >
                                    {skill.icon}
                                </motion.div>

                                <div className="flex items-start justify-between mb-4 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <motion.span
                                            className="text-3xl"
                                            animate={{ scale: hoveredSkill === skill.name ? 1.2 : 1 }}
                                        >
                                            {skill.icon}
                                        </motion.span>
                                        <div>
                                            <h3 className="text-xl font-bold text-white uppercase tracking-wider group-hover:text-lorenzo-accent transition-colors">
                                                {skill.name}
                                            </h3>
                                            <p className="text-xs text-white/40 mt-1 uppercase tracking-[0.1em]">{skill.projects} projects built</p>
                                        </div>
                                    </div>
                                    <motion.div
                                        className="text-3xl font-brier text-lorenzo-accent"
                                        animate={{ scale: hoveredSkill === skill.name ? 1.2 : 1 }}
                                    >
                                        {skill.level}%
                                    </motion.div>
                                </div>

                                {/* Progress Bar - Racing Style with Animation */}
                                <div className="relative h-1 bg-white/5 overflow-hidden rounded-full mt-8">
                                    <motion.div
                                        className="absolute top-0 left-0 h-full bg-lorenzo-accent rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                    />
                                    {/* Racing stripes effect */}
                                    <motion.div
                                        className="absolute inset-0 opacity-30"
                                        style={{
                                            backgroundImage: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 3px,
                        rgba(0,0,0,0.1) 3px,
                        rgba(0,0,0,0.1) 6px
                      )`,
                                        }}
                                        animate={{ x: hoveredSkill === skill.name ? [0, 10] : 0 }}
                                        transition={{ duration: 0.5, repeat: hoveredSkill === skill.name ? Infinity : 0 }}
                                    />
                                </div>

                                {/* Corner Number */}
                                <div className="absolute top-4 right-4 text-3xl font-brier text-white/5 group-hover:text-white/10 transition-colors">
                                    0{index + 1}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Certifications - Trophy Style with Images */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="mt-20 p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md relative overflow-hidden"
                >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <Image
                            src="/images/data-viz.png"
                            alt="Background"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-brier uppercase mb-2 text-white">
                                <span className="text-lorenzo-accent">CERTIFIED</span> PROFESSIONAL
                            </h3>
                            <p className="text-white/60 font-light tracking-tight text-sm">
                                Industry-validated expertise from global tech leaders
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {[
                                { name: "Meta Data Analyst", pos: "1ST" },
                                { name: "IBM GenAI Pro", pos: "2ND" },
                                { name: "Google Analytics", pos: "3RD" },
                            ].map((cert, i) => (
                                <motion.div
                                    key={i}
                                    className="flex items-center gap-3 px-5 py-3 border border-white/10 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all cursor-pointer"
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    data-cursor="VIEW"
                                >
                                    <span className="text-xl font-brier italic text-white/50">{cert.pos}</span>
                                    <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white">{cert.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
