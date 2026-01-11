import { InputHTMLAttributes, ReactNode } from 'react'

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
  labelPosition?: 'left' | 'right'
  className?: string
}

const Radio = ({
  label,
  labelPosition = 'right',
  className = '',
  ...props
}: RadioProps) => {
  return (
    <label className={`flex items-center gap-3 cursor-pointer ${className}`}>
      {label && labelPosition === 'left' && (
        <span className="text-gray-700">{label}</span>
      )}
      <input
        type="radio"
        {...props}
        className="w-5 h-5 text-gray-800 focus:ring-2 focus:ring-gray-600 cursor-pointer"
      />
      {label && labelPosition === 'right' && (
        <span className="text-gray-700">{label}</span>
      )}
    </label>
  )
}

export default Radio
