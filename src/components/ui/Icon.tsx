import { getStrokeWidth } from '../../config/iconWeights'

// SVG path data for each icon (32x32 viewBox)
const iconPaths: Record<string, string[]> = {
  'cross': [
    'M29.195,2.805L2.805,29.195',
    'M2.805,2.805l26.39,26.39'
  ],
  'plus': [
    'M16,2.805v26.39',
    'M29.195,16H2.805'
  ],
}

export type StrokeIconName = keyof typeof iconPaths

// Valid font weights
export type IconWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

export interface IconProps {
  /** Name of the icon */
  name: StrokeIconName
  /** Font weight to match (100-900) */
  weight?: IconWeight | number
  /** Additional CSS classes */
  className?: string
  /** Icon size - can be a number (pixels) or CSS string */
  size?: number | string
  /** Custom stroke width (overrides weight-based calculation) */
  strokeWidth?: number
  /** Color - defaults to currentColor */
  color?: string
  /** Accessibility label */
  'aria-label'?: string
  /** Hide from screen readers */
  'aria-hidden'?: boolean
}

/**
 * Icon component with variable stroke weight
 * 
 * Renders stroke-based SVG icons with stroke width calibrated to match
 * Geologica font weights.
 * 
 * @example
 * ```tsx
 * // Match font-weight 400 (regular)
 * <Icon name="cross" weight={400} className="w-4 h-4" />
 * 
 * // Match font-weight 700 (bold)
 * <Icon name="plus" weight={700} size={24} />
 * 
 * // Custom stroke width
 * <Icon name="cross" strokeWidth={2} className="w-6 h-6" />
 * ```
 */
export function Icon({
  name,
  weight = 400,
  className = '',
  size,
  strokeWidth: customStrokeWidth,
  color,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
}: IconProps) {
  const paths = iconPaths[name]
  
  if (!paths) {
    console.warn(`Icon "${name}" not found`)
    return null
  }
  
  // Calculate stroke width from weight or use custom value
  const calculatedStrokeWidth = customStrokeWidth ?? getStrokeWidth(weight)
  
  // Determine size styling
  const sizeValue = size ?? '1em'
  const sizeStyle = typeof sizeValue === 'number' 
    ? { width: `${sizeValue}px`, height: `${sizeValue}px` }
    : { width: sizeValue, height: sizeValue }
  
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',
        ...sizeStyle,
      }}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ?? !ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="none"
        stroke={color || 'currentColor'}
        strokeWidth={calculatedStrokeWidth}
        strokeLinecap="round"
        style={{ width: '100%', height: '100%' }}
      >
        {paths.map((d, i) => (
          <path key={i} d={d} strokeWidth={calculatedStrokeWidth} />
        ))}
      </svg>
    </span>
  )
}

/**
 * Get all available stroke icon names
 */
export function getStrokeIconNames(): StrokeIconName[] {
  return Object.keys(iconPaths) as StrokeIconName[]
}

/**
 * Check if an icon exists
 */
export function hasIcon(name: string): name is StrokeIconName {
  return name in iconPaths
}

export default Icon
