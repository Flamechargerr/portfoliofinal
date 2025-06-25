"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  emoji: string
  duration: number
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    // Minimal floating elements for maximum performance
    const emojis = ["💻"]
    const newElements: FloatingElement[] = []

    // Only 1 element for optimal performance
    newElements.push({
      id: 0,
      x: Math.random() * 100,
      y: Math.random() * 100,
      emoji: emojis[0],
      duration: 40, // Very slow animation
    })

    setElements(newElements)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute opacity-2 text-xl"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.02, 0.04, 0.02],
          }}
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {element.emoji}
        </motion.div>
      ))}
    </div>
  )
}
