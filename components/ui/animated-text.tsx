"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
}

export function AnimatedText({ text, className = "", delay = 0, duration = 0.05 }: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, duration * 1000)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, duration])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex(0)
      setDisplayedText("")
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [delay])

  return (
    <motion.span className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {displayedText}
      <motion.span
        className="animate-pulse"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
      >
        |
      </motion.span>
    </motion.span>
  )
}
