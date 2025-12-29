"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface Breadcrumb {
    label: string
    href: string
}

interface BreadcrumbsProps {
    items: Breadcrumb[]
    currentPage: string
}

export function Breadcrumbs({ items, currentPage }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
            {items.map((item, index) => (
                <span key={item.href} className="flex items-center gap-2">
                    <Link
                        href={item.href}
                        className="text-lorenzo-light/50 hover:text-lorenzo-accent transition-colors"
                    >
                        {item.label}
                    </Link>
                    <span className="text-lorenzo-light/30">/</span>
                </span>
            ))}
            <span className="text-lorenzo-accent font-medium">{currentPage}</span>
        </nav>
    )
}

// Page header component for consistent styling
interface PageHeaderProps {
    label: string
    title: string
    titleHighlight?: string
    description?: string
    centered?: boolean
}

export function PageHeader({
    label,
    title,
    titleHighlight,
    description,
    centered = true
}: PageHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={centered ? "text-center mb-16" : "mb-16"}
        >
            <div className={`flex items-center gap-4 mb-6 ${centered ? "justify-center" : ""}`}>
                <div className="w-12 h-px bg-lorenzo-accent" />
                <span className="text-xs font-bold uppercase tracking-widest text-lorenzo-accent">
                    {label}
                </span>
                {centered && <div className="w-12 h-px bg-lorenzo-accent" />}
            </div>

            <h1 className="text-5xl md:text-7xl font-brier uppercase leading-[0.9] tracking-tight mb-6">
                <span className="text-lorenzo-light">{title}</span>
                {titleHighlight && (
                    <>
                        {" "}
                        <span className="text-lorenzo-accent">{titleHighlight}</span>
                    </>
                )}
            </h1>

            {description && (
                <p className={`text-lorenzo-light/60 max-w-2xl ${centered ? "mx-auto" : ""}`}>
                    {description}
                </p>
            )}
        </motion.div>
    )
}

// Empty state component
interface EmptyStateProps {
    icon?: string
    title: string
    description: string
    action?: {
        label: string
        href?: string
        onClick?: () => void
    }
}

export function EmptyState({ icon = "📭", title, description, action }: EmptyStateProps) {
    return (
        <div className="text-center py-20 border border-lorenzo-accent/20">
            <div className="text-8xl mb-6">{icon}</div>
            <h2 className="text-2xl font-brier text-lorenzo-accent uppercase mb-4">{title}</h2>
            <p className="text-lorenzo-light/50 max-w-md mx-auto mb-8">{description}</p>
            {action && (
                action.href ? (
                    <Link
                        href={action.href}
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-lorenzo-accent text-lorenzo-accent font-bold uppercase tracking-wider hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all"
                    >
                        {action.label}
                    </Link>
                ) : (
                    <button
                        onClick={action.onClick}
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-lorenzo-accent text-lorenzo-accent font-bold uppercase tracking-wider hover:bg-lorenzo-accent hover:text-lorenzo-dark transition-all"
                    >
                        {action.label}
                    </button>
                )
            )}
        </div>
    )
}

// Badge/Tag component
interface BadgeProps {
    children: React.ReactNode
    variant?: "default" | "outline" | "filled"
    size?: "sm" | "md"
}

export function Badge({ children, variant = "default", size = "sm" }: BadgeProps) {
    const baseClasses = "inline-flex items-center font-bold uppercase tracking-wider"
    const sizeClasses = size === "sm" ? "text-xs px-2 py-1" : "text-sm px-3 py-1.5"
    const variantClasses = {
        default: "bg-lorenzo-accent/10 text-lorenzo-accent",
        outline: "border border-lorenzo-accent/30 text-lorenzo-accent",
        filled: "bg-lorenzo-accent text-lorenzo-dark"
    }

    return (
        <span className={`${baseClasses} ${sizeClasses} ${variantClasses[variant]}`}>
            {children}
        </span>
    )
}

// Divider component
interface DividerProps {
    label?: string
    className?: string
}

export function Divider({ label, className = "" }: DividerProps) {
    if (label) {
        return (
            <div className={`flex items-center gap-4 ${className}`}>
                <div className="flex-1 h-px bg-lorenzo-accent/20" />
                <span className="text-xs font-bold uppercase tracking-widest text-lorenzo-accent/50">
                    {label}
                </span>
                <div className="flex-1 h-px bg-lorenzo-accent/20" />
            </div>
        )
    }
    return <div className={`h-px bg-lorenzo-accent/20 ${className}`} />
}

// Stats display component
interface StatProps {
    value: string | number
    label: string
    suffix?: string
}

export function Stat({ value, label, suffix = "" }: StatProps) {
    return (
        <div className="text-center">
            <div className="text-4xl md:text-5xl font-brier text-lorenzo-accent">
                {value}{suffix}
            </div>
            <div className="text-sm font-bold uppercase tracking-wider text-lorenzo-light/50 mt-2">
                {label}
            </div>
        </div>
    )
}

export function StatsGrid({ stats }: { stats: StatProps[] }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-lorenzo-accent/20">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                >
                    <Stat {...stat} />
                </motion.div>
            ))}
        </div>
    )
}
