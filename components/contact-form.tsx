"use client"

import { useState, useRef, useMemo } from "react"
import { motion, useInView } from "framer-motion"
import emailjs from "@emailjs/browser"
import toast, { Toaster } from "react-hot-toast"

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactForm() {
    const formRef = useRef<HTMLFormElement>(null)
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [touched, setTouched] = useState<Record<string, boolean>>({})
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })

    // Validation
    const validation = useMemo(() => ({
        email: formData.email ? emailRegex.test(formData.email) : true,
        name: formData.name.length >= 2 || formData.name === "",
        message: formData.message.length >= 10 || formData.message === "",
    }), [formData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleBlur = (field: string) => {
        setTouched({ ...touched, [field]: true })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message')
            }

            toast.success(data.message || "Message sent successfully! I'll get back to you soon.", {
                style: {
                    background: "#1b1c11",
                    color: "#c8f550",
                    border: "1px solid #c8f550",
                },
                iconTheme: {
                    primary: "#c8f550",
                    secondary: "#1b1c11",
                },
            })

            setFormData({ name: "", email: "", subject: "", message: "" })
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to send message. Please try again."
            toast.error(errorMessage, {
                style: {
                    background: "#1b1c11",
                    color: "#ff4444",
                    border: "1px solid #ff4444",
                },
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section ref={sectionRef} className="py-20 bg-lorenzo-dark">
            <Toaster position="bottom-right" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left Side - Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-px bg-lorenzo-accent" />
                            <span className="text-xs font-bold uppercase tracking-widest text-lorenzo-accent">
                                GET IN TOUCH
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-brier uppercase leading-[0.9] tracking-tight mb-6">
                            <span className="block text-lorenzo-light">LET'S</span>
                            <span className="block text-lorenzo-accent">COLLABORATE</span>
                        </h2>

                        <p className="text-lorenzo-light/60 text-lg mb-8 max-w-md">
                            Have a project in mind? Looking for a developer? Or just want to say hi?
                            Fill out the form and I'll get back to you within 24 hours.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <motion.a
                                href="mailto:tripathy.anamay23@gmail.com"
                                className="flex items-center gap-4 p-4 border border-lorenzo-accent/20 hover:border-lorenzo-accent transition-all group"
                                whileHover={{ x: 10 }}
                            >
                                <div className="w-12 h-12 bg-lorenzo-accent/10 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-lorenzo-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm text-lorenzo-light/50 uppercase tracking-wider">Email</div>
                                    <div className="text-lorenzo-light group-hover:text-lorenzo-accent transition-colors">tripathy.anamay23@gmail.com</div>
                                </div>
                            </motion.a>

                            <motion.a
                                href="tel:+919877454747"
                                className="flex items-center gap-4 p-4 border border-lorenzo-accent/20 hover:border-lorenzo-accent transition-all group"
                                whileHover={{ x: 10 }}
                            >
                                <div className="w-12 h-12 bg-lorenzo-accent/10 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-lorenzo-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm text-lorenzo-light/50 uppercase tracking-wider">Phone</div>
                                    <div className="text-lorenzo-light group-hover:text-lorenzo-accent transition-colors">+91 9877454747</div>
                                </div>
                            </motion.a>

                            <motion.div
                                className="flex items-center gap-4 p-4 border border-lorenzo-accent/20"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.4 }}
                            >
                                <div className="w-12 h-12 bg-lorenzo-accent/10 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-lorenzo-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm text-lorenzo-light/50 uppercase tracking-wider">Location</div>
                                    <div className="text-lorenzo-light">Mumbai, India • Open to Remote</div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Response Time Guarantee */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5 }}
                            className="mt-8 p-6 border border-green-500/30 bg-green-500/5 rounded-lg"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">⚡</span>
                                <span className="text-green-400 font-bold uppercase tracking-wider">
                                    &lt; 24h Average Response Time
                                </span>
                            </div>
                            <p className="text-lorenzo-light/50 text-sm">
                                I'm actively looking for new opportunities. Your message won't sit unread — usually much faster!
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-lorenzo-light/50 mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('name')}
                                        required
                                        minLength={2}
                                        className={`w-full px-4 py-4 bg-transparent border text-lorenzo-light focus:border-lorenzo-accent focus:outline-none transition-colors placeholder:text-lorenzo-light/30 focus-ring ${touched.name && !validation.name ? 'border-red-500' : 'border-lorenzo-light/20'
                                            }`}
                                        placeholder="John Doe"
                                    />
                                    {touched.name && !validation.name && (
                                        <p className="text-red-400 text-xs mt-1">Name must be at least 2 characters</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-lorenzo-light/50 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={() => handleBlur('email')}
                                        required
                                        className={`w-full px-4 py-4 bg-transparent border text-lorenzo-light focus:border-lorenzo-accent focus:outline-none transition-colors placeholder:text-lorenzo-light/30 focus-ring ${touched.email && !validation.email ? 'border-red-500' : 'border-lorenzo-light/20'
                                            }`}
                                        placeholder="john@example.com"
                                    />
                                    {touched.email && !validation.email && (
                                        <p className="text-red-400 text-xs mt-1">Please enter a valid email address</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-lorenzo-light/50 mb-2">
                                    Subject *
                                </label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-4 bg-lorenzo-dark border border-lorenzo-light/20 text-lorenzo-light focus:border-lorenzo-accent focus:outline-none transition-colors focus-ring"
                                >
                                    <option value="">Select a topic...</option>
                                    <option value="internship">Internship Opportunity</option>
                                    <option value="fulltime">Full-time Role</option>
                                    <option value="freelance">Freelance Project</option>
                                    <option value="collaboration">Collaboration</option>
                                    <option value="mentorship">Mentorship Request</option>
                                    <option value="question">General Question</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-lorenzo-light/50">
                                        Message *
                                    </label>
                                    <span className={`text-xs ${formData.message.length < 10 ? 'text-lorenzo-light/30' :
                                            formData.message.length > 1000 ? 'text-red-400' : 'text-lorenzo-accent'
                                        }`}>
                                        {formData.message.length}/1000
                                    </span>
                                </div>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('message')}
                                    required
                                    rows={6}
                                    maxLength={1000}
                                    className={`w-full px-4 py-4 bg-transparent border text-lorenzo-light focus:border-lorenzo-accent focus:outline-none transition-colors resize-none placeholder:text-lorenzo-light/30 focus-ring ${touched.message && !validation.message ? 'border-red-500' : 'border-lorenzo-light/20'
                                        }`}
                                    placeholder="Tell me about your project or just say hello... (min. 10 characters)"
                                />
                                {touched.message && !validation.message && (
                                    <p className="text-red-400 text-xs mt-1">Message must be at least 10 characters</p>
                                )}
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full px-8 py-5 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider text-sm hover:shadow-lg hover:shadow-lorenzo-accent/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
