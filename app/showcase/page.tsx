"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

// Visual Effects
import { Magnetic, ParallaxMouse, TextScramble, GlitchText, TiltCard, MorphingBlob, FloatingParticles, RevealOnScroll } from "@/components/visual-effects"

// Profile Card
import ProfileCard from "@/components/profile-card"

// Advanced Components
import { InteractiveTimeline, GitHub3DContributions, SkillsConstellation, AnimatedMetrics, TestimonialCarousel } from "@/components/advanced-components"

// Gamification
import { TechQuiz, BadgesDisplay, useAchievements, SnakeGame, PointsDisplay, usePointsSystem } from "@/components/gamification"

// Social Components
import { Guestbook, CollaborativeCanvas, PrintResume, ContactScheduling, PremiumButton, AnimatedToggle } from "@/components/social-components"

// Interactive Features
import { ThemeSwitcher, SoundToggle, ReadingTime } from "@/components/interactive-features"

// Stepper
import Stepper from "@/components/stepper"

// Sample Data
const timelineItems = [
    { id: "1", year: "2023", title: "Started at MIT Manipal", description: "Began my journey in Data Science Engineering at Manipal Institute of Technology.", icon: "🎓" },
    { id: "2", year: "2024", title: "Intellect Internship", description: "Software Engineering Intern at Intellect Design Arena, building fintech solutions.", icon: "💼" },
    { id: "3", year: "2024", title: "YaanBarpe Technical Head", description: "Leading the technical team at a startup, architecting scalable solutions.", icon: "🚀" },
    { id: "4", year: "2025", title: "Open Source Contributions", description: "570+ commits on GitHub, contributing to various open source projects.", icon: "💻" },
    { id: "5", year: "Future", title: "World Domination 🌍", description: "Building the next big thing in AI and technology.", icon: "🔮" }
]

const skills = [
    { name: "React", level: 5, category: "Frontend" },
    { name: "Next.js", level: 5, category: "Frontend" },
    { name: "TypeScript", level: 4, category: "Language" },
    { name: "Python", level: 5, category: "Language" },
    { name: "Node.js", level: 4, category: "Backend" },
    { name: "TensorFlow", level: 3, category: "ML" },
    { name: "Docker", level: 3, category: "DevOps" },
    { name: "AWS", level: 3, category: "Cloud" }
]

const metrics = [
    { label: "GitHub Commits", value: 570, suffix: "+", icon: "💻" },
    { label: "Projects Completed", value: 15, suffix: "+", icon: "🚀" },
    { label: "Certifications", value: 8, icon: "📜" },
    { label: "GitHub Stars", value: 75, suffix: "+", icon: "⭐" }
]

const testimonials = [
    { name: "Tech Lead", role: "Senior Engineer", company: "Intellect Design", content: "Anamay showed exceptional problem-solving skills and quickly adapted to our fintech stack. His work on the dashboard was outstanding." },
    { name: "Startup Founder", role: "CEO", company: "YaanBarpe", content: "An incredible technical leader who turned our vision into reality. His full-stack expertise is remarkable for his experience level." },
    { name: "Professor", role: "Faculty", company: "MIT Manipal", content: "One of the most dedicated students I've mentored. His passion for data science and AI is truly inspiring." }
]

const stepperSteps = [
    { id: 1, title: "Discovery", description: "Understanding requirements" },
    { id: 2, title: "Design", description: "Creating wireframes" },
    { id: 3, title: "Development", description: "Building the solution" },
    { id: 4, title: "Testing", description: "Quality assurance" },
    { id: 5, title: "Launch", description: "Going live" }
]

