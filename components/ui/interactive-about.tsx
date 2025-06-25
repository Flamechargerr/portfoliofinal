"use client"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CircularProgress } from "@/components/ui/circular-progress"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import {
  Brain,
  Users,
  Code,
  Database,
  Shield,
  Rocket,
  Coffee,
  MapPin,
  Calendar,
  Target,
  Zap,
  Trophy,
  BookOpen,
  Lightbulb,
  Briefcase,
  Award,
} from "lucide-react"

interface InteractiveAboutProps {
  quickFacts: Array<{
    label: string
    value: number
    suffix: string
    color: string
    percentage: number
  }>
}

export function InteractiveAbout({ quickFacts }: InteractiveAboutProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  // Updated journey steps - now 9 cards for 3x3 grid
  const journeySteps = [
    {
      icon: BookOpen,
      title: "Academic Foundation",
      description: "Started my journey in Data Science Engineering at MIT Manipal",
      color: "from-blue-500 to-indigo-500",
      year: "2023",
      achievements: ["Enrolled in B.Tech Data Science", "Built strong foundation in programming"],
      skills: ["Python", "Mathematics", "Statistics"],
    },
    {
      icon: Code,
      title: "First Projects",
      description: "Built my first web applications and discovered my passion for coding",
      color: "from-green-500 to-emerald-500",
      year: "2023",
      achievements: ["Created first web app", "Learned React and Node.js"],
      skills: ["JavaScript", "React", "HTML/CSS"],
    },
    {
      icon: Users,
      title: "Leadership Roles",
      description: "Became Class Representative and joined E-Cell as Executive",
      color: "from-purple-500 to-pink-500",
      year: "2024",
      achievements: ["Elected Class Representative", "Joined E-Cell Executive team"],
      skills: ["Leadership", "Communication", "Event Management"],
    },
    {
      icon: Rocket,
      title: "Startup Experience",
      description: "Joined YaanBarpe as Technical Head, leading development teams",
      color: "from-orange-500 to-red-500",
      year: "2024",
      achievements: ["Led technical team of 5", "Built MVP from scratch"],
      skills: ["Team Management", "Architecture", "DevOps"],
    },
    {
      icon: Briefcase,
      title: "Industry Exposure",
      description: "Data Analyst & Web Dev Intern at Intellect Design Arena",
      color: "from-cyan-500 to-blue-500",
      year: "2024",
      achievements: ["Worked on fintech solutions", "Built data visualization dashboards"],
      skills: ["Data Analysis", "Python", "React"],
    },
    {
      icon: Target,
      title: "Future Goals",
      description: "Aiming to make significant impact in tech and data science",
      color: "from-pink-500 to-purple-500",
      year: "2025+",
      achievements: ["Continuous learning", "Building innovative solutions"],
      skills: ["AI/ML", "Data Science", "Innovation"],
    },
    {
      icon: Award,
      title: "Certifications",
      description: "Meta Data Analyst and IBM GenAI Professional certifications",
      color: "from-yellow-500 to-orange-500",
      year: "2024",
      achievements: ["Meta Data Analyst Certified", "IBM GenAI Professional"],
      skills: ["Data Analysis", "AI/ML", "Tableau"],
    },
    {
      icon: Database,
      title: "Technical Skills",
      description: "Mastered various programming languages and technologies",
      color: "from-indigo-500 to-purple-500",
      year: "Ongoing",
      achievements: ["15+ projects built", "Multiple tech stacks"],
      skills: ["Full Stack", "Data Science", "DevOps"],
    },
    {
      icon: Trophy,
      title: "Achievements",
      description: "Recognition and accomplishments in academic and professional life",
      color: "from-emerald-500 to-teal-500",
      year: "2023-24",
      achievements: ["7.7 CGPA", "Multiple leadership roles"],
      skills: ["Excellence", "Consistency", "Growth"],
    },
  ]

  const interests = [
    { icon: Database, text: "Data Science", color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: Code, text: "Web Development", color: "text-green-400", bg: "bg-green-500/10" },
    { icon: Shield, text: "Cybersecurity", color: "text-red-400", bg: "bg-red-500/10" },
    { icon: Rocket, text: "Startups", color: "text-purple-400", bg: "bg-purple-500/10" },
    { icon: Brain, text: "AI/ML", color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { icon: Lightbulb, text: "Innovation", color: "text-yellow-400", bg: "bg-yellow-500/10" },
  ]

  const getRowSizes = () => {
    if (hovered === null) {
      return "1fr 1fr 1fr"
    }
    const { row } = hovered
    const hoverSize = 6
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) {
      return "1fr 1fr 1fr"
    }
    const { col } = hovered
    const hoverSize = 6
    const nonHoveredSize = (12 - hoverSize) / 2
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  return (
    <div ref={containerRef} className="space-y-24">
      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700 p-8 md:p-12"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Me
              </h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I'm currently pursuing{" "}
                  <span className="text-blue-400 font-semibold">B.Tech in Data Science Engineering</span> at MIT
                  Manipal, where I'm exploring the fascinating world of data, algorithms, and technology. My journey
                  started with curiosity about how things work and has evolved into a passion for building solutions
                  that can make a difference.
                </p>
                <p>
                  As <span className="text-green-400 font-semibold">Technical Head at YaanBarpe</span>, a student
                  startup, I'm learning to lead technical development while gaining hands-on experience in real-world
                  projects. My internship at
                  <span className="text-purple-400 font-semibold"> Intellect Design Arena</span> as a Data Analyst & Web
                  Developer has given me valuable industry exposure in fintech solutions.
                </p>
              </div>
            </motion.div>

            {/* Interactive stats */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {[
                { label: "Current Year", value: "4th Sem", icon: Calendar, color: "from-blue-500 to-indigo-500" },
                { label: "Location", value: "Mumbai", icon: MapPin, color: "from-green-500 to-emerald-500" },
                { label: "Focus", value: "Full Stack", icon: Target, color: "from-purple-500 to-pink-500" },
                { label: "Passion", value: "Innovation", icon: Zap, color: "from-orange-500 to-red-500" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={`p-4 rounded-xl bg-gradient-to-r ${stat.color} bg-opacity-10 border border-gray-600 hover:border-gray-500 transition-all duration-200 group cursor-pointer`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
                    >
                      <stat.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{stat.value}</p>
                      <p className="text-gray-400 text-xs">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Quick Facts with enhanced visuals */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <h4 className="text-2xl font-bold text-white mb-6">Quick Facts</h4>
            <div className="grid grid-cols-2 gap-6">
              {quickFacts.map((fact, index) => (
                <motion.div
                  key={fact.label}
                  className="text-center p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:bg-gray-800/70 transition-all duration-200 group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onMouseEnter={() => setActiveCard(fact.label)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <CircularProgress
                    percentage={fact.percentage}
                    size={70}
                    color={fact.color}
                    value={fact.value.toString() + fact.suffix}
                    label={fact.label}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Dynamic Journey Grid - 3x3 Layout with proper spacing */}
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h4 className="text-3xl font-bold text-white text-center mb-8">My Journey So Far</h4>
        <div
          className="grid gap-6 h-[800px] max-w-6xl mx-auto mb-24"
          style={{
            gridTemplateRows: getRowSizes(),
            gridTemplateColumns: getColSizes(),
            transition: "grid-template-rows 0.3s ease, grid-template-columns 0.3s ease",
          }}
        >
          {journeySteps.map((step, index) => {
            const row = Math.floor(index / 3)
            const col = index % 3

            return (
              <motion.div
                key={step.title}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                onMouseEnter={() => setHovered({ row, col })}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ scale: 1.02 }}
              >
                <Card
                  className={`w-full h-full bg-gradient-to-br ${step.color} relative overflow-hidden group cursor-pointer border-0 shadow-xl`}
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
                          <step.icon className="w-6 h-6 text-white" />
                        </div>
                        <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs">
                          {step.year}
                        </Badge>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-white leading-tight mb-2">{step.title}</h3>
                        <p className="text-white/80 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>

                    {/* Achievements - Show on hover with proper spacing */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: hovered?.row === row && hovered?.col === col ? 1 : 0,
                        height: hovered?.row === row && hovered?.col === col ? "auto" : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden my-4"
                    >
                      <div className="space-y-2 pt-3 border-t border-white/20">
                        <h4 className="text-xs font-semibold text-white">Achievements:</h4>
                        <ul className="space-y-1">
                          {step.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-xs text-white/80 flex items-start gap-2">
                              <span className="text-white mt-0.5 flex-shrink-0">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {step.skills.slice(0, 2).map((skill) => (
                        <Badge key={skill} className="bg-white/20 text-white text-xs border-white/30 backdrop-blur-sm">
                          {skill}
                        </Badge>
                      ))}
                      {step.skills.length > 2 && (
                        <Badge className="bg-white/20 text-white/80 text-xs border-white/30 backdrop-blur-sm">
                          +{step.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Interests Grid */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <h4 className="text-2xl font-bold text-white text-center">Interests & Passions</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.text}
              className={`p-4 rounded-xl ${interest.bg} border border-gray-600 hover:border-gray-500 transition-all duration-200 group cursor-pointer text-center`}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              style={{ transitionDelay: `${0.7 + index * 0.05}s` }}
            >
              <interest.icon className={`w-6 h-6 ${interest.color} mx-auto mb-2`} />
              <p className="text-white text-sm font-medium group-hover:text-blue-300 transition-colors">
                {interest.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Enhanced Fun Fact Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        whileHover={{ scale: 1.02 }}
      >
        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-400/30 p-8 text-center overflow-hidden relative group cursor-pointer">
          <div className="relative z-10">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-300 transition-colors">
              Fun Facts
            </h4>
            <div className="space-y-3 text-gray-300 text-lg leading-relaxed">
              <p>I've debugged code at 3 AM more times than I can count, fueled by endless cups of coffee! ☕</p>
              <p>
                Built <span className="text-blue-400 font-semibold">4 live projects</span> including CrimeConnect,
                HackOps, and Flora Fight Frenzy
              </p>
              <p>
                Earned <span className="text-purple-400 font-semibold">8+ certifications</span> in data science and
                development
              </p>
              <p>
                <span className="text-orange-400 font-semibold">
                  Current coffee count: <AnimatedCounter end={999} suffix="+" />
                </span>
              </p>
              <p>Can solve a Rubik's cube in under 2 minutes while thinking about algorithms! 🧩</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
