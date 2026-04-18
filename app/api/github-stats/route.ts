import { NextResponse } from "next/server"

export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
    try {
        const headers: HeadersInit = {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        }

        // Fetch user profile and repos in parallel
        const [userRes, reposRes] = await Promise.all([
            fetch("https://api.github.com/users/Flamechargerr", { headers, next: { revalidate: 3600 } }),
            fetch("https://api.github.com/users/Flamechargerr/repos?per_page=100&sort=updated", { headers, next: { revalidate: 3600 } }),
        ])

        if (!userRes.ok || !reposRes.ok) {
            throw new Error("GitHub API error")
        }

        const user = await userRes.json()
        const repos = await reposRes.json()

        // Filter out forks & archived for star count
        const ownRepos = repos.filter((r: any) => !r.fork && !r.archived)
        const totalStars = ownRepos.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0)
        const totalForks = ownRepos.reduce((acc: number, r: any) => acc + (r.forks_count || 0), 0)

        // Get featured repos (pick the most meaningful ones)
        const featuredSlugs = ["crime-connect-fbi", "HackOps", "VARtificial-Intelligence", "smart-maps-3d", "InternMailer", "portfoliofinal"]
        const featuredRepos = featuredSlugs
            .map(slug => repos.find((r: any) => r.name === slug))
            .filter(Boolean)
            .map((r: any) => ({
                name: r.name,
                description: r.description || "",
                html_url: r.html_url,
                homepage: r.homepage || null,
                stargazers_count: r.stargazers_count,
                forks_count: r.forks_count,
                language: r.language,
                updated_at: r.updated_at,
                topics: r.topics || [],
            }))

        return NextResponse.json({
            login: user.login,
            name: user.name,
            bio: user.bio,
            public_repos: user.public_repos,
            followers: user.followers,
            following: user.following,
            avatar_url: user.avatar_url,
            totalStars,
            totalForks,
            featuredRepos,
            fetchedAt: new Date().toISOString(),
        })
    } catch (error) {
        console.error("GitHub API fetch error:", error)
        // Return sensible fallback data
        return NextResponse.json({
            public_repos: 26,
            followers: 6,
            totalStars: 4,
            totalForks: 1,
            featuredRepos: [],
            fetchedAt: new Date().toISOString(),
            isFallback: true,
        }, { status: 200 }) // Return 200 with fallback so UI doesn't break
    }
}
