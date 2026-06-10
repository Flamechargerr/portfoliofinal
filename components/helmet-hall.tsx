"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const helmets = [
  { id: 1, name: "Season", year: "2025", image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=500&auto=format&fit=crop&q=80" },
  { id: 2, name: "Dark Glitter", year: "2025", image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=500&auto=format&fit=crop&q=80" },
  { id: 3, name: "Discoball", year: "2025", image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500&auto=format&fit=crop&q=80" },
  { id: 4, name: "Season", year: "2024", image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop&q=80" },
  { id: 5, name: "Japan", year: "2024", image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&auto=format&fit=crop&q=80" },
  { id: 6, name: "GIF", year: "2024", image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&auto=format&fit=crop&q=80" },
  { id: 7, name: "Season", year: "2025", image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=500&auto=format&fit=crop&q=80" },
  { id: 8, name: "Dark Glitter", year: "2025", image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=500&auto=format&fit=crop&q=80" },
  { id: 9, name: "Discoball", year: "2025", image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500&auto=format&fit=crop&q=80" },
  { id: 10, name: "Japan", year: "2024", image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop&q=80" },
  { id: 11, name: "GIF", year: "2024", image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&auto=format&fit=crop&q=80" },
  { id: 12, name: "Porcelain", year: "2024", image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&auto=format&fit=crop&q=80" },
  { id: 13, name: "Dark Mode", year: "2024", image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=500&auto=format&fit=crop&q=80" },
  { id: 14, name: "Raze", year: "2023", image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=500&auto=format&fit=crop&q=80" },
  { id: 15, name: "Chrome", year: "2023", image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500&auto=format&fit=crop&q=80" },
  { id: 16, name: "Beachball", year: "2023", image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop&q=80" },
  { id: 17, name: "Las Vegas", year: "2023", image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&auto=format&fit=crop&q=80" },
  { id: 18, name: "Basketball", year: "2022", image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&auto=format&fit=crop&q=80" },
  { id: 19, name: "Silverstone", year: "2020", image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=500&auto=format&fit=crop&q=80" },
  { id: 20, name: "Season", year: "2021", image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=500&auto=format&fit=crop&q=80" },
]

export default function HelmetHall() {
  const [hoveredHelmet, setHoveredHelmet] = useState<number | null>(null)

  return (
    <section id="helmets" className="relative min-h-screen text-white py-24 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight">
            <span className="text-white">HELMETS</span>
            <br />
            <span className="text-lorenzo-accent font-brier text-8xl">HALL OF FAME</span>
          </h2>
          <p className="text-base md:text-lg text-white/60 mt-6 max-w-2xl">
            From his iconic blobs to innovative one-off designs, Lorenzo has always been passionate about designing
            innovative and memorable helmets.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {helmets.map((helmet, index) => (
            <motion.div
              key={helmet.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.03, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredHelmet(helmet.id)}
              onMouseLeave={() => setHoveredHelmet(null)}
              style={{
                gridRow: index % 4 === 1 ? "span 1" : "auto",
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square overflow-hidden rounded-2xl bg-[#0a0a0a] 
                           border-2 border-gray-800 
                           group-hover:border-[#CFFF04] 
                           group-hover:shadow-2xl 
                           group-hover:shadow-[#CFFF04]/20 
                           transition-all duration-300"
              >
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <Image
                    src={helmet.image || "/placeholder.svg"}
                    alt={helmet.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                    style={{ mixBlendMode: "normal" }}
                  />
                </div>

                <div className="absolute bottom-4 right-4 text-right">
                  <p className="text-xs md:text-sm font-bold text-white/70 group-hover:text-white transition-colors duration-300">
                    {helmet.name}
                  </p>
                  <p className="text-sm md:text-base font-black text-[#CFFF04] group-hover:scale-110 group-hover:text-white transition-all duration-300 inline-block">
                    {helmet.year}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
