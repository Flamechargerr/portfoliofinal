"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { blogPosts } from "@/lib/blog-data"

export default function BlogSection() {
    const [hoveredId, setHoveredId] = useState<number | null>(null)
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

    // Show only first 3 posts
    const displayedPosts = blogPosts.slice(0, 3)

    return (
        <section id="blog" ref={sectionRef} className="py-24 bg-lorenzo-dark overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16"
                >
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-px bg-lorenzo-accent" />
                            <span className="text-xs font-bold uppercase tracking-widest text-lorenzo-accent">
                                INSIGHTS & ARTICLES
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-brier uppercase leading-[0.9] tracking-tight">
                            <span className="block text-lorenzo-light">LATEST</span>
                            <span className="block text-lorenzo-accent">ARTICLES</span>
                        </h2>
                        <p className="mt-4 text-lorenzo-light/50 max-w-md">
                            Thoughts on data science, web development, and building products that matter.
                        </p>
                    </div>

                    <Link
                        href="/blog"
                        className="mt-6 md:mt-0 inline-flex items-center gap-2 px-6 py-3 border-2 border-lorenzo-accent text-lorenzo-accent font-bold uppercase tracking-wider text-sm hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all"
                    >
                        View All Articles
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </motion.div>

                {/* Featured Post */}
                {displayedPosts[0] && (
                    <motion.article
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                        className="mb-12 group"
                        onMouseEnter={() => setHoveredId(displayedPosts[0].id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <Link href={`/blog/${displayedPosts[0].slug}`}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl hover:border-lorenzo-accent/50 transition-all">
                                {/* Image */}
                                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[300px] overflow-hidden rounded-xl">
                                    <Image
                                        src={displayedPosts[0].image}
                                        alt={displayedPosts[0].title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-lorenzo-dark/80 via-transparent to-transparent" />

                                    {/* Featured Badge */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2">
                                        <span className="px-3 py-1 bg-lorenzo-accent text-lorenzo-dark text-xs font-bold uppercase tracking-wider rounded">
                                            Featured
                                        </span>
                                        <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-medium rounded">
                                            {displayedPosts[0].category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col justify-center">
                                    <div className="flex items-center gap-4 text-sm text-lorenzo-light/50 mb-4">
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {displayedPosts[0].date}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {displayedPosts[0].readTime}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-lorenzo-light uppercase mb-4 group-hover:text-lorenzo-accent transition-colors leading-tight">
                                        {displayedPosts[0].title}
                                    </h3>

                                    <p className="text-lorenzo-light/60 text-base leading-relaxed mb-6">
                                        {displayedPosts[0].excerpt}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {displayedPosts[0].tags.slice(0, 4).map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-lorenzo-accent/10 text-lorenzo-accent text-xs font-medium rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <span className="inline-flex items-center gap-2 text-lorenzo-accent font-bold uppercase tracking-wider">
                                        Read Article
                                        <motion.svg
                                            className="w-5 h-5"
                                            animate={{ x: hoveredId === displayedPosts[0].id ? 8 : 0 }}
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </motion.svg>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </motion.article>
                )}

                {/* Other Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {displayedPosts.slice(1).map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl overflow-hidden hover:border-lorenzo-accent/50 transition-all"
                            onMouseEnter={() => setHoveredId(post.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <Link href={`/blog/${post.slug}`}>
                                {/* Image */}
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-lorenzo-dark via-lorenzo-dark/20 to-transparent" />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-lorenzo-accent text-lorenzo-dark text-xs font-bold uppercase tracking-wider rounded">
                                        {post.category}
                                    </div>

                                    {/* Corner accents on hover */}
                                    <motion.div
                                        className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-lorenzo-accent"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: hoveredId === post.id ? 1 : 0 }}
                                    />
                                    <motion.div
                                        className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-lorenzo-accent"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: hoveredId === post.id ? 1 : 0 }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-4 text-xs text-lorenzo-light/50 mb-3">
                                        <span>{post.date}</span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>

                                    <h3 className="text-lg font-bold text-lorenzo-light uppercase mb-3 group-hover:text-lorenzo-accent transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="text-lorenzo-light/60 text-sm line-clamp-2 mb-4">
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
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
