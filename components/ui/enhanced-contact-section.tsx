"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  MessageCircle,
  CheckCircle,
  Clock,
  Zap,
  User,
  AtSign,
  FileText,
  MessageSquare,
} from "lucide-react"
import { trackEvent } from "@/lib/analytics"

export function EnhancedContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // --- client-side required-field check -----------------
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setErrorMsg("Please fill in every field before sending.")
      setIsSubmitting(false)
      return
    }
    setErrorMsg("") // clear previous errors
    // ------------------------------------------------------

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      // Track successful contact form submission
      await trackEvent("contact_form_submitted", {
        subject: formData.subject,
        messageLength: formData.message.length,
        timestamp: new Date().toISOString(),
      })

      setIsSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: "", email: "", subject: "", message: "" })
      }, 3000)
    } catch (error) {
      console.error("Contact form error:", error)
      // You could show an error message to the user here
      alert("Failed to send message. Please try again or contact directly via email.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "tripathy.anamay23@gmail.com",
      action: () => window.open("mailto:tripathy.anamay23@gmail.com"),
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9877454747",
      action: () => window.open("tel:+919877454747"),
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Mumbai, India",
      action: null,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      url: "https://github.com/Flamechargerr",
      color: "from-gray-600 to-gray-800",
      hoverColor: "hover:bg-gray-700",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/anamay-tripathy-b53829296/",
      color: "from-blue-600 to-blue-800",
      hoverColor: "hover:bg-blue-700",
    },
  ]

  return (
    <div className="space-y-12">
      {/* Enhanced Header */}
      <motion.div
        className="text-center relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />
        <div className="relative z-10 py-8">
          <motion.div
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gray-900/60 backdrop-blur-xl rounded-full border border-gray-700/50"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <MessageCircle className="w-6 h-6 text-blue-400" />
            <span className="text-blue-400 font-medium">Ready to collaborate</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </motion.div>
          <h2 className="text-6xl font-bold mb-6 text-white font-display bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Enhanced Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="relative overflow-hidden bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />

            {/* Form Header */}
            <div className="relative z-10 p-6 border-b border-gray-700/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Send a Message</h3>
                  <p className="text-gray-400">I'll get back to you within 24 hours</p>
                </div>
              </div>
            </div>

            <CardContent className="relative z-10 p-8">
              {errorMsg && <p className="mb-4 text-sm text-red-400 font-medium">{errorMsg}</p>}
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3">Message Sent!</h4>
                  <p className="text-gray-400 text-lg">Thanks for reaching out. I'll get back to you soon!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                        <User className="w-4 h-4 text-blue-400" />
                        Name
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        required
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25 h-12 rounded-xl transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                        <AtSign className="w-4 h-4 text-green-400" />
                        Email
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500/25 h-12 rounded-xl transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                      <FileText className="w-4 h-4 text-purple-400" />
                      Subject
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                      className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/25 h-12 rounded-xl transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                      <MessageSquare className="w-4 h-4 text-pink-400" />
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project or idea..."
                      rows={6}
                      required
                      className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-pink-500 focus:ring-1 focus:ring-pink-500/25 rounded-xl resize-none transition-all duration-200"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl group"
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                    ) : (
                      <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                    )}
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Contact Info */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Get in Touch Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              Get in Touch
            </h3>
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.label}
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card
                    className={`${method.bgColor} backdrop-blur-xl border ${method.borderColor} hover:border-opacity-50 transition-all duration-200 ${
                      method.action ? "cursor-pointer" : ""
                    } group`}
                    onClick={method.action || undefined}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}
                        >
                          <method.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-lg">{method.label}</h4>
                          <p className="text-gray-400 text-base">{method.value}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Follow Me Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Follow Me</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-16 h-16 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 ${social.hoverColor} group`}
                >
                  <social.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-200" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Enhanced Availability Status */}
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-75" />
                </div>
                <h4 className="text-white font-bold text-xl">Currently Available</h4>
              </div>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                I'm actively looking for new opportunities and exciting projects to work on.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2 text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  Open to opportunities
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2 text-sm font-medium">
                  <Clock className="w-4 h-4 mr-2" />
                  Quick response
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Response Time Card */}
          <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-2">Average Response Time</h4>
                  <p className="text-gray-400">I typically respond within 24 hours</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-400">&lt; 24h</div>
                  <div className="text-sm text-gray-400">Usually faster!</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
