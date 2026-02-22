"use client"

import { useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
    { name: "About", href: "#about", icon: "👤" },
    { name: "Skills", href: "#skills", icon: "⚡" },
    { name: "Projects", href: "#projects", icon: "🚀" },
    { name: "Experience", href: "#experience", icon: "💼" },
    { name: "Contact", href: "#contact", icon: "✉️" },
]

interface KineticMobileMenuProps {
    isOpen: boolean
    onClose: () => void
}

export default function KineticMobileMenu({ isOpen, onClose }: KineticMobileMenuProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    // Close on escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) onClose()
        }
        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [isOpen, onClose])

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => { document.body.style.overflow = "" }
    }, [isOpen])

    const handleNavClick = useCallback((href: string) => {
        onClose()
        setTimeout(() => {
            const id = href.replace("#", "")
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
        }, 400)
    }, [onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={containerRef}
                    className="fixed inset-0 z-[95] lg:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Backdrop overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Menu panel */}
                    <motion.nav
                        className="absolute inset-y-0 right-0 w-full max-w-[400px] overflow-hidden"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {/* Stacked backdrop layers */}
                        <motion.div
                            className="absolute inset-0 bg-lorenzo-dark/80"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.4, ease: [0.65, 0, 0.05, 1] }}
                        />
                        <motion.div
                            className="absolute inset-0 bg-lorenzo-dark/90"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.45, delay: 0.05, ease: [0.65, 0, 0.05, 1] }}
                        />
                        <motion.div
                            className="absolute inset-0 bg-lorenzo-dark"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.5, delay: 0.1, ease: [0.65, 0, 0.05, 1] }}
                        />

                        {/* Background decorative shapes */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <motion.div
                                className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-lorenzo-accent/5"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            />
                            <motion.div
                                className="absolute bottom-20 -left-10 w-48 h-48 rounded-full bg-lorenzo-accent/3"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            />
                            {/* Subtle grid lines */}
                            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="kinetic-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c8f550" strokeWidth="1" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#kinetic-grid)" />
                            </svg>
                        </div>

                        {/* Menu content */}
                        <div className="relative h-full flex flex-col justify-center px-10 z-10">
                            {/* Close button */}
                            <motion.button
                                className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full border border-lorenzo-accent/30 text-lorenzo-accent hover:bg-lorenzo-accent/10 transition-colors"
                                onClick={onClose}
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </motion.button>

                            {/* Nav links */}
                            <ul className="space-y-2">
                                {navItems.map((item, index) => (
                                    <motion.li
                                        key={item.name}
                                        initial={{ opacity: 0, y: 40, rotate: 5 }}
                                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{
                                            delay: 0.2 + index * 0.07,
                                            duration: 0.5,
                                            ease: [0.65, 0, 0.05, 1]
                                        }}
                                    >
                                        <button
                                            onClick={() => handleNavClick(item.href)}
                                            className="group w-full text-left py-3 flex items-center gap-4 relative overflow-hidden rounded-xl px-4 hover:bg-lorenzo-accent/5 transition-colors"
                                        >
                                            {/* Hover background sweep */}
                                            <span className="absolute inset-0 bg-gradient-to-r from-lorenzo-accent/0 via-lorenzo-accent/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                                            {/* Number */}
                                            <span className="text-xs text-lorenzo-accent/40 font-mono w-6">
                                                0{index + 1}
                                            </span>

                                            {/* Icon */}
                                            <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>

                                            {/* Text */}
                                            <span className="text-3xl font-brier text-lorenzo-light uppercase tracking-tight group-hover:text-lorenzo-accent transition-colors">
                                                {item.name}
                                            </span>

                                            {/* Arrow */}
                                            <motion.span
                                                className="ml-auto text-lorenzo-accent/30 group-hover:text-lorenzo-accent transition-colors"
                                                initial={{ x: -5, opacity: 0 }}
                                                whileHover={{ x: 0, opacity: 1 }}
                                            >
                                                →
                                            </motion.span>
                                        </button>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Bottom CTA */}
                            <motion.div
                                className="mt-12 space-y-6"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <button
                                    onClick={() => handleNavClick("#contact")}
                                    className="w-full py-4 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase text-sm tracking-wider rounded-xl hover:shadow-lg hover:shadow-lorenzo-accent/30 transition-all active:scale-95"
                                >
                                    Hire Me →
                                </button>

                                {/* Social tagline */}
                                <p className="text-center text-lorenzo-light/30 text-xs uppercase tracking-widest">
                                    Available for freelance work
                                </p>
                            </motion.div>
                        </div>
                    </motion.nav>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
