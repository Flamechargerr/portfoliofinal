"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ResumeModal() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false)
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    return (
        <>
            {/* Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-lorenzo-accent text-lorenzo-dark font-brier uppercase tracking-widest text-sm hover:scale-105 hover:shadow-xl hover:shadow-lorenzo-accent/20 transition-all rounded-sm"
                whileTap={{ scale: 0.95 }}
            >
                <span className="font-bold">View Selected Profile</span>
            </motion.button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Cinematic Backdrop */}
                        <motion.div
                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed inset-0 bg-lorenzo-dark/90 z-[100]"
                            onClick={() => setIsOpen(false)}
                        >
                            {/* Noise Overlay */}
                            <div
                                className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                                }}
                            />
                        </motion.div>

                        {/* Full-Screen Content Wrapper */}
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.98 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                            className="fixed inset-0 md:inset-6 lg:inset-12 z-[101] flex flex-col"
                            style={{ background: 'transparent', maxHeight: '100dvh' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Floating Header */}
                            <div className="flex items-center justify-between p-6 shrink-0 relative z-20">
                                <div>
                                    <h3 className="text-3xl md:text-5xl font-brier text-white uppercase tracking-tighter">
                                        <span className="text-lorenzo-accent">ANAMAY</span> TRIPATHY
                                    </h3>
                                    <p className="text-sm font-roboto tracking-widest uppercase text-lorenzo-light/60 mt-2">Data Science Engineer</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <a
                                        href="/resume.pdf"
                                        download="Anamay_Tripathy_Resume.pdf"
                                        className="hidden md:inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-roboto font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-md"
                                    >
                                        Download PDF
                                    </a>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-lorenzo-accent hover:text-lorenzo-dark hover:border-lorenzo-accent transition-all rounded-full backdrop-blur-md"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Editorial Scrollable Content — explicit height so scroll actually works */}
                            <div
                                className="overflow-y-auto overscroll-contain px-6 pb-24 md:px-12 lg:px-24 relative z-10"
                                style={{
                                    WebkitOverflowScrolling: 'touch',
                                    flex: '1 1 0',
                                    minHeight: 0,
                                }}
                            >
                                <div className="max-w-[1400px] mx-auto mt-12 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-32">

                                    {/* Left Content Column (Main Info) */}
                                    <div className="flex-1 flex flex-col gap-8">

                                        {/* Summary - Glass Panel */}
                                        <section className="p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md hover:bg-white/[0.04] transition-colors">
                                            <p className="text-lg md:text-2xl font-light text-white/90 leading-relaxed tracking-tight">
                                                Final-year Data Science Engineering student and Technical Head at <span className="font-brier text-lorenzo-accent uppercase tracking-normal font-normal">YBiee (Student Startup)</span>.
                                                Specializing in <span className="font-brier text-lorenzo-accent uppercase tracking-normal font-normal">machine learning</span>, <span className="font-brier text-lorenzo-accent uppercase tracking-normal font-normal">quantitative research</span>, and full-stack systems.
                                            </p>
                                        </section>

                                        {/* Experience Section - Glass Panel */}
                                        <section className="p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                                            <div className="flex items-center justify-between mb-10">
                                                <h4 className="text-xs font-bold font-roboto tracking-[0.3em] text-lorenzo-accent uppercase">Experience</h4>
                                                <div className="h-px flex-1 bg-gradient-to-r from-lorenzo-accent/20 to-transparent ml-6" />
                                            </div>

                                            <div className="space-y-12">
                                                {/* J.P. Morgan */}
                                                <div className="group relative">
                                                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3">
                                                        <h3 className="text-xl md:text-3xl font-bold font-roboto text-white group-hover:text-lorenzo-accent transition-colors tracking-tight">Quantitative Research Analyst (Simulation)</h3>
                                                        <div className="text-xs font-roboto tracking-widest text-white/40 uppercase mt-2 md:mt-0 font-bold border border-white/10 px-3 py-1 rounded-full">Jun 2026</div>
                                                    </div>
                                                    <div className="text-sm md:text-base font-brier text-lorenzo-accent mb-6 uppercase tracking-widest">J.P. Morgan Quantitative Research</div>
                                                    <ul className="space-y-4">
                                                        {["Modeled natural gas price dynamics and built a commodity storage contract pricing engine in Python, incorporating seasonal forecasting and contract valuation", "Developed a credit risk model using Logistic Regression; engineered FICO score bucketing via quantization to assess default probability across a loan portfolio"].map((point, i) => (
                                                            <li key={i} className="text-sm md:text-base text-white/70 font-light flex items-start gap-4 leading-relaxed">
                                                                <span className="text-lorenzo-accent mt-1.5 opacity-50">✦</span>
                                                                {point}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="h-px w-full bg-white/5" />

                                                {/* Intellect Design Arena */}
                                                <div className="group relative">
                                                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3">
                                                        <h3 className="text-xl md:text-3xl font-bold font-roboto text-white group-hover:text-lorenzo-accent transition-colors tracking-tight">Software Engineering Intern</h3>
                                                        <div className="text-xs font-roboto tracking-widest text-white/40 uppercase mt-2 md:mt-0 font-bold border border-white/10 px-3 py-1 rounded-full">June 2025 — July 2025</div>
                                                    </div>
                                                    <div className="text-sm md:text-base font-brier text-lorenzo-accent mb-6 uppercase tracking-widest">Intellect Design Arena Ltd (FinTech)</div>
                                                    <ul className="space-y-4">
                                                        {["Built EMI collection agent management platform integrating data pipelines and analytics dashboards using Python, SQL, and Apache Spark", "Reduced manual reporting effort by ~40% for teams managing 10,000+ loan accounts", "Designed KPI dashboards tracking repayment behavior and agent efficiency, and implemented CI/CD pipelines via GitHub Actions"].map((point, i) => (
                                                            <li key={i} className="text-sm md:text-base text-white/70 font-light flex items-start gap-4 leading-relaxed">
                                                                <span className="text-lorenzo-accent mt-1.5 opacity-50">✦</span>
                                                                {point}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="h-px w-full bg-white/5" />

                                                {/* Google Developer Program */}
                                                <div className="group relative">
                                                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3">
                                                        <h3 className="text-xl md:text-3xl font-bold font-roboto text-white group-hover:text-lorenzo-accent transition-colors tracking-tight">Premium Tier Developer (AI Pro)</h3>
                                                        <div className="text-xs font-roboto tracking-widest text-white/40 uppercase mt-2 md:mt-0 font-bold border border-white/10 px-3 py-1 rounded-full">2021 — Present</div>
                                                    </div>
                                                    <div className="text-sm md:text-base font-brier text-lorenzo-accent mb-6 uppercase tracking-widest">Google Developer Program</div>
                                                    <ul className="space-y-4">
                                                        {["Contributed to real-world data collection and geo-based task workflows supporting Google Maps and Search quality at scale as an early Google Taskmate user", "Selected for Premium Tier (AI Pro) and received early access to Gemini Pro LLMs and Project IDX to prototype conversational AI interfaces"].map((point, i) => (
                                                            <li key={i} className="text-sm md:text-base text-white/70 font-light flex items-start gap-4 leading-relaxed">
                                                                <span className="text-lorenzo-accent mt-1.5 opacity-50">✦</span>
                                                                {point}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="h-px w-full bg-white/5" />

                                                {/* YBiee */}
                                                <div className="group relative">
                                                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3">
                                                        <h3 className="text-xl md:text-3xl font-bold font-roboto text-white group-hover:text-lorenzo-accent transition-colors tracking-tight">Technical Head</h3>
                                                        <div className="text-xs font-roboto tracking-widest text-white/40 uppercase mt-2 md:mt-0 font-bold border border-white/10 px-3 py-1 rounded-full">2024 — Present</div>
                                                    </div>
                                                    <div className="text-sm md:text-base font-brier text-lorenzo-accent mb-6 uppercase tracking-widest">YBiee (Student Startup) / YaanBarpe</div>
                                                    <ul className="space-y-4">
                                                        {["Leading technical development and architecting scalable MVP solutions using React, Next.js, Node.js, and PostgreSQL", "Managing a development team, establishing Agile development practices, and building core product interfaces"].map((point, i) => (
                                                            <li key={i} className="text-sm md:text-base text-white/70 font-light flex items-start gap-4 leading-relaxed">
                                                                <span className="text-lorenzo-accent mt-1.5 opacity-50">✦</span>
                                                                {point}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    {/* Right Content Column (Metadata & Details) */}
                                    <div className="w-full lg:w-[400px] flex flex-col gap-6 shrink-0 lg:sticky lg:top-0 lg:h-max">

                                        {/* Core Stack Block */}
                                        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                                            <h4 className="text-xs font-bold font-roboto tracking-[0.2em] text-lorenzo-accent uppercase mb-8">Technical Arsenal</h4>
                                            <div className="flex flex-col gap-6">
                                                {[
                                                    { cat: "Languages", tools: "Python, JavaScript, TypeScript, Java, SQL" },
                                                    { cat: "Web & APIs", tools: "React, Next.js, Node.js, Flask, REST APIs" },
                                                    { cat: "Data & ML", tools: "Apache Spark, FAISS, PyTorch, scikit-learn, NLP" },
                                                    { cat: "Tools", tools: "Git, GitHub Actions, Docker, Firebase, PostgreSQL, MongoDB" }
                                                ].map((t, i) => (
                                                    <div key={i}>
                                                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{t.cat}</div>
                                                        <div className="text-base text-white/90">{t.tools}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Education Block */}
                                        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                                            <h4 className="text-xs font-bold font-roboto tracking-[0.2em] text-lorenzo-accent uppercase mb-8">Education & Activities</h4>

                                            <div className="text-2xl font-brier text-white uppercase mb-2">B.Tech</div>
                                            <div className="text-sm text-lorenzo-light/70 mb-4">Data Science Engineering</div>
                                            <div className="text-base text-lorenzo-accent mb-6">MIT Manipal (2023-2027)</div>

                                            <div className="flex flex-wrap gap-2">
                                                {["YBiee (Student Startup)", "TechTatva", "The Data Alchemists", "Enactus", "IEEE", "MIST"].map((role, i) => (
                                                    <span key={i} className="px-3 py-1 bg-white/5 text-white/80 text-[10px] uppercase tracking-wider rounded-md border border-white/10">
                                                        {role}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Links Block */}
                                        <div className="flex flex-col gap-4 mt-auto">
                                            <a href="mailto:tripathy.anamay23@gmail.com" className="group flex items-center justify-between p-4 border border-white/10 rounded-xl hover:border-lorenzo-accent hover:bg-lorenzo-accent/5 transition-all">
                                                <span className="text-sm font-bold font-roboto uppercase tracking-widest text-white/70 group-hover:text-lorenzo-accent">Email</span>
                                                <span className="text-white/40 group-hover:text-white transition-colors">↗</span>
                                            </a>
                                            <a href="https://github.com/Flamechargerr" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 border border-white/10 rounded-xl hover:border-lorenzo-accent hover:bg-lorenzo-accent/5 transition-all">
                                                <span className="text-sm font-bold font-roboto uppercase tracking-widest text-white/70 group-hover:text-lorenzo-accent">GitHub</span>
                                                <span className="text-white/40 group-hover:text-white transition-colors">↗</span>
                                            </a>
                                            <a href="https://linkedin.com/in/anamay-tripathy" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 border border-white/10 rounded-xl hover:border-lorenzo-accent hover:bg-lorenzo-accent/5 transition-all">
                                                <span className="text-sm font-bold font-roboto uppercase tracking-widest text-white/70 group-hover:text-lorenzo-accent">LinkedIn</span>
                                                <span className="text-white/40 group-hover:text-white transition-colors">↗</span>
                                            </a>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
