"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ReactNode, useRef } from "react"

interface TiltCardProps {
    children: ReactNode
    className?: string
    onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export function TiltCard({ children, className = "", onMouseMove }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Maps mouse coordinates [-0.5, 0.5] to subtle rotations [-12, 12] degrees
    const rotateXSpring = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { damping: 25, stiffness: 200 })
    const rotateYSpring = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { damping: 25, stiffness: 200 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (onMouseMove) {
            onMouseMove(e)
        }
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left - width / 2
        const mouseY = e.clientY - rect.top - height / 2
        x.set(mouseX / width)
        y.set(mouseY / height)
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
            style={{
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                transformStyle: "preserve-3d"
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
