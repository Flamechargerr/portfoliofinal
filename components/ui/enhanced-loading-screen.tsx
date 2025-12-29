"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { SpiralAnimation } from "./spiral-animation"

interface LoadingScreenProps {
  onComplete: () => void
}

export function EnhancedLoadingScreen({ onComplete }: LoadingScreenProps) {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    // Show enter button after 2 seconds
    const timer = setTimeout(() => {
      setShowButton(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleEnter = () => {
    onComplete()
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-black overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Spiral Animation Background */}
        <div className="absolute inset-0">
          <SpiralAnimation />
        </div>

        {/* Enter Button */}
        <div
          className={`
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
            transition-all duration-1500 ease-out
            ${showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <button
            onClick={handleEnter}
            className="
              text-white text-2xl md:text-3xl tracking-[0.2em] uppercase font-extralight
              transition-all duration-700
              hover:tracking-[0.3em] animate-pulse
              hover:scale-110
            "
          >
            Enter
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default EnhancedLoadingScreen
