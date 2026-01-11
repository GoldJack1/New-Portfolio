import { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: boolean
  success?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  className?: string
}

const Input = ({
  label,
  error = false,
  success = false,
  iconLeft,
  iconRight,
  className = '',
  ...props
}: InputProps) => {
  const baseStyles = 'w-full px-4 py-3 rounded-full bg-gray-50 text-gray-900 focus:outline-none transition-all'
  
  const stateStyles = error
    ? 'focus:bg-gray-100 bg-gray-100'
    : success
    ? 'focus:bg-gray-100 bg-gray-50'
    : 'focus:bg-gray-100'

  return (
    <div className="w-full min-w-0">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-2 break-words">
          {label}
        </label>
      )}
      <div className="relative w-full min-w-0">
        {iconLeft && (
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            {iconLeft}
          </span>
        )}
        <input
          {...props}
          className={`
            ${baseStyles}
            ${stateStyles}
            ${iconLeft ? 'pl-10' : ''}
            ${iconRight ? 'pr-10' : ''}
            ${className}
          `}
        />
        {iconRight && (
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            {iconRight}
          </span>
        )}
      </div>
    </div>
  )
}

export default Input
