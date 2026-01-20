import { useState, useCallback } from 'react'
import { strokeWidths as extractedStrokeWidths } from '../../config/iconWeights'

// Weight names for display
const weightNames: Record<number, string> = {
  100: 'Thin',
  200: 'ExtraLight', 
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'SemiBold',
  700: 'Bold',
  800: 'ExtraBold',
  900: 'Black'
}

// All weights to calibrate
const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900]

// Sample text for comparison
const sampleText = 'Hamburger'

// SVG paths for test icons (simple shapes work best for calibration)
// All icons use consistent bounds: 6-26 (20 units wide/tall, centered in 32x32)
const iconPaths = {
  cross: 'M6,6 L26,26 M26,6 L6,26',      // X from corner to corner
  plus: 'M16,6 L16,26 M6,16 L26,16',     // + centered
  minus: 'M6,16 L26,16',                  // - centered horizontally
}

interface IconPreviewProps {
  path: string
  strokeWidth: number
  size: number
}

const IconPreview = ({ path, strokeWidth, size }: IconPreviewProps) => (
  <svg 
    viewBox="0 0 32 32" 
    width={size} 
    height={size}
    className="inline-block align-middle flex-shrink-0"
    style={{ 
      verticalAlign: 'middle',
      // Slight upward adjustment to optically center with text baseline
      marginTop: '-0.1em'
    }}
  >
    <path
      d={path}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

interface WeightRowProps {
  weight: number
  strokeWidth: number
  onStrokeChange: (weight: number, value: number) => void
  fontSize: number
}

const WeightRow = ({ weight, strokeWidth, onStrokeChange, fontSize }: WeightRowProps) => {
  // Icon size matches font size exactly (1em)
  const iconSize = fontSize
  
  return (
    <div className="flex items-center gap-6 py-4 border-b border-gray-700">
      {/* Weight label */}
      <div className="w-32 flex-shrink-0">
        <span className="text-sm text-text-secondary">{weight}</span>
        <span className="text-xs text-text-tertiary ml-2">{weightNames[weight]}</span>
      </div>
      
      {/* Sample text at this weight */}
      <div 
        className="w-48 flex-shrink-0 text-text-primary flex items-center"
        style={{ 
          fontWeight: weight,
          fontSize: `${fontSize}px`,
          lineHeight: 1
        }}
      >
        {sampleText}
      </div>
      
      {/* Icons with current stroke width - same size as text */}
      <div 
        className="flex items-center justify-center gap-3 w-32 flex-shrink-0 text-text-primary"
        style={{ fontSize: `${fontSize}px`, lineHeight: 1 }}
      >
        <IconPreview path={iconPaths.plus} strokeWidth={strokeWidth} size={iconSize} />
        <IconPreview path={iconPaths.cross} strokeWidth={strokeWidth} size={iconSize} />
        <IconPreview path={iconPaths.minus} strokeWidth={strokeWidth} size={iconSize} />
      </div>
      
      {/* Stroke width slider */}
      <div className="flex-1 flex items-center gap-4">
        <input
          type="range"
          min="0.1"
          max="8"
          step="0.05"
          value={strokeWidth}
          onChange={(e) => onStrokeChange(weight, parseFloat(e.target.value))}
          className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <input
          type="number"
          min="0.1"
          max="8"
          step="0.05"
          value={strokeWidth.toFixed(2)}
          onChange={(e) => onStrokeChange(weight, parseFloat(e.target.value) || 0.1)}
          className="w-20 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-text-primary text-sm text-center"
        />
      </div>
    </div>
  )
}

const IconCalibration = () => {
  // Initialize stroke widths from extracted values or defaults
  const [strokeWidthValues, setStrokeWidthValues] = useState<Record<number, number>>(() => {
    const initial: Record<number, number> = {}
    for (const weight of weights) {
      initial[weight] = extractedStrokeWidths[weight] || 2
    }
    return initial
  })
  
  const [fontSize, setFontSize] = useState(24)
  const [copied, setCopied] = useState(false)
  
  const handleStrokeChange = useCallback((weight: number, value: number) => {
    setStrokeWidthValues(prev => ({
      ...prev,
      [weight]: Math.max(0.1, Math.min(8, value))
    }))
  }, [])
  
  const resetToExtracted = useCallback(() => {
    const reset: Record<number, number> = {}
    for (const weight of weights) {
      reset[weight] = extractedStrokeWidths[weight] || 2
    }
    setStrokeWidthValues(reset)
  }, [])
  
  const resetToLinear = useCallback(() => {
    // Simple linear scale: 0.5px at 100, 3px at 900
    const reset: Record<number, number> = {}
    for (const weight of weights) {
      reset[weight] = 0.5 + ((weight - 100) / 800) * 2.5
    }
    setStrokeWidthValues(reset)
  }, [])
  
  const exportValues = useCallback(() => {
    const tsCode = `export const strokeWidths: Record<number, number> = {
${weights.map(w => `  ${w}: ${strokeWidthValues[w].toFixed(2)}, // ${weightNames[w]}`).join('\n')}
};

// As percentages for dynamic calculation (divide by 32 for 32px viewBox)
export const strokePercentages: Record<number, number> = {
${weights.map(w => `  ${w}: ${(strokeWidthValues[w] / 32).toFixed(5)}, // ${(strokeWidthValues[w] / 32 * 100).toFixed(2)}%`).join('\n')}
};`
    
    navigator.clipboard.writeText(tsCode).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [strokeWidthValues])
  
  const exportJSON = useCallback(() => {
    const json = JSON.stringify({
      strokeWidths: strokeWidthValues,
      strokePercentages: Object.fromEntries(
        weights.map(w => [w, strokeWidthValues[w] / 32])
      ),
      calibratedAt: new Date().toISOString()
    }, null, 2)
    
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [strokeWidthValues])

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Icon Stroke Calibration</h1>
        <p className="text-text-secondary mb-8">
          Adjust the stroke width for each font weight until the icons visually match the text thickness.
        </p>
        
        {/* Controls */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex flex-wrap items-center gap-6">
            {/* Font size control */}
            <div className="flex items-center gap-3">
              <label className="text-sm text-text-secondary">Font Size:</label>
              <input
                type="range"
                min="12"
                max="48"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-32 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className="text-text-primary w-12">{fontSize}px</span>
            </div>
            
            {/* Reset buttons */}
            <div className="flex gap-3">
              <button
                onClick={resetToExtracted}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-text-primary text-sm rounded-lg transition-colors"
              >
                Reset to Extracted
              </button>
              <button
                onClick={resetToLinear}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-text-primary text-sm rounded-lg transition-colors"
              >
                Reset to Linear
              </button>
            </div>
            
            {/* Export buttons */}
            <div className="flex gap-3 ml-auto">
              <button
                onClick={exportValues}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors"
              >
                {copied ? 'Copied!' : 'Export TypeScript'}
              </button>
              <button
                onClick={exportJSON}
                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm rounded-lg transition-colors"
              >
                Export JSON
              </button>
            </div>
          </div>
        </div>
        
        {/* Calibration rows */}
        <div className="bg-gray-800 rounded-xl p-6">
          {/* Header */}
          <div className="flex items-center gap-6 pb-4 border-b border-gray-600 text-xs text-text-tertiary uppercase tracking-wider">
            <div className="w-32 flex-shrink-0">Weight</div>
            <div className="w-48 flex-shrink-0">Sample Text</div>
            <div className="w-32 flex-shrink-0">Icons</div>
            <div className="flex-1">Stroke Width (px in 32x32 viewBox)</div>
          </div>
          
          {/* Weight rows */}
          {weights.map(weight => (
            <WeightRow
              key={weight}
              weight={weight}
              strokeWidth={strokeWidthValues[weight]}
              onStrokeChange={handleStrokeChange}
              fontSize={fontSize}
            />
          ))}
        </div>
        
        {/* Side-by-side comparison */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Side-by-Side Comparison</h2>
          <p className="text-text-secondary text-sm mb-6">
            Text and icons rendered together to verify visual matching.
          </p>
          
          <div className="space-y-4">
            {weights.map(weight => {
              // Icon size matches font size exactly (1em)
              const iconSize = fontSize
              return (
                <div 
                  key={weight}
                  className="flex items-center gap-2 text-text-primary"
                  style={{ fontWeight: weight, fontSize: `${fontSize}px`, lineHeight: 1.2 }}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <IconPreview 
                      path={iconPaths.plus} 
                      strokeWidth={strokeWidthValues[weight]} 
                      size={iconSize} 
                    />
                    <span>Add Item</span>
                  </span>
                  <span className="mx-4 text-text-tertiary">|</span>
                  <span className="inline-flex items-center gap-1.5">
                    <IconPreview 
                      path={iconPaths.cross} 
                      strokeWidth={strokeWidthValues[weight]} 
                      size={iconSize} 
                    />
                    <span>Close</span>
                  </span>
                  <span className="mx-4 text-text-tertiary">|</span>
                  <span className="inline-flex items-center gap-1.5">
                    <IconPreview 
                      path={iconPaths.minus} 
                      strokeWidth={strokeWidthValues[weight]} 
                      size={iconSize} 
                    />
                    <span>Remove</span>
                  </span>
                  <span className="ml-auto text-xs text-text-tertiary">
                    {weight} ({weightNames[weight]})
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Current values summary */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Current Values</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {weights.map(weight => (
              <div key={weight} className="text-center">
                <div className="text-2xl font-bold text-text-primary" style={{ fontWeight: weight }}>
                  {strokeWidthValues[weight].toFixed(2)}
                </div>
                <div className="text-xs text-text-tertiary">{weight}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Instructions */}
        <div className="mt-8 bg-gray-800/50 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-3">How to Calibrate</h2>
          <ol className="list-decimal list-inside space-y-2 text-text-secondary text-sm">
            <li>Look at the sample text at each weight (e.g., "Hamburger")</li>
            <li>Compare the text stroke thickness to the icon stroke thickness</li>
            <li>Adjust the slider until the icon strokes <em>visually match</em> the text strokes</li>
            <li>Test at different font sizes to ensure consistency</li>
            <li>When satisfied, click "Export TypeScript" to copy the values</li>
            <li>Paste into <code className="bg-gray-700 px-1 rounded">src/config/iconWeights.ts</code></li>
          </ol>
          
          <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-700/50 rounded-lg">
            <p className="text-yellow-200 text-sm">
              <strong>Tip:</strong> The extracted values from font analysis may need adjustment. 
              Visual matching is more important than mathematical precision because fonts use 
              optical corrections that pure measurements don't capture.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IconCalibration
