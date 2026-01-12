const TypographyShowcase = () => {
  return (
    <section className="mb-16 w-full overflow-x-hidden">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-6 break-words">Typography</h2>
      
      {/* Font Weights */}
      <div className="mb-8 bg-gray-800 p-6 sm:p-8 rounded-2xl w-full min-w-0">
        <h3 className="text-xl font-semibold text-text-primary mb-4">Font Weights</h3>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-300 mb-1">Thin (100)</p>
            <p className="text-2xl text-text-primary" style={{ fontWeight: 100 }}>The quick brown fox jumps over the lazy dog</p>
          </div>
          <div>
            <p className="text-xs text-gray-300 mb-1">Extra Light (200)</p>
            <p className="text-2xl text-text-primary" style={{ fontWeight: 200 }}>The quick brown fox jumps over the lazy dog</p>
          </div>
          <div>
            <p className="text-xs text-gray-300 mb-1">Light (300)</p>
            <p className="text-2xl text-text-primary" style={{ fontWeight: 300 }}>The quick brown fox jumps over the lazy dog</p>
          </div>
          <div>
            <p className="text-xs text-gray-300 mb-1">Regular (400)</p>
            <p className="text-2xl text-text-primary" style={{ fontWeight: 400 }}>The quick brown fox jumps over the lazy dog</p>
          </div>
          <div>
            <p className="text-xs text-gray-300 mb-1">Medium (500)</p>
            <p className="text-2xl text-text-primary" style={{ fontWeight: 500 }}>The quick brown fox jumps over the lazy dog</p>
          </div>
          <div>
            <p className="text-xs text-gray-300 mb-1">Semi Bold (600)</p>
            <p className="text-2xl text-text-primary" style={{ fontWeight: 600 }}>The quick brown fox jumps over the lazy dog</p>
          </div>
          <div>
            <p className="text-xs text-gray-300 mb-1">Bold (700)</p>
            <p className="text-2xl text-text-primary" style={{ fontWeight: 700 }}>The quick brown fox jumps over the lazy dog</p>
          </div>
          <div>
            <p className="text-xs text-gray-300 mb-1">Extra Bold (800)</p>
            <p className="text-2xl text-text-primary" style={{ fontWeight: 800 }}>The quick brown fox jumps over the lazy dog</p>
          </div>
          <div>
            <p className="text-xs text-gray-300 mb-1">Black (900)</p>
            <p className="text-2xl text-text-primary" style={{ fontWeight: 900 }}>The quick brown fox jumps over the lazy dog</p>
          </div>
        </div>
      </div>

      {/* Typography Scale */}
      <div className="space-y-6 bg-gray-800 p-6 sm:p-8 rounded-2xl w-full min-w-0">
        <h3 className="text-xl font-bold text-text-primary mb-4">Typography Scale</h3>
        
        {/* Heading 1 */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary">Heading 1</h1>
          <p className="text-sm text-gray-300">
            Size: Mobile 30px • Tablet 48px • Desktop 72px
            <br />
            Line Height: 1.2 • Letter Spacing: -0.02em
          </p>
        </div>

        {/* Heading 2 */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">Heading 2</h2>
          <p className="text-sm text-gray-300">
            Size: Mobile 24px • Tablet 36px • Desktop 48px
            <br />
            Line Height: 1.25 • Letter Spacing: -0.01em
          </p>
        </div>

        {/* Heading 3 */}
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-text-primary">Heading 3</h3>
          <p className="text-sm text-gray-300">
            Size: Mobile 20px • Tablet 30px • Desktop 36px
            <br />
            Line Height: 1.3 • Letter Spacing: 0
          </p>
        </div>

        {/* Heading 4 */}
        <div className="space-y-1">
          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-text-primary">Heading 4</h4>
          <p className="text-sm text-gray-300">
            Size: Mobile 18px • Tablet 24px • Desktop 30px
            <br />
            Line Height: 1.35 • Letter Spacing: 0
          </p>
        </div>

        {/* Body Large */}
        <div className="space-y-1">
          <p className="text-base sm:text-lg md:text-xl text-gray-200">Body Large - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
          <p className="text-sm text-gray-300">
            Size: Mobile 16px • Tablet 18px • Desktop 20px
            <br />
            Line Height: 1.5 • Letter Spacing: 0
          </p>
        </div>

        {/* Body */}
        <div className="space-y-1">
          <p className="text-sm sm:text-base md:text-lg text-gray-200">Body - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
          <p className="text-sm text-gray-300">
            Size: Mobile 14px • Tablet 16px • Desktop 18px
            <br />
            Line Height: 1.6 • Letter Spacing: 0
          </p>
        </div>

        {/* Body Small */}
        <div className="space-y-1">
          <p className="text-xs sm:text-sm md:text-base text-gray-300">Body Small - Secondary text with lower contrast. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p className="text-sm text-gray-300">
            Size: Mobile 12px • Tablet 14px • Desktop 16px
            <br />
            Line Height: 1.5 • Letter Spacing: 0.01em
          </p>
        </div>

        {/* Caption */}
        <div className="space-y-1">
          <p className="text-xs sm:text-xs md:text-sm text-gray-400">Caption - Tertiary text with lowest contrast. Used for captions, labels, and metadata.</p>
          <p className="text-sm text-gray-300">
            Size: Mobile 12px • Tablet 12px • Desktop 14px
            <br />
            Line Height: 1.4 • Letter Spacing: 0.01em
          </p>
        </div>
      </div>
    </section>
  )
}

export default TypographyShowcase
