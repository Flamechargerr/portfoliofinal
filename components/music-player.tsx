"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const playlist = [
    {
        title: "Ambient Dreams",
        artist: "Lo-Fi Vibes",
        color: "from-purple-500 to-pink-500",
        // Frequencies for ambient chord (C major 7th)
        frequencies: [261.63, 329.63, 392.0, 493.88],
    },
    {
        title: "Digital Sunset",
        artist: "Synthwave",
        color: "from-red-500 to-orange-500",
        // Frequencies for warm chord (F major 7th)
        frequencies: [349.23, 440.0, 523.25, 659.25],
    },
    {
        title: "Neon Pulse",
        artist: "Chillstep",
        color: "from-cyan-500 to-blue-500",
        // Frequencies for ethereal chord (Am7)
        frequencies: [220.0, 261.63, 329.63, 392.0],
    }
]

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTrack, setCurrentTrack] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false)
    const [progress, setProgress] = useState(0)

    const audioContextRef = useRef<AudioContext | null>(null)
    const oscillatorsRef = useRef<OscillatorNode[]>([])
    const gainNodeRef = useRef<GainNode | null>(null)
    const lfoRef = useRef<OscillatorNode | null>(null)

    const stopAudio = useCallback(() => {
        oscillatorsRef.current.forEach(osc => {
            try { osc.stop() } catch { /* ignore */ }
        })
        oscillatorsRef.current = []
        if (lfoRef.current) {
            try { lfoRef.current.stop() } catch { /* ignore */ }
            lfoRef.current = null
        }
    }, [])

    const startAudio = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext()
        }
        const ctx = audioContextRef.current

        // Resume if suspended (browser autoplay policy)
        if (ctx.state === 'suspended') {
            ctx.resume()
        }

        // Stop any existing audio
        stopAudio()

        // Create master gain
        const masterGain = ctx.createGain()
        masterGain.gain.value = 0.08 // Quiet ambient volume
        masterGain.connect(ctx.destination)
        gainNodeRef.current = masterGain

        // Create LFO for gentle volume modulation
        const lfo = ctx.createOscillator()
        const lfoGain = ctx.createGain()
        lfo.frequency.value = 0.15 // Very slow wobble
        lfoGain.gain.value = 0.03
        lfo.connect(lfoGain)
        lfoGain.connect(masterGain.gain)
        lfo.start()
        lfoRef.current = lfo

        const track = playlist[currentTrack]

        // Create oscillators for the chord
        const newOscillators: OscillatorNode[] = []
        track.frequencies.forEach((freq, i) => {
            const osc = ctx.createOscillator()
            const oscGain = ctx.createGain()

            // Use different waveforms for richness
            osc.type = i === 0 ? 'sine' : i === 1 ? 'triangle' : 'sine'
            osc.frequency.value = freq

            // Slight detune for warmth
            osc.detune.value = (Math.random() - 0.5) * 10

            oscGain.gain.value = i === 0 ? 0.4 : 0.2

            // Fade in
            oscGain.gain.setValueAtTime(0, ctx.currentTime)
            oscGain.gain.linearRampToValueAtTime(
                i === 0 ? 0.4 : 0.2,
                ctx.currentTime + 1.5
            )

            osc.connect(oscGain)
            oscGain.connect(masterGain)
            osc.start()
            newOscillators.push(osc)
        })

        oscillatorsRef.current = newOscillators
    }, [currentTrack, stopAudio])

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

    // Handle play/pause audio
    useEffect(() => {
        if (isPlaying) {
            startAudio()
        } else {
            stopAudio()
        }
    }, [isPlaying, startAudio, stopAudio])

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopAudio()
            if (audioContextRef.current) {
                audioContextRef.current.close()
            }
        }
    }, [stopAudio])

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsPlaying(!isPlaying)
    }

    const nextTrack = (e: React.MouseEvent) => {
        e.stopPropagation()
        const wasPlaying = isPlaying
        if (wasPlaying) {
            stopAudio()
        }
        setCurrentTrack((prev) => (prev + 1) % playlist.length)
        setProgress(0)
        // Audio will restart via the useEffect when currentTrack changes
        if (wasPlaying) {
            // Small delay to let state update
            setTimeout(() => startAudio(), 50)
        }
    }

    return (
        <motion.div
            className="fixed bottom-6 right-6 z-40 flex items-end gap-4"
            initial={{ opacity: 0, x: 100 }}
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
