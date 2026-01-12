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
        <span className="text-text-secondary">{label}</span>
      )}
      <input
        type="radio"
        {...props}
        className="w-5 h-5 text-text-primary focus:outline-none cursor-pointer"
      />
      {label && labelPosition === 'right' && (
        <span className="text-text-secondary">{label}</span>
      )}
    </label>
  )
}

export default Radio