export default function ShowcasePage() {
    const [currentStep, setCurrentStep] = useState(3)
    const [toggleOn, setToggleOn] = useState(false)
    const { badges } = useAchievements()
    const { points } = usePointsSystem()

    return (
        <main className="min-h-screen bg-lorenzo-dark relative overflow-hidden">
            {/* Floating Particles Background */}
            <FloatingParticles count={50} />

            {/* Morphing Blob */}
            <div className="fixed top-20 right-0 w-96 h-96 opacity-30 pointer-events-none">
                <MorphingBlob />
            </div>

            {/* Navigation */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-lorenzo-dark/80 backdrop-blur-sm border-b border-white/5">
                <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-brier text-lorenzo-light uppercase">
                        ANAMAY<span className="text-lorenzo-accent">.</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <PointsDisplay points={points} />
                        <ThemeSwitcher />
                        <SoundToggle />
                    </div>
                </div>
            </header>

            <div className="relative z-10 pt-24 pb-16 px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto">
                    {/* Page Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-20"
                    >
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="w-12 h-px bg-lorenzo-accent" />
                            <span className="text-xs font-bold uppercase tracking-widest text-lorenzo-accent">
                                50 WOW FEATURES
                            </span>
                            <div className="w-12 h-px bg-lorenzo-accent" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-brier uppercase leading-[0.9] tracking-tight mb-6">
                            <TextScramble text="COMPONENT" className="text-lorenzo-light block" />
                            <GlitchText text="SHOWCASE" className="text-lorenzo-accent block" />
                        </h1>
                        <p className="text-lorenzo-light/60 max-w-2xl mx-auto">
                            Explore all the interactive components and visual effects integrated into this portfolio.
                            Try pressing <kbd className="px-2 py-1 bg-white/10 rounded text-lorenzo-accent">⌘K</kbd> to open the command palette!
                        </p>
                    </motion.div>

                    {/* Section 1: Profile Card */}
                    <section className="mb-24">
                        <RevealOnScroll>
                            <h2 className="text-2xl font-brier text-lorenzo-accent uppercase mb-8 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-lorenzo-accent/20 flex items-center justify-center text-sm">1</span>
                                3D Profile Card
                            </h2>
                        </RevealOnScroll>
                        <div className="flex justify-center">
                            <ProfileCard />
                        </div>
                    </section>

                    {/* Section 2: Visual Effects */}
                    <section className="mb-24">
                        <RevealOnScroll>
                            <h2 className="text-2xl font-brier text-lorenzo-accent uppercase mb-8 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-lorenzo-accent/20 flex items-center justify-center text-sm">2</span>
                                Visual Effects
                            </h2>
                        </RevealOnScroll>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Magnetic>
                                <div className="p-8 bg-white/5 border border-white/10 rounded-xl text-center cursor-pointer">
                                    <h3 className="text-xl font-bold text-white mb-2">Magnetic Effect</h3>
                                    <p className="text-white/50 text-sm">Move your cursor near me!</p>
                                </div>
                            </Magnetic>

                            <ParallaxMouse intensity={30}>
                                <div className="p-8 bg-white/5 border border-white/10 rounded-xl text-center">
                                    <h3 className="text-xl font-bold text-white mb-2">Parallax Mouse</h3>
                                    <p className="text-white/50 text-sm">I follow your cursor</p>
                                </div>
                            </ParallaxMouse>

                            <TiltCard className="group">
                                <div className="p-8 bg-white/5 border border-white/10 rounded-xl text-center">
                                    <h3 className="text-xl font-bold text-white mb-2">3D Tilt Card</h3>
                                    <p className="text-white/50 text-sm">Tilt me with your cursor</p>
                                </div>
                            </TiltCard>
                        </div>
                    </section>

                    {/* Section 3: Interactive Timeline */}
                    <section className="mb-24">
                        <RevealOnScroll>
                            <h2 className="text-2xl font-brier text-lorenzo-accent uppercase mb-8 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-lorenzo-accent/20 flex items-center justify-center text-sm">3</span>
                                Interactive Timeline
                            </h2>
                        </RevealOnScroll>
                        <InteractiveTimeline items={timelineItems} />
                    </section>

                    {/* Section 4: GitHub 3D Contributions */}
                    <section className="mb-24">
                        <RevealOnScroll>
                            <h2 className="text-2xl font-brier text-lorenzo-accent uppercase mb-8 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-lorenzo-accent/20 flex items-center justify-center text-sm">4</span>
                                GitHub 3D Contributions
                            </h2>
                        </RevealOnScroll>
                        <div className="max-w-xl mx-auto">
                            <GitHub3DContributions />
                        </div>
                    </section>

                    {/* Section 5: Skills Constellation */}
                    <section className="mb-24">
                        <RevealOnScroll>
                            <h2 className="text-2xl font-brier text-lorenzo-accent uppercase mb-8 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-lorenzo-accent/20 flex items-center justify-center text-sm">5</span>
                                Skills Constellation
                            </h2>
                        </RevealOnScroll>
                        <SkillsConstellation skills={skills} />
                    </section>

                    {/* Section 6: Animated Metrics */}
                    <section className="mb-24">
                        <RevealOnScroll>
                            <h2 className="text-2xl font-brier text-lorenzo-accent uppercase mb-8 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-lorenzo-accent/20 flex items-center justify-center text-sm">6</span>
                                Animated Metrics
                            </h2>
                        </RevealOnScroll>
                        <AnimatedMetrics metrics={metrics} />
                    </section>

                    {/* Section 7: Testimonials */}
                    <section className="mb-24">
                        <RevealOnScroll>
                            <h2 className="text-2xl font-brier text-lorenzo-accent uppercase mb-8 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-lorenzo-accent/20 flex items-center justify-center text-sm">7</span>
                                Testimonial Carousel
                            </h2>
                        </RevealOnScroll>
                        <TestimonialCarousel testimonials={testimonials} />
                    </section>

                    {/* Section 8: Stepper */}
                    <section className="mb-24">
                        <RevealOnScroll>
                            <h2 className="text-2xl font-brier text-lorenzo-accent uppercase mb-8 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-lorenzo-accent/20 flex items-center justify-center text-sm">8</span>
                                Progress Stepper
                            </h2>
                        </RevealOnScroll>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                            <Stepper
                                steps={stepperSteps}
                                currentStep={currentStep}
                                onStepClick={(id) => setCurrentStep(id)}
                            />
                            <div className="mt-8 flex justify-center gap-4">
                                <button
                                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                                    className="px-6 py-2 border border-lorenzo-accent text-lorenzo-accent hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-colors"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                                    className="px-6 py-2 bg-lorenzo-accent text-lorenzo-dark hover:bg-lorenzo-accent/90 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Section 9: Tech Quiz */}
                    <section className="mb-24">
                        <RevealOnScroll>
                            <h2 className="text-2xl font-brier text-lorenzo-accent uppercase mb-8 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-lorenzo-accent/20 flex items-center justify-center text-sm">9</span>
                                Tech Quiz Game
                            </h2>
                        </RevealOnScroll>
                        <TechQuiz />
                    </section>

                    {/* Section 10: Snake Game */}
                    <section className="mb-24">
                        <RevealOnScroll>
                            <h2 className="text-2xl font-brier text-lorenzo-accent uppercase mb-8 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-lorenzo-accent/20 flex items-center justify-center text-sm">10</span>
                                Mini Snake Game
                            </h2>
                        </RevealOnScroll>
                        <SnakeGame />
                    </section>

                    {/* Section 11: Achievement Badges */}
                    <section className="mb-24">
                        <RevealOnScroll>
                            <h2 className="text-2xl font-brier text-lorenzo-accent uppercase mb-8 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-lorenzo-accent/20 flex items-center justify-center text-sm">11</span>
                                Achievement Badges
                            </h2>
                        </RevealOnScroll>
                        <BadgesDisplay badges={badges} />
                    </section>

                    {/* Section 12: Collaborative Canvas */}
                    <section className="mb-24">
                        <RevealOnScroll>
                            <h2 className="text-2xl font-brier text-lorenzo-accent uppercase mb-8 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-lorenzo-accent/20 flex items-center justify-center text-sm">12</span>
                                Collaborative Canvas
                            </h2>
                        </RevealOnScroll>
                        <CollaborativeCanvas />
                    </section>

                    {/* Section 13: Guestbook */}
                    <section className="mb-24">
                        <RevealOnScroll>
                            <h2 className="text-2xl font-brier text-lorenzo-accent uppercase mb-8 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-lorenzo-accent/20 flex items-center justify-center text-sm">13</span>
                                Guestbook
                            </h2>
                        </RevealOnScroll>
                        <Guestbook />
                    </section>

                    {/* Section 14: Contact Scheduling */}
                    <section className="mb-24">
                        <RevealOnScroll>
                            <h2 className="text-2xl font-brier text-lorenzo-accent uppercase mb-8 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-lorenzo-accent/20 flex items-center justify-center text-sm">14</span>
                                Contact Scheduling
                            </h2>
                        </RevealOnScroll>
                        <ContactScheduling />
                    </section>

                    {/* Section 15: Premium Buttons */}
                    <section className="mb-24">
                        <RevealOnScroll>
                            <h2 className="text-2xl font-brier text-lorenzo-accent uppercase mb-8 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-lorenzo-accent/20 flex items-center justify-center text-sm">15</span>
                                Micro-interactions
                            </h2>
                        </RevealOnScroll>
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <PremiumButton>Click Me</PremiumButton>
                            <PrintResume />
                            <div className="flex items-center gap-3">
                                <span className="text-white/50">Toggle:</span>
                                <AnimatedToggle isOn={toggleOn} onToggle={() => setToggleOn(!toggleOn)} />
                            </div>
                        </div>
                    </section>

                    {/* Back to Home */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-lorenzo-accent text-lorenzo-accent font-bold uppercase tracking-wider hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Portfolio
                        </Link>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
