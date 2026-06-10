"use client"

import { TypeAnimation } from "react-type-animation"
import { motion } from "framer-motion"

const codeSnippets = [
    "whoami",
    1000,
    "whoami\nanamay_tripathy",
    1500,
    "whoami\nanamay_tripathy\n\n$ ls -la skills/",
    1000,
    "whoami\nanamay_tripathy\n\n$ ls -la skills/\ndrwxr-xr-x  frontend/\ndrwxr-xr-x  backend/\ndrwxr-xr-x  data-science/\ndrwxr-xr-x  tools/",
    2000,
    "whoami\nanamay_tripathy\n\n$ ls -la skills/\ndrwxr-xr-x  frontend/\ndrwxr-xr-x  backend/\ndrwxr-xr-x  data-science/\ndrwxr-xr-x  tools/\n\n$ cat philosophy.txt",
    1000,
    "whoami\nanamay_tripathy\n\n$ ls -la skills/\ndrwxr-xr-x  frontend/\ndrwxr-xr-x  backend/\ndrwxr-xr-x  data-science/\ndrwxr-xr-x  tools/\n\n$ cat philosophy.txt\n\"The only way to predict the future is to build it.\"",
    4000,
]

export default function TypingAnimation() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative w-full max-w-2xl mx-auto"
        >
            {/* Terminal Window */}
            <div className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-lorenzo-accent/20 shadow-2xl shadow-lorenzo-accent/10">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#2a2a2a] border-b border-lorenzo-accent/10 select-none">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span aria-hidden="true" className="ml-4 text-xs text-gray-400 font-mono">anamay@dev ~ </span>
                </div>

                {/* Terminal Content */}
                <div className="p-4 md:p-6 font-mono text-sm md:text-base min-h-[260px] flex flex-col justify-start">
                    <div className="flex items-start gap-2">
                        <span className="text-lorenzo-accent font-bold select-none">$</span>
                        <TypeAnimation
                            sequence={codeSnippets}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            className="text-gray-300 font-mono whitespace-pre-wrap overflow-hidden"
                            cursor={true}
                        />
                    </div>
                </div>

                {/* Scan line effect */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "linear-gradient(transparent 50%, rgba(200, 245, 80, 0.02) 50%)\",",
                        backgroundSize: "100% 4px",
                    }}
                />
            </div>
        </motion.div>
    )
}
