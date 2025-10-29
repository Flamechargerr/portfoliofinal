import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Anamay Tripathy - Data Science Engineer & Full Stack Developer",
  description:
    "Portfolio of Anamay Tripathy - B.Tech Data Science Engineering student, Technical Head at YaanBarpe, Software Engineering Intern at Intellect Design Arena",
  keywords: "Anamay Tripathy, Data Science, Full Stack Developer, MIT Manipal, Portfolio, React, Node.js, Python",
  authors: [{ name: "Anamay Tripathy" }],
  creator: "Anamay Tripathy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anamay-tripathy.vercel.app",
    title: "Anamay Tripathy - Data Science Engineer & Full Stack Developer",
    description: "Portfolio showcasing projects, skills, and experience in data science and full-stack development",
    siteName: "Anamay Tripathy Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anamay Tripathy - Data Science Engineer & Full Stack Developer",
    description: "Portfolio showcasing projects, skills, and experience in data science and full-stack development",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${poppins.variable} font-poppins antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
