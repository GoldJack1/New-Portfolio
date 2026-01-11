import { InputHTMLAttributes, ReactNode } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
  labelPosition?: 'left' | 'right'
  className?: string
}

const Checkbox = ({
  label,
  labelPosition = 'right',
  className = '',
  ...props
}: CheckboxProps) => {
  return (
    <label className={`flex items-center gap-3 cursor-pointer ${className}`}>
      {label && labelPosition === 'left' && (
        <span className="text-gray-700">{label}</span>
      )}
      <input
        type="checkbox"
        {...props}
        className="w-5 h-5 rounded text-gray-800 focus:outline-none cursor-pointer"
      />
      {label && labelPosition === 'right' && (
        <span className="text-gray-700">{label}</span>
      )}
    </label>
  )
}

export default Checkbox
