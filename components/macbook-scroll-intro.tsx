"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

// ─── CONSTANTS ──────────────────────────────────────────────────────────
const TOTAL_FRAMES = 200
const FRAME_PATH = "/macbook"
const FRAME_PREFIX = "ezgif-frame-"
const SCROLL_HEIGHT = 5000 // internal scroll height in px

function getFrameSrc(index: number): string {
    const num = String(index + 1).padStart(3, "0")
    return `${FRAME_PATH}/${FRAME_PREFIX}${num}.jpg`
}

// ─── TEXT OVERLAY SECTIONS ──────────────────────────────────────────────
const textSections = [
    {
        range: [0.02, 0.20] as [number, number],
        title: "Anamay",
        subtitle: "Portfolio Experience",
        size: "hero" as const,
    },
    {
        range: [0.24, 0.42] as [number, number],
        title: "Engineered",
        subtitle: "For performance. For precision.",
        size: "large" as const,
    },
    {
        range: [0.46, 0.64] as [number, number],
        title: "Full Stack",
        subtitle: "Data Science · AI · Web",
        size: "large" as const,
    },
    {
        range: [0.70, 0.88] as [number, number],
        title: "Keep Scrolling",
        subtitle: "to enter the experience ↓",
        size: "medium" as const,
    },
]

// ─── TEXT OVERLAY COMPONENT ─────────────────────────────────────────────
function TextOverlay({
    scrollProgress,
    range,
    title,
    subtitle,
    size,
}: {
    scrollProgress: number
    range: [number, number]
    title: string
    subtitle: string
    size: "hero" | "large" | "medium"
}) {
    const [start, end] = range
    const mid = (start + end) / 2
    const fadeInEnd = start + (mid - start) * 0.5
    const fadeOutStart = mid + (end - mid) * 0.5

    let opacity = 0
    let yOffset = 50
    let scale = 0.96

    if (scrollProgress >= start && scrollProgress <= end) {
        if (scrollProgress < fadeInEnd) {
            const t = (scrollProgress - start) / (fadeInEnd - start)
            const eased = t * t * (3 - 2 * t)
            opacity = eased
            yOffset = 50 * (1 - eased)
            scale = 0.96 + 0.04 * eased
        } else if (scrollProgress < fadeOutStart) {
            opacity = 1
            yOffset = 0
            scale = 1
        } else {
            const t = (scrollProgress - fadeOutStart) / (end - fadeOutStart)
            const eased = t * t * (3 - 2 * t)
            opacity = 1 - eased
            yOffset = -40 * eased
            scale = 1 - 0.03 * eased
        }
    }

    const titleClass =
        size === "hero"
            ? "text-7xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-black"
            : size === "large"
                ? "text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black"
                : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"

    return (
        <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
            style={{
                opacity,
                transform: `translateY(${yOffset}px) scale(${scale})`,
                willChange: "opacity, transform",
            }}
        >
            {/* Dark scrim behind text for contrast */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 50%, transparent 80%)",
                    opacity,
                }}
            />

            <h2
                className={`${titleClass} tracking-tighter leading-[0.82] text-center relative z-10 px-4`}
                style={{
                    background:
                        "linear-gradient(180deg, #ffffff 0%, #e4e4e7 30%, #a1a1aa 60%, #d4d4d8 80%, #ffffff 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 60px rgba(255,255,255,0.12)) drop-shadow(0 8px 30px rgba(0,0,0,0.9))",
                }}
            >
                {title}
            </h2>
            <p
                className="mt-4 md:mt-7 text-xs sm:text-sm md:text-base uppercase tracking-[0.35em] font-light text-center px-6 relative z-10"
                style={{
                    color: "rgba(255,255,255,0.45)",
                    textShadow: "0 2px 12px rgba(0,0,0,0.9)",
                }}
            >
                {subtitle}
            </p>
        </div>
    )
}

