import { PADDING_CLASSES } from '../../utils/paddingClasses'
import { PADDING } from '../../utils/padding'
import Card from '../ui/Card'

const PaddingShowcase = () => {
  return (
    <div className="space-y-16 w-full">
      {/* Overview */}
      <section className="mb-16 w-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-50 mb-6 break-words">
          Padding System Overview
        </h2>
        <p className="text-base text-gray-200 mb-6 break-words">
          The universal padding system provides consistent spacing across the entire site. 
          All padding values are centralized for easy maintenance and updates.
        </p>
      </section>

      {/* Horizontal Padding */}
      <section className="mb-16 w-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-50 mb-6 break-words">
          Horizontal Padding
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-50 mb-4">Responsive Horizontal Padding</h3>
            <p className="text-sm text-gray-300 mb-4">
              <code className="bg-gray-700 px-2 py-1 rounded text-gray-50">PADDING_CLASSES.horizontal</code>
            </p>
            <p className="text-sm text-gray-200 mb-4">
              Mobile: {PADDING.horizontal.mobile} (px-4) | Desktop: {PADDING.horizontal.desktop} (px-8)
            </p>
            <div className={`bg-gray-900 ${PADDING_CLASSES.horizontal} py-8 rounded-lg border-2 border-dashed border-gray-600`}>
              <p className="text-gray-50 font-semibold">Example with horizontal padding</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Padding */}
      <section className="mb-16 w-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-50 mb-6 break-words">
          Vertical Padding
        </h2>
        <div className="space-y-6">
          {(['small', 'medium', 'large', 'xlarge'] as const).map((size) => (
            <div key={size} className="bg-gray-800 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-50 mb-4 capitalize">{size} Vertical Padding</h3>
              <p className="text-sm text-gray-300 mb-4">
                <code className="bg-gray-700 px-2 py-1 rounded text-gray-50">
                  PADDING_CLASSES.vertical.{size}
                </code>
              </p>
              <p className="text-sm text-gray-200 mb-4">
                Value: {PADDING.vertical[size]}
              </p>
              <div className={`bg-gray-900 ${PADDING_CLASSES.vertical[size]} ${PADDING_CLASSES.horizontal} rounded-lg border-2 border-dashed border-gray-600`}>
                <p className="text-gray-50 font-semibold">Example with {size} vertical padding</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Page Content Padding */}
      <section className="mb-16 w-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-50 mb-6 break-words">
          Page Content Padding
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-50 mb-4">Full Page Padding</h3>
            <p className="text-sm text-gray-300 mb-4">
              <code className="bg-gray-700 px-2 py-1 rounded text-gray-50">PADDING_CLASSES.page.full</code>
            </p>
            <p className="text-sm text-gray-200 mb-4">
              Horizontal: {PADDING.page.horizontal.mobile} mobile / {PADDING.page.horizontal.desktop} desktop<br />
              Vertical: {PADDING.page.vertical.mobile} mobile / {PADDING.page.vertical.desktop} desktop
            </p>
            <div className={`bg-gray-900 ${PADDING_CLASSES.page.full} rounded-lg border-2 border-dashed border-gray-600`}>
              <p className="text-gray-50 font-semibold">Example page content with full padding</p>
            </div>
          </div>
        </div>
      </section>

      {/* Header & Footer Padding */}
      <section className="mb-16 w-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-50 mb-6 break-words">
          Header & Footer Padding
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-50 mb-4">Header Padding</h3>
            <p className="text-sm text-gray-300 mb-4">
              <code className="bg-gray-700 px-2 py-1 rounded text-gray-50">PADDING_CLASSES.header.horizontal</code>
            </p>
            <p className="text-sm text-gray-200 mb-4">
              {PADDING.header.horizontal.mobile} mobile / {PADDING.header.horizontal.desktop} desktop
            </p>
            <div className={`bg-gray-900 ${PADDING_CLASSES.header.horizontal} py-4 rounded-lg border-2 border-dashed border-gray-600`}>
              <p className="text-gray-50 font-semibold">Header example</p>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-50 mb-4">Footer Padding</h3>
            <p className="text-sm text-gray-300 mb-4">
              <code className="bg-gray-700 px-2 py-1 rounded text-gray-50">PADDING_CLASSES.footer.horizontal</code>
            </p>
            <p className="text-sm text-gray-200 mb-4">
              {PADDING.footer.horizontal.mobile} mobile / {PADDING.footer.horizontal.desktop} desktop
            </p>
            <div className={`bg-gray-900 ${PADDING_CLASSES.footer.horizontal} py-4 rounded-lg border-2 border-dashed border-gray-600`}>
              <p className="text-gray-50 font-semibold">Footer example</p>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="mb-16 w-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-50 mb-6 break-words">
          Usage Examples
        </h2>
        <div className="space-y-6">
          <Card>
            <h3 className="text-xl font-bold text-gray-50 mb-4">Page Content</h3>
            <pre className="bg-gray-800 text-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
{`import { PADDING_CLASSES } from '../utils/paddingClasses'

<section className={\`w-full \${PADDING_CLASSES.page.full} bg-gray-50\`}>
  {/* Your content */}
</section>`}
            </pre>
          </Card>
          <Card>
            <h3 className="text-xl font-bold text-gray-50 mb-4">Header</h3>
            <pre className="bg-gray-800 text-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
{`import { PADDING_CLASSES } from '../utils/paddingClasses'

<div className={PADDING_CLASSES.header.horizontal}>
  {/* Header content */}
</div>`}
            </pre>
          </Card>
          <Card>
            <h3 className="text-xl font-bold text-gray-50 mb-4">Custom Combinations</h3>
            <pre className="bg-gray-800 text-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
{`import { PADDING_CLASSES } from '../utils/paddingClasses'

<div className={\`\${PADDING_CLASSES.horizontal} \${PADDING_CLASSES.vertical.large}\`}>
  {/* Custom padding combination */}
</div>`}
            </pre>
          </Card>
        </div>
      </section>

      {/* Padding Values Reference */}
      <section className="mb-16 w-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-50 mb-6 break-words">
          Padding Values Reference
        </h2>
        <div className="bg-gray-800 p-6 rounded-2xl overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-gray-600">
                <th className="pb-2 pr-4 font-bold text-gray-50">Type</th>
                <th className="pb-2 pr-4 font-bold text-gray-50">Mobile</th>
                <th className="pb-2 pr-4 font-bold text-gray-50">Desktop</th>
                <th className="pb-2 font-bold text-gray-50">Class</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-700">
                <td className="py-2 pr-4 font-semibold text-gray-50">Horizontal</td>
                <td className="py-2 pr-4 text-gray-200">{PADDING.horizontal.mobile}</td>
                <td className="py-2 pr-4 text-gray-200">{PADDING.horizontal.desktop}</td>
                <td className="py-2 text-gray-300 font-mono">px-4 md:px-8</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 pr-4 font-semibold text-gray-50">Page Horizontal</td>
                <td className="py-2 pr-4 text-gray-200">{PADDING.page.horizontal.mobile}</td>
                <td className="py-2 pr-4 text-gray-200">{PADDING.page.horizontal.desktop}</td>
                <td className="py-2 text-gray-300 font-mono">px-4 md:px-8</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 pr-4 font-semibold text-gray-50">Page Vertical</td>
                <td className="py-2 pr-4 text-gray-200">{PADDING.page.vertical.mobile}</td>
                <td className="py-2 pr-4 text-gray-200">{PADDING.page.vertical.desktop}</td>
                <td className="py-2 text-gray-300 font-mono">pb-16 md:pb-24</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 pr-4 font-semibold text-gray-50">Header Horizontal</td>
                <td className="py-2 pr-4 text-gray-200">{PADDING.header.horizontal.mobile}</td>
                <td className="py-2 pr-4 text-gray-200">{PADDING.header.horizontal.desktop}</td>
                <td className="py-2 text-gray-300 font-mono">px-4 md:px-8</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-gray-50">Footer Horizontal</td>
                <td className="py-2 pr-4 text-gray-200">{PADDING.footer.horizontal.mobile}</td>
                <td className="py-2 pr-4 text-gray-200">{PADDING.footer.horizontal.desktop}</td>
                <td className="py-2 text-gray-300 font-mono">px-4 md:px-8</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default PaddingShowcase
