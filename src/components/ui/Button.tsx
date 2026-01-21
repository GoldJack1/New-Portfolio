import React, { ReactNode, CSSProperties, useState } from 'react'

type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

interface ButtonProps {
  children?: ReactNode
  /** Button variant: 'primary' has glass background, 'ghost' is transparent with hover fill, 'weight' changes weight on hover */
  variant?: 'primary' | 'ghost' | 'weight'
  fontWeight?: FontWeight
  /** For 'weight' variant: the weight to use on hover (default: 900) */
  hoverWeight?: FontWeight
  icon?: ReactNode
  iconOnly?: boolean
  iconPosition?: 'left' | 'right'
  /** Gap between icon and text in pixels (default: 6) */
  iconGap?: number
  /** Width behavior: 'fixed' uses minWidth, 'hug' fits content */
  widthMode?: 'fixed' | 'hug'
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  /** For 'weight' variant with icons: callback to get hovered state for dynamic icon weight */
  onHoverChange?: (isHovered: boolean) => void
}

const Button = ({
  children,
  variant = 'primary',
  fontWeight = 400,
  hoverWeight = 900,
  icon,
  iconOnly = false,
  iconPosition = 'left',
  iconGap = 6,
  widthMode = 'fixed',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  onHoverChange,
}: ButtonProps) => {
  // Track hover state for weight variant
  const [isHovered, setIsHovered] = useState(false)
  
  // Handle click
  const handleClick = (_e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onClick?.()
    }
  }
  
  // Current font weight based on hover state (for weight variant)
  const currentFontWeight = variant === 'weight' && isHovered ? hoverWeight : fontWeight
  // Typography and icon sizing
  const fontSize = 18 // px
  const lineHeightRatio = 1 // unitless, means lineHeight = fontSize * 1 = 18px
  
  // Icon sized to match cap-height (~75% of em-size)
  // This follows Material/Apple HIG guidelines for optical balance
  // Cap-height icons appear balanced with text weight, not oversized
  const capHeightRatio = 0.725
  const iconSizePx = Math.round(fontSize * capHeightRatio) // 18 * 0.75 ≈ 14px
  
  // Optical offset to align icon with text's visual center
  // Positive = down, negative = up
  const iconOpticalOffset = -0.6

  // Styles for text buttons
  const textButtonStyles: CSSProperties = {
    padding: '0 16px',
    height: '42px',
    minWidth: widthMode === 'fixed' ? '116px' : 'auto',
    fontSize: `${fontSize}px`,
    lineHeight: lineHeightRatio,
    letterSpacing: '0',
  }

  // Styles for icon-only buttons
  const iconButtonStyles: CSSProperties = {
    width: '42px',
    height: '42px',
    padding: '0',
    minWidth: '0',
  }

  // Get background style based on variant
  const getBackgroundStyle = (): string => {
    if (variant === 'primary') {
      return 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), rgba(255,255,255,0.25)'
    } else {
      // ghost and weight variants have transparent background
      return 'transparent'
    }
  }

  // Get hover background style
  const getHoverBackgroundStyle = (): string => {
    if (variant === 'primary') {
      return 'rgba(0, 0, 0, 0.25)'
    } else if (variant === 'ghost') {
      return 'rgba(255, 255, 255, 0.25)'
    } else {
      // weight variant has no background change on hover
      return 'transparent'
    }
  }

  // Determine if we should render text + icon variant
  const hasTextAndIcon = !iconOnly && icon && children

  // All button variants use flexbox for consistent centering
  const baseStyles = 'rounded-full text-text-primary focus:outline-none cursor-pointer transition-all duration-200 flex items-center justify-center'
  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed'
    : ''

  const combinedStyle: CSSProperties = {
    ...(iconOnly ? iconButtonStyles : textButtonStyles),
    background: getBackgroundStyle(),
    ...(variant === 'primary' ? {
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
    } : {}),
    ...(iconOnly ? {} : { fontWeight: currentFontWeight, width: 'auto' }),
    ...(hasTextAndIcon ? { gap: `${iconGap}px` } : {}),
  }

  // Handle hover with inline style approach using onMouseEnter/onMouseLeave
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      setIsHovered(true)
      onHoverChange?.(true)
      
      e.currentTarget.style.background = getHoverBackgroundStyle()
      
      // Add backdrop blur on hover for ghost variant
      if (variant === 'ghost') {
        e.currentTarget.style.backdropFilter = 'blur(18px)'
        ;(e.currentTarget.style as any).webkitBackdropFilter = 'blur(18px)'
      }
      
      // Update font weight for weight variant
      if (variant === 'weight' && !iconOnly) {
        e.currentTarget.style.fontWeight = String(hoverWeight)
      }
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      setIsHovered(false)
      onHoverChange?.(false)
      
      e.currentTarget.style.background = getBackgroundStyle()
      
      // Remove backdrop blur on mouse leave for ghost variant
      if (variant === 'ghost') {
        e.currentTarget.style.backdropFilter = 'none'
        ;(e.currentTarget.style as any).webkitBackdropFilter = 'none'
      }
      
      // Reset font weight for weight variant
      if (variant === 'weight' && !iconOnly) {
        e.currentTarget.style.fontWeight = String(fontWeight)
      }
    }
  }

  // Render icon with proper sizing and optical alignment
  const renderIcon = () => {
    if (!icon) return null
    
    const iconSize = `${iconSizePx}px`
    
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          width: iconSize,
          height: iconSize,
          lineHeight: 0,
          // Apply optical offset only when icon is paired with text
          // This shifts the icon down to align with text's visual center
          ...(hasTextAndIcon ? {
            position: 'relative',
            top: `${iconOpticalOffset}px`,
          } : {}),
        }}
      >
        {React.isValidElement(icon)
          ? React.cloneElement(icon as React.ReactElement<any>, {
              style: {
                width: iconSize,
                height: iconSize,
                display: 'block',
                flexShrink: 0,
              },
            })
          : icon}
      </span>
    )
  }

  // Render button content based on mode
  const renderContent = () => {
    if (iconOnly) {
      return renderIcon()
    }
    
    if (hasTextAndIcon) {
      const iconElement = renderIcon()
      const textElement = <span style={{ display: 'inline-block', lineHeight: 'inherit' }}>{children}</span>
      
      return iconPosition === 'left' ? (
        <>
          {iconElement}
          {textElement}
        </>
      ) : (
        <>
          {textElement}
          {iconElement}
        </>
      )
    }
    
    return children
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${baseStyles} ${disabledStyles} ${className}`.trim()}
      style={combinedStyle}
    >
      {renderContent()}
    </button>
  )
}

export default Button
