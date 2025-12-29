"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
    id: number
    text: string
    sender: "user" | "bot"
    timestamp: Date
}

const botResponses: Record<string, string> = {
    "hello": "Hey there! 👋 I'm Anamay's AI assistant. How can I help you today?",
    "hi": "Hi! Welcome to my portfolio. Feel free to ask about my projects, skills, or how to get in touch!",
    "projects": "I've built several cool projects! Check out CrimeConnect (case management), VARtificial (sports AI), HackOps (cybersecurity), and Flora Fight (tower defense game). You can see them all in the Projects section! 🚀",
    "skills": "Anamay is skilled in: Frontend (React, Next.js, TypeScript), Backend (Node.js, Python, Express), Data Science (Pandas, TensorFlow, Scikit-learn), and Tools (Git, Docker, AWS). Check the Skills section for more! 💻",
    "contact": "You can reach Anamay at tripathy.anamay23@gmail.com or call +91 9877454747. He's based in Mumbai and open to remote work! 📧",
    "experience": "Anamay is currently the Technical Head at YaanBarpe startup and interned at Intellect Design Arena as a Software Engineer. He's also pursuing B.Tech in Data Science at MIT Manipal! 🎓",
    "hire": "Anamay is available for hire! He's looking for opportunities in Data Science, Full Stack Development, or Software Engineering roles. Reach out via email or the contact form! 💼",
    "default": "I'm not sure about that, but I can tell you about Anamay's projects, skills, experience, or how to contact him. What would you like to know? 🤔",
}

function getResponse(input: string): string {
    const lowerInput = input.toLowerCase()

    for (const [key, value] of Object.entries(botResponses)) {
        if (lowerInput.includes(key)) {
            return value
        }
    }

    return botResponses.default
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hey! 👋 I'm Anamay's AI assistant. Ask me about his projects, skills, or how to get in touch!", sender: "bot", timestamp: new Date() }
    ])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage: Message = {
            id: Date.now(),
            text: input,
            sender: "user",
            timestamp: new Date(),
        }

        setMessages(prev => [...prev, userMessage])
        setInput("")
        setIsTyping(true)

        // Simulate typing delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

        const botMessage: Message = {
            id: Date.now() + 1,
            text: getResponse(input),
            sender: "bot",
            timestamp: new Date(),
        }

        setIsTyping(false)
        setMessages(prev => [...prev, botMessage])
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <>
            {/* Chat Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-lorenzo-accent text-lorenzo-dark rounded-full flex items-center justify-center shadow-lg shadow-lorenzo-accent/30 z-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ rotate: isOpen ? 45 : 0 }}
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 w-[350px] h-[500px] bg-lorenzo-dark border border-lorenzo-accent/30 rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-lorenzo-accent/20 bg-lorenzo-accent/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-lorenzo-accent rounded-full flex items-center justify-center text-lorenzo-dark font-bold">
                                    A
                                </div>
                                <div>
                                    <div className="font-bold text-lorenzo-light text-sm uppercase">Anamay's Assistant</div>
                                    <div className="text-xs text-lorenzo-accent flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        Online
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-lg text-sm ${message.sender === "user"
                                                ? "bg-lorenzo-accent text-lorenzo-dark"
                                                : "bg-lorenzo-light/10 text-lorenzo-light"
                                            }`}
                                    >
                                        {message.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-lorenzo-light/10 text-lorenzo-light p-3 rounded-lg">
                                        <div className="flex gap-1">
                                            <motion.span
                                                className="w-2 h-2 bg-lorenzo-accent rounded-full"
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ duration: 0.5, repeat: Infinity }}
                                            />
                                            <motion.span
                                                className="w-2 h-2 bg-lorenzo-accent rounded-full"
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                                            />
                                            <motion.span
                                                className="w-2 h-2 bg-lorenzo-accent rounded-full"
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions */}
                        <div className="px-4 py-2 flex gap-2 overflow-x-auto border-t border-lorenzo-accent/10">
                            {["Projects", "Skills", "Contact", "Experience"].map((action) => (
                                <button
                                    key={action}
                                    onClick={() => {
                                        setInput(action.toLowerCase())
                                        setTimeout(handleSend, 100)
                                    }}
                                    className="px-3 py-1 text-xs border border-lorenzo-accent/30 text-lorenzo-accent rounded-full whitespace-nowrap hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all"
                                >
                                    {action}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-lorenzo-accent/20">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-transparent border border-lorenzo-accent/30 rounded-lg px-4 py-2 text-lorenzo-light text-sm focus:border-lorenzo-accent focus:outline-none placeholder:text-lorenzo-light/30"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="w-10 h-10 bg-lorenzo-accent text-lorenzo-dark rounded-lg flex items-center justify-center disabled:opacity-50 hover:shadow-lg transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
