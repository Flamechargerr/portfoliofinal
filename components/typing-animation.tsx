"use client"

import { TypeAnimation } from "react-type-animation"
import { motion } from "framer-motion"

const codeSnippets = [
    `const analyze = async (data) => {
  const insights = await ml.predict(data);
  return insights.filter(i => i.confidence > 0.95);
};`,
    2000,
    `class DataPipeline:
    def __init__(self, source):
        self.source = source
        self.transforms = []
    
    def process(self):
        return self.execute()`,
    2000,
    `SELECT users.name, COUNT(projects.id) 
FROM users 
JOIN projects ON users.id = projects.user_id 
GROUP BY users.id HAVING COUNT(*) > 5;`,
    2000,
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
                <div className="flex items-center gap-2 px-4 py-3 bg-[#2a2a2a] border-b border-lorenzo-accent/10">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-4 text-xs text-gray-400 font-mono">anamay@dev ~ </span>
                </div>

                {/* Terminal Content */}
                <div className="p-4 md:p-6 font-mono text-sm md:text-base">
                    <div className="flex items-start gap-2">
                        <span className="text-lorenzo-accent">$</span>
                        <TypeAnimation
                            sequence={codeSnippets}
                            wrapper="pre"
                            speed={50}
                            repeat={Infinity}
                            className="text-gray-300 whitespace-pre-wrap overflow-hidden"
                            cursor={true}
                        />
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
