"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const TOTAL_FRAMES = 240
const FRAME_PATH = "/core-frames"
const FRAME_PREFIX = "frame_"
const BRAND_LIME = "#c8f550"

function getFrameSrc(index: number): string {
    const num = String(index + 1).padStart(4, "0")
    return `${FRAME_PATH}/${FRAME_PREFIX}${num}.webp`
}

export default function ScrollScrubBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imagesRef = useRef<HTMLImageElement[]>([])
    const currentFrameRef = useRef(0)
    const tickingRef = useRef(false)
    const [loaded, setLoaded] = useState(false)
    const [loadProgress, setLoadProgress] = useState(0)
    const [hasFrames, setHasFrames] = useState(true) // Detects if frames actually exist

    // ─── IMAGE PRELOADING ───────────────────────────────────────────
    useEffect(() => {
        const images: HTMLImageElement[] = []
        let loadedCount = 0
        let failedCount = 0

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image()
            img.src = getFrameSrc(i)
            img.onload = () => {
                loadedCount++
                setLoadProgress(loadedCount / TOTAL_FRAMES)
                if (loadedCount + failedCount === TOTAL_FRAMES) {
                    // If more than 50% of frames failed to load, we assume directory is missing
                    if (failedCount > TOTAL_FRAMES * 0.5) {
                        setHasFrames(false)
                    } else {
                        setLoaded(true)
                    }
                }
            }
            img.onerror = () => {
                failedCount++
                setLoadProgress((loadedCount + failedCount) / TOTAL_FRAMES)
                if (loadedCount + failedCount === TOTAL_FRAMES) {
                    if (failedCount > TOTAL_FRAMES * 0.5) {
                        setHasFrames(false)
                    } else {
                        setLoaded(true)
                    }
                }
            }
            images[i] = img
        }
        imagesRef.current = images
    }, [])

    // ─── CANVAS DRAW FRAME ──────────────────────────────────────────
    const drawFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const img = imagesRef.current[frameIndex]
        if (!img || !img.complete || !img.naturalWidth) return

        const dpr = window.devicePixelRatio || 1
        const rect = canvas.getBoundingClientRect()

        // Set dimensions with respect to DPI for sharp graphics
        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr
            ctx.scale(dpr, dpr)
        }

        ctx.clearRect(0, 0, rect.width, rect.height)

        const imgAspect = img.naturalWidth / img.naturalHeight
        const canvasAspect = rect.width / rect.height
        let drawW: number, drawH: number, offX: number, offY: number

        // Cover-fit math
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

    // ─── FALLBACK ANIMATION (RUNS WHEN FRAMES ARE MISSING) ───────────
    useEffect(() => {
        if (hasFrames && loaded) return // Use frame scrubbing instead

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationId: number
        
        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect()
            const dpr = window.devicePixelRatio || 1
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr
            ctx.scale(dpr, dpr)
        }
        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        const particles: { x: number; y: number; speed: number; char: string }[] = []
        for (let i = 0; i < 40; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                speed: Math.random() * 2 + 1,
                char: Math.random() > 0.5 ? "1" : "0"
            })
        }

        const drawFallback = (time: number) => {
            const width = canvas.width / (window.devicePixelRatio || 1)
            const height = canvas.height / (window.devicePixelRatio || 1)

            ctx.fillStyle = "#1b1c11" // Brand dark bg
            ctx.fillRect(0, 0, width, height)

            // Draw a subtle animated grid
            ctx.strokeStyle = "rgba(200, 245, 80, 0.03)"
            ctx.lineWidth = 0.5
            const gridSize = 60
            const offsetX = (time * 0.02) % gridSize
            const offsetY = (time * 0.02) % gridSize

            for (let x = offsetX; x < width; x += gridSize) {
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, height)
                ctx.stroke()
            }
            for (let y = offsetY; y < height; y += gridSize) {
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(width, y)
                ctx.stroke()
            }

            // Draw floating matrix code packets
            ctx.fillStyle = "rgba(200, 245, 80, 0.15)"
            ctx.font = "10px Geist Mono, monospace"
            particles.forEach((p) => {
                p.y += p.speed
                if (p.y > height) {
                    p.y = -20
                    p.x = Math.random() * width
                }
                ctx.fillText(p.char, p.x, p.y)
                if (Math.random() > 0.98) {
                    p.char = Math.random() > 0.5 ? "1" : "0"
                }
            })

            // Draw a dashboard HUD prompt explaining what is needed
            ctx.fillStyle = "rgba(200, 245, 80, 0.4)"
            ctx.font = "9px Geist Mono, monospace"
            ctx.textAlign = "center"
            ctx.fillText("SYSTEM BACKGROUND SYNC // STANDBY // READY FOR AI VIDEO SEQUENCE", width / 2, height - 40)

            animationId = requestAnimationFrame(drawFallback)
        }

        animationId = requestAnimationFrame(drawFallback)

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            cancelAnimationFrame(animationId)
        }
    }, [loaded, hasFrames])

    // ─── SCROLL SCRUBBING LISTENER ──────────────────────────────────
    useEffect(() => {
        if (!loaded || !hasFrames) return

        // Render first frame immediately
        drawFrame(0)

        const handleScroll = () => {
            if (tickingRef.current) return
            tickingRef.current = true

            requestAnimationFrame(() => {
                const scrollTop = window.scrollY || document.documentElement.scrollTop
                const documentHeight = document.documentElement.scrollHeight
                const windowHeight = window.innerHeight
                
                const scrollableHeight = documentHeight - windowHeight
                const progress = scrollableHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollableHeight)) : 0

                // Map progress to frame index
                const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES))

                if (frameIndex !== currentFrameRef.current) {
                    currentFrameRef.current = frameIndex
                    drawFrame(frameIndex)
                }

                tickingRef.current = false
            })
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        handleScroll()

        return () => window.removeEventListener("scroll", handleScroll)
    }, [loaded, hasFrames, drawFrame])

    // Resize Handler
    useEffect(() => {
        const handleResize = () => {
            if (loaded && hasFrames) drawFrame(currentFrameRef.current)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [loaded, hasFrames, drawFrame])

    return (
        <>
            {/* The global background canvas */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 w-full h-full z-0 pointer-events-none object-cover transition-opacity duration-700"
                style={{
                    opacity: 0.28,
                    mixBlendMode: "screen",
                }}
            />

            {/* Glowing vignette overlay to maintain high contrast with text */}
            <div 
                className="fixed inset-0 pointer-events-none z-[1] opacity-60"
                style={{
                    background: "radial-gradient(circle at 50% 50%, transparent 20%, rgba(27, 28, 17, 0.4) 60%, rgba(27, 28, 17, 0.95) 100%)"
                }}
            />

            {/* Preloader overlay while files are loading */}
            {hasFrames && !loaded && (
                <div className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white font-mono text-[9px] tracking-wider select-none">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8f550]/60 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#c8f550]"></span>
                    </span>
                    SYNCING VEO CORE // {Math.round(loadProgress * 100)}%
                </div>
            )}
        </>
    )
}
