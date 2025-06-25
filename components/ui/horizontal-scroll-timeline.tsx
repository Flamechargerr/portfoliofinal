"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TimelineItem {
  id: number
  title: string
  org: string
  year: string
  icon: React.ComponentType<any>
  color: string
  description: string
  achievements: string[]
  skills: string[]
  duration: string
}

interface HorizontalScrollTimelineProps {
  items: TimelineItem[]
}

export function HorizontalScrollTimeline({ items }: HorizontalScrollTimelineProps) {
  const [activeItem, setActiveItem] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Calculate total width needed for all cards
  const cardWidth = 400 // Fixed card width
  const gap = 32 // Gap between cards
  const totalWidth = items.length * (cardWidth + gap)

  // Transform scroll progress to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], [0, -(totalWidth - cardWidth)])
  const isInView = useInView(containerRef, { margin: "-100px" })

  return (
    <div ref={containerRef} className="relative">
      {/* Progress indicator */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-3 bg-gray-900/80 backdrop-blur-xl rounded-full px-6 py-3 border border-gray-700">
          <span className="text-white text-sm font-medium">Experience Journey</span>
          <div className="w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal scrolling container */}
      <div className="overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 pb-8" initial={false}>
          {items.map((item, index) => (
            <TimelineCard
              key={item.id}
              item={item}
              index={index}
              isActive={activeItem === item.id}
              onHover={() => setActiveItem(item.id)}
              onLeave={() => setActiveItem(null)}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>

      {/* Timeline line */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform -translate-y-1/2 pointer-events-none" />
    </div>
  )
}

interface TimelineCardProps {
  item: TimelineItem
  index: number
  isActive: boolean
  onHover: () => void
  onLeave: () => void
  isInView: boolean
}

function TimelineCard({ item, index, isActive, onHover, onLeave, isInView }: TimelineCardProps) {
  return (
    <motion.div
      className="relative flex-shrink-0 w-96"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Timeline dot */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 z-20">
        <motion.div
          className={`w-full h-full rounded-full border-4 border-gray-900 bg-gradient-to-r ${item.color} shadow-lg`}
          animate={{ scale: isActive ? 1.3 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-full h-full rounded-full flex items-center justify-center">
            <item.icon className="w-2 h-2 text-white" />
          </div>
        </motion.div>
      </div>

      {/* Card */}
      <div className="mt-8">
        <Card
          className={`bg-gray-900/80 backdrop-blur-xl border transition-all duration-300 overflow-hidden group cursor-pointer ${
            isActive
              ? "border-blue-500/50 shadow-xl shadow-blue-500/20 bg-gray-900/90"
              : "border-gray-700 hover:border-gray-600"
          }`}
        >
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center shadow-lg`}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-blue-400 text-sm font-medium">{item.org}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-1">{item.year}</Badge>
                  <p className="text-xs text-gray-400">{item.duration}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>

              {/* Achievements - Show on hover */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3 pt-2 border-t border-gray-700"
                >
                  <h4 className="text-sm font-semibold text-white">Key Achievements:</h4>
                  <ul className="space-y-1">
                    {item.achievements.slice(0, 3).map((achievement, idx) => (
                      <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                        <span className="text-blue-400 mt-1">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {item.skills.slice(0, 4).map((skill) => (
                  <Badge key={skill} className="bg-gray-800 text-blue-300 text-xs border border-gray-600">
                    {skill}
                  </Badge>
                ))}
                {item.skills.length > 4 && (
                  <Badge className="bg-gray-800 text-gray-400 text-xs border border-gray-600">
                    +{item.skills.length - 4}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
