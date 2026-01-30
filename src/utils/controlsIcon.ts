/**
 * Controls Icon Helper Functions
 *
 * Handles static SVG file selection for the Controls icon.
 * The Controls icon uses pre-generated static SVG files for sizes 8-128px
 * and weights 100-900, with no dynamic path calculations.
 */

/**
 * Available sizes for Controls icon (8-128px)
 */
const MIN_SIZE = 8
const MAX_SIZE = 128

/**
 * Available weights for Controls icon
 */
const AVAILABLE_WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const

/**
 * Round size to nearest available size (8-128)
 * Clamps to valid range
 */
export function getClosestSize(requestedSize: number): number {
  const clamped = Math.max(MIN_SIZE, Math.min(MAX_SIZE, Math.round(requestedSize)))
  return clamped
}

/**
 * Round weight to nearest available weight (100, 200, ..., 900)
 * Clamps to valid range
 */
export function getClosestWeight(requestedWeight: number): number {
  const clamped = Math.max(100, Math.min(900, requestedWeight))
  const rounded = Math.round(clamped / 100) * 100
  return Math.max(100, Math.min(900, rounded)) as (typeof AVAILABLE_WEIGHTS)[number]
}

/**
 * Get the path to a Controls icon SVG file
 *
 * @param size - Icon size in pixels (will be rounded to nearest available)
 * @param weight - Font weight (will be rounded to nearest available)
 * @returns Path relative to public/icons/controls/
 */
export function getControlsIconPath(size: number, weight: number): string {
  const closestSize = getClosestSize(size)
  const closestWeight = getClosestWeight(weight)
  return `${closestSize}x${closestSize}/Controls_${closestWeight}_${closestSize}x${closestSize}.svg`
}

/**
 * Get the relative path from public/icons/controls/ for a Controls icon
 *
 * @param size - Icon size in pixels
 * @param weight - Font weight
 * @returns Relative path (e.g., "20x20/Controls_400_20x20.svg")
 */
export function getControlsIconAssetPath(size: number, weight: number): string {
  return getControlsIconPath(size, weight)
}
