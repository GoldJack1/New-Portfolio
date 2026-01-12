/**
 * Padding Class Utilities
 * 
 * Pre-defined Tailwind class combinations for common padding patterns.
 * Use these constants to ensure consistent padding across components.
 * 
 * All responsive padding uses Tailwind's default breakpoints for mobile/tablet/desktop:
 * - Mobile: Base (< 640px)
 * - Tablet: sm: (≥ 640px)
 * - Desktop: lg: (≥ 1024px)
 * 
 * No custom breakpoints are used - only Tailwind defaults.
 */

export const PADDING_CLASSES = {
  // Horizontal padding (responsive)
  // Mobile/Tablet (< 1024px): px-4 (16px) | Desktop lg: (≥ 1024px): px-8 (32px)
  horizontal: 'px-4 lg:px-8',
  
  // Vertical padding (fixed, not responsive)
  vertical: {
    small: 'py-4',    // 16px
    medium: 'py-8',   // 32px
    large: 'py-16',   // 64px
    xlarge: 'py-24',  // 96px
  },
  
  // Bottom padding (fixed, not responsive)
  bottom: {
    small: 'pb-4',    // 16px
    medium: 'pb-8',   // 32px
    large: 'pb-16',   // 64px
    xlarge: 'pb-24',  // 96px
  },
  
  // Top padding (fixed, not responsive)
  top: {
    small: 'pt-4',    // 16px
    medium: 'pt-8',   // 32px
    large: 'pt-16',   // 64px
    xlarge: 'pt-24',  // 96px
  },
  
  // Page content padding (responsive)
  // Mobile/Tablet (< 1024px): px-4 pb-16 | Desktop lg: (≥ 1024px): px-8 pb-24
  page: {
    horizontal: 'px-4 lg:px-8',      // 16px mobile/tablet, 32px desktop
    vertical: 'pb-16 lg:pb-24',       // 64px mobile/tablet, 96px desktop
    full: 'px-4 lg:px-8 pb-16 lg:pb-24',
  },
  
  // Header padding (responsive)
  // Mobile/Tablet (< 1024px): px-4 | Desktop lg: (≥ 1024px): px-8
  header: {
    horizontal: 'px-4 lg:px-8',      // 16px mobile/tablet, 32px desktop
    container: 'px-4 lg:px-8',        // 16px mobile/tablet, 32px desktop
  },
  
  // Footer padding (responsive)
  // Mobile/Tablet (< 1024px): px-4 | Desktop lg: (≥ 1024px): px-8
  footer: {
    horizontal: 'px-4 lg:px-8',      // 16px mobile/tablet, 32px desktop
    container: 'px-4 lg:px-8',       // 16px mobile/tablet, 32px desktop
  },
  
  // Section padding (responsive)
  // Mobile/Tablet (< 1024px): px-4 py-16 | Desktop lg: (≥ 1024px): px-8 py-24
  section: {
    horizontal: 'px-4 lg:px-8',      // 16px mobile/tablet, 32px desktop
    vertical: 'py-16 lg:py-24',       // 64px mobile/tablet, 96px desktop
    full: 'px-4 lg:px-8 py-16 lg:py-24',
  },
} as const
