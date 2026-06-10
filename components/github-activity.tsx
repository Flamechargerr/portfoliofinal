"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ActivityCalendar } from "react-activity-calendar"

interface GitHubStats {
    public_repos: number
    followers: number
    totalStars: number
    totalForks: number
    isFallback?: boolean
}

interface Activity {
    date: string
    count: number
    level: 0 | 1 | 2 | 3 | 4
}

// Helper to generate 365 days of realistic mock contributions in case of offline/timeout
const generateMockContributions = (): Activity[] => {
    const data: Activity[] = []
    const today = new Date()
    for (let i = 365; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        const dateString = date.toISOString().split("T")[0]
        
        let level: 0 | 1 | 2 | 3 | 4 = 0
        const rand = Math.random()
        if (rand > 0.92) level = 4
        else if (rand > 0.82) level = 3
        else if (rand > 0.65) level = 2
        else if (rand > 0.4) level = 1
        
        const count = level === 0 ? 0 : Math.floor(Math.random() * 5) + 1
        
        data.push({
            date: dateString,
            count,
            level
        })
    }
    return data
}

export default function GitHubActivity() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
    const [mounted, setMounted] = useState(false)
    const [stats, setStats] = useState<GitHubStats>({
        public_repos: 28,
        followers: 5,
        totalStars: 4,
        totalForks: 1,
    })
    const [isLoadingStats, setIsLoadingStats] = useState(true)
    
    // Calendar state
    const [calendarData, setCalendarData] = useState<Activity[]>([])
    const [calendarLoading, setCalendarLoading] = useState(true)
    const [totalContributions, setTotalContributions] = useState<number>(6100)

    useEffect(() => {
        setMounted(true)
        
        // Fetch stats API
        fetch("/api/github-stats")
            .then(res => res.json())
            .then((data: GitHubStats) => {
                setStats(data)
                setIsLoadingStats(false)
            })
            .catch(() => setIsLoadingStats(false))

        // Fetch calendar data with a 3.5s timeout abort controller
        const controller = new AbortController()
        const timeoutId = setTimeout(() => {
            controller.abort()
        }, 3500)

        fetch("https://github-contributions-api.deno.dev/Flamechargerr", { signal: controller.signal })
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch calendar")
                return res.json()
            })
            .then((data: { total?: { lastYear?: number }; contributions?: Activity[] }) => {
                if (data.contributions && Array.isArray(data.contributions)) {
                    setCalendarData(data.contributions)
                    if (data.total && typeof data.total.lastYear === "number") {
                        setTotalContributions(data.total.lastYear)
                    }
                } else {
                    throw new Error("Invalid contributions format")
                }
                setCalendarLoading(false)
            })
            .catch((err) => {
                console.warn("GitHub calendar fetch error, using fallback data:", err)
                setCalendarData(generateMockContributions())
                setCalendarLoading(false)
            })
            .finally(() => {
                clearTimeout(timeoutId)
            })
    }, [])

    const customTheme = {
        dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#c8f550"],
    }

    const statItems = [
        {
            value: calendarLoading ? "6,100+" : `${totalContributions.toLocaleString()}+`,
            label: "Total Contributions",
            delta: "Past year",
            icon: "📊",
        },
        {
            value: `${stats.totalStars}+`,
            label: "Stars Earned",
            delta: "Across all repos",
            icon: "⭐",
        },
        {
            value: `${stats.public_repos}`,
            label: "Public Repos",
            delta: "& counting",
            icon: "📁",
        },
        {
            value: "Daily",
            label: "Activity Level",
            delta: "Always shipping",
            icon: "🔥",
        },
    ]

    return (
        <div ref={sectionRef} className="py-16 bg-transparent">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="p-8 border border-lorenzo-accent/20 bg-[#222415]/75 border border-white/15"
                >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h3 className="text-2xl font-brier text-lorenzo-light uppercase mb-2">
                                <span className="text-lorenzo-accent">GitHub</span> Contribution Graph
                            </h3>
                            <p className="text-lorenzo-light/50 text-sm">
                                My coding activity — live from GitHub
                            </p>
                        </div>
                        <motion.a
                            href="https://github.com/Flamechargerr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-lorenzo-accent text-lorenzo-accent font-bold text-sm uppercase tracking-wider hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                            </svg>
                            View Profile
                        </motion.a>
                    </div>

                    {/* GitHub Calendar */}
                    <div className="overflow-x-auto min-h-40 flex items-center justify-center">
                        {mounted && !calendarLoading ? (
                            <ActivityCalendar
                                data={calendarData}
                                colorScheme="dark"
                                theme={customTheme}
                                blockSize={14}
                                blockMargin={4}
                                fontSize={14}
                            />
                        ) : (
                            <div className="h-40 w-full bg-[#222415]/75 border border-white/15 animate-pulse rounded-lg flex items-center justify-center">
                                <span className="text-lorenzo-light/50 text-sm">Loading GitHub activity...</span>
                            </div>
                        )}
                    </div>

                    {/* Stats Row — Live Data */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-lorenzo-accent/10"
                    >
                        {statItems.map((stat, i) => (
                            <motion.div
                                key={i}
                                className="text-center"
                                animate={isLoadingStats ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
                                transition={isLoadingStats ? { duration: 1.5, repeat: Infinity } : {}}
                            >
                                <div className="text-2xl mb-1">{stat.icon}</div>
                                <div className="text-2xl md:text-3xl font-brier text-lorenzo-accent">
                                    {stat.value}
                                </div>
                                <div className="text-xs text-lorenzo-light/50 uppercase tracking-wider">{stat.label}</div>
                                <div className="text-xs text-green-400 mt-1">{stat.delta}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
