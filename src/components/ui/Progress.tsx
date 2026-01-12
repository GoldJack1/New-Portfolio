import { ReactNode } from 'react'

interface ProgressProps {
  value: number
  max?: number
  variant?: 'linear' | 'circular'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  label?: ReactNode
  className?: string
}

const Progress = ({
  value,
  max = 100,
  variant = 'linear',
  size = 'md',
  showLabel = true,
  label,
  className = '',
}: ProgressProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizeStyles = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }

  if (variant === 'circular') {
    const circularSizes = {
      sm: 40,
      md: 60,
      lg: 80,
    }
    const radius = circularSizes[size]
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percentage / 100) * circumference

    return (
      <div className={`inline-flex flex-col items-center ${className}`}>
        <svg
          className="transform -rotate-90"
          width={radius * 2 + 20}
          height={radius * 2 + 20}
        >
          <circle
            cx={radius + 10}
            cy={radius + 10}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-text-primary"
          />
          <circle
            cx={radius + 10}
            cy={radius + 10}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="text-text-primary transition-all duration-300"
          />
        </svg>
        {showLabel && (
          <span className="mt-2 text-sm font-medium text-text-secondary">
            {label || `${Math.round(percentage)}%`}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-text-secondary">
            {label || 'Progress'}
          </span>
          <span className="text-sm font-medium text-text-secondary">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={`w-full bg-gray-700 rounded-full overflow-hidden ${sizeStyles[size]}`}>
        <div
          className="bg-gray-50 h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default Progress
