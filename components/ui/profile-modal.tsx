"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Github, Linkedin, Mail, Award, Code, Briefcase, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/30 z-[101] overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-800/80 hover:bg-gray-700 border border-gray-600 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-300" />
            </button>

            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 animate-pulse" />

            {/* Content */}
            <div className="relative z-10 p-8 space-y-6">
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-50 blur-xl animate-pulse" />
                  <img
                    src="/images/anamay-photo.png"
                    alt="Anamay Tripathy"
                    className="relative w-32 h-32 rounded-full object-cover border-4 border-cyan-500 shadow-2xl"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Anamay Tripathy</h2>
                  <p className="text-cyan-400 font-mono font-bold">@anamay_tripathy</p>
                </div>
              </div>

              {/* Bio */}
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <p className="text-gray-300 text-center leading-relaxed">
                  Passionate Data Science Engineering student at{" "}
                  <span className="text-blue-400 font-bold">MIT Manipal</span>, combining technical expertise with
                  leadership as Technical Head at <span className="text-green-400 font-bold">YaanBarpe</span>. Building
                  innovative solutions at the intersection of data science, AI, and full-stack development.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-blue-500/30 text-center">
                  <Code className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">15+</p>
                  <p className="text-gray-400 text-sm">Projects</p>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl p-4 border border-green-500/30 text-center">
                  <Award className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">8+</p>
                  <p className="text-gray-400 text-sm">Certifications</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30 text-center">
                  <Briefcase className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">3+</p>
                  <p className="text-gray-400 text-sm">Roles</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-orange-500/30 text-center">
                  <GraduationCap className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">2027</p>
                  <p className="text-gray-400 text-sm">Graduation</p>
                </div>
              </div>

              {/* Current Status */}
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-4 border border-green-500/30">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-green-400 font-bold">Available for Opportunities</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => window.open("https://github.com/Flamechargerr", "_blank")}
                  className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white"
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Button>
                <Button
                  onClick={() => window.open("https://www.linkedin.com/in/anamay-tripathy-b53829296/", "_blank")}
                  className="bg-blue-600 hover:bg-blue-700 border-0 text-white"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </Button>
                <Button
                  onClick={() => window.open("mailto:tripathy.anamay23@gmail.com", "_blank")}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 border-0 text-white"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
