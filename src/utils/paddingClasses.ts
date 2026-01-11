/**
 * Padding Class Utilities
 * 
 * Pre-defined Tailwind class combinations for common padding patterns.
 * Use these constants to ensure consistent padding across components.
 */

export const PADDING_CLASSES = {
  // Horizontal padding (responsive)
  horizontal: 'px-4 md:px-8',
  
  // Vertical padding
  vertical: {
    small: 'py-4',
    medium: 'py-8',
    large: 'py-16',
    xlarge: 'py-24',
  },
  
  // Bottom padding (responsive)
  bottom: {
    small: 'pb-4',
    medium: 'pb-8',
    large: 'pb-16',
    xlarge: 'pb-24',
  },
  
  // Top padding (responsive)
  top: {
    small: 'pt-4',
    medium: 'pt-8',
    large: 'pt-16',
    xlarge: 'pt-24',
  },
  
  // Page content padding
  page: {
    horizontal: 'px-4 md:px-8',
    vertical: 'pb-16 md:pb-24',
    full: 'px-4 md:px-8 pb-16 md:pb-24',
  },
  
  // Header padding
  header: {
    horizontal: 'px-4 md:px-8',
    container: 'px-4 md:px-8',
  },
  
  // Footer padding
  footer: {
    horizontal: 'px-4 md:px-8',
    container: 'px-4 md:px-8',
  },
  
  // Section padding
  section: {
    horizontal: 'px-4 md:px-8',
    vertical: 'py-16 md:py-24',
    full: 'px-4 md:px-8 py-16 md:py-24',
  },
} as const