// ─── SCROLL AFFORDANCE (Mouse + Double Chevron) ─────────────────────────
function ScrollAffordance({ visible }: { visible: boolean }) {
    return (
        <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 pointer-events-none transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(12px)" }}
        >
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/35 font-medium">
                Scroll to explore
            </span>

            {/* Mouse outline */}
            <div className="relative w-6 h-10 rounded-full border-[1.5px] border-white/20 flex items-start justify-center pt-2">
                <div
                    className="w-1 h-2.5 rounded-full bg-white/50"
                    style={{
                        animation: "scrollWheel 1.8s ease-in-out infinite",
                    }}
                />
            </div>

            {/* Double chevron */}
            <div style={{ animation: "bounceDown 1.8s ease-in-out infinite" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1L7 7L13 1" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 6L7 12L13 6" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    )
}

// ─── PROGRESS BAR ───────────────────────────────────────────────────────
function ProgressBar({ progress }: { progress: number }) {
    return (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-30 bg-white/[0.04]">
            <div
                className="h-full"
                style={{
                    width: `${progress * 100}%`,
                    background: "linear-gradient(90deg, rgba(200,245,80,0.7), rgba(200,245,80,0.25))",
                    transition: "width 60ms linear",
                }}
            />
        </div>
    )
}

// ─── HUD ────────────────────────────────────────────────────────────────
function HUD({ visible }: { visible: boolean }) {
    return (
        <>
            <div
                className="absolute top-8 left-8 z-30 pointer-events-none transition-opacity duration-1000"
                style={{ opacity: visible ? 1 : 0 }}
            >
                <div className="flex items-center gap-2 font-mono text-[8px] text-white/15 tracking-[0.4em] uppercase">
                    <div className="w-[3px] h-[3px] rounded-full bg-[#c8f550]/70" />
                    Scroll Experience
                </div>
            </div>

            <div
                className="absolute bottom-8 left-8 z-30 pointer-events-none transition-opacity duration-1000 delay-300"
                style={{ opacity: visible ? 1 : 0 }}
            >
                <p className="font-mono text-[7px] text-white/10 tracking-[0.3em]">ANAMAY // PORTFOLIO v2.0</p>
            </div>

            <div
                className="absolute bottom-8 right-8 z-30 pointer-events-none text-right transition-opacity duration-1000 delay-500"
                style={{ opacity: visible ? 1 : 0 }}
            >
                <p className="font-mono text-[7px] text-white/10 tracking-[0.3em]">28.6139°N 77.2090°E</p>
            </div>
        </>
    )
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────
export default function MacBookScrollIntro({ onComplete }: { onComplete: () => void }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imagesRef = useRef<HTMLImageElement[]>([])
    const currentFrameRef = useRef(0)
    const rafRef = useRef<number | null>(null)
    const [loaded, setLoaded] = useState(false)
    const [loadProgress, setLoadProgress] = useState(0)
    const [exiting, setExiting] = useState(false)
    const [currentProgress, setCurrentProgress] = useState(0)

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
                if (loadedCount === TOTAL_FRAMES) setLoaded(true)
            }
            img.onerror = () => {
                loadedCount++
                setLoadProgress(loadedCount / TOTAL_FRAMES)
                if (loadedCount === TOTAL_FRAMES) setLoaded(true)
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

        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr
            ctx.scale(dpr, dpr)
        }

        ctx.clearRect(0, 0, rect.width, rect.height)

        const imgAspect = img.naturalWidth / img.naturalHeight
        const canvasAspect = rect.width / rect.height
        let drawW: number, drawH: number, offX: number, offY: number

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

        ctx.drawImage(img, offX, offY, drawW, drawH)
    }, [])

    // ─── INTERNAL SCROLL HANDLER ─────────────────────────────────────
    const handleScroll = useCallback(() => {
        const container = scrollContainerRef.current
        if (!container || !loaded || exiting) return

        const scrollTop = container.scrollTop
        const maxScroll = container.scrollHeight - container.clientHeight
        const progress = Math.min(1, scrollTop / maxScroll)
        setCurrentProgress(progress)

        const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES))

        if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            rafRef.current = requestAnimationFrame(() => renderFrame(frameIndex))
        }

        // Complete at 94%
        if (progress > 0.94 && !exiting) {
            setExiting(true)
            // Reset Lenis before dismissing
            const lenis = (window as any).__lenis
            if (lenis) lenis.scrollTo(0, { immediate: true })
            setTimeout(() => onComplete(), 700)
        }
    }, [loaded, exiting, renderFrame, onComplete])

    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container) return
        container.addEventListener("scroll", handleScroll, { passive: true })
        return () => container.removeEventListener("scroll", handleScroll)
    }, [handleScroll])

    // ─── RESIZE ─────────────────────────────────────────────────────
    useEffect(() => {
        const onResize = () => { if (loaded) renderFrame(currentFrameRef.current) }
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [loaded, renderFrame])

    // ─── INITIAL RENDER ─────────────────────────────────────────────
    useEffect(() => {
        if (loaded) renderFrame(0)
    }, [loaded, renderFrame])

    // ─── PREVENT MAIN PAGE SCROLL ───────────────────────────────────
    useEffect(() => {
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = ""
            // Ensure Lenis forces scroll to 0 when intro finishes
            const l = (window as any).__lenis
            if (l) {
                l.scrollTo(0, { immediate: true })
            }
        }
    }, [])

    return (
        <AnimatePresence>
            {!exiting ? (
                <motion.div
                    key="intro-overlay"
                    className="fixed inset-0 z-[250] bg-black"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* ─── SCROLLABLE CONTAINER (isolated from Lenis) ─── */}
                    <div
                        ref={scrollContainerRef}
                        data-lenis-prevent="true"
                        className="absolute inset-0 overflow-y-auto"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            WebkitOverflowScrolling: "touch",
                        }}
                    >
                        {/* Invisible tall div that creates scroll distance */}
                        <div style={{ height: `${SCROLL_HEIGHT}px`, position: "relative" }}>
                            {/* Sticky viewport fills the screen */}
                            <div className="sticky top-0 h-screen w-full overflow-hidden">
                                {/* Vignette */}
                                <div
                                    className="absolute inset-0 z-10 pointer-events-none"
                                    style={{
                                        background:
                                            "radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.8) 100%)",
                                    }}
                                />

                                {/* Grain */}
                                <div
                                    className="absolute inset-0 z-[11] pointer-events-none opacity-[0.02]"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
                                        backgroundRepeat: "repeat",
                                    }}
                                />

                                {/* ─── CANVAS ─── */}
                                <canvas
                                    ref={canvasRef}
                                    className="absolute inset-0 w-full h-full z-[5]"
                                />

                                {/* ─── LOADING STATE ─── */}
                                {!loaded && (
                                    <div className="absolute inset-0 z-[50] flex flex-col items-center justify-center bg-black">
                                        <div className="relative w-20 h-20 mb-8">
                                            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                                                <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
                                                <circle
                                                    cx="40" cy="40" r="36" fill="none"
                                                    stroke="rgba(200,245,80,0.5)" strokeWidth="2"
                                                    strokeDasharray={`${2 * Math.PI * 36}`}
                                                    strokeDashoffset={`${2 * Math.PI * 36 * (1 - loadProgress)}`}
                                                    strokeLinecap="round"
                                                    style={{ transition: "stroke-dashoffset 0.15s ease" }}
                                                />
                                            </svg>
                                            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-white/30 tracking-widest">
                                                {Math.round(loadProgress * 100)}%
                                            </span>
                                        </div>
                                        <p className="text-[9px] font-mono uppercase tracking-[0.5em] text-white/15">
                                            Loading Experience
                                        </p>
                                    </div>
                                )}

                                {/* ─── TEXT OVERLAYS ─── */}
                                {loaded &&
                                    textSections.map((section, i) => (
                                        <TextOverlay
                                            key={i}
                                            scrollProgress={currentProgress}
                                            range={section.range}
                                            title={section.title}
                                            subtitle={section.subtitle}
                                            size={section.size}
                                        />
                                    ))}

                                {/* ─── HUD ─── */}
                                <HUD visible={loaded && currentProgress > 0.01} />

                                {/* ─── SCROLL AFFORDANCE ─── */}
                                {loaded && <ScrollAffordance visible={currentProgress < 0.06} />}

                                {/* ─── PROGRESS BAR ─── */}
                                {loaded && <ProgressBar progress={currentProgress} />}

                                {/* ─── SKIP BUTTON ─── */}
                                <button
                                    onClick={() => {
                                        // Reset Lenis scroll if available
                                        const lenis = (window as any).__lenis
                                        if (lenis) lenis.scrollTo(0, { immediate: true })
                                        onComplete()
                                    }}
                                    className="absolute top-8 right-8 z-50 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.3em] text-white/20 hover:text-white/60 border border-white/[0.08] hover:border-white/20 rounded-full transition-all duration-500 backdrop-blur-sm hover:bg-white/[0.04]"
                                >
                                    Skip Intro
                                </button>

                                {/* ─── EXIT OVERLAY ─── */}
                                <div
                                    className="absolute inset-0 pointer-events-none z-[60] transition-opacity duration-500"
                                    style={{
                                        opacity: exiting ? 1 : 0,
                                        background: "linear-gradient(180deg, #1b1c11 0%, #1b1c11 100%)",
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Hide scrollbar via CSS */}
                    <style jsx>{`
                        div::-webkit-scrollbar { display: none; }
                        @keyframes scrollWheel {
                            0%, 100% { transform: translateY(0); opacity: 1; }
                            50% { transform: translateY(8px); opacity: 0.3; }
                        }
                        @keyframes bounceDown {
                            0%, 100% { transform: translateY(0); }
                            50% { transform: translateY(5px); }
                        }
                    `}</style>
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}
