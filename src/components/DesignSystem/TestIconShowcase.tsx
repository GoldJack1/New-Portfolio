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
  { px: 13, label: '13px', description: 'Inline with text (cap-height)' },
  { px: 20, label: '20px', description: 'Default / Navigation' },
  { px: 32, label: '32px', description: 'Large / Display' },
]

// Cap-height ratio for inline icons (matches Button component)
const CAP_HEIGHT_RATIO = 0.725

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
const strokeIcons: StrokeIconName[] = [
  'cross', 
  'plus', 
  'minus', 
  'chevron-left', 
  'chevron-right', 
  'chevron-up',
  'chevron-down',
  'checkmark',
  'hamburger',
  'circled-checkmark',
  'circled-cross',
  'star'
]

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
      <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
        <p className="text-text-secondary text-sm sm:text-base mb-3 sm:mb-4">
          These icons use stroke-based SVG paths with stroke widths calibrated to match 
          Geologica font weights (100-900). The stroke scales proportionally with the icon size.
        </p>
        <div className="text-text-tertiary text-xs sm:text-sm overflow-x-auto">
          <code className="bg-gray-700 px-2 py-1 rounded whitespace-nowrap">{'<Icon name="cross" weight={400} />'}</code>
        </div>
      </div>
      
      {/* Weight comparison */}
      <div className="space-y-6 bg-gray-900 p-4 sm:p-6 md:p-8 rounded-2xl w-full min-w-0 mb-8">
        <div>
          <h3 className="text-xl font-bold text-text-primary">Weight Comparison</h3>
          <p className="text-text-secondary text-sm mt-1">
            Each row shows icons at a specific weight, matching the corresponding font weight.
          </p>
        </div>
        
        {weights.map((weight) => (
          <div key={weight} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3">
              <span 
                className="text-text-primary text-sm sm:text-base"
                style={{ fontWeight: weight }}
              >
                {weight} {weightNames[weight]}
              </span>
              <span className="text-xs text-text-tertiary">
                stroke: {strokeWidths[weight]?.toFixed(2)}px
              </span>
            </div>
            
            {/* Mobile: 3 per row grid, Tablet: flex wrap, Desktop: flex row */}
            <div className="grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-6 md:flex-nowrap">
              {strokeIcons.map((iconName) => (
                <div
                  key={iconName}
                  className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2"
                >
                  {/* Mobile: 24px, Desktop: 32px */}
                  <div className="flex items-center justify-center text-text-primary">
                    <span className="sm:hidden">
                      <Icon name={iconName} weight={weight} size={24} />
                    </span>
                    <span className="hidden sm:inline">
                      <Icon name={iconName} weight={weight} size={32} />
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-text-tertiary text-center truncate max-w-full">
                    {iconName.replace('chevron-', '')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Size comparison */}
      <div className="space-y-4 bg-gray-900 p-4 sm:p-6 md:p-8 rounded-2xl w-full min-w-0 mb-8">
        <div>
          <h3 className="text-xl font-bold text-text-primary">Size Comparison</h3>
          <p className="text-text-secondary text-sm mt-1">
            Icons at different sizes with weight 400. Stroke scales proportionally.
          </p>
        </div>
        
        {/* Mobile: Card layout */}
        <div className="block sm:hidden space-y-4">
          {strokeIcons.map((iconName) => (
            <div key={iconName} className="bg-gray-800 rounded-lg p-4">
              <div className="text-text-secondary text-sm mb-3 font-medium">{iconName}</div>
              <div className="flex items-end justify-between gap-2">
                {sizes.map((size) => (
                  <div key={size.px} className="flex flex-col items-center gap-2">
                    <div className="flex items-center justify-center text-text-primary">
                      <Icon name={iconName} weight={400} size={size.px} />
                    </div>
                    <span className="text-[10px] text-text-tertiary">{size.px}px</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Desktop: Table layout */}
        <div className="hidden sm:block overflow-x-auto">
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
                      <div className="flex items-center justify-center text-text-primary">
                        <Icon name={iconName} weight={400} size={size.px} />
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
      <div className="space-y-4 bg-gray-900 p-4 sm:p-6 md:p-8 rounded-2xl w-full min-w-0 mb-6 sm:mb-8">
        <h3 className="text-xl font-bold text-text-primary">Available Icons</h3>
        
        <div className="grid grid-cols-3 xs:grid-cols-5 gap-2 sm:gap-4">
          {strokeIcons.map((iconName) => (
            <div
              key={iconName}
              className="flex flex-col items-center justify-center p-3 sm:p-4 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center justify-center mb-1.5 sm:mb-2 text-text-primary">
                {/* Mobile: 24px, Desktop: 32px */}
                <span className="sm:hidden">
                  <Icon name={iconName} weight={400} size={24} />
                </span>
                <span className="hidden sm:inline">
                  <Icon name={iconName} weight={400} size={32} />
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-text-secondary text-center break-words">
                {iconName.replace('chevron-', '')}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Inline with text examples */}
      <div className="space-y-4 bg-gray-900 p-4 sm:p-6 md:p-8 rounded-2xl w-full min-w-0 mb-8">
        <div>
          <h3 className="text-xl font-bold text-text-primary">Inline with Text</h3>
          <p className="text-text-secondary text-sm mt-1">
            Icons displayed inline with text at matching weights.
          </p>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          {[100, 300, 400, 500, 700, 900].map((weight) => (
            <div 
              key={weight}
              className="bg-gray-800/50 rounded-lg p-3 sm:p-4"
            >
              {/* Weight label - always visible at top on mobile */}
              <div className="text-xs text-text-tertiary mb-2 sm:hidden">
                {weight} ({weightNames[weight]})
              </div>
              
              {/* Mobile: 3 per row grid - 14px font, 10px icon (cap-height) */}
              <div 
                className="grid grid-cols-3 gap-2 sm:hidden text-text-primary"
                style={{ fontWeight: weight, fontSize: '14px' }}
              >
                <span className="inline-flex items-center gap-1">
                  <Icon name="plus" weight={weight as IconWeight} size={Math.round(14 * CAP_HEIGHT_RATIO)} />
                  <span>Add</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <Icon name="minus" weight={weight as IconWeight} size={Math.round(14 * CAP_HEIGHT_RATIO)} />
                  <span>Remove</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <Icon name="cross" weight={weight as IconWeight} size={Math.round(14 * CAP_HEIGHT_RATIO)} />
                  <span>Close</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <Icon name="chevron-left" weight={weight as IconWeight} size={Math.round(14 * CAP_HEIGHT_RATIO)} />
                  <span>Back</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <span>Next</span>
                  <Icon name="chevron-right" weight={weight as IconWeight} size={Math.round(14 * CAP_HEIGHT_RATIO)} />
                </span>
              </div>
              
              {/* Desktop: flex row - 16px font, 12px icon (cap-height) */}
              <div 
                className="hidden sm:flex flex-wrap items-center gap-x-3 gap-y-2 text-text-primary"
                style={{ fontWeight: weight, fontSize: '16px' }}
              >
                <span className="inline-flex items-center gap-1">
                  <Icon name="plus" weight={weight as IconWeight} size={Math.round(16 * CAP_HEIGHT_RATIO)} />
                  <span>Add</span>
                </span>
                <span className="text-text-tertiary">|</span>
                <span className="inline-flex items-center gap-1">
                  <Icon name="minus" weight={weight as IconWeight} size={Math.round(16 * CAP_HEIGHT_RATIO)} />
                  <span>Remove</span>
                </span>
                <span className="text-text-tertiary">|</span>
                <span className="inline-flex items-center gap-1">
                  <Icon name="cross" weight={weight as IconWeight} size={Math.round(16 * CAP_HEIGHT_RATIO)} />
                  <span>Close</span>
                </span>
                <span className="text-text-tertiary">|</span>
                <span className="inline-flex items-center gap-1">
                  <Icon name="chevron-left" weight={weight as IconWeight} size={Math.round(16 * CAP_HEIGHT_RATIO)} />
                  <span>Back</span>
                </span>
                <span className="text-text-tertiary">|</span>
                <span className="inline-flex items-center gap-1">
                  <span>Next</span>
                  <Icon name="chevron-right" weight={weight as IconWeight} size={Math.round(16 * CAP_HEIGHT_RATIO)} />
                </span>
                
                {/* Weight label - right aligned */}
                <span className="ml-auto text-xs text-text-tertiary font-normal">
                  {weight} ({weightNames[weight]})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Stroke Width Reference Table */}
      <div className="space-y-6 bg-gray-900 p-4 sm:p-6 md:p-8 rounded-2xl w-full min-w-0">
        <div>
          <h3 className="text-xl font-bold text-text-primary">Stroke Width Reference</h3>
          <p className="text-text-secondary text-sm mt-1">
            Calculated stroke width for each weight at different icon sizes.
          </p>
        </div>
        
        {/* Base values for 32px */}
        <div>
          <h4 className="text-sm font-semibold text-text-secondary mb-3">Base Stroke Widths (32x32)</h4>
          <div className="grid grid-cols-3 xs:grid-cols-5 sm:grid-cols-9 gap-2">
            {weights.map((weight) => (
              <div key={weight} className="bg-gray-800 px-2 py-2 rounded-lg text-center">
                <div className="text-[10px] sm:text-xs text-text-tertiary">{weight}</div>
                <div className="text-xs sm:text-sm text-text-primary font-mono">{strokeWidths[weight]?.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Full reference table - hidden on mobile, scrollable on tablet */}
        <div className="hidden sm:block">
          <h4 className="text-sm font-semibold text-text-secondary mb-3">Full Reference Table</h4>
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-text-tertiary text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-2 sticky left-0 bg-gray-900 z-10">Size</th>
                  {weights.map((weight) => (
                    <th key={weight} className="pb-3 px-1 text-center whitespace-nowrap text-[10px] sm:text-xs">
                      {weight}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                {referenceSizes.map((size) => (
                  <tr key={size} className="border-t border-gray-700/50">
                    <td className="py-1.5 pr-2 text-text-secondary sticky left-0 bg-gray-900 z-10">
                      {size}
                    </td>
                    {weights.map((weight) => {
                      const stroke = calculateStrokeForSize(weight, size)
                      return (
                        <td key={weight} className="py-1.5 px-1 text-center text-text-primary">
                          {stroke.toFixed(2)}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Formula explanation */}
        <div className="p-3 sm:p-4 bg-gray-800/50 rounded-lg">
          <h4 className="text-sm font-semibold text-text-secondary mb-2">Formula</h4>
          <code className="text-xs text-text-tertiary block mb-3 break-all">
            strokeWidth = (baseStroke / 32) × iconSize
          </code>
          
          <h4 className="text-sm font-semibold text-text-secondary mb-2 mt-4">Example</h4>
          <div className="bg-gray-900 p-3 rounded-lg text-xs overflow-x-auto">
            <p className="text-text-tertiary mb-2">
              24×24px icon at weight 400:
            </p>
            <div className="font-mono text-text-primary space-y-1">
              <p>= ({strokeWidths[400]?.toFixed(2)} / 32) × 24</p>
              <p>= <span className="text-green-400 font-bold">{(((strokeWidths[400] || 0) / 32) * 24).toFixed(2)}px</span></p>
            </div>
          </div>
        </div>
        
        {/* Interactive Calculator */}
        <div className="p-3 sm:p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
          <h4 className="text-sm font-semibold text-text-primary mb-4">Stroke Width Calculator</h4>
          
          <div className="space-y-4 sm:space-y-6">
            {/* Weight selector - multi-select */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <label className="text-xs text-text-secondary">Font Weights</label>
                <div className="flex gap-2">
                  <button
                    onClick={selectAllWeights}
                    className="text-[10px] sm:text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 text-text-secondary rounded transition-colors"
                  >
                    All
                  </button>
                  <button
                    onClick={() => selectSingleWeight(400)}
                    className="text-[10px] sm:text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 text-text-secondary rounded transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 xs:grid-cols-5 sm:flex sm:flex-wrap gap-1.5 sm:gap-2">
                {weights.map((w) => {
                  const isSelected = calcWeights.includes(w)
                  return (
                    <button
                      key={w}
                      onClick={() => toggleWeight(w)}
                      className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-text-secondary hover:bg-gray-700'
                      }`}
                    >
                      <span className="font-semibold">{w}</span>
                      <span className="hidden sm:inline text-xs ml-1 opacity-75">{weightNames[w]}</span>
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
                  className="w-16 sm:w-20 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-text-primary text-sm text-center focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            
            {/* Results for selected weights */}
            <div>
              <div className="text-xs text-text-secondary mb-2">Results at {calcSize}×{calcSize}px</div>
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                {calcWeights.map((weight) => {
                  const baseStroke = strokeWidths[weight] || strokeWidths[400]
                  const result = (baseStroke / 32) * calcSize
                  return (
                    <div key={weight} className="bg-gray-900 p-2 sm:p-3 rounded-lg">
                      <div className="text-[10px] sm:text-xs text-text-tertiary mb-1">
                        {weight}
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-green-400 font-mono">
                        {result.toFixed(2)}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          
          {/* Live preview */}
          <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-700">
            <div className="text-xs text-text-secondary mb-3">Live Preview</div>
            <div className="space-y-4">
              {calcWeights.map((weight) => {
                const baseStroke = strokeWidths[weight] || strokeWidths[400]
                const result = (baseStroke / 32) * calcSize
                return (
                  <div key={weight} className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs text-text-secondary">{weight} ({weightNames[weight]})</div>
                      <div className="text-xs text-green-400 font-mono">{result.toFixed(2)}px</div>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-2 text-text-primary">
                      {strokeIcons.map((iconName) => (
                        <div 
                          key={iconName} 
                          className="flex items-center justify-center bg-gray-900 rounded p-2"
                          style={{ minHeight: Math.max(calcSize + 16, 40) }}
                        >
                          <Icon name={iconName} weight={weight as IconWeight} size={calcSize} />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestIconShowcase
