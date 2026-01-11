const TypographyShowcase = () => {
  return (
    <section className="mb-16 w-full overflow-x-hidden">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 break-words">Typography</h2>
      <div className="space-y-4 bg-gray-200 p-6 sm:p-8 rounded-2xl w-full min-w-0">
        <div>
          <p className="text-xs text-gray-600 mb-1">Font Family: Geologica Cursive</p>
          <h1 className="text-5xl font-bold text-gray-900">Heading 1</h1>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-gray-900">Heading 2</h2>
        </div>
        <div>
          <h3 className="text-3xl font-semibold text-gray-900">Heading 3</h3>
        </div>
        <div>
          <h4 className="text-2xl font-semibold text-gray-900">Heading 4</h4>
        </div>
        <div>
          <p className="text-lg text-gray-700">Body Large - Lorem ipsum dolor sit amet</p>
        </div>
        <div>
          <p className="text-base text-gray-700">Body - Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Body Small - Secondary text with lower contrast</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Caption - Tertiary text with lowest contrast</p>
        </div>
      </div>
    </section>
  )
}

export default TypographyShowcase
