"use client"
import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface TrueFocusProps {
  sentence: string
  focusWords: string[]
  className?: string
  accentColor?: string
}

export default function TrueFocus({
  sentence,
  focusWords,
  className = "",
  accentColor = "text-[#c8f550]"
}: TrueFocusProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  const words = sentence.split(" ")

  return (
    <p
      ref={containerRef}
      className={`leading-relaxed transition-all duration-700 ${className}`}
    >
      {words.map((word, index) => {
        // Clean word leading/trailing punctuation to match focusWords accurately while preserving internal hyphens
        const cleanWord = word.replace(/^[.,\/#!$%\^&\*;:{}=\-_`~()""'']+|[.,\/#!$%\^&\*;:{}=\-_`~()""'']+$/g, "").toLowerCase()
        const isFocused = focusWords.some(fw => fw.toLowerCase() === cleanWord)

        return (
          <motion.span
            key={index}
            className="inline-block mr-[0.25em] transition-all duration-500"
            style={{
              filter: isInView
                ? isFocused
                  ? "blur(0px)"
                  : "blur(0.8px)"
                : "blur(1.5px)",
              opacity: isInView
                ? isFocused
                  ? 1
                  : 0.55
                : 0.25
            }}
            animate={isInView ? { scale: isFocused ? 1.05 : 1 } : {}}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: index * 0.01 }}
          >
            <span className={isFocused ? `${accentColor} font-bold` : "text-white/80"}>
              {word}
            </span>
          </motion.span>
        )
      })}
    </p>
  )
}
