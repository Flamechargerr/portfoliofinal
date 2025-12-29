"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import { ArrowRight, Link, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TimelineItem {
  id: number
  title: string
  date: string
  content: string
  category: string
  icon: React.ElementType
  relatedIds: number[]
  status: "completed" | "in-progress" | "pending"
  energy: number
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[]
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})
  const [viewMode, setViewMode] = useState<"orbital">("orbital")
  const [rotationAngle, setRotationAngle] = useState<number>(0)
  const [autoRotate, setAutoRotate] = useState<boolean>(true)
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({})
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({})
      setActiveNodeId(null)
      setPulseEffect({})
      setAutoRotate(true)
    }
  }

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev }
      Object.keys(newState).forEach((key) => {
        if (Number.parseInt(key) !== id) {
          newState[Number.parseInt(key)] = false
        }
      })

      newState[id] = !prev[id]

      if (!prev[id]) {
        setActiveNodeId(id)
        setAutoRotate(false)

        const relatedItems = getRelatedItems(id)
        const newPulseEffect: Record<number, boolean> = {}
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true
        })
        setPulseEffect(newPulseEffect)

        centerViewOnNode(id)
      } else {
        setActiveNodeId(null)
        setAutoRotate(true)
        setPulseEffect({})
      }

      return newState
    })
  }

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360
          return Number(newAngle.toFixed(3))
        })
      }, 50)
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer)
      }
    }
  }, [autoRotate, viewMode])

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId)
    const totalNodes = timelineData.length
    const targetAngle = (nodeIndex / totalNodes) * 360

    setRotationAngle(270 - targetAngle)
  }

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360
    const radius = 320 // Increased from 280 to 320 for bigger circle
    const radian = (angle * Math.PI) / 180

    const x = radius * Math.cos(radian) + centerOffset.x
    const y = radius * Math.sin(radian) + centerOffset.y

    const zIndex = Math.round(100 + 50 * Math.cos(radian))
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)))

    return { x, y, angle, zIndex, opacity }
  }

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId)
    return currentItem ? currentItem.relatedIds : []
  }

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false
    const relatedItems = getRelatedItems(activeNodeId)
    return relatedItems.includes(itemId)
  }

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-black border-white"
      case "in-progress":
        return "text-black bg-white border-black"
      case "pending":
        return "text-white bg-black/40 border-white/50"
      default:
        return "text-white bg-black/40 border-white/50"
    }
  }

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-black/80 via-blue-900/20 to-black/80"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-pulse flex items-center justify-center z-10 shadow-2xl shadow-purple-500/50 border-2 border-white/20">
            <div className="absolute w-28 md:w-40 h-28 md:h-40 rounded-full border-2 border-blue-400/30 animate-ping opacity-70"></div>
            <div
              className="absolute w-32 md:w-44 h-32 md:h-44 rounded-full border-2 border-purple-400/20 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 backdrop-blur-md shadow-lg"></div>
          </div>

          <div className="absolute w-160 md:w-192 h-160 md:h-192 rounded-full border-2 border-blue-500/20 shadow-lg shadow-blue-500/10"></div>
          <div className="absolute w-176 md:w-208 h-176 md:h-208 rounded-full border-2 border-purple-500/10"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length)
            const isExpanded = expandedItems[item.id]
            const isRelated = isRelatedToActive(item.id)
            const isPulsing = pulseEffect[item.id]
            const Icon = item.icon

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            }

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleItem(item.id)
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                  style={{
                    background: `radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(59, 130, 246, 0.3) 50%, rgba(255,255,255,0) 70%)`,
                    width: `${item.energy * 0.6 + 50}px`,
                    height: `${item.energy * 0.6 + 50}px`,
                    left: `-${(item.energy * 0.6 + 50 - 40) / 2}px`,
                    top: `-${(item.energy * 0.6 + 50 - 40) / 2}px`,
                    boxShadow: isExpanded ? `0 0 30px rgba(139, 92, 246, 0.8)` : `0 0 15px rgba(59, 130, 246, 0.4)`,
                  }}
                ></div>

                <div
                  className={`
                  w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
                  ${isExpanded ? "bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-2xl shadow-blue-500/60" : isRelated ? "bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-lg shadow-purple-500/40" : "bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg shadow-gray-800/40"}
                  border-2 
                  ${
                    isExpanded
                      ? "border-blue-300 shadow-lg shadow-blue-500/50"
                      : isRelated
                        ? "border-purple-300 animate-pulse shadow-lg shadow-purple-500/30"
                        : "border-blue-400/40"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : "hover:scale-110"}
                `}
                >
                  <Icon size={16} className="md:w-5 md:h-5" />
                </div>

                <div
                  className={`
                  absolute top-12 md:top-14 whitespace-nowrap
                  text-xs md:text-sm font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-white scale-125 font-bold" : "text-white/70 hover:text-white"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 md:top-24 left-1/2 -translate-x-1/2 w-64 md:w-72 bg-gradient-to-br from-gray-900/98 via-blue-900/95 to-purple-900/98 backdrop-blur-xl border-2 border-blue-400/40 shadow-2xl shadow-blue-500/30 overflow-visible z-50">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-gradient-to-b from-blue-400 to-purple-400"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center gap-2">
                        <Badge className={`px-2 text-xs font-bold ${getStatusStyles(item.status)}`}>
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                              ? "IN PROGRESS"
                              : "PENDING"}
                        </Badge>
                        <span className="text-xs font-mono text-white/60">{item.date}</span>
                      </div>
                      <CardTitle className="text-sm mt-2 text-white">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/85 space-y-3">
                      <p className="leading-relaxed">{item.content}</p>

                      <div className="pt-2 border-t border-blue-400/20">
                        <div className="flex justify-between items-center text-xs mb-2">
                          <span className="flex items-center text-white/70">
                            <Zap size={10} className="mr-1" />
                            Energy Level
                          </span>
                          <span className="font-mono font-bold text-blue-300">{item.energy}%</span>
                        </div>
                        <div className="w-full h-2 bg-blue-900/40 rounded-full overflow-hidden border border-blue-400/20">
                          <div
                            className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="pt-2 border-t border-blue-400/20">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-white/70 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-bold text-white/70">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId)
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-md border-blue-400/40 bg-blue-500/10 hover:bg-blue-500/30 text-blue-200 hover:text-white transition-all font-medium"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleItem(relatedId)
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight size={8} className="ml-1 text-blue-300" />
                                </Button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
