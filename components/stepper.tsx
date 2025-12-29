"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface Step {
    id: number
    title: string
    description: string
    icon?: React.ReactNode
    status?: "complete" | "current" | "upcoming"
}

interface StepperProps {
    steps: Step[]
    currentStep?: number
    orientation?: "horizontal" | "vertical"
    onStepClick?: (stepId: number) => void
}

export default function Stepper({
    steps,
    currentStep = 1,
    orientation = "horizontal",
    onStepClick
}: StepperProps) {
    const [hoveredStep, setHoveredStep] = useState<number | null>(null)

    const getStepStatus = (stepId: number): "complete" | "current" | "upcoming" => {
        if (stepId < currentStep) return "complete"
        if (stepId === currentStep) return "current"
        return "upcoming"
    }

    if (orientation === "vertical") {
        return (
            <div className="flex flex-col gap-0">
                {steps.map((step, index) => {
                    const status = step.status || getStepStatus(step.id)
                    const isLast = index === steps.length - 1

                    return (
                        <div key={step.id} className="flex gap-4">
                            {/* Step indicator column */}
                            <div className="flex flex-col items-center">
                                <motion.button
                                    onClick={() => onStepClick?.(step.id)}
                                    onMouseEnter={() => setHoveredStep(step.id)}
                                    onMouseLeave={() => setHoveredStep(null)}
                                    className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${status === "complete"
                                            ? "bg-lorenzo-accent border-lorenzo-accent text-lorenzo-dark"
                                            : status === "current"
                                                ? "bg-lorenzo-accent/20 border-lorenzo-accent text-lorenzo-accent"
                                                : "bg-transparent border-white/20 text-white/40"
                                        }`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {status === "complete" ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : step.icon ? (
                                        step.icon
                                    ) : (
                                        <span className="font-bold">{step.id}</span>
                                    )}

                                    {/* Pulse animation for current step */}
                                    {status === "current" && (
                                        <motion.div
                                            className="absolute inset-0 rounded-full border-2 border-lorenzo-accent"
                                            animate={{
                                                scale: [1, 1.3, 1],
                                                opacity: [0.8, 0, 0.8]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity
                                            }}
                                        />
                                    )}
                                </motion.button>

                                {/* Connector line */}
                                {!isLast && (
                                    <motion.div
                                        className="w-0.5 flex-1 min-h-[60px]"
                                        style={{
                                            backgroundColor: status === "complete" ? "#c8f550" : "rgba(255,255,255,0.1)"
                                        }}
                                        initial={{ scaleY: 0 }}
                                        animate={{ scaleY: 1 }}
                                        transition={{ delay: index * 0.2 }}
                                    />
                                )}
                            </div>

                            {/* Step content */}
                            <motion.div
                                className={`pb-8 ${!isLast ? "min-h-[100px]" : ""}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h3 className={`font-bold text-lg uppercase tracking-wider mb-1 ${status === "upcoming" ? "text-white/40" : "text-white"
                                    }`}>
                                    {step.title}
                                </h3>
                                <p className={`text-sm ${status === "upcoming" ? "text-white/20" : "text-white/60"
                                    }`}>
                                    {step.description}
                                </p>
                            </motion.div>
                        </div>
                    )
                })}
            </div>
        )
    }

    // Horizontal orientation
    return (
        <div className="flex items-start justify-between">
            {steps.map((step, index) => {
                const status = step.status || getStepStatus(step.id)
                const isLast = index === steps.length - 1

                return (
                    <div key={step.id} className="flex-1 flex items-start">
                        <div className="flex flex-col items-center">
                            {/* Step circle */}
                            <motion.button
                                onClick={() => onStepClick?.(step.id)}
                                onMouseEnter={() => setHoveredStep(step.id)}
                                onMouseLeave={() => setHoveredStep(null)}
                                className={`relative w-14 h-14 rounded-full flex items-center justify-center border-2 transition-colors ${status === "complete"
                                        ? "bg-lorenzo-accent border-lorenzo-accent text-lorenzo-dark"
                                        : status === "current"
                                            ? "bg-lorenzo-accent/20 border-lorenzo-accent text-lorenzo-accent"
                                            : "bg-transparent border-white/20 text-white/40"
                                    }`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {status === "complete" ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : step.icon ? (
                                    step.icon
                                ) : (
                                    <span className="font-bold text-lg">{step.id}</span>
                                )}

                                {status === "current" && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-2 border-lorenzo-accent"
                                        animate={{
                                            scale: [1, 1.3, 1],
                                            opacity: [0.8, 0, 0.8]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity
                                        }}
                                    />
                                )}
                            </motion.button>

                            {/* Step label */}
                            <motion.div
                                className="mt-4 text-center max-w-[120px]"
                                animate={{
                                    opacity: hoveredStep === step.id ? 1 : 0.8
                                }}
                            >
                                <h3 className={`font-bold text-sm uppercase tracking-wider mb-1 ${status === "upcoming" ? "text-white/40" : "text-white"
                                    }`}>
                                    {step.title}
                                </h3>
                                <p className={`text-xs ${status === "upcoming" ? "text-white/20" : "text-white/50"
                                    }`}>
                                    {step.description}
                                </p>
                            </motion.div>
                        </div>

                        {/* Connector line */}
                        {!isLast && (
                            <div className="flex-1 flex items-center justify-center pt-6 px-2">
                                <motion.div
                                    className="h-0.5 w-full rounded-full"
                                    style={{
                                        backgroundColor: status === "complete" ? "#c8f550" : "rgba(255,255,255,0.1)"
                                    }}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: index * 0.2 + 0.3 }}
                                />
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

// Progress stepper variant
export function ProgressStepper({
    steps,
    currentStep
}: {
    steps: string[]
    currentStep: number
}) {
    const progress = ((currentStep - 1) / (steps.length - 1)) * 100

    return (
        <div className="relative">
            {/* Background line */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-white/10 rounded-full" />

            {/* Progress line */}
            <motion.div
                className="absolute top-5 left-0 h-1 bg-lorenzo-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
            />

            {/* Steps */}
            <div className="relative flex justify-between">
                {steps.map((step, index) => {
                    const isComplete = index + 1 < currentStep
                    const isCurrent = index + 1 === currentStep

                    return (
                        <motion.div
                            key={step}
                            className="flex flex-col items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${isComplete
                                    ? "bg-lorenzo-accent border-lorenzo-accent text-lorenzo-dark"
                                    : isCurrent
                                        ? "bg-lorenzo-dark border-lorenzo-accent text-lorenzo-accent"
                                        : "bg-lorenzo-dark border-white/20 text-white/40"
                                }`}>
                                {isComplete ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <span className="text-sm font-bold">{index + 1}</span>
                                )}
                            </div>
                            <span className={`mt-2 text-xs font-medium uppercase tracking-wider ${isComplete || isCurrent ? "text-white" : "text-white/40"
                                }`}>
                                {step}
                            </span>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
