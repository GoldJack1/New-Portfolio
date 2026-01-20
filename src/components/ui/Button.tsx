import React, { ReactNode, CSSProperties } from 'react'

interface ButtonProps {
  children?: ReactNode
  variant?: 'primary' | 'ghost'
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  icon?: ReactNode
  iconOnly?: boolean
  iconPosition?: 'left' | 'right'
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

const Button = ({
  children,
  variant = 'primary',
  fontWeight = 400,
  icon,
  iconOnly = false,
  iconPosition = 'left',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) => {
  // Handle click
  const handleClick = (_e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onClick?.()
    }
  }
  // Icon size (slightly smaller than font size for better visual alignment)
  const iconSize = '16px'

  // Gap spacing between icon and text
  const iconTextGap = '10px'

  // Styles for text buttons
  const textButtonStyles: CSSProperties = {
    padding: '0 16px',
    height: '42px',
    minWidth: '116px',
    fontSize: '18px',
    lineHeight: '28px',
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
      return 'transparent'
    }
  }

  // Get hover background style
  const getHoverBackgroundStyle = (): string => {
    if (variant === 'primary') {
      return 'rgba(0, 0, 0, 0.25)'
    } else {
      return 'rgba(255, 255, 255, 0.25)'
    }
  }

  // Determine if we should render text + icon variant
  const hasTextAndIcon = !iconOnly && icon && children

  const baseStyles = iconOnly
    ? 'rounded-full text-text-primary focus:outline-none cursor-pointer transition-all duration-200 flex items-center justify-center'
    : hasTextAndIcon
    ? 'rounded-full text-text-primary focus:outline-none cursor-pointer transition-all duration-200 flex items-center justify-center'
    : 'rounded-full text-text-primary focus:outline-none cursor-pointer transition-all duration-200'
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
    ...(iconOnly ? {} : { fontWeight, width: 'auto' }),
    ...(hasTextAndIcon ? { gap: iconTextGap } : {}),
  }

  // Handle hover with inline style approach using onMouseEnter/onMouseLeave
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      e.currentTarget.style.background = getHoverBackgroundStyle()
      // Add backdrop blur on hover for ghost variant
      if (variant === 'ghost') {
        e.currentTarget.style.backdropFilter = 'blur(18px)'
        ;(e.currentTarget.style as any).webkitBackdropFilter = 'blur(18px)'
      }
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      e.currentTarget.style.background = getBackgroundStyle()
      // Remove backdrop blur on mouse leave for ghost variant
      if (variant === 'ghost') {
        e.currentTarget.style.backdropFilter = 'none'
        ;(e.currentTarget.style as any).webkitBackdropFilter = 'none'
      }
    }
  }

  // Render icon with proper sizing and frame
  const renderIcon = () => {
    if (!icon) return null
    
    // Icon frame height matches text line-height (28px) for buttons with text and icon
    const iconFrameHeight = hasTextAndIcon ? textButtonStyles.lineHeight : iconSize
    
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          width: iconSize,
          height: iconFrameHeight,
          lineHeight: 0,
          alignSelf: 'center',
          ...(hasTextAndIcon ? {
            marginTop: '5px',
            marginBottom: '5px',
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
