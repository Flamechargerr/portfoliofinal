"use client"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
}

export default function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.04
}: SplitTextProps) {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <span className={className}>{text}</span>
  }

  const words = text.split(" ")

  const containerVars = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      }
    }
  }

  const childVars = {
    hidden: { 
      opacity: 0, 
      y: 35,
      scale: 0.85
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 120
      }
    }
  }

  return (
    <motion.span
      ref={ref}
      variants={containerVars}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex overflow-hidden mr-[0.25em] whitespace-nowrap">
          {word.split("").map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              variants={childVars}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  )
}
