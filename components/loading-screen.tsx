"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[200] bg-lorenzo-dark flex items-center justify-center"
                >
                    <div className="text-center">
                        {/* Logo Animation */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <h1 className="text-5xl md:text-7xl font-brier uppercase">
                                <span className="text-lorenzo-accent">A</span>
                                <span className="text-lorenzo-light">T</span>
                            </h1>
                        </motion.div>

                        {/* Loading Bar */}
                        <motion.div className="w-48 h-1 bg-lorenzo-light/10 mx-auto overflow-hidden">
                            <motion.div
                                className="h-full bg-lorenzo-accent"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>

                        {/* Loading Text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-4 text-xs text-lorenzo-light/40 uppercase tracking-widest"
                        >
                            Loading Experience...
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
