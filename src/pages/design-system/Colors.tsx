import ColorPalette from '../../components/DesignSystem/ColorPalette'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'

const Colors = () => {
  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <div className="w-full px-4 md:px-8 py-16 md:py-24">
        <div className="mb-8">
          <Link to="/design-system">
            <Button variant="ghost" size="sm" className="mb-4">
              ← Back to Design System
            </Button>
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 break-words">
            Color Palette
          </h1>
          <p className="text-lg text-gray-600 break-words">
            Complete monochrome blue-hued color system with usage examples
          </p>
        </div>

        <ColorPalette />
      </div>
    </div>
  )
}

export default Colors
