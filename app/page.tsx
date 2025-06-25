"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { CircularProgress } from "@/components/ui/circular-progress"
import { FloatingChatbotButton } from "@/components/ui/floating-chatbot-button"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
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
  Database,
  Award,
  Rocket,
  Star,
  TrendingUp,
  DollarSign,
  Users,
} from "lucide-react"
import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from "react"
import { motion } from "framer-motion"

// Lazy load heavy components for better performance
const NetworkBackground = lazy(() =>
  import("@/components/ui/network-background").then((m) => ({ default: m.NetworkBackground })),
)
const StaticExperienceGrid = lazy(() =>
  import("@/components/ui/static-experience-grid").then((m) => ({ default: m.StaticExperienceGrid })),
)
const EnhancedJourneySection = lazy(() =>
  import("@/components/ui/enhanced-journey-section").then((m) => ({ default: m.EnhancedJourneySection })),
)
const SkillsSection = lazy(() => import("@/components/ui/skills-section").then((m) => ({ default: m.SkillsSection })))
const EnhancedDeveloperDashboard = lazy(() =>
  import("@/components/ui/enhanced-developer-dashboard").then((m) => ({ default: m.EnhancedDeveloperDashboard })),
)
const EnhancedContactSection = lazy(() =>
  import("@/components/ui/enhanced-contact-section").then((m) => ({ default: m.EnhancedContactSection })),
)
const EnhancedLoadingScreen = lazy(() => import("@/components/ui/enhanced-loading-screen"))

