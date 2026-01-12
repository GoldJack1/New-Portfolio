const ColorPalette = () => {
  const colorPalette = [
    { 
      name: '0', 
      hex: '#FFFFFF', 
      text: 'gray-0',
      used: false,
      usage: []
    },
    { 
      name: '50', 
      hex: '#E6E5F4', 
      text: 'gray-50',
      used: true,
      usage: [
        'Navigation indicator background',
        'Mobile hamburger button background',
        'Mobile dropdown active state background',
        'Progress bar fill'
      ]
    },
    { 
      name: '600', 
      hex: '#4A5A6B', 
      text: 'gray-600',
      used: true,
      usage: [
        'Button secondary variant background',
        'Badge secondary variant background',
        'Card header/footer backgrounds',
        'Alert secondary variant background',
        'Alert success variant background'
      ]
    },
    { 
      name: '700', 
      hex: '#3A4757', 
      text: 'gray-700',
      used: true,
      usage: [
        'Button tertiary variant background',
        'Form input backgrounds (focus state)',
        'Select backgrounds (focus state)',
        'Code block backgrounds',
        'Table borders',
        'Component state examples',
        'Alert tertiary variant background',
        'Alert warning variant background',
        'Toggle switch background',
        'Slider track background',
        'Progress bar track background',
        'Badge tertiary variant background',
        'Code block backgrounds (in color palette)',
        'Border colors (border-gray-700)'
      ]
    },
    { 
      name: '800', 
      hex: '#2A3442', 
      text: 'gray-800',
      used: true,
      usage: [
        'Button primary variant background',
        'Badge primary variant background',
        'Alert primary variant background',
        'Alert info/error variant backgrounds',
        'Card backgrounds',
        'Form input backgrounds (default)',
        'Select backgrounds',
        'Textarea backgrounds',
        'Projects page card backgrounds',
        'Contact page card backgrounds',
        'Color palette inner containers',
        'ComponentShowcase inner containers',
        'TypographyShowcase containers',
        'Form accent color (checkboxes, radios)'
      ]
    },
    { 
      name: '900', 
      hex: '#1A2332', 
      text: 'gray-900',
      used: true,
      usage: [
        'Color palette containers',
        'Design system showcase containers',
        'FormControlsShowcase containers',
        'ButtonShowcase containers',
        'ComponentShowcase containers',
        'PaddingShowcase example containers',
        'Padding showcase example containers',
        'Typography showcase containers'
      ]
    },
    { 
      name: '1000', 
      hex: '#000000', 
      text: 'gray-1000',
      used: true,
      usage: [
        'Main page background (html, body, #root)',
        'Footer background extension',
        'Navigation gradient overlay',
        'Page backgrounds (design system pages)',
        'Privacy Policy page background',
        'SiteMap page background',
        'Site Design System page background',
        'Design system sub-pages (Colors, Typography, Buttons, Form Controls, Components, Padding)',
        'Navigation glass background (in gradient)',
        'Text selection background',
        'Navigation active link text',
        'Mobile menu active link text'
      ]
    },
  ]

  const pageBackgrounds = [
    { name: 'Home', hex: '#7F0000', text: 'homeBackground' },
    { name: 'Projects', hex: '#397F00', text: 'projectsBackground' },
    { name: 'About', hex: '#00377F', text: 'aboutBackground' },
    { name: 'Contact', hex: '#7F0070', text: 'contactBackground' },
  ]

  const gradients = [
    {
      name: 'Navigation Top Gradient',
      value: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)',
      usage: 'Scroll indicator gradient above navigation',
    },
    {
      name: 'Navigation Glass Background',
      value: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), rgba(255,255,255,0.25)',
      usage: 'Navigation bar with backdrop blur',
    },
  ]

  const shadows = [
    { name: 'Shadow Small', class: 'shadow-sm', usage: 'Ghost buttons, subtle elements' },
    { name: 'Shadow Medium', class: 'shadow-md', usage: 'Cards, secondary/tertiary buttons' },
    { name: 'Shadow Large', class: 'shadow-lg', usage: 'Primary buttons, elevated elements' },
    { name: 'Shadow XL', class: 'shadow-xl', usage: 'Primary button hover state' },
  ]

  const hoverStates = [
    {
      name: 'Button Primary',
      default: 'bg-gray-800',
      hover: 'rgba(255, 255, 255, 0.25)',
      shadow: 'shadow-lg → shadow-xl',
    },
    {
      name: 'Button Secondary',
      default: 'bg-gray-600',
      hover: 'rgba(0, 0, 0, 0.25)',
      shadow: 'shadow-md → shadow-lg',
    },
    {
      name: 'Button Tertiary',
      default: 'bg-gray-700',
      hover: 'rgba(0, 0, 0, 0.25)',
      shadow: 'shadow-md → shadow-lg',
    },
    {
      name: 'Button Ghost',
      default: 'bg-transparent',
      hover: 'rgba(255, 255, 255, 0.25)',
      shadow: 'shadow-sm → shadow-md',
    },
    {
      name: 'Primary hover',
      default: 'transparent',
      hover: 'rgba(0, 0, 0, 0.25)',
      usage: 'Navigation link hover background',
    },
    {
      name: 'Secondary hover',
      default: 'transparent',
      hover: 'rgba(255, 255, 255, 0.25)',
      usage: 'White at 25% opacity',
    },
    {
      name: 'Mobile Dropdown Hover',
      default: 'transparent',
      hover: 'rgba(0, 0, 0, 0.25)',
      usage: 'Mobile menu item hover - uses Primary hover',
    },
  ]

  const focusStates = [
    {
      name: 'Input/Select Focus',
      default: 'bg-gray-800',
      focus: 'bg-gray-700',
      usage: 'Form inputs, selects, textareas',
    },
    {
      name: 'Toggle Focus',
      default: 'normal',
      focus: 'focus:shadow-lg',
      usage: 'Toggle switch focus ring',
    },
  ]

  const activeStates = [
    {
      name: 'Navigation Active',
      background: '#E6E5F4 (gray-50)',
      text: '#000000 (gray-1000)',
      usage: 'Active navigation link indicator - background uses gray-50, text uses gray-1000',
    },
    {
      name: 'Mobile Menu Active',
      background: '#E6E5F4 (gray-50)',
      text: '#000000 (gray-1000)',
      usage: 'Active mobile menu item - background uses gray-50, text uses gray-1000',
    },
  ]

  const opacityVariations = [
    { name: 'Text Secondary', value: 'rgba(255, 255, 255, 0.75)', usage: '75% opacity white' },
    { name: 'Text Tertiary', value: 'rgba(255, 255, 255, 0.5)', usage: '50% opacity white' },
    { name: 'Primary hover', value: 'rgba(0, 0, 0, 0.25)', usage: '25% opacity black - used for navigation link hover and mobile dropdown hover' },
    { name: 'Secondary hover', value: 'rgba(255, 255, 255, 0.25)', usage: '25% opacity white' },
    { name: 'Navigation Overlay', value: 'rgba(0, 0, 0, 0.2)', usage: '20% opacity black in gradient' },
    { name: 'Navigation Glass', value: 'rgba(255, 255, 255, 0.25)', usage: '25% opacity white in gradient' },
    { name: 'Disabled State', value: '50% opacity', usage: 'Disabled buttons and inputs' },
  ]

  // Calculate usage statistics
  const usedColors = colorPalette.filter(c => c.used).length
  const unusedColors = colorPalette.filter(c => !c.used).length

  return (
    <section className="mb-16 w-full overflow-x-auto">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-6 break-words">Color Palette</h2>
      
      {/* Usage Summary */}
      <div className="mb-8 bg-gray-900 p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-text-primary mb-4">Color Usage Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded-xl">
            <p className="text-2xl font-bold text-text-primary mb-1">{usedColors}</p>
            <p className="text-sm text-text-primary">Colors in Use</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl">
            <p className="text-2xl font-bold text-text-tertiary mb-1">{unusedColors}</p>
            <p className="text-sm text-text-primary">Colors Not Used</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl">
            <p className="text-2xl font-bold text-text-primary mb-1">{colorPalette.length}</p>
            <p className="text-sm text-text-primary">Total Colors</p>
          </div>
        </div>
        {unusedColors > 0 && (
          <div className="mt-4 p-4 bg-gray-800 rounded-xl">
            <p className="text-sm font-semibold text-text-primary mb-2">Unused Colors:</p>
            <p className="text-xs text-text-tertiary">
              {colorPalette.filter(c => !c.used).map(c => c.text).join(', ')}
            </p>
          </div>
        )}
      </div>
      
      {/* Full Grayscale Palette */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-text-primary mb-4">Grayscale with Blue Hue (0-1000)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full min-w-0">
          {colorPalette.map((color) => {
            // Use light text for all swatches for consistency with dark theme
            const textColor = 'text-text-primary'
            const isUnused = !color.used
            return (
              <div 
                key={color.name} 
                className={`text-left bg-gray-800 p-4 rounded-2xl ${isUnused ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div
                    className="w-20 h-20 rounded-xl flex-shrink-0 border-2 border-gray-700"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`text-sm font-semibold ${textColor}`}>{color.name}</p>
                      {isUnused && (
                        <span className="text-xs bg-gray-700 text-text-primary px-2 py-0.5 rounded-full">
                          Not Used
                        </span>
                      )}
                      {color.used && (
                        <span className="text-xs bg-gray-700 text-text-primary px-2 py-0.5 rounded-full">
                          In Use
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-primary mb-1">{color.text}</p>
                    <p className="text-xs text-text-tertiary font-mono mb-2">{color.hex}</p>
                  </div>
                </div>
                {color.used && color.usage.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p className="text-xs font-semibold text-text-primary mb-2">Usage:</p>
                    <ul className="space-y-1">
                      {color.usage.map((use, idx) => (
                        <li key={idx} className="text-xs text-text-tertiary flex items-start gap-2">
                          <span className="text-gray-600 mt-1">•</span>
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {isUnused && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p className="text-xs text-text-tertiary italic">
                      This color is defined in the palette but not currently used in the codebase.
                    </p>
                  </div>
                )}
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
            <p className="text-xs opacity-80">Used for: Secondary buttons, accents, card headers/footers</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-2xl text-text-primary">
            <h4 className="font-semibold mb-2">Tertiary</h4>
            <p className="text-sm mb-2">#3A4757 (gray-700)</p>
            <p className="text-xs opacity-80">Used for: Tertiary buttons, form inputs</p>
          </div>
        </div>
      </div>

      {/* Text Colors */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-text-primary mb-4">Text Colors</h3>
        <div className="bg-gray-900 p-6 rounded-2xl space-y-4">
          <div className="bg-gray-800 p-4 rounded-2xl">
            <p className="text-text-primary font-semibold mb-2">Text Primary</p>
            <p className="text-xs text-text-tertiary mb-2">CSS Variable: <code className="bg-gray-700 px-2 py-1 rounded">var(--text-primary)</code></p>
            <p className="text-xs text-text-tertiary mb-2">Value: <code className="bg-gray-700 px-2 py-1 rounded">rgba(255, 255, 255, 1)</code> (white at 100%)</p>
            <p className="text-sm text-text-primary mb-2">Usage:</p>
            <ul className="text-xs text-text-tertiary space-y-1 ml-4">
              <li>• Main headings (h1, h2, h3, etc.)</li>
              <li>• Primary text content</li>
              <li>• Body text (About, Privacy Policy pages)</li>
              <li>• Typography showcase body text</li>
              <li>• Component showcase content</li>
              <li>• SiteMap links</li>
              <li>• Button text (all variants including ghost)</li>
              <li>• Form input text</li>
              <li>• Navigation links (desktop and mobile)</li>
              <li>• Navigation active link text</li>
              <li>• Mobile dropdown links</li>
              <li>• Mobile dropdown active link text</li>
              <li>• Mobile pill title</li>
              <li>• Card content text</li>
              <li>• Text selection color (when text is highlighted)</li>
              <li>• Secondary text (descriptions, labels, metadata)</li>
              <li>• Page descriptions</li>
              <li>• Table data text</li>
              <li>• Typography showcase metadata</li>
              <li>• Padding showcase code snippets and table data</li>
            </ul>
          </div>
          <div className="bg-gray-800 p-4 rounded-2xl">
            <p className="text-text-secondary font-semibold mb-2">Text Secondary</p>
            <p className="text-xs text-text-tertiary mb-2">CSS Variable: <code className="bg-gray-700 px-2 py-1 rounded">var(--text-secondary)</code></p>
            <p className="text-xs text-text-tertiary mb-2">Value: <code className="bg-gray-700 px-2 py-1 rounded">rgba(255, 255, 255, 0.75)</code> (white at 75%)</p>
            <p className="text-sm text-text-primary mb-2">Usage:</p>
            <ul className="text-xs text-text-tertiary space-y-1 ml-4">
              <li>• Form labels (Input, Select, Textarea, Checkbox, Radio, Toggle, Slider)</li>
              <li>• Progress component labels</li>
              <li>• Select dropdown icons</li>
            </ul>
            <p className="text-xs text-text-tertiary mt-2 italic">
              <strong>Note:</strong> All body text and labels now use <code className="bg-gray-700 px-1 py-0.5 rounded text-xs">text-text-secondary</code> instead of <code className="bg-gray-700 px-1 py-0.5 rounded text-xs">text-gray-200</code> for consistency with the CSS variable system.
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-2xl">
            <p className="text-text-primary font-semibold mb-2">Text Tertiary</p>
            <p className="text-xs text-text-tertiary mb-2">CSS Variable: <code className="bg-gray-700 px-2 py-1 rounded">var(--text-tertiary)</code></p>
            <p className="text-xs text-text-tertiary mb-2">Value: <code className="bg-gray-700 px-2 py-1 rounded">rgba(255, 255, 255, 0.5)</code> (white at 50%)</p>
            <p className="text-sm text-text-primary mb-2">Usage:</p>
            <ul className="text-xs text-text-tertiary space-y-1 ml-4">
              <li>• Captions</li>
              <li>• Tertiary text</li>
              <li>• Hints and placeholders (Input icons)</li>
              <li>• Color palette metadata (CSS Variable labels, Value labels, usage lists, notes)</li>
              <li>• Typography showcase metadata</li>
            </ul>
            <p className="text-xs text-text-tertiary mt-2 italic">
              <strong>Note:</strong> Text Tertiary uses the CSS variable <code className="bg-gray-700 px-1 py-0.5 rounded text-xs">var(--text-tertiary)</code> which is <code className="bg-gray-700 px-1 py-0.5 rounded text-xs">rgba(255, 255, 255, 0.5)</code> (white at 50% opacity). The <code className="bg-gray-700 px-1 py-0.5 rounded text-xs">text-gray-300</code> class is deprecated and should not be used. Secondary text, page descriptions, table data text, and typography showcase metadata now use <code className="bg-gray-700 px-1 py-0.5 rounded text-xs">text-text-primary</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Background Colors */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-text-primary mb-4">Background Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-1000 p-6 rounded-2xl border-2 border-gray-800">
            <h4 className="font-semibold text-text-primary mb-2">Background Primary</h4>
            <p className="text-sm text-text-secondary">gray-1000 (black) - Main page background</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl text-text-primary">
            <h4 className="font-semibold mb-2">Background Secondary</h4>
            <p className="text-sm">gray-800 - Card backgrounds, containers</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-2xl text-text-primary">
            <h4 className="font-semibold mb-2">Background Tertiary</h4>
            <p className="text-sm">gray-700 - Form inputs, hover states</p>
          </div>
        </div>
      </div>

      {/* Page Background Colors */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-text-primary mb-4">Page Background Colors</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {pageBackgrounds.map((bg) => (
            <div key={bg.name} className="text-left">
              <div
                className="w-full h-24 rounded-2xl mb-2 border-2 border-gray-700"
                style={{ backgroundColor: bg.hex }}
              />
              <p className="text-sm font-semibold text-text-primary">{bg.name}</p>
              <p className="text-xs text-text-primary">{bg.text}</p>
              <p className="text-xs text-text-tertiary font-mono">{bg.hex}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gradients */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-text-primary mb-4">Gradients</h3>
        <div className="bg-gray-900 p-6 rounded-2xl space-y-6">
          {gradients.map((gradient, idx) => (
            <div key={idx} className="bg-gray-900 p-4 rounded-2xl">
              <p className="font-semibold text-text-primary mb-2">{gradient.name}</p>
              <div
                className="w-full h-20 rounded-xl mb-2"
                style={{ background: gradient.value }}
              />
              <p className="text-xs text-text-primary font-mono mb-2 break-all">{gradient.value}</p>
              <p className="text-sm text-text-tertiary">{gradient.usage}</p>
            </div>
          ))}
          <div className="bg-gray-800 p-4 rounded-2xl">
            <p className="font-semibold text-text-primary mb-2">Backdrop Blur</p>
            <p className="text-sm text-text-primary mb-2">backdrop-filter: blur(18px)</p>
            <p className="text-xs text-text-tertiary">Used with navigation glass background</p>
          </div>
        </div>
      </div>

      {/* Shadows */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-text-primary mb-4">Shadow Variations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {shadows.map((shadow) => (
            <div key={shadow.name} className="bg-gray-900 p-6 rounded-2xl text-text-primary">
              <div className={`bg-gray-700 p-4 rounded-2xl mb-3 ${shadow.class}`}>
                <p className="text-sm font-semibold">{shadow.name}</p>
              </div>
              <p className="text-xs text-text-primary font-mono mb-2">{shadow.class}</p>
              <p className="text-xs text-text-tertiary">{shadow.usage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hover States */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-text-primary mb-4">Hover States</h3>
        <div className="bg-gray-900 p-6 rounded-2xl space-y-4">
          {hoverStates.map((state, idx) => (
            <div key={idx} className="bg-gray-900 p-4 rounded-2xl">
              <p className="font-semibold text-text-primary mb-3">{state.name}</p>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-text-tertiary mb-1">Default</p>
                  <div className={`${state.default} p-3 rounded-xl text-text-primary text-sm font-mono`}>
                    {state.default}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary mb-1">Hover</p>
                  <div className="p-3 rounded-xl text-text-primary text-sm font-mono relative overflow-hidden">
                    {state.hover.startsWith('rgba') ? (
                      <>
                        <div className={`${state.default} absolute inset-0`} />
                        <div className="absolute inset-0" style={{ backgroundColor: state.hover }} />
                        <span className="relative z-10">{state.hover}</span>
                      </>
                    ) : (
                      <div className={`${state.hover} p-2 rounded`}>
                        {state.hover}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {state.shadow && (
                <p className="text-xs text-text-primary mb-1">Shadow: {state.shadow}</p>
              )}
              {state.usage && (
                <p className="text-xs text-text-tertiary">{state.usage}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Focus States */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-text-primary mb-4">Focus States</h3>
        <div className="bg-gray-900 p-6 rounded-2xl space-y-4">
          {focusStates.map((state, idx) => (
            <div key={idx} className="bg-gray-900 p-4 rounded-2xl">
              <p className="font-semibold text-text-primary mb-3">{state.name}</p>
              {state.default && state.focus && (
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-text-tertiary mb-1">Default</p>
                    <div className={`${state.default} p-3 rounded-xl text-text-primary text-sm font-mono`}>
                      {state.default}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary mb-1">Focus</p>
                    <div className={`${state.focus} p-3 rounded-xl text-text-primary text-sm font-mono`}>
                      {state.focus}
                    </div>
                  </div>
                </div>
              )}
              <p className="text-xs text-text-tertiary">{state.usage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active States */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-text-primary mb-4">Active States</h3>
        <div className="bg-gray-900 p-6 rounded-2xl space-y-4">
          {activeStates.map((state, idx) => (
            <div key={idx} className="bg-gray-900 p-4 rounded-2xl">
              <p className="font-semibold text-text-primary mb-3">{state.name}</p>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-text-tertiary mb-1">Background</p>
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-gray-900 text-sm font-mono">{state.background}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-text-tertiary mb-1">Text</p>
                  <div className="bg-gray-1000 p-3 rounded-xl">
                    <p className="text-text-primary text-sm font-mono">{state.text}</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-text-tertiary">{state.usage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Opacity Variations */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-text-primary mb-4">Opacity Variations</h3>
        <div className="bg-gray-900 p-6 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {opacityVariations.map((opacity, idx) => (
              <div key={idx} className="bg-gray-900 p-4 rounded-2xl">
                <p className="font-semibold text-text-primary mb-2">{opacity.name}</p>
                <p className="text-xs text-text-primary font-mono mb-2 break-all">{opacity.value}</p>
                <p className="text-xs text-text-tertiary">{opacity.usage}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selection & Accent Colors */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-text-primary mb-4">Selection & Accent Colors</h3>
        <div className="bg-gray-900 p-6 rounded-2xl space-y-4">
          <div className="bg-gray-800 p-4 rounded-2xl">
            <p className="font-semibold text-text-primary mb-2">Text Selection</p>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-text-tertiary mb-1">Background</p>
                <div className="bg-gray-1000 p-3 rounded-xl">
                  <p className="text-text-primary text-sm font-mono">#000000 (gray-1000)</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-text-tertiary mb-1">Text</p>
                <div className="bg-gray-900 p-3 rounded-xl">
                  <p className="text-text-primary text-sm font-mono">var(--text-primary)</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-text-tertiary">
              <strong>Note:</strong> Text selection now uses <code className="bg-gray-700 px-1 py-0.5 rounded text-xs">var(--text-primary)</code> instead of hardcoded gray-50, ensuring consistency with the primary text color system.
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-2xl">
            <p className="font-semibold text-text-primary mb-2">Form Accent Colors</p>
            <p className="text-sm text-text-primary mb-2">Checkboxes, Radio buttons, Range sliders</p>
            <div className="bg-gray-800 p-3 rounded-xl">
              <p className="text-text-primary text-sm font-mono">#2A3442 (gray-800)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Component State Colors */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-text-primary mb-4">Component State Colors</h3>
        <div className="bg-gray-900 p-6 rounded-2xl space-y-4">
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
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-900 rounded-2xl">
        <p className="text-sm text-text-secondary">
          <strong>Note:</strong> No borders are used in the design system. Separation and hierarchy are achieved through background colors, spacing, and shadows.
        </p>
      </div>
    </section>
  )
}

export default ColorPalette
