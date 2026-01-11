import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  icon?: ReactNode
  iconOnly?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconOnly = false,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) => {
  const baseStyles = 'rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600'
  
  const variantStyles = {
    primary: 'bg-gray-800 text-gray-50 shadow-lg hover:bg-gray-900 hover:shadow-xl',
    secondary: 'bg-gray-500 text-gray-50 shadow-md hover:bg-gray-600 hover:shadow-lg',
    tertiary: 'bg-gray-300 text-gray-900 shadow-md hover:bg-gray-400 hover:shadow-lg',
    ghost: 'bg-transparent text-gray-700 shadow-sm hover:bg-gray-200 hover:shadow-md',
  }

  const sizeStyles = {
    sm: iconOnly ? 'w-8 h-8' : 'px-4 py-2 text-sm',
    md: iconOnly ? 'w-10 h-10' : 'px-6 py-3 text-base',
    lg: iconOnly ? 'w-12 h-12' : 'px-8 py-4 text-lg',
  }

  const disabledStyles = disabled || loading
    ? 'opacity-50 cursor-not-allowed shadow-none'
    : ''

  const shadowStyles = {
    primary: 'shadow-lg',
    secondary: 'shadow-md',
    tertiary: 'shadow-md',
    ghost: 'shadow-sm',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabledStyles}
        ${shadowStyles[variant]}
        ${className}
      `}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <span className="animate-spin">⏳</span>
        </span>
      ) : iconOnly && icon ? (
        <span className="flex items-center justify-center">{icon}</span>
      ) : icon ? (
        <span className="flex items-center gap-2">
          {icon}
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
