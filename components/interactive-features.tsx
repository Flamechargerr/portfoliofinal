"use client"

import { useState, useEffect, useCallback, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"

// 36. Command Palette (Cmd+K)
interface CommandPaletteProps {
    commands?: Array<{
        id: string
        label: string
        shortcut?: string
        action: () => void
        icon?: ReactNode
    }>
}

export function CommandPalette({ commands = [] }: CommandPaletteProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState("")

    const defaultCommands = [
        { id: "home", label: "Go to Home", shortcut: "G H", action: () => window.scrollTo({ top: 0, behavior: "smooth" }), icon: "🏠" },
        { id: "about", label: "Go to About", shortcut: "G A", action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), icon: "👤" },
        { id: "projects", label: "Go to Projects", shortcut: "G P", action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }), icon: "📁" },
        { id: "contact", label: "Go to Contact", shortcut: "G C", action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), icon: "📧" },
        { id: "blog", label: "Go to Blog", shortcut: "G B", action: () => window.location.href = "/blog", icon: "📝" },
        { id: "github", label: "Open GitHub", shortcut: "G G", action: () => window.open("https://github.com/Flamechargerr", "_blank"), icon: "🐙" },
        { id: "linkedin", label: "Open LinkedIn", shortcut: "G L", action: () => window.open("https://linkedin.com/in/anamay-tripathy-b53829296", "_blank"), icon: "💼" },
        { id: "theme", label: "Toggle Theme", shortcut: "T", action: () => document.documentElement.classList.toggle("light"), icon: "🌓" },
        ...commands
    ]

    const filteredCommands = defaultCommands.filter(cmd =>
        cmd.label.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault()
                setIsOpen(prev => !prev)
            }
            if (e.key === "Escape") setIsOpen(false)
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    const executeCommand = (action: () => void) => {
        action()
        setIsOpen(false)
        setSearch("")
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Command Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl z-[201] overflow-hidden"
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-3 p-4 border-b border-white/10">
                            <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Type a command or search..."
                                className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none"
                                autoFocus
                            />
                            <kbd className="px-2 py-1 text-xs bg-white/10 rounded text-white/50">ESC</kbd>
                        </div>

                        {/* Commands List */}
                        <div className="max-h-80 overflow-y-auto p-2">
                            {filteredCommands.map((cmd, i) => (
                                <motion.button
                                    key={cmd.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    onClick={() => executeCommand(cmd.action)}
                                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 text-left group transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg">{cmd.icon}</span>
                                        <span className="text-white group-hover:text-lorenzo-accent transition-colors">
                                            {cmd.label}
                                        </span>
                                    </div>
                                    {cmd.shortcut && (
                                        <kbd className="px-2 py-1 text-xs bg-white/5 rounded text-white/30 group-hover:bg-lorenzo-accent/20 group-hover:text-lorenzo-accent">
                                            {cmd.shortcut}
                                        </kbd>
                                    )}
                                </motion.button>
                            ))}
                            {filteredCommands.length === 0 && (
                                <div className="p-4 text-center text-white/40">No commands found</div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-3 border-t border-white/10 flex items-center justify-between text-xs text-white/30">
                            <span>Navigate with ↑↓ • Select with Enter</span>
                            <span>Press <kbd className="px-1 bg-white/10 rounded">⌘K</kbd> to toggle</span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

// 17. Theme Switcher
export function ThemeSwitcher() {
    const [theme, setTheme] = useState<"dark" | "light" | "system">("dark")

    const toggleTheme = () => {
        const themes: Array<"dark" | "light" | "system"> = ["dark", "light", "system"]
        const currentIndex = themes.indexOf(theme)
        const nextTheme = themes[(currentIndex + 1) % themes.length]
        setTheme(nextTheme)

        if (nextTheme === "system") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            document.documentElement.classList.toggle("light", !prefersDark)
        } else {
            document.documentElement.classList.toggle("light", nextTheme === "light")
        }
    }

    return (
        <motion.button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={`Theme: ${theme}`}
        >
            {theme === "dark" && <span className="text-xl">🌙</span>}
            {theme === "light" && <span className="text-xl">☀️</span>}
            {theme === "system" && <span className="text-xl">💻</span>}
        </motion.button>
    )
}

// 30. Progress Tracker
export function ExplorationProgress() {
    const [progress, setProgress] = useState(0)
    const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set())

    const sections = ["hero", "about", "skills", "projects", "experience", "blog", "contact"]

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisitedSections(prev => {
                            const newSet = new Set(prev)
                            newSet.add(entry.target.id)
                            return newSet
                        })
                    }
                })
            },
            { threshold: 0.5 }
        )

        sections.forEach(id => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        setProgress((visitedSections.size / sections.length) * 100)
    }, [visitedSections])

    if (progress < 10) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-6 z-40 bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg p-3 hidden md:block"
        >
            <div className="flex items-center gap-3">
                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-lorenzo-accent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>
                <span className="text-xs text-white/50">
                    {Math.round(progress)}% explored
                </span>
            </div>
        </motion.div>
    )
}

