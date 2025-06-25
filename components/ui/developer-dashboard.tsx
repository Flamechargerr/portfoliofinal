"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, ArrowDownRight, RefreshCw, Zap, Code, GitBranch, Trophy, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"

interface ProjectMetric {
  name: string
  completion: number
  status: string
  commits: number
  language: string
  trend: "up" | "down" | "stable"
}

interface SkillMetric {
  name: string
  level: number
  experience: string
  projects: number
  trend: "up" | "down" | "stable"
}

export function DeveloperDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  const projectMetrics: ProjectMetric[] = [
    { name: "CrimeConnect", completion: 95, status: "Production Ready", commits: 127, language: "React", trend: "up" },
    { name: "HackOps", completion: 100, status: "Live", commits: 89, language: "JavaScript", trend: "stable" },
    {
      name: "VARtificial Intelligence",
      completion: 100,
      status: "Live",
      commits: 156,
      language: "Python",
      trend: "up",
    },
    {
      name: "Flora Fight Frenzy",
      completion: 95,
      status: "UI Complete",
      commits: 203,
      language: "JavaScript",
      trend: "up",
    },
    { name: "E-Cell Website", completion: 100, status: "Live", commits: 78, language: "Next.js", trend: "stable" },
  ]

  const skillMetrics: SkillMetric[] = [
    { name: "JavaScript", level: 90, experience: "2+ years", projects: 8, trend: "up" },
    { name: "React", level: 85, experience: "2+ years", projects: 6, trend: "up" },
    { name: "Python", level: 80, experience: "2+ years", projects: 5, trend: "up" },
    { name: "Node.js", level: 75, experience: "1.5+ years", projects: 4, trend: "up" },
    { name: "Data Science", level: 70, experience: "1+ year", projects: 3, trend: "up" },
    { name: "MongoDB", level: 65, experience: "1+ year", projects: 4, trend: "stable" },
  ]

  const achievements = [
    { title: "Technical Head", org: "YaanBarpe", status: "active" },
    { title: "Data Analyst Intern", org: "Intellect Design Arena", status: "completed" },
    { title: "Meta Data Analyst", org: "Meta Certified", status: "certified" },
    { title: "IBM GenAI Professional", org: "IBM Certified", status: "certified" },
  ]

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500)

    return () => clearInterval(interval)
  }, [])

  const refreshData = async () => {
    setRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  const totalProjects = projectMetrics.length
  const completedProjects = projectMetrics.filter((p) => p.completion === 100).length
  const avgCompletion = Math.round(projectMetrics.reduce((acc, p) => acc + p.completion, 0) / totalProjects)
  const totalCommits = projectMetrics.reduce((acc, p) => acc + p.commits, 0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Dashboard */}
      <Card className="bg-gray-900/60 border-blue-500/30 backdrop-blur-xl lg:col-span-2 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl text-white flex items-center">
              <Zap className="mr-2 h-5 w-5 text-blue-500" />
              Developer Dashboard
            </CardTitle>
            <CardDescription className="text-gray-400">
              Real-time coding metrics and project analytics • {currentTime}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-blue-500/50 text-blue-400 hover:bg-blue-900/20 backdrop-blur-sm"
            onClick={refreshData}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid grid-cols-3 bg-gray-800/50 backdrop-blur-sm">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                Projects
              </TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                Skills
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              {selectedTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <MetricCard title="Total Projects" value={totalProjects.toString()} trend="up" subtitle="Active" />
                    <MetricCard
                      title="Completed"
                      value={completedProjects.toString()}
                      trend="up"
                      subtitle="Live Projects"
                    />
                    <MetricCard title="Avg Completion" value={`${avgCompletion}%`} trend="up" subtitle="Success Rate" />
                    <MetricCard title="Total Commits" value={totalCommits.toString()} trend="up" subtitle="This Year" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        <Trophy className="mr-2 h-4 w-4 text-yellow-500" />
                        Recent Achievements
                      </h4>
                      <div className="space-y-2">
                        {achievements.slice(0, 3).map((achievement, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <div className="text-white text-sm font-medium">{achievement.title}</div>
                              <div className="text-gray-400 text-xs">{achievement.org}</div>
                            </div>
                            <StatusIndicator status={achievement.status} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
                      <h4 className="text-white font-medium mb-3 flex items-center">
                        <Target className="mr-2 h-4 w-4 text-green-500" />
                        Current Focus
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white">Data Science Learning</span>
                            <span className="text-blue-400">75%</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white">AI/ML Projects</span>
                            <span className="text-green-400">60%</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white">Full Stack Development</span>
                            <span className="text-purple-400">90%</span>
                          </div>
                          <Progress value={90} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === "projects" && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <div className="space-y-3">
                    {projectMetrics.map((project, index) => (
                      <div key={index} className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Code className="h-4 w-4 text-blue-400" />
                            <span className="text-white font-medium">{project.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {project.language}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendIndicator trend={project.trend} />
                            <span className="text-gray-400 text-sm">{project.commits} commits</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex-1 mr-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Completion</span>
                              <span className="text-white">{project.completion}%</span>
                            </div>
                            <Progress value={project.completion} className="h-2" />
                          </div>
                          <Badge
                            className={`${
                              project.status === "Live"
                                ? "bg-green-500/20 text-green-300 border-green-500/30"
                                : project.status === "Production Ready"
                                  ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                  : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                            }`}
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {selectedTab === "skills" && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skillMetrics.map((skill, index) => (
                      <div key={index} className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <TrendIndicator trend={skill.trend} />
                            <span className="text-gray-400 text-sm">{skill.projects} projects</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Proficiency</span>
                            <span className="text-white">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                          <div className="text-xs text-gray-400">{skill.experience} experience</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>

      {/* Side Panel */}
      <Card className="bg-gray-900/60 border-blue-500/30 backdrop-blur-xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center">
            <GitBranch className="mr-2 h-5 w-5 text-blue-500" />
            Live Activity
          </CardTitle>
          <CardDescription className="text-gray-400">Current development status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm font-medium">Coding Streak</span>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Active</Badge>
              </div>
              <div className="text-2xl font-bold text-white">47 days</div>
              <div className="text-xs text-gray-400">Personal best: 89 days</div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-white text-sm font-medium mb-2">This Week</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-xs">Commits</span>
                  <span className="text-white text-sm">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-xs">Lines Added</span>
                  <span className="text-green-400 text-sm">+1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-xs">Lines Removed</span>
                  <span className="text-red-400 text-sm">-389</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-white text-sm font-medium mb-2">Languages Used</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">JavaScript</span>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1 bg-yellow-500 rounded"></div>
                    <span className="text-white text-xs">45%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Python</span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-1 bg-blue-500 rounded"></div>
                    <span className="text-white text-xs">30%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">TypeScript</span>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-1 bg-blue-400 rounded"></div>
                    <span className="text-white text-xs">25%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MetricCard({
  title,
  value,
  trend,
  subtitle,
}: { title: string; value: string; trend: "up" | "down" | "stable"; subtitle: string }) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-3 backdrop-blur-sm">
      <div className="text-gray-400 text-sm mb-1">{title}</div>
      <div className="text-xl font-bold text-white flex items-center gap-2">
        {value}
        <TrendIndicator trend={trend} />
      </div>
      <div className="text-gray-500 text-xs">{subtitle}</div>
    </div>
  )
}

function TrendIndicator({ trend }: { trend: "up" | "down" | "stable" }) {
  if (trend === "up") {
    return <ArrowUpRight className="h-4 w-4 text-green-500" />
  }
  if (trend === "down") {
    return <ArrowDownRight className="h-4 w-4 text-red-500" />
  }
  return <div className="w-4 h-4 rounded-full bg-gray-500"></div>
}

function StatusIndicator({ status }: { status: string }) {
  const colors = {
    active: "bg-green-500",
    completed: "bg-blue-500",
    certified: "bg-purple-500",
  }

  return <div className={`w-3 h-3 rounded-full ${colors[status as keyof typeof colors] || "bg-gray-500"}`}></div>
}
