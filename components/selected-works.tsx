"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

interface Project {
    id: string
    title: string
    category: string
    year: string
    description: string
    image: string
    link?: string
}

const PROJECTS: Project[] = [
    {
        id: "01",
        title: "YaanBarpe Core",
        category: "Full Stack Architecture",
        year: "2024",
        description: "Scaleable microservices backend powering the travel itinerary platform with AI integrations and real-time data sync.",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80",
        link: "https://github.com/Flamechargerr",
    },
    {
        id: "02",
        title: "Crime Connect",
        category: "Real-time Intelligence",
        year: "2024",
        description: "Centralized criminal registry and court system administration featuring an FBI-cinematic agent-level data dashboard.",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1600&q=80",
        link: "https://github.com/Flamechargerr/crime-connect-fbi",
    },
    {
        id: "03",
        title: "HackOps Platform",
        category: "Cybersecurity Training",
        year: "2023",
        description: "Automated deployment and testing infrastructure built on Vue, Node, and Docker to simulate real-world attacks.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80",
        link: "https://github.com/Flamechargerr/HackOps",
    },
    {
        id: "04",
        title: "Sentiment Analyzer",
        category: "Machine Learning (NLP)",
        year: "2023",
        description: "Financial text sentiment analysis utilizing a fine-tuned BERT model hosted via HuggingFace and PyTorch.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80",
        link: "https://github.com/Flamechargerr/VARtificial-Intelligence",
    }
]

import { ZoomParallax } from "./zoom-parallax"

const PARALLAX_IMAGES = [
    { src: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=1600&q=80", alt: "Deep Space Node" }, // Center
    { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80", alt: "Cyber Security Grid" },
    { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", alt: "Hardware Chip" },
    { src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80", alt: "Matrix Code" },
    { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80", alt: "Global Network" },
    { src: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80", alt: "Abstract Data" },
    { src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80", alt: "Console Output" },
]

export default function SelectedWorks() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Track scroll progress strictly across the section's sticky duration
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"] // CRITICAL: Only track animation while element is glued to top!
    })

    // Add a spring to smooth out the horizontal scroll
    const springScroll = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // We move the horizontal container based on the scroll progress
    const x = useTransform(springScroll, [0, 1], ["0%", `-${(PROJECTS.length - 1) * 100}vw`])

    return (
        <div className="relative w-full bg-lorenzo-dark">
            {/* 1. Cinematic Zoom Parallax Intro */}
            <div className="relative w-full">
                {/* Floating Section Title that reveals as images zoom */}
                <div className="absolute top-[40vh] left-0 w-full text-center z-[5] pointer-events-none">
                    <h2 className="text-[8vw] font-brier tracking-tighter text-white uppercase drop-shadow-2xl">
                        Featured Works
                    </h2>
                    <p className="font-mono text-lorenzo-accent/80 tracking-[0.4em] uppercase text-sm mt-4">
                        Case Studies & Architecture
                    </p>
                </div>
                <ZoomParallax images={PARALLAX_IMAGES} />
                {/* Seamless blend gradient into the horizontal track */}
                <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-lorenzo-dark to-transparent z-[10] pointer-events-none" />
            </div>

            {/* 2. Horizontal Scroll Project Showcase */}
            <section ref={containerRef} id="selected-works" className="relative bg-lorenzo-dark" style={{ height: `${PROJECTS.length * 100}vh` }}>

                {/* Background Noise Overlay for Cinematic Texture */}
                <div
                    className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />

                {/* The Sticky Container that stays on screen while scrolling down */}
                <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-lorenzo-dark z-10">

                    {/* Floating Global Section Header */}
                    <div className="absolute top-8 left-6 md:left-12 md:top-12 z-50 pointer-events-none mix-blend-difference">
                        <p className="text-[10px] md:text-xs font-bold font-roboto uppercase tracking-[0.2em] text-lorenzo-accent mb-2">Selected Works</p>
                        <div className="h-px w-12 bg-lorenzo-accent/50 mb-2"></div>
                    </div>

                    {/* The horizontally translating track containing all projects */}
                    <motion.div style={{ x }} className="flex h-screen w-[400vw]">
                        {PROJECTS.map((project, index) => {
                            return (
                                <div key={project.id} className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center p-0 md:p-4 lg:p-8">

                                    {/* Project Image Container */}
                                    <div className="relative w-full h-full md:h-[95vh] rounded-none md:rounded-3xl overflow-hidden group border-0 md:border border-white/5">
                                        <motion.div className="w-full h-full">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                                            />
                                        </motion.div>

                                        {/* Glassmorphism Text Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 lg:p-16 flex flex-col items-start justify-end pointer-events-auto">

                                            {/* Metadata Row */}
                                            <div className="flex flex-wrap items-center gap-4 mb-4 md:mb-6">
                                                <span className="text-3xl md:text-5xl font-mono text-lorenzo-accent/80 font-light leading-none">
                                                    {project.id}
                                                </span>
                                                <div className="h-px flex-1 bg-lorenzo-light/20 min-w-[40px] max-w-[100px]" />
                                                <span className="text-[10px] md:text-xs font-bold font-roboto tracking-[0.2em] uppercase text-lorenzo-light px-4 py-1.5 rounded-full border border-lorenzo-light/20 backdrop-blur-md bg-white/5">
                                                    {project.category}
                                                </span>
                                                <span className="text-sm md:text-base font-mono text-lorenzo-accent/60">
                                                    {project.year}
                                                </span>
                                            </div>

                                            {/* Editorial Oversized Title */}
                                            <h2 className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-brier leading-[0.8] tracking-tighter text-white uppercase mb-6 drop-shadow-2xl mix-blend-overlay">
                                                {project.title}
                                            </h2>

                                            {/* Description and Action */}
                                            <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
                                                <p className="text-sm md:text-lg text-lorenzo-light/80 max-w-xl font-light leading-relaxed">
                                                    {project.description}
                                                </p>

                                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                    <button className="group relative px-6 py-3 overflow-hidden rounded-full bg-lorenzo-accent text-lorenzo-dark font-bold font-roboto uppercase text-xs md:text-sm tracking-widest shrink-0 transition-transform hover:scale-105">
                                                        <span className="relative z-10 flex items-center gap-2">
                                                            View on GitHub
                                                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                </a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </motion.div>

                    {/* Scroll Progress Indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-12 z-50 pointer-events-none flex items-center gap-4">
                        <span className="text-[10px] font-bold font-roboto uppercase tracking-widest text-lorenzo-light/50">Scroll</span>
                        <div className="w-32 h-[2px] bg-lorenzo-light/20 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-lorenzo-accent outline-none"
                                style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
                            />
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}