// Loading fallback component
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

  // Memoized static data
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

  const experienceItems = useMemo(
    () => [
      {
        id: 1,
        title: "Technical Head",
        org: "YaanBarpe Startup",
        year: "2024",
        duration: "6 months",
        icon: Rocket,
        color: "from-purple-600 via-pink-600 to-red-600",
        size: "large" as const,
        description: "Leading technical development for student startup, managing a team of 5 developers.",
        achievements: [
          "Built MVP from scratch using React and Node.js",
          "Implemented CI/CD pipeline reducing deployment time by 70%",
          "Led technical interviews and onboarded 3 new developers",
          "Scaled application to handle 10k+ concurrent users",
        ],
        skills: ["Leadership", "React", "Node.js", "DevOps", "Team Management"],
      },
      {
        id: 2,
        title: "Data Analyst & Web Dev Intern",
        org: "Intellect Design Arena",
        year: "2024",
        duration: "3 months",
        icon: Briefcase,
        color: "from-blue-600 via-indigo-600 to-purple-600",
        size: "medium" as const,
        description: "Worked on fintech solutions combining data analysis and web development.",
        achievements: [
          "Analyzed financial data patterns for 10k+ daily transactions",
          "Built interactive dashboards for real-time data visualization",
          "Optimized database queries improving performance by 40%",
          "Developed microservices for data processing pipelines",
        ],
        skills: ["Data Analysis", "Python", "SQL", "React", "Spring Boot"],
      },
      {
        id: 3,
        title: "E-Cell Executive",
        org: "MIT Manipal",
        year: "2024",
        duration: "1 year",
        icon: Award,
        color: "from-green-600 via-emerald-600 to-teal-600",
        size: "small" as const,
        description: "Organizing entrepreneurship events and managing the official E-Cell website.",
        achievements: [
          "Organized 5+ major entrepreneurship events",
          "Built and maintained E-Cell website using Next.js",
          "Managed event registrations for 300+ participants",
        ],
        skills: ["Event Management", "Next.js", "Digital Marketing"],
      },
      {
        id: 4,
        title: "Class Representative",
        org: "Student Council MIT",
        year: "2023-24",
        duration: "1 year",
        icon: Users,
        color: "from-orange-600 via-red-600 to-pink-600",
        size: "medium" as const,
        description: "Representing student interests and facilitating communication between faculty and students.",
        achievements: [
          "Represented 60+ students in academic matters",
          "Organized study groups and peer learning sessions",
          "Facilitated feedback collection and implementation",
        ],
        skills: ["Communication", "Leadership", "Problem Solving"],
      },
      {
        id: 5,
        title: "Meta Data Analyst Certified",
        org: "Meta",
        year: "2024",
        duration: "3 months",
        icon: Database,
        color: "from-cyan-600 via-blue-600 to-indigo-600",
        size: "large" as const,
        description: "Completed comprehensive data analysis certification.",
        achievements: [
          "Mastered statistical analysis and hypothesis testing",
          "Built interactive dashboards using Tableau",
          "Completed 5 real-world data analysis projects",
          "Achieved 95% score in final certification exam",
        ],
        skills: ["Data Analysis", "Statistics", "Tableau", "Python", "SQL"],
      },
      {
        id: 6,
        title: "IBM GenAI Professional",
        org: "IBM",
        year: "2024",
        duration: "2 months",
        icon: Brain,
        color: "from-violet-600 via-purple-600 to-fuchsia-600",
        size: "small" as const,
        description: "Certified in Generative AI and machine learning concepts.",
        achievements: [
          "Built 3 AI-powered applications using OpenAI APIs",
          "Learned prompt engineering and fine-tuning techniques",
          "Implemented RAG systems for document processing",
        ],
        skills: ["Generative AI", "Machine Learning", "Python"],
      },
    ],
    [],
  )

  const quickFacts = useMemo(
    () => [
      { label: "Age", value: 21, suffix: "", color: "#3b82f6", percentage: 85 },
      { label: "Experience", value: 2, suffix: "+ Years", color: "#10b981", percentage: 70 },
      { label: "Projects", value: 15, suffix: "+ Built", color: "#8b5cf6", percentage: 90 },
      { label: "CGPA", value: 7.7, suffix: "/10", color: "#f59e0b", percentage: 77 },
      { label: "Certifications", value: 8, suffix: "+", color: "#ec4899", percentage: 80 },
      { label: "Coffee Cups", value: 999, suffix: "+", color: "#f97316", percentage: 95 },
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
      },
    ],
    [],
  )

  // Optimized time update with reduced frequency
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
    const interval = setInterval(updateTime, 30000) // Update every 30 seconds instead of 1 second
    return () => clearInterval(interval)
  }, [])

  // Optimized typing effect with faster completion
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
        }, 1500) // Reduced delay
        clearInterval(timer)
      }
    }, 60) // Faster typing
    return () => clearInterval(timer)
  }, [currentRole, roles])

  // Fast loading completion
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  // Highly optimized scroll handler with intersection observer
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

  // Optimized handlers with debouncing
  const handleDownloadResume = useCallback(async () => {
    if (isDownloading) return

    setIsDownloading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800)) // Faster simulation
      const link = document.createElement("a")
      link.href = "/resume-anamay-tripathy.pdf"
      link.download = "Anamay_Tripathy_Resume.pdf"
      link.click()
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
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

  // Show loading screen
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
      {/* Lazy loaded Network Background */}
      <Suspense fallback={null}>
        <NetworkBackground />
      </Suspense>

      {/* Optimized Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-gray-800/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex justify-between items-center px-4 md:px-6 py-3 max-w-7xl mx-auto">
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
            <ThemeToggle />
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
              {isDownloading ? "Downloading..." : "Resume"}
            </Button>
          </div>
        </div>
      </motion.nav>

      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-20 md:space-y-32 relative z-10 pt-20 md:pt-24">
        {/* Hero Section */}
        <section id="home" className="py-10 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
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
                  <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold leading-tight">
                    <span className="text-white">Hey, I'm</span>
                    <br />
                    <span className="text-gradient-animate font-extrabold">Anamay Tripathy</span>
                  </h1>

                  <div className="h-16 md:h-20 flex items-center">
                    <p className="text-xl md:text-3xl text-blue-400 font-medium">
                      {typedText}
                      <span className="text-blue-500 text-2xl md:text-4xl animate-pulse">|</span>
                    </p>
                  </div>
                </div>

                <p className="text-base md:text-xl text-gray-300 leading-relaxed max-w-2xl">
                  B.Tech Data Science Engineering student at{" "}
                  <span className="text-blue-400 font-bold">MIT Manipal</span>. Technical Head at{" "}
                  <span className="text-green-400 font-bold">YaanBarpe</span>, Data Analyst & Web Dev Intern at{" "}
                  <span className="text-purple-400 font-bold">Intellect Design Arena</span>.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 md:gap-4">
                <Button
                  onClick={() => handleContactClick("email")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg group shadow-lg"
                >
                  <Mail className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Get In Touch
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-400 hover:bg-blue-500/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg"
                  onClick={() => scrollToSection("projects")}
                >
                  <Code className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  View Projects
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-500 text-gray-400 hover:bg-gray-500/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg"
                  onClick={() => handleContactClick("github")}
                >
                  <Github className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  GitHub
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pt-6 md:pt-8">
                {stats.slice(0, 6).map((stat, index) => (
                  <Card
                    key={index}
                    className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-200"
                  >
                    <CardContent className="p-3 md:p-4 text-center">
                      <div
                        className={`w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 md:mb-3 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
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

            {/* Profile Card */}
            <motion.div
              className="space-y-6 md:space-y-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
                <CardContent className="p-6 md:p-8">
                  <div className="text-center space-y-4 md:space-y-6">
                    {/* Profile Avatar */}
                    <div className="relative mx-auto w-24 h-24 md:w-32 md:h-32">
                      <div className="w-full h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl">
                        <span className="text-white font-bold text-2xl md:text-3xl">AT</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-8 md:h-8 bg-green-400 rounded-full border-2 md:border-4 border-gray-900 flex items-center justify-center">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full animate-pulse" />
                      </div>
                    </div>

                    <div className="space-y-2 md:space-y-3">
                      <h3 className="text-xl md:text-2xl font-bold text-white">Anamay Tripathy</h3>
                      <p className="text-blue-400 text-sm md:text-base font-medium">B.Tech Data Science Engineering</p>
                      <div className="flex justify-center gap-2 md:gap-3">
                        <Badge className="bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm">
                          MIT Manipal
                        </Badge>
                        <Badge className="bg-purple-500/20 text-purple-300 border border-purple-400/30 px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm">
                          Class of 2027
                        </Badge>
                      </div>
                    </div>

                    {/* Quick Facts */}
                    <div className="grid grid-cols-3 gap-4 md:gap-6 pt-4 md:pt-6">
                      {quickFacts.slice(0, 3).map((fact, index) => (
                        <div key={fact.label} className="text-center">
                          <div className="p-4 md:p-6 rounded-xl bg-gray-800/60 border border-gray-700/50 hover:bg-gray-800/80 transition-all duration-200">
                            <CircularProgress
                              percentage={fact.percentage}
                              size={60}
                              color={fact.color}
                              value={fact.value.toString() + fact.suffix}
                              label={fact.label}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 md:gap-3 pt-3 md:pt-4">
                      <Button
                        size="sm"
                        onClick={() => handleContactClick("github")}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
                      >
                        <Github className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                        GitHub
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleContactClick("linkedin")}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                      >
                        <Linkedin className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Cards */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <Card className="bg-green-500/10 border border-green-400/20">
                  <CardContent className="p-4 md:p-5">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-11 md:h-11 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                        <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-xs md:text-sm">Currently Working</p>
                        <p className="text-green-400 text-xs font-medium">3 Active Roles</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-500/10 border border-blue-400/20">
                  <CardContent className="p-4 md:p-5">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-11 md:h-11 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-xs md:text-sm">Currently Learning</p>
                        <p className="text-blue-400 text-xs font-medium">Data Science & AI</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Card */}
              <Card className="bg-gray-900/60 border border-gray-700/50">
                <CardContent className="p-4 md:p-6">
                  <h4 className="text-white font-semibold mb-3 md:mb-4 text-sm">Quick Contact</h4>
                  <div className="space-y-2 md:space-y-3">
                    {[
                      { icon: MapPin, text: "Mumbai, India 🇮🇳", color: "text-purple-400", action: null },
                      {
                        icon: Mail,
                        text: "tripathy.anamay23@gmail.com",
                        color: "text-blue-400",
                        action: () => handleContactClick("email"),
                      },
                      {
                        icon: Phone,
                        text: "+91 9877454747",
                        color: "text-green-400",
                        action: () => handleContactClick("phone"),
                      },
                    ].map((contact, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 md:gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
                        onClick={contact.action || undefined}
                      >
                        <contact.icon className={`w-3 h-3 md:w-4 md:h-4 ${contact.color}`} />
                        <span className="text-gray-300 text-xs font-medium">{contact.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Developer Dashboard */}
          <div className="mt-12 md:mt-16">
            <Suspense fallback={<LoadingFallback height="300px" />}>
              <EnhancedDeveloperDashboard />
            </Suspense>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-10 md:py-20">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white">About Me</h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Passionate student exploring the intersection of technology and innovation
            </p>
          </div>
          <Suspense fallback={<LoadingFallback height="500px" />}>
            <EnhancedJourneySection />
          </Suspense>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-10 md:py-20">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white">Experience & Achievements</h2>
            <p className="text-lg md:text-xl text-gray-300">My journey through various roles and accomplishments</p>
          </div>
          <Suspense fallback={<LoadingFallback height="600px" />}>
            <StaticExperienceGrid items={experienceItems} />
          </Suspense>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-10 md:py-20">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white">Featured Projects</h2>
            <p className="text-lg md:text-xl text-gray-300">Real projects I've built and deployed</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-200 overflow-hidden group">
                  <CardContent className="p-0">
                    <div className="relative h-48 md:h-64 overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity`}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={`w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br ${project.color} rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl`}
                        >
                          <project.icon className="w-8 h-8 md:w-12 md:h-12 text-white" />
                        </div>
                      </div>
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

                    <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-blue-400 font-medium text-sm md:text-base">{project.subtitle}</p>
                      </div>

                      <p className="text-gray-300 leading-relaxed text-sm md:text-base">{project.description}</p>

                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        {Object.entries(project.metrics)
                          .slice(0, 2)
                          .map(([key, value]) => (
                            <div
                              key={key}
                              className="text-center p-2 md:p-3 bg-gray-800/60 rounded-lg border border-gray-700/50"
                            >
                              <p className="text-lg md:text-xl font-bold text-white flex items-center justify-center gap-1">
                                {value}
                                {key === "rating" && (
                                  <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
                                )}
                                {key === "completion" && (
                                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                                )}
                                {key === "funding" && <DollarSign className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />}
                              </p>
                              <p className="text-gray-400 text-xs md:text-sm capitalize font-medium">{key}</p>
                            </div>
                          ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {project.tech.slice(0, 4).map((tech) => (
                          <Badge key={tech} className="bg-gray-800/60 text-blue-300 text-xs border border-gray-600/50">
                            {tech}
                          </Badge>
                        ))}
                        {project.tech.length > 4 && (
                          <Badge className="bg-gray-800/60 text-gray-400 text-xs border border-gray-600/50">
                            +{project.tech.length - 4} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2 md:gap-3">
                        <Button
                          size="sm"
                          onClick={() => window.open(project.github, "_blank", "noopener,noreferrer")}
                          className={`bg-gradient-to-r ${project.color} hover:opacity-90 text-white border-0 shadow-lg`}
                        >
                          <Github className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                          Code
                        </Button>
                        {project.demo !== "#" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(project.demo, "_blank", "noopener,noreferrer")}
                            className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                          >
                            <ExternalLink className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
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

        {/* Skills Section */}
        <section id="skills" className="py-10 md:py-20">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white">Skills & Technologies</h2>
            <p className="text-lg md:text-xl text-gray-300">My technical expertise across different domains</p>
          </div>
          <Suspense fallback={<LoadingFallback height="400px" />}>
            <SkillsSection />
          </Suspense>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-10 md:py-20">
          <Suspense fallback={<LoadingFallback height="500px" />}>
            <EnhancedContactSection />
          </Suspense>
        </section>
      </div>

      {/* Floating Chatbot Button */}
      <FloatingChatbotButton />
    </div>
  )
}
