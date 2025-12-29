"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Link from "next/link"

interface MenuItem {
    label: string
    href: string
    icon?: React.ReactNode
    description?: string
}

interface StaggeredMenuProps {
    items: MenuItem[]
    isOpen: boolean
    onClose: () => void
}

export default function StaggeredMenu({ items, isOpen, onClose }: StaggeredMenuProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    }

    const itemVariants = {
        hidden: {
            opacity: 0,
            x: -100,
            rotateY: -45
        },
        visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        },
        exit: {
            opacity: 0,
            x: -100,
            transition: { duration: 0.2 }
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[998]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Menu container */}
                    <motion.nav
                        className="fixed left-0 top-0 bottom-0 w-full max-w-md bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] z-[999] overflow-hidden"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {/* Close button */}
                        <motion.button
                            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white/60 hover:text-lorenzo-accent transition-colors"
                            onClick={onClose}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>

                        {/* Menu items */}
                        <motion.ul
                            className="flex flex-col justify-center h-full px-12 space-y-2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {items.map((item, index) => (
                                <motion.li
                                    key={item.label}
                                    variants={itemVariants}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className="relative"
                                >
                                    <Link
                                        href={item.href}
                                        onClick={onClose}
                                        className="group flex items-center gap-4 py-4 relative"
                                    >
                                        {/* Hover background */}
                                        <motion.div
                                            className="absolute inset-0 bg-lorenzo-accent/10 rounded-lg -mx-4"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{
                                                opacity: hoveredIndex === index ? 1 : 0,
                                                scale: hoveredIndex === index ? 1 : 0.95
                                            }}
                                            transition={{ duration: 0.2 }}
                                        />

                                        {/* Icon */}
                                        {item.icon && (
                                            <motion.span
                                                className="relative z-10 text-lorenzo-accent"
                                                animate={{
                                                    x: hoveredIndex === index ? 10 : 0
                                                }}
                                            >
                                                {item.icon}
                                            </motion.span>
                                        )}

                                        {/* Number */}
                                        <motion.span
                                            className="relative z-10 text-sm text-lorenzo-accent/50 font-mono"
                                            animate={{
                                                color: hoveredIndex === index ? "#c8f550" : "#c8f55050"
                                            }}
                                        >
                                            0{index + 1}
                                        </motion.span>

                                        {/* Label */}
                                        <motion.span
                                            className="relative z-10 text-4xl md:text-5xl font-brier uppercase tracking-tight"
                                            animate={{
                                                color: hoveredIndex === index ? "#c8f550" : "#f4f4f0",
                                                x: hoveredIndex === index ? 20 : 0
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            {item.label}
                                        </motion.span>

                                        {/* Arrow */}
                                        <motion.svg
                                            className="absolute right-0 w-8 h-8 text-lorenzo-accent"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{
                                                opacity: hoveredIndex === index ? 1 : 0,
                                                x: hoveredIndex === index ? 0 : -20
                                            }}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </motion.svg>
                                    </Link>

                                    {/* Description */}
                                    {item.description && (
                                        <motion.p
                                            className="text-white/40 text-sm ml-16 -mt-2"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: hoveredIndex === index ? 1 : 0,
                                                height: hoveredIndex === index ? "auto" : 0
                                            }}
                                        >
                                            {item.description}
                                        </motion.p>
                                    )}
                                </motion.li>
                            ))}
                        </motion.ul>

                        {/* Decorative line */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-lorenzo-accent"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />
                    </motion.nav>
                </>
            )}
        </AnimatePresence>
    )
}

// Trigger button for the menu
export function MenuTrigger({ onClick }: { onClick: () => void }) {
    return (
        <motion.button
            onClick={onClick}
            className="relative w-12 h-12 flex flex-col items-center justify-center gap-1.5"
            whileHover="hover"
            whileTap={{ scale: 0.9 }}
        >
            <motion.span
                className="w-6 h-0.5 bg-lorenzo-accent"
                variants={{
                    hover: { width: 24, x: 4 }
                }}
            />
            <motion.span
                className="w-8 h-0.5 bg-lorenzo-accent"
                variants={{
                    hover: { width: 24 }
                }}
            />
            <motion.span
                className="w-4 h-0.5 bg-lorenzo-accent"
                variants={{
                    hover: { width: 24, x: -4 }
                }}
            />
        </motion.button>
    )
}
