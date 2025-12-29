"use client"

import { useState, useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { blogPosts } from "@/lib/blog-data"

export default function BlogSection() {
    const [hoveredId, setHoveredId] = useState<number | null>(null)
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

    // Show only first 3 posts
    const displayedPosts = blogPosts.slice(0, 3)

    return (
        <section id="blog" ref={sectionRef} className="relative py-24 bg-lorenzo-dark overflow-hidden">
            {/* Parallax Background */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: backgroundY }}
            >
                {/* Large Background Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="text-[25vw] font-brier text-lorenzo-accent/[0.02] leading-none select-none whitespace-nowrap">
                        BLOG
                    </span>
                </div>

                {/* Diagonal lines pattern */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_100px,rgba(200,245,80,0.02)_100px,rgba(200,245,80,0.02)_101px)]" />
            </motion.div>

            {/* Floating Orbs */}
            <motion.div
                className="absolute top-1/4 right-20 w-64 h-64 bg-lorenzo-accent/5 rounded-full blur-[100px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* Header with premium styling */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16"
                >
                    <div>
                        <motion.div
                            className="flex items-center gap-4 mb-6"
                            initial={{ x: -30, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : {}}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <motion.div
                                className="w-16 h-px bg-gradient-to-r from-lorenzo-accent to-transparent"
                                initial={{ width: 0 }}
                                animate={isInView ? { width: 64 } : {}}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            />
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-lorenzo-accent">
                                INSIGHTS & ARTICLES
                            </span>
                        </motion.div>

                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-brier uppercase leading-[0.9] tracking-tight">
                            <motion.span
                                className="block text-lorenzo-light"
                                initial={{ x: -50, opacity: 0 }}
                                animate={isInView ? { x: 0, opacity: 1 } : {}}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            >
                                LATEST
                            </motion.span>
                            <motion.span
                                className="block text-transparent bg-clip-text bg-gradient-to-r from-lorenzo-accent via-lime-300 to-lorenzo-accent"
                                initial={{ x: -50, opacity: 0 }}
                                animate={isInView ? { x: 0, opacity: 1 } : {}}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                ARTICLES
                            </motion.span>
                        </h2>
                        <motion.p
                            className="mt-4 text-lorenzo-light/50 max-w-md"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            Thoughts on data science, web development, and building products that matter.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6 }}
                    >
                        <Link
                            href="/blog"
                            className="mt-6 md:mt-0 group inline-flex items-center gap-3 px-8 py-4 border-2 border-lorenzo-accent text-lorenzo-accent font-bold uppercase tracking-wider text-sm hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all duration-300 rounded-full"
                        >
                            View All Articles
                            <motion.svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                whileHover={{ x: 5 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </motion.svg>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Featured Post - Hero Card */}
                {displayedPosts[0] && (
                    <motion.article
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="mb-12 group"
                        onMouseEnter={() => setHoveredId(displayedPosts[0].id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <Link href={`/blog/${displayedPosts[0].slug}`}>
                            <motion.div
                                className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 bg-gradient-to-br from-lorenzo-light/[0.08] to-lorenzo-light/[0.02] border border-lorenzo-light/10 rounded-3xl overflow-hidden hover:border-lorenzo-accent/50 transition-all duration-500"
                                whileHover={{ y: -5 }}
                            >
                                {/* Image */}
                                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px] overflow-hidden">
                                    <Image
                                        src={displayedPosts[0].image}
                                        alt={displayedPosts[0].title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-lorenzo-dark via-lorenzo-dark/50 to-transparent lg:bg-gradient-to-r" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-lorenzo-dark/80 via-transparent to-transparent lg:hidden" />

                                    {/* Featured Badge */}
                                    <div className="absolute top-6 left-6 flex items-center gap-3">
                                        <span className="px-4 py-2 bg-lorenzo-accent text-lorenzo-dark text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-lorenzo-accent/30">
                                            ✨ Featured
                                        </span>
                                        <span className="px-4 py-2 bg-white/10 backdrop-blur-md text-white text-xs font-medium rounded-full">
                                            {displayedPosts[0].category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col justify-center p-8 lg:p-12">
                                    <div className="flex items-center gap-4 text-sm text-lorenzo-light/50 mb-6">
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {displayedPosts[0].date}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-lorenzo-accent" />
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {displayedPosts[0].readTime}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-lorenzo-light uppercase mb-6 group-hover:text-lorenzo-accent transition-colors leading-tight">
                                        {displayedPosts[0].title}
                                    </h3>

                                    <p className="text-lorenzo-light/60 text-base leading-relaxed mb-8 line-clamp-3">
                                        {displayedPosts[0].excerpt}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {displayedPosts[0].tags.slice(0, 4).map(tag => (
                                            <span key={tag} className="px-4 py-1.5 bg-lorenzo-accent/10 text-lorenzo-accent text-xs font-bold uppercase tracking-wider rounded-full border border-lorenzo-accent/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <span className="inline-flex items-center gap-3 text-lorenzo-accent font-bold uppercase tracking-wider group-hover:gap-5 transition-all">
                                        Read Article
                                        <motion.svg
                                            className="w-6 h-6"
                                            animate={{ x: hoveredId === displayedPosts[0].id ? 8 : 0 }}
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </motion.svg>
                                    </span>
                                </div>

                                {/* Corner decorations */}
                                <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-lorenzo-accent/20 rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-lorenzo-accent/20 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        </Link>
                    </motion.article>
                )}

                {/* Other Posts Grid - Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {displayedPosts.slice(1).map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4 + index * 0.15 }}
                            className="group relative"
                            onMouseEnter={() => setHoveredId(post.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <motion.div
                                    className="relative bg-gradient-to-br from-lorenzo-light/[0.08] to-lorenzo-light/[0.02] border border-lorenzo-light/10 rounded-2xl overflow-hidden hover:border-lorenzo-accent/50 transition-all duration-500"
                                    whileHover={{ y: -8, scale: 1.02 }}
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[16/9] overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-lorenzo-dark via-lorenzo-dark/40 to-transparent" />

                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4 px-4 py-2 bg-lorenzo-accent text-lorenzo-dark text-xs font-bold uppercase tracking-wider rounded-full">
                                            {post.category}
                                        </div>

                                        {/* Read time */}
                                        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/30 backdrop-blur-md text-white text-xs rounded-full">
                                            {post.readTime}
                                        </div>

                                        {/* Corner accents on hover */}
                                        <motion.div
                                            className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-lorenzo-accent rounded-tr-xl"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: hoveredId === post.id ? 1 : 0 }}
                                        />
                                        <motion.div
                                            className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-lorenzo-accent rounded-bl-xl"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: hoveredId === post.id ? 1 : 0 }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 md:p-8">
                                        <div className="flex items-center gap-3 text-xs text-lorenzo-light/50 mb-4">
                                            <span>{post.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-lorenzo-accent" />
                                            <span>{post.readTime}</span>
                                        </div>

                                        <h3 className="text-lg md:text-xl font-bold text-lorenzo-light uppercase mb-4 group-hover:text-lorenzo-accent transition-colors line-clamp-2 leading-tight">
                                            {post.title}
                                        </h3>

                                        <p className="text-lorenzo-light/50 text-sm line-clamp-2 mb-6">
                                            {post.excerpt}
                                        </p>

                                        <span className="inline-flex items-center gap-2 text-lorenzo-accent font-bold text-sm uppercase tracking-wider">
                                            Read More
                                            <motion.svg
                                                className="w-4 h-4"
                                                animate={{ x: hoveredId === post.id ? 5 : 0 }}
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </motion.svg>
                                        </span>
                                    </div>

                                    {/* Bottom accent line */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-lorenzo-accent to-lime-300"
                                        initial={{ width: "0%" }}
                                        animate={{ width: hoveredId === post.id ? "100%" : "0%" }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </motion.div>
                            </Link>
                        </motion.article>
                    ))}
                </div>

                {/* Newsletter CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    className="mt-16 p-8 md:p-12 bg-gradient-to-br from-lorenzo-accent/10 to-lorenzo-accent/5 border border-lorenzo-accent/20 rounded-3xl text-center"
                >
                    <h3 className="text-2xl md:text-3xl font-brier text-lorenzo-light uppercase mb-4">
                        Stay <span className="text-lorenzo-accent">Updated</span>
                    </h3>
                    <p className="text-lorenzo-light/50 mb-6 max-w-md mx-auto">
                        Get notified when I publish new articles on data science, development, and tech insights.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 bg-lorenzo-dark border border-lorenzo-light/20 rounded-full text-lorenzo-light placeholder:text-lorenzo-light/30 focus:outline-none focus:border-lorenzo-accent transition-colors"
                        />
                        <button className="px-8 py-4 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider rounded-full hover:shadow-lg hover:shadow-lorenzo-accent/30 transition-all">
                            Subscribe
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
