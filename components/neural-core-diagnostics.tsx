"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playSound } from "@/lib/audio"
import { Brain, Cpu, TrendingUp, Globe, Shield, Zap, Crosshair } from "lucide-react"

// ─── CONFIGURATION ──────────────────────────────────────────────────────────
const TOTAL_FRAMES = 169
const FRAME_PATH = "/core-frames"
const FRAME_PREFIX = "frame_"
const SCROLL_HEIGHT_VH = 400 // Creates scroll distance (400vh)

function getFrameSrc(index: number): string {
    const num = String(index + 1).padStart(4, "0")
    return `${FRAME_PATH}/${FRAME_PREFIX}${num}.jpg`
}

// ─── ANNOTATIONS / DIAGNOSTICS CARDS ────────────────────────────────────────
interface HUDCard {
    id: string
    show: number
    hide: number
    title: string
    subtitle: string
    icon: any
    stats: { label: string; value: string }[]
    description: string
}

const hudCards: HUDCard[] = [
    {
        id: "ai-core",
        show: 0.10,
        hide: 0.28,
        title: "AI Neural Core",
        subtitle: "Clinical Decision Framework",
        icon: Brain,
        stats: [
            { label: "Platform", value: "MedRAG" },
            { label: "Diagnostic Acc.", value: "94.6%" },
            { label: "Ref. Latency", value: "42ms" }
        ],
        description: "Engineered MedRAG, a medical AI pipeline merging RAG (Retrieval-Augmented Generation) with clinical knowledge graphs for automated patient triage."
    },
    {
        id: "quant-core",
        show: 0.32,
        hide: 0.50,
        title: "Quant Engine Node",
        subtitle: "Portfolio Volatility Simulator",
        icon: TrendingUp,
        stats: [
            { label: "Pathways/sec", value: "12,000+" },
            { label: "Calibration", value: "Vibranium Heston" },
            { label: "Pricing Nominal", value: "100.0%" }
        ],
        description: "Modelled volatility-calibrated options pricing simulators inspired by J.P. Morgan simulations. Computes risk vectors across market vectors in real time."
    },
    {
        id: "web-core",
        show: 0.54,
        hide: 0.72,
        title: "Web Platform Gateway",
        subtitle: "MES 2025 Architecture",
        icon: Globe,
        stats: [
            { label: "Summit", value: "MES 2025" },
            { label: "Node Developer", value: "E-Cell MIT" },
            { label: "Uptime Node", value: "99.98%" }
        ],
        description: "Lead developer for the official MES 2025 entrepreneurship summit platform. Handles concurrent registration nodes, live ticketing payloads, and admin controls."
    },
    {
        id: "personal-core",
        show: 0.76,
        hide: 0.94,
        title: "Personal Subsystem",
        subtitle: "Telemetry & Lifestyle",
        icon: Cpu,
        stats: [
            { label: "Fuel Cell", value: "4+ Coffee/day" },
            { label: "Optimal Cycles", value: "12AM - 4AM" },
            { label: "Soundtrack Node", value: "Lo-Fi Sync" }
        ],
        description: "Balanced developer architecture. High productivity intervals logged during night hours. Driven by music playbacks and steady caffeine intake."
    }
]

