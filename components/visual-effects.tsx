"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useRef, useState, ReactNode, useEffect } from "react"

// 1. Magnetic Button - Links that attract cursor
interface MagneticProps {
    children: ReactNode
    className?: string
    strength?: number
}

export function Magnetic({ children, className = "", strength = 0.3 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const springConfig = { damping: 15, stiffness: 150 }
    const xSpring = useSpring(x, springConfig)
    const ySpring = useSpring(y, springConfig)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = (e.clientX - centerX) * strength
        const deltaY = (e.clientY - centerY) * strength
        x.set(deltaX)
        y.set(deltaY)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// 3. Parallax Mouse Movement
interface ParallaxMouseProps {
    children: ReactNode
    className?: string
    intensity?: number
}

export function ParallaxMouse({ children, className = "", intensity = 20 }: ParallaxMouseProps) {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const springConfig = { damping: 25, stiffness: 100 }
    const xSpring = useSpring(x, springConfig)
    const ySpring = useSpring(y, springConfig)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = ((e.clientX - centerX) / rect.width) * intensity
        const deltaY = ((e.clientY - centerY) / rect.height) * intensity
        x.set(deltaX)
        y.set(deltaY)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// 5. Text Scramble Effect
interface TextScrambleProps {
    text: string
    className?: string
    speed?: number
}

export function TextScramble({ text, className = "", speed = 50 }: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(text)
    const [isScrambling, setIsScrambling] = useState(false)
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    const scramble = () => {
        if (isScrambling) return
        setIsScrambling(true)

        let iteration = 0
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) return text[index]
                        if (char === " ") return " "
                        return chars[Math.floor(Math.random() * chars.length)]
                    })
                    .join("")
            )

            if (iteration >= text.length) {
                clearInterval(interval)
                setIsScrambling(false)
            }
            iteration += 1 / 3
        }, speed)
    }

    return (
        <motion.span
            className={className}
            onMouseEnter={scramble}
            style={{ cursor: "default" }}
        >
            {displayText}
        </motion.span>
    )
}

// 7. Glitch Text Effect
interface GlitchTextProps {
    text: string
    className?: string
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
    const [isGlitching, setIsGlitching] = useState(false)

    return (
        <span
            className={`relative inline-block ${className}`}
            onMouseEnter={() => setIsGlitching(true)}
            onMouseLeave={() => setIsGlitching(false)}
        >
            <span className="relative z-10">{text}</span>
            {isGlitching && (
                <>
                    <span
                        className="absolute top-0 left-0 text-red-500 animate-pulse"
                        style={{
                            clipPath: "inset(20% 0 30% 0)",
                            transform: "translateX(-2px)"
                        }}
                    >
                        {text}
                    </span>
                    <span
                        className="absolute top-0 left-0 text-cyan-500 animate-pulse"
                        style={{
                            clipPath: "inset(50% 0 20% 0)",
                            transform: "translateX(2px)"
                        }}
                    >
                        {text}
                    </span>
                </>
            )}
        </span>
    )
}

// 8. 3D Card Tilt
interface TiltCardProps {
    children: ReactNode
    className?: string
    maxTilt?: number
    glare?: boolean
}

export function TiltCard({ children, className = "", maxTilt = 15, glare = true }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const rotateX = useMotionValue(0)
    const rotateY = useMotionValue(0)
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })

    const springConfig = { damping: 20, stiffness: 300 }
    const rotateXSpring = useSpring(rotateX, springConfig)
    const rotateYSpring = useSpring(rotateY, springConfig)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = (e.clientX - centerX) / (rect.width / 2)
        const deltaY = (e.clientY - centerY) / (rect.height / 2)

        rotateX.set(-deltaY * maxTilt)
        rotateY.set(deltaX * maxTilt)

        if (glare) {
            const glareX = ((e.clientX - rect.left) / rect.width) * 100
            const glareY = ((e.clientY - rect.top) / rect.height) * 100
            setGlarePosition({ x: glareX, y: glareY })
        }
    }

    const handleMouseLeave = () => {
        rotateX.set(0)
        rotateY.set(0)
        setGlarePosition({ x: 50, y: 50 })
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                transformStyle: "preserve-3d",
                perspective: 1000
            }}
            className={`relative ${className}`}
        >
            {children}
            {glare && (
                <div
                    className="absolute inset-0 pointer-events-none rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                        background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
                        borderRadius: "inherit"
                    }}
                />
            )}
        </motion.div>
    )
}

