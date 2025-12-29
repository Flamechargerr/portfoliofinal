"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { getBlogPost, blogPosts } from "@/lib/blog-data"
import { useEffect, useState } from "react"

export default function BlogPostPage() {
    const params = useParams()
    const slug = params.slug as string
    const [post, setPost] = useState<ReturnType<typeof getBlogPost>>(undefined)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const foundPost = getBlogPost(slug)
        setPost(foundPost)
        setIsLoaded(true)
    }, [slug])

    if (!isLoaded) {
        return (
            <main className="min-h-screen bg-lorenzo-dark pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <div className="animate-pulse">
                        <div className="h-8 bg-lorenzo-accent/20 rounded w-1/4 mb-8"></div>
                        <div className="h-12 bg-lorenzo-accent/20 rounded w-3/4 mb-4"></div>
                        <div className="h-64 bg-lorenzo-accent/20 rounded mb-8"></div>
                    </div>
                </div>
            </main>
        )
    }

    if (!post) {
        return (
            <main className="min-h-screen bg-lorenzo-dark pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
                    <div className="text-8xl mb-6">🔍</div>
                    <h1 className="text-3xl font-brier text-lorenzo-light uppercase mb-4">
                        Post Not Found
                    </h1>
                    <p className="text-lorenzo-light/60 mb-8">
                        The article you're looking for doesn't exist.
                    </p>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-lorenzo-accent text-lorenzo-accent font-bold uppercase tracking-wider hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all"
                    >
                        Back to Blog
                    </Link>
                </div>
            </main>
        )
    }

    // Get related posts (same category, excluding current)
    const relatedPosts = blogPosts
        .filter(p => p.category === post.category && p.id !== post.id)
        .slice(0, 2)

    return (
        <main className="min-h-screen bg-lorenzo-dark pt-24 pb-16">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto px-6 md:px-12 mb-12"
            >
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-lorenzo-light/50 mb-8">
                    <Link href="/" className="hover:text-lorenzo-accent transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-lorenzo-accent transition-colors">
                        Blog
                    </Link>
                    <span>/</span>
                    <span className="text-lorenzo-accent">{post.category}</span>
                </div>

                {/* Category & Meta */}
                <div className="flex items-center gap-4 mb-6">
                    <span className="px-3 py-1 bg-lorenzo-accent text-lorenzo-dark text-xs font-bold uppercase tracking-wider">
                        {post.category}
                    </span>
                    <span className="text-lorenzo-light/50 text-sm">{post.date}</span>
                    <span className="text-lorenzo-light/50 text-sm">•</span>
                    <span className="text-lorenzo-light/50 text-sm">{post.readTime}</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-brier text-lorenzo-light uppercase leading-tight mb-8">
                    {post.title}
                </h1>

                {/* Author */}
                <div className="flex items-center gap-4 pb-8 border-b border-lorenzo-accent/20">
                    <div className="w-12 h-12 rounded-full bg-lorenzo-accent/20 overflow-hidden relative">
                        <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <div className="text-lorenzo-light font-bold">{post.author.name}</div>
                        <div className="text-lorenzo-light/50 text-sm">{post.author.role}</div>
                    </div>
                </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-5xl mx-auto px-6 md:px-12 mb-12"
            >
                <div className="relative aspect-[21/9] overflow-hidden">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-lorenzo-dark/50 to-transparent" />
                </div>
            </motion.div>

            {/* Content */}
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-4xl mx-auto px-6 md:px-12"
            >
                <div
                    className="prose prose-invert prose-lg max-w-none
                        prose-headings:font-brier prose-headings:text-lorenzo-light prose-headings:uppercase
                        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-lorenzo-accent
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                        prose-p:text-lorenzo-light/80 prose-p:leading-relaxed
                        prose-a:text-lorenzo-accent prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-lorenzo-light
                        prose-code:text-lorenzo-accent prose-code:bg-lorenzo-accent/10 prose-code:px-2 prose-code:py-0.5 prose-code:rounded
                        prose-pre:bg-[#0d0d0d] prose-pre:border prose-pre:border-lorenzo-accent/20
                        prose-ul:text-lorenzo-light/80
                        prose-ol:text-lorenzo-light/80
                        prose-li:marker:text-lorenzo-accent
                        prose-table:border-lorenzo-accent/20
                        prose-th:text-lorenzo-accent prose-th:border-lorenzo-accent/20
                        prose-td:border-lorenzo-accent/20
                        prose-hr:border-lorenzo-accent/20"
                    dangerouslySetInnerHTML={{
                        __html: formatMarkdown(post.content)
                    }}
                />

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mt-12 pt-8 border-t border-lorenzo-accent/20">
                    {post.tags.map(tag => (
                        <span
                            key={tag}
                            className="px-4 py-2 bg-lorenzo-accent/10 text-lorenzo-accent text-sm font-medium uppercase tracking-wider"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Share */}
                <div className="flex items-center gap-4 mt-8">
                    <span className="text-lorenzo-light/50 text-sm uppercase tracking-wider">Share:</span>
                    <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://anamay.dev/blog/${post.slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center border border-lorenzo-accent/30 text-lorenzo-accent hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>
                    <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://anamay.dev/blog/${post.slug}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center border border-lorenzo-accent/30 text-lorenzo-accent hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>
                </div>
            </motion.article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-5xl mx-auto px-6 md:px-12 mt-16 pt-16 border-t border-lorenzo-accent/20"
                >
                    <h2 className="text-2xl font-brier text-lorenzo-light uppercase mb-8">
                        Related <span className="text-lorenzo-accent">Articles</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {relatedPosts.map(relatedPost => (
                            <Link
                                key={relatedPost.id}
                                href={`/blog/${relatedPost.slug}`}
                                className="group"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden mb-4">
                                    <Image
                                        src={relatedPost.image}
                                        alt={relatedPost.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-lorenzo-dark to-transparent opacity-60" />
                                    <span className="absolute top-4 left-4 px-3 py-1 bg-lorenzo-accent text-lorenzo-dark text-xs font-bold uppercase">
                                        {relatedPost.category}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-lorenzo-light uppercase group-hover:text-lorenzo-accent transition-colors">
                                    {relatedPost.title}
                                </h3>
                                <p className="text-lorenzo-light/50 text-sm mt-2">
                                    {relatedPost.date} • {relatedPost.readTime}
                                </p>
                            </Link>
                        ))}
                    </div>
                </motion.section>
            )}

            {/* Back to Blog */}
            <div className="max-w-4xl mx-auto px-6 md:px-12 mt-16 text-center">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 px-8 py-4 border-2 border-lorenzo-accent text-lorenzo-accent font-bold uppercase tracking-wider hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Back to All Articles
                </Link>
            </div>
        </main>
    )
}

// Enhanced markdown to HTML converter with proper list and table handling
function formatMarkdown(content: string): string {
    let html = content
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic (but not inside code blocks)
        .replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>')
        // Code blocks with syntax highlighting
        .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
            const langClass = lang ? ` class="language-${lang}"` : ''
            return `<pre class="code-block"><code${langClass}>${code.trim()}</code></pre>`
        })
        // Inline code
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        // Horizontal rules
        .replace(/^---$/gim, '<hr />')

    // Process tables
    html = html.replace(/(\|.+\|[\r\n]+)+/g, (tableMatch) => {
        const rows = tableMatch.trim().split('\n').filter(row => row.trim())
        let tableHtml = '<div class="table-wrapper"><table>'
        let isFirstDataRow = true

        rows.forEach((row, index) => {
            const cells = row.split('|').filter(c => c.trim())
            if (cells.some(c => /^[\s-:]+$/.test(c))) return // Skip separator rows

            const tag = index === 0 ? 'th' : 'td'
            const rowContent = cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('')

            if (index === 0) {
                tableHtml += `<thead><tr>${rowContent}</tr></thead><tbody>`
            } else {
                tableHtml += `<tr>${rowContent}</tr>`
            }
        })

        tableHtml += '</tbody></table></div>'
        return tableHtml
    })

    // Process unordered lists - group consecutive list items
    html = html.replace(/((?:^- .+$[\r\n]*)+)/gim, (listBlock) => {
        const items = listBlock.trim().split('\n')
            .filter(line => line.trim().startsWith('-'))
            .map(line => `<li>${line.replace(/^- /, '').trim()}</li>`)
            .join('')
        return `<ul>${items}</ul>`
    })

    // Process ordered lists - group consecutive numbered items
    html = html.replace(/((?:^\d+\. .+$[\r\n]*)+)/gim, (listBlock) => {
        const items = listBlock.trim().split('\n')
            .filter(line => /^\d+\. /.test(line.trim()))
            .map(line => `<li>${line.replace(/^\d+\. /, '').trim()}</li>`)
            .join('')
        return `<ol>${items}</ol>`
    })

    // Handle paragraphs - split by double newlines and wrap non-tag content
    const blocks = html.split(/\n\n+/)
    html = blocks.map(block => {
        const trimmed = block.trim()
        if (!trimmed) return ''
        // Don't wrap if it's already a block element
        if (/^<(h[1-6]|ul|ol|pre|table|div|hr|blockquote)/i.test(trimmed)) {
            return trimmed
        }
        // Wrap in paragraph
        return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`
    }).join('\n')

    // Clean up empty paragraphs and extra whitespace
    html = html
        .replace(/<p><\/p>/g, '')
        .replace(/<p>\s*<\/p>/g, '')
        .replace(/<p>\s*<br\s*\/?>\s*<\/p>/g, '')
        .replace(/<p>(\s*<(h[1-6]|ul|ol|pre|table|div|hr|blockquote))/gi, '$1')
        .replace(/(<\/(h[1-6]|ul|ol|pre|table|div|blockquote)>)\s*<\/p>/gi, '$1')

    return html
}
