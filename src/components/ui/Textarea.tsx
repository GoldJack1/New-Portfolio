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
  const baseStyles = 'w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-50 focus:outline-none transition-all resize-none'
  
  const stateStyles = error
    ? 'focus:bg-gray-700 bg-gray-700'
    : success
    ? 'focus:bg-gray-700 bg-gray-800'
    : 'focus:bg-gray-700'

  return (
    <div className="w-full min-w-0">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-200 mb-2 break-words">
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
