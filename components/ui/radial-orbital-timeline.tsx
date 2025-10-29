"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
          const newAngle = (prev + 0.3) % 360
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
    // Calculate base angle for this event (evenly distributed around 360 degrees)
    const baseAngle = (index / total) * 360
    // Add rotation angle for animation
    const angle = (baseAngle + rotationAngle) % 360
    // Increased radius for better visibility
    const radius = 280
    const radian = ((angle - 90) * Math.PI) / 180 // -90 to start from top

    const x = radius * Math.cos(radian)
    const y = radius * Math.sin(radian)

    // Calculate depth effect
    const zIndex = Math.round(100 + 50 * Math.sin(radian))
    const opacity = Math.max(0.6, Math.min(1, 0.6 + 0.4 * ((1 + Math.sin(radian + Math.PI / 2)) / 2)))
    const scale = Math.max(0.8, Math.min(1.15, 0.8 + 0.35 * ((1 + Math.sin(radian + Math.PI / 2)) / 2)))

    return { x, y, angle, zIndex, opacity, scale }
  }

  const handleEventClick = (eventId: number) => {
    setSelectedEvent(selectedEvent === eventId ? null : eventId)
    setAutoRotate(selectedEvent === eventId)
  }

  return (
    <div
      className="w-full min-h-[800px] md:min-h-[900px] flex items-center justify-center bg-transparent relative overflow-visible py-12"
      ref={containerRef}
    >
      <div
        className="relative w-full max-w-5xl h-[800px] md:h-[900px] flex items-center justify-center"
        style={{ perspective: "1500px" }}
      >
        {/* Central hub */}
        <motion.div
          className="absolute w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center z-50 shadow-2xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="absolute w-32 h-32 md:w-36 md:h-36 rounded-full border-2 border-blue-400/30 animate-ping" />
          <div className="absolute w-36 h-36 md:w-40 md:h-40 rounded-full border border-purple-400/20 animate-pulse" />
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-inner">
            <span className="text-4xl md:text-5xl">🎯</span>
          </div>
        </motion.div>

        {/* Orbital rings - increased size */}
        <div className="absolute w-[560px] h-[560px] md:w-[640px] md:h-[640px] rounded-full border border-white/10" />
        <div className="absolute w-[580px] h-[580px] md:w-[660px] md:h-[660px] rounded-full border border-white/5" />
        <div className="absolute w-[600px] h-[600px] md:w-[680px] md:h-[680px] rounded-full border border-white/5" />

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
                scale: isSelected ? 1.3 : position.scale,
              }}
              transition={{ duration: 0.3 }}
              onClick={() => handleEventClick(event.id)}
            >
              {/* Glow effect */}
              <div
                className={`absolute -inset-8 rounded-full ${isSelected ? "animate-pulse" : ""}`}
                style={{
                  background: `radial-gradient(circle, rgba(59, 130, 246, ${isSelected ? 0.6 : 0.4}) 0%, transparent 70%)`,
                }}
              />

              {/* Event node - increased size */}
              <motion.div
                className={`w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center text-4xl md:text-5xl
                  ${
                    isSelected
                      ? "bg-gradient-to-br from-blue-400 to-purple-500 shadow-2xl shadow-blue-500/50 border-4 border-blue-300"
                      : "bg-gradient-to-br from-gray-800 to-gray-900 border-3 border-gray-600 hover:border-blue-400"
                  }
                  transition-all duration-300`}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                {event.icon}
              </motion.div>

              {/* Year label */}
              <div
                className={`absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-base md:text-lg font-bold tracking-wider
                  ${isSelected ? "text-blue-400 scale-125" : "text-gray-400"}
                  transition-all duration-300`}
              >
                {event.year}
              </div>

              {/* Event details card */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    className="absolute top-32 left-1/2 -translate-x-1/2 w-80 md:w-96 bg-gray-900/98 backdrop-blur-xl border-2 border-blue-500/50 rounded-2xl p-6 shadow-2xl z-50"
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-blue-400" />
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-5xl">{event.icon}</span>
                        <div>
                          <h3 className="text-white font-bold text-xl md:text-2xl">{event.title}</h3>
                          <span className="text-blue-400 text-sm md:text-base font-mono font-bold">{event.year}</span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-base md:text-lg leading-relaxed">{event.description}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}

        {/* Instructions */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center">
          <p className="text-gray-400 text-base md:text-lg font-medium">Click on any milestone to learn more</p>
        </div>
      </div>
    </div>
  )
}
