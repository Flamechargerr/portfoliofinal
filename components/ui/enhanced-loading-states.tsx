"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code } from "lucide-react"

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Dashboard Skeleton */}
      <Card className="bg-gray-900/60 border-blue-500/30 backdrop-blur-xl lg:col-span-2 shadow-2xl">
        <CardContent className="p-6">
          <div className="space-y-6 animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl" />
                <div className="space-y-2">
                  <div className="w-48 h-6 bg-gray-700 rounded" />
                  <div className="w-32 h-4 bg-gray-800 rounded" />
                </div>
              </div>
              <div className="w-20 h-8 bg-gray-700 rounded" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-800/50 rounded-lg p-4 space-y-2">
                  <div className="w-12 h-12 bg-gray-700 rounded-xl" />
                  <div className="w-16 h-6 bg-gray-700 rounded" />
                  <div className="w-20 h-4 bg-gray-800 rounded" />
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className="space-y-4">
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex-1 h-10 bg-gray-800/50 rounded" />
                ))}
              </div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-700 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <div className="w-32 h-4 bg-gray-700 rounded" />
                        <div className="w-48 h-3 bg-gray-800 rounded" />
                      </div>
                      <div className="w-16 h-6 bg-gray-700 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Side Panel Skeleton */}
      <Card className="bg-gray-900/60 border-blue-500/30 backdrop-blur-xl shadow-2xl">
        <CardContent className="p-6">
          <div className="space-y-6 animate-pulse">
            <div className="space-y-2">
              <div className="w-32 h-6 bg-gray-700 rounded" />
              <div className="w-24 h-4 bg-gray-800 rounded" />
            </div>

            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-24 h-4 bg-gray-700 rounded" />
                  <div className="w-12 h-6 bg-gray-700 rounded" />
                </div>
                <div className="w-16 h-8 bg-gray-700 rounded" />
                <div className="w-20 h-3 bg-gray-800 rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function ContactFormSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Form Skeleton */}
      <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-4 animate-pulse">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl" />
            <div className="space-y-2">
              <div className="w-32 h-6 bg-gray-700 rounded" />
              <div className="w-48 h-4 bg-gray-800 rounded" />
            </div>
          </div>
        </div>

        <CardContent className="p-8">
          <div className="space-y-6 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="w-16 h-4 bg-gray-700 rounded" />
                <div className="w-full h-12 bg-gray-800/50 rounded-xl" />
              </div>
              <div className="space-y-2">
                <div className="w-16 h-4 bg-gray-700 rounded" />
                <div className="w-full h-12 bg-gray-800/50 rounded-xl" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="w-20 h-4 bg-gray-700 rounded" />
              <div className="w-full h-12 bg-gray-800/50 rounded-xl" />
            </div>

            <div className="space-y-2">
              <div className="w-20 h-4 bg-gray-700 rounded" />
              <div className="w-full h-32 bg-gray-800/50 rounded-xl" />
            </div>

            <div className="w-full h-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl" />
          </div>
        </CardContent>
      </Card>

      {/* Contact Info Skeleton */}
      <div className="space-y-8 animate-pulse">
        <div className="space-y-4">
          <div className="w-32 h-6 bg-gray-700 rounded" />
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-gray-800/50 border border-gray-700/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-700 rounded-xl" />
                  <div className="space-y-2">
                    <div className="w-20 h-4 bg-gray-700 rounded" />
                    <div className="w-32 h-4 bg-gray-800 rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <div className="w-24 h-6 bg-gray-700 rounded" />
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-gray-700 rounded-xl" />
            <div className="w-16 h-16 bg-gray-700 rounded-xl" />
          </div>
        </div>

        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
          <CardContent className="p-8">
            <div className="space-y-4">
              <div className="w-40 h-6 bg-gray-700 rounded" />
              <div className="w-full h-4 bg-gray-800 rounded" />
              <div className="w-3/4 h-4 bg-gray-800 rounded" />
              <div className="flex gap-3">
                <div className="w-32 h-8 bg-gray-700 rounded" />
                <div className="w-28 h-8 bg-gray-700 rounded" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function LoadingSpinner({
  size = "default",
  text = "Loading...",
}: {
  size?: "sm" | "default" | "lg"
  text?: string
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8",
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <motion.div
        className={`${sizeClasses[size]} border-2 border-blue-400/30 border-t-blue-400 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <span className="text-gray-400 text-sm font-medium">{text}</span>
    </div>
  )
}

export function ProgressiveLoader({
  steps,
  currentStep,
}: {
  steps: string[]
  currentStep: number
}) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Code className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="text-xl font-bold text-white mb-2">Loading Portfolio</h3>
        <p className="text-gray-400">{steps[currentStep]}</p>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            <motion.div
              className={`w-4 h-4 rounded-full border-2 ${
                index < currentStep
                  ? "bg-green-400 border-green-400"
                  : index === currentStep
                    ? "border-blue-400 bg-blue-400"
                    : "border-gray-600"
              }`}
              animate={index === currentStep ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            />
            <span className={`text-sm ${index <= currentStep ? "text-white" : "text-gray-500"}`}>{step}</span>
          </div>
        ))}
      </div>

      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}
