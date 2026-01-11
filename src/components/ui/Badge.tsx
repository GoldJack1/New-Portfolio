import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'sm' | 'md' | 'lg'
  rounded?: 'rounded' | 'pill'
  className?: string
}

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = 'pill',
  className = '',
}: BadgeProps) => {
  const variantStyles = {
    primary: 'bg-gray-800 text-gray-50',
    secondary: 'bg-gray-500 text-gray-50',
    tertiary: 'bg-gray-300 text-gray-900',
  }

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  const roundedStyles = {
    rounded: 'rounded-lg',
    pill: 'rounded-full',
  }

  return (
    <span
      className={`
        inline-flex items-center font-medium
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${roundedStyles[rounded]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}

export default Badge
