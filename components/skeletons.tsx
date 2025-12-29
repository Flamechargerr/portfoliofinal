"use client"

import { motion } from "framer-motion"

interface SkeletonProps {
    className?: string
}

export function Skeleton({ className = "" }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse bg-lorenzo-accent/10 rounded ${className}`}
        />
    )
}

export function CardSkeleton() {
    return (
        <div className="border border-lorenzo-accent/20 p-6">
            <Skeleton className="h-40 w-full mb-4" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-8 w-24" />
        </div>
    )
}

export function ProjectCardSkeleton() {
    return (
        <div className="border border-lorenzo-accent/20 p-6">
            <Skeleton className="aspect-video w-full mb-6" />
            <Skeleton className="h-6 w-3/4 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
            </div>
        </div>
    )
}

export function BlogCardSkeleton() {
    return (
        <div className="group">
            <Skeleton className="aspect-[16/10] w-full mb-6" />
            <Skeleton className="h-3 w-32 mb-3" />
            <Skeleton className="h-6 w-full mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-4 w-24" />
        </div>
    )
}

export function HeroSkeleton() {
    return (
        <div className="min-h-screen bg-lorenzo-dark flex items-center">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <Skeleton className="h-4 w-40 mb-6" />
                        <Skeleton className="h-16 w-full mb-4" />
                        <Skeleton className="h-16 w-3/4 mb-6" />
                        <Skeleton className="h-6 w-2/3 mb-8" />
                        <div className="flex gap-4">
                            <Skeleton className="h-14 w-40" />
                            <Skeleton className="h-14 w-40" />
                        </div>
                    </div>
                    <Skeleton className="aspect-square rounded-full" />
                </div>
            </div>
        </div>
    )
}

export function SectionSkeleton({ title = "Loading..." }: { title?: string }) {
    return (
        <div className="py-20 bg-lorenzo-dark">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-4"
                >
                    <div className="w-6 h-6 border-2 border-lorenzo-accent border-t-transparent rounded-full animate-spin" />
                    <span className="text-lorenzo-light/50 font-bold uppercase tracking-wider text-sm">
                        {title}
                    </span>
                </motion.div>
            </div>
        </div>
    )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="border border-lorenzo-accent/20">
            <div className="p-4 border-b border-lorenzo-accent/20 flex gap-4">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
            </div>
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="p-4 border-b border-lorenzo-accent/10 flex gap-4">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
            ))}
        </div>
    )
}
