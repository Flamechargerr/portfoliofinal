"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Skill {
  name: string
  level: number
  icon: string
  color: string
  projects: number
  years: number
  description: string
}

interface InteractiveSkillCardProps {
  skill: Skill
  index: number
}

export function InteractiveSkillCard({ skill, index }: InteractiveSkillCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card
        className={`relative overflow-hidden cursor-pointer transition-all duration-500 ${
          isHovered
            ? "bg-gradient-to-br from-slate-800/90 to-slate-900/90 dark:from-slate-900/90 dark:to-slate-950/90 border-cyan-400/50 shadow-2xl shadow-cyan-500/20"
            : "bg-slate-800/50 dark:bg-slate-900/50 border-slate-700/50 dark:border-slate-800/50"
        }`}
        onClick={() => setShowDetails(!showDetails)}
      >
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0`}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating particles effect */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: "100%",
                  opacity: 0,
                }}
                animate={{
                  y: "-10%",
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            ))}
          </div>
        )}

        <CardContent className="relative p-6 z-10">
          <div className="text-center space-y-4">
            {/* Icon with enhanced animation */}
            <motion.div
              className={`w-16 h-16 bg-gradient-to-br ${skill.color} rounded-2xl flex items-center justify-center mx-auto text-3xl shadow-lg`}
              animate={{
                rotate: isHovered ? [0, -10, 10, 0] : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              {skill.icon}
            </motion.div>

            {/* Skill name with gradient text */}
            <div>
              <h3 className="text-slate-100 dark:text-slate-200 font-bold text-xl bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                {skill.name}
              </h3>
              <p className="text-cyan-300/80 text-sm font-medium">{skill.level}% Proficiency</p>
            </div>

            {/* Animated progress bar */}
            <div className="space-y-2">
              <Progress value={isHovered ? skill.level : 0} className="h-2 bg-slate-700 dark:bg-slate-800" />
              <motion.div
                className="text-xs text-cyan-300/60 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ delay: 0.2 }}
              >
                {skill.description}
              </motion.div>
            </div>

            {/* Stats with enhanced styling */}
            <motion.div
              className="grid grid-cols-2 gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showDetails ? 1 : 0, y: showDetails ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center p-2 bg-slate-700/30 dark:bg-slate-800/30 rounded-lg border border-cyan-400/20">
                <p className="text-cyan-300 font-semibold text-lg">{skill.projects}</p>
                <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">Projects</p>
              </div>
              <div className="text-center p-2 bg-slate-700/30 dark:bg-slate-800/30 rounded-lg border border-cyan-400/20">
                <p className="text-cyan-300 font-semibold text-lg">{skill.years}+</p>
                <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">Years</p>
              </div>
            </motion.div>
          </div>
        </CardContent>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(45deg, transparent, ${skill.color.split(" ")[1]?.replace("from-", "").replace("-500", "")}20, transparent)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  )
}
