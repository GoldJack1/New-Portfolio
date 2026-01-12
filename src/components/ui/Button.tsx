import { ReactNode } from 'react'

interface ButtonProps {
  children?: ReactNode
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
  const baseStyles = 'rounded-full font-semibold transition-all duration-200 focus:outline-none'
  
  const variantStyles = {
    primary: 'bg-gray-800 text-text-primary shadow-lg hover:shadow-xl relative overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-[rgba(255,255,255,0.25)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200',
    secondary: 'bg-gray-600 text-text-primary shadow-md hover:shadow-lg relative overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-[rgba(0,0,0,0.25)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200',
    tertiary: 'bg-gray-700 text-text-primary shadow-md hover:shadow-lg relative overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-[rgba(0,0,0,0.25)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200',
    ghost: 'bg-transparent text-text-primary shadow-sm hover:shadow-md relative overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-[rgba(255,255,255,0.25)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200',
  }

  const sizeStyles = {
    sm: iconOnly ? 'w-8 h-8' : 'px-4 py-2 text-sm',
    md: iconOnly ? 'w-10 h-10' : 'px-6 py-3 text-base',
    lg: iconOnly ? 'w-12 h-12' : 'px-8 py-4 text-lg',
  }

  const disabledStyles = disabled || loading
    ? 'opacity-50 cursor-not-allowed'
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
      <span className="relative z-10">
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
      </span>
    </button>
  )
}

export default Button
