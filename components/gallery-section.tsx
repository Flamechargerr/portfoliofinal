"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery"

// Portfolio-relevant media items showcasing Anamay's work areas
const galleryItems = [
  {
    id: 1,
    type: "image",
    title: "AI Study Assistant",
    desc: "LangChain-powered intelligent learning companion",
    url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 2,
    type: "image",
    title: "Data Visualization Dashboard",
    desc: "Interactive analytics with Plotly & D3.js",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "Full Stack Architecture",
    desc: "Next.js + FastAPI microservices",
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 4,
    type: "image",
    title: "ML Model Training",
    desc: "TensorFlow neural network pipeline",
    url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 5,
    type: "image",
    title: "Cloud Infrastructure",
    desc: "AWS serverless deployment",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 6,
    type: "image",
    title: "Mobile-First Design",
    desc: "Responsive UI with Framer Motion",
    url: "https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=800&q=80",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 7,
    type: "image",
    title: "Database Architecture",
    desc: "PostgreSQL + MongoDB hybrid approach",
    url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
]

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <section id="gallery" ref={sectionRef} className="relative py-24 bg-lorenzo-dark overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lorenzo-accent/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="max-w-[1400px] mx-auto px-6 md:px-12"
      >
        {/* Section Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-lorenzo-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-lorenzo-accent">
              GALLERY
            </span>
            <div className="w-12 h-px bg-lorenzo-accent" />
          </div>
          <h3 className="text-2xl md:text-4xl font-brier text-lorenzo-light uppercase mb-2">
            PROJECT <span className="text-lorenzo-accent">SHOWCASE</span>
          </h3>
          <p className="text-lorenzo-light/50 text-sm max-w-lg mx-auto">
            Drag and explore a curated collection of my work
          </p>
        </div>

        {/* Bento Gallery */}
        <InteractiveBentoGallery
          mediaItems={galleryItems}
          title=""
          description=""
        />
      </motion.div>
    </section>
  )
}