export default function NeuralCoreDiagnostics() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imagesRef = useRef<HTMLImageElement[]>([])
    const currentFrameRef = useRef(0)
    
    // Direct DOM refs to bypass React state for high performance (60fps scrolling)
    const telemetryFrameRef = useRef<HTMLSpanElement>(null)
    const telemetryProgressRef = useRef<HTMLDivElement>(null)
    const reactorProgressRef = useRef<HTMLSpanElement>(null)
    const subtitleRef = useRef<HTMLDivElement>(null)
    
    const [loaded, setLoaded] = useState(false)
    const [loadProgress, setLoadProgress] = useState(0)
    const [visibleCardId, setVisibleCardId] = useState<string | null>(null)
    const lastTriggeredCardId = useRef<string | null>(null)

    // ─── IMAGE PRELOADING ───────────────────────────────────────────
    useEffect(() => {
        const images: HTMLImageElement[] = []
        let loadedCount = 0

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image()
            img.src = getFrameSrc(i)
            img.onload = () => {
                loadedCount++
                setLoadProgress(loadedCount / TOTAL_FRAMES)
                if (loadedCount === TOTAL_FRAMES) {
                    setLoaded(true)
                }
            }
            img.onerror = () => {
                loadedCount++
                setLoadProgress(loadedCount / TOTAL_FRAMES)
                if (loadedCount === TOTAL_FRAMES) {
                    setLoaded(true)
                }
            }
            images[i] = img
        }
        imagesRef.current = images
    }, [])

    // ─── CANVAS RENDERING ──────────────────────────────────────────
    const renderFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const img = imagesRef.current[frameIndex]
        if (!img || !img.complete || !img.naturalWidth) return

        const dpr = window.devicePixelRatio || 1
        const rect = canvas.getBoundingClientRect()

        // Set dimensions if they changed (handles resize/DPI crispness)
        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr
            ctx.scale(dpr, dpr)
        }

        ctx.clearRect(0, 0, rect.width, rect.height)

        const imgAspect = img.naturalWidth / img.naturalHeight
        const canvasAspect = rect.width / rect.height
        let drawW: number, drawH: number, offX: number, offY: number

        // Cover-fit logic
        if (imgAspect > canvasAspect) {
            drawW = rect.width
            drawH = rect.width / imgAspect
            offX = 0
            offY = (rect.height - drawH) / 2
        } else {
            drawH = rect.height
            drawW = rect.height * imgAspect
            offX = (rect.width - drawW) / 2
            offY = 0
        }

        // Apply a slight zoom on mobile for visual impact
        if (window.innerWidth <= 768) {
            drawW *= 1.25
            drawH *= 1.25
            offX = (rect.width - drawW) / 2
            offY = (rect.height - drawH) / 2
        }

        ctx.drawImage(img, offX, offY, drawW, drawH)
    }, [])

    // ─── SCROLL HANDLER (RAF + Direct DOM) ───────────────────────────
    const tickingRef = useRef(false)

    useEffect(() => {
        if (!loaded) return

        // Render first frame
        renderFrame(0)

        const handleScroll = () => {
            const section = sectionRef.current
            if (!section || tickingRef.current) return

            tickingRef.current = true

            requestAnimationFrame(() => {
                const rect = section.getBoundingClientRect()
                const scrollableHeight = section.offsetHeight - window.innerHeight
                const progress = Math.min(1, Math.max(0, -rect.top / scrollableHeight))

                // 1. Calculate and render frame
                const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES))
                if (frameIndex !== currentFrameRef.current) {
                    currentFrameRef.current = frameIndex
                    renderFrame(frameIndex)
                }

                // 2. Direct DOM Telemetry updates
                if (telemetryFrameRef.current) {
                    telemetryFrameRef.current.innerText = `FRAME ${String(frameIndex + 1).padStart(3, "0")} / ${TOTAL_FRAMES}`
                }
                if (telemetryProgressRef.current) {
                    telemetryProgressRef.current.style.transform = `scaleX(${progress})`
                }
                if (reactorProgressRef.current) {
                    reactorProgressRef.current.innerText = `${Math.min(100, Math.round(90 + progress * 10))}%`
                }

                // Fade title as we scroll down
                if (subtitleRef.current) {
                    const textOpacity = Math.max(0, 1 - progress / 0.08)
                    subtitleRef.current.style.opacity = String(textOpacity)
                    subtitleRef.current.style.transform = `translateY(-${progress * 80}px)`
                }

                // 3. Card visibility state updates (only calls setState on changes to avoid lag)
                let activeCardId: string | null = null
                for (const card of hudCards) {
                    if (progress >= card.show && progress <= card.hide) {
                        activeCardId = card.id
                        break
                    }
                }

                if (activeCardId !== lastTriggeredCardId.current) {
                    lastTriggeredCardId.current = activeCardId
                    setVisibleCardId(activeCardId)
                    if (activeCardId) {
                        playSound("click")
                    } else {
                        playSound("tick")
                    }
                }

                tickingRef.current = false
            })
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        // Initial call to set parameters
        handleScroll()

        return () => window.removeEventListener("scroll", handleScroll)
    }, [loaded, renderFrame])

    // Resize Handler
    useEffect(() => {
        const handleResize = () => {
            if (loaded) renderFrame(currentFrameRef.current)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [loaded, renderFrame])

    return (
        <div 
            ref={sectionRef} 
            style={{ height: `${SCROLL_HEIGHT_VH}vh` }} 
            className="relative bg-black w-full"
        >
            {/* Sticky Viewport */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0c0d0c] font-mono select-none">
                
                {/* ─── LOADING BAR COVER ─── */}
                {!loaded && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0d0c] text-white">
                        <div className="relative w-20 h-20 mb-6">
                            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                                <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                                <circle
                                    cx="40" cy="40" r="36" fill="none"
                                    stroke="#c8f550" strokeWidth="2"
                                    strokeDasharray={`${2 * Math.PI * 36}`}
                                    strokeDashoffset={`${2 * Math.PI * 36 * (1 - loadProgress)}`}
                                    strokeLinecap="round"
                                    style={{ transition: "stroke-dashoffset 0.15s ease" }}
                                />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-white/50 tracking-widest">
                                {Math.round(loadProgress * 100)}%
                            </span>
                        </div>
                        <p className="text-[10px] font-mono uppercase tracking-[0.45em] text-[#c8f550]/70 animate-pulse">
                            CALIBRATING NEURAL CORE // SYNCING
                        </p>
                    </div>
                )}

                {/* ─── STYLISH STARK VIGNETTE ─── */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(12,13,12,0.4) 60%, rgba(12,13,12,0.9) 100%)",
                    }}
                />

                {/* Cyber Scanlines Overlay */}
                <div
                    className="absolute inset-0 z-[11] opacity-[0.03] mix-blend-overlay pointer-events-none"
                    style={{
                        backgroundImage: "linear-gradient(transparent 50%, rgba(0,0,0,1) 50%)",
                        backgroundSize: "100% 4px",
                    }}
                />

                {/* Subtle digital grid */}
                <div
                    className="absolute inset-0 z-[9] opacity-[0.015] pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(rgba(200, 245, 80, 0.4) 1px, transparent 1px)`,
                        backgroundSize: "24px 24px",
                    }}
                />

                {/* ─── CANVAS (THE SCRUBBING ENGINE) ─── */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full z-[5] object-cover"
                />

                {/* ─── STARK HUD OVERLAYS (STATIC FRAMEWORK) ─── */}
                {loaded && (
                    <>
                        {/* Top Left: Logo / Telemetry */}
                        <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8f550]/60 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8f550]"></span>
                            </span>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-white/90">
                                    ANAMAY / SYSTEMS NOMINAL
                                </span>
                                <span className="text-[7.5px] uppercase tracking-[0.4em] text-zinc-500">
                                    Telemetry Link // Active
                                </span>
                            </div>
                        </div>

                        {/* Top Right: Core Output */}
                        <div className="absolute top-8 right-8 z-20 text-right flex flex-col gap-0.5">
                            <div className="flex items-center justify-end gap-2 text-[10px] font-bold text-white/95 uppercase tracking-[0.25em]">
                                <Zap size={10} className="text-[#c8f550]" />
                                AI Reactor: <span ref={reactorProgressRef} className="text-[#c8f550]">90%</span>
                            </div>
                            <span className="text-[7.5px] uppercase tracking-[0.3em] text-zinc-500">
                                Output: 4.8 PFLOPS // Heston Active
                            </span>
                        </div>

                        {/* Center Title overlay: fades out in first 8% of scroll */}
                        <div 
                            ref={subtitleRef} 
                            className="absolute inset-0 flex flex-col items-center justify-center text-center z-15 pointer-events-none transition-all duration-300"
                        >
                            <span className="text-[#c8f550] text-[10px] font-bold tracking-[0.5em] uppercase mb-4 px-3 py-1 border border-[#c8f550]/20 rounded-full bg-[#c8f550]/5 backdrop-blur-sm">
                                Core System Diagnostics
                            </span>
                            <h2 className="text-4xl md:text-7xl font-brier text-white tracking-tighter uppercase leading-[0.9] max-w-2xl px-6">
                                BEYOND THE <span className="text-[#c8f550] block sm:inline">CODE</span>
                            </h2>
                            <p className="text-zinc-500 text-xs mt-6 tracking-[0.25em] uppercase max-w-sm">
                                Scroll down to engage HUD analysis ↓
                            </p>
                        </div>

                        {/* Bottom Left: Frame count */}
                        <div className="absolute bottom-8 left-8 z-20 flex flex-col gap-1">
                            <span ref={telemetryFrameRef} className="text-[9px] font-mono tracking-[0.25em] text-[#c8f550]">
                                FRAME 001 / 169
                            </span>
                            <span className="text-[7px] text-zinc-500 uppercase tracking-[0.3em]">
                                Telemetry Link — Live
                            </span>
                        </div>

                        {/* Bottom Right: Location coords */}
                        <div className="absolute bottom-8 right-8 z-20 text-right flex flex-col gap-1">
                            <div className="flex items-center justify-end gap-1.5 text-[9px] font-mono tracking-[0.25em] text-white/80">
                                <Crosshair size={9} className="text-[#c8f550]/70" />
                                13.3409° N, 74.7973° E
                            </div>
                            <span className="text-[7px] text-zinc-500 uppercase tracking-[0.3em]">
                                MIT Manipal Core
                            </span>
                        </div>

                        {/* Bottom Center: Scroll bar progress */}
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.03] z-30">
                            <div
                                ref={telemetryProgressRef}
                                className="h-full bg-gradient-to-r from-[#c8f550]/50 to-[#c8f550] origin-left"
                                style={{ transform: "scaleX(0)", transition: "transform 60ms linear" }}
                            />
                        </div>

                        {/* Corner HUD framing brackets */}
                        <div className="absolute left-6 top-6 w-4 h-4 border-l-2 border-t-2 border-[#c8f550]/30 z-20 pointer-events-none" />
                        <div className="absolute right-6 top-6 w-4 h-4 border-r-2 border-t-2 border-[#c8f550]/30 z-20 pointer-events-none" />
                        <div className="absolute left-6 bottom-6 w-4 h-4 border-l-2 border-b-2 border-[#c8f550]/30 z-20 pointer-events-none" />
                        <div className="absolute right-6 bottom-6 w-4 h-4 border-r-2 border-b-2 border-[#c8f550]/30 z-20 pointer-events-none" />
                    </>
                )}

                {/* ─── HUD ANNOTATION CARDS (SCRUB EVENT STAGES) ─── */}
                <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center md:justify-end px-6 md:px-20">
                    <AnimatePresence mode="wait">
                        {hudCards.map((card) => {
                            const isVisible = visibleCardId === card.id
                            if (!isVisible) return null

                            const IconComp = card.icon

                            return (
                                <motion.div
                                    key={card.id}
                                    initial={{ opacity: 0, x: 50, y: 15 }}
                                    animate={{ opacity: 1, x: 0, y: 0 }}
                                    exit={{ opacity: 0, x: -50, y: -15 }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                    className="pointer-events-auto w-[380px] max-w-full rounded-2xl border border-white/10 bg-black/85 backdrop-blur-md p-6 
                                               shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_50px_rgba(0,0,0,0.8)]
                                               flex flex-col gap-4 text-left"
                                >
                                    {/* Card Header */}
                                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-[#c8f550]/10 text-[#c8f550] border border-[#c8f550]/20">
                                                <IconComp size={16} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black uppercase text-white/95 tracking-wider">
                                                    {card.title}
                                                </span>
                                                <span className="text-[8.5px] uppercase text-[#c8f550] tracking-widest font-semibold mt-0.5">
                                                    {card.subtitle}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c8f550]/5 border border-[#c8f550]/15 text-[#c8f550] text-[8px] tracking-widest font-bold uppercase">
                                            <Shield size={9} /> NOMINAL
                                        </div>
                                    </div>

                                    {/* Stats grid */}
                                    <div className="grid grid-cols-3 gap-2 bg-white/[0.02] border border-white/5 rounded-xl p-3">
                                        {card.stats.map((stat, i) => (
                                            <div key={i} className="flex flex-col gap-1">
                                                <span className="text-[7.5px] uppercase tracking-wider text-zinc-500 font-semibold leading-none">
                                                    {stat.label}
                                                </span>
                                                <span className="text-[11px] font-bold text-white tracking-tight leading-none mt-1">
                                                    {stat.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Description */}
                                    <p className="text-[10.5px] text-zinc-400 font-light leading-relaxed tracking-wide">
                                        {card.description}
                                    </p>

                                    {/* Telemetry link status */}
                                    <div className="flex items-center justify-between text-[7px] text-zinc-600 uppercase tracking-widest font-mono pt-1">
                                        <span>Status: CALIBRATED</span>
                                        <span>Node ID: {card.id.toUpperCase()}-0x9f</span>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    )
}
