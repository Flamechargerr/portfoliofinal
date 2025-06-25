"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface CircularProgressProps {
  percentage: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
  value?: string
}

export function CircularProgress({
  percentage,
  size = 60,
  strokeWidth = 6,
  color = "#3b82f6",
  label,
  value,
}: CircularProgressProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-700"
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>

      {/* Center content with better spacing */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {value && <span className="text-sm font-bold text-white leading-none">{value}</span>}
        {label && <span className="text-xs text-gray-400 text-center leading-none mt-1">{label}</span>}
      </div>
    </div>
  )
}
