'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | undefined>(undefined)
  const [isHovering, setIsHovering] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const animate = useCallback(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    currentRef.current.x = posRef.current.x
    currentRef.current.y = posRef.current.y

    cursor.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0)`

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true)
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor]')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor]')
      ) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  if (isTouch) return null

  return (
    <div
      id="custom-cursor"
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: isHovering ? 18 : 6,
        height: isHovering ? 18 : 6,
        marginLeft: isHovering ? -9 : -3,
        marginTop: isHovering ? -9 : -3,
        border: '2px solid #C8A96E',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: isHovering ? 'multiply' : 'normal',
        transition: 'width 0.2s ease, height 0.2s ease, margin 0.2s ease, mix-blend-mode 0.2s ease',
        willChange: 'transform',
      }}
    />
  )
}