// 2. Morphing Blob Background
export function MorphingBlob({ className = "" }: { className?: string }) {
    return (
        <div className={`absolute pointer-events-none ${className}`}>
            <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                    <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c8f550" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                    </linearGradient>
                </defs>
                <motion.path
                    fill="url(#blob-gradient)"
                    animate={{
                        d: [
                            "M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.2,-1C86.5,14.2,80.4,28.4,71.4,40.2C62.5,52,50.6,61.3,37.4,68.1C24.1,74.8,9.4,79,-5.8,77.6C-21,76.2,-36.6,69.2,-50.1,59.4C-63.5,49.6,-74.8,37,-80.3,22.3C-85.8,7.5,-85.5,-9.4,-80.3,-24.3C-75.1,-39.1,-65,-52,-52.2,-60.2C-39.3,-68.4,-23.8,-71.9,-7.8,-74.1C8.2,-76.4,30.5,-83.5,44.7,-76.4Z",
                            "M47.7,-79.9C60.9,-71.8,70.3,-57.3,77.2,-42.1C84.1,-26.9,88.5,-11,87.5,4.4C86.4,19.7,79.9,34.5,70.5,47.2C61.1,59.9,48.9,70.4,35,76.8C21.1,83.1,5.5,85.2,-10.3,83.5C-26.1,81.8,-42.2,76.2,-54.8,66.3C-67.5,56.4,-76.8,42.2,-81.6,26.7C-86.3,11.2,-86.5,-5.7,-82,-21.1C-77.5,-36.4,-68.2,-50.3,-55.8,-58.8C-43.4,-67.4,-27.8,-70.7,-12.3,-72.3C3.2,-73.9,34.4,-87.9,47.7,-79.9Z",
                            "M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.2,-1C86.5,14.2,80.4,28.4,71.4,40.2C62.5,52,50.6,61.3,37.4,68.1C24.1,74.8,9.4,79,-5.8,77.6C-21,76.2,-36.6,69.2,-50.1,59.4C-63.5,49.6,-74.8,37,-80.3,22.3C-85.8,7.5,-85.5,-9.4,-80.3,-24.3C-75.1,-39.1,-65,-52,-52.2,-60.2C-39.3,-68.4,-23.8,-71.9,-7.8,-74.1C8.2,-76.4,30.5,-83.5,44.7,-76.4Z"
                        ]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                    transform="translate(100 100)"
                />
            </svg>
        </div>
    )
}

// 6. Noise/Grain Overlay
export function NoiseOverlay({ opacity = 0.03 }: { opacity?: number }) {
    return (
        <div
            className="fixed inset-0 pointer-events-none z-[9999]"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                opacity
            }}
        />
    )
}

// 10. Floating Particles - Fixed to avoid hydration mismatch
interface Particle {
    id: number
    x: number
    y: number
    size: number
    duration: number
}

export function FloatingParticles({ count = 50 }: { count?: number }) {
    const [particles, setParticles] = useState<Particle[]>([])
    const [mounted, setMounted] = useState(false)

    // Generate particles only on client side to avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
        const generatedParticles = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            duration: Math.random() * 20 + 10
        }))
        setParticles(generatedParticles)
    }, [count])

    // Don't render anything until mounted to avoid hydration mismatch
    if (!mounted) return null

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-lorenzo-accent/20"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        x: [-10, 10, -10],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    )
}

// 9. Reveal on Scroll (Mask Effect)
interface RevealOnScrollProps {
    children: ReactNode
    className?: string
}

export function RevealOnScroll({ children, className = "" }: RevealOnScrollProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    )
}
