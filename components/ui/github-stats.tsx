"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Github } from "lucide-react"

interface GitHubStats {
  username: string
  publicRepos: number
  followers: number
  following: number
}

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setLoading(true)
        const userResponse = await fetch("https://api.github.com/users/Flamechargerr", {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        })

        if (!userResponse.ok) throw new Error("Failed to fetch user data")

        const userData = await userResponse.json()

        setStats({
          username: userData.login,
          publicRepos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
        })
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch GitHub stats")
        console.error("GitHub fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubStats()
    const interval = setInterval(fetchGitHubStats, 2 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-8">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <span className="text-gray-400 text-sm">Loading GitHub stats...</span>
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="w-full text-center py-8 text-red-400">
        <p>Unable to load GitHub stats</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* GitHub Overview Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <Card className="bg-gray-900/60 backdrop-blur-xl border-2 border-gray-700/50 hover:border-blue-500/50 transition-all duration-200">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Github className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white">{stats.publicRepos}</p>
            <p className="text-gray-400 text-xs md:text-sm">Public Repos</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/60 backdrop-blur-xl border-2 border-gray-700/50 hover:border-blue-500/50 transition-all duration-200">
          <CardContent className="p-3 md:p-4 text-center">
            <p className="text-2xl md:text-3xl font-bold text-white">{stats.followers}</p>
            <p className="text-gray-400 text-xs md:text-sm">Followers</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900/60 backdrop-blur-xl border-2 border-gray-700/50 hover:border-blue-500/50 transition-all duration-200">
          <CardContent className="p-3 md:p-4 text-center">
            <p className="text-2xl md:text-3xl font-bold text-white">{stats.following}</p>
            <p className="text-gray-400 text-xs md:text-sm">Following</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
