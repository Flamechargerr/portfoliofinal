"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
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

interface InteractiveTimelineProps {
  items: TimelineItem[]
}

export function InteractiveTimeline({ items }: InteractiveTimelineProps) {
  const [activeItem, setActiveItem] = useState<number | null>(null)

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Vertical Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

      {/* Timeline Items */}
      <div className="space-y-12">
        {items.map((item, index) => (
          <TimelineCard
            key={item.id}
            item={item}
            index={index}
            isActive={activeItem === item.id}
            onHover={() => setActiveItem(item.id)}
            onLeave={() => setActiveItem(null)}
          />
        ))}
      </div>
    </div>
  )
}

interface TimelineCardProps {
  item: TimelineItem
  index: number
  isActive: boolean
  onHover: () => void
  onLeave: () => void
}

function TimelineCard({ item, index, isActive, onHover, onLeave }: TimelineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={cardRef}
      className="relative flex items-start pl-20"
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Timeline Dot */}
      <div className="absolute left-6 w-6 h-6 -translate-x-1/2 z-10">
        <motion.div
          className={`w-full h-full rounded-full border-4 border-gray-900 bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}
          animate={{ scale: isActive ? 1.2 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <item.icon className="w-3 h-3 text-white" />
        </motion.div>
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl">
        <Card
          className={`bg-gray-900/50 backdrop-blur-xl border border-gray-700 transition-all duration-300 overflow-hidden group cursor-pointer ${
            isActive ? "border-blue-500/50 shadow-lg shadow-blue-500/10" : "hover:border-gray-600"
          }`}
        >
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <item.icon className="w-6 h-6 text-white" />
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
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-2">{item.year}</Badge>
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
                    {item.achievements.map((achievement, idx) => (
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
                {item.skills.map((skill) => (
                  <Badge key={skill} className="bg-gray-800 text-blue-300 text-xs border border-gray-600">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
