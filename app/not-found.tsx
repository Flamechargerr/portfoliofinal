"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function NotFound() {
    return (
        <main className="min-h-screen bg-lorenzo-dark flex items-center justify-center px-6">
            <div className="text-center">
                {/* 404 Number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    <h1 className="text-[200px] md:text-[300px] font-brier text-lorenzo-accent/10 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl md:text-8xl font-brier text-lorenzo-accent">
                            404
                        </span>
                    </div>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-2xl md:text-3xl font-brier text-lorenzo-light uppercase mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-lorenzo-light/60 max-w-md mx-auto mb-8">
                        Oops! The page you're looking for doesn't exist or has been moved.
                        Let's get you back on track.
                    </p>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/"
                        className="px-8 py-4 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider hover:bg-lorenzo-accent/90 transition-colors"
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/blog"
                        className="px-8 py-4 border-2 border-lorenzo-accent text-lorenzo-accent font-bold uppercase tracking-wider hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all"
                    >
                        Read Blog
                    </Link>
                </motion.div>

                {/* Decorative corners */}
                <motion.div
                    className="fixed top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-lorenzo-accent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                />
                <motion.div
                    className="fixed bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-lorenzo-accent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                />
            </div>
        </main>
    )
}
