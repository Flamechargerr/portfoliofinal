"use client"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface TimelineEvent {
  id: number
  year: string
  title: string
  description: string
  icon: string
}

interface RadialOrbitalTimelineProps {
  events: TimelineEvent[]
}

export function RadialOrbitalTimeline({ events }: RadialOrbitalTimelineProps) {
  const [rotationAngle, setRotationAngle] = useState<number>(0)
  const [autoRotate, setAutoRotate] = useState<boolean>(true)
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.2) % 360
          return Number(newAngle.toFixed(3))
        })
      }, 50)
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer)
      }
    }
  }, [autoRotate])

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360
    const radius = 220
    const radian = (angle * Math.PI) / 180

    const x = radius * Math.cos(radian)
    const y = radius * Math.sin(radian)

    const zIndex = Math.round(100 + 50 * Math.cos(radian))
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)))
    const scale = Math.max(0.7, Math.min(1, 0.7 + 0.3 * ((1 + Math.sin(radian)) / 2)))

    return { x, y, angle, zIndex, opacity, scale }
  }

  const handleEventClick = (eventId: number) => {
    setSelectedEvent(selectedEvent === eventId ? null : eventId)
    setAutoRotate(selectedEvent === eventId)
  }

  return (
    <div
      className="w-full h-[600px] flex items-center justify-center bg-transparent relative overflow-visible"
      ref={containerRef}
    >
      <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1000px" }}>
        {/* Central hub */}
        <motion.div
          className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center z-50 shadow-2xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="absolute w-24 h-24 rounded-full border-2 border-blue-400/30 animate-ping" />
          <div className="absolute w-28 h-28 rounded-full border border-purple-400/20 animate-pulse" />
          <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center">
            <span className="text-2xl">🎯</span>
          </div>
        </motion.div>

        {/* Orbital ring */}
        <div className="absolute w-[440px] h-[440px] rounded-full border border-white/10" />
        <div className="absolute w-[460px] h-[460px] rounded-full border border-white/5" />

        {/* Timeline events */}
        {events.map((event, index) => {
          const position = calculateNodePosition(index, events.length)
          const isSelected = selectedEvent === event.id

          return (
            <motion.div
              key={event.id}
              className="absolute cursor-pointer"
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isSelected ? 200 : position.zIndex,
              }}
              animate={{
                opacity: isSelected ? 1 : position.opacity,
                scale: isSelected ? 1.2 : position.scale,
              }}
              transition={{ duration: 0.3 }}
              onClick={() => handleEventClick(event.id)}
            >
              {/* Glow effect */}
              <div
                className={`absolute -inset-4 rounded-full ${isSelected ? "animate-pulse" : ""}`}
                style={{
                  background: `radial-gradient(circle, rgba(59, 130, 246, ${isSelected ? 0.4 : 0.2}) 0%, transparent 70%)`,
                }}
              />

              {/* Event node */}
              <motion.div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl
                  ${
                    isSelected
                      ? "bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg shadow-blue-500/50"
                      : "bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700"
                  }
                  transition-all duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {event.icon}
              </motion.div>

              {/* Year label */}
              <div
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold tracking-wider
                  ${isSelected ? "text-blue-400 scale-110" : "text-gray-400"}
                  transition-all duration-300`}
              >
                {event.year}
              </div>

              {/* Event details card */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-gray-900/95 backdrop-blur-xl border border-blue-500/30 rounded-xl p-4 shadow-2xl z-50"
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-px h-2 bg-blue-400" />
                  <h3 className="text-white font-bold text-lg mb-2">{event.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{event.description}</p>
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <span className="text-blue-400 text-xs font-mono">{event.year}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}

        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
          <p className="text-gray-400 text-sm">Click on any milestone to learn more</p>
        </div>
      </div>
    </div>
  )
}
