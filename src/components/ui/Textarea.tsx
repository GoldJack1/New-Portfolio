import { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: boolean
  success?: boolean
  className?: string
}

const Textarea = ({
  label,
  error = false,
  success = false,
  className = '',
  ...props
}: TextareaProps) => {
  const baseStyles = 'w-full px-4 py-3 rounded-full bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 transition-all resize-none'
  
  const stateStyles = error
    ? 'focus:ring-gray-700 bg-gray-100'
    : success
    ? 'focus:ring-gray-600 bg-gray-50'
    : 'focus:ring-gray-600'

  return (
    <div className="w-full min-w-0">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-2 break-words">
          {label}
        </label>
      )}
      <textarea
        {...props}
        className={`
          ${baseStyles}
          ${stateStyles}
          ${className}
        `}
      />
    </div>
  )
}

export default Textarea
