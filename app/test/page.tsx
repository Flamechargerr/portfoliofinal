"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Loader2, MessageCircle, Mail, Database, Brain } from "lucide-react"

interface TestResult {
  name: string
  status: "pending" | "success" | "error"
  message: string
  details?: any
}

export default function IntegrationTestPage() {
  const [tests, setTests] = useState<TestResult[]>([
    { name: "Contact API", status: "pending", message: "Not tested yet" },
    { name: "Messages API", status: "pending", message: "Not tested yet" },
    { name: "Chat AI API", status: "pending", message: "Not tested yet" },
    { name: "Analytics API", status: "pending", message: "Not tested yet" },
    { name: "Admin API", status: "pending", message: "Not tested yet" },
  ])
  const [isRunning, setIsRunning] = useState(false)

  const updateTest = (name: string, status: "success" | "error", message: string, details?: any) => {
    setTests((prev) => prev.map((test) => (test.name === name ? { ...test, status, message, details } : test)))
  }

  const runAllTests = async () => {
    setIsRunning(true)

    // Test 1: Contact API
    try {
      const contactResponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          subject: "Integration Test",
          message: "This is a test message to verify the contact API is working.",
        }),
      })

      const contactData = await contactResponse.json()

      if (contactResponse.ok) {
        updateTest("Contact API", "success", "Contact form submission successful", contactData)
      } else {
        updateTest("Contact API", "error", contactData.error || "Contact API failed")
      }
    } catch (error) {
      updateTest("Contact API", "error", `Network error: ${error}`)
    }

    // Test 2: Messages API
    try {
      const messageResponse = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Test message for integration verification",
          userInfo: { testMode: true, timestamp: new Date().toISOString() },
        }),
      })

      const messageData = await messageResponse.json()

      if (messageResponse.ok) {
        updateTest("Messages API", "success", "Message storage successful", messageData)
      } else {
        updateTest("Messages API", "error", messageData.error || "Messages API failed")
      }
    } catch (error) {
      updateTest("Messages API", "error", `Network error: ${error}`)
    }

    // Test 3: Chat AI API
    try {
      const chatResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: "Hello, this is a test message. Can you tell me about Anamay's skills?",
            },
          ],
        }),
      })

      if (chatResponse.ok) {
        // For streaming responses, we just check if the response starts correctly
        const reader = chatResponse.body?.getReader()
        if (reader) {
          const { value } = await reader.read()
          const chunk = new TextDecoder().decode(value)
          updateTest("Chat AI API", "success", "AI chat response received", { preview: chunk.slice(0, 100) })
          reader.releaseLock()
        }
      } else {
        const errorData = await chatResponse.json()
        updateTest("Chat AI API", "error", errorData.error || "Chat AI API failed")
      }
    } catch (error) {
      updateTest("Chat AI API", "error", `Network error: ${error}`)
    }

    // Test 4: Analytics API
    try {
      const analyticsResponse = await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "integration_test",
          data: { testMode: true, timestamp: new Date().toISOString() },
        }),
      })

      const analyticsData = await analyticsResponse.json()

      if (analyticsResponse.ok) {
        updateTest("Analytics API", "success", "Analytics tracking successful", analyticsData)
      } else {
        updateTest("Analytics API", "error", analyticsData.error || "Analytics API failed")
      }
    } catch (error) {
      updateTest("Analytics API", "error", `Network error: ${error}`)
    }

    // Test 5: Admin API (basic connectivity test)
    try {
      const adminResponse = await fetch("/api/admin/messages", {
        headers: { Authorization: "Bearer admin-secret-key" },
      })

      const adminData = await adminResponse.json()

      if (adminResponse.ok) {
        updateTest("Admin API", "success", "Admin API accessible", { totalMessages: adminData.totalMessages })
      } else {
        updateTest("Admin API", "error", adminData.error || "Admin API failed")
      }
    } catch (error) {
      updateTest("Admin API", "error", `Network error: ${error}`)
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return <Loader2 className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "error":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Integration Test Dashboard</h1>
          <p className="text-gray-400 text-lg">
            Verify that AI and backend systems are properly integrated and working
          </p>
          <Button
            onClick={runAllTests}
            disabled={isRunning}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Running Tests...
              </>
            ) : (
              "Run All Tests"
            )}
          </Button>
        </div>

        {/* Test Results */}
        <div className="grid gap-4">
          {tests.map((test) => (
            <Card key={test.name} className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-3">
                    {getStatusIcon(test.status)}
                    {test.name}
                  </CardTitle>
                  <Badge className={getStatusColor(test.status)}>{test.status.toUpperCase()}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-3">{test.message}</p>
                {test.details && (
                  <div className="bg-gray-800/50 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm font-medium mb-2">Details:</p>
                    <pre className="text-xs text-gray-300 overflow-x-auto">{JSON.stringify(test.details, null, 2)}</pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Manual Testing Instructions */}
        <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Manual Testing Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium">Test AI Chatbot</h4>
                  <p className="text-gray-400 text-sm">
                    1. Click the chatbot button in the bottom-right corner
                    <br />
                    2. Ask questions like "Tell me about Anamay's projects"
                    <br />
                    3. Verify responses are relevant and helpful
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium">Test Contact Form</h4>
                  <p className="text-gray-400 text-sm">
                    1. Go to the contact section on the main page
                    <br />
                    2. Fill out and submit the contact form
                    <br />
                    3. Check for success message and form reset
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Database className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium">Test Admin Dashboard</h4>
                  <p className="text-gray-400 text-sm">
                    1. Visit <code className="bg-gray-800 px-1 rounded">/admin</code>
                    <br />
                    2. Login with password: <code className="bg-gray-800 px-1 rounded">admin123</code>
                    <br />
                    3. Verify message counts and recent activity
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Status Summary */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Integration Status</h3>
              <div className="flex justify-center gap-4 text-sm">
                <span className="text-green-400">✅ {tests.filter((t) => t.status === "success").length} Passed</span>
                <span className="text-red-400">❌ {tests.filter((t) => t.status === "error").length} Failed</span>
                <span className="text-gray-400">⏳ {tests.filter((t) => t.status === "pending").length} Pending</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
