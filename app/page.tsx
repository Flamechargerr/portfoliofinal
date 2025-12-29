"use client"

import dynamic from "next/dynamic"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ExperienceSection from "@/components/experience-section"
import SocialSection from "@/components/social-section"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import CursorTrail from "@/components/cursor-trail"
import GitHubActivity from "@/components/github-activity"
import LoadingScreen from "@/components/loading-screen"
import CurrentlyWorkingSection from "@/components/current-work-section"
import AchievementsSection from "@/components/achievements-section"
import FunFactsSection from "@/components/fun-facts"
import ContactForm from "@/components/contact-form"
import BlogSection from "@/components/blog-section"
import MusicPlayer from "@/components/music-player"
import WhyWorkWithMe from "@/components/why-work-with-me"
import { KeyboardShortcutsModal, useKeyboardShortcuts } from "@/components/keyboard-shortcuts"

// React Bits inspired components
import InfiniteMenu from "@/components/infinite-menu"
import { BackToTop, ScrollProgress } from "@/components/scroll-utilities"

// Interactive Features (Batch 1)
import { CommandPalette, ExplorationProgress, EasterEggs, LiveVisitorCount } from "@/components/interactive-features"
import { FloatingParticles, NoiseOverlay } from "@/components/visual-effects"

// Dynamically import heavy components
const SkillsRadar = dynamic(() => import("@/components/skills-radar"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-lorenzo-dark">
      <div className="text-lorenzo-accent animate-pulse">Loading Chart...</div>
    </div>
  ),
})

const ChatBot = dynamic(() => import("@/components/chat-bot"), {
  ssr: false,
})

const TypingAnimation = dynamic(() => import("@/components/typing-animation"), {
  ssr: false,
})

// Tech stack items for InfiniteMenu with images
const techStackItems = [
  { id: "react", label: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { id: "nextjs", label: "Next.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { id: "python", label: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { id: "typescript", label: "TypeScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { id: "nodejs", label: "Node.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { id: "tensorflow", label: "TensorFlow", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { id: "mongodb", label: "MongoDB", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { id: "docker", label: "Docker", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { id: "aws", label: "AWS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { id: "git", label: "Git", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { id: "pandas", label: "Pandas", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { id: "postgresql", label: "PostgreSQL", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
]

export default function Home() {
  useKeyboardShortcuts()

  return (
    <main id="main-content" className="relative cursor-none md:cursor-none">
      <LoadingScreen />
      {/* Global Visual Effects */}
      <FloatingParticles count={15} />
      <NoiseOverlay opacity={0.02} />

      {/* Global UI Enhancements */}
      <ScrollProgress />
      <BackToTop />
      <CommandPalette />
      <ExplorationProgress />
      <EasterEggs />

      {/* Live Visitor Count - Fixed Position */}
      <div className="fixed top-20 right-6 z-50 hidden lg:block">
        <LiveVisitorCount />
      </div>

      <CustomCursor />
      <CursorTrail />
      <ChatBot />
      <MusicPlayer />
      <KeyboardShortcutsModal />

      <Header />
      <HeroSection />

      <div className="relative z-10">
        {/* About Section */}
        <AboutSection />

        {/* Code Typing Animation */}
        <div className="py-16 bg-lorenzo-dark">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <TypingAnimation />
          </div>
        </div>

        {/* Why Work With Me Section */}
        <WhyWorkWithMe />

        {/* Tech Divider */}
        <div className="relative w-full h-[80px] md:h-[120px] overflow-hidden bg-lorenzo-light">
          <div className="absolute inset-0 tech-divider opacity-30" />
        </div>

        {/* Skills Section */}
        <SkillsSection />

        {/* Skills Radar Chart */}
        <SkillsRadar />

        {/* Tech Stack Section with React Bits InfiniteMenu */}
        <section className="py-16 bg-lorenzo-dark overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center mb-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-lorenzo-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-lorenzo-accent">
                TECH STACK
              </span>
              <div className="w-12 h-px bg-lorenzo-accent" />
            </div>
            <h3 className="text-2xl md:text-4xl font-brier text-lorenzo-light uppercase mb-2">
              MY <span className="text-lorenzo-accent">TECH UNIVERSE</span>
            </h3>
            <p className="text-lorenzo-light/50 text-sm">
              Hover to pause • Auto-scrolling tech showcase
            </p>
          </div>

          {/* React Bits: Infinite Scrolling Menu with Images */}
          <InfiniteMenu
            items={techStackItems}
            speed={40}
            pauseOnHover={true}
          />
        </section>

        {/* Currently Working On */}
        <CurrentlyWorkingSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* GitHub Activity */}
        <GitHubActivity />

        {/* Tech Divider */}
        <div className="relative w-full h-[80px] md:h-[120px] overflow-hidden bg-lorenzo-light">
          <div className="absolute inset-0 tech-divider opacity-30 rotate-180" />
        </div>

        {/* Experience Section */}
        <ExperienceSection />

        {/* Achievements Section */}
        <AchievementsSection />

        {/* Blog Section */}
        <BlogSection />

        {/* Fun Facts */}
        <FunFactsSection />

        {/* Contact Form */}
        <ContactForm />

        {/* Social Section */}
        <SocialSection />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  )
}


