import TestIconShowcase from '../../components/DesignSystem/TestIconShowcase'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { PADDING_CLASSES } from '../../utils/paddingClasses'
import { Icon } from '../../components/ui/Icon'

const TestIcons = () => {
  return (
    <div className="w-full overflow-x-hidden bg-gray-1000 min-h-screen flex flex-col pt-[150px]">
      <section className={`w-full ${PADDING_CLASSES.page.full} flex-grow flex flex-col`}>
        <div className="mb-8">
          <Link to="/design-system">
            <Button variant="ghost" icon={<Icon name="chevron-left" weight={400} />} className="mb-4">
              Back to Design System
            </Button>
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text-primary mb-4 break-words">
            Stroke Based Icons
          </h1>
          <p className="text-lg text-text-secondary break-words">
            Test icons at different sizes: 16×16, 18×18, 20×20, and 32×32
          </p>
        </div>

        <TestIconShowcase />
      </section>
    </div>
  )
}

export default TestIcons
