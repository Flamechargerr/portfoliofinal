"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef, ReactNode } from "react"

// 32. Guestbook Component
interface GuestbookEntry {
    id: string
    name: string
    message: string
    createdAt: string
    emoji?: string
}

export function Guestbook() {
    const [entries, setEntries] = useState<GuestbookEntry[]>([])
    const [newEntry, setNewEntry] = useState({ name: "", message: "", emoji: "👋" })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const emojis = ["👋", "🚀", "💡", "⭐", "🔥", "💪", "🎉", "❤️"]

    // Mock data
    useEffect(() => {
        setEntries([
            { id: "1", name: "John Doe", message: "Amazing portfolio! Love the design.", createdAt: "2 hours ago", emoji: "🚀" },
            { id: "2", name: "Jane Smith", message: "Very impressive work. Keep it up!", createdAt: "5 hours ago", emoji: "⭐" },
            { id: "3", name: "Dev Friend", message: "The animations are so smooth!", createdAt: "1 day ago", emoji: "🔥" },
        ])
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newEntry.name || !newEntry.message) return

        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        const entry: GuestbookEntry = {
            id: Date.now().toString(),
            name: newEntry.name,
            message: newEntry.message,
            emoji: newEntry.emoji,
            createdAt: "Just now"
        }

        setEntries([entry, ...entries])
        setNewEntry({ name: "", message: "", emoji: "👋" })
        setIsSubmitting(false)
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-lorenzo-accent mb-6">Leave a Message 📝</h3>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Your name"
                        value={newEntry.name}
                        onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-lorenzo-accent outline-none transition-colors"
                        required
                    />
                    <div className="flex gap-2">
                        {emojis.map(emoji => (
                            <button
                                key={emoji}
                                type="button"
                                onClick={() => setNewEntry({ ...newEntry, emoji })}
                                className={`text-2xl p-2 rounded-lg transition-all ${newEntry.emoji === emoji ? "bg-lorenzo-accent/20 scale-110" : "hover:bg-white/5"
                                    }`}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>
                <textarea
                    placeholder="Leave a message..."
                    value={newEntry.message}
                    onChange={(e) => setNewEntry({ ...newEntry, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:border-lorenzo-accent outline-none transition-colors resize-none h-24"
                    required
                />
                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 px-6 py-3 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {isSubmitting ? "Signing..." : "Sign Guestbook"}
                </motion.button>
            </form>

            {/* Entries */}
            <div className="space-y-4">
                <AnimatePresence>
                    {entries.map((entry, i) => (
                        <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-lg"
                        >
                            <div className="text-3xl">{entry.emoji}</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-white">{entry.name}</span>
                                    <span className="text-xs text-white/40">{entry.createdAt}</span>
                                </div>
                                <p className="text-white/70">{entry.message}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}

// 35. Collaborative Canvas
export function CollaborativeCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [color, setColor] = useState("#c8f550")

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas size
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight

        // Dark background
        ctx.fillStyle = "#0a0a0a"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }, [])

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true)
        draw(e)
    }

    const stopDrawing = () => {
        setIsDrawing(false)
        const ctx = canvasRef.current?.getContext("2d")
        if (ctx) ctx.beginPath()
    }

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return

        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        ctx.lineWidth = 3
        ctx.lineCap = "round"
        ctx.strokeStyle = color

        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y)
    }

    const colors = ["#c8f550", "#3b82f6", "#ef4444", "#a855f7", "#ffffff"]

    return (
        <div className="relative">
            <canvas
                ref={canvasRef}
                className="w-full h-64 rounded-xl border border-white/10 cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onMouseMove={draw}
            />

            {/* Color Picker */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm p-2 rounded-full">
                {colors.map(c => (
                    <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform ${color === c ? "scale-125 border-white" : "border-transparent"
                            }`}
                        style={{ backgroundColor: c }}
                    />
                ))}
            </div>

            <p className="text-center text-xs text-white/40 mt-2">Draw something! 🎨</p>
        </div>
    )
}

// 38. Bookmark System
interface Bookmark {
    id: string
    title: string
    type: "project" | "blog"
    url: string
}

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

    useEffect(() => {
        const saved = localStorage.getItem("portfolio-bookmarks")
        if (saved) setBookmarks(JSON.parse(saved))
    }, [])

    const addBookmark = (bookmark: Omit<Bookmark, "id">) => {
        const newBookmark = { ...bookmark, id: Date.now().toString() }
        const updated = [...bookmarks, newBookmark]
        setBookmarks(updated)
        localStorage.setItem("portfolio-bookmarks", JSON.stringify(updated))
    }

    const removeBookmark = (id: string) => {
        const updated = bookmarks.filter(b => b.id !== id)
        setBookmarks(updated)
        localStorage.setItem("portfolio-bookmarks", JSON.stringify(updated))
    }

    const isBookmarked = (url: string) => bookmarks.some(b => b.url === url)

    return { bookmarks, addBookmark, removeBookmark, isBookmarked }
}

export function BookmarkButton({ title, type, url }: Omit<Bookmark, "id">) {
    const { addBookmark, removeBookmark, isBookmarked } = useBookmarks()
    const bookmarked = isBookmarked(url)

    return (
        <motion.button
            onClick={() => bookmarked ? removeBookmark(url) : addBookmark({ title, type, url })}
            className={`p-2 rounded-lg transition-colors ${bookmarked ? "bg-lorenzo-accent text-lorenzo-dark" : "bg-white/5 text-white/60 hover:text-lorenzo-accent"
                }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={bookmarked ? "Remove bookmark" : "Add bookmark"}
        >
            {bookmarked ? "🔖" : "📑"}
        </motion.button>
    )
}

// 40. Print-Friendly Resume (triggers print dialog)
export function PrintResume() {
    const handlePrint = () => {
        const printContent = `
            ANAMAY TRIPATHY
            Data Science Engineer & Full Stack Developer
            
            CONTACT
            Email: tripathy.anamay23@gmail.com
            GitHub: github.com/anamaydev
            LinkedIn: linkedin.com/in/anamay-tripathy
            
            EDUCATION
            MIT Manipal - B.Tech Data Science
            2023-2027
            
            EXPERIENCE
            Technical Head @ YaanBarpe | 2024-Present
            SWE Intern @ Intellect Design Arena | 2024
            
            SKILLS
            Python, TypeScript, React, Next.js, Node.js
            TensorFlow, Docker, AWS, MongoDB
        `

        const printWindow = window.open("", "_blank")
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Anamay Tripathy - Resume</title>
                        <style>
                            body { font-family: system-ui; padding: 40px; max-width: 800px; margin: 0 auto; }
                            h1 { margin-bottom: 5px; }
                            h2 { border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 20px; }
                            pre { white-space: pre-wrap; font-family: system-ui; }
                        </style>
                    </head>
                    <body>
                        <pre>${printContent}</pre>
                    </body>
                </html>
            `)
            printWindow.document.close()
            printWindow.print()
        }
    }

    return (
        <motion.button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-lorenzo-accent hover:border-lorenzo-accent transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <span>🖨️</span>
            <span>Download Resume</span>
        </motion.button>
    )
}

// 42. Contact Scheduling (Calendly-style)
export function ContactScheduling() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)

    const availableTimes = ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"]

    const getNextDays = () => {
        const days = []
        const today = new Date()
        for (let i = 1; i <= 7; i++) {
            const date = new Date(today)
            date.setDate(today.getDate() + i)
            if (date.getDay() !== 0 && date.getDay() !== 6) { // Skip weekends
                days.push(date)
            }
        }
        return days.slice(0, 5)
    }

    const handleSchedule = () => {
        if (!selectedDate || !selectedTime) return

        const mailtoLink = `mailto:tripathy.anamay23@gmail.com?subject=Meeting Request&body=Hi Anamay,%0A%0AI'd like to schedule a meeting on ${selectedDate.toLocaleDateString()} at ${selectedTime}.%0A%0ABest regards`
        window.open(mailtoLink)
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-xl font-bold text-lorenzo-accent mb-4">📅 Schedule a Call</h3>

            {/* Date Selection */}
            <div className="mb-4">
                <p className="text-sm text-white/50 mb-2">Select a day</p>
                <div className="grid grid-cols-5 gap-2">
                    {getNextDays().map((date, i) => (
                        <motion.button
                            key={i}
                            onClick={() => setSelectedDate(date)}
                            className={`p-3 rounded-lg text-center transition-colors ${selectedDate?.toDateString() === date.toDateString()
                                ? "bg-lorenzo-accent text-lorenzo-dark"
                                : "bg-white/5 hover:bg-white/10 text-white"
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="text-xs opacity-60">
                                {date.toLocaleDateString("en", { weekday: "short" })}
                            </div>
                            <div className="text-lg font-bold">{date.getDate()}</div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4"
                >
                    <p className="text-sm text-white/50 mb-2">Select a time</p>
                    <div className="grid grid-cols-3 gap-2">
                        {availableTimes.map(time => (
                            <motion.button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`p-2 rounded-lg text-sm transition-colors ${selectedTime === time
                                    ? "bg-lorenzo-accent text-lorenzo-dark"
                                    : "bg-white/5 hover:bg-white/10 text-white"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {time}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Confirm Button */}
            {selectedDate && selectedTime && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleSchedule}
                    className="w-full py-3 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Schedule Meeting
                </motion.button>
            )}
        </div>
    )
}

// 48. Custom Cursor Collection
export function useCursorStyle() {
    const [cursorStyle, setCursorStyle] = useState<"default" | "pointer" | "grab" | "text" | "zoom">("default")

    useEffect(() => {
        const styles: Record<string, string> = {
            default: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"%23c8f550\"><circle cx=\"12\" cy=\"12\" r=\"4\"/></svg>') 12 12, auto",
            pointer: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"%23c8f550\"><circle cx=\"12\" cy=\"12\" r=\"8\"/></svg>') 12 12, pointer",
            grab: "grab",
            text: "text",
            zoom: "zoom-in"
        }

        document.body.style.cursor = styles[cursorStyle]
    }, [cursorStyle])

    return { cursorStyle, setCursorStyle }
}

// 49. Micro-interactions - Button Press Effects
export function PremiumButton({ children, onClick, className = "" }: { children: ReactNode; onClick?: () => void; className?: string }) {
    return (
        <motion.button
            onClick={onClick}
            className={`relative px-6 py-3 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider overflow-hidden group ${className}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Ripple Effect */}
            <motion.span
                className="absolute inset-0 bg-white/30"
                initial={{ scale: 0, opacity: 1 }}
                whileTap={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ borderRadius: "50%", transformOrigin: "center" }}
            />

            {/* Shine Effect */}
            <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
            />

            <span className="relative z-10">{children}</span>
        </motion.button>
    )
}

// Toggle with Animation
export function AnimatedToggle({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) {
    return (
        <motion.button
            onClick={onToggle}
            className={`w-14 h-8 rounded-full p-1 transition-colors ${isOn ? "bg-lorenzo-accent" : "bg-white/20"}`}
        >
            <motion.div
                className="w-6 h-6 rounded-full bg-white shadow-md"
                animate={{ x: isOn ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        </motion.button>
    )
}
