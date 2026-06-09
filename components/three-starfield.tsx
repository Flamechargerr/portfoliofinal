"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

export default function ThreeStarfield() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    // 1. Scene, Camera, Renderer Setup
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || 650
    
    const scene = new THREE.Scene()
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000)
    camera.position.z = 250

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // 2. Generate Custom Glowing Dot Texture
    const createCircleTexture = () => {
      const c = document.createElement("canvas")
      c.width = 16
      c.height = 16
      const ctx = c.getContext("2d")
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8)
        grad.addColorStop(0, "rgba(200, 245, 80, 1)") // neon-lime signature
        grad.addColorStop(0.3, "rgba(200, 245, 80, 0.6)")
        grad.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, 16, 16)
      }
      return new THREE.CanvasTexture(c)
    }

    const starTexture = createCircleTexture()

    // 3. Generate Star Particles (Coordinates)
    const starCount = 300
    const starPositions = new Float32Array(starCount * 3)
    
    // Generate stars randomly dispersed in a shell
    for (let i = 0; i < starCount; i++) {
      const idx = i * 3
      const r = 80 + Math.random() * 160
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      starPositions[idx] = r * Math.sin(phi) * Math.cos(theta)
      starPositions[idx + 1] = r * Math.sin(phi) * Math.sin(theta)
      starPositions[idx + 2] = r * Math.cos(phi)
    }

    const starsGeometry = new THREE.BufferGeometry()
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xc8f550,
      size: 2.2,
      map: starTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const starPoints = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(starPoints)

    // 4. Generate Constellation Connecting Lines
    const linePositions: number[] = []
    const lineColors: number[] = []
    
    const rColor = 200 / 255
    const gColor = 245 / 255
    const bColor = 80 / 255

    for (let i = 0; i < starCount; i++) {
      const x1 = starPositions[i * 3]
      const y1 = starPositions[i * 3 + 1]
      const z1 = starPositions[i * 3 + 2]

      for (let j = i + 1; j < starCount; j++) {
        const x2 = starPositions[j * 3]
        const y2 = starPositions[j * 3 + 1]
        const z2 = starPositions[j * 3 + 2]

        const dx = x1 - x2
        const dy = y1 - y2
        const dz = z1 - z2
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        // Connect if close enough to simulate glowing network threads
        if (dist < 40) {
          linePositions.push(x1, y1, z1, x2, y2, z2)
          
          const alpha = (1.0 - dist / 40) * 0.12 // fade out based on distance
          
          // Color points
          lineColors.push(rColor, gColor, bColor, alpha)
          lineColors.push(rColor, gColor, bColor, alpha)
        }
      }
    }

    const linesGeometry = new THREE.BufferGeometry()
    linesGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3))
    linesGeometry.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 4))

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial)
    scene.add(lines)

    // 5. Parallax Mouse Tracking
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width) - 0.5
      mouseY = ((e.clientY - rect.top) / rect.height) - 0.5
    }

    container.addEventListener("mousemove", handleMouseMove, { passive: true })

    // 6. Smooth Resize Logic
    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth
      const h = container.clientHeight || 650
      
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      
      renderer.setSize(w, h)
    }
    
    window.addEventListener("resize", handleResize)

    // 7. Animation Loop
    let animationFrameId: number
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      // Rotate particle constellation organically
      starPoints.rotation.y += 0.0006
      starPoints.rotation.x += 0.0002
      
      lines.rotation.y += 0.0006
      lines.rotation.x += 0.0002

      // Smooth mouse parallax camera easing
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05
      
      camera.position.x += (targetX * 90 - camera.position.x) * 0.05
      camera.position.y += (-targetY * 90 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()

    // 8. Cleanup
    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)

      // Dispose webgl resources
      starsGeometry.dispose()
      starsMaterial.dispose()
      linesGeometry.dispose()
      linesMaterial.dispose()
      starTexture.dispose()
      renderer.dispose()
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
