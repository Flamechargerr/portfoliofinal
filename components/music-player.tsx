"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const playlist = [
    {
        title: "Midnight City",
        artist: "M83",
        color: "from-purple-500 to-pink-500"
    },
    {
        title: "Starboy",
        artist: "The Weeknd",
        color: "from-red-500 to-orange-500"
    },
    {
        title: "Nightcall",
        artist: "Kavinsky",
        color: "from-cyan-500 to-blue-500"
    }
]

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTrack, setCurrentTrack] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(p => {
                    if (p >= 100) return 0
                    return p + 0.5
                })
            }, 100)
        }
        return () => clearInterval(interval)
    }, [isPlaying])

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsPlaying(!isPlaying)
    }

    const nextTrack = (e: React.MouseEvent) => {
        e.stopPropagation()
        setCurrentTrack((prev) => (prev + 1) % playlist.length)
        setProgress(0)
    }

    return (
        <motion.div
            // Changed from bottom-left to top-left, below header
            className="fixed top-24 left-6 z-40 flex items-start gap-4"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
        >
            <motion.div
                className="relative bg-lorenzo-dark/95 backdrop-blur-md border border-lorenzo-accent/30 rounded-2xl overflow-hidden cursor-pointer shadow-2xl shadow-black/50"
                animate={{
                    width: isExpanded ? 280 : 56,
                    height: isExpanded ? 100 : 56,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.02 }}
            >
                {/* Minimized State - Visualizer Bars */}
                {!isExpanded && (
                    <div className="absolute inset-0 flex items-center justify-center gap-1">
                        {[1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                className="w-1 bg-lorenzo-accent rounded-full"
                                animate={{
                                    height: isPlaying ? [8, 20, 8] : 4,
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 0.5,
                                    delay: i * 0.1,
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Expanded Content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            className="p-4 flex gap-4 h-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {/* Album Art Placeholder */}
                            <div
                                className={`w-16 h-16 rounded-lg bg-gradient-to-br ${playlist[currentTrack].color} flex items-center justify-center shrink-0 relative overflow-hidden group`}
                                onClick={togglePlay}
                            >
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    {isPlaying ? (
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                                    ) : (
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    )}
                                </div>
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                                </svg>
                            </div>

                            <div className="flex flex-col justify-center min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`w-2 h-2 rounded-full bg-lorenzo-accent ${isPlaying ? 'animate-pulse' : ''}`} />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-lorenzo-accent">
                                        {isPlaying ? 'Now Playing' : 'Paused'}
                                    </span>
                                </div>
                                <h4 className="text-white font-bold truncate text-sm">{playlist[currentTrack].title}</h4>
                                <p className="text-white/50 text-xs truncate">{playlist[currentTrack].artist}</p>

                                {/* Progress Bar & Controls */}
                                <div className="flex items-center gap-3 mt-2">
                                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-lorenzo-accent"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <button onClick={nextTrack} className="text-white/50 hover:text-lorenzo-accent transition-colors">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Progress indicator when minimized */}
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
                        <motion.div
                            className="h-full bg-lorenzo-accent"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
}
