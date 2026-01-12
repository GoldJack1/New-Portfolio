import { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
  placeholder?: string
  className?: string
}

const Select = ({
  label,
  options,
  placeholder,
  className = '',
  ...props
}: SelectProps) => {
  const baseStyles = 'w-full px-4 py-3 rounded-full bg-gray-800 text-text-primary focus:outline-none focus:bg-gray-700 transition-all appearance-none cursor-pointer'

  return (
    <div className="w-full min-w-0">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-200 mb-2 break-words">
          {label}
        </label>
      )}
      <div className="relative w-full min-w-0">
        <select
          {...props}
          className={`
            ${baseStyles}
            ${className}
          `}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Select
