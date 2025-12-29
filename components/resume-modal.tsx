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
                className="inline-flex items-center gap-3 px-6 py-4 border-2 border-lorenzo-accent text-lorenzo-accent font-bold uppercase tracking-wider text-sm hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all rounded-lg"
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
                            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100]"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-4 md:inset-8 lg:inset-12 bg-lorenzo-dark border-2 border-lorenzo-accent/30 z-[101] flex flex-col rounded-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header - Fixed */}
                            <div className="flex items-center justify-between p-4 md:p-6 border-b border-lorenzo-accent/20 bg-lorenzo-dark/95 backdrop-blur-sm shrink-0">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-brier text-lorenzo-light uppercase">
                                        <span className="text-lorenzo-accent">ANAMAY</span> TRIPATHY
                                    </h3>
                                    <p className="text-sm text-lorenzo-light/50">Resume / CV • Data Science Engineer</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <a
                                        href="/resume.pdf"
                                        download="Anamay_Tripathy_Resume.pdf"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-lorenzo-accent text-lorenzo-dark font-bold text-sm uppercase tracking-wider rounded-lg hover:shadow-lg hover:shadow-lorenzo-accent/30 transition-all"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download PDF
                                    </a>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center border border-lorenzo-accent/30 text-lorenzo-accent hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all rounded-lg"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Resume Content - Scrollable */}
                            <div className="flex-1 overflow-y-auto overscroll-contain p-6 md:p-10" style={{ WebkitOverflowScrolling: 'touch' }}>
                                <div className="max-w-4xl mx-auto space-y-10">
                                    {/* Contact Info */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-br from-lorenzo-accent/10 to-lorenzo-accent/5 border border-lorenzo-accent/20 rounded-xl">
                                        <div>
                                            <div className="text-xs text-lorenzo-accent uppercase tracking-wider font-bold mb-1">Email</div>
                                            <div className="text-lorenzo-light text-sm">tripathy.anamay23@gmail.com</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-lorenzo-accent uppercase tracking-wider font-bold mb-1">Phone</div>
                                            <div className="text-lorenzo-light text-sm">+91 9877454747</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-lorenzo-accent uppercase tracking-wider font-bold mb-1">Location</div>
                                            <div className="text-lorenzo-light text-sm">Mumbai, India</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-lorenzo-accent uppercase tracking-wider font-bold mb-1">Portfolio</div>
                                            <div className="text-lorenzo-light text-sm">anamay.vercel.app</div>
                                        </div>
                                    </div>

                                    {/* Professional Summary */}
                                    <div>
                                        <h4 className="text-lg font-brier text-lorenzo-accent uppercase mb-4 flex items-center gap-3">
                                            <span className="w-10 h-px bg-gradient-to-r from-lorenzo-accent to-transparent" />
                                            PROFESSIONAL SUMMARY
                                        </h4>
                                        <p className="text-lorenzo-light/80 leading-relaxed text-base">
                                            Passionate Data Science Engineering student at MIT Manipal with strong expertise in full-stack development,
                                            machine learning, and data analytics. Currently serving as Technical Head at YaanBarpe startup,
                                            leading development teams and architecting scalable solutions. Certified by Meta, IBM, and Google
                                            in data analysis and AI. Passionate about building innovative products that solve real-world problems
                                            and creating impactful user experiences.
                                        </p>
                                    </div>

                                    {/* Experience */}
                                    <div>
                                        <h4 className="text-lg font-brier text-lorenzo-accent uppercase mb-6 flex items-center gap-3">
                                            <span className="w-10 h-px bg-gradient-to-r from-lorenzo-accent to-transparent" />
                                            PROFESSIONAL EXPERIENCE
                                        </h4>
                                        <div className="space-y-8">
                                            {[
                                                {
                                                    title: "Technical Head",
                                                    company: "YaanBarpe Startup",
                                                    period: "2024 - Present",
                                                    type: "Leadership",
                                                    points: [
                                                        "Leading a high-performing development team of 5+ engineers",
                                                        "Architected scalable MVP using React, Next.js, Node.js, and PostgreSQL",
                                                        "Implemented CI/CD pipelines with GitHub Actions and automated testing",
                                                        "Designed system architecture handling 10K+ concurrent users",
                                                        "Managed Agile sprints and product roadmap development",
                                                    ],
                                                },
                                                {
                                                    title: "Data Analyst & Web Dev Intern",
                                                    company: "Intellect Design Arena",
                                                    period: "Summer 2024",
                                                    type: "Internship",
                                                    points: [
                                                        "Built interactive fintech data visualization dashboards using React and D3.js",
                                                        "Developed RESTful APIs for enterprise banking applications",
                                                        "Analyzed large datasets using Python, Pandas, and SQL",
                                                        "Collaborated with cross-functional teams on product delivery",
                                                        "Improved dashboard performance by 40% through optimization",
                                                    ],
                                                },
                                            ].map((job, i) => (
                                                <div key={i} className="relative pl-6 border-l-2 border-lorenzo-accent/30">
                                                    <div className="absolute left-0 top-1 w-3 h-3 bg-lorenzo-accent rounded-full -translate-x-[7px]" />
                                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                                                        <div>
                                                            <div className="font-bold text-lorenzo-light uppercase text-lg">{job.title}</div>
                                                            <div className="text-lorenzo-accent text-sm font-bold">{job.company}</div>
                                                        </div>
                                                        <div className="flex items-center gap-3 mt-2 md:mt-0">
                                                            <span className="px-3 py-1 bg-lorenzo-accent/10 text-lorenzo-accent text-xs font-bold uppercase rounded-full">
                                                                {job.type}
                                                            </span>
                                                            <span className="text-sm text-lorenzo-light/50">{job.period}</span>
                                                        </div>
                                                    </div>
                                                    <ul className="space-y-2 mt-4">
                                                        {job.points.map((point, j) => (
                                                            <li key={j} className="text-sm text-lorenzo-light/70 flex items-start gap-3">
                                                                <span className="text-lorenzo-accent mt-1.5 text-xs">▸</span>
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
                                        <h4 className="text-lg font-brier text-lorenzo-accent uppercase mb-6 flex items-center gap-3">
                                            <span className="w-10 h-px bg-gradient-to-r from-lorenzo-accent to-transparent" />
                                            EDUCATION
                                        </h4>
                                        <div className="relative pl-6 border-l-2 border-lorenzo-accent/30">
                                            <div className="absolute left-0 top-1 w-3 h-3 bg-lorenzo-accent rounded-full -translate-x-[7px]" />
                                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                                                <div>
                                                    <div className="font-bold text-lorenzo-light uppercase text-lg">B.Tech Data Science Engineering</div>
                                                    <div className="text-lorenzo-accent text-sm font-bold">MIT Manipal (Manipal Institute of Technology)</div>
                                                </div>
                                                <span className="text-sm text-lorenzo-light/50 mt-2 md:mt-0">2023 - 2027</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                <span className="px-3 py-1 bg-lorenzo-accent/10 text-lorenzo-accent text-xs font-bold uppercase rounded-full">Class Representative</span>
                                                <span className="px-3 py-1 bg-lorenzo-accent/10 text-lorenzo-accent text-xs font-bold uppercase rounded-full">E-Cell Executive</span>
                                                <span className="px-3 py-1 bg-lorenzo-accent/10 text-lorenzo-accent text-xs font-bold uppercase rounded-full">Tech Club Member</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Certifications */}
                                    <div>
                                        <h4 className="text-lg font-brier text-lorenzo-accent uppercase mb-6 flex items-center gap-3">
                                            <span className="w-10 h-px bg-gradient-to-r from-lorenzo-accent to-transparent" />
                                            CERTIFICATIONS
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                { name: "Meta Data Analyst Professional", issuer: "Meta", year: "2024", icon: "📊" },
                                                { name: "IBM GenAI Professional", issuer: "IBM", year: "2024", icon: "🤖" },
                                                { name: "Google Analytics Certification", issuer: "Google", year: "2024", icon: "📈" },
                                                { name: "Python for Data Science", issuer: "Coursera", year: "2023", icon: "🐍" },
                                                { name: "Machine Learning Specialization", issuer: "Stanford Online", year: "2024", icon: "🧠" },
                                                { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2024", icon: "☁️" },
                                            ].map((cert, i) => (
                                                <div key={i} className="flex items-center gap-4 p-4 bg-lorenzo-light/5 border border-lorenzo-light/10 rounded-xl hover:border-lorenzo-accent/30 transition-colors">
                                                    <span className="text-2xl">{cert.icon}</span>
                                                    <div className="flex-1">
                                                        <div className="font-bold text-lorenzo-light text-sm">{cert.name}</div>
                                                        <div className="text-lorenzo-light/50 text-xs">{cert.issuer} • {cert.year}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Technical Skills */}
                                    <div>
                                        <h4 className="text-lg font-brier text-lorenzo-accent uppercase mb-6 flex items-center gap-3">
                                            <span className="w-10 h-px bg-gradient-to-r from-lorenzo-accent to-transparent" />
                                            TECHNICAL SKILLS
                                        </h4>
                                        <div className="space-y-4">
                                            {[
                                                { category: "Languages", skills: ["JavaScript", "Python", "TypeScript", "Java", "SQL", "HTML/CSS"] },
                                                { category: "Frontend", skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Redux"] },
                                                { category: "Backend", skills: ["Node.js", "Express", "Flask", "FastAPI", "REST APIs", "GraphQL"] },
                                                { category: "Data Science", skills: ["Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Tableau", "Power BI"] },
                                                { category: "DevOps & Cloud", skills: ["Docker", "AWS", "Git/GitHub", "CI/CD", "Vercel", "MongoDB"] },
                                            ].map((group, i) => (
                                                <div key={i}>
                                                    <div className="text-xs text-lorenzo-accent uppercase tracking-wider font-bold mb-2">{group.category}</div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {group.skills.map((skill) => (
                                                            <span key={skill} className="px-3 py-1.5 bg-lorenzo-dark border border-lorenzo-accent/30 text-lorenzo-light text-sm rounded-lg hover:border-lorenzo-accent hover:bg-lorenzo-accent/10 transition-colors">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Projects */}
                                    <div>
                                        <h4 className="text-lg font-brier text-lorenzo-accent uppercase mb-6 flex items-center gap-3">
                                            <span className="w-10 h-px bg-gradient-to-r from-lorenzo-accent to-transparent" />
                                            KEY PROJECTS
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                { name: "Crime Connect FBI", desc: "FBI-themed crime management dashboard with role-based access", tech: "React, TypeScript" },
                                                { name: "HackOps", desc: "Cybersecurity toolkit for ethical hacking education", tech: "React, Node.js" },
                                                { name: "Flora Fight Frenzy", desc: "Plants vs Zombies inspired game with AI opponents", tech: "Java, LibGDX" },
                                                { name: "VARtificial Intelligence", desc: "ML-powered football match prediction system", tech: "Python, TensorFlow" },
                                            ].map((project, i) => (
                                                <div key={i} className="p-4 bg-lorenzo-light/5 border border-lorenzo-light/10 rounded-xl">
                                                    <div className="font-bold text-lorenzo-light uppercase mb-1">{project.name}</div>
                                                    <div className="text-lorenzo-light/60 text-sm mb-2">{project.desc}</div>
                                                    <div className="text-lorenzo-accent text-xs font-bold">{project.tech}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Links */}
                                    <div className="flex flex-wrap gap-4 pt-6 border-t border-lorenzo-light/10">
                                        <a href="https://github.com/Flamechargerr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lorenzo-light/60 hover:text-lorenzo-accent transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                            github.com/Flamechargerr
                                        </a>
                                        <a href="https://linkedin.com/in/anamay-tripathy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lorenzo-light/60 hover:text-lorenzo-accent transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                            linkedin.com/in/anamay-tripathy
                                        </a>
                                        <a href="https://anamay.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lorenzo-light/60 hover:text-lorenzo-accent transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                            anamay.vercel.app
                                        </a>
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
