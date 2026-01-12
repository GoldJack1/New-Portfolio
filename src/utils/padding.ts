/**
 * Universal Padding System
 * 
 * Centralized padding values for consistent spacing across the site.
 * All padding values are in rem units for better scalability.
 * 
 * Uses Tailwind's default breakpoints for mobile/tablet/desktop:
 * - Mobile: Base (< 640px)
 * - Tablet: sm: (≥ 640px)
 * - Desktop: lg: (≥ 1024px)
 * 
 * No custom breakpoints are used - only Tailwind defaults.
 */

export const PADDING = {
  // Horizontal padding
  // Mobile/Tablet (< 1024px): 1rem (16px) | Desktop lg: (≥ 1024px): 2rem (32px)
  horizontal: {
    mobile: '1rem',    // 16px - px-4 (mobile/tablet, < 1024px)
    desktop: '2rem',   // 32px - px-8 (desktop, lg: ≥ 1024px)
  },
  
  // Vertical padding
  vertical: {
    small: '1rem',     // 16px - py-4
    medium: '2rem',    // 32px - py-8
    large: '4rem',     // 64px - py-16
    xlarge: '6rem',    // 96px - py-24
  },
  
  // Page content padding
  // Mobile/Tablet (< 1024px): 1rem horizontal, 4rem vertical | Desktop lg: (≥ 1024px): 2rem horizontal, 6rem vertical
  page: {
    horizontal: {
      mobile: '1rem',  // px-4 (mobile/tablet, < 1024px)
      desktop: '2rem', // px-8 (desktop, lg: ≥ 1024px)
    },
    vertical: {
      mobile: '4rem',  // pb-16 (mobile/tablet, < 1024px)
      desktop: '6rem', // pb-24 (desktop, lg: ≥ 1024px)
    },
  },
  
  // Header padding
  // Mobile/Tablet (< 1024px): 1rem horizontal | Desktop lg: (≥ 1024px): 2rem horizontal
  header: {
    horizontal: {
      mobile: '1rem',  // px-4 (mobile/tablet, < 1024px)
      desktop: '2rem', // px-8 (desktop, lg: ≥ 1024px)
    },
    vertical: {
      mobile: '0.75rem', // py-3
      desktop: '1rem',    // py-4
    },
  },
  
  // Footer padding
  // Mobile/Tablet (< 1024px): 1rem horizontal | Desktop lg: (≥ 1024px): 2rem horizontal
  footer: {
    horizontal: {
      mobile: '1rem',  // px-4 (mobile/tablet, < 1024px)
      desktop: '2rem', // px-8 (desktop, lg: ≥ 1024px)
    },
    vertical: {
      top: '2rem',     // pt-8
      bottom: '2rem', // pb-8
    },
  },
} as const

/**
 * Get responsive horizontal padding classes
 * Uses Tailwind default lg: breakpoint (1024px) for desktop
 * @returns 'px-4 lg:px-8' - 16px mobile/tablet, 32px desktop (≥ 1024px)
 */
export const getHorizontalPadding = () => {
  return 'px-4 lg:px-8'
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
 * Uses Tailwind default lg: breakpoint (1024px) for desktop
 * @returns 'px-4 lg:px-8 pb-16 lg:pb-24' - 16px/64px mobile/tablet, 32px/96px desktop (≥ 1024px)
 */
export const getPagePadding = () => {
  return 'px-4 lg:px-8 pb-16 lg:pb-24'
}

/**
 * Get header padding classes
 * Uses Tailwind default lg: breakpoint (1024px) for desktop
 * @returns 'px-4 lg:px-8' - 16px mobile/tablet, 32px desktop (≥ 1024px)
 */
export const getHeaderPadding = () => {
  return 'px-4 lg:px-8'
}

/**
 * Get footer padding classes
 * Uses Tailwind default lg: breakpoint (1024px) for desktop
 * @returns 'px-4 lg:px-8' - 16px mobile/tablet, 32px desktop (≥ 1024px)
 */
export const getFooterPadding = () => {
  return 'px-4 lg:px-8'
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
