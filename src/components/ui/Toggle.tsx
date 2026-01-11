import { useState } from 'react'

interface ToggleProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  label?: string
  className?: string
}

const Toggle = ({
  checked: controlledChecked,
  onChange,
  disabled = false,
  size = 'md',
  label,
  className = '',
}: ToggleProps) => {
  const [internalChecked, setInternalChecked] = useState(false)
  const isControlled = controlledChecked !== undefined
  const checked = isControlled ? controlledChecked : internalChecked

  const handleToggle = () => {
    if (disabled) return
    const newChecked = !checked
    if (!isControlled) {
      setInternalChecked(newChecked)
    }
    onChange?.(newChecked)
  }

  const sizeStyles = {
    sm: 'w-10 h-6',
    md: 'w-12 h-7',
    lg: 'w-14 h-8',
  }

  const thumbSizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <label className={`flex items-center gap-3 cursor-pointer ${className}`}>
      {label && <span className="text-gray-700">{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        disabled={disabled}
        className={`
          relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600
          ${sizeStyles[size]}
          ${checked ? 'bg-gray-800' : 'bg-gray-300'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <span
          className={`
            inline-block rounded-full bg-white transition-transform duration-200
            ${thumbSizeStyles[size]}
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </label>
  )
}

export default Toggle
