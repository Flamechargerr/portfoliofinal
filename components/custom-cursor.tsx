"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [cursorText, setCursorText] = useState("")

    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 700 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
            setIsVisible(true)
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            // Traverse up to find element with data-cursor
            const cursorElement = target.closest("[data-cursor]")

            if (cursorElement) {
                const cursorType = cursorElement.getAttribute("data-cursor")
                setIsHovering(true)
                setCursorText(cursorType || "")
            } else {
                setIsHovering(false)
                setCursorText("")
            }
        }

        window.addEventListener("mousemove", moveCursor)
        window.addEventListener("mouseover", handleMouseOver)

        return () => {
            window.removeEventListener("mousemove", moveCursor)
            window.removeEventListener("mouseover", handleMouseOver)
        }
    }, [cursorX, cursorY])

    return (
        <>
            {/* Main Cursor Dot */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-lorenzo-accent rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0,
                }}
            />

            {/* Cursor Ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:flex items-center justify-center"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0,
                }}
                animate={{
                    width: isHovering ? 100 : 40,
                    height: isHovering ? 100 : 40,
                    backgroundColor: isHovering ? "rgba(200, 245, 80, 0.2)" : "rgba(0, 0, 0, 0)",
                    borderColor: isHovering ? "#c8f550" : "rgba(200, 245, 80, 0.5)",
                }}
                transition={{ duration: 0.2 }}
            >
                <div
                    className={`
            w-full h-full rounded-full border-2 transition-all
            ${isHovering ? "border-lorenzo-accent" : "border-lorenzo-accent/50"}
          `}
                />
                {isHovering && cursorText && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute text-xs font-bold uppercase tracking-wider text-lorenzo-accent"
                    >
                        {cursorText}
                    </motion.span>
                )}
            </motion.div>
        </>
    )
}
