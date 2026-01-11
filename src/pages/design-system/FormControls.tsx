import FormControlsShowcase from '../../components/DesignSystem/FormControlsShowcase'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'

const FormControls = () => {
  return (
    <div className="bg-gray-200 w-full overflow-x-hidden">
      <div className="w-full px-4 md:px-8 pb-16 md:pb-24 bg-gray-50">
        <div className="mb-8">
          <Link to="/design-system">
            <Button variant="ghost" size="sm" className="mb-4">
              ← Back to Design System
            </Button>
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 break-words">
            Form Controls
          </h1>
          <p className="text-lg text-gray-600 break-words">
            All form components including inputs, checkboxes, toggles, and sliders
          </p>
        </div>

        <FormControlsShowcase />
      </div>
    </div>
  )
}

export default FormControls
