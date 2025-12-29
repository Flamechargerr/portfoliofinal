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
    }, [isOpen])

    return (
        <>
            {/* Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-3 px-6 py-4 border-2 border-lorenzo-accent text-lorenzo-accent font-bold uppercase tracking-wider text-sm hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Resume
            </motion.button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-4 md:inset-10 bg-lorenzo-dark border-2 border-lorenzo-accent/30 z-[101] flex flex-col overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 md:p-6 border-b border-lorenzo-accent/20">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-brier text-lorenzo-light uppercase">
                                        <span className="text-lorenzo-accent">ANAMAY</span> TRIPATHY
                                    </h3>
                                    <p className="text-sm text-lorenzo-light/50">Resume / CV</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <a
                                        href="/resume.pdf"
                                        download
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-lorenzo-accent text-lorenzo-dark font-bold text-sm uppercase tracking-wider hover:shadow-lg transition-all"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download PDF
                                    </a>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center border border-lorenzo-accent/30 text-lorenzo-accent hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Resume Content */}
                            <div className="flex-1 overflow-auto p-6 md:p-10">
                                <div className="max-w-4xl mx-auto space-y-8">
                                    {/* Contact Info */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-lorenzo-accent/5 border border-lorenzo-accent/20">
                                        <div>
                                            <div className="text-xs text-lorenzo-accent uppercase tracking-wider">Email</div>
                                            <div className="text-lorenzo-light text-sm">tripathy.anamay23@gmail.com</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-lorenzo-accent uppercase tracking-wider">Phone</div>
                                            <div className="text-lorenzo-light text-sm">+91 9877454747</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-lorenzo-accent uppercase tracking-wider">Location</div>
                                            <div className="text-lorenzo-light text-sm">Mumbai, India</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-lorenzo-accent uppercase tracking-wider">GitHub</div>
                                            <div className="text-lorenzo-light text-sm">github.com/Flamechargerr</div>
                                        </div>
                                    </div>

                                    {/* Summary */}
                                    <div>
                                        <h4 className="text-lg font-brier text-lorenzo-accent uppercase mb-4 flex items-center gap-2">
                                            <span className="w-8 h-px bg-lorenzo-accent" />
                                            PROFESSIONAL SUMMARY
                                        </h4>
                                        <p className="text-lorenzo-light/70 leading-relaxed">
                                            Data Science Engineering student at MIT Manipal with strong expertise in full-stack development,
                                            machine learning, and data analytics. Currently serving as Technical Head at YaanBarpe,
                                            leading development teams and architecting scalable solutions. Passionate about building
                                            innovative products that solve real-world problems.
                                        </p>
                                    </div>

                                    {/* Experience */}
                                    <div>
                                        <h4 className="text-lg font-brier text-lorenzo-accent uppercase mb-4 flex items-center gap-2">
                                            <span className="w-8 h-px bg-lorenzo-accent" />
                                            EXPERIENCE
                                        </h4>
                                        <div className="space-y-6">
                                            {[
                                                {
                                                    title: "Technical Head",
                                                    company: "YaanBarpe Startup",
                                                    period: "2024 - Present",
                                                    points: [
                                                        "Leading development team of 5+ members",
                                                        "Architected scalable MVP using React, Node.js, PostgreSQL",
                                                        "Implemented CI/CD pipelines and DevOps practices",
                                                    ],
                                                },
                                                {
                                                    title: "Software Engineering Intern",
                                                    company: "Intellect Design Arena",
                                                    period: "2024",
                                                    points: [
                                                        "Built fintech data visualization dashboards",
                                                        "Developed RESTful APIs for enterprise applications",
                                                        "Collaborated with cross-functional teams on product delivery",
                                                    ],
                                                },
                                            ].map((job, i) => (
                                                <div key={i} className="border-l-2 border-lorenzo-accent/30 pl-4">
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                                        <div className="font-bold text-lorenzo-light uppercase">{job.title}</div>
                                                        <div className="text-sm text-lorenzo-accent">{job.period}</div>
                                                    </div>
                                                    <div className="text-sm text-lorenzo-light/50 mb-2">{job.company}</div>
                                                    <ul className="space-y-1">
                                                        {job.points.map((point, j) => (
                                                            <li key={j} className="text-sm text-lorenzo-light/70 flex items-start gap-2">
                                                                <span className="text-lorenzo-accent mt-1">•</span>
                                                                {point}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Education */}
                                    <div>
                                        <h4 className="text-lg font-brier text-lorenzo-accent uppercase mb-4 flex items-center gap-2">
                                            <span className="w-8 h-px bg-lorenzo-accent" />
                                            EDUCATION
                                        </h4>
                                        <div className="border-l-2 border-lorenzo-accent/30 pl-4">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                                <div className="font-bold text-lorenzo-light uppercase">B.Tech Data Science Engineering</div>
                                                <div className="text-sm text-lorenzo-accent">2023 - 2027</div>
                                            </div>
                                            <div className="text-sm text-lorenzo-light/50 mb-1">MIT Manipal</div>
                                            <div className="text-sm text-lorenzo-light/70">Class Representative | E-Cell Executive</div>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div>
                                        <h4 className="text-lg font-brier text-lorenzo-accent uppercase mb-4 flex items-center gap-2">
                                            <span className="w-8 h-px bg-lorenzo-accent" />
                                            TECHNICAL SKILLS
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {["JavaScript", "Python", "React", "Next.js", "Node.js", "TypeScript", "MongoDB", "SQL", "TensorFlow", "Pandas", "Docker", "Git", "AWS", "Figma"].map((skill) => (
                                                <span key={skill} className="px-3 py-1 border border-lorenzo-accent/30 text-lorenzo-accent text-sm">
                                                    {skill}
                                                </span>
                                            ))}
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
