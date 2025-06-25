"use client"

import type React from "react"
import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRef } from "react"

interface ExperienceItem {
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
  size?: "small" | "medium" | "large"
}

interface HorizontalScrollExperienceProps {
  items: ExperienceItem[]
}

export function HorizontalScrollExperience({ items }: HorizontalScrollExperienceProps) {
  const [activeItem, setActiveItem] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "-10%" })

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Full width container with minimal padding */}
      <div className="w-full overflow-x-auto">
        <div className="flex gap-6 pb-8 px-2 min-w-max">
          {items.map((item, index) => (
            <ExperienceCard
              key={item.id}
              item={item}
              index={index}
              isActive={activeItem === item.id}
              onHover={() => setActiveItem(item.id)}
              onLeave={() => setActiveItem(null)}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface ExperienceCardProps {
  item: ExperienceItem
  index: number
  isActive: boolean
  onHover: () => void
  onLeave: () => void
  isInView: boolean
}

function ExperienceCard({ item, index, isActive, onHover, onLeave, isInView }: ExperienceCardProps) {
  // Larger card dimensions to better utilize space
  const cardWidth = "w-96"
  const cardHeight = "h-[420px]"

  return (
    <motion.div
      className={`flex-shrink-0 ${cardWidth} ${cardHeight}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Card
        className={`w-full h-full bg-gradient-to-br ${item.color} relative overflow-hidden group cursor-pointer transition-all duration-300 border-0 shadow-2xl ${
          isActive ? "scale-105 shadow-3xl" : "hover:scale-[1.02]"
        }`}
      >
        {/* Enhanced background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-6 right-6 w-28 h-28 rounded-full bg-white/20" />
          <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full bg-white/10" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/5" />
        </div>

        <CardContent className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
          {/* Header */}
          <div className="space-y-5">
            <div className="flex items-start justify-between">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-2 text-sm px-3 py-1">
                  {item.year}
                </Badge>
                <p className="text-white/80 text-sm font-medium">{item.duration}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white leading-tight">{item.title}</h3>
              <p className="text-white/90 font-medium text-lg">{item.org}</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-5">
            <p className="text-white/80 text-base leading-relaxed">{item.description}</p>

            {/* Achievements - Show on hover */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isActive ? 1 : 0,
                height: isActive ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pt-3 border-t border-white/20">
                <h4 className="text-sm font-semibold text-white">Key Achievements:</h4>
                <ul className="space-y-2">
                  {item.achievements.slice(0, 3).map((achievement, idx) => (
                    <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                      <span className="text-white mt-1">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {item.skills.slice(0, 5).map((skill) => (
                <Badge
                  key={skill}
                  className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm px-3 py-1"
                >
                  {skill}
                </Badge>
              ))}
              {item.skills.length > 5 && (
                <Badge className="bg-white/20 text-white/80 border-white/30 backdrop-blur-sm text-sm px-3 py-1">
                  +{item.skills.length - 5}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
