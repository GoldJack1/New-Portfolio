import { useState, ChangeEvent } from 'react'

interface SliderProps {
  min?: number
  max?: number
  step?: number
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  showValue?: boolean
  label?: string
  className?: string
}

const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = 50,
  onChange,
  showValue = true,
  label,
  className = '',
}: SliderProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value)
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  return (
    <div className={`w-full min-w-0 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2 break-words">
          {label}
        </label>
      )}
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="flex-1 h-2 bg-gray-700 rounded-full appearance-none cursor-pointer"
          style={{ accentColor: '#E6E5F4' }}
        />
        {showValue && (
          <span className="text-sm font-medium text-text-secondary min-w-[3rem] text-right">
            {value}
          </span>
        )}
      </div>
    </div>
  )
}

export default Slider
