"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import Image from "next/image"
import ProfileCard from "./profile-card/ProfileCard"

// Dynamic greeting based on time of day
const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) return "Good Morning"
  if (hour >= 12 && hour < 18) return "Good Afternoon"
  if (hour >= 18 && hour < 21) return "Good Evening"
  return "You're up late! 🌙"
}

export default function HeroSection() {
  const [isReady, setIsReady] = useState(false)
  const containerRef = useRef<HTMLElement>(null)

  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])

  // Parallax for the background text
  const bgTextX = useTransform(scrollY, [0, 1000], [0, -200])

  // Spring animations for smoother movement
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 })
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 })

  // Floating effect for the portrait
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsReady(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const portraitY = useTransform(scrollY, [0, 500], [0, 100])
  const portraitScale = useTransform(scrollY, [0, 500], [1, 1.1])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center bg-transparent overflow-hidden pt-20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-lorenzo-accent/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-lorenzo-accent/5 rounded-full blur-[150px] animate-pulse delay-700" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(var(--lorenzo-accent) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      {/* Large Background Text - ALWAYS BEYOND style */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-[1]"
        style={{ x: bgTextX }}
      >
        <span className="text-[18vw] md:text-[15vw] font-brier text-lorenzo-accent/[0.06] uppercase whitespace-nowrap tracking-tight">
          INNOVATOR
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full relative z-10 py-12 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isReady ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center order-2 lg:order-1"
          >
            <div className="relative">
              {/* Top accent */}
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isReady ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50" suppressHydrationWarning>
                  {getGreeting()} • Available for Hire
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-lorenzo-accent ml-2 border border-lorenzo-accent/30 px-2 py-1 rounded-sm backdrop-blur-sm">⚡ Reply &lt; 24h</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-brier uppercase tracking-tighter leading-[0.85] mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={isReady ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <span className="block text-lorenzo-accent drop-shadow-lg">ANAMAY</span>
                <span className="block text-white">TRIPATHY</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-lg md:text-xl text-white/70 mb-10 max-w-lg font-light tracking-tight leading-relaxed"
                initial={{ opacity: 0 }}
                animate={isReady ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                <span className="text-lorenzo-accent font-normal tracking-wide min-h-[40px] block font-brier uppercase text-xl">
                  <TypeAnimation
                    sequence={[
                      "Data Science Engineer",
                      2000,
                      "Full Stack Developer",
                      2000,
                      "AI/ML Enthusiast",
                      2000,
                      "Startup Lead Dev",
                      2000
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </span>
                <br />
                <span className="text-white/50 text-base">B.Tech @ MIT Manipal • Lead Dev @ YaanBarpe</span>
              </motion.p>

              {/* Stats Row */}
              <motion.div
                className="flex flex-wrap gap-8 md:gap-12 mb-10 pb-10 border-b border-white/5"
                initial={{ opacity: 0 }}
                animate={isReady ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
              >
                {[
                  { value: "15+", label: "Projects" },
                  { value: "8+", label: "Certs" },
                  { value: "570+", label: "Commits" },
                ].map((stat, i) => (
                  <div key={i} className="text-center group cursor-pointer" data-cursor="VIEW">
                    <motion.div
                      className="text-3xl md:text-4xl font-brier text-white group-hover:text-lorenzo-accent transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Row */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isReady ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
              >
                <motion.a
                  href="#projects"
                  className="group relative px-8 py-4 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider text-sm overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor="EXPLORE"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Projects
                    <motion.svg
                      className="w-4 h-4"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </span>
                </motion.a>
                <motion.a
                  href="#contact"
                  className="px-8 py-4 border-2 border-lorenzo-light/20 text-lorenzo-light font-bold uppercase tracking-wider text-sm hover:border-lorenzo-accent hover:text-lorenzo-accent transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.a>
                <motion.a
                  href="/resume.pdf"
                  download
                  className="px-8 py-4 border-2 border-lorenzo-accent text-lorenzo-accent font-bold uppercase tracking-wider text-sm hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor="DOWNLOAD"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download CV
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex items-center gap-4 mt-10"
                initial={{ opacity: 0 }}
                animate={isReady ? { opacity: 1 } : {}}
                transition={{ delay: 1 }}
              >
                <span className="text-xs text-lorenzo-light/40 uppercase tracking-wider">Connect:</span>
                <a href="https://github.com/Flamechargerr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-lorenzo-accent/30 text-lorenzo-accent hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </a>
                <a href="https://linkedin.com/in/anamay-tripathy-b53829296" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center border border-lorenzo-accent/30 text-lorenzo-accent hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a
                  href="mailto:tripathy.anamay23@gmail.com"
                  className="ml-2 px-4 py-2 text-xs border border-lorenzo-accent/30 text-lorenzo-accent hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all uppercase tracking-wider flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  Email Me
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            className="flex flex-col items-center lg:items-end justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isReady ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative w-full max-w-[450px]">
              {/* Profile Card component */}
              <div
                style={{
                  transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <ProfileCard
                  avatarUrl="/images/anamay-profile.png"
                  name="Anamay Tripathy"
                  title="Data Science Engineer"
                  handle="anamaydev"
                  status="Available for Work"
                  contactText="Contact Me"
                  showUserInfo={true}
                  enableTilt={true}
                  onContactClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                />

                {/* Floating elements around card */}
                <motion.div
                  className="absolute -top-6 -right-6 px-4 py-2 bg-lorenzo-dark border border-lorenzo-accent/30 text-lorenzo-accent text-[10px] font-bold uppercase tracking-wider shadow-xl z-20"
                  animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  MIT MANIPAL
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 px-4 py-2 bg-lorenzo-dark border border-lorenzo-accent/30 text-lorenzo-light text-[10px] font-bold uppercase tracking-wider shadow-xl z-20"
                  animate={{ y: [0, 8, 0], rotate: [0, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  LEAD DEV
                </motion.div>
              </div>

              {/* Decorative circle behind */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-lorenzo-accent/5 rounded-full -z-10 animate-[spin_20s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-lorenzo-accent/10 border-dashed rounded-full -z-10 animate-[spin_30s_linear_infinite_reverse]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-lorenzo-accent to-transparent" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-lorenzo-accent">Scroll</span>
      </motion.div>
    </section>
  )
}
