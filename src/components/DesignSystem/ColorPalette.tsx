const ColorPalette = () => {
  const colorPalette = [
    { name: '0', hex: '#FFFFFF', text: 'gray-0' },
    { name: '50', hex: '#E6E5F4', text: 'gray-50' },
    { name: '100', hex: '#D9E2EC', text: 'gray-100' },
    { name: '200', hex: '#C5D4E3', text: 'gray-200' },
    { name: '300', hex: '#A8B8CC', text: 'gray-300' },
    { name: '400', hex: '#7A8FA8', text: 'gray-400' },
    { name: '500', hex: '#5A6B7F', text: 'gray-500' },
    { name: '600', hex: '#4A5A6B', text: 'gray-600' },
    { name: '700', hex: '#3A4757', text: 'gray-700' },
    { name: '800', hex: '#2A3442', text: 'gray-800' },
    { name: '900', hex: '#1A2332', text: 'gray-900' },
    { name: '1000', hex: '#000000', text: 'gray-1000' },
  ]

  return (
    <section className="mb-16 w-full overflow-x-auto">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-6 break-words">Color Palette</h2>
      
      {/* Full Grayscale Palette */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-text-primary mb-4">Grayscale with Blue Hue (0-1000)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-4 w-full min-w-0">
          {colorPalette.map((color) => {
            // Use light text for all swatches for consistency with dark theme
            const textColor = 'text-text-primary'
            return (
              <div key={color.name} className="text-left">
                <div
                  className="w-full h-24 rounded-2xl mb-2"
                  style={{ backgroundColor: color.hex }}
                />
                <p className={`text-sm font-semibold ${textColor}`}>{color.name}</p>
                <p className="text-xs text-gray-300">{color.text}</p>
                <p className="text-xs text-gray-400 font-mono">{color.hex}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Color Variants */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-text-primary mb-4">Color Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-2xl text-text-primary">
            <h4 className="font-semibold mb-2">Primary</h4>
            <p className="text-sm mb-2">#2A3442 (gray-800)</p>
            <p className="text-xs opacity-80">Used for: Cards, primary buttons, container backgrounds</p>
          </div>
          <div className="bg-gray-600 p-6 rounded-2xl text-text-primary">
            <h4 className="font-semibold mb-2">Secondary</h4>
            <p className="text-sm mb-2">#4A5A6B (gray-600)</p>
            <p className="text-xs opacity-80">Used for: Secondary buttons, accents</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-2xl text-text-primary">
            <h4 className="font-semibold mb-2">Tertiary</h4>
            <p className="text-sm mb-2">#3A4757 (gray-700)</p>
            <p className="text-xs opacity-80">Used for: Card headers/footers, tertiary buttons, form inputs</p>
          </div>
        </div>
      </div>

      {/* Text Colors */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-text-primary mb-4">Text Colors</h3>
        <div className="bg-gray-800 p-6 rounded-2xl space-y-4">
          <div className="bg-gray-900 p-4 rounded-2xl">
            <p className="text-text-primary font-semibold mb-1">Text Primary (gray-50)</p>
            <p className="text-sm text-gray-300">High contrast - Main headings, primary text</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-2xl">
            <p className="text-gray-200 font-semibold mb-1">Text Secondary (gray-200)</p>
            <p className="text-sm text-gray-300">Medium contrast - Body text, labels</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-2xl">
            <p className="text-gray-300 font-semibold mb-1">Text Tertiary (gray-300)</p>
            <p className="text-sm text-gray-400">Lower contrast - Secondary text, captions</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-2xl">
            <p className="text-gray-400 font-semibold mb-1">Text Muted (gray-400)</p>
            <p className="text-sm text-gray-400">Lowest contrast - Tertiary text, hints, placeholders</p>
          </div>
        </div>
      </div>

      {/* Background Colors */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-text-primary mb-4">Background Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-1000 p-6 rounded-2xl border-2 border-gray-800">
            <h4 className="font-semibold text-text-primary mb-2">Background Primary</h4>
            <p className="text-sm text-gray-200">gray-1000 (black) - Main page background</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl text-text-primary">
            <h4 className="font-semibold mb-2">Background Secondary</h4>
            <p className="text-sm">gray-800 - Card backgrounds, containers</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-2xl text-text-primary">
            <h4 className="font-semibold mb-2">Background Tertiary</h4>
            <p className="text-sm">gray-700 - Card headers/footers, form inputs, hover states</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl text-text-primary">
            <h4 className="font-semibold mb-2">Background Overlay</h4>
            <p className="text-sm">gray-900 with opacity - Modal/overlay backgrounds</p>
          </div>
        </div>
      </div>

      {/* Component State Colors */}
      <div>
        <h3 className="text-xl font-bold text-text-primary mb-4">Component State Colors</h3>
        <div className="bg-gray-800 p-6 rounded-2xl space-y-4">
          <div className="bg-gray-700 p-4 rounded-2xl hover:bg-gray-600 transition-colors cursor-pointer text-text-primary">
            <p className="font-semibold mb-1">Hover State</p>
            <p className="text-sm opacity-80">Lighter blue-grays (e.g., gray-800 → gray-700, gray-700 → gray-600)</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-2xl text-text-primary">
            <p className="font-semibold mb-1">Active State</p>
            <p className="text-sm opacity-80">Darker blue-grays (shift by 100-200)</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-2xl opacity-50 text-text-primary">
            <p className="font-semibold mb-1">Disabled State</p>
            <p className="text-sm opacity-80">Dark blue-grays (700-800) with 50% opacity</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-2xl text-text-primary">
            <p className="font-semibold mb-1">Focus State</p>
            <p className="text-sm opacity-80">Background color change (gray-800 → gray-700) - No borders or rings</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-gray-700 p-4 rounded-2xl text-text-primary">
              <p className="font-semibold text-sm mb-1">Success</p>
              <p className="text-xs opacity-80">gray-700</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-2xl text-text-primary">
              <p className="font-semibold text-sm mb-1">Warning</p>
              <p className="text-xs opacity-80">gray-700</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-2xl text-text-primary">
              <p className="font-semibold text-sm mb-1">Error</p>
              <p className="text-xs opacity-80">gray-700</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-2xl text-text-primary">
              <p className="font-semibold text-sm mb-1">Info</p>
              <p className="text-xs opacity-80">gray-700</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-800 rounded-2xl">
        <p className="text-sm text-gray-200">
          <strong>Note:</strong> No borders are used in the design system. Separation and hierarchy are achieved through background colors, spacing, and shadows.
        </p>
      </div>
    </section>
  )
}

export default ColorPalette
