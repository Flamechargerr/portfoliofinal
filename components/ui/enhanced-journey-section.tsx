"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code, Users, Rocket, Briefcase, Target, Award, Database, Trophy } from "lucide-react"

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
    color: "from-blue-500 to-indigo-600",
    achievements: ["Enrolled in B.Tech Data Science", "Built strong foundation in programming"],
    skills: ["Python", "Mathematics", "Statistics"],
  },
  {
    id: 2,
    title: "First Projects",
    description: "Built my first web applications and discovered my passion for coding",
    year: "2023",
    icon: Code,
    color: "from-green-500 to-emerald-600",
    achievements: ["Created first web app", "Learned React and Node.js"],
    skills: ["JavaScript", "React", "HTML/CSS"],
  },
  {
    id: 3,
    title: "Leadership Roles",
    description: "Became Class Representative and joined E-Cell as Executive",
    year: "2024",
    icon: Users,
    color: "from-purple-500 to-pink-600",
    achievements: ["Elected Class Representative", "Joined E-Cell Executive team"],
    skills: ["Leadership", "Communication", "Event Management"],
  },
  {
    id: 4,
    title: "Startup Experience",
    description: "Joined YaanBarpe as Technical Head, leading development teams",
    year: "2024",
    icon: Rocket,
    color: "from-orange-500 to-red-600",
    achievements: ["Led technical team of 5", "Built MVP from scratch"],
    skills: ["Team Management", "Architecture", "DevOps"],
  },
  {
    id: 5,
    title: "Industry Exposure",
    description: "Data Analyst & Web Dev Intern at Intellect Design Arena",
    year: "2024",
    icon: Briefcase,
    color: "from-cyan-500 to-blue-600",
    achievements: ["Worked on fintech solutions", "Built data visualization dashboards"],
    skills: ["Data Analysis", "Python", "React"],
  },
  {
    id: 6,
    title: "Future Goals",
    description: "Aiming to make significant impact in tech and data science",
    year: "2025+",
    icon: Target,
    color: "from-pink-500 to-purple-600",
    achievements: ["Continuous learning", "Building innovative solutions"],
    skills: ["AI/ML", "Data Science", "Innovation"],
  },
  {
    id: 7,
    title: "Certifications",
    description: "Meta Data Analyst and IBM GenAI Professional certifications",
    year: "2024",
    icon: Award,
    color: "from-yellow-500 to-orange-600",
    achievements: ["Meta Data Analyst Certified", "IBM GenAI Professional"],
    skills: ["Data Analysis", "AI/ML", "Tableau"],
  },
  {
    id: 8,
    title: "Technical Skills",
    description: "Mastered various programming languages and technologies",
    year: "Ongoing",
    icon: Database,
    color: "from-indigo-500 to-purple-600",
    achievements: ["15+ projects built", "Multiple tech stacks"],
    skills: ["Full Stack", "Data Science", "DevOps"],
  },
  {
    id: 9,
    title: "Achievements",
    description: "Recognition and accomplishments in academic and professional life",
    year: "2023-24",
    icon: Trophy,
    color: "from-emerald-500 to-teal-600",
    achievements: ["7.7 CGPA", "Multiple leadership roles"],
    skills: ["Excellence", "Consistency", "Growth"],
  },
]

export function EnhancedJourneySection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="space-y-12">
      {/* Enhanced Header */}
      <motion.div
        className="text-center relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />
        <div className="relative z-10 py-8">
          <h3 className="text-5xl font-bold mb-6 text-white font-display bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            My Journey So Far
          </h3>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From student to professional - here's how I've grown
          </p>
        </div>
      </motion.div>

      {/* Enhanced 3x3 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {journeyItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseLeave={() => setHoveredCard(null)}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Card
              className={`h-full bg-gradient-to-br ${item.color} relative overflow-hidden group cursor-pointer border-0 shadow-2xl hover:shadow-3xl transition-all duration-500`}
            >
              {/* Enhanced background patterns */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-6 right-6 w-20 h-20 rounded-full bg-white/20" />
                <div className="absolute bottom-6 left-6 w-16 h-16 rounded-full bg-white/10" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/5" />
              </div>

              <CardContent className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm px-3 py-1.5 font-medium">
                      {item.year}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white leading-tight group-hover:scale-105 transition-transform duration-300">
                      {item.title}
                    </h3>
                    <p className="text-white/90 text-base leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Achievements - Show on hover */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: hoveredCard === item.id ? 1 : 0,
                    height: hoveredCard === item.id ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden my-4"
                >
                  <div className="space-y-3 pt-4 border-t border-white/20">
                    <h4 className="text-sm font-semibold text-white">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {item.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm text-white/90 flex items-start gap-2">
                          <span className="text-white mt-1 flex-shrink-0">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.skills.slice(0, 3).map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-white/20 text-white text-xs border-white/30 backdrop-blur-sm px-3 py-1 font-medium hover:bg-white/30 transition-colors duration-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {item.skills.length > 3 && (
                    <Badge className="bg-white/20 text-white/90 text-xs border-white/30 backdrop-blur-sm px-3 py-1 font-medium">
                      +{item.skills.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(45deg, rgba(255,255,255,0.1), transparent, rgba(255,255,255,0.1))`,
                }}
              />
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
