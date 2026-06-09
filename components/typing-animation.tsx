"use client"

import { TypeAnimation } from "react-type-animation"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const codeSnippets = [
    "whoami",
    1000,
    "whoami\nanamaytripathy (Data Science Engineer & Full Stack Developer)",
    2000,
    "whoami\nanamaytripathy (Data Science Engineer & Full Stack Developer)\n\n$ cat skills.txt",
    1000,
    "whoami\nanamaytripathy (Data Science Engineer & Full Stack Developer)\n\n$ cat skills.txt\nLanguages: Python, TypeScript, SQL\nFrameworks: React, Next.js, TensorFlow",
    2500,
    "whoami\nanamaytripathy (Data Science Engineer & Full Stack Developer)\n\n$ cat skills.txt\nLanguages: Python, TypeScript, SQL\nFrameworks: React, Next.js, TensorFlow\n\n$ npm run build",
    1000,
    "whoami\nanamaytripathy (Data Science Engineer & Full Stack Developer)\n\n$ cat skills.txt\nLanguages: Python, TypeScript, SQL\nFrameworks: React, Next.js, TensorFlow\n\n$ npm run build\nReady for production! ⚡",
    3000,
]

export default function TypingAnimation() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

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
                <div className="flex items-center gap-2 px-4 py-3 bg-[#2a2a2a] border-b border-lorenzo-accent/10">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-4 text-xs text-gray-400 font-mono" role="img" aria-label="Decorative terminal prompt">anamay@dev ~ </span>
                </div>

                {/* Terminal Content */}
                <div className="p-4 md:p-6 font-mono text-sm md:text-base">
                    <div className="flex items-start gap-2">
                        <span className="text-lorenzo-accent">$</span>
                        {mounted ? (
                            <TypeAnimation
                                sequence={codeSnippets}
                                wrapper="div"
                                speed={50}
                                repeat={Infinity}
                                className="text-gray-300 whitespace-pre-wrap overflow-hidden"
                                cursor={true}
                            />
                        ) : (
                            <div className="text-gray-300 whitespace-pre-wrap font-mono">
                                whoami<br />
                                anamaytripathy (Data Science Engineer & Full Stack Developer)
                            </div>
                        )}
                    </div>
                </div>

                {/* Scan line effect */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "linear-gradient(transparent 50%, rgba(200, 245, 80, 0.02) 50%)",
                        backgroundSize: "100% 4px",
                    }}
                />
            </div>
        </motion.div>
    )
}

