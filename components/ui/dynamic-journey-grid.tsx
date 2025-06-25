"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code, Users, Rocket, Target, Briefcase } from "lucide-react"

interface JourneyItem {
  id: number
  title: string
  description: string
  year: string
  icon: React.ComponentType<any>
  color: string
  achievements: string[]
  skills: string[]
}

const journeyItems: JourneyItem[] = [
  {
    id: 1,
    title: "Academic Foundation",
    description: "Started my journey in Data Science Engineering at MIT Manipal",
    year: "2023",
    icon: BookOpen,
    color: "from-blue-500 to-indigo-500",
    achievements: ["Enrolled in B.Tech Data Science", "Built strong foundation in programming"],
    skills: ["Python", "Mathematics", "Statistics"],
  },
  {
    id: 2,
    title: "First Projects",
    description: "Built my first web applications and discovered my passion for coding",
    year: "2023",
    icon: Code,
    color: "from-green-500 to-emerald-500",
    achievements: ["Created first web app", "Learned React and Node.js"],
    skills: ["JavaScript", "React", "HTML/CSS"],
  },
  {
    id: 3,
    title: "Leadership Roles",
    description: "Became Class Representative and joined E-Cell as Executive",
    year: "2024",
    icon: Users,
    color: "from-purple-500 to-pink-500",
    achievements: ["Elected Class Representative", "Joined E-Cell Executive team"],
    skills: ["Leadership", "Communication", "Event Management"],
  },
  {
    id: 4,
    title: "Startup Experience",
    description: "Joined YaanBarpe as Technical Head, leading development teams",
    year: "2024",
    icon: Rocket,
    color: "from-orange-500 to-red-500",
    achievements: ["Led technical team of 5", "Built MVP from scratch"],
    skills: ["Team Management", "Architecture", "DevOps"],
  },
  {
    id: 5,
    title: "Industry Exposure",
    description: "Software Engineering Intern at Intellect Design Arena",
    year: "2024",
    icon: Briefcase,
    color: "from-cyan-500 to-blue-500",
    achievements: ["Worked on fintech solutions", "Optimized database performance"],
    skills: ["Java", "Spring Boot", "Microservices"],
  },
  {
    id: 6,
    title: "Future Goals",
    description: "Aiming to make significant impact in tech and data science",
    year: "2025+",
    icon: Target,
    color: "from-pink-500 to-purple-500",
    achievements: ["Continuous learning", "Building innovative solutions"],
    skills: ["AI/ML", "Data Science", "Innovation"],
  },
]

export function DynamicJourneyGrid() {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const [hoverSize] = useState(6)

  const getRowSizes = () => {
    if (hovered === null) {
      return "1fr 1fr"
    }
    const { row } = hovered
    const nonHoveredSize = (12 - hoverSize) / 1
    return row === 0 ? `${hoverSize}fr ${nonHoveredSize}fr` : `${nonHoveredSize}fr ${hoverSize}fr`
  }

  const getColSizes = () => {
    if (hovered === null) {
      return "1fr 1fr 1fr"
    }
    const { col } = hovered
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div
        className="grid gap-4 h-[600px]"
        style={{
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
        }}
      >
        {journeyItems.map((item, index) => {
          const row = Math.floor(index / 3)
          const col = index % 3

          return (
            <motion.div
              key={item.id}
              className="relative"
              onMouseEnter={() => setHovered({ row, col })}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className={`w-full h-full bg-gradient-to-br ${item.color} relative overflow-hidden group cursor-pointer border-0 shadow-xl`}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/20" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/10" />
                </div>

                <CardContent className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                  {/* Header */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs">
                        {item.year}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight mb-2">{item.title}</h3>
                      <p className="text-white/80 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Achievements - Show on hover */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hovered?.row === row && hovered?.col === col ? 1 : 0,
                      height: hovered?.row === row && hovered?.col === col ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 pt-3 border-t border-white/20">
                      <h4 className="text-xs font-semibold text-white">Achievements:</h4>
                      <ul className="space-y-1">
                        {item.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-xs text-white/80 flex items-start gap-2">
                            <span className="text-white mt-0.5">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {item.skills.slice(0, 2).map((skill) => (
                      <Badge key={skill} className="bg-white/20 text-white text-xs border-white/30 backdrop-blur-sm">
                        {skill}
                      </Badge>
                    ))}
                    {item.skills.length > 2 && (
                      <Badge className="bg-white/20 text-white/80 text-xs border-white/30 backdrop-blur-sm">
                        +{item.skills.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
