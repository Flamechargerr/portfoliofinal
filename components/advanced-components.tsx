"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useState, useEffect, ReactNode } from "react"
import Image from "next/image"

// 4. Page Transition Animations
export function PageTransition({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    )
}

// Wipe Transition
export function WipeTransition({ children, direction = "left" }: { children: ReactNode; direction?: "left" | "right" | "up" | "down" }) {
    const clipPaths = {
        left: ["inset(0 100% 0 0)", "inset(0 0 0 0)"],
        right: ["inset(0 0 0 100%)", "inset(0 0 0 0)"],
        up: ["inset(100% 0 0 0)", "inset(0 0 0 0)"],
        down: ["inset(0 0 100% 0)", "inset(0 0 0 0)"]
    }

    return (
        <motion.div
            initial={{ clipPath: clipPaths[direction][0] }}
            animate={{ clipPath: clipPaths[direction][1] }}
            exit={{ clipPath: clipPaths[direction][0] }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    )
}

// 15. Interactive Timeline
interface TimelineItem {
    id: string
    year: string
    title: string
    description: string
    icon?: string
    color?: string
}

export function InteractiveTimeline({ items }: { items: TimelineItem[] }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div className="relative py-8">
            {/* Timeline Track */}
            <div className="relative flex items-center overflow-x-auto pb-4 scrollbar-hide" ref={containerRef}>
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10" />

                <div className="flex items-center gap-0 min-w-max px-8">
                    {items.map((item, index) => (
                        <div key={item.id} className="relative flex flex-col items-center" style={{ width: 200 }}>
                            {/* Connector Line */}
                            {index < items.length - 1 && (
                                <motion.div
                                    className="absolute top-[22px] left-1/2 h-1 bg-lorenzo-accent"
                                    initial={{ width: 0 }}
                                    animate={{ width: activeIndex > index ? "100%" : 0 }}
                                    transition={{ duration: 0.5 }}
                                    style={{ zIndex: 1 }}
                                />
                            )}

                            {/* Timeline Node */}
                            <motion.button
                                onClick={() => setActiveIndex(index)}
                                className={`relative z-10 w-11 h-11 rounded-full border-4 flex items-center justify-center text-lg transition-all ${activeIndex >= index
                                        ? "bg-lorenzo-accent border-lorenzo-accent text-lorenzo-dark"
                                        : "bg-lorenzo-dark border-white/20 text-white/40"
                                    }`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {item.icon || "•"}
                            </motion.button>

                            {/* Year Label */}
                            <span className={`mt-3 text-sm font-bold ${activeIndex >= index ? "text-lorenzo-accent" : "text-white/40"}`}>
                                {item.year}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Panel */}
            <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl"
            >
                <h3 className="text-2xl font-bold text-lorenzo-accent mb-2">
                    {items[activeIndex]?.title}
                </h3>
                <p className="text-white/60">
                    {items[activeIndex]?.description}
                </p>
            </motion.div>

            {/* Navigation Arrows */}
            <div className="flex justify-center gap-4 mt-6">
                <motion.button
                    onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                    disabled={activeIndex === 0}
                    className="px-4 py-2 border border-white/20 text-white/60 disabled:opacity-30 hover:border-lorenzo-accent hover:text-lorenzo-accent transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    ← Previous
                </motion.button>
                <motion.button
                    onClick={() => setActiveIndex(Math.min(items.length - 1, activeIndex + 1))}
                    disabled={activeIndex === items.length - 1}
                    className="px-4 py-2 bg-lorenzo-accent text-lorenzo-dark font-bold disabled:opacity-30 hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Next →
                </motion.button>
            </div>
        </div>
    )
}

// 21. GitHub Contributions 3D Visualization
export function GitHub3DContributions() {
    const [contributions, setContributions] = useState<number[]>([])
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Generate mock contribution data (7 days x 12 weeks = 84 days)
        const mockData = Array.from({ length: 84 }, () => Math.floor(Math.random() * 5))
        setContributions(mockData)
    }, [])

    const getColor = (level: number) => {
        const colors = [
            "bg-white/5",
            "bg-lorenzo-accent/20",
            "bg-lorenzo-accent/40",
            "bg-lorenzo-accent/60",
            "bg-lorenzo-accent"
        ]
        return colors[level] || colors[0]
    }

    return (
        <div className="perspective-1000" ref={containerRef}>
            <motion.div
                className="grid grid-cols-12 gap-1 p-4 bg-black/20 rounded-xl"
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{ rotateX: 10, rotateY: -5 }}
                transition={{ duration: 0.5 }}
            >
                {contributions.map((level, i) => (
                    <motion.div
                        key={i}
                        className={`w-4 h-4 rounded-sm ${getColor(level)}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.01 }}
                        style={{
                            transform: `translateZ(${level * 5}px)`,
                            boxShadow: level > 2 ? `0 ${level * 2}px ${level * 4}px rgba(200, 245, 80, 0.2)` : "none"
                        }}
                        whileHover={{ scale: 1.5, z: 20 }}
                    />
                ))}
            </motion.div>
            <div className="flex justify-between mt-4 text-xs text-white/40">
                <span>Less</span>
                <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map(level => (
                        <div key={level} className={`w-3 h-3 rounded-sm ${getColor(level)}`} />
                    ))}
                </div>
                <span>More</span>
            </div>
        </div>
    )
}

// 22. Skills Constellation
interface Skill {
    name: string
    level: number // 1-5
    category: string
}

export function SkillsConstellation({ skills }: { skills: Skill[] }) {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

    return (
        <div className="relative w-full h-[400px] bg-gradient-radial from-lorenzo-accent/5 to-transparent rounded-xl overflow-hidden">
            {/* Stars Background */}
            {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.5 + 0.2
                    }}
                    animate={{
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}

            {/* Skills as Stars */}
            {skills.map((skill, i) => {
                const angle = (i / skills.length) * Math.PI * 2
                const radius = 120 + skill.level * 20
                const x = 50 + Math.cos(angle) * (radius / 4)
                const y = 50 + Math.sin(angle) * (radius / 4)

                return (
                    <motion.div
                        key={skill.name}
                        className="absolute cursor-pointer"
                        style={{ left: `${x}%`, top: `${y}%` }}
                        whileHover={{ scale: 1.5, zIndex: 10 }}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                    >
                        <motion.div
                            className="relative"
                            animate={{
                                boxShadow: hoveredSkill === skill.name
                                    ? "0 0 30px rgba(200, 245, 80, 0.8)"
                                    : "0 0 10px rgba(200, 245, 80, 0.3)"
                            }}
                        >
                            <div
                                className="rounded-full bg-lorenzo-accent flex items-center justify-center text-lorenzo-dark font-bold text-xs"
                                style={{
                                    width: 20 + skill.level * 8,
                                    height: 20 + skill.level * 8
                                }}
                            >
                                {skill.name.charAt(0)}
                            </div>

                            {hoveredSkill === skill.name && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-black/80 rounded text-white text-xs whitespace-nowrap z-20"
                                >
                                    {skill.name}
                                    <div className="text-lorenzo-accent">Level {skill.level}/5</div>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                )
            })}

            {/* Center Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-2xl font-bold text-lorenzo-accent">Skills</div>
                <div className="text-xs text-white/40">Constellation</div>
            </div>
        </div>
    )
}

// 23. Animated Project Impact Metrics
interface Metric {
    label: string
    value: number
    suffix?: string
    icon?: string
}

export function AnimatedMetrics({ metrics }: { metrics: Metric[] }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, i) => (
                <motion.div
                    key={metric.label}
                    className="p-6 bg-white/5 border border-white/10 rounded-xl text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                >
                    {metric.icon && <div className="text-3xl mb-2">{metric.icon}</div>}
                    <CountUp target={metric.value} suffix={metric.suffix} />
                    <div className="text-sm text-white/50 mt-1">{metric.label}</div>
                </motion.div>
            ))}
        </div>
    )
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    let start = 0
                    const duration = 2000
                    const step = target / (duration / 16)

                    const timer = setInterval(() => {
                        start += step
                        if (start >= target) {
                            setCount(target)
                            clearInterval(timer)
                        } else {
                            setCount(Math.floor(start))
                        }
                    }, 16)
                }
            },
            { threshold: 0.5 }
        )

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [target])

    return (
        <div ref={ref} className="text-4xl font-bold text-lorenzo-accent">
            {count.toLocaleString()}{suffix}
        </div>
    )
}

// 33. Testimonial Carousel
interface Testimonial {
    name: string
    role: string
    company: string
    avatar?: string
    content: string
}

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    const nextTestimonial = () => {
        setDirection(1)
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setDirection(-1)
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    useEffect(() => {
        const timer = setInterval(nextTestimonial, 5000)
        return () => clearInterval(timer)
    }, [])

    const testimonial = testimonials[activeIndex]

    return (
        <div className="relative max-w-2xl mx-auto">
            <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 100 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
                <div className="text-4xl text-lorenzo-accent mb-4">"</div>
                <p className="text-lg text-white/80 leading-relaxed mb-6">
                    {testimonial.content}
                </p>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-lorenzo-accent/20 flex items-center justify-center text-lorenzo-accent font-bold">
                        {testimonial.name.charAt(0)}
                    </div>
                    <div>
                        <div className="font-bold text-white">{testimonial.name}</div>
                        <div className="text-sm text-white/50">{testimonial.role} @ {testimonial.company}</div>
                    </div>
                </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setDirection(i > activeIndex ? 1 : -1)
                            setActiveIndex(i)
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? "bg-lorenzo-accent w-6" : "bg-white/20"
                            }`}
                    />
                ))}
            </div>

            {/* Arrows */}
            <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 text-white/40 hover:text-lorenzo-accent"
            >
                ←
            </button>
            <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 text-white/40 hover:text-lorenzo-accent"
            >
                →
            </button>
        </div>
    )
}
