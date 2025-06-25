"use client"

import type React from "react"
import { motion } from "framer-motion"

interface Card3DProps {
  children: React.ReactNode
  className?: string
}

export function Card3D({ children, className = "" }: Card3DProps) {
  return (
    <motion.div className={className} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      {children}
    </motion.div>
  )
}
