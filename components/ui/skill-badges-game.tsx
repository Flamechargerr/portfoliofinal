"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Brain, Zap, Database, Palette, Shield } from "lucide-react"

const skillBadges = [
  { icon: Code, label: "Full Stack", color: "from-blue-500 to-purple-500", delay: 0 },
  { icon: Brain, label: "AI/ML", color: "from-green-500 to-teal-500", delay: 0.1 },
  { icon: Zap, label: "Performance", color: "from-yellow-500 to-orange-500", delay: 0.2 },
  { icon: Database, label: "Data", color: "from-pink-500 to-rose-500", delay: 0.3 },
  { icon: Palette, label: "Design", color: "from-purple-500 to-pink-500", delay: 0.4 },
  { icon: Shield, label: "Security", color: "from-cyan-500 to-blue-500", delay: 0.5 },
]

export function SkillBadgesGame() {
  return (
    <div className="w-full py-8 md:py-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">My Superpowers</h2>
        <p className="text-gray-400 text-sm md:text-base">Hover to unlock abilities</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {skillBadges.map((skill, index) => {
          const IconComponent = skill.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3, delay: skill.delay }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <Card
                className={`bg-gradient-to-br ${skill.color} p-0 border-0 cursor-pointer group relative overflow-hidden h-full`}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                <CardContent className="p-4 md:p-5 flex flex-col items-center justify-center h-full relative z-10">
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="mb-2">
                    <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </motion.div>
                  <p className={`text-white font-bold text-xs md:text-sm text-center`}>{skill.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default SkillBadgesGame
