import ComponentShowcase from '../../components/DesignSystem/ComponentShowcase'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { PADDING_CLASSES } from '../../utils/paddingClasses'
import { JWPChevronLeft } from '../../utils/iconMap'

const Components = () => {
  return (
    <div className="w-full overflow-x-hidden bg-gray-1000 min-h-screen flex flex-col pt-[150px]">
      <section className={`w-full ${PADDING_CLASSES.page.full} flex-grow flex flex-col`}>
        <div className="mb-8">
          <Link to="/design-system">
            <Button variant="ghost" icon={<JWPChevronLeft />} className="mb-4">
              Back to Design System
            </Button>
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text-primary mb-4 break-words">
            Components
          </h1>
          <p className="text-lg text-text-secondary break-words">
            Cards, badges, alerts, progress bars, and navigation components
          </p>
        </div>

        <ComponentShowcase />
      </section>
    </div>
  )
}

export default Components
