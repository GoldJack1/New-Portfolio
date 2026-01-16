import React, { ReactNode, CSSProperties } from 'react'

interface ButtonProps {
  children?: ReactNode
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
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
  size = 'md',
  fontWeight = 400,
  icon,
  iconOnly = false,
  iconPosition = 'left',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) => {
  // Icon sizes based on button size
  const iconSizes: Record<'sm' | 'md' | 'lg', string> = {
    sm: '16px',
    md: '18px',
    lg: '20px',
  }

  // Gap spacing between icon and text
  const iconTextGaps: Record<'sm' | 'md' | 'lg', string> = {
    sm: '10px',
    md: '12px',
    lg: '14px',
  }

  // Size-specific styles for text buttons
  const textSizeStyles: Record<'sm' | 'md' | 'lg', CSSProperties> = {
    sm: {
      padding: '8px 16px',
      minWidth: '100px',
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.01em',
    },
    md: {
      padding: '10px 24px',
      minWidth: '116px',
      fontSize: '18px',
      lineHeight: '28px',
      letterSpacing: '0',
    },
    lg: {
      padding: '12px 32px',
      minWidth: '132px',
      fontSize: '20px',
      lineHeight: '30px',
      letterSpacing: '0',
    },
  }

  // Size-specific styles for icon-only buttons
  const iconSizeStyles: Record<'sm' | 'md' | 'lg', CSSProperties> = {
    sm: {
      width: '40px',
      height: '40px',
      padding: '0',
      minWidth: '0',
    },
    md: {
      width: '48px',
      height: '48px',
      padding: '0',
      minWidth: '0',
    },
    lg: {
      width: '54px',
      height: '54px',
      padding: '0',
      minWidth: '0',
    },
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
    ? 'rounded-full text-text-primary focus:outline-none cursor-pointer transition-all duration-200 flex items-center'
    : 'rounded-full text-text-primary focus:outline-none cursor-pointer transition-all duration-200'
  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed'
    : ''

  const combinedStyle: CSSProperties = {
    ...(iconOnly ? iconSizeStyles[size] : textSizeStyles[size]),
    background: getBackgroundStyle(),
    ...(variant === 'primary' ? {
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
    } : {}),
    ...(iconOnly ? {} : { fontWeight, height: 'auto', width: 'auto' }),
    ...(hasTextAndIcon ? { gap: iconTextGaps[size] } : {}),
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
    const iconSize = iconSizes[size]
    
    return (
      <span
        style={{
          width: iconSize,
          height: iconSize,
          minWidth: iconSize,
          minHeight: iconSize,
          maxWidth: iconSize,
          maxHeight: iconSize,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: iconSize,
          lineHeight: 1,
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            width: iconSize,
            height: iconSize,
            minWidth: iconSize,
            minHeight: iconSize,
            maxWidth: iconSize,
            maxHeight: iconSize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: iconSize,
          }}
        >
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement<any>, {
                style: {
                  width: iconSize,
                  height: iconSize,
                  minWidth: iconSize,
                  minHeight: iconSize,
                  maxWidth: iconSize,
                  maxHeight: iconSize,
                  display: 'block',
                  flexShrink: 0,
                },
              })
            : icon}
        </span>
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
      const textElement = <span>{children}</span>
      
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
      onClick={onClick}
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
