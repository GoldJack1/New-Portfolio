/**
 * Icon Stroke Width Configuration
 * 
 * IMPORTANT: These are initial values based on glyph measurements.
 * They represent the VISIBLE WIDTH of simple stem glyphs (l, I, i),
 * which is an approximation of stem width.
 * 
 * Use the visual calibration page to fine-tune these values.
 * 
 * Generated: 2026-01-20T11:49:01.275Z
 * Font: Geologica Thin
 * Units per Em: 2000
 */

export const strokeWidths: Record<number, number> = {
  100: 2.22, // Thin
  200: 2.78, // ExtraLight
  300: 3.35, // Light
  400: 3.91, // Regular
  500: 4.48, // Medium
  600: 5.05, // SemiBold
  700: 5.61, // Bold
  800: 6.18, // ExtraBold
  900: 6.74, // Black
};

/**
 * Get the stroke width for a given font weight
 */
export function getStrokeWidth(weight: number): number {
  weight = Math.max(100, Math.min(900, weight));
  
  if (strokeWidths[weight] !== undefined) {
    return strokeWidths[weight];
  }
  
  const sortedWeights = Object.keys(strokeWidths).map(Number).sort((a, b) => a - b);
  let lower = sortedWeights[0], upper = sortedWeights[sortedWeights.length - 1];
  
  for (const w of sortedWeights) {
    if (w <= weight) lower = w;
    if (w >= weight) { upper = w; break; }
  }
  
  if (lower === upper) return strokeWidths[lower];
  
  const t = (weight - lower) / (upper - lower);
  return strokeWidths[lower] + t * (strokeWidths[upper] - strokeWidths[lower]);
}

/**
 * Stroke widths as percentage of icon size
 */
export const strokePercentages: Record<number, number> = {
  100: 0.0693, // 6.93%
  200: 0.0870, // 8.70%
  300: 0.1047, // 10.47%
  400: 0.1223, // 12.23%
  500: 0.1400, // 14.00%
  600: 0.1577, // 15.77%
  700: 0.1753, // 17.53%
  800: 0.1930, // 19.30%
  900: 0.2107, // 21.07%
};
