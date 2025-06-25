"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Code, Database, Brain, Rocket, Sparkles, Coffee } from "lucide-react"

interface LoadingScreenProps {
  onComplete: () => void
}

export function EnhancedLoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const loadingSteps = [
    { label: "Initializing Portfolio", icon: Code, color: "from-blue-500 to-cyan-500" },
    { label: "Loading Projects", icon: Rocket, color: "from-purple-500 to-pink-500" },
    { label: "Connecting AI Assistant", icon: Brain, color: "from-green-500 to-emerald-500" },
    { label: "Preparing Experience", icon: Database, color: "from-orange-500 to-red-500" },
    { label: "Brewing Coffee", icon: Coffee, color: "from-amber-500 to-yellow-500" },
    { label: "Ready to Launch", icon: Sparkles, color: "from-indigo-500 to-purple-500" },
  ]

  const CurrentIcon = loadingSteps[currentStep]?.icon

  useEffect(() => {
    // Ultra-fast loading - completes in ~1.5 seconds
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(onComplete, 100) // Immediate transition
          return 100
        }
        return prev + 8 // Very fast progress
      })
    }, 30) // Very fast interval

    // Very fast step progression
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepInterval)
          return prev
        }
        return prev + 1
      })
    }, 250) // Ultra-fast steps

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Minimal background - no heavy animations */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                delay: Math.random(),
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4 md:p-8">
          <motion.div
            className="text-center space-y-8 md:space-y-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Logo/Title */}
            <div className="space-y-4 md:space-y-6">
              <motion.h1
                className="text-5xl md:text-7xl lg:text-9xl font-bold leading-none"
                style={{
                  background:
                    "linear-gradient(135deg, #06b6d4 0%, #3b82f6 25%, #8b5cf6 50%, #ec4899 75%, #06b6d4 100%)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                Anamay
                <br />
                <span className="text-4xl md:text-6xl lg:text-8xl text-gray-400">Tripathy</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl lg:text-2xl text-gray-300 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                Building innovative solutions with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Data Science
                </span>{" "}
                &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  AI-powered
                </span>{" "}
                simplicity
              </motion.p>
            </div>

            {/* Loading Progress */}
            <div className="space-y-6 md:space-y-8">
              {/* Current Step */}
              <motion.div
                className="flex items-center justify-center gap-3 md:gap-4"
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r ${loadingSteps[currentStep]?.color} flex items-center justify-center shadow-lg`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  {loadingSteps[currentStep] && CurrentIcon && (
                    <CurrentIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  )}
                </motion.div>
                <span className="text-base md:text-lg text-gray-300 font-medium">
                  {loadingSteps[currentStep]?.label}
                </span>
              </motion.div>

              {/* Progress Bar */}
              <div className="w-full max-w-md mx-auto">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Loading Portfolio</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              {/* Loading Steps Indicator */}
              <div className="flex justify-center gap-2 md:gap-3">
                {loadingSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
                      index <= currentStep ? `bg-gradient-to-r ${step.color}` : "bg-gray-700"
                    }`}
                    animate={{
                      scale: index === currentStep ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: index === currentStep ? Number.POSITIVE_INFINITY : 0,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Status - Only show when nearly complete */}
            {progress >= 85 && (
              <motion.div
                className="flex justify-center items-center pt-6 md:pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 text-green-400">
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.4, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <span className="text-sm font-medium">Launching Portfolio...</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default EnhancedLoadingScreen
