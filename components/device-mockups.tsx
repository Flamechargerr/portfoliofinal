"use client"

import { motion } from "framer-motion"

interface DeviceMockupProps {
    imageSrc: string
    alt: string
    type?: "laptop" | "phone" | "tablet"
}

export function LaptopMockup({ imageSrc, alt }: DeviceMockupProps) {
    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            {/* Screen */}
            <div className="relative mx-auto w-full max-w-3xl">
                {/* Bezel */}
                <div className="bg-[#1a1a1a] rounded-t-2xl p-3 pb-0">
                    {/* Camera */}
                    <div className="w-3 h-3 bg-[#333] rounded-full mx-auto mb-2" />
                    {/* Screen content */}
                    <div className="relative bg-black rounded-t-lg overflow-hidden aspect-[16/10] border-2 border-[#333]">
                        <img
                            src={imageSrc}
                            alt={alt}
                            className="w-full h-full object-cover object-top"
                        />
                        {/* Screen glare */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                    </div>
                </div>
                {/* Keyboard/Base */}
                <div className="bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] h-4 rounded-b-lg mx-4" />
                <div className="bg-[#1a1a1a] h-2 rounded-b-xl mx-8" />
            </div>
        </motion.div>
    )
}

export function PhoneMockup({ imageSrc, alt }: DeviceMockupProps) {
    return (
        <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="relative w-[280px] bg-[#1a1a1a] rounded-[40px] p-3 shadow-2xl border-4 border-[#333]">
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1a1a1a] rounded-full z-10" />
                {/* Screen */}
                <div className="relative bg-black rounded-[32px] overflow-hidden aspect-[9/19]">
                    <img
                        src={imageSrc}
                        alt={alt}
                        className="w-full h-full object-cover object-top"
                    />
                    {/* Screen glare */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                </div>
                {/* Home indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
            </div>
        </motion.div>
    )
}

export function TabletMockup({ imageSrc, alt }: DeviceMockupProps) {
    return (
        <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="relative bg-[#1a1a1a] rounded-[24px] p-4 shadow-2xl border-4 border-[#333]">
                {/* Camera */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#333] rounded-full" />
                {/* Screen */}
                <div className="relative bg-black rounded-xl overflow-hidden aspect-[4/3] w-[400px]">
                    <img
                        src={imageSrc}
                        alt={alt}
                        className="w-full h-full object-cover object-top"
                    />
                    {/* Screen glare */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                </div>
            </div>
        </motion.div>
    )
}
