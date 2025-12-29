"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef, ReactNode } from "react"

// 27. Interactive Quiz Game
interface QuizQuestion {
    question: string
    options: string[]
    correctIndex: number
}

export function TechQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

    const questions: QuizQuestion[] = [
        {
            question: "What framework is this portfolio built with?",
            options: ["React", "Vue", "Next.js", "Angular"],
            correctIndex: 2
        },
        {
            question: "Which language is used for machine learning in this portfolio?",
            options: ["JavaScript", "Python", "Java", "C++"],
            correctIndex: 1
        },
        {
            question: "What CSS framework provides utility classes?",
            options: ["Bootstrap", "Tailwind CSS", "Foundation", "Bulma"],
            correctIndex: 1
        },
        {
            question: "Which animation library powers the smooth transitions?",
            options: ["GSAP", "Anime.js", "Framer Motion", "Velocity.js"],
            correctIndex: 2
        },
        {
            question: "What cloud platform is commonly used for deployment?",
            options: ["Heroku", "Vercel", "Firebase", "Netlify"],
            correctIndex: 1
        }
    ]

    const handleAnswer = (index: number) => {
        setSelectedAnswer(index)

        setTimeout(() => {
            if (index === questions[currentQuestion].correctIndex) {
                setScore(score + 1)
            }

            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1)
                setSelectedAnswer(null)
            } else {
                setShowResult(true)
            }
        }, 1000)
    }

    const resetQuiz = () => {
        setCurrentQuestion(0)
        setScore(0)
        setShowResult(false)
        setSelectedAnswer(null)
    }

    if (showResult) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-8 bg-white/5 border border-white/10 rounded-xl"
            >
                <div className="text-6xl mb-4">
                    {score === questions.length ? "🏆" : score >= questions.length / 2 ? "🎉" : "🤔"}
                </div>
                <h3 className="text-2xl font-bold text-lorenzo-accent mb-2">
                    Quiz Complete!
                </h3>
                <p className="text-white/60 mb-4">
                    You scored {score} out of {questions.length}
                </p>
                <div className="flex justify-center gap-4">
                    <motion.button
                        onClick={resetQuiz}
                        className="px-6 py-3 bg-lorenzo-accent text-lorenzo-dark font-bold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Try Again
                    </motion.button>
                </div>
            </motion.div>
        )
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white/5 border border-white/10 rounded-xl">
            {/* Progress */}
            <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-white/50">
                    Question {currentQuestion + 1}/{questions.length}
                </span>
                <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-lorenzo-accent"
                        animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <motion.h3
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold text-white mb-6"
            >
                {questions[currentQuestion].question}
            </motion.h3>

            {/* Options */}
            <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => {
                    const isSelected = selectedAnswer === index
                    const isCorrect = index === questions[currentQuestion].correctIndex
                    const showFeedback = selectedAnswer !== null

                    return (
                        <motion.button
                            key={index}
                            onClick={() => selectedAnswer === null && handleAnswer(index)}
                            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${showFeedback
                                    ? isCorrect
                                        ? "border-green-500 bg-green-500/20"
                                        : isSelected
                                            ? "border-red-500 bg-red-500/20"
                                            : "border-white/10"
                                    : "border-white/10 hover:border-lorenzo-accent"
                                }`}
                            whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                            whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                        >
                            <span className="font-medium text-white">{option}</span>
                            {showFeedback && isCorrect && <span className="ml-2">✓</span>}
                            {showFeedback && isSelected && !isCorrect && <span className="ml-2">✗</span>}
                        </motion.button>
                    )
                })}
            </div>
        </div>
    )
}

// 26. Achievement Badges System
interface Badge {
    id: string
    name: string
    description: string
    icon: string
    unlocked: boolean
    unlockedAt?: string
}

export function useAchievements() {
    const [badges, setBadges] = useState<Badge[]>([
        { id: "explorer", name: "Explorer", description: "Visited all sections", icon: "🧭", unlocked: false },
        { id: "reader", name: "Avid Reader", description: "Read 3 blog posts", icon: "📚", unlocked: false },
        { id: "social", name: "Social Butterfly", description: "Visited all social links", icon: "🦋", unlocked: false },
        { id: "nightowl", name: "Night Owl", description: "Visited after 10 PM", icon: "🦉", unlocked: false },
        { id: "earlybird", name: "Early Bird", description: "Visited before 8 AM", icon: "🐦", unlocked: false },
        { id: "secret", name: "Secret Finder", description: "Found an easter egg", icon: "🔮", unlocked: false },
        { id: "coder", name: "Fellow Coder", description: "Opened browser console", icon: "💻", unlocked: false },
        { id: "persistent", name: "Persistent", description: "Visited 5 times", icon: "🔄", unlocked: false }
    ])

    const [showUnlock, setShowUnlock] = useState<Badge | null>(null)

    const unlockBadge = (id: string) => {
        setBadges(prev => {
            const updated = prev.map(badge => {
                if (badge.id === id && !badge.unlocked) {
                    const unlocked = { ...badge, unlocked: true, unlockedAt: new Date().toISOString() }
                    setShowUnlock(unlocked)
                    setTimeout(() => setShowUnlock(null), 3000)
                    return unlocked
                }
                return badge
            })
            localStorage.setItem("portfolio-badges", JSON.stringify(updated))
            return updated
        })
    }

    // Check for time-based badges
    useEffect(() => {
        const hour = new Date().getHours()
        if (hour >= 22 || hour < 6) unlockBadge("nightowl")
        if (hour >= 5 && hour < 8) unlockBadge("earlybird")

        // Check visit count
        const visits = parseInt(localStorage.getItem("visit-count") || "0") + 1
        localStorage.setItem("visit-count", visits.toString())
        if (visits >= 5) unlockBadge("persistent")

        // Load saved badges
        const saved = localStorage.getItem("portfolio-badges")
        if (saved) {
            try {
                setBadges(JSON.parse(saved))
            } catch (e) { }
        }
    }, [])

    return { badges, unlockBadge, showUnlock }
}

export function AchievementPopup({ badge }: { badge: Badge }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-[100] flex items-center gap-4 p-4 bg-gradient-to-r from-lorenzo-accent to-green-500 text-lorenzo-dark rounded-xl shadow-2xl"
        >
            <div className="text-4xl">{badge.icon}</div>
            <div>
                <div className="font-bold">Achievement Unlocked!</div>
                <div className="text-sm opacity-80">{badge.name}</div>
            </div>
        </motion.div>
    )
}

export function BadgesDisplay({ badges }: { badges: Badge[] }) {
    return (
        <div className="grid grid-cols-4 gap-4">
            {badges.map(badge => (
                <motion.div
                    key={badge.id}
                    className={`p-4 rounded-xl text-center ${badge.unlocked
                            ? "bg-gradient-to-br from-lorenzo-accent/20 to-green-500/20 border border-lorenzo-accent/50"
                            : "bg-white/5 border border-white/10 opacity-50"
                        }`}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className={`text-3xl mb-2 ${badge.unlocked ? "" : "grayscale"}`}>
                        {badge.icon}
                    </div>
                    <div className="text-sm font-bold text-white">{badge.name}</div>
                    <div className="text-xs text-white/50 mt-1">{badge.description}</div>
                    {badge.unlocked && (
                        <div className="text-xs text-lorenzo-accent mt-2">✓ Unlocked</div>
                    )}
                </motion.div>
            ))}
        </div>
    )
}

// 28. Mini Snake Game
export function SnakeGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [score, setScore] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)

    const startGame = () => {
        setGameStarted(true)
        setGameOver(false)
        setScore(0)

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const gridSize = 20
        const tileCount = canvas.width / gridSize

        let snake = [{ x: 10, y: 10 }]
        let food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) }
        let dx = 0
        let dy = 0
        let currentScore = 0

        const handleKeyPress = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowUp": if (dy !== 1) { dx = 0; dy = -1; } break
                case "ArrowDown": if (dy !== -1) { dx = 0; dy = 1; } break
                case "ArrowLeft": if (dx !== 1) { dx = -1; dy = 0; } break
                case "ArrowRight": if (dx !== -1) { dx = 1; dy = 0; } break
            }
        }

        window.addEventListener("keydown", handleKeyPress)

        const gameLoop = setInterval(() => {
            // Move snake
            const head = { x: snake[0].x + dx, y: snake[0].y + dy }

            // Check collisions
            if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
                clearInterval(gameLoop)
                window.removeEventListener("keydown", handleKeyPress)
                setGameOver(true)
                return
            }

            if (snake.some(s => s.x === head.x && s.y === head.y)) {
                clearInterval(gameLoop)
                window.removeEventListener("keydown", handleKeyPress)
                setGameOver(true)
                return
            }

            snake.unshift(head)

            // Check food
            if (head.x === food.x && head.y === food.y) {
                currentScore += 10
                setScore(currentScore)
                food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) }
            } else {
                snake.pop()
            }

            // Draw
            ctx.fillStyle = "#0a0a0a"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw food
            ctx.fillStyle = "#c8f550"
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2)

            // Draw snake
            snake.forEach((segment, i) => {
                ctx.fillStyle = i === 0 ? "#c8f550" : "#8bc34a"
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2)
            })
        }, 100)

        return () => {
            clearInterval(gameLoop)
            window.removeEventListener("keydown", handleKeyPress)
        }
    }

    return (
        <div className="relative">
            <canvas
                ref={canvasRef}
                width={300}
                height={300}
                className="bg-[#0a0a0a] border border-white/10 rounded-xl mx-auto"
            />

            {!gameStarted && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                    <motion.button
                        onClick={startGame}
                        className="px-6 py-3 bg-lorenzo-accent text-lorenzo-dark font-bold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start Game 🐍
                    </motion.button>
                </div>
            )}

            {gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-xl">
                    <div className="text-2xl font-bold text-red-500 mb-2">Game Over!</div>
                    <div className="text-white mb-4">Score: {score}</div>
                    <motion.button
                        onClick={startGame}
                        className="px-6 py-3 bg-lorenzo-accent text-lorenzo-dark font-bold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Play Again
                    </motion.button>
                </div>
            )}

            <div className="text-center mt-4 text-white/50 text-sm">
                Use arrow keys to move • Score: {score}
            </div>
        </div>
    )
}

// 29. Points System
export function usePointsSystem() {
    const [points, setPoints] = useState(0)

    useEffect(() => {
        const saved = parseInt(localStorage.getItem("portfolio-points") || "0")
        setPoints(saved)
    }, [])

    const addPoints = (amount: number, reason: string) => {
        setPoints(prev => {
            const newPoints = prev + amount
            localStorage.setItem("portfolio-points", newPoints.toString())
            console.log(`+${amount} points: ${reason}`)
            return newPoints
        })
    }

    return { points, addPoints }
}

export function PointsDisplay({ points }: { points: number }) {
    return (
        <motion.div
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full"
            whileHover={{ scale: 1.05 }}
        >
            <span className="text-xl">⭐</span>
            <span className="font-bold text-yellow-400">{points} pts</span>
        </motion.div>
    )
}
