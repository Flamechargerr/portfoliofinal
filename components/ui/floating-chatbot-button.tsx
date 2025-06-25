"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import AIChatbot from "@/components/ai-chatbot"

export function FloatingChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button - Moved to top-right */}
      <motion.div
        className="fixed top-6 right-6 z-[60]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={() => setIsOpen(true)}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 group relative overflow-hidden"
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />

                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-0 border-2 border-blue-400/50 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />

                <div className="relative z-10 flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform duration-200" />
                </div>

                {/* Sparkle effect */}
                <motion.div
                  className="absolute top-1 right-1"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </motion.div>
              </Button>

              {/* Tooltip */}
              <motion.div
                className="absolute top-full right-0 mt-3 px-4 py-2 bg-gray-900/90 backdrop-blur-xl text-white text-sm rounded-lg border border-gray-700/50 whitespace-nowrap shadow-xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
              >
                Ask me about Anamay!
                <div className="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900/90" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Close button when chatbot is open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={() => setIsOpen(false)}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 group"
              >
                <X className="w-7 h-7 group-hover:scale-110 transition-transform duration-200" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* AI Chatbot - Positioned in top-right area */}
      <div className="fixed top-6 right-6 z-[55]">
        <AIChatbot isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      </div>
    </>
  )
}
