import { ReactNode, useState } from 'react'
import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaTimes } from 'react-icons/fa'

interface AlertProps {
  children: ReactNode
  type?: 'info' | 'success' | 'warning' | 'error'
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

const Alert = ({
  children,
  type = 'info',
  dismissible = false,
  onDismiss,
  className = '',
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const typeStyles = {
    info: 'bg-gray-700 text-text-primary',
    success: 'bg-gray-700 text-text-primary',
    warning: 'bg-gray-700 text-text-primary',
    error: 'bg-gray-700 text-text-primary',
  }

  const icons = {
    info: FaInfoCircle,
    success: FaCheckCircle,
    warning: FaExclamationTriangle,
    error: FaTimesCircle,
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
        ${typeStyles[type]}
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
          <FaTimes className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export default Alert
