"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<"loading" | "intro" | "lidOpening" | "booting" | "ready" | "diving">("loading")
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Sequence timing
        const runSequence = async () => {
            // Wait for particles and initial render
            await new Promise((r) => setTimeout(r, 1200))

            // Show Intro Text
            setPhase("intro")
            await new Promise((r) => setTimeout(r, 2000))

            // Open Laptop Lid
            setPhase("lidOpening")
            await new Promise((r) => setTimeout(r, 2000))

            // Boot Screen
            setPhase("booting")
            await new Promise((r) => setTimeout(r, 3000))

            // Ready for interaction
            setPhase("ready")
        }

        runSequence()
    }, [])

    const handleEnter = () => {
        setPhase("diving")

        // Wait for dive animation then tell parent to remove intro
        setTimeout(() => {
            onComplete()
        }, 2200)
    }

    return (
        <AnimatePresence>
            <motion.div
                ref={containerRef}
                className="fixed inset-0 z-[100] bg-black overflow-hidden perspective-[1800px] font-sans antialiased text-white"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 1 } }}
            >
                {/* --- LENS FLARE / ATMOSPHERE --- */}
                <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(30,40,60,0.4)_0%,transparent_60%)]" />
                <div className="absolute bottom-0 left-0 right-0 h-[45vh] bg-gradient-to-b from-[#0a0a0a] to-[#050508] z-[5]" /> {/* Desk */}

                {/* --- 3D SCENE WRAPPER --- */}
                <div className="absolute inset-0 flex items-center justify-center z-10 perspective-[1800px] perspective-origin-[50%_45%]">
                    <motion.div
                        className="relative transform-style-3d"
                        initial={{ rotateX: 15, rotateY: -5, z: -100, scale: 0.8 }}
                        animate={{
                            rotateX: phase === "loading" || phase === "intro" ? 15 : phase === "diving" ? 0 : 5,
                            rotateY: phase === "loading" || phase === "intro" ? -5 : 0,
                            z: phase === "diving" ? 1200 : phase === "loading" || phase === "intro" ? -100 : 0,
                            scale: phase === "diving" ? 3 : phase === "loading" || phase === "intro" ? 0.8 : 0.9,
                        }}
                        transition={{
                            duration: phase === "diving" ? 2 : 2.5,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                    >
                        {/* THE LAPTOP */}
                        <div className="relative w-[340px] h-[220px] md:w-[680px] md:h-[440px] transform-style-3d">

                            {/* BASE */}
                            <div className="absolute bottom-0 left-0 w-full h-[10px] md:h-[20px] origin-bottom transform-style-3d rotate-x-[-90deg]">
                                {/* Keyboard deck */}
                                <div className="absolute w-full h-[210px] md:h-[420px] bg-gradient-to-br from-[#3a3a3c] to-[#1c1c1e] rounded-b-xl translate-z-[5px] md:translate-z-[10px] shadow-[inset_0_0_30px_rgba(0,0,0,0.5),0_2px_15px_rgba(0,0,0,0.8)] border border-white/5">
                                    {/* Trackpad area */}
                                    <div className="absolute bottom-[10px] md:bottom-[20px] left-1/2 -translate-x-1/2 w-[160px] md:w-[320px] h-[90px] md:h-[180px] bg-gradient-to-br from-[#2a2a2c] to-[#1c1c1e] rounded-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),inset_0_-1px_2px_rgba(0,0,0,0.3)]" />
                                </div>
                                {/* Bottom of base */}
                                <div className="absolute w-full h-[210px] md:h-[420px] bg-[#0a0a0c] rounded-b-xl border border-white/5" />
                                {/* Front lip */}
                                <div className="absolute bottom-0 w-full h-[10px] md:h-[20px] bg-gradient-to-b from-[#3a3a3c] to-[#2a2a2e] origin-bottom rounded-b w-[calc(100%-2px)] mx-[1px]" />
                            </div>

                            {/* LID */}
                            <motion.div
                                className="absolute bottom-[10px] md:bottom-[20px] left-0 w-full h-full origin-bottom transform-style-3d"
                                initial={{ rotateX: -95 }}
                                animate={{ rotateX: phase !== "loading" && phase !== "intro" ? -10 : -95 }}
                                transition={{ duration: 2.5, type: "spring", bounce: 0.15 }}
                            >
                                {/* Back of lid (aluminum) */}
                                <div className="absolute w-full h-full bg-gradient-to-br from-[#48484a] to-[#2c2c2e] rounded-t-xl backface-hidden shadow-[0_-2px_20px_rgba(0,0,0,0.5)] border border-white/5 flex items-center justify-center">
                                    <div className="w-[30px] h-[30px] md:w-[60px] md:h-[60px] opacity-20 bg-white rounded-full blur-[2px]" />
                                </div>

                                {/* Front of lid (The Screen) */}
                                <div className="absolute w-full h-full rotate-y-180 backface-hidden rounded-t-xl overflow-hidden bg-[#0a0a0a] p-[8px] md:p-[16px] pb-[12px] md:pb-[24px]">
                                    {/* Camera notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] md:w-[140px] h-[10px] md:h-[16px] bg-[#0a0a0a] rounded-b-xl z-20 flex justify-center items-center">
                                        <div className="w-[4px] h-[4px] md:w-[6px] md:h-[6px] rounded-full bg-[#1a1a2e] shadow-[0_0_4px_rgba(0,100,200,0.5)]" />
                                    </div>

                                    {/* Actual Display Area */}
                                    <div className="relative w-full h-full bg-black rounded overflow-hidden shadow-[inset_0_0_60px_rgba(0,0,0,0.9)]">

                                        {/* Booting Sequence */}
                                        <motion.div
                                            className="absolute inset-0 flex flex-col items-center justify-center z-10"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: phase === "booting" ? 1 : 0 }}
                                        >
                                            <div className="w-8 h-8 md:w-12 md:h-12 border-2 border-white/20 border-t-white rounded-full animate-spin mb-6" />
                                            <div className="w-32 md:w-48 h-1 bg-white/10 rounded overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-white"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: phase === "booting" ? "100%" : 0 }}
                                                    transition={{ duration: 2.5, ease: "easeInOut" }}
                                                />
                                            </div>
                                        </motion.div>

                                        {/* The "Operating System" UI (Shows when ready or diving) */}
                                        <motion.div
                                            className="absolute inset-0 bg-[#000]"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: phase === "ready" || phase === "diving" ? 1 : 0 }}
                                            transition={{ duration: 1 }}
                                        >
                                            {/* Code Rain overlay */}
                                            <div className="absolute inset-0 opacity-20 mix-blend-screen"
                                                style={{ backgroundImage: 'linear-gradient(rgba(100,150,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(100,150,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px', transform: 'perspective(400px) rotateX(60deg) translateY(20%)' }} />

                                            {/* Glowing abstract elements on screen */}
                                            <div className="absolute top-[20%] left-[20%] w-[150px] h-[100px] border border-white/20 bg-white/5 rounded backdrop-blur animate-pulse" />
                                            <div className="absolute bottom-[20%] right-[20%] w-[200px] h-[80px] border border-lorenzo-accent/30 bg-lorenzo-accent/10 rounded backdrop-blur animate-pulse delay-75" />
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                                <div className="text-[10px] md:text-sm font-bold text-lorenzo-accent uppercase tracking-widest">System Ready</div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* --- UI OVERLAYS --- */}

                {/* Intro Text */}
                <motion.div
                    className="absolute bottom-[20%] left-1/2 -translate-x-1/2 text-center z-30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: phase === "intro" ? 1 : 0, y: phase === "intro" ? 0 : 20 }}
                >
                    <h1 className="font-brier text-3xl md:text-5xl uppercase tracking-[0.3em] text-white/90 mb-2">Anamay</h1>
                    <p className="font-sans font-light text-xs md:text-sm uppercase tracking-[0.4em] text-white/40">Portfolio Experience</p>
                </motion.div>

                {/* Enter Button */}
                <motion.div
                    className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-40"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: phase === "ready" ? 1 : 0, scale: phase === "ready" ? 1 : 0.9 }}
                >
                    <button
                        onClick={handleEnter}
                        className="px-8 py-3 bg-white/5 border border-white/20 hover:border-lorenzo-accent hover:bg-white/10 text-white font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs rounded-full backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(200,245,80,0)] hover:shadow-[0_0_30px_rgba(200,245,80,0.2)]"
                        disabled={phase !== "ready"}
                    >
                        Enter System
                    </button>
                </motion.div>

                {/* Flash Bang (for the transition out) */}
                <motion.div
                    className="absolute inset-0 bg-white z-[200] pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase === "diving" ? [0, 1] : 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                />

                {/* Skip Button */}
                <button
                    onClick={onComplete}
                    className="absolute top-6 right-6 z-50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors"
                >
                    Skip Intro
                </button>
            </motion.div>
        </AnimatePresence>
    )
}
