import Button from '../ui/Button'
import { FaHeart, FaStar } from 'react-icons/fa'

const ButtonShowcase = () => {
  return (
    <section className="mb-16 w-full overflow-x-hidden">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-6 break-words">Buttons</h2>
      <div className="space-y-8 bg-gray-800 p-6 sm:p-8 rounded-2xl w-full min-w-0">
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Variants</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="ghost">Ghost</Button>
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
          <h3 className="text-xl font-bold text-text-primary mb-4">States</h3>
          <div className="flex flex-wrap gap-4">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Icon Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <Button iconOnly icon={<FaHeart />} />
            <Button iconOnly icon={<FaStar />} size="md" />
            <Button iconOnly icon={<FaHeart />} size="lg" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Buttons with Icons</h3>
          <div className="flex flex-wrap gap-4">
            <Button icon={<FaHeart />}>With Icon</Button>
            <Button icon={<FaStar />} variant="secondary">Secondary Icon</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ButtonShowcase
