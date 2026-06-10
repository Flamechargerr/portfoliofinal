import GallerySection from "@/components/gallery-section"
import ScrollCollageSection from "@/components/scroll-collage-section"
import StoreSection from "@/components/store-section"
import PartnersSection from "@/components/partners-section"
import TrackSplitSection from "@/components/track-split-section"
import TestimonialSection from "@/components/testimonial-section"
import HelmetHall from "@/components/helmet-hall-bk"

import MacbookScrollDemo from "@/components/macbook-scroll-demo"
import ThreeDCardDemo from "@/components/3d-card-demo"
import ThreeDMarqueeDemo from "@/components/3d-marquee-demo"
import AnimatedModalDemo from "@/components/animated-modal-demo"
import ExpandableCardDemo from "@/components/expandable-card-demo-standard"

import Link from "next/link"

export default function ComponentsArchivePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Archive Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-lorenzo-accent">COMPONENTS ARCHIVE</h1>
        <Link href="/" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-sm transition-colors">
          Back to Home
        </Link>
      </header>

      <div className="pt-24 pb-12 space-y-24">
        {/* Intro */}
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 max-w-2xl mx-auto">
            This page displays components that exist in the codebase but are not currently used on the main landing
            page. This serves as a visual reference for unused assets.
          </p>
        </div>

        {/* Gallery Section */}
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-mono text-center mb-8 text-gray-500">1. Gallery Section (Unused)</h2>
          <div className="relative isolate">
            <GallerySection />
          </div>
        </div>

        {/* Scroll Collage Section */}
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-mono text-center mb-8 text-gray-500">2. Scroll Collage Section (Unused)</h2>
          <div className="relative isolate">
            <ScrollCollageSection />
          </div>
        </div>

        {/* Store Section */}
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-mono text-center mb-8 text-gray-500">3. Store Section (Unused)</h2>
          <div className="relative isolate">
            <StoreSection />
          </div>
        </div>

        {/* Partners Section */}
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-mono text-center mb-8 text-gray-500">4. Partners Section (Unused)</h2>
          <div className="relative isolate">
            <PartnersSection />
          </div>
        </div>

        {/* Track Split Section */}
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-mono text-center mb-8 text-gray-500">5. Track Split Section (Unused)</h2>
          <div className="relative isolate">
            <TrackSplitSection />
          </div>
        </div>

        {/* Helmet Hall Section */}
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-mono text-center mb-8 text-gray-500">5. Track Split Section (Unused)</h2>
          <div className="relative isolate">
            <HelmetHall />
          </div>
        </div>

        {/* Testimonial Section (Old Version) */}
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-mono text-center mb-8 text-gray-500">
            6. Testimonial Section (Superseded by BikeShowcase)
          </h2>
          <div className="relative isolate">
            <TestimonialSection />
          </div>
        </div>

        {/* 7. Macbook Scroll Demo */}
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-mono text-center mb-8 text-gray-500">
            7. Macbook Scroll Section (New)
          </h2>
          <div className="relative isolate">
            <MacbookScrollDemo />
          </div>
        </div>

        {/* 8. 3D Card Demo */}
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-mono text-center mb-8 text-gray-500">
            8. 3D Hover Card Section (New)
          </h2>
          <div className="relative isolate flex justify-center">
            <ThreeDCardDemo />
          </div>
        </div>

        {/* 9. 3D Marquee Demo */}
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-mono text-center mb-8 text-gray-500">
            9. 3D Marquee Section (New)
          </h2>
          <div className="relative isolate">
            <ThreeDMarqueeDemo />
          </div>
        </div>

        {/* 10. Animated Modal Demo */}
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-mono text-center mb-8 text-gray-500">
            10. Animated Modal Section (New)
          </h2>
          <div className="relative isolate">
            <AnimatedModalDemo />
          </div>
        </div>

        {/* 11. Expandable Card Demo */}
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-mono text-center mb-8 text-gray-500">
            11. Expandable Cards List (New)
          </h2>
          <div className="relative isolate">
            <ExpandableCardDemo />
          </div>
        </div>
      </div>
    </main>
  )
}
