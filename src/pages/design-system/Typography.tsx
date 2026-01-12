import TypographyShowcase from '../../components/DesignSystem/TypographyShowcase'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { PADDING_CLASSES } from '../../utils/paddingClasses'

const Typography = () => {
  return (
    <div className="w-full overflow-x-hidden bg-gray-900 min-h-screen flex flex-col pt-[150px]">
      <div className={`w-full ${PADDING_CLASSES.page.full} flex-grow flex flex-col`}>
        <div className="mb-8">
          <Link to="/design-system">
            <Button variant="ghost" size="sm" className="mb-4">
              ← Back to Design System
            </Button>
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text-primary mb-4 break-words">
            Typography
          </h1>
          <p className="text-lg text-gray-300 break-words">
            Typography styles using the Geologica font family
          </p>
        </div>

        <TypographyShowcase />
      </div>
    </div>
  )
}

export default Typography
