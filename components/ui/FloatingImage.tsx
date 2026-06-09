'use client'

import { motion, useSpring } from 'framer-motion'

interface FloatingImageProps {
  src: string
  alt: string
  isVisible: boolean
  mouseX: number
  mouseY: number
  rotation?: number
}

export function FloatingImage({
  src,
  alt,
  isVisible,
  mouseX,
  mouseY,
  rotation = -3,
}: FloatingImageProps) {
  const springConfig = { stiffness: 150, damping: 20 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  x.set(mouseX)
  y.set(mouseY)

  return (
    <motion.div
      id="floating-image"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x,
        y,
        zIndex: 500,
        pointerEvents: 'none',
        rotate: rotation,
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.92,
      }}
      transition={{
        opacity: { type: 'spring', stiffness: 300, damping: 25 },
        scale: { type: 'spring', stiffness: 300, damping: 25 },
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: 280,
          height: 180,
          borderRadius: 8,
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </motion.div>
  )
}
