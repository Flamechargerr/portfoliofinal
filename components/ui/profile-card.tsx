"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { ProfileModal } from "@/components/ui/profile-modal"

export const CARD_CONFIG = {
  width: 420,
  height: 600,
  glowColor: "cyan",
  buttonText: "View Full Profile",
}

interface ProfileData {
  username: string
  bio: string
  status: string[]
  tier: number
  imageUrl: string
}

interface ProfileCardProps {
  data: ProfileData
}

export default function ProfileCard({ data }: ProfileCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [statusIndex, setStatusIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % data.status.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [data.status.length])

  const handleViewProfile = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <motion.div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: CARD_CONFIG.width,
          height: CARD_CONFIG.height,
          perspective: "1500px",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`
          absolute 
          -inset-4
          rounded-3xl 
          bg-gradient-to-br 
          from-cyan-500 
          via-blue-500 
          to-purple-600 
          opacity-0 
          group-hover:opacity-70
          blur-2xl 
          transition-opacity 
          duration-500
        `}
        />

        <div
          className={`
          relative 
          w-full 
          h-full 
          rounded-3xl 
          bg-gradient-to-br 
          from-gray-900 
          via-gray-800
          to-gray-900 
          border-2 
          border-gray-700 
          overflow-hidden 
          transition-all 
          duration-500
          ${isHovered ? "scale-105 border-cyan-500/50 shadow-2xl shadow-cyan-500/30" : ""}
        `}
          style={{
            transformStyle: "preserve-3d",
            transform: isHovered ? "rotateY(5deg) rotateX(-5deg)" : "rotateY(0deg) rotateX(0deg)",
          }}
        >
          <div
            className={`
            absolute 
            inset-0 
            bg-gradient-to-br 
            from-cyan-500/20
            via-blue-500/10
            to-purple-500/20
            opacity-0 
            group-hover:opacity-100 
            transition-opacity 
            duration-500
          `}
          />

          <div className="relative z-10 flex flex-col items-center justify-between h-full p-8">
            <div className="relative">
              <div
                className={`
                absolute 
                -inset-3
                rounded-full 
                bg-gradient-to-r 
                from-cyan-500 
                via-blue-500 
                to-purple-500 
                opacity-0 
                group-hover:opacity-100 
                blur-xl
                transition-opacity 
                duration-500
                animate-pulse
              `}
              />
              <motion.img
                src={data.imageUrl || "/placeholder.svg"}
                alt={data.username}
                className="relative w-48 h-48 rounded-full object-cover border-4 border-gray-700 group-hover:border-cyan-500 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              />
            </div>

            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-white">{data.username}</h2>
              <p className="text-gray-300 text-base leading-relaxed px-4">{data.bio}</p>
            </div>

            <div className="h-8 flex items-center justify-center">
              <motion.div
                key={statusIndex}
                className="text-cyan-400 text-sm font-mono font-bold tracking-wider"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {data.status[statusIndex]}
              </motion.div>
            </div>

            <motion.button
              onClick={handleViewProfile}
              className="
              w-full 
              py-4
              rounded-xl 
              bg-gradient-to-r 
              from-cyan-500 
              to-blue-500 
              text-white 
              font-bold
              text-lg
              shadow-lg 
              shadow-cyan-500/50 
              hover:shadow-cyan-500/70 
              hover:from-cyan-400 
              hover:to-blue-400 
              transition-all 
              duration-300 
              flex items-center justify-center gap-2
              border border-cyan-300/30
            "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {CARD_CONFIG.buttonText}
              <ExternalLink className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
