"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function CinematicVideoBackground() {
    const { scrollY } = useScroll()

    // Parallax effect: moves down slightly as user scrolls down
    const yTransform = useTransform(scrollY, [0, 1000], [0, 150])
    const opacityTransform = useTransform(scrollY, [0, 600], [0.85, 0])

    const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            })
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#0a0a09]">

            {/* ─── INSANE CSS FLUID AURORA (HYPEDECAY STYLE) ─── */}
            <motion.div
                className="absolute inset-0 w-full h-full opacity-80 mix-blend-screen"
                style={{ y: yTransform, opacity: opacityTransform }}
            >
                {/* massive blur layer to liquify the animated orbs beneath */}
                <div className="absolute inset-0 backdrop-blur-[120px] z-10" />

                {/* Animated Liquid Orbs */}
                <div className="absolute inset-0 z-0 opacity-70">
                    <div
                        className="absolute w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle_at_center,_rgba(200,245,80,0.15)_0%,_transparent_60%)] animate-aurora-1"
                        style={{ top: '-20%', left: '-10%' }}
                    />
                    <div
                        className="absolute w-[60vw] h-[90vw] rounded-[100%] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08)_0%,_transparent_50%)] animate-aurora-2"
                        style={{ top: '10%', right: '-20%' }}
                    />
                    <div
                        className="absolute w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle_at_center,_rgba(120,120,120,0.12)_0%,_transparent_60%)] animate-aurora-3"
                        style={{ bottom: '-30%', left: '20%' }}
                    />
                    <div
                        className="absolute w-[50vw] h-[50vw] rounded-[100%] bg-[radial-gradient(circle_at_center,_rgba(200,245,80,0.1)_0%,_transparent_50%)] transition-all duration-1000 ease-out"
                        style={{
                            left: `${mousePos.x}%`,
                            top: `${mousePos.y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                </div>
            </motion.div>

            {/* ─── HYPEDECAY STYLE BLEND LAYERS ─── */}

            {/* 1. Heavy Vignette for dramatic focus */}
            <div
                className="absolute inset-0 z-[11]"
                style={{
                    background: "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 20%, rgba(10,10,9,0.8) 70%, rgba(10,10,9,1) 100%)",
                }}
            />

            {/* 2. Top/Bottom Gradient Fades (seamless blend into page) */}
            <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#0a0a09] to-transparent z-[12]" />
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0a0a09] via-[#0a0a09]/80 to-transparent z-[12]" />

            {/* 3. Cinematic Film Grain (Noise) overlay */}
            <div
                className="absolute inset-0 z-[13] opacity-[0.06] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.7'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                }}
            />

            {/* 4. Tiny accent scanlines overlay for high-tech feel */}
            <div
                className="absolute inset-0 z-[14] opacity-[0.04] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(transparent 50%, rgba(0,0,0,1) 50%)",
                    backgroundSize: "100% 4px",
                }}
            />

            {/* Keyframe styles for fluid aurora injected directly */}
            <style jsx>{`
                @keyframes aurora-1 {
                    0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                    33% { transform: translate(10vw, 5vh) scale(1.1) rotate(45deg); }
                    66% { transform: translate(-5vw, 15vh) scale(0.9) rotate(90deg); }
                }
                @keyframes aurora-2 {
                    0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                    33% { transform: translate(-10vw, -10vh) scale(1.2) rotate(-30deg); }
                    66% { transform: translate(5vw, -5vh) scale(0.8) rotate(-60deg); }
                }
                @keyframes aurora-3 {
                    0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                    33% { transform: translate(5vw, -15vh) scale(0.9) rotate(45deg); }
                    66% { transform: translate(-10vw, -5vh) scale(1.1) rotate(90deg); }
                }
                .animate-aurora-1 { animation: aurora-1 25s ease-in-out infinite alternate; }
                .animate-aurora-2 { animation: aurora-2 30s ease-in-out infinite alternate-reverse; }
                .animate-aurora-3 { animation: aurora-3 35s ease-in-out infinite alternate; }
            `}</style>
        </div>
    )
}
