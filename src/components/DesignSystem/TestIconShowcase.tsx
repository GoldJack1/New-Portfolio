import { useState } from 'react'
import { Icon, type StrokeIconName, type IconWeight } from '../ui/Icon'
import { strokeWidths } from '../../config/iconWeights'

const weightNames: Record<number, string> = {
  100: 'Thin',
  200: 'ExtraLight',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'SemiBold',
  700: 'Bold',
  800: 'ExtraBold',
  900: 'Black',
}

const weights: IconWeight[] = [100, 200, 300, 400, 500, 600, 700, 800, 900]

const sizes = [
  { px: 16, label: '16px', description: 'Small / Button icon' },
  { px: 20, label: '20px', description: 'Default' },
  { px: 24, label: '24px', description: 'Medium' },
  { px: 32, label: '32px', description: 'Large' },
]

// All sizes for the reference table (10-128)
const referenceSizes = [10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128]

/**
 * Calculate stroke width for a given weight and icon size
 * Since the SVG viewBox is 32x32, we scale the stroke proportionally
 */
function calculateStrokeForSize(weight: number, iconSize: number): number {
  const baseStroke = strokeWidths[weight] || strokeWidths[400]
  // strokeWidths are calibrated for 32x32 viewBox
  // Scale proportionally to the icon size
  return (baseStroke / 32) * iconSize
}

// Available stroke icons
const strokeIcons: StrokeIconName[] = ['cross', 'plus']

