'use client'

import { useEffect, useRef } from 'react'

export function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const frameCount = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const overlay = overlayRef.current
    if (!canvas || !overlay) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = 256
    canvas.width = size
    canvas.height = size

    const imageData = ctx.createImageData(size, size)
    const data = imageData.data

    let rafId: number

    const generateNoise = () => {
      frameCount.current++

      if (frameCount.current % 3 === 0) {
        for (let i = 0; i < data.length; i += 4) {
          const value = Math.random() * 255
          data[i] = value
          data[i + 1] = value
          data[i + 2] = value
          data[i + 3] = 255
        }
        ctx.putImageData(imageData, 0, 0)
        overlay.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`
      }

      rafId = requestAnimationFrame(generateNoise)
    }

    rafId = requestAnimationFrame(generateNoise)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
        aria-hidden="true"
      />
      <div
        id="grain-overlay"
        ref={overlayRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 999,
          opacity: 0.035,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
        aria-hidden="true"
      />
    </>
  )
}
