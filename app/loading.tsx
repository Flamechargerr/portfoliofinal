"use client"

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-lorenzo-dark z-[200] flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
                {/* Logo animation */}
                <div className="relative">
                    <div className="text-6xl font-brier text-lorenzo-accent animate-pulse">
                        ANAMAY
                    </div>
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-lorenzo-dark overflow-hidden">
                        <div
                            className="h-full bg-lorenzo-accent animate-bounce"
                            style={{ animation: "loading-bar 1.5s ease-in-out infinite" }}
                        />
                    </div>
                </div>

                {/* Loading text */}
                <div className="flex items-center gap-2 text-lorenzo-light/50 text-sm uppercase tracking-widest">
                    <span>Loading</span>
                    <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "200ms" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "400ms" }}>.</span>
                </div>
            </div>
        </div>
    )
}
