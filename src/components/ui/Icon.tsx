import { getStrokeWidth } from '../../config/iconWeights'

// ViewBox size
const VIEWBOX_SIZE = 32

// Base stroke width the paths were designed for (weight 100)
const BASE_STROKE_WIDTH = 2.22

// SVG path data for each icon (32x32 viewBox)
// Paths are designed with coordinates from 1.11 to 30.89 (half of base stroke inset)
const iconPaths: Record<string, { paths: string[]; strokeLinejoin?: 'round' }> = {
  'cross': {
    paths: [
      'M30.89,1.11L1.11,30.89',
      'M1.11,1.11l29.78,29.78'
    ]
  },
  'plus': {
    paths: [
      'M16,1.11v29.78',
      'M30.89,16H1.11'
    ]
  },
  'minus': {
    paths: [
      'M30.89,16H1.11'
    ]
  },
  'chevron-left': {
    paths: [
      'M22.872,1.11l-12.711,12.434c-1.378,1.348-1.378,3.565,0,4.913l12.711,12.434'
    ],
    strokeLinejoin: 'round'
  },
  'chevron-right': {
    paths: [
      'M9.128,1.11l12.711,12.434c1.378,1.348,1.378,3.565,0,4.913l-12.711,12.434'
    ],
    strokeLinejoin: 'round'
  },
}

/**
 * Calculate the scale factor needed to fit the icon with its stroke within the viewBox
 * 
 * The paths are designed for BASE_STROKE_WIDTH (2.22px).
 * When stroke is thicker, we need to scale down the paths so that
 * the stroke + path still fits within the viewBox.
 * 
 * Formula:
 * - Original content size = VIEWBOX_SIZE - BASE_STROKE_WIDTH (accounts for half stroke on each side)
 * - Available size with new stroke = VIEWBOX_SIZE - strokeWidth - (inset * 2)
 * - Scale = available size / original content size
 */
function calculateScaleFactor(strokeWidth: number, inset: number = 0): number {
  const originalContentSize = VIEWBOX_SIZE - BASE_STROKE_WIDTH
  const availableSize = VIEWBOX_SIZE - strokeWidth - (inset * 2)
  return availableSize / originalContentSize
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
  /** 
   * Inset padding in viewBox units (0-16). 
   * Scales the icon down to add padding inside the icon container.
   * For example, inset={2} adds 2 units of padding on each side.
   */
  inset?: number
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
 * 
 * // With inset padding (adds space around the icon)
 * <Icon name="chevron-left" weight={400} size={24} inset={2} />
 * ```
 */
export function Icon({
  name,
  weight = 400,
  className = '',
  size,
  strokeWidth: customStrokeWidth,
  color,
  inset = 0,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
}: IconProps) {
  const iconData = iconPaths[name]
  
  if (!iconData) {
    console.warn(`Icon "${name}" not found`)
    return null
  }
  
  // Calculate stroke width from weight or use custom value
  const calculatedStrokeWidth = customStrokeWidth ?? getStrokeWidth(weight)
  
  // Calculate scale factor to fit the icon with its stroke and inset
  const scaleFactor = calculateScaleFactor(calculatedStrokeWidth, inset)
  
  // Calculate translation to keep the scaled content centered
  // We scale from the center of the viewBox (16, 16)
  const center = VIEWBOX_SIZE / 2
  const translateOffset = center * (1 - scaleFactor)
  
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
        strokeLinecap="round"
        strokeLinejoin={iconData.strokeLinejoin}
        style={{ width: '100%', height: '100%' }}
      >
        <g transform={`translate(${translateOffset}, ${translateOffset}) scale(${scaleFactor})`}>
          {iconData.paths.map((d, i) => (
            <path 
              key={i} 
              d={d} 
              strokeWidth={calculatedStrokeWidth / scaleFactor}
              style={{ transition: 'stroke-width 200ms ease-out' }}
            />
          ))}
        </g>
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
