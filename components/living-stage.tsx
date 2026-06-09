"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion"

const CHAPTERS = [
  { id: "hero", label: "Origin" },
  { id: "about", label: "Signal" },
  { id: "skills", label: "Stack" },
  { id: "selected-works", label: "Works" },
  { id: "experience", label: "Proof" },
  { id: "contact", label: "Contact" },
]

export default function LivingStage() {
  const { scrollYProgress } = useScroll()
  const [activeChapter, setActiveChapter] = useState(CHAPTERS[0].id)
  const [scrollPercent, setScrollPercent] = useState(0)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const smoothMouseX = useSpring(mouseX, { stiffness: 80, damping: 24 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 80, damping: 24 })
  const routeX = useTransform(smoothMouseX, [0, 1], [-42, 42])
  const routeY = useTransform(smoothMouseY, [0, 1], [-28, 28])
  const routeRotate = useTransform(scrollYProgress, [0, 1], [-4, 4])
  const scanOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.28, 0.12, 0.24])

  useEffect(() => {
    const updateMouse = (event: MouseEvent) => {
      mouseX.set(event.clientX / window.innerWidth)
      mouseY.set(event.clientY / window.innerHeight)
    }

    const updateScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const percent = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0
      setScrollPercent(Math.round(percent))

      const marker = window.innerHeight * 0.42
      const current = CHAPTERS.findLast((chapter) => {
        const element = document.getElementById(chapter.id)
        if (!element) return false
        return element.getBoundingClientRect().top <= marker
      })
      setActiveChapter(current?.id ?? CHAPTERS[0].id)
    }

    window.addEventListener("mousemove", updateMouse, { passive: true })
    window.addEventListener("scroll", updateScroll, { passive: true })
    updateScroll()

    return () => {
      window.removeEventListener("mousemove", updateMouse)
      window.removeEventListener("scroll", updateScroll)
    }
  }, [mouseX, mouseY])

  const activeIndex = useMemo(
    () => Math.max(0, CHAPTERS.findIndex((chapter) => chapter.id === activeChapter)),
    [activeChapter]
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-[3] hidden overflow-hidden md:block" aria-hidden="true">
      <motion.div
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          opacity: scanOpacity,
          background:
            "linear-gradient(115deg, transparent 0%, rgba(200,245,80,0.03) 32%, rgba(255,255,255,0.035) 50%, rgba(200,245,80,0.025) 68%, transparent 100%)",
        }}
      />

      <motion.svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-70"
        style={{ x: routeX, y: routeY, rotate: routeRotate }}
      >
        <defs>
          <linearGradient id="living-route" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(200,245,80,0)" />
            <stop offset="44%" stopColor="rgba(200,245,80,0.14)" />
            <stop offset="56%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(200,245,80,0)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M-40 628 C 208 486, 352 718, 578 542 S 992 218, 1480 332"
          fill="none"
          stroke="url(#living-route)"
          strokeWidth="1.2"
          strokeDasharray="10 22"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, ease: "easeOut" }}
        />
        <motion.path
          d="M-60 220 C 246 318, 486 112, 746 230 S 1082 530, 1500 444"
          fill="none"
          stroke="rgba(232,232,227,0.055)"
          strokeWidth="1"
          strokeDasharray="2 20"
          animate={{ strokeDashoffset: [0, -72] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
      </motion.svg>

      <div className="absolute left-6 top-1/2 flex -translate-y-1/2 flex-col items-center gap-4">
        <div className="relative h-[42vh] w-px overflow-hidden bg-white/10">
          <motion.div
            className="absolute left-0 top-0 w-px bg-lorenzo-accent"
            style={{ height: `${scrollPercent}%` }}
          />
        </div>
        <div className="font-mono text-[10px] text-lorenzo-accent/80">{scrollPercent.toString().padStart(2, "0")}%</div>
      </div>

      <div className="absolute right-5 top-1/2 flex -translate-y-1/2 flex-col items-end gap-3">
        {CHAPTERS.map((chapter, index) => {
          const isActive = chapter.id === activeChapter
          return (
            <div key={chapter.id} className="flex items-center gap-3">
              <motion.span
                className="font-mono text-[10px] uppercase tracking-[0.24em]"
                animate={{
                  opacity: isActive ? 0.9 : 0.28,
                  color: isActive ? "#c8f550" : "#e8e8e3",
                  x: isActive ? 0 : 8,
                }}
              >
                {chapter.label}
              </motion.span>
              <motion.span
                className="block h-px bg-lorenzo-accent"
                animate={{ width: isActive ? 34 : 10, opacity: isActive ? 0.9 : 0.22 }}
              />
            </div>
          )
        })}
        <motion.div
          className="mt-2 h-2 w-2 rounded-full bg-lorenzo-accent shadow-[0_0_18px_rgba(200,245,80,0.75)]"
          animate={{ y: activeIndex * 22 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
        />
      </div>
    </div>
  )
}
