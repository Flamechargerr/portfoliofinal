"use client"

import { useEffect, useState, useCallback } from "react"

// Debounce hook
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => clearTimeout(handler)
    }, [value, delay])

    return debouncedValue
}

// Throttle hook
export function useThrottle<T>(value: T, interval: number): T {
    const [throttledValue, setThrottledValue] = useState(value)
    const [lastUpdated, setLastUpdated] = useState(Date.now())

    useEffect(() => {
        const now = Date.now()
        if (now >= lastUpdated + interval) {
            setThrottledValue(value)
            setLastUpdated(now)
        } else {
            const timeout = setTimeout(() => {
                setThrottledValue(value)
                setLastUpdated(Date.now())
            }, interval - (now - lastUpdated))

            return () => clearTimeout(timeout)
        }
    }, [value, interval, lastUpdated])

    return throttledValue
}

// Window size hook
export function useWindowSize() {
    const [size, setSize] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return size
}

// Is mobile hook
export function useIsMobile(breakpoint = 768) {
    const { width } = useWindowSize()
    return width > 0 && width < breakpoint
}

// Media query hook
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const media = window.matchMedia(query)
        setMatches(media.matches)

        const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
        media.addEventListener("change", listener)
        return () => media.removeEventListener("change", listener)
    }, [query])

    return matches
}

// Scroll position hook
export function useScrollPosition() {
    const [position, setPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleScroll = () => {
            setPosition({
                x: window.scrollX,
                y: window.scrollY
            })
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return position
}

// Scroll direction hook
export function useScrollDirection() {
    const [direction, setDirection] = useState<"up" | "down" | null>(null)
    const [lastY, setLastY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY
            if (currentY > lastY && currentY > 50) {
                setDirection("down")
            } else if (currentY < lastY) {
                setDirection("up")
            }
            setLastY(currentY)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastY])

    return direction
}

// Local storage hook
export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") return initialValue
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch {
            return initialValue
        }
    })

    const setValue = useCallback((value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore))
            }
        } catch (error) {
            console.error("useLocalStorage error:", error)
        }
    }, [key, storedValue])

    return [storedValue, setValue] as const
}

// Copy to clipboard hook
export function useCopyToClipboard() {
    const [copied, setCopied] = useState(false)

    const copy = useCallback(async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
            return true
        } catch {
            setCopied(false)
            return false
        }
    }, [])

    return { copied, copy }
}

// Online status hook
export function useOnlineStatus() {
    const [isOnline, setIsOnline] = useState(true)

    useEffect(() => {
        setIsOnline(navigator.onLine)

        const handleOnline = () => setIsOnline(true)
        const handleOffline = () => setIsOnline(false)

        window.addEventListener("online", handleOnline)
        window.addEventListener("offline", handleOffline)

        return () => {
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOffline)
        }
    }, [])

    return isOnline
}

// Hover state hook
export function useHover<T extends HTMLElement>() {
    const [isHovered, setIsHovered] = useState(false)
    const [ref, setRef] = useState<T | null>(null)

    useEffect(() => {
        if (!ref) return

        const handleMouseEnter = () => setIsHovered(true)
        const handleMouseLeave = () => setIsHovered(false)

        ref.addEventListener("mouseenter", handleMouseEnter)
        ref.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            ref.removeEventListener("mouseenter", handleMouseEnter)
            ref.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [ref])

    return { ref: setRef, isHovered }
}

// Click outside hook
export function useClickOutside<T extends HTMLElement>(callback: () => void) {
    const [ref, setRef] = useState<T | null>(null)

    useEffect(() => {
        if (!ref) return

        const handleClick = (event: MouseEvent) => {
            if (!ref.contains(event.target as Node)) {
                callback()
            }
        }

        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [ref, callback])

    return setRef
}

// Previous value hook
export function usePrevious<T>(value: T): T | undefined {
    const [current, setCurrent] = useState<T>(value)
    const [previous, setPrevious] = useState<T | undefined>()

    if (value !== current) {
        setPrevious(current)
        setCurrent(value)
    }

    return previous
}

// Mounted state hook
export function useMounted() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return mounted
}
