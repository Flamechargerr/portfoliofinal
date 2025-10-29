"use client"

import { Sun, Moon } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function CinematicThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    // Generate particles
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        x: centerX,
        y: centerY,
      }))
      setParticles(newParticles)

      setTimeout(() => setParticles([]), 1000)
    }
  }

  if (!mounted) {
    return null
  }

  const isDark = theme === "dark"

  return (
    <div className="relative">
      <motion.button
        ref={buttonRef}
        onClick={toggleTheme}
        className="relative overflow-hidden rounded-full p-1 transition-all duration-300 ease-in-out"
        style={{
          background: isDark
            ? "linear-gradient(145deg, #2a2d3a, #1f2128)"
            : "linear-gradient(145deg, #ffffff, #e6e6e6)",
          boxShadow: isDark
            ? "8px 8px 16px #16171a, -8px -8px 16px #34384a"
            : "8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="relative flex h-14 w-28 items-center justify-center rounded-full"
          style={{
            background: isDark
              ? "linear-gradient(145deg, #1f2128, #2a2d3a)"
              : "linear-gradient(145deg, #e6e6e6, #ffffff)",
          }}
        >
          {/* Sliding background */}
          <motion.div
            className="absolute h-12 w-12 rounded-full"
            style={{
              background: isDark
                ? "linear-gradient(145deg, #4a5568, #2d3748)"
                : "linear-gradient(145deg, #fbbf24, #f59e0b)",
              boxShadow: isDark
                ? "4px 4px 8px #0f1012, -4px -4px 8px #3f4350"
                : "4px 4px 8px #d4a00a, -4px -4px 8px #ffde3a",
            }}
            animate={{
              x: isDark ? -20 : 20,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          {/* Icons */}
          <div className="relative z-10 flex w-full items-center justify-between px-3">
            {isDark ? <Moon size={20} className="text-blue-200" /> : <Sun size={20} className="text-amber-500" />}
          </div>
        </motion.div>
      </motion.button>
    </div>
  )
}
