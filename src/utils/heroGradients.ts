/**
 * Hero Gradient Templates
 * 
 * Default gradient template that transitions from one of the 4 page background colors at 100% opacity
 * to gray-1000 (black) at 100% opacity, angled at 135 degrees.
 */

export type PageBackgroundColor = 'home' | 'projects' | 'about' | 'contact'

const PAGE_BACKGROUND_COLORS = {
  home: '#FFE100',      // Red
  projects: '#00FF37',  // Green
  about: '#00CFFF',     // Blue
  contact: '#FF0000',   // Purple
} as const

/**
 * Creates a gradient template for hero backgrounds
 * @param pageColor - One of the 4 page background colors
 * @returns CSS gradient string with 135-degree angle
 */
export const createHeroGradient = (pageColor: PageBackgroundColor): string => {
  const endColor = PAGE_BACKGROUND_COLORS[pageColor]
  // page color at 100% opacity at 0%, gray-1000 (black) at 100% opacity at 100%, 135 degrees
  return `linear-gradient(135deg, ${endColor} 0%, rgba(0,0,0,80) 85%)`
}

/**
 * Pre-defined gradient templates for each page background color
 */
export const HERO_GRADIENTS = {
  home: createHeroGradient('home'),
  projects: createHeroGradient('projects'),
  about: createHeroGradient('about'),
  contact: createHeroGradient('contact'),
} as const
