"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Mail, Users, TrendingUp, Clock, RefreshCw } from "lucide-react"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [adminData, setAdminData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    // Simple password check (use proper auth in production)
    if (password === "admin123") {
      setIsAuthenticated(true)
      fetchAdminData()
    } else {
      alert("Invalid password")
    }
  }

  const fetchAdminData = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/messages", {
        headers: {
          Authorization: "Bearer admin-secret-key",
        },
      })
      const data = await response.json()
      setAdminData(data)
    } catch (error) {
      console.error("Failed to fetch admin data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900/60 backdrop-blur-xl border border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800/50 border-gray-600 text-white"
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
              Login
            </Button>
            <p className="text-gray-400 text-sm text-center">Demo password: admin123</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button
              onClick={fetchAdminData}
              disabled={loading}
              variant="outline"
              className="border-gray-600 text-gray-300"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500/10"
            >
              Logout
            </Button>
          </div>
        </div>

        {adminData && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{adminData.totalMessages}</p>
                      <p className="text-gray-400 text-sm">Total Messages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{adminData.totalContacts}</p>
                      <p className="text-gray-400 text-sm">Contact Forms</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">127</p>
                      <p className="text-gray-400 text-sm">Unique Visitors</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">+23%</p>
                      <p className="text-gray-400 text-sm">This Week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {adminData.recentActivity.map((activity: any) => (
                    <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === "contact" ? "bg-green-500/20" : "bg-blue-500/20"
                        }`}
                      >
                        {activity.type === "contact" ? (
                          <Mail className="w-4 h-4 text-green-400" />
                        ) : (
                          <MessageCircle className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        {activity.type === "contact" ? (
                          <>
                            <p className="text-white text-sm font-medium">{activity.name}</p>
                            <p className="text-gray-400 text-xs">{activity.subject}</p>
                          </>
                        ) : (
                          <p className="text-white text-sm">{activity.message}</p>
                        )}
                        <p className="text-gray-500 text-xs">{new Date(activity.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Popular Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {adminData.popularQuestions.map((q: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-gray-300 text-sm">{q.question}</p>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">{q.count}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
