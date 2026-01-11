const ColorPalette = () => {
  const colorPalette = [
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
  ]

  return (
    <section className="mb-16 w-full overflow-x-auto">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 break-words">Color Palette</h2>
      
      {/* Full Grayscale Palette */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Grayscale with Blue Hue (50-900)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4 w-full min-w-0">
          {colorPalette.map((color) => (
            <div key={color.name} className="text-left">
              <div
                className="w-full h-24 rounded-2xl mb-2"
                style={{ backgroundColor: color.hex }}
              />
              <p className="text-sm font-semibold text-gray-900">{color.name}</p>
              <p className="text-xs text-gray-600">{color.text}</p>
              <p className="text-xs text-gray-500 font-mono">{color.hex}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Color Variants */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Color Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-2xl text-gray-50">
            <h4 className="font-semibold mb-2">Primary</h4>
            <p className="text-sm mb-2">#2A3442 (gray-800)</p>
            <p className="text-xs opacity-80">Used for: Main content, primary buttons, headings</p>
          </div>
          <div className="bg-gray-500 p-6 rounded-2xl text-gray-50">
            <h4 className="font-semibold mb-2">Secondary</h4>
            <p className="text-sm mb-2">#5A6B7F (gray-500)</p>
            <p className="text-xs opacity-80">Used for: Secondary content, secondary buttons</p>
          </div>
          <div className="bg-gray-300 p-6 rounded-2xl text-gray-900">
            <h4 className="font-semibold mb-2">Tertiary</h4>
            <p className="text-sm mb-2">#A8B8CC (gray-300)</p>
            <p className="text-xs opacity-80">Used for: Subtle accents, tertiary buttons</p>
          </div>
        </div>
      </div>

      {/* Text Colors */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Text Colors</h3>
        <div className="bg-gray-200 p-6 rounded-2xl space-y-4">
          <div className="bg-gray-50 p-4 rounded-2xl">
            <p className="text-gray-900 font-semibold mb-1">Text Primary (gray-900)</p>
            <p className="text-sm text-gray-600">High contrast - Main body text, headings</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl">
            <p className="text-gray-700 font-semibold mb-1">Text Secondary (gray-600-700)</p>
            <p className="text-sm text-gray-600">Medium contrast - Secondary text, captions</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl">
            <p className="text-gray-500 font-semibold mb-1">Text Tertiary (gray-400-500)</p>
            <p className="text-sm text-gray-600">Lower contrast - Tertiary text, hints</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl">
            <p className="text-gray-400 font-semibold mb-1">Text Muted (gray-300-400)</p>
            <p className="text-sm text-gray-600">Lowest contrast - Disabled text, placeholders</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-2xl">
            <p className="text-gray-50 font-semibold mb-1">Text Inverse (gray-50-100)</p>
            <p className="text-sm text-gray-200">Text on dark backgrounds</p>
          </div>
        </div>
      </div>

      {/* Background Colors */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Background Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-6 rounded-2xl border-2 border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Background Primary</h4>
            <p className="text-sm text-gray-700">gray-50 - Main page background</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-2xl">
            <h4 className="font-semibold text-gray-900 mb-2">Background Secondary</h4>
            <p className="text-sm text-gray-700">gray-100-200 - Card backgrounds, sections</p>
          </div>
          <div className="bg-gray-300 p-6 rounded-2xl">
            <h4 className="font-semibold text-gray-900 mb-2">Background Tertiary</h4>
            <p className="text-sm text-gray-700">gray-200-300 - Subtle backgrounds, hover states</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl text-gray-50">
            <h4 className="font-semibold mb-2">Background Overlay</h4>
            <p className="text-sm">gray-900 with opacity - Modal/overlay backgrounds</p>
          </div>
        </div>
      </div>

      {/* Component State Colors */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Component State Colors</h3>
        <div className="bg-gray-200 p-6 rounded-2xl space-y-4">
          <div className="bg-gray-300 p-4 rounded-2xl hover:bg-gray-400 transition-colors cursor-pointer">
            <p className="font-semibold text-gray-900 mb-1">Hover State</p>
            <p className="text-sm text-gray-700">Slightly darker/lighter blue-grays (shift by 100-200)</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-2xl text-gray-50">
            <p className="font-semibold mb-1">Active State</p>
            <p className="text-sm">Darker blue-grays (shift by 200-300)</p>
          </div>
          <div className="bg-gray-300 p-4 rounded-2xl opacity-50">
            <p className="font-semibold text-gray-900 mb-1">Disabled State</p>
            <p className="text-sm text-gray-700">Light blue-grays (300-400) with 50-60% opacity</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-2xl">
            <p className="font-semibold text-gray-900 mb-1">Focus State</p>
            <p className="text-sm text-gray-700">Background color change (gray-100) - No borders or rings</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="bg-gray-600 p-4 rounded-2xl text-gray-50">
              <p className="font-semibold text-sm mb-1">Success</p>
              <p className="text-xs">gray-500-600</p>
            </div>
            <div className="bg-gray-400 p-4 rounded-2xl text-gray-900">
              <p className="font-semibold text-sm mb-1">Warning</p>
              <p className="text-xs">gray-400-500</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-2xl text-gray-50">
              <p className="font-semibold text-sm mb-1">Error</p>
              <p className="text-xs">gray-700-800</p>
            </div>
            <div className="bg-gray-500 p-4 rounded-2xl text-gray-50">
              <p className="font-semibold text-sm mb-1">Info</p>
              <p className="text-xs">gray-500-600</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-200 rounded-2xl">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> No borders are used in the design system. Separation and hierarchy are achieved through background colors, spacing, and shadows.
        </p>
      </div>
    </section>
  )
}

export default ColorPalette
