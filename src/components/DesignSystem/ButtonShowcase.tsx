import Button from '../ui/Button'
import { FaHeart, FaStar } from 'react-icons/fa'

const ButtonShowcase = () => {
  return (
    <section className="mb-16 w-full overflow-x-hidden">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-6 break-words">Buttons</h2>
      <div className="space-y-8 bg-gray-900 p-6 sm:p-8 rounded-2xl w-full min-w-0">
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Variants</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-secondary mb-2">Primary</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Ghost</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="ghost" size="sm">Small</Button>
                <Button variant="ghost" size="md">Medium</Button>
                <Button variant="ghost" size="lg">Large</Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Sizes</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Font Weights</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Button fontWeight={300}>Light (300)</Button>
            <Button fontWeight={400}>Regular (400)</Button>
            <Button fontWeight={500}>Medium (500)</Button>
            <Button fontWeight={600}>SemiBold (600)</Button>
            <Button fontWeight={700}>Bold (700)</Button>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">States</h3>
          <div className="flex flex-wrap gap-4">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Icon Buttons</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-secondary mb-2">Primary</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button iconOnly icon={<FaHeart />} variant="primary" size="sm" />
                <Button iconOnly icon={<FaStar />} variant="primary" size="md" />
                <Button iconOnly icon={<FaHeart />} variant="primary" size="lg" />
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Ghost</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button iconOnly icon={<FaHeart />} variant="ghost" size="sm" />
                <Button iconOnly icon={<FaStar />} variant="ghost" size="md" />
                <Button iconOnly icon={<FaHeart />} variant="ghost" size="lg" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Buttons with Icons</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-secondary mb-2">Primary - Icon Left</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button icon={<FaHeart />} variant="primary" size="sm">Small</Button>
                <Button icon={<FaStar />} variant="primary" size="md">Medium</Button>
                <Button icon={<FaHeart />} variant="primary" size="lg">Large</Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Primary - Icon Right</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button icon={<FaHeart />} iconPosition="right" variant="primary" size="sm">Small</Button>
                <Button icon={<FaStar />} iconPosition="right" variant="primary" size="md">Medium</Button>
                <Button icon={<FaHeart />} iconPosition="right" variant="primary" size="lg">Large</Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Ghost - Icon Left</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button icon={<FaHeart />} variant="ghost" size="sm">Small</Button>
                <Button icon={<FaStar />} variant="ghost" size="md">Medium</Button>
                <Button icon={<FaHeart />} variant="ghost" size="lg">Large</Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Ghost - Icon Right</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button icon={<FaHeart />} iconPosition="right" variant="ghost" size="sm">Small</Button>
                <Button icon={<FaStar />} iconPosition="right" variant="ghost" size="md">Medium</Button>
                <Button icon={<FaHeart />} iconPosition="right" variant="ghost" size="lg">Large</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ButtonShowcase
