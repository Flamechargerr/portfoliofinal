"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Brain, Server, Terminal } from "lucide-react"

interface Skill {
  name: string
  projects: number
  icon: string
  color: string
  years: number
  description: string
  category: string
}

interface SkillCategory {
  name: string
  icon: React.ComponentType<any>
  color: string
  skills: Skill[]
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("Frontend")
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      skills: [
        {
          name: "JavaScript",
          projects: 8,
          icon: "⚡",
          color: "from-yellow-400 to-orange-500",
          years: 2,
          description: "Advanced ES6+, async/await, DOM manipulation",
          category: "Frontend",
        },
        {
          name: "React",
          projects: 6,
          icon: "⚛️",
          color: "from-blue-400 to-blue-600",
          years: 2,
          description: "Hooks, Context API, Redux, Next.js",
          category: "Frontend",
        },
        {
          name: "TypeScript",
          projects: 4,
          icon: "📘",
          color: "from-blue-600 to-indigo-600",
          years: 1,
          description: "Type safety, interfaces, generics",
          category: "Frontend",
        },
        {
          name: "HTML/CSS",
          projects: 10,
          icon: "🎨",
          color: "from-orange-500 to-red-500",
          years: 3,
          description: "Semantic HTML, Flexbox, Grid, Animations",
          category: "Frontend",
        },
      ],
    },
    {
      name: "Backend",
      icon: Server,
      color: "from-green-500 to-emerald-500",
      skills: [
        {
          name: "Node.js",
          projects: 5,
          icon: "🟢",
          color: "from-green-500 to-green-700",
          years: 2,
          description: "Express.js, RESTful APIs, middleware",
          category: "Backend",
        },
        {
          name: "Python",
          projects: 6,
          icon: "🐍",
          color: "from-blue-500 to-yellow-500",
          years: 2,
          description: "Django, Flask, data analysis, automation",
          category: "Backend",
        },
        {
          name: "MongoDB",
          projects: 4,
          icon: "🍃",
          color: "from-green-600 to-green-800",
          years: 1,
          description: "NoSQL, aggregation, indexing",
          category: "Backend",
        },
        {
          name: "SQL",
          projects: 5,
          icon: "🗄️",
          color: "from-blue-600 to-purple-600",
          years: 2,
          description: "MySQL, PostgreSQL, complex queries",
          category: "Backend",
        },
      ],
    },
    {
      name: "Data Science",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      skills: [
        {
          name: "Data Analysis",
          projects: 4,
          icon: "📊",
          color: "from-purple-500 to-indigo-500",
          years: 1,
          description: "Pandas, NumPy, statistical analysis",
          category: "Data Science",
        },
        {
          name: "Machine Learning",
          projects: 3,
          icon: "🤖",
          color: "from-pink-500 to-purple-600",
          years: 1,
          description: "Scikit-learn, TensorFlow basics, algorithms",
          category: "Data Science",
        },
        {
          name: "Tableau",
          projects: 3,
          icon: "📈",
          color: "from-blue-500 to-teal-500",
          years: 1,
          description: "Data visualization, dashboards, storytelling",
          category: "Data Science",
        },
        {
          name: "Statistics",
          projects: 4,
          icon: "📉",
          color: "from-indigo-500 to-purple-500",
          years: 2,
          description: "Hypothesis testing, regression, probability",
          category: "Data Science",
        },
      ],
    },
    {
      name: "Tools & Others",
      icon: Terminal,
      color: "from-gray-500 to-gray-700",
      skills: [
        {
          name: "Git",
          projects: 10,
          icon: "🌿",
          color: "from-orange-500 to-red-600",
          years: 2,
          description: "Version control, branching, collaboration",
          category: "Tools",
        },
        {
          name: "Docker",
          projects: 2,
          icon: "🐳",
          color: "from-blue-500 to-cyan-500",
          years: 1,
          description: "Containerization, deployment basics",
          category: "Tools",
        },
        {
          name: "AWS",
          projects: 2,
          icon: "☁️",
          color: "from-orange-400 to-yellow-500",
          years: 1,
          description: "EC2, S3, basic cloud services",
          category: "Tools",
        },
        {
          name: "Figma",
          projects: 4,
          icon: "🎨",
          color: "from-purple-400 to-pink-500",
          years: 1,
          description: "UI/UX design, prototyping, collaboration",
          category: "Tools",
        },
      ],
    },
  ]

  const activeSkills = skillCategories.find((cat) => cat.name === activeCategory)?.skills || []

  return (
    <div ref={containerRef} className="space-y-12">
      {/* Category Selector */}
      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
      >
        {skillCategories.map((category, index) => (
          <motion.button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm ${
              activeCategory === category.name
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <category.icon className="w-5 h-5" />
            <span className="font-medium">{category.name}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {activeSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
          >
            <Card className="relative overflow-hidden bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 group cursor-pointer shadow-xl">
              {/* Animated background gradient */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <CardContent className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                <div className="text-center space-y-4">
                  {/* Icon with enhanced animation */}
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${skill.color} rounded-2xl flex items-center justify-center mx-auto text-3xl shadow-lg`}
                    whileHover={{
                      rotate: [0, -10, 10, 0],
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {skill.icon}
                  </motion.div>

                  {/* Skill name */}
                  <div>
                    <h3 className="text-slate-100 font-bold text-xl bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                      {skill.name}
                    </h3>
                    <p className="text-cyan-300/80 text-sm font-medium">{skill.projects} Projects</p>
                  </div>

                  {/* Description */}
                  <p className="text-cyan-300/60 text-xs font-medium">{skill.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center p-2 bg-slate-700/30 rounded-lg border border-cyan-400/20">
                      <p className="text-cyan-300 font-semibold text-lg">{skill.projects}</p>
                      <p className="text-slate-400 text-xs font-medium">Projects</p>
                    </div>
                    <div className="text-center p-2 bg-slate-700/30 rounded-lg border border-cyan-400/20">
                      <p className="text-cyan-300 font-semibold text-lg">{skill.years}+</p>
                      <p className="text-slate-400 text-xs font-medium">Years</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Overall Progress Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 shadow-xl">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Skill Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}
                </div>
                <div className="text-gray-400">Total Skills</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {skillCategories.reduce(
                    (acc, cat) => acc + cat.skills.reduce((skillAcc, skill) => skillAcc + skill.projects, 0),
                    0,
                  )}
                </div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {Math.max(...skillCategories.flatMap((cat) => cat.skills.map((skill) => skill.years)))}+
                </div>
                <div className="text-gray-400">Years Experience</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
