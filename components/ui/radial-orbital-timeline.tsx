"use client"
import { useState, useRef } from "react"
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
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const calculateNodePosition = (index: number, total: number) => {
    const angle = (index / total) * 360
    const radius = 280
    const radian = ((angle - 90) * Math.PI) / 180

    const x = radius * Math.cos(radian)
    const y = radius * Math.sin(radian)

    return { x, y, angle }
  }

  const handleEventClick = (eventId: number) => {
    setSelectedEvent(selectedEvent === eventId ? null : eventId)
  }

  const colors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-blue-500",
    "from-pink-500 to-purple-500",
  ]

  return (
    <div
      className="w-full min-h-[700px] md:min-h-[800px] flex items-center justify-center bg-transparent relative overflow-visible py-12"
      ref={containerRef}
    >
      <div
        className="relative w-full max-w-4xl h-[700px] md:h-[800px] flex items-center justify-center"
        style={{ perspective: "1500px" }}
      >
        {/* Central hub */}
        <motion.div
          className="absolute w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center z-50 shadow-2xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="absolute w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-blue-400/30 animate-ping" />
          <div className="absolute w-32 h-32 md:w-36 md:h-36 rounded-full border border-purple-400/20 animate-pulse" />
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-inner">
            <span className="text-3xl md:text-4xl">🎯</span>
          </div>
        </motion.div>

        {/* Timeline events */}
        {events.map((event, index) => {
          const position = calculateNodePosition(index, events.length)
          const isSelected = selectedEvent === event.id
          const eventColor = colors[index % colors.length]

          return (
            <motion.div
              key={event.id}
              className="absolute cursor-pointer"
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isSelected ? 200 : 100,
              }}
              animate={{
                scale: isSelected ? 1.2 : 1,
              }}
              transition={{ duration: 0.3 }}
              onClick={() => handleEventClick(event.id)}
            >
              {/* Glow effect */}
              <div
                className={`absolute -inset-6 rounded-full ${isSelected ? "animate-pulse" : ""}`}
                style={{
                  background: `radial-gradient(circle, rgba(59, 130, 246, ${isSelected ? 0.5 : 0.3}) 0%, transparent 70%)`,
                }}
              />

              {/* Event node */}
              <motion.div
                className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-3xl md:text-4xl
                  ${
                    isSelected
                      ? `bg-gradient-to-br ${eventColor} shadow-2xl shadow-blue-500/50 border-4 border-blue-300`
                      : "bg-gradient-to-br from-gray-800 to-gray-900 border-3 border-gray-600 hover:border-blue-400"
                  }
                  transition-all duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {event.icon}
              </motion.div>

              {/* Year label */}
              <div
                className={`absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm md:text-base font-bold tracking-wider
                  ${isSelected ? "text-blue-400 scale-110" : "text-gray-400"}
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
                    className="absolute top-28 left-1/2 -translate-x-1/2 w-72 md:w-80 bg-gray-900/98 backdrop-blur-xl border-2 border-blue-500/50 rounded-2xl p-5 shadow-2xl z-50"
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-blue-400" />
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{event.icon}</span>
                        <div>
                          <h3 className="text-white font-bold text-lg md:text-xl">{event.title}</h3>
                          <span className="text-blue-400 text-xs md:text-sm font-mono font-bold">{event.year}</span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed">{event.description}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}

        {/* Instructions */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center">
          <p className="text-gray-400 text-sm md:text-base font-medium">Click on any milestone to learn more</p>
        </div>
      </div>
    </div>
  )
}
