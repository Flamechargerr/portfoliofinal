"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import ResumeModal from "./resume-modal"
import KineticMobileMenu from "./kinetic-mobile-menu"
import { Ripple } from "@/components/ui/material-design-3-ripple"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#selected-works" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Detect active section
      const sections = navItems.map(item => item.href.replace("#", ""))
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled
            ? "bg-lorenzo-dark/95 backdrop-blur-sm py-4"
            : "bg-transparent py-6"}
        `}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <motion.span
              className="text-2xl md:text-3xl font-brier text-lorenzo-accent uppercase tracking-tight"
              whileHover={{ scale: 1.05 }}
            >
              ANAMAY
            </motion.span>
            <span className="text-xs text-lorenzo-light/50 uppercase tracking-widest hidden sm:inline">
              .dev
            </span>
            {/* Current section indicator */}
            {isScrolled && activeSection && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:flex items-center gap-2 ml-4 text-xs text-lorenzo-light/40 uppercase tracking-wider"
              >
                <span className="w-1 h-1 bg-lorenzo-accent rounded-full" />
                {activeSection}
              </motion.span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`
                  relative px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors rounded-lg overflow-hidden
                  ${activeSection === item.href.replace("#", "")
                    ? "text-lorenzo-accent"
                    : "text-lorenzo-light/70 hover:text-lorenzo-accent"}
                `}
              >
                <Ripple className="text-lorenzo-accent" opacity={0.15} />
                {item.name}
                {activeSection === item.href.replace("#", "") && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-lorenzo-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <ResumeModal />
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="relative px-6 py-3 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase text-xs tracking-wider hover:shadow-lg hover:shadow-lorenzo-accent/30 transition-all rounded overflow-hidden"
            >
              <Ripple className="text-lorenzo-dark" opacity={0.2} />
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 touch-target focus-ring rounded"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-lorenzo-accent block"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-lorenzo-accent block"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-lorenzo-accent block"
            />
          </button>
        </div>
      </motion.header>

      {/* Kinetic Mobile Menu */}
      <KineticMobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}
