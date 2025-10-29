"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, GitBranch, Zap, Activity, TrendingUp, Star, Coffee, Clock, Flame, RefreshCw } from "lucide-react"

interface ProjectMetric {
  name: string
  status: "Live" | "In Progress" | "Completed"
  commits: number
  language: string
  trend: "up" | "down" | "stable"
  stars: number
  lastUpdate: string
}

export function EnhancedDeveloperDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [refreshing, setRefreshing] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [activeMetric, setActiveMetric] = useState<string | null>(null)

  const projectMetrics: ProjectMetric[] = [
    {
      name: "CrimeConnect",
      status: "Completed",
      commits: 127,
      language: "React",
      trend: "up",
      stars: 15,
      lastUpdate: "2 days ago",
    },
    {
      name: "HackOps",
      status: "Live",
      commits: 89,
      language: "JavaScript",
      trend: "stable",
      stars: 23,
      lastUpdate: "1 week ago",
    },
    {
      name: "VARtificial Intelligence",
      status: "Live",
      commits: 156,
      language: "Python",
      trend: "up",
      stars: 31,
      lastUpdate: "3 days ago",
    },
    {
      name: "Flora Fight Frenzy",
      status: "In Progress",
      commits: 203,
      language: "JavaScript",
      trend: "up",
      stars: 8,
      lastUpdate: "1 day ago",
    },
  ]

  const skillMetrics = [
    { name: "JavaScript", projects: 8, trend: "up", color: "from-yellow-400 to-orange-500" },
    { name: "React", projects: 6, trend: "up", color: "from-blue-400 to-blue-600" },
    { name: "Python", projects: 5, trend: "up", color: "from-green-400 to-blue-500" },
    { name: "Node.js", projects: 4, trend: "up", color: "from-green-500 to-green-700" },
    { name: "Data Science", projects: 3, trend: "up", color: "from-purple-500 to-pink-500" },
    { name: "MongoDB", projects: 4, trend: "stable", color: "from-green-600 to-green-800" },
  ]

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const refreshData = async () => {
    setRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  const totalProjects = projectMetrics.length
  const liveProjects = projectMetrics.filter((p) => p.status === "Live").length
  const totalCommits = projectMetrics.reduce((acc, p) => acc + p.commits, 0)
  const totalStars = projectMetrics.reduce((acc, p) => acc + p.stars, 0)

  return (
    <div className="space-y-8">
      {/* Header with Glowing Effect */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl" />
        <Card className="relative bg-gray-900/80 backdrop-blur-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Zap className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Developer Analytics
                  </CardTitle>
                  <p className="text-gray-400 text-lg">Real-time coding insights • {currentTime}</p>
                </div>
              </div>
              <Button
                onClick={refreshData}
                disabled={refreshing}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Stats Grid with Enhanced Visuals */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {[
          {
            label: "Active Projects",
            value: totalProjects,
            icon: Code,
            color: "from-blue-500 to-cyan-500",
            trend: "+2 this month",
          },
          {
            label: "Live Projects",
            value: liveProjects,
            icon: Activity,
            color: "from-green-500 to-emerald-500",
            trend: "All deployed",
          },
          {
            label: "Total Commits",
            value: totalCommits,
            icon: GitBranch,
            color: "from-purple-500 to-pink-500",
            trend: "+47 this week",
          },
          {
            label: "GitHub Stars",
            value: totalStars,
            icon: Star,
            color: "from-yellow-500 to-orange-500",
            trend: "+12 this month",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.05, y: -5 }}
            onHoverStart={() => setActiveMetric(stat.label)}
            onHoverEnd={() => setActiveMetric(null)}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="relative overflow-hidden bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group">
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                animate={{
                  opacity: activeMetric === stat.label ? 0.1 : 0,
                }}
              />
              <CardContent className="relative z-10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
                    animate={{
                      scale: activeMetric === stat.label ? 1.1 : 1,
                      rotate: activeMetric === stat.label ? [0, -5, 5, 0] : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-green-400 text-xs">{stat.trend}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Tabs Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 shadow-2xl overflow-hidden">
          <CardContent className="p-0">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-700/50">
              {["Projects", "Skills", "Activity"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab.toLowerCase())}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 relative ${
                    selectedTab === tab.toLowerCase()
                      ? "text-white bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {tab}
                  {selectedTab === tab.toLowerCase() && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                      layoutId="activeTab"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {selectedTab === "projects" && (
                  <motion.div
                    key="projects"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {projectMetrics.map((project, index) => (
                      <motion.div
                        key={project.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <Code className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                                {project.name}
                              </h4>
                              <p className="text-gray-400 text-sm">{project.language}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge
                              className={`${
                                project.status === "Live"
                                  ? "bg-green-500/20 text-green-300 border-green-500/30"
                                  : project.status === "In Progress"
                                    ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                    : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                              }`}
                            >
                              {project.status}
                            </Badge>
                            <div className="text-right">
                              <p className="text-white text-sm font-medium">{project.commits} commits</p>
                              <p className="text-gray-400 text-xs">{project.lastUpdate}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {selectedTab === "skills" && (
                  <motion.div
                    key="skills"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {skillMetrics.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 bg-gradient-to-br ${skill.color} rounded-lg`} />
                            <div>
                              <h4 className="text-white font-medium">{skill.name}</h4>
                              <p className="text-gray-400 text-sm">{skill.projects} projects</p>
                            </div>
                          </div>
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {selectedTab === "activity" && (
                  <motion.div
                    key="activity"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <Flame className="w-5 h-5 text-green-400" />
                          <h4 className="text-white font-medium">Coding Streak</h4>
                        </div>
                        <p className="text-2xl font-bold text-white">47 days</p>
                        <p className="text-green-400 text-sm">Personal best: 89 days</p>
                      </div>

                      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <Clock className="w-5 h-5 text-blue-400" />
                          <h4 className="text-white font-medium">This Week</h4>
                        </div>
                        <p className="text-2xl font-bold text-white">32 hours</p>
                        <p className="text-blue-400 text-sm">+8 hours from last week</p>
                      </div>

                      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                        <div className="flex items-center gap-3 mb-2">
                          <Coffee className="w-5 h-5 text-purple-400" />
                          <h4 className="text-white font-medium">Coffee Count</h4>
                        </div>
                        <p className="text-2xl font-bold text-white">127</p>
                        <p className="text-purple-400 text-sm">This month</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700/50">
                      <h4 className="text-white font-medium mb-4">Recent Activity</h4>
                      <div className="space-y-3">
                        {[
                          { action: "Pushed to CrimeConnect", time: "2 hours ago", type: "commit" },
                          { action: "Created new branch for Flora Fight", time: "5 hours ago", type: "branch" },
                          { action: "Merged PR in HackOps", time: "1 day ago", type: "merge" },
                          { action: "Started new project", time: "2 days ago", type: "project" },
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/50">
                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                            <span className="text-gray-300 text-sm flex-1">{activity.action}</span>
                            <span className="text-gray-500 text-xs">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
