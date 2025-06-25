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

interface StaticExperienceGridProps {
  items: ExperienceItem[]
}

export function StaticExperienceGrid({ items }: StaticExperienceGridProps) {
  const [activeItem, setActiveItem] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "-10%" })

  return (
    <div ref={containerRef} className="w-full">
      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
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
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Card
        className={`w-full bg-gradient-to-br ${item.color} relative overflow-hidden group cursor-pointer transition-all duration-200 border-0 shadow-xl ${
          isActive ? "scale-105 shadow-2xl z-10" : "hover:scale-[1.02]"
        }`}
        style={{
          minHeight: isActive ? "550px" : "450px",
          transition: "all 0.2s ease-in-out",
        }}
      >
        {/* Simplified background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-6 right-6 w-24 h-24 rounded-full bg-white/20" />
          <div className="absolute bottom-6 left-6 w-16 h-16 rounded-full bg-white/10" />
        </div>

        <CardContent className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-2 text-sm px-3 py-1">
                  {item.year}
                </Badge>
                <p className="text-white/80 text-sm font-medium">{item.duration}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white leading-tight">{item.title}</h3>
              <p className="text-white/90 font-medium text-base">{item.org}</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 flex-1">
            <p className="text-white/80 text-sm leading-relaxed">{item.description}</p>

            {/* Achievements - Show on hover */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isActive ? 1 : 0,
                height: isActive ? "auto" : 0,
              }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pt-2 border-t border-white/20">
                <h4 className="text-xs font-semibold text-white">Key Achievements:</h4>
                <ul className="space-y-1">
                  {item.achievements.slice(0, 3).map((achievement, idx) => (
                    <li key={idx} className="text-xs text-white/80 flex items-start gap-2">
                      <span className="text-white mt-0.5 flex-shrink-0">•</span>
                      <span className="leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Skills - Always visible */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {item.skills.slice(0, 4).map((skill) => (
                <Badge
                  key={skill}
                  className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs px-2 py-1"
                >
                  {skill}
                </Badge>
              ))}
              {item.skills.length > 4 && (
                <Badge className="bg-white/20 text-white/80 border-white/30 backdrop-blur-sm text-xs px-2 py-1">
                  +{item.skills.length - 4}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