// 31. Live Visitor Count (simulated)
export function LiveVisitorCount() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        // Simulate random visitor count between 5-30
        setCount(Math.floor(Math.random() * 25) + 5)

        const interval = setInterval(() => {
            setCount(prev => {
                const change = Math.random() > 0.5 ? 1 : -1
                return Math.max(5, Math.min(50, prev + change))
            })
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full"
        >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-400 font-medium">
                {count} viewing now
            </span>
        </motion.div>
    )
}

// 44. Reading Time Estimate
export function ReadingTime({ content, className = "" }: { content: string; className?: string }) {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)

    return (
        <span className={`text-sm text-white/50 ${className}`}>
            {minutes} min read
        </span>
    )
}

// 19. Easter Eggs
export function EasterEggs() {
    const [konamiIndex, setKonamiIndex] = useState(0)
    const [showEasterEgg, setShowEasterEgg] = useState(false)
    const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === konamiCode[konamiIndex]) {
                if (konamiIndex === konamiCode.length - 1) {
                    setShowEasterEgg(true)
                    setKonamiIndex(0)
                    setTimeout(() => setShowEasterEgg(false), 5000)
                } else {
                    setKonamiIndex(prev => prev + 1)
                }
            } else {
                setKonamiIndex(0)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [konamiIndex])

    return (
        <AnimatePresence>
            {showEasterEgg && (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="fixed inset-0 flex items-center justify-center z-[300] pointer-events-none"
                >
                    <div className="text-center">
                        <motion.div
                            className="text-8xl mb-4"
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.5, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            🎉
                        </motion.div>
                        <h2 className="text-4xl font-bold text-lorenzo-accent">
                            You found an Easter Egg!
                        </h2>
                        <p className="text-white/60 mt-2">You're a true explorer! 🕵️</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// 16. Sound Effects (with mute toggle)
export function useSoundEffects() {
    const [isMuted, setIsMuted] = useState(true)

    const playSound = useCallback((type: "click" | "hover" | "success" | "error") => {
        if (isMuted) return

        const sounds = {
            click: 800,
            hover: 600,
            success: 1000,
            error: 400
        }

        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = sounds[type]
        oscillator.type = "sine"
        gainNode.gain.value = 0.1

        oscillator.start()
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1)
        oscillator.stop(audioContext.currentTime + 0.1)
    }, [isMuted])

    return { playSound, isMuted, setIsMuted }
}

export function SoundToggle() {
    const [isMuted, setIsMuted] = useState(true)

    return (
        <motion.button
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={isMuted ? "Enable sounds" : "Mute sounds"}
        >
            {isMuted ? <span className="text-xl">🔇</span> : <span className="text-xl">🔊</span>}
        </motion.button>
    )
}

// 43. Auto Dark Mode (based on time)
export function useAutoDarkMode() {
    useEffect(() => {
        const checkTime = () => {
            const hour = new Date().getHours()
            const isDayTime = hour >= 6 && hour < 18
            document.documentElement.classList.toggle("light", isDayTime)
        }

        // Check on mount
        checkTime()

        // Check every hour
        const interval = setInterval(checkTime, 60 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])
}
