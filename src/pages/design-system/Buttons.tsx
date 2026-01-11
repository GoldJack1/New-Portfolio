import ButtonShowcase from '../../components/DesignSystem/ButtonShowcase'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { PADDING_CLASSES } from '../../utils/paddingClasses'

const Buttons = () => {
  return (
    <div className="bg-gray-200 w-full overflow-x-hidden">
      <div className={`w-full ${PADDING_CLASSES.page.full} bg-gray-50`}>
        <div className="mb-8">
          <Link to="/design-system">
            <Button variant="ghost" size="sm" className="mb-4">
              ← Back to Design System
            </Button>
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 break-words">
            Buttons
          </h1>
          <p className="text-lg text-gray-600 break-words">
            All button variants, sizes, and states with drop shadows
          </p>
        </div>

        <ButtonShowcase />
      </div>
    </div>
  )
}

export default Buttons
