"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative overflow-hidden group border-2 border-blue-400/30 bg-gradient-to-r from-blue-50/10 to-purple-50/10 hover:from-blue-100/20 hover:to-purple-100/20 dark:from-gray-800/50 dark:to-gray-900/50 dark:hover:from-gray-700/60 dark:hover:to-gray-800/60 transition-all duration-500 backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <motion.div
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative z-10"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-blue-600 dark:text-blue-400" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-purple-600 dark:text-purple-400 top-0 left-0" />
      </motion.div>

      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
