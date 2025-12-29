"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface ScrollProgressProps {
    showPercentage?: boolean
    color?: string
}

export function ScrollProgress({ showPercentage = false, color = "#c8f550" }: ScrollProgressProps) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const currentProgress = (window.scrollY / totalHeight) * 100
            setProgress(Math.min(100, Math.max(0, currentProgress)))
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
                style={{
                    backgroundColor: color,
                    scaleX: progress / 100,
                    transformOrigin: "left"
                }}
                initial={{ scaleX: 0 }}
            />
            {showPercentage && (
                <div
                    className="fixed bottom-6 right-6 w-12 h-12 rounded-full border-2 flex items-center justify-center z-50"
                    style={{ borderColor: color }}
                >
                    <span className="text-xs font-bold" style={{ color }}>
                        {Math.round(progress)}%
                    </span>
                </div>
            )}
        </>
    )
}

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 500)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 w-12 h-12 bg-lorenzo-accent text-lorenzo-dark flex items-center justify-center z-50 shadow-lg shadow-lorenzo-accent/30 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.8,
                pointerEvents: isVisible ? "auto" : "none"
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </motion.button>
    )
}

export function ReadingProgress() {
    const [readingTime, setReadingTime] = useState(0)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (contentRef.current) {
            const text = contentRef.current.innerText
            const words = text.split(/\s+/).length
            const time = Math.ceil(words / 200) // 200 words per minute
            setReadingTime(time)
        }
    }, [])

    return { readingTime, contentRef }
}

export function SectionIndicator() {
    const [activeSection, setActiveSection] = useState("")

    useEffect(() => {
        const sections = document.querySelectorAll("section[id]")

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { rootMargin: "-50% 0px -50% 0px" }
        )

        sections.forEach((section) => observer.observe(section))
        return () => observer.disconnect()
    }, [])

    const sectionLabels: Record<string, string> = {
        hero: "Home",
        about: "About",
        skills: "Skills",
        projects: "Projects",
        experience: "Experience",
        contact: "Contact"
    }

    return (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3">
            {Object.entries(sectionLabels).map(([id, label]) => (
                <button
                    key={id}
                    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                    className={`group flex items-center gap-3 transition-all ${activeSection === id ? "opacity-100" : "opacity-40 hover:opacity-70"
                        }`}
                >
                    <div
                        className={`w-2 h-2 rounded-full transition-all ${activeSection === id
                            ? "bg-lorenzo-accent w-8 rounded-sm"
                            : "bg-lorenzo-light/30 group-hover:bg-lorenzo-light/50"
                            }`}
                    />
                    <span
                        className={`text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity ${activeSection === id ? "text-lorenzo-accent opacity-100" : "text-lorenzo-light/50"
                            }`}
                    >
                        {label}
                    </span>
                </button>
            ))}
        </div>
    )
}
