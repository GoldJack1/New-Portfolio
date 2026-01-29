import { getStrokeWidth } from '../../config/iconWeights'
import { getClosestSize, getClosestWeight, getStarIconAssetPath } from '../../utils/starIcon'
import { getClosestSize as getInfoCircleClosestSize, getClosestWeight as getInfoCircleClosestWeight, getInfoCircleIconAssetPath } from '../../utils/infoCircleIcon'
import { useState, useEffect } from 'react'

// ViewBox size
const VIEWBOX_SIZE = 32

// Base stroke width the paths were designed for (weight 100)
const BASE_STROKE_WIDTH = 2.22

// SVG path data for each icon (32x32 viewBox)
// Paths are designed with coordinates from 1.11 to 30.89 (half of base stroke inset)
type IconPathData = {
  paths: string[]
  strokeLinejoin?: 'round'
  compound?: {
    outer: string[]  // Outer shape paths (e.g., circle)
    inner: string[]  // Inner shape paths (e.g., checkmark, cross)
    outerSize?: number // Optional: explicit outer size for calculation
  }
}

// Special icon names that use static SVG files instead of path data
const STATIC_ICONS = ['star', 'info-circle'] as const
type StaticIconName = typeof STATIC_ICONS[number]

const iconPaths: Record<string, IconPathData> = {
  'star': {
    paths: [], // Star uses static SVGs, not path data
  },
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
  'chevron-down': {
    paths: [
      'M1.11,9.13l12.44,12.72c1.34,1.37,3.56,1.37,4.9,0l12.44-12.72'
    ],
    strokeLinejoin: 'round'
  },
  'chevron-up': {
    paths: [
      'M1.11,22.87l12.44-12.72c1.34-1.37,3.56-1.37,4.9,0l12.44,12.72'
    ],
    strokeLinejoin: 'round'
  },
  'checkmark': {
    paths: [
      'M3.27,19.63l9.19,10.47c1.11,1.27,3.17.95,3.85-.6L28.73,1.11'
    ],
    strokeLinejoin: 'round'
  },
  'hamburger': {
    paths: [
      'M30.89,16H1.11',
      'M30.89,5.052H1.11',
      'M30.89,26.948H1.11'
    ]
  },
  'circled-checkmark': {
    paths: [], // Empty for simple icons, compound icons use compound property
    compound: {
      outer: [
        // Circle: cx="16" cy="16" r="14.89" converted to path
        'M 16,1.11 A 14.89,14.89 0 1,1 16,30.89 A 14.89,14.89 0 1,1 16,1.11'
      ],
      inner: [
        'M10.54,17.56l3.94,4.49c.47.54,1.35.41,1.64-.25l5.33-12.18'
      ],
      outerSize: 29.78 // Circle diameter (14.89 * 2)
    },
    strokeLinejoin: 'round'
  },
  'circled-cross': {
    paths: [], // Empty for simple icons, compound icons use compound property
    compound: {
      outer: [
        // Circle: cx="16" cy="16" r="14.89" converted to path
        'M 16,1.11 A 14.89,14.89 0 1,1 16,30.89 A 14.89,14.89 0 1,1 16,1.11'
      ],
      inner: [
        'M22.38,9.62l-12.76,12.76',
        'M9.62,9.62l12.76,12.76'
      ],
      outerSize: 29.78 // Circle diameter (14.89 * 2)
    },
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

/**
 * Calculate the inner scale factor for compound shapes
 * 
 * Based on Illustrator script logic: when stroke weight increases, inner shapes
 * need to shrink to maintain visual balance. The inner scale factor is calculated
 * based on the stroke increase relative to the outer shape size.
 * 
 * IMPORTANT: Icons are designed at weight 100 (BASE_STROKE_WIDTH = 2.22px) in a 32x32 viewBox.
 * All stroke widths are in viewBox units (32x32), so no scaling is needed.
 * 
 * Formula:
 * - Stroke increase = newStrokeWidth - BASE_STROKE_WIDTH (both in 32x32 viewBox units)
 * - Stroke increase per side = strokeIncrease / 2
 * - Reduction ratio = (strokeIncreasePerSide / outerSize) * shrinkMultiplier
 * - Inner scale factor = max(0.5, 1 - reductionRatio)
 * 
 * @param strokeWidth - Current stroke width (in 32x32 viewBox units)
 * @param outerSize - Size of the outer shape (diameter for circles, in viewBox units)
 * @returns Scale factor to apply to inner shapes (0.5 to 1.0)
 */
function calculateCompoundScaleFactor(strokeWidth: number, outerSize: number): number {
  // Icons are designed at weight 100 (BASE_STROKE_WIDTH = 2.22px) in 32x32 viewBox
  // strokeWidth is already in viewBox units from getStrokeWidth(weight)
  const strokeIncrease = strokeWidth - BASE_STROKE_WIDTH
  
  // If stroke hasn't increased, no scaling needed
  if (strokeIncrease <= 0.001) {
    return 1.0
  }
  
  const strokeIncreasePerSide = strokeIncrease / 2
  const shrinkMultiplier = 5.6 // Increased from 1.3 to make inner shapes shrink more noticeably
  const reductionRatio = (strokeIncreasePerSide / outerSize) * shrinkMultiplier
  const innerScaleFactor = Math.max(0.5, 1 - reductionRatio)
  
  return innerScaleFactor
}

export type StrokeIconName = keyof typeof iconPaths | StaticIconName

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
  // Handle static icons (like 'star', 'info-circle') that use pre-generated SVG files
  if (name === 'star') {
    return <StaticStarIcon 
      weight={weight}
      className={className}
      size={size}
      color={color}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    />
  }
  
  if (name === 'info-circle') {
    return <StaticInfoCircleIcon 
      weight={weight}
      className={className}
      size={size}
      color={color}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    />
  }
  
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
  
  // For compound shapes, calculate inner scale factor
  const compound = iconData.compound
  const isCompound = !!compound
  // For compound shapes, use the scaled outer size (after scaleFactor is applied)
  // This matches the Illustrator script which gets outerSize after scaling the group
  const scaledOuterSize = compound && compound.outerSize
    ? compound.outerSize * scaleFactor
    : 0
  const innerScaleFactor = compound && scaledOuterSize > 0
    ? calculateCompoundScaleFactor(calculatedStrokeWidth, scaledOuterSize)
    : 1.0
  
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
        {isCompound && compound ? (
          <>
            {/* Outer shape - scaled to fit, stroke width compensates for scaling */}
            <g transform={`translate(${translateOffset}, ${translateOffset}) scale(${scaleFactor})`}>
              {compound.outer.map((d, i) => (
                <path 
                  key={`outer-${i}`} 
                  d={d} 
                  strokeWidth={calculatedStrokeWidth / scaleFactor}
                  style={{ transition: 'stroke-width 200ms ease-out' }}
                />
              ))}
            </g>
            {/* Inner shape - shrinks as stroke weight increases, stroke matches outer weight but appears thinner due to scale */}
            {/* Both scale from the same center point (16, 16) to keep inner shape centered */}
            <g transform={`translate(${center}, ${center}) scale(${scaleFactor * innerScaleFactor}) translate(${-center}, ${-center})`}>
              {compound.inner.map((d, i) => (
                <path 
                  key={`inner-${i}`} 
                  d={d} 
                  strokeWidth={calculatedStrokeWidth / (scaleFactor * innerScaleFactor)}
                  style={{ transition: 'stroke-width 200ms ease-out, transform 200ms ease-out' }}
                />
              ))}
            </g>
          </>
        ) : (
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
        )}
      </svg>
    </span>
  )
}

