import { ReactNode, useState } from 'react'
import { JWPInfoCircleFilled2, JWPCheckmarkCircleFilled, JWPCrossCircleFilled, JWPCross } from '../../utils/iconMap'

interface AlertProps {
  children: ReactNode
  type?: 'info' | 'success' | 'warning' | 'error'
  variant?: 'primary' | 'secondary' | 'tertiary'
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

const Alert = ({
  children,
  type = 'info',
  variant,
  dismissible = false,
  onDismiss,
  className = '',
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const variantStyles = {
    primary: 'bg-gray-800 text-text-primary',
    secondary: 'bg-gray-600 text-text-primary',
    tertiary: 'bg-gray-700 text-text-primary',
  }

  const typeStyles = {
    info: 'bg-gray-800 text-text-primary',
    success: 'bg-gray-600 text-text-primary',
    warning: 'bg-gray-700 text-text-primary',
    error: 'bg-gray-800 text-text-primary',
  }

  // Use variant if provided, otherwise fall back to type-based styling
  const backgroundStyle = variant ? variantStyles[variant] : typeStyles[type]

  const icons = {
    info: JWPInfoCircleFilled2,
    success: JWPCheckmarkCircleFilled,
    warning: JWPInfoCircleFilled2,
    error: JWPCrossCircleFilled,
  }

  const Icon = icons[type]

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  return (
    <div
      className={`
        flex items-start gap-3 p-4 rounded-2xl
        ${backgroundStyle}
        ${className}
      `}
    >
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1">{children}</div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Dismiss"
        >
          <JWPCross className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export default Alert
