import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Roboto, Libre_Baskerville, Alex_Brush, Oswald } from "next/font/google"
import SmoothScroll from "@/components/smooth-scroll"
import Preloader from "@/components/preloader"
import "./globals.css"

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
})

const alexBrush = Alex_Brush({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-alex-brush",
  display: "swap",
})

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  display: "swap",
})

const oswald = Oswald({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Anamay Tripathy - Data Science Engineer & Full Stack Developer",
  description: "Portfolio of Anamay Tripathy - B.Tech Data Science Engineering student at MIT Manipal, Technical Head at YaanBarpe, Software Engineering Intern at Intellect Design Arena",
  keywords: ["Anamay Tripathy", "Data Science", "Full Stack Developer", "MIT Manipal", "Portfolio", "React", "Node.js", "Python", "Machine Learning"],
  authors: [{ name: "Anamay Tripathy" }],
  creator: "Anamay Tripathy",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anamay.vercel.app",
    siteName: "Anamay Tripathy Portfolio",
    title: "Anamay Tripathy - Data Science Engineer & Full Stack Developer",
    description: "Portfolio showcasing projects, skills, and experience in data science and full-stack development",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anamay Tripathy - Data Science Engineer & Full Stack Developer",
    description: "Portfolio showcasing projects, skills, and experience in data science and full-stack development",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Anamay Tripathy",
    url: "https://anamay.vercel.app",
    image: "https://anamay.vercel.app/images/anamay-profile.png",
    jobTitle: "Data Science Engineer & Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "YaanBarpe",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "MIT Manipal",
    },
    sameAs: [
      "https://github.com/Flamechargerr",
      "https://linkedin.com/in/anamay-tripathy-b53829296",
    ],
    knowsAbout: [
      "Data Science",
      "Machine Learning",
      "Full Stack Development",
      "React",
      "Next.js",
      "Python",
      "Node.js",
    ],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`font-sans antialiased ${roboto.variable} ${libreBaskerville.variable} ${alexBrush.variable} ${oswald.variable}`}
      >
        {/* Skip Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-lorenzo-accent focus:text-lorenzo-dark focus:font-bold focus:uppercase focus:text-sm"
        >
          Skip to main content
        </a>
        <Preloader />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
