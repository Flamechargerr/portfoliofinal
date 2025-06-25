"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface ConfettiButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function ConfettiButton({ children, onClick, className = "" }: ConfettiButtonProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  const handleClick = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 1000)
    onClick?.()
  }

  const confettiPieces = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    color: ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"][i % 5],
    delay: Math.random() * 0.5,
  }))

  return (
    <div className="relative inline-block">
      <Button onClick={handleClick} className={className}>
        {children}
      </Button>

      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {confettiPieces.map((piece) => (
              <motion.div
                key={piece.id}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: piece.color,
                  left: "50%",
                  top: "50%",
                }}
                initial={{
                  scale: 0,
                  x: 0,
                  y: 0,
                  rotate: 0,
                }}
                animate={{
                  scale: [0, 1, 0],
                  x: (Math.random() - 0.5) * 200,
                  y: (Math.random() - 0.5) * 200,
                  rotate: Math.random() * 360,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1,
                  delay: piece.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
