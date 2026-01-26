/**
 * Star Icon Helper Functions
 * 
 * Handles static SVG file selection for the Star icon.
 * The Star icon uses pre-generated static SVG files for sizes 8-128px
 * and weights 100-900, with no dynamic path calculations.
 */

/**
 * Available sizes for Star icon (8-128px)
 */
const MIN_SIZE = 8
const MAX_SIZE = 128

/**
 * Available weights for Star icon
 */
const AVAILABLE_WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const

/**
 * Round size to nearest available size (8-128)
 * Clamps to valid range
 */
export function getClosestSize(requestedSize: number): number {
  // Clamp to valid range
  const clamped = Math.max(MIN_SIZE, Math.min(MAX_SIZE, Math.round(requestedSize)))
  return clamped
}

/**
 * Round weight to nearest available weight (100, 200, ..., 900)
 * Clamps to valid range
 */
export function getClosestWeight(requestedWeight: number): number {
  // Clamp to valid range
  const clamped = Math.max(100, Math.min(900, requestedWeight))
  
  // Round to nearest 100
  const rounded = Math.round(clamped / 100) * 100
  
  // Ensure it's one of the available weights
  return Math.max(100, Math.min(900, rounded)) as typeof AVAILABLE_WEIGHTS[number]
}

/**
 * Get the path to a Star icon SVG file
 * 
 * @param size - Icon size in pixels (will be rounded to nearest available)
 * @param weight - Font weight (will be rounded to nearest available)
 * @returns Path relative to src/assets/icons/star/
 */
export function getStarIconPath(size: number, weight: number): string {
  const closestSize = getClosestSize(size)
  const closestWeight = getClosestWeight(weight)
  
  return `${closestSize}x${closestSize}/Star_${closestWeight}_${closestSize}x${closestSize}.svg`
}

/**
 * Get the relative path from src/assets/icons/star/ for a Star icon
 * This path can be used with Vite's dynamic import or as a static asset reference
 * 
 * @param size - Icon size in pixels
 * @param weight - Font weight
 * @returns Relative path (e.g., "20x20/Star_400_20x20.svg")
 */
export function getStarIconAssetPath(size: number, weight: number): string {
  return getStarIconPath(size, weight)
}
