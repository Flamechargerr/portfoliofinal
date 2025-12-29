"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { SkipToContent } from "@/hooks/use-a11y"

interface PreloaderProps {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    // Complete loading after minimum time
    const timer = setTimeout(() => {
      setIsLoading(false)
      onComplete?.()
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [onComplete])

  return (
    <>
      <SkipToContent />
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-lorenzo-dark flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5, ease: "easeInOut" }
            }}
          >
            {/* Logo/Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-brier text-lorenzo-light uppercase tracking-tight">
                ANAMAY<span className="text-lorenzo-accent">.</span>
              </h1>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "200px" }}
              transition={{ delay: 0.4 }}
              className="relative h-1 bg-lorenzo-light/10 overflow-hidden"
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-lorenzo-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(100, progress)}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4 text-xs text-lorenzo-light/50 uppercase tracking-widest"
            >
              Loading Experience...
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-lorenzo-accent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
            <motion.div
              className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-lorenzo-accent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
