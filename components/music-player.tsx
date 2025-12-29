"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const playlist = [
    {
        title: "Midnight City",
        artist: "M83",
        cover: "/images/album-1.jpg" // Placeholder, will use color for now
    },
    {
        title: "Starboy",
        artist: "The Weeknd",
        cover: "/images/album-2.jpg"
    },
    {
        title: "Nightcall",
        artist: "Kavinsky",
        cover: "/images/album-3.jpg"
    }
]

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTrack, setCurrentTrack] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false)

    // Simulate progress
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
            className="fixed bottom-8 left-8 z-50 flex items-end gap-4"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
        >
            <motion.div
                className="relative bg-lorenzo-dark/90 backdrop-blur-md border border-lorenzo-accent/20 rounded-2xl overflow-hidden cursor-pointer shadow-2xl shadow-black/50"
                animate={{
                    width: isExpanded ? 300 : 60,
                    height: isExpanded ? 120 : 60,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.02 }}
            >
                {/* Visualizer Lines (Collapsed State) */}
                {!isExpanded && (
                    <div className="absolute inset-0 flex items-center justify-center gap-1">
                        {[1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                className="w-1 bg-lorenzo-accent"
                                animate={{
                                    height: isPlaying ? [10, 25, 10] : 4,
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
                <div className={`p-4 flex gap-4 h-full ${!isExpanded ? 'opacity-0' : 'opacity-100'}`}>
                    {/* Album Art Placeholder */}
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-lorenzo-accent/20 to-lorenzo-accent/5 flex items-center justify-center shrink-0 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-lorenzo-accent/10 animate-pulse" />
                        <svg className="w-8 h-8 text-lorenzo-accent relative z-10" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                        </svg>

                        {/* Play Overlay */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" onClick={togglePlay}>
                            {isPlaying ? (
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                            ) : (
                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col justify-center min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-lorenzo-accent animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-lorenzo-accent">Now Playing</span>
                        </div>
                        <h4 className="text-white font-bold truncate text-lg font-brier">{playlist[currentTrack].title}</h4>
                        <p className="text-white/50 text-xs truncate uppercase tracking-wider">{playlist[currentTrack].artist}</p>

                        {/* Controls */}
                        <div className="flex items-center gap-4 mt-2">

                            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-lorenzo-accent"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <button onClick={nextTrack} className="text-white/50 hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Progress Bar (Overall) */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lorenzo-accent/20">
                    <motion.div
                        className="h-full bg-lorenzo-accent"
                        animate={{ width: isExpanded ? `${progress}%` : 0 }}
                    />
                </div>
            </motion.div>
        </motion.div>
    )
}
