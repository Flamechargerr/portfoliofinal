"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import ProfileCard from "@/components/ui/profile-card"
import CinematicThemeSwitcher from "@/components/ui/cinematic-theme-switcher"
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline-clean"
import { HeroScrollDemo } from "@/components/ui/hero-scroll-demo"
import { GitHubStats } from "@/components/ui/github-stats"
import SkillBadgesGame from "@/components/ui/skill-badges-game" // New import for SkillBadgesGame
import {
  Github,
  Mail,
  ExternalLink,
  ArrowRight,
  Code,
  Shield,
  Gamepad2,
  Download,
  Terminal,
  BookOpen,
  Coffee,
  Briefcase,
  Sparkles,
  Brain,
  Award,
  Clock,
  Calendar,
  User,
  Zap,
} from "lucide-react"
import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

// Lazy load heavy components for better performance
const NetworkBackground = lazy(() =>
  import("@/components/ui/network-background").then((m) => ({ default: m.NetworkBackground })),
)
const SkillsSection = lazy(() => import("@/components/ui/skills-section").then((m) => ({ default: m.SkillsSection })))
const EnhancedDeveloperDashboard = lazy(() =>
  import("@/components/ui/enhanced-developer-dashboard").then((m) => ({ default: m.EnhancedDeveloperDashboard })),
)
const EnhancedContactSection = lazy(() =>
  import("@/components/ui/enhanced-contact-section").then((m) => ({ default: m.EnhancedContactSection })),
)
const EnhancedLoadingScreen = lazy(() => import("@/components/ui/enhanced-loading-screen"))
const EnhancedJourneySection = lazy(() =>
  import("@/components/ui/enhanced-journey-section").then((m) => ({ default: m.EnhancedJourneySection })),
)
const SplineSceneBasic = lazy(() =>
  import("@/components/ui/spline-scene-basic").then((m) => ({ default: m.SplineSceneBasic })),
)

const LoadingFallback = ({ height = "400px" }: { height?: string }) => (
  <div className={`w-full bg-gray-900/30 rounded-xl animate-pulse flex items-center justify-center`} style={{ height }}>
    <div className="text-gray-500 text-sm">Loading...</div>
  </div>
)

