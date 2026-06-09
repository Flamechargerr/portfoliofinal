"use client"

import React, { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ProjectSandbox from "./project-sandbox"

gsap.registerPlugin(ScrollTrigger)

// Map project IDs to their real screenshots
const PROJECT_SCREENSHOTS: Record<string, { src: string; alt: string; url: string }> = {
  "01": { src: "/images/project-crimeconnect.png", alt: "Crime Connect FBI Dashboard", url: "crimeconnect.vercel.app" },
  "02": { src: "/images/project-showcase.png", alt: "Smart Maps 3D GPU Engine", url: "smartmaps3d.vercel.app" },
  "03": { src: "/images/project-hackops.png", alt: "HackOps Security Platform", url: "hackops.vercel.app" },
  "04": { src: "/images/project-vartificial.png", alt: "VARtificial Match Predictions", url: "vartificial.vercel.app" },
}

interface ProjectMetric {
  label: string
  value: string
  detail?: string
}

interface ProjectData {
  number: string
  title: string
  category: string
  year: string
  description: string
  insiderDetail: string
  metrics: ProjectMetric[]
  techStack: string[]
  githubUrl: string
  liveUrl?: string | null
  stars?: number
}

export default function ProjectDeepDive({ project, index }: { project: ProjectData; index: number }) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)
  const techRef = useRef<HTMLDivElement>(null)
  const insiderRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const sandboxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Staggered entrance timeline driven by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: false,
          toggleActions: "play none none none",
        },
      })

      // Horizontal divider line draws across
      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.8, ease: "power3.out" },
          0
        )
      }

      // Project number + category slide in
      if (metaRef.current) {
        tl.fromTo(
          metaRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          0.1
        )
      }

      // Title reveals with clip-path
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { y: 80, opacity: 0, clipPath: "inset(0 0 100% 0)" },
          { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power3.out" },
          0.2
        )
      }

      // Description fades up
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          0.4
        )
      }

      // Sandbox container slides up
      if (sandboxRef.current) {
        tl.fromTo(
          sandboxRef.current,
          { y: 40, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
          0.45
        )
      }

      // Tech stack pills pop in
      if (techRef.current) {
        const pills = techRef.current.querySelectorAll(".tech-pill")
        tl.fromTo(
          pills,
          { y: 20, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.7)" },
          0.55
        )
      }

      // Insider detail reveals
      if (insiderRef.current) {
        tl.fromTo(
          insiderRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
          0.7
        )
      }

      // CTAs slide up
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          0.8
        )
      }

      // Metrics stagger in at the bottom
      if (metricsRef.current) {
        const metricCards = metricsRef.current.querySelectorAll(".metric-card")
        tl.fromTo(
          metricCards,
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          0.9
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const isEven = index % 2 === 0

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-24 md:py-32 overflow-hidden bg-lorenzo-dark"
    >
      {/* Giant background project number — z-0 and pointer-events-none to never block clicks */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="text-[30vw] md:text-[25vw] font-brier text-lorenzo-accent/[0.03] uppercase leading-none tracking-tighter"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {project.number}
        </span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        {/* Horizontal divider line */}
        <div
          ref={lineRef}
          className="h-px bg-gradient-to-r from-lorenzo-accent/60 via-lorenzo-accent/20 to-transparent mb-12 md:mb-16"
          style={{ transformOrigin: "left center" }}
        />

        {/* Meta row: Number + Category + Year */}
        <div ref={metaRef} className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 md:mb-12">
          <span className="text-5xl md:text-7xl font-mono text-lorenzo-accent/40 font-extralight leading-none">
            {project.number}
          </span>
          <div className="h-8 w-px bg-lorenzo-light/20" />
          <span className="text-[10px] md:text-xs font-bold font-roboto tracking-[0.25em] uppercase text-lorenzo-accent px-4 py-2 rounded-full border border-lorenzo-accent/20 bg-lorenzo-accent/5">
            {project.category}
          </span>
          <span className="text-sm font-mono text-lorenzo-light/40">
            {project.year}
          </span>
          {project.stars !== undefined && project.stars > 0 && (
            <span className="flex items-center gap-1.5 text-xs font-mono text-yellow-400/70 border border-yellow-400/15 px-3 py-1.5 rounded-full bg-yellow-400/5">
              ★ {project.stars}
            </span>
          )}
        </div>

        {/* Title — massive editorial typography */}
        <h2
          ref={titleRef}
          className="text-[14vw] md:text-[10vw] lg:text-[7vw] font-brier leading-[0.85] tracking-tighter text-lorenzo-light uppercase mb-12 md:mb-16"
        >
          {project.title.split(" ").map((word, i) => (
            <span key={i} className="block">
              {word}
            </span>
          ))}
        </h2>

        {/* Two-column layout: details + interactive sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          {/* Details Column */}
          <div className={`lg:col-span-7 space-y-8 lg:text-left ${isEven ? "" : "lg:order-2"}`}>
            <p
              ref={descRef}
              className="text-lg md:text-xl text-lorenzo-light/75 leading-relaxed font-light max-w-xl"
            >
              {project.description}
            </p>

            {/* Tech stack */}
            <div ref={techRef} className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="tech-pill px-3 py-1.5 text-xs font-bold font-mono uppercase tracking-wider text-lorenzo-accent border border-lorenzo-accent/20 bg-lorenzo-accent/5 rounded-md hover:bg-lorenzo-accent/10 hover:border-lorenzo-accent/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Insider technical detail — the proof you built it */}
            <div
              ref={insiderRef}
              className="relative max-w-xl border-l-2 border-lorenzo-accent/30 pl-6 md:pl-8 py-2"
            >
              <div className="absolute -left-[5px] top-4 w-2 h-2 bg-lorenzo-accent rounded-full" />
              <p className="text-xs font-bold uppercase tracking-widest text-lorenzo-accent/60 mb-2">
                Technical Insight
              </p>
              <p className="text-sm md:text-base text-lorenzo-light/50 leading-relaxed italic font-light">
                "{project.insiderDetail}"
              </p>
            </div>

            {/* CTAs — relative z-30 + pointer-events-auto ensures clickability above all layers */}
            <div ref={ctaRef} className="relative z-30 flex flex-wrap items-center gap-4 pt-4 pointer-events-auto">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative z-30 pointer-events-auto inline-flex items-center gap-2 px-7 py-3.5 bg-lorenzo-accent text-lorenzo-dark font-bold font-roboto uppercase text-xs tracking-widest rounded-md overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-lorenzo-accent/25 hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-lorenzo-accent/50 focus:ring-offset-2 focus:ring-offset-lorenzo-dark cursor-pointer"
              >
                Source Code
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative z-30 pointer-events-auto inline-flex items-center gap-2 px-7 py-3.5 border border-lorenzo-light/25 text-lorenzo-light font-bold font-roboto uppercase text-xs tracking-widest rounded-md transition-all duration-200 hover:border-lorenzo-accent/60 hover:text-lorenzo-accent hover:bg-lorenzo-accent/5 hover:shadow-md hover:shadow-lorenzo-accent/10 hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-lorenzo-accent/50 focus:ring-offset-2 focus:ring-offset-lorenzo-dark cursor-pointer"
                >
                  Live Demo
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Interactive Sandbox Column */}
          <div ref={sandboxRef} className={`lg:col-span-5 w-full ${isEven ? "" : "lg:order-1"}`}>
            {/* Browser Frame Mockup with real screenshot */}
            {PROJECT_SCREENSHOTS[project.number] && (
              <motion.div
                className="relative rounded-xl overflow-hidden border border-lorenzo-light/10 bg-[#1a1a2e] shadow-2xl shadow-black/40 mb-6 group"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#0d0d1a] border-b border-white/5">
                  {/* Traffic lights */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  {/* URL bar */}
                  <div className="flex-1 mx-3 px-4 py-1.5 rounded-md bg-white/5 border border-white/5 flex items-center gap-2">
                    <svg className="w-3 h-3 text-lorenzo-accent/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-[11px] font-mono text-white/30 truncate">
                      {PROJECT_SCREENSHOTS[project.number].url}
                    </span>
                  </div>
                </div>
                {/* Screenshot */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={PROJECT_SCREENSHOTS[project.number].src}
                    alt={PROJECT_SCREENSHOTS[project.number].alt}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  {/* Subtle gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1a1a2e] to-transparent" />
                </div>
              </motion.div>
            )}
            {/* Interactive Sandbox below the screenshot */}
            <ProjectSandbox projectId={project.number} />
          </div>
        </div>

        {/* Metrics Row - placed at the bottom as a elegant horizontal divider layout */}
        <div
          ref={metricsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-12 border-t border-white/5"
        >
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="metric-card group p-6 border border-lorenzo-light/10 rounded-xl bg-lorenzo-light/[0.02] hover:border-lorenzo-accent/30 hover:bg-lorenzo-accent/[0.03] transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-brier text-lorenzo-accent mb-2 tracking-tight">
                {metric.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-lorenzo-light/50 mb-1">
                {metric.label}
              </div>
              {metric.detail && (
                <div className="text-xs text-lorenzo-light/30 font-mono leading-relaxed mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {metric.detail}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
