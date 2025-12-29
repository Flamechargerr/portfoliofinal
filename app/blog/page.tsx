"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { blogPosts } from "@/lib/blog-data"

const categories = ["All", ...Array.from(new Set(blogPosts.map(p => p.category)))]

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [hoveredId, setHoveredId] = useState<number | null>(null)

    const filteredPosts = selectedCategory === "All"
        ? blogPosts
        : blogPosts.filter(p => p.category === selectedCategory)

    return (
        <main className="min-h-screen bg-lorenzo-dark pt-24 pb-16">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-12 h-px bg-lorenzo-accent" />
                        <span className="text-xs font-bold uppercase tracking-widest text-lorenzo-accent">
                            INSIGHTS & IDEAS
                        </span>
                        <div className="w-12 h-px bg-lorenzo-accent" />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-brier uppercase leading-[0.9] tracking-tight mb-6">
                        <span className="text-lorenzo-light">MY</span>{" "}
                        <span className="text-lorenzo-accent">BLOG</span>
                    </h1>
                    <p className="text-lorenzo-light/60 max-w-2xl mx-auto">
                        Thoughts on technology, data science, development, and everything in between.
                        Sharing what I learn along the way.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all ${selectedCategory === category
                                    ? "bg-lorenzo-accent text-lorenzo-dark"
                                    : "border border-lorenzo-accent/30 text-lorenzo-light/60 hover:border-lorenzo-accent hover:text-lorenzo-accent"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </motion.div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                            onMouseEnter={() => setHoveredId(post.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <Link href={`/blog/${post.slug}`}>
                                {/* Image */}
                                <div className="relative aspect-[16/10] overflow-hidden mb-6">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-lorenzo-dark via-transparent to-transparent opacity-60" />

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-lorenzo-accent text-lorenzo-dark text-xs font-bold uppercase tracking-wider">
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
                                <div className="flex items-center gap-4 text-xs text-lorenzo-light/50 mb-3">
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                </div>

                                <h3 className="text-xl font-bold text-lorenzo-light uppercase mb-3 group-hover:text-lorenzo-accent transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-lorenzo-light/60 text-sm line-clamp-2 mb-4">
                                    {post.excerpt}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.tags.slice(0, 3).map(tag => (
                                        <span
                                            key={tag}
                                            className="text-xs text-lorenzo-accent/70 uppercase"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

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
                            </Link>
                        </motion.article>
                    ))}
                </div>

                {/* No posts found */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-6">📝</div>
                        <p className="text-lorenzo-light/50">
                            No articles found in this category yet.
                        </p>
                    </div>
                )}

                {/* Newsletter Signup */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 p-12 border border-lorenzo-accent/20 text-center"
                >
                    <h2 className="text-2xl font-brier text-lorenzo-light uppercase mb-4">
                        Stay <span className="text-lorenzo-accent">Updated</span>
                    </h2>
                    <p className="text-lorenzo-light/60 max-w-xl mx-auto mb-8">
                        Subscribe to get notified about new articles on AI, web development, and tech insights.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 bg-transparent border border-lorenzo-accent/30 text-lorenzo-light placeholder:text-lorenzo-light/30 focus:outline-none focus:border-lorenzo-accent"
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider hover:bg-lorenzo-accent/90 transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                </motion.div>

                {/* Back to Home */}
                <div className="text-center mt-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-lorenzo-accent font-bold uppercase tracking-wider hover:underline"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </div>
        </main>
    )
}