export default function AnamayPortfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const [typedText, setTypedText] = useState("")
  const [currentRole, setCurrentRole] = useState(0)
  const [timeOfDay, setTimeOfDay] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const [isDownloading, setIsDownloading] = useState(false)
  const [sectionsInView, setSectionsInView] = useState<Record<string, boolean>>({})

  const roles = useMemo(
    () => [
      "Data Science Student 📊",
      "Full Stack Developer 💻",
      "Technical Head @ YaanBarpe 🚀",
      "Data Analyst & Web Dev Intern 👨‍💻",
      "Problem Solver 🧩",
      "UI/UX Enthusiast 🎨",
      "Tech Innovator ⚡",
    ],
    [],
  )

  const timelineData = useMemo(
    () => [
      {
        id: 1,
        title: "Release",
        date: "2027",
        content: "Expected graduation from MIT Manipal with B.Tech in Data Science Engineering",
        category: "Academic",
        icon: Clock,
        relatedIds: [6],
        status: "pending" as const,
        energy: 90,
      },
      {
        id: 2,
        title: "Planning",
        date: "2024",
        content: "Strategic planning for career growth and skill development in AI/ML",
        category: "Career",
        icon: Calendar,
        relatedIds: [3, 5],
        status: "in-progress" as const,
        energy: 75,
      },
      {
        id: 3,
        title: "Design",
        date: "2024",
        content: "Designing innovative solutions at YaanBarpe and Intellect Design Arena",
        category: "Work",
        icon: Briefcase,
        relatedIds: [2, 4],
        status: "in-progress" as const,
        energy: 85,
      },
      {
        id: 4,
        title: "Development",
        date: "2024",
        content: "Building full-stack applications and data analysis projects",
        category: "Technical",
        icon: Code,
        relatedIds: [3, 5],
        status: "in-progress" as const,
        energy: 95,
      },
      {
        id: 5,
        title: "Testing",
        date: "2024",
        content: "Completed Meta Data Analyst and IBM GenAI certifications",
        category: "Certification",
        icon: Award,
        relatedIds: [2, 4],
        status: "completed" as const,
        energy: 100,
      },
      {
        id: 6,
        title: "Started",
        date: "2023",
        content: "Began B.Tech Data Science Engineering journey at MIT Manipal",
        category: "Academic",
        icon: User,
        relatedIds: [1],
        status: "completed" as const,
        energy: 100,
      },
    ],
    [],
  )

  const stats = useMemo(
    () => [
      { label: "Projects Built", value: 15, icon: Code, color: "from-blue-500 to-purple-500" },
      { label: "Lines of Code", value: 50000, icon: Terminal, color: "from-green-500 to-teal-500" },
      { label: "GitHub Repos", value: 25, icon: Github, color: "from-gray-500 to-gray-700" },
      { label: "Certifications", value: 8, icon: Award, color: "from-purple-500 to-pink-500" },
      { label: "Study Hours", value: 1000, icon: BookOpen, color: "from-indigo-500 to-purple-500" },
      { label: "Coffee Cups", value: 999, icon: Coffee, color: "from-amber-600 to-orange-600", suffix: "+" },
    ],
    [],
  )

  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "CrimeConnect",
        subtitle: "Case management system for law enforcement",
        description: "A comprehensive case management system designed for law enforcement agencies.",
        category: "Web App",
        status: "Ready for Deployment",
        color: "from-red-500 to-orange-500",
        icon: Shield,
        metrics: { funding: "Needs Funding", potential: "High Impact" },
        tech: ["React", "Node.js", "MongoDB", "Data Analytics"],
        github: "https://github.com/Flamechargerr/crime-connect-fbi",
        demo: "https://crime-connect-fbi.lovable.app/login",
        image: "/crime-management-dashboard.jpg",
      },
      {
        id: 2,
        title: "VARtificial Intelligence",
        subtitle: "AI-powered match predictor",
        description: "An intelligent sports prediction system using machine learning.",
        category: "AI/ML",
        status: "Live",
        color: "from-blue-500 to-purple-500",
        icon: Brain,
        metrics: { accuracy: "85%+", predictions: "1000+" },
        tech: ["Python", "Machine Learning", "React", "API Integration"],
        github: "https://github.com/Flamechargerr/VARtificial-Intelligence",
        demo: "https://match-predictor-genie-66.lovable.app/",
        image: "/ai-sports-prediction-dashboard.jpg",
      },
      {
        id: 3,
        title: "HackOps",
        subtitle: "Interactive cybersecurity learning platform",
        description: "A fun and interactive password-guessing game to test security skills!",
        category: "Security",
        status: "Live",
        color: "from-green-500 to-teal-500",
        icon: Shield,
        metrics: { users: "150+ Ready", challenges: "25+" },
        tech: ["JavaScript", "Node.js", "Cybersecurity", "Game Design"],
        github: "https://github.com/Flamechargerr/HackOps",
        demo: "https://playful-password-playground.lovable.app/",
        image: "/cybersecurity-hacking-game.jpg",
      },
      {
        id: 4,
        title: "Flora Fight Frenzy",
        subtitle: "Plants vs Zombies inspired tower defense",
        description: "An action-packed web game inspired by Plants vs. Zombies.",
        category: "Game",
        status: "UI Complete",
        color: "from-purple-500 to-pink-500",
        icon: Gamepad2,
        metrics: { completion: "95%", rating: "4.8/5" },
        tech: ["JavaScript", "HTML5 Canvas", "Game Physics", "Animation"],
        github: "https://github.com/Flamechargerr/flora-fight-frenzy",
        demo: "#",
        image: "/plants-vs-zombies-tower-defense-game.jpg",
      },
    ],
    [],
  )

  const profileCardData = useMemo(
    () => ({
      username: "@anamay_tripathy",
      bio: "Building the future with data science and full-stack development. Always learning, always creating.",
      status: ["DEVELOPER", "INNOVATOR", "LEADER", "CREATOR"],
      imageUrl: "/images/anamay-photo.png",
    }),
    [],
  )

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))

      if (hours < 12) setTimeOfDay("Good Morning")
      else if (hours < 17) setTimeOfDay("Good Afternoon")
      else setTimeOfDay("Good Evening")
    }

    updateTime()
    const interval = setInterval(updateTime, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const role = roles[currentRole]
    let index = 0
    const timer = setInterval(() => {
      if (index <= role.length) {
        setTypedText(role.slice(0, index))
        index++
      } else {
        setTimeout(() => {
          setCurrentRole((prev) => (prev + 1) % roles.length)
          setTypedText("")
        }, 1500)
        clearInterval(timer)
      }
    }, 60)
    return () => clearInterval(timer)
  }, [currentRole, roles])

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-10% 0px -10% 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id
        setSectionsInView((prev) => ({
          ...prev,
          [sectionId]: entry.isIntersecting,
        }))

        if (entry.isIntersecting) {
          setActiveSection(sectionId)
        }
      })
    }, observerOptions)

    const sections = ["home", "about", "experience", "projects", "skills", "contact"]
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const handleDownloadResume = useCallback(async () => {
    if (isDownloading) return

    setIsDownloading(true)
    try {
      window.open(
        "https://drive.google.com/file/d/1CIhftoy-TkqGL-gQsVopxk8UmtEcFTts/view?usp=sharing",
        "_blank",
        "noopener,noreferrer",
      )
      setIsDownloading(false)
    } catch (error) {
      console.error("Resume redirect failed:", error)
      setIsDownloading(false)
    }
  }, [isDownloading])

  const handleContactClick = useCallback((type: "email" | "phone" | "linkedin" | "github") => {
    const urls = {
      email: "mailto:tripathy.anamay23@gmail.com",
      phone: "tel:+919877454747",
      linkedin: "https://www.linkedin.com/in/anamay-tripathy-b53829296/",
      github: "https://github.com/Flamechargerr",
    }
    window.open(urls[type], "_blank", "noopener,noreferrer")
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  if (isLoading) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-white">Loading...</div>
          </div>
        }
      >
        <EnhancedLoadingScreen onComplete={handleLoadingComplete} />
      </Suspense>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      <Suspense fallback={null}>
        <NetworkBackground />
      </Suspense>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-gray-800/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex justify-between items-center px-4 md:px-6 py-3 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
              AT
            </div>
            <div className="hidden md:block">
              <p className="text-white font-bold text-lg">Anamay Tripathy</p>
              <p className="text-blue-400 text-sm flex items-center gap-2 font-medium">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                {timeOfDay} • {currentTime}
              </p>
            </div>
          </div>

          <div className="hidden lg:flex space-x-1">
            {["home", "about", "experience", "projects", "skills", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`px-3 py-2 rounded-lg transition-all duration-150 capitalize font-medium text-sm ${
                  activeSection === item
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden md:flex items-center gap-2 px-2 py-1 bg-green-500/20 rounded-full border border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-medium">Available</span>
            </div>
            <CinematicThemeSwitcher />
            <Button
              onClick={handleDownloadResume}
              disabled={isDownloading}
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
            >
              {isDownloading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              {isDownloading ? "Opening..." : "Resume"}
            </Button>
          </div>
        </div>
      </motion.nav>

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8 md:space-y-10 lg:space-y-12 relative z-10 pt-24 md:pt-28">
        {/* Hero Section */}
        <section id="home" className="py-8 md:py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <motion.div
              className="space-y-6 md:space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 font-medium text-sm md:text-base">
                    Currently available for opportunities
                  </span>
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                </div>

                <div className="space-y-3 md:space-y-4">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    <span className="text-white">Hey, I'm</span>
                    <br />
                    <span className="text-gradient-animate font-extrabold">Anamay Tripathy</span>
                  </h1>

                  <div className="h-16 md:h-20 flex items-center">
                    <p className="text-xl md:text-2xl lg:text-3xl text-blue-400 font-medium">
                      {typedText}
                      <span className="text-blue-500 text-2xl md:text-3xl lg:text-4xl animate-pulse">|</span>
                    </p>
                  </div>
                </div>

                <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl">
                  B.Tech Data Science Engineering student at{" "}
                  <span className="text-blue-400 font-bold">MIT Manipal</span>. Technical Head at{" "}
                  <span className="text-green-400 font-bold">YaanBarpe</span>, Data Analyst & Web Dev Intern at{" "}
                  <span className="text-purple-400 font-bold">Intellect Design Arena</span>.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 md:gap-4">
                <Button
                  onClick={() => handleContactClick("email")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base group shadow-lg"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Get In Touch
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-400 hover:bg-blue-500/10 px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-transparent"
                  onClick={() => scrollToSection("projects")}
                >
                  <Code className="w-4 h-4 mr-2" />
                  View Projects
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-500 text-gray-400 hover:bg-gray-500/10 px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-transparent"
                  onClick={() => handleContactClick("github")}
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pt-6 md:pt-8">
                {stats.slice(0, 6).map((stat, index) => (
                  <Card
                    key={index}
                    className="bg-gray-900/60 backdrop-blur-xl border-2 border-gray-700/50 hover:border-blue-500/50 transition-all duration-200 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />
                    </div>
                    <CardContent className="p-3 md:p-4 text-center relative z-10">
                      <div
                        className={`w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 md:mb-3 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center shadow-lg`}
                      >
                        <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                      <p className="text-lg md:text-2xl font-bold text-white">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix || ""} />
                      </p>
                      <p className="text-gray-400 text-xs md:text-sm font-medium">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col gap-6 md:gap-8 justify-center items-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <ProfileCard data={profileCardData} />
            </motion.div>
          </div>

          <div className="mt-8 md:mt-12 lg:mt-16 space-y-8 md:space-y-10">
            <Suspense fallback={<LoadingFallback height="300px" />}>
              <EnhancedDeveloperDashboard />
            </Suspense>

            <Suspense fallback={<LoadingFallback height="400px" />}>
              <GitHubStats />
            </Suspense>
          </div>
        </section>

        <section className="py-6 md:py-8">
          <HeroScrollDemo />
        </section>

        <section className="py-8 md:py-12 lg:py-14">
          <Suspense fallback={<LoadingFallback height="500px" />}>
            <SplineSceneBasic />
          </Suspense>
        </section>

        <section className="py-6 md:py-8">
          <SkillBadgesGame />
        </section>

        {/* My Journey & Experience Section */}
        <section id="experience" className="py-8 md:py-12 lg:py-14">
          <Suspense fallback={<LoadingFallback height="600px" />}>
            <EnhancedJourneySection />
          </Suspense>

          <div className="mt-8 md:mt-10 lg:mt-12 rounded-2xl overflow-hidden">
            <RadialOrbitalTimeline timelineData={timelineData} />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-8 md:py-12 lg:py-14">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-white">Featured Projects</h2>
            <p className="text-base md:text-lg text-gray-300">Scroll through my portfolio of innovative projects</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card className="bg-gray-900/60 backdrop-blur-xl border-2 border-gray-700/50 hover:border-blue-500/50 transition-all duration-200 overflow-hidden group relative h-full">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 blur-2xl`} />
                  </div>
                  <CardContent className="p-0 relative z-10">
                    <div className="relative h-40 md:h-56 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
                      <div className="absolute top-3 md:top-4 right-3 md:right-4 flex gap-2">
                        <Badge className={`bg-gradient-to-r ${project.color} text-white border-0 text-xs`}>
                          {project.category}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            project.status === "Live"
                              ? "border-green-500 text-green-300 bg-green-50/10"
                              : project.status === "Ready for Deployment"
                                ? "border-yellow-500 text-yellow-300 bg-yellow-50/10"
                                : "border-blue-500 text-blue-300 bg-blue-50/10"
                          }`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4 md:p-5 space-y-3 md:space-y-4">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-blue-400 font-medium text-xs md:text-sm">{project.subtitle}</p>
                      </div>

                      <p className="text-gray-300 leading-relaxed text-xs md:text-sm">{project.description}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 3).map((tech) => (
                          <Badge key={tech} className="bg-gray-800/60 text-blue-300 text-xs border border-gray-600/50">
                            {tech}
                          </Badge>
                        ))}
                        {project.tech.length > 3 && (
                          <Badge className="bg-gray-800/60 text-gray-400 text-xs border border-gray-600/50">
                            +{project.tech.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => window.open(project.github, "_blank", "noopener,noreferrer")}
                          className={`bg-gradient-to-r ${project.color} hover:opacity-90 text-white border-0 shadow-lg text-xs`}
                        >
                          <Github className="w-3 h-3 mr-1" />
                          Code
                        </Button>
                        {project.demo !== "#" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(project.demo, "_blank", "noopener,noreferrer")}
                            className="border-blue-500 text-blue-400 hover:bg-blue-500/10 text-xs"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Demo
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-8 md:py-12 lg:py-14">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-white">Why Work With Me?</h2>
            <p className="text-base md:text-lg text-gray-300">Proven track record of delivering excellence</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Certified & Skilled</h3>
                  <p className="text-gray-300">
                    8+ certifications including Meta Data Analyst and IBM GenAI, with 1000+ study hours invested in
                    continuous learning.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Production-Ready Code</h3>
                  <p className="text-gray-300">
                    50,000+ lines of clean, maintainable code across 15+ projects with focus on scalability and
                    performance.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Industry Experience</h3>
                  <p className="text-gray-300">
                    Technical Head at YaanBarpe and Data Analyst Intern at Intellect Design Arena with real-world
                    project experience.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Fast & Efficient</h3>
                  <p className="text-gray-300">
                    Quick turnaround on projects without compromising quality. Agile methodology with clear
                    communication.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <Terminal className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Full Stack Expertise</h3>
                  <p className="text-gray-300">
                    End-to-end development capabilities from UI/UX design to backend infrastructure and database
                    optimization.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Security Focused</h3>
                  <p className="text-gray-300">
                    Cybersecurity awareness and best practices implemented in all projects for data protection and
                    compliance.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-8 md:py-12 lg:py-14">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-white">
              Skills & Technologies
            </h2>
            <p className="text-base md:text-lg text-gray-300">My technical expertise across different domains</p>
          </div>
          <Suspense fallback={<LoadingFallback height="400px" />}>
            <SkillsSection />
          </Suspense>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-8 md:py-12 lg:py-14">
          <Suspense fallback={<LoadingFallback height="500px" />}>
            <EnhancedContactSection />
          </Suspense>
        </section>
      </div>
    </div>
  )
}
