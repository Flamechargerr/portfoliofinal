"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface CinematicScrollSequenceProps {
    // Number of frames in your image sequence
    frameCount: number
    // Function that returns the URL for a given frame index
    // e.g., (index) => `/sequence/frame_${index.toString().padStart(4, '0')}.jpg`
    getFrameUrl: (index: number) => string
}

export default function CinematicScrollSequence({ frameCount, getFrameUrl }: CinematicScrollSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [imagesLoaded, setImagesLoaded] = useState(0)
    const imagesRef = useRef<HTMLImageElement[]>([])

    // 1. Preload all images so there's no stuttering when we scroll
    useEffect(() => {
        const images: HTMLImageElement[] = []
        let loaded = 0

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image()
            img.src = getFrameUrl(i)
            img.onload = () => {
                loaded++
                setImagesLoaded(loaded)
            }
            images.push(img)
        }
        imagesRef.current = images
    }, [frameCount, getFrameUrl])

    // 2. Set up GSAP ScrollTrigger to scrub the frames
    useEffect(() => {
        if (imagesLoaded < frameCount) return // Wait for all images to preload

        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas to full screen resolution (adjust as needed for aspect ratio)
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // Helper to draw a specific frame
        const renderFrame = (index: number) => {
            const img = imagesRef.current[index]
            if (img && ctx) {
                // Calculate cover math to make the image fill the screen like object-fit: cover
                const hRatio = canvas.width / img.width
                const vRatio = canvas.height / img.height
                const ratio = Math.max(hRatio, vRatio)
                const centerShift_x = (canvas.width - img.width * ratio) / 2
                const centerShift_y = (canvas.height - img.height * ratio) / 2

                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, 0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio)
            }
        }

        // Draw the first frame immediately
        renderFrame(0)

        // Ensure GSAP is available globally (loaded in layout.tsx)
        const gsap = (window as any).gsap
        const ScrollTrigger = (window as any).ScrollTrigger

        if (gsap && ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger)

            // Animate an object from 0 to frameCount - 1
            const playhead = { frame: 0 }

            const animation = gsap.to(playhead, {
                frame: frameCount - 1,
                snap: "frame", // Snap to whole numbers
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    // The 'end' controls how much scrolling is required.
                    // e.g., "+=300%" means you scroll 3x the viewport height to see the full animation.
                    end: `+=${frameCount * 20}`,
                    scrub: 0.5, // 0.5 seconds of smoothing for the scroll
                    pin: true, // Pin the canvas in place while scrubbing
                },
                onUpdate: () => {
                    // When the frame value changes, draw it!
                    renderFrame(playhead.frame)
                }
            })

            // Cleanup on unmount
            return () => {
                animation.kill()
                ScrollTrigger.getAll().forEach((st: any) => st.kill())
            }
        }

        // Handle window resize dynamically
        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            renderFrame(Math.floor((window as any).gsap?.getProperty(playhead, "frame") || 0))
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)

    }, [imagesLoaded, frameCount])

    // Loading overlay
    const progress = Math.round((imagesLoaded / frameCount) * 100)
    const isLoading = imagesLoaded < frameCount

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-black">
            {/* The canvas that draws the frames */}
            <canvas ref={canvasRef} className="w-full h-full object-cover" />

            {/* Loading state indicator */}
            {isLoading && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white font-brier uppercase tracking-widest text-2xl"
                    >
                        Rendering 3D Assets
                    </motion.div>
                    <div className="w-64 h-[1px] bg-white/10 mt-6 overflow-hidden">
                        <motion.div
                            className="h-full bg-lorenzo-accent"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.2 }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
