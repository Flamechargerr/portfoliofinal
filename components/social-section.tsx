"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Flamechargerr",
    handle: "@Flamechargerr",
    stats: "75+ Stars",
    gradient: "from-gray-800 to-gray-900",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/anamay-tripathy-b53829296/",
    handle: "@anamay-tripathy",
    stats: "500+ Connections",
    gradient: "from-blue-700 to-blue-900",
  },
  {
    name: "Email",
    url: "mailto:tripathy.anamay23@gmail.com",
    handle: "tripathy.anamay23",
    stats: "Always Open",
    gradient: "from-red-600 to-red-800",
  },
]

export default function SocialSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-lorenzo-dark py-24 overflow-hidden"
    >
      {/* Large Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[25vw] font-brier text-white/[0.02] uppercase whitespace-nowrap">
          CONNECT
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-brier uppercase leading-none">
            <span className="text-lorenzo-light">LET'S</span>
            <br />
            <span className="text-lorenzo-accent">CONNECT</span>
          </h2>
          <p className="mt-6 text-lorenzo-light/50 max-w-xl mx-auto font-mona">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>

        {/* Fanned Social Cards - Lorenzo Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center items-center relative h-[450px] mb-40"
        >
          <div className="relative w-full max-w-3xl flex justify-center" style={{ zIndex: 5 }}>
            {socialLinks.map((link, index) => {
              const rotation = (index - 1) * 15
              const isHovered = hoveredIndex === index

              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target={link.name !== "Email" ? "_blank" : undefined}
                  rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                  className={`
                    absolute w-[280px] md:w-[320px] h-[360px] rounded-xl overflow-hidden
                    border-2 border-lorenzo-accent/30 hover:border-lorenzo-accent
                    bg-gradient-to-br ${link.gradient} p-6 flex flex-col justify-between
                    cursor-pointer transition-all duration-300
                  `}
                  style={{
                    transformOrigin: "bottom center",
                    zIndex: isHovered ? 10 : 3 - index,
                  }}
                  initial={{ rotate: rotation, y: 0 }}
                  animate={{
                    rotate: isHovered ? 0 : rotation,
                    y: isHovered ? -20 : 0,
                    scale: isHovered ? 1.05 : 1,
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Card Content */}
                  <div>
                    <div className="text-6xl font-brier text-lorenzo-accent mb-4">
                      {link.name === "GitHub" && "GH"}
                      {link.name === "LinkedIn" && "IN"}
                      {link.name === "Email" && "@"}
                    </div>
                    <h3 className="text-2xl font-bold text-white uppercase mb-2">
                      {link.name}
                    </h3>
                    <p className="text-white/60 text-sm font-mono">
                      {link.handle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lorenzo-accent font-bold text-sm uppercase">
                      {link.stats}
                    </span>
                    <svg className="w-6 h-6 text-lorenzo-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-block p-8 border-2 border-lorenzo-accent/30">
            <h3 className="text-2xl md:text-3xl font-brier text-lorenzo-light uppercase mb-4">
              Ready to <span className="text-lorenzo-accent">Build</span> Something?
            </h3>
            <p className="text-lorenzo-light/50 mb-6 font-mona">
              Whether you need a full-stack application, data analysis solution, or just want to chat about tech—I'm here!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:tripathy.anamay23@gmail.com"
                className="px-8 py-4 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-lorenzo-accent/30 transition-all"
              >
                Email Me
              </a>
              <a
                href="tel:+919877454747"
                className="px-8 py-4 border-2 border-lorenzo-accent text-lorenzo-accent font-bold uppercase tracking-wider hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all"
              >
                +91 9877454747
              </a>
            </div>
          </div>
        </motion.div>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 text-lorenzo-light/30 text-sm uppercase tracking-widest"
        >
          📍 Based in Mumbai, India • Open to Remote
        </motion.p>
      </div>
    </section>
  )
}
