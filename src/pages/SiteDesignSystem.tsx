import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import { PADDING_CLASSES } from '../utils/paddingClasses'

const SiteDesignSystem = () => {
  const sections = [
    { path: '/design-system/colors', title: 'Color Palette', description: 'View the complete monochrome blue-hued color system with usage examples' },
    { path: '/design-system/typography', title: 'Typography', description: 'Explore typography styles using the Geologica font' },
    { path: '/design-system/buttons', title: 'Buttons', description: 'See all button variants, sizes, and states with drop shadows' },
    { path: '/design-system/form-controls', title: 'Form Controls', description: 'Browse all form components including inputs, checkboxes, toggles, and sliders' },
    { path: '/design-system/components', title: 'Components', description: 'View cards, badges, alerts, progress bars, and navigation' },
    { path: '/design-system/padding', title: 'Padding', description: 'Universal padding system for consistent spacing across the site' },
  ]

  return (
    <div className="w-full overflow-x-hidden bg-gray-900 min-h-screen flex flex-col pt-[150px]">
      <div className={`w-full ${PADDING_CLASSES.page.full} flex-grow flex flex-col`}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text-primary mb-4 break-words">
          Site Design System
        </h1>
        <p className="text-lg font-light text-gray-300 mb-12 break-words">
          Explore the design system components and guidelines
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link key={section.path} to={section.path}>
              <Card clickable className="h-full">
                <h3 className="text-xl font-bold text-text-primary mb-2">{section.title}</h3>
                <p className="text-gray-300 text-sm font-light">{section.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SiteDesignSystem
