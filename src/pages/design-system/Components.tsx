import ComponentShowcase from '../../components/DesignSystem/ComponentShowcase'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'

const Components = () => {
  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 w-full">
        <div className="mb-8">
          <Link to="/design-system">
            <Button variant="ghost" size="sm" className="mb-4">
              ← Back to Design System
            </Button>
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 break-words">
            Components
          </h1>
          <p className="text-lg text-gray-600 break-words">
            Cards, badges, alerts, progress bars, and navigation components
          </p>
        </div>

        <ComponentShowcase />
      </div>
    </div>
  )
}

export default Components
