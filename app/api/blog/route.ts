import { NextResponse } from 'next/server'
import { blogPosts, getBlogPost } from '@/lib/blog-data'

export async function GET() {
    // Return all blog posts (without full content for listing)
    const posts = blogPosts.map(({ content, ...post }) => post)

    return NextResponse.json({
        posts,
        total: posts.length
    })
}
