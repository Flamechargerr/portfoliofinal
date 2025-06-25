"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, X, Minimize2, Maximize2, Bot, User, Brain, Code, Coffee, Rocket, Loader2 } from "lucide-react"
import { useChat } from "ai/react"
import { trackEvent } from "@/lib/analytics"

interface ChatbotProps {
  isOpen: boolean
  onToggle: () => void
}

export default function AIChatbot({ isOpen, onToggle }: ChatbotProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "Hey there! 👋 I'm Anamay's AI assistant. I can help you learn more about his projects, skills, experience, or answer any questions you might have!",
      },
    ],
    onFinish: async (message) => {
      // Store user message in backend
      try {
        await fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: message.content,
            userInfo: {
              timestamp: new Date().toISOString(),
              sessionId: Date.now().toString(),
            },
          }),
        })

        // Track analytics
        if (typeof window !== "undefined") {
          await trackEvent("chatbot_message_sent", {
            messageLength: message.content.length,
            timestamp: new Date().toISOString(),
          })
        }
      } catch (error) {
        console.error("Failed to store message:", error)
      }
    },
    onError: (error) => {
      console.error("Chat error:", error)
      if (typeof window !== "undefined") {
        trackEvent("chatbot_error", { error: error.message })
      }
    },
  })

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const quickQuestions = [
    { text: "Tell me about Anamay's projects", icon: Code },
    { text: "What are his technical skills?", icon: Brain },
    { text: "His experience and roles?", icon: Rocket },
    { text: "How to contact him?", icon: Coffee },
  ]

  const handleQuickQuestion = useCallback(
    async (question: string) => {
      // Track quick question usage
      await trackEvent("chatbot_quick_question", { question })

      const syntheticEvent = {
        target: { value: question },
      } as React.ChangeEvent<HTMLInputElement>
      handleInputChange(syntheticEvent)

      // Trigger form submission
      setTimeout(() => {
        const submitEvent = new Event("submit", { bubbles: true, cancelable: true })
        const form = document.querySelector("form")
        if (form) {
          form.dispatchEvent(submitEvent)
        }
      }, 50)
    },
    [handleInputChange],
  )

  const handleFormSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!input.trim() || isLoading) return
      handleSubmit(e)
    },
    [input, isLoading, handleSubmit],
  )

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-[55]">
      <Card
        className={`w-80 md:w-96 bg-gradient-to-br from-slate-900/95 to-slate-800/95 dark:from-slate-950/95 dark:to-slate-900/95 backdrop-blur-3xl border border-cyan-400/20 shadow-2xl shadow-cyan-500/10 transition-all duration-300 ${
          isMinimized ? "h-14 md:h-16" : "h-[500px] md:h-[600px]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 md:p-4 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-emerald-400 rounded-full border-2 border-slate-800 animate-pulse" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                AI Assistant
              </h3>
              <p className="text-cyan-300/80 text-xs">Ask me about Anamay</p>
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-6 h-6 md:w-8 md:h-8 p-0 text-cyan-300/60 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-all duration-200"
            >
              {isMinimized ? (
                <Maximize2 className="w-3 h-3 md:w-4 md:h-4" />
              ) : (
                <Minimize2 className="w-3 h-3 md:w-4 md:h-4" />
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onToggle}
              className="w-6 h-6 md:w-8 md:h-8 p-0 text-cyan-300/60 hover:text-cyan-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
            >
              <X className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 h-[300px] md:h-[400px] bg-gradient-to-b from-slate-900/50 to-slate-800/50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 md:gap-3 ${message.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
                >
                  {message.role === "assistant" && (
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/25">
                      <Bot className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-2 md:p-3 rounded-2xl backdrop-blur-sm ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                        : "bg-slate-800/80 text-cyan-50 border border-cyan-400/20 shadow-lg"
                    }`}
                  >
                    <p className="text-xs md:text-sm leading-relaxed">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/25">
                      <User className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2 md:gap-3 justify-start animate-in slide-in-from-bottom-2 duration-300">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25">
                    <Bot className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  </div>
                  <div className="bg-slate-800/80 border border-cyan-400/20 p-2 md:p-3 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-3 h-3 md:w-4 md:h-4 text-cyan-400 animate-spin" />
                      <span className="text-cyan-300 text-xs md:text-sm">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex gap-2 md:gap-3 justify-start">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-red-400 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Bot className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  </div>
                  <div className="bg-red-800/80 border border-red-400/20 p-2 md:p-3 rounded-2xl shadow-lg">
                    <p className="text-red-300 text-xs md:text-sm">
                      Sorry, I'm having trouble right now. Please try again.
                    </p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-3 md:px-4 pb-3 md:pb-4">
                <p className="text-cyan-300/60 text-xs mb-2 md:mb-3 font-medium">Quick questions:</p>
                <div className="grid grid-cols-2 gap-1.5 md:gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      onClick={() => handleQuickQuestion(question.text)}
                      disabled={isLoading}
                      className="text-xs p-1.5 md:p-2 h-auto bg-slate-800/50 border-cyan-400/20 text-cyan-200 hover:bg-cyan-500/10 hover:text-cyan-100 hover:border-cyan-400/40 rounded-lg transition-all duration-200 group"
                    >
                      <question.icon className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1 group-hover:scale-110 transition-transform duration-200" />
                      <span className="truncate">{question.text}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 md:p-4 border-t border-cyan-400/20 bg-gradient-to-r from-slate-900/80 to-slate-800/80">
              <form onSubmit={handleFormSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me anything about Anamay..."
                  className="flex-1 bg-slate-800/50 border-cyan-400/20 text-cyan-50 placeholder:text-cyan-300/50 rounded-xl focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/25 transition-all duration-200 text-sm"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 rounded-xl px-3 md:px-4 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 group"
                >
                  {isLoading ? (
                    <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                  ) : (
                    <Send className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                  )}
                </Button>
              </form>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
