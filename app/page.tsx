"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import ProfileCard from "@/components/ui/profile-card"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import CinematicThemeSwitcher from "@/components/ui/cinematic-theme-switcher"
import { RadialOrbitalTimeline } from "@/components/ui/radial-orbital-timeline"
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
import Image from "next/image"

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

  const timelineEvents = useMemo(
    () => [
      {
        id: 1,
        year: "2023",
        title: "Started B.Tech",
        description: "Began Data Science Engineering at MIT Manipal",
        icon: "🎓",
      },
      {
        id: 2,
        year: "2024",
        title: "Technical Head",
        description: "Led technical development at YaanBarpe Startup",
        icon: "🚀",
      },
      {
        id: 3,
        year: "2024",
        title: "Data Analyst Intern",
        description: "Joined Intellect Design Arena",
        icon: "💼",
      },
      {
        id: 4,
        year: "2024",
        title: "Meta Certified",
        description: "Completed Meta Data Analyst Certification",
        icon: "📊",
      },
      {
        id: 5,
        year: "2024",
        title: "IBM GenAI Pro",
        description: "Certified in Generative AI by IBM",
        icon: "🤖",
      },
      {
        id: 6,
        year: "2027",
        title: "Graduation",
        description: "Expected graduation from MIT Manipal",
        icon: "🎯",
      },
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
      tier: 3,
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
      await new Promise((resolve) => setTimeout(resolve, 800))
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
                  className="border-blue-500 text-blue-400 hover:bg-blue-500/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg bg-transparent"
                  onClick={() => scrollToSection("projects")}
                >
                  <Code className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  View Projects
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-500 text-gray-400 hover:bg-gray-500/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg bg-transparent"
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
                    className="bg-gray-900/60 backdrop-blur-xl border-2 border-gray-700/50 hover:border-blue-500/50 transition-all duration-200 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />
                    </div>
                    <CardContent className="p-3 md:p-4 text-center relative z-10">
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

            <motion.div
              className="flex justify-center items-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <ProfileCard data={profileCardData} />
            </motion.div>
          </div>

          <div className="mt-12 md:mt-16">
            <Suspense fallback={<LoadingFallback height="300px" />}>
              <EnhancedDeveloperDashboard />
            </Suspense>
          </div>
        </section>

        <section className="py-10 md:py-20">
          <ContainerScroll
            titleComponent={
              <>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured Project Showcase</h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                  Scroll to explore CrimeConnect - my flagship case management system
                </p>
              </>
            }
          >
            <Image
              src="/crime-management-dashboard.jpg"
              alt="CrimeConnect - Case Management System"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-center"
              draggable={false}
            />
          </ContainerScroll>
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

        <section className="py-10 md:py-20">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white">My Journey</h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              A visual timeline of my academic and professional milestones
            </p>
          </div>
          <div className="flex justify-center items-center">
            <RadialOrbitalTimeline events={timelineEvents} />
          </div>
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
                <Card className="bg-gray-900/60 backdrop-blur-xl border-2 border-gray-700/50 hover:border-blue-500/50 transition-all duration-200 overflow-hidden group relative">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 blur-2xl`} />
                  </div>
                  <CardContent className="p-0 relative z-10">
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
    </div>
  )
}
