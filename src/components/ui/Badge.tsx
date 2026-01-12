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
    primary: 'bg-gray-800 text-text-primary',
    secondary: 'bg-gray-600 text-text-primary',
    tertiary: 'bg-gray-700 text-text-primary',
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
