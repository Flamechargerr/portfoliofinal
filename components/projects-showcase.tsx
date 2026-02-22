"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const projects = [
    {
        id: 1,
        title: "YaanBarpe Platform",
        description: "A comprehensive startup ecosystem platform connecting entrepreneurs, mentors, and investors. Built with Next.js, featuring real-time updates and AI-powered matching.",
        image: "/images/tech-workspace.png",
        tags: ["Next.js", "TypeScript", "AI/ML", "PostgreSQL"],
        category: "Featured",
        link: "https://github.com/flamechargerr",
        demo: "#",
        metrics: {
            users: "500+",
            uptime: "99.9%",
            features: "25+"
        }
    },
    {
        id: 2,
        title: "AI Study Assistant",
        description: "An intelligent study companion using LangChain and OpenAI to help students learn more effectively through personalized content and practice questions.",
        image: "/images/data-viz.png",
        tags: ["Python", "LangChain", "OpenAI", "Streamlit"],
        category: "AI/ML",
        link: "https://github.com/flamechargerr",
        metrics: {
            users: "200+",
            accuracy: "92%",
            topics: "50+"
        }
    },
    {
        id: 3,
        title: "Real-time Analytics Dashboard",
        description: "A comprehensive analytics dashboard for tracking business metrics with real-time updates, custom visualizations, and export capabilities.",
        image: "/images/code-abstract.png",
        tags: ["React", "D3.js", "WebSocket", "Node.js"],
        category: "Data Viz",
        link: "https://github.com/flamechargerr",
        metrics: {
            charts: "15+",
            dataPoints: "1M+",
            latency: "<100ms"
        }
    },
    {
        id: 4,
        title: "E-commerce Platform",
        description: "Full-stack e-commerce solution with inventory management, payment processing, and order tracking. Optimized for performance and scalability.",
        image: "/images/tech-workspace.png",
        tags: ["Next.js", "Stripe", "Prisma", "Redis"],
        category: "Full Stack",
        link: "https://github.com/flamechargerr",
        metrics: {
            products: "1000+",
            orders: "5000+",
            loadTime: "1.2s"
        }
    },
    {
        id: 5,
        title: "Portfolio Generator",
        description: "An automated portfolio website generator that creates stunning developer portfolios from GitHub profiles and resume data.",
        image: "/images/code-abstract.png",
        tags: ["TypeScript", "GitHub API", "Tailwind", "Vercel"],
        category: "Developer Tools",
        link: "https://github.com/flamechargerr",
        metrics: {
            portfolios: "100+",
            themes: "12",
            buildTime: "<10s"
        }
    },
    {
        id: 6,
        title: "Task Management System",
        description: "Collaborative project management tool with Kanban boards, time tracking, and team analytics. Built for remote teams.",
        image: "/images/data-viz.png",
        tags: ["React", "Node.js", "MongoDB", "Socket.io"],
        category: "Productivity",
        link: "https://github.com/flamechargerr",
        metrics: {
            teams: "50+",
            tasks: "10K+",
            integrations: "8"
        }
    }
]

const categories = ["All", "Featured", "AI/ML", "Full Stack", "Data Viz", "Developer Tools", "Productivity"]

export default function ProjectsShowcase() {
    return (
        <section id="projects" className="py-24 bg-lorenzo-dark">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-px bg-lorenzo-accent" />
                        <span className="text-xs font-bold uppercase tracking-widest text-lorenzo-accent">
                            PORTFOLIO
                        </span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-brier uppercase leading-[0.9] tracking-tight">
                                <span className="text-lorenzo-light">FEATURED</span>
                                <br />
                                <span className="text-lorenzo-accent">PROJECTS</span>
                            </h2>
                        </div>
                        <p className="text-lorenzo-light/60 max-w-md">
                            A selection of projects that showcase my skills in data science,
                            web development, and building products that make a difference.
                        </p>
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.article
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative border border-lorenzo-accent/20 hover:border-lorenzo-accent/50 transition-all duration-500"
                        >
                            {/* Image */}
                            <div className="relative aspect-video overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-lorenzo-dark via-lorenzo-dark/50 to-transparent" />

                                {/* Category badge */}
                                <div className="absolute top-4 left-4 px-3 py-1 bg-lorenzo-accent text-lorenzo-dark text-xs font-bold uppercase tracking-wider">
                                    {project.category}
                                </div>

                                {/* Hover overlay with metrics */}
                                <motion.div
                                    className="absolute inset-0 bg-lorenzo-dark/90 flex items-center justify-center"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                >
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        {Object.entries(project.metrics).map(([key, value]) => (
                                            <div key={key}>
                                                <div className="text-2xl font-brier text-lorenzo-accent">{value}</div>
                                                <div className="text-xs text-lorenzo-light/50 uppercase tracking-wider">{key}</div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-lorenzo-light uppercase mb-3 group-hover:text-lorenzo-accent transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-lorenzo-light/60 text-sm mb-4 line-clamp-2">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs px-2 py-1 bg-lorenzo-accent/10 text-lorenzo-accent"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex items-center gap-4">
                                    <Link
                                        href={project.link}
                                        target="_blank"
                                        className="flex items-center gap-2 text-lorenzo-accent text-sm font-bold uppercase tracking-wider hover:underline"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                        </svg>
                                        Code
                                    </Link>
                                    {project.demo && (
                                        <Link
                                            href={project.demo}
                                            className="flex items-center gap-2 text-lorenzo-light/60 text-sm font-bold uppercase tracking-wider hover:text-lorenzo-accent"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            Demo
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* View More */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        href="https://github.com/flamechargerr"
                        target="_blank"
                        className="inline-flex items-center gap-3 px-8 py-4 border-2 border-lorenzo-accent text-lorenzo-accent font-bold uppercase tracking-wider hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        View All Projects on GitHub
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
