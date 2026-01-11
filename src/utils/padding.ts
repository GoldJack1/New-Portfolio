/**
 * Universal Padding System
 * 
 * Centralized padding values for consistent spacing across the site.
 * All padding values are in rem units for better scalability.
 */

export const PADDING = {
  // Horizontal padding
  horizontal: {
    mobile: '1rem',    // 16px - px-4
    desktop: '2rem',   // 32px - px-8
  },
  
  // Vertical padding
  vertical: {
    small: '1rem',     // 16px - py-4
    medium: '2rem',    // 32px - py-8
    large: '4rem',     // 64px - py-16
    xlarge: '6rem',    // 96px - py-24
  },
  
  // Page content padding
  page: {
    horizontal: {
      mobile: '1rem',  // px-4
      desktop: '2rem', // px-8
    },
    vertical: {
      mobile: '4rem',  // pb-16
      desktop: '6rem', // pb-24
    },
  },
  
  // Header padding
  header: {
    horizontal: {
      mobile: '1rem',  // px-4
      desktop: '2rem', // px-8
    },
    vertical: {
      mobile: '0.75rem', // py-3
      desktop: '1rem',    // py-4
    },
  },
  
  // Footer padding
  footer: {
    horizontal: {
      mobile: '1rem',  // px-4
      desktop: '2rem', // px-8
    },
    vertical: {
      top: '2rem',     // pt-8
      bottom: '2rem', // pb-8
    },
  },
} as const

/**
 * Get responsive horizontal padding classes
 */
export const getHorizontalPadding = () => {
  return 'px-4 md:px-8'
}

/**
 * Get responsive vertical padding classes
 */
export const getVerticalPadding = (size: 'small' | 'medium' | 'large' | 'xlarge' = 'large') => {
  const classes = {
    small: 'py-4',
    medium: 'py-8',
    large: 'py-16',
    xlarge: 'py-24',
  }
  return classes[size]
}

/**
 * Get responsive page content padding classes
 */
export const getPagePadding = () => {
  return 'px-4 md:px-8 pb-16 md:pb-24'
}

/**
 * Get header padding classes
 */
export const getHeaderPadding = () => {
  return 'px-4 md:px-8'
}

/**
 * Get footer padding classes
 */
export const getFooterPadding = () => {
  return 'px-4 md:px-8'
}

/**
 * Get padding style object for inline styles (useful for safe area handling)
 */
export const getPaddingStyle = (
  type: 'page' | 'header' | 'footer',
  direction: 'horizontal' | 'vertical' = 'horizontal'
) => {
  const base = PADDING[type === 'page' ? 'page' : type]
  
  if (direction === 'horizontal') {
    return {
      paddingLeft: `max(${base.horizontal.mobile}, calc(${base.horizontal.mobile} + env(safe-area-inset-left, 0px)))`,
      paddingRight: `max(${base.horizontal.mobile}, calc(${base.horizontal.mobile} + env(safe-area-inset-right, 0px)))`,
    }
  }
  
  return {}
}