/**
 * Static Star Icon Component
 * 
 * Renders the Star icon using pre-generated static SVG files.
 * No dynamic path calculations or stroke width adjustments are used.
 */
function StaticStarIcon({
  weight = 400,
  className = '',
  size,
  color,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
}: Omit<IconProps, 'name' | 'strokeWidth' | 'inset'>) {
  // Determine the size to use
  const sizeValue = size ?? 20 // Default to 20px if not specified
  const sizeNum = typeof sizeValue === 'number' ? sizeValue : 20
  
  // Round to nearest available size and weight
  const closestSize = getClosestSize(sizeNum)
  const closestWeight = getClosestWeight(weight)
  
  // Get the asset path
  const assetPath = getStarIconAssetPath(closestSize, closestWeight)
  
  // Load the SVG content dynamically
  const [svgContent, setSvgContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    let cancelled = false
    
    // Construct the path to the SVG asset
    // Files in public/ are served at the root, so /icons/star/...
    const svgPath = `/icons/star/${assetPath}`
    
    // Fetch the SVG content directly from the static asset
    fetch(svgPath)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`)
        return res.text()
      })
      .then((text) => {
        if (cancelled) return
        
        // Replace fill colors with currentColor for styling
        let styledSvg = text
          .replace(/fill="[^"]*"/g, 'fill="currentColor"')
          .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
        
        // Remove XML declaration and comments if present
        styledSvg = styledSvg.replace(/<\?xml[^>]*\?>/g, '')
        styledSvg = styledSvg.replace(/<!--[\s\S]*?-->/g, '')
        
        setSvgContent(styledSvg)
        setLoading(false)
      })
      .catch((err) => {
        if (!cancelled) {
          console.error(`Failed to load Star icon: ${assetPath}`, err)
          setLoading(false)
        }
      })
    
    return () => {
      cancelled = true
    }
  }, [assetPath])
  
  // Determine size styling
  const sizeStyle = typeof sizeValue === 'number' 
    ? { width: `${sizeValue}px`, height: `${sizeValue}px` }
    : { width: sizeValue, height: sizeValue }
  
  if (loading || !svgContent) {
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
      />
    )
  }
  
  // Extract viewBox from SVG content
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']*)["']/)
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : `0 0 ${closestSize} ${closestSize}`
  
  // Extract the inner content (everything between <svg> tags)
  const innerContentMatch = svgContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/i)
  const innerContent = innerContentMatch ? innerContentMatch[1] : ''
  
  if (!innerContent) {
    console.warn(`Failed to extract content from Star icon: ${assetPath}`)
    return null
  }
  
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color || undefined,
        ...sizeStyle,
      }}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ?? !ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        fill="currentColor"
        style={{ width: '100%', height: '100%' }}
        dangerouslySetInnerHTML={{ __html: innerContent }}
      />
    </span>
  )
}

/**
 * Static Info Circle Icon Component
 * 
 * Renders the Info Circle icon using pre-generated static SVG files.
 * No dynamic path calculations or stroke width adjustments are used.
 */
function StaticInfoCircleIcon({
  weight = 400,
  className = '',
  size,
  color,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
}: Omit<IconProps, 'name' | 'strokeWidth' | 'inset'>) {
  // Determine the size to use
  const sizeValue = size ?? 20 // Default to 20px if not specified
  const sizeNum = typeof sizeValue === 'number' ? sizeValue : 20
  
  // Round to nearest available size and weight
  const closestSize = getInfoCircleClosestSize(sizeNum)
  const closestWeight = getInfoCircleClosestWeight(weight)
  
  // Get the asset path
  const assetPath = getInfoCircleIconAssetPath(closestSize, closestWeight)
  
  // Load the SVG content dynamically
  const [svgContent, setSvgContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    let cancelled = false
    
    // Construct the path to the SVG asset
    // Files in public/ are served at the root, so /icons/info-circle/...
    const svgPath = `/icons/info-circle/${assetPath}`
    
    // Fetch the SVG content directly from the static asset
    fetch(svgPath)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`)
        return res.text()
      })
      .then((text) => {
        if (cancelled) return
        
        // Replace fill colors with currentColor for styling (but preserve fill="none" for the circle)
        let styledSvg = text
          .replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"')
          .replace(/stroke="[^"]*"/g, 'stroke="currentColor"')
        
        // Remove XML declaration and comments if present
        styledSvg = styledSvg.replace(/<\?xml[^>]*\?>/g, '')
        styledSvg = styledSvg.replace(/<!--[\s\S]*?-->/g, '')
        
        setSvgContent(styledSvg)
        setLoading(false)
      })
      .catch((err) => {
        if (!cancelled) {
          console.error(`Failed to load Info Circle icon: ${assetPath}`, err)
          setLoading(false)
        }
      })
    
    return () => {
      cancelled = true
    }
  }, [assetPath])
  
  // Determine size styling
  const sizeStyle = typeof sizeValue === 'number' 
    ? { width: `${sizeValue}px`, height: `${sizeValue}px` }
    : { width: sizeValue, height: sizeValue }
  
  if (loading || !svgContent) {
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
      />
    )
  }
  
  // Extract viewBox from SVG content
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']*)["']/)
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : `0 0 ${closestSize} ${closestSize}`
  
  // Extract the inner content (everything between <svg> tags)
  const innerContentMatch = svgContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/i)
  const innerContent = innerContentMatch ? innerContentMatch[1] : ''
  
  if (!innerContent) {
    console.warn(`Failed to extract content from Info Circle icon: ${assetPath}`)
    return null
  }
  
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color || undefined,
        ...sizeStyle,
      }}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ?? !ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        fill="currentColor"
        style={{ width: '100%', height: '100%' }}
        dangerouslySetInnerHTML={{ __html: innerContent }}
      />
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