const TestIconShowcase = () => {
  // Calculator state
  const [calcWeights, setCalcWeights] = useState<number[]>([400])
  const [calcSize, setCalcSize] = useState<number>(24)
  
  const toggleWeight = (weight: number) => {
    setCalcWeights(prev => {
      if (prev.includes(weight)) {
        // Don't allow removing the last weight
        if (prev.length === 1) return prev
        return prev.filter(w => w !== weight)
      } else {
        return [...prev, weight].sort((a, b) => a - b)
      }
    })
  }
  
  const selectAllWeights = () => {
    setCalcWeights([...weights])
  }
  
  const selectSingleWeight = (weight: number) => {
    setCalcWeights([weight])
  }
  
  return (
    <section className="mb-16 w-full overflow-x-hidden">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-6 break-words">
        Stroke Icons with Variable Weight
      </h2>
      
      {/* Introduction */}
      <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
        <p className="text-text-secondary mb-4">
          These icons use stroke-based SVG paths with stroke widths calibrated to match 
          Geologica font weights (100-900). The stroke scales proportionally with the icon size.
        </p>
        <p className="text-text-tertiary text-sm">
          Usage: <code className="bg-gray-700 px-2 py-1 rounded">{'<Icon name="cross" weight={400} className="w-5 h-5" />'}</code>
        </p>
      </div>
      
      {/* Weight comparison */}
      <div className="space-y-8 bg-gray-900 p-6 sm:p-8 rounded-2xl w-full min-w-0 mb-8">
        <h3 className="text-xl font-bold text-text-primary">Weight Comparison</h3>
        <p className="text-text-secondary text-sm -mt-4 mb-4">
          Each row shows icons at a specific weight, matching the corresponding font weight.
        </p>
        
        {weights.map((weight) => (
          <div key={weight} className="border-b border-gray-700 pb-6 last:border-0 last:pb-0">
            <div className="flex items-center gap-4 mb-4">
              <span 
                className="text-text-primary min-w-[120px]"
                style={{ fontWeight: weight }}
              >
                {weight} {weightNames[weight]}
              </span>
              <span className="text-xs text-text-tertiary">
                stroke: {strokeWidths[weight]?.toFixed(2)}px
              </span>
            </div>
            
            <div className="flex items-center gap-8">
              {strokeIcons.map((iconName) => (
                <div
                  key={iconName}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 flex items-center justify-center text-text-primary">
                    <Icon name={iconName} weight={weight} className="w-full h-full" />
                  </div>
                  <span className="text-xs text-text-tertiary">{iconName}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Size comparison */}
      <div className="space-y-8 bg-gray-900 p-6 sm:p-8 rounded-2xl w-full min-w-0 mb-8">
        <h3 className="text-xl font-bold text-text-primary">Size Comparison</h3>
        <p className="text-text-secondary text-sm -mt-4 mb-4">
          Icons at different sizes with weight 400. Stroke scales proportionally.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-text-tertiary text-xs uppercase tracking-wider">
                <th className="pb-4 pr-8">Icon</th>
                {sizes.map((size) => (
                  <th key={size.px} className="pb-4 px-4 text-center">
                    {size.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {strokeIcons.map((iconName) => (
                <tr key={iconName} className="border-t border-gray-700">
                  <td className="py-4 pr-8 text-text-secondary text-sm">{iconName}</td>
                  {sizes.map((size) => (
                    <td key={size.px} className="py-4 px-4">
                      <div 
                        className="flex items-center justify-center text-text-primary"
                        style={{ width: size.px, height: size.px, margin: '0 auto' }}
                      >
                        <Icon 
                          name={iconName} 
                          weight={400} 
                          className="w-full h-full"
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Icon catalog */}
      <div className="space-y-8 bg-gray-900 p-6 sm:p-8 rounded-2xl w-full min-w-0 mb-8">
        <h3 className="text-xl font-bold text-text-primary">Available Icons</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {strokeIcons.map((iconName) => (
            <div
              key={iconName}
              className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors"
            >
              <div className="w-8 h-8 flex items-center justify-center mb-2 text-text-primary">
                <Icon name={iconName} weight={400} className="w-full h-full" />
              </div>
              <span className="text-xs text-text-secondary text-center break-words">
                {iconName}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Inline with text examples */}
      <div className="space-y-8 bg-gray-900 p-6 sm:p-8 rounded-2xl w-full min-w-0 mb-8">
        <h3 className="text-xl font-bold text-text-primary">Inline with Text</h3>
        <p className="text-text-secondary text-sm -mt-4 mb-4">
          Icons displayed inline with text at matching weights.
        </p>
        
        <div className="space-y-4">
          {[100, 300, 400, 500, 700, 900].map((weight) => (
            <div 
              key={weight}
              className="flex items-center gap-2 text-text-primary"
              style={{ fontWeight: weight, fontSize: '18px' }}
            >
              <span className="inline-flex items-center gap-1.5">
                <Icon name="plus" weight={weight as IconWeight} size={18} />
                <span>Add Item</span>
              </span>
              <span className="mx-4 text-text-tertiary">|</span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="cross" weight={weight as IconWeight} size={18} />
                <span>Close</span>
              </span>
              <span className="ml-auto text-xs text-text-tertiary">
                {weight} ({weightNames[weight]})
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Stroke Width Reference Table */}
      <div className="space-y-8 bg-gray-900 p-6 sm:p-8 rounded-2xl w-full min-w-0">
        <h3 className="text-xl font-bold text-text-primary">Stroke Width Reference</h3>
        <p className="text-text-secondary text-sm -mt-4 mb-4">
          Calculated stroke width (in pixels) for each weight at different icon sizes.
          Base values are calibrated for a 32x32 viewBox and scale proportionally.
        </p>
        
        {/* Base values for 32px */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-text-secondary mb-3">Base Stroke Widths (32x32 viewBox)</h4>
          <div className="flex flex-wrap gap-3">
            {weights.map((weight) => (
              <div key={weight} className="bg-gray-800 px-3 py-2 rounded-lg text-center">
                <div className="text-xs text-text-tertiary">{weight}</div>
                <div className="text-sm text-text-primary font-mono">{strokeWidths[weight]?.toFixed(2)}px</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Full reference table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-text-tertiary text-xs uppercase tracking-wider">
                <th className="pb-3 pr-4 sticky left-0 bg-gray-900">Size</th>
                {weights.map((weight) => (
                  <th key={weight} className="pb-3 px-2 text-center whitespace-nowrap">
                    {weight}
                    <div className="text-[10px] font-normal normal-case">{weightNames[weight]}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-mono">
              {referenceSizes.map((size) => (
                <tr key={size} className="border-t border-gray-700/50">
                  <td className="py-2 pr-4 text-text-secondary sticky left-0 bg-gray-900">
                    {size}x{size}
                  </td>
                  {weights.map((weight) => {
                    const stroke = calculateStrokeForSize(weight, size)
                    return (
                      <td key={weight} className="py-2 px-2 text-center text-text-primary">
                        {stroke.toFixed(2)}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Formula explanation */}
        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
          <h4 className="text-sm font-semibold text-text-secondary mb-2">Formula</h4>
          <code className="text-xs text-text-tertiary block mb-3">
            strokeWidth = (baseStroke / 32) × iconSize
          </code>
          <p className="text-xs text-text-tertiary mb-4">
            Where <code className="bg-gray-700 px-1 rounded">baseStroke</code> is the calibrated 
            stroke width for the weight (shown above), and <code className="bg-gray-700 px-1 rounded">iconSize</code> is 
            the rendered size in pixels.
          </p>
          
          <h4 className="text-sm font-semibold text-text-secondary mb-2">Example</h4>
          <div className="bg-gray-900 p-3 rounded-lg text-xs">
            <p className="text-text-tertiary mb-2">
              For a <span className="text-text-primary">24×24px</span> icon at weight <span className="text-text-primary">400 (Regular)</span>:
            </p>
            <div className="font-mono text-text-primary space-y-1">
              <p>baseStroke (weight 400) = <span className="text-blue-400">{strokeWidths[400]?.toFixed(2)}px</span></p>
              <p>iconSize = <span className="text-blue-400">24px</span></p>
              <p className="pt-2 border-t border-gray-700 mt-2">
                strokeWidth = ({strokeWidths[400]?.toFixed(2)} / 32) × 24
              </p>
              <p className="pl-[88px]">= {((strokeWidths[400] || 0) / 32).toFixed(4)} × 24</p>
              <p className="pl-[88px]">= <span className="text-green-400 font-bold">{(((strokeWidths[400] || 0) / 32) * 24).toFixed(2)}px</span></p>
            </div>
          </div>
        </div>
        
        {/* Interactive Calculator */}
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
          <h4 className="text-sm font-semibold text-text-primary mb-4">Stroke Width Calculator</h4>
          
          <div className="space-y-6">
            {/* Weight selector - multi-select */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-text-secondary">Font Weights (click to toggle)</label>
                <div className="flex gap-2">
                  <button
                    onClick={selectAllWeights}
                    className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 text-text-secondary rounded transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    onClick={() => selectSingleWeight(400)}
                    className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 text-text-secondary rounded transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {weights.map((w) => {
                  const isSelected = calcWeights.includes(w)
                  return (
                    <button
                      key={w}
                      onClick={() => toggleWeight(w)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-text-secondary hover:bg-gray-700'
                      }`}
                    >
                      <span className="font-semibold">{w}</span>
                      <span className="text-xs ml-1 opacity-75">{weightNames[w]}</span>
                    </button>
                  )
                })}
              </div>
            </div>
            
            {/* Size input */}
            <div>
              <label className="block text-xs text-text-secondary mb-2">Icon Size (px)</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="8"
                  max="128"
                  value={calcSize}
                  onChange={(e) => setCalcSize(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <input
                  type="number"
                  min="1"
                  max="512"
                  value={calcSize}
                  onChange={(e) => setCalcSize(Math.max(1, Number(e.target.value) || 1))}
                  className="w-20 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-text-primary text-sm text-center focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            
            {/* Results for selected weights */}
            <div>
              <div className="text-xs text-text-secondary mb-3">Calculated Stroke Widths at {calcSize}×{calcSize}px</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {calcWeights.map((weight) => {
                  const baseStroke = strokeWidths[weight] || strokeWidths[400]
                  const result = (baseStroke / 32) * calcSize
                  return (
                    <div key={weight} className="bg-gray-900 p-3 rounded-lg">
                      <div className="text-xs text-text-tertiary mb-1">
                        {weight} <span className="opacity-75">{weightNames[weight]}</span>
                      </div>
                      <div className="text-xl font-bold text-green-400 font-mono">
                        {result.toFixed(2)}px
                      </div>
                      <div className="text-[10px] text-text-tertiary mt-1 font-mono">
                        ({baseStroke.toFixed(2)} / 32) × {calcSize}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          
          {/* Live preview */}
          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="text-xs text-text-secondary mb-3">Live Preview</div>
            <div className="overflow-x-auto">
              <div className="flex gap-4" style={{ minWidth: 'min-content' }}>
                {calcWeights.map((weight) => {
                  const baseStroke = strokeWidths[weight] || strokeWidths[400]
                  const result = (baseStroke / 32) * calcSize
                  return (
                    <div key={weight} className="flex flex-col items-center gap-2">
                      <div 
                        className="bg-gray-800 rounded-lg p-3 flex items-center justify-center gap-3 text-text-primary"
                        style={{ 
                          minWidth: Math.max(calcSize * 2 + 48, 80),
                          minHeight: Math.max(calcSize + 24, 56)
                        }}
                      >
                        <Icon name="cross" weight={weight as IconWeight} size={calcSize} />
                        <Icon name="plus" weight={weight as IconWeight} size={calcSize} />
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-text-secondary">{weight}</div>
                        <div className="text-xs text-green-400 font-mono">{result.toFixed(2)}px</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestIconShowcase
