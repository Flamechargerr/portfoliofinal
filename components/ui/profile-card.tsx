"use client"

import { useState, useEffect } from "react"

/** I. CONFIGURATION */
export const CARD_CONFIG = {
  width: 360,
  height: 540,
  glowColor: "cyan",
  buttonText: "View Profile",
}

/** II. TYPES */
interface ProfileData {
  username: string
  bio: string
  status: string[]
  tier: string
  imageUrl: string
}

interface ProfileCardProps {
  data: ProfileData
}

/** III. MAIN COMPONENT */
export default function ProfileCard({ data }: ProfileCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [statusIndex, setStatusIndex] = useState(0)

  // Cycle through status messages
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % data.status.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [data.status.length])

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: CARD_CONFIG.width,
        height: CARD_CONFIG.height,
        perspective: "1000px",
      }}
    >
      {/* Glow effect */}
      <div
        className={`
          absolute 
          inset-0 
          rounded-3xl 
          bg-gradient-to-br 
          from-cyan-500 
          via-blue-500 
          to-purple-600 
          opacity-0 
          group-hover:opacity-100 
          blur-xl 
          transition-opacity 
          duration-500
        `}
      />

      {/* Card container */}
      <div
        className={`
          relative 
          w-full 
          h-full 
          rounded-3xl 
          bg-gradient-to-br 
          from-gray-900 
          to-gray-800 
          border-2 
          border-gray-700 
          overflow-hidden 
          transition-all 
          duration-500
          ${isHovered ? "scale-105 border-cyan-500/50" : ""}
        `}
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered ? "rotateY(5deg) rotateX(-5deg)" : "rotateY(0deg) rotateX(0deg)",
        }}
      >
        {/* Animated background gradient */}
        <div
          className={`
            absolute 
            inset-0 
            bg-gradient-to-br 
            from-cyan-500/10 
            via-transparent 
            to-purple-500/10 
            opacity-0 
            group-hover:opacity-100 
            transition-opacity 
            duration-500
          `}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-between h-full p-8">
          {/* Tier badge */}
          <div
            className={`
              px-4 
              py-1 
              rounded-full 
              bg-gradient-to-r 
              from-cyan-500 
              to-blue-500 
              text-white 
              text-xs 
              font-bold 
              tracking-wider 
              shadow-lg 
              shadow-cyan-500/50
            `}
          >
            {data.tier}
          </div>

          {/* Profile image */}
          <div className="relative">
            <div
              className={`
                absolute 
                -inset-2 
                rounded-full 
                bg-gradient-to-r 
                from-cyan-500 
                via-blue-500 
                to-purple-500 
                opacity-0 
                group-hover:opacity-100 
                blur-md 
                transition-opacity 
                duration-500
              `}
            />
            <img
              src={data.imageUrl || "/placeholder.svg"}
              alt={data.username}
              className="relative w-32 h-32 rounded-full object-cover border-4 border-gray-700 group-hover:border-cyan-500 transition-colors duration-300"
            />
          </div>

          {/* User info */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">{data.username}</h2>
            <p className="text-gray-400 text-sm">{data.bio}</p>
          </div>

          {/* Animated status */}
          <div className="h-6 flex items-center justify-center">
            <div key={statusIndex} className="text-cyan-400 text-xs font-mono animate-pulse">
              {data.status[statusIndex]}
            </div>
          </div>

          {/* CTA Button */}
          <button
            className="
              w-full 
              py-3 
              rounded-xl 
              bg-gradient-to-r 
              from-cyan-500 
              to-blue-500 
              text-white 
              font-semibold 
              shadow-lg 
              shadow-cyan-500/50 
              hover:shadow-cyan-500/70 
              hover:from-cyan-400 
              hover:to-blue-400 
              hover:bg-cyan-400 
              transition-all 
              duration-300 
              hover:scale-105
            "
          >
            {CARD_CONFIG.buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}
