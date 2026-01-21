import IconShowcase from '../../components/DesignSystem/IconShowcase'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { PADDING_CLASSES } from '../../utils/paddingClasses'
import { Icon } from '../../components/ui/Icon'

const Icons = () => {
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
            Icons
          </h1>
          <p className="text-lg text-text-secondary break-words">
            Complete collection of custom JWP icons organized by category
          </p>
        </div>

        <IconShowcase />
      </section>
    </div>
  )
}

export default Icons
