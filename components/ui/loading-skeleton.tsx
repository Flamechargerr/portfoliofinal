"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
        {/* Navigation Skeleton */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-2xl border-b border-gray-800/50">
          <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl animate-pulse" />
              <div className="hidden md:block space-y-2">
                <div className="w-32 h-4 bg-gray-700 rounded animate-pulse" />
                <div className="w-24 h-3 bg-gray-800 rounded animate-pulse" />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-20 h-8 bg-gray-700 rounded animate-pulse" />
              <div className="w-24 h-8 bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Hero Section Skeleton */}
        <div className="py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" />
                  <div className="w-48 h-4 bg-gray-700 rounded animate-pulse" />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="w-64 h-12 bg-gray-700 rounded animate-pulse" />
                    <div className="w-80 h-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded animate-pulse" />
                  </div>
                  <div className="w-72 h-8 bg-gray-700 rounded animate-pulse" />
                </div>

                <div className="space-y-4">
                  <div className="w-full h-4 bg-gray-700 rounded animate-pulse" />
                  <div className="w-5/6 h-4 bg-gray-700 rounded animate-pulse" />
                  <div className="w-4/5 h-4 bg-gray-700 rounded animate-pulse" />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-32 h-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded animate-pulse" />
                <div className="w-32 h-12 bg-gray-700/20 rounded animate-pulse" />
                <div className="w-24 h-12 bg-gray-700/20 rounded animate-pulse" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="bg-gray-900/60 border-gray-700/50">
                    <CardContent className="p-4 text-center">
                      <div className="w-10 h-10 bg-gray-700 rounded-xl mx-auto mb-3 animate-pulse" />
                      <div className="w-12 h-6 bg-gray-700 rounded mx-auto mb-2 animate-pulse" />
                      <div className="w-16 h-3 bg-gray-800 rounded mx-auto animate-pulse" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <Card className="bg-gray-900/60 border-gray-700/50">
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <div className="w-32 h-32 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full mx-auto animate-pulse" />
                    <div className="space-y-3">
                      <div className="w-40 h-6 bg-gray-700 rounded mx-auto animate-pulse" />
                      <div className="w-48 h-4 bg-gray-800 rounded mx-auto animate-pulse" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="p-4 bg-gray-800/60 rounded-xl">
                          <div className="w-12 h-12 bg-gray-700 rounded-full mx-auto mb-2 animate-pulse" />
                          <div className="w-8 h-3 bg-gray-800 rounded mx-auto animate-pulse" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-full px-6 py-3 flex items-center gap-3">
            <motion.div
              className="w-4 h-4 bg-blue-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            />
            <span className="text-white font-medium">Loading amazing content...</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export function SectionSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="text-center space-y-4">
        <div className="w-64 h-12 bg-gray-700 rounded mx-auto" />
        <div className="w-96 h-6 bg-gray-800 rounded mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-gray-900/60 border-gray-700/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gray-700 rounded-xl" />
                <div className="space-y-2">
                  <div className="w-32 h-6 bg-gray-700 rounded" />
                  <div className="w-full h-4 bg-gray-800 rounded" />
                  <div className="w-3/4 h-4 bg-gray-800 rounded" />
                </div>
                <div className="flex gap-2">
                  <div className="w-16 h-6 bg-gray-800 rounded" />
                  <div className="w-20 h-6 bg-gray-800 rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function ProjectSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="bg-gray-900/60 border-gray-700/50 overflow-hidden animate-pulse">
          <div className="h-64 bg-gradient-to-br from-gray-700/20 to-gray-800/20" />
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <div className="w-48 h-6 bg-gray-700 rounded" />
              <div className="w-32 h-4 bg-gray-800 rounded" />
            </div>
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-800 rounded" />
              <div className="w-5/6 h-4 bg-gray-800 rounded" />
              <div className="w-4/5 h-4 bg-gray-800 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-800/60 rounded-lg">
                <div className="w-16 h-6 bg-gray-700 rounded mx-auto mb-1" />
                <div className="w-12 h-3 bg-gray-800 rounded mx-auto" />
              </div>
              <div className="p-3 bg-gray-800/60 rounded-lg">
                <div className="w-16 h-6 bg-gray-700 rounded mx-auto mb-1" />
                <div className="w-12 h-3 bg-gray-800 rounded mx-auto" />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-20 h-8 bg-gray-700 rounded" />
              <div className="w-20 h-8 bg-gray-800 rounded" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
