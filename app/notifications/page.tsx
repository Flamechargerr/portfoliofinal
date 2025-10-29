"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Clock, User, MessageSquare, ExternalLink } from "lucide-react"

interface ContactSubmission {
  id: number
  name: string
  email: string
  subject: string
  message: string
  created_at: string
  ip_address?: string
}

interface NotificationData {
  urgent_contacts: any[]
  recent_contacts: ContactSubmission[]
  total_urgent: number
  total_recent: number
  total_chat_messages: number
  message: string
}

export default function NotificationsPage() {
  const [data, setData] = useState<NotificationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchNotifications()
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications")
      if (!response.ok) throw new Error("Failed to fetch notifications")
      const result = await response.json()
      setData(result)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const createReplyUrl = (contact: ContactSubmission) => {
    const subject = encodeURIComponent(`Re: ${contact.subject}`)
    const body = encodeURIComponent(`Hi ${contact.name},\n\nThank you for reaching out through my portfolio!\n\n`)
    return `mailto:${contact.email}?subject=${subject}&body=${body}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notifications...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchNotifications} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Notifications</h1>
          <p className="text-gray-600">Monitor contact form submissions and chat messages</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Urgent Contacts</CardTitle>
              <Mail className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{data?.total_urgent || 0}</div>
              <p className="text-xs text-gray-600">Need immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Contacts</CardTitle>
              <User className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{data?.total_recent || 0}</div>
              <p className="text-xs text-gray-600">Total submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chat Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{data?.total_chat_messages || 0}</div>
              <p className="text-xs text-gray-600">AI conversations</p>
            </CardContent>
          </Card>
        </div>

        {/* Status Message */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${data?.total_urgent && data.total_urgent > 0 ? "bg-red-500 animate-pulse" : "bg-green-500"}`}
              ></div>
              <p className="text-gray-700">{data?.message}</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Contact Submissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Recent Contact Submissions
            </CardTitle>
            <CardDescription>Latest messages from your portfolio contact form</CardDescription>
          </CardHeader>
          <CardContent>
            {data?.recent_contacts && data.recent_contacts.length > 0 ? (
              <div className="space-y-4">
                {data.recent_contacts.map((contact) => (
                  <div key={contact.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          #{contact.id}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(contact.created_at)}
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="font-medium text-gray-800 mb-1">Subject: {contact.subject}</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{contact.message}</p>
                    </div>

                    <Separator className="my-3" />

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">IP: {contact.ip_address || "Unknown"}</div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <a href={createReplyUrl(contact)} className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            Reply
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No contact submissions yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Refresh Button */}
        <div className="mt-8 text-center">
          <Button onClick={fetchNotifications} variant="outline">
            Refresh Notifications
          </Button>
          <p className="text-xs text-gray-500 mt-2">Auto-refreshes every 30 seconds</p>
        </div>
      </div>
    </div>
  )
}
