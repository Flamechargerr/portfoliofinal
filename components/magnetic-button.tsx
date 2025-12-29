"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
    children: React.ReactNode
    className?: string
    href?: string
    onClick?: () => void
}

export default function MagneticButton({ children, className = "", href, onClick }: MagneticButtonProps) {
    const buttonRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const button = buttonRef.current
        if (!button) return

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2

            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
        }

        const handleMouseLeave = () => {
            button.style.transform = "translate(0px, 0px)"
        }

        button.addEventListener("mousemove", handleMouseMove)
        button.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            button.removeEventListener("mousemove", handleMouseMove)
            button.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [])

    const content = (
        <motion.div
            ref={buttonRef}
            className={`inline-block transition-transform duration-200 ease-out ${className}`}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.div>
    )

    if (href) {
        return <a href={href}>{content}</a>
    }

    return <button onClick={onClick}>{content}</button>
}
