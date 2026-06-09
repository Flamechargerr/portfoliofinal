"use client"

import React, { Suspense, lazy } from "react"
const Spline = lazy(() => import("@splinetool/react-spline"))

// Robust React Error Boundary to catch any Spline parser, WASM, or WebGL rendering crashes
class SplineErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Spline Runtime Error caught by Boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <SplineErrorBoundary
      fallback={
        <div className="w-full h-full flex flex-col items-center justify-center bg-black/45 backdrop-blur-md p-6 text-center border border-white/5 rounded-3xl min-h-[450px]">
          <div className="text-4xl mb-4 animate-bounce">🎨</div>
          <span className="text-white/80 font-bold uppercase tracking-widest text-xs mb-2">
            3D WebGL Scene Bypass
          </span>
          <span className="text-white/45 text-[10px] uppercase tracking-widest max-w-xs leading-relaxed">
            3D playground loaded successfully but bypassed due to parser mismatch. Hard-reload browser to refresh upgraded package core.
          </span>
        </div>
      }
    >
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <span className="loader"></span>
          </div>
        }
      >
        <Spline scene={scene} className={className} />
      </Suspense>
    </SplineErrorBoundary>
  )
}
