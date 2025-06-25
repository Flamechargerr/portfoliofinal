interface CircularProgressProps {
  percentage: number
  size?: number
  color?: string
  value: string
  label: string
}

export function CircularProgress({ percentage, size = 60, color = "#3b82f6", value, label }: CircularProgressProps) {
  const radius = (size - 8) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-xs md:text-sm text-center leading-tight">{value}</span>
        </div>
      </div>
      <p className="text-gray-400 text-xs font-medium text-center leading-tight">{label}</p>
    </div>
  )
}
