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
    { path: '/design-system/icons', title: 'Icons', description: 'Complete collection of custom JWP icons organized by category' },
    { path: '/design-system/stroke-based-icons', title: 'Stroke Based Icons', description: 'Stroke-based icons with variable weight at different sizes' },
    { path: '/design-system/icon-calibration', title: 'Icon Calibration', description: 'Calibrate stroke-based icons against text weight and size' },
    { path: '/design-system/static-hero', title: 'Static Hero', description: 'Standalone hero component with various background types' },
    { path: '/design-system/carousel-hero', title: 'Carousel Hero', description: 'Hero component with carousel functionality, auto-play, and navigation' },
  ]

  return (
    <div className="w-full overflow-x-hidden bg-gray-1000 min-h-screen flex flex-col pt-[150px]">
      <section className={`w-full ${PADDING_CLASSES.page.full} flex-grow flex flex-col`}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text-primary mb-4 break-words">
          Site Design System
        </h1>
        <p className="text-lg font-light text-text-secondary mb-12 break-words">
          Explore the design system components and guidelines
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link key={section.path} to={section.path}>
              <Card clickable className="h-full">
                <h3 className="text-xl font-bold text-text-primary mb-2">{section.title}</h3>
                <p className="text-text-secondary text-sm font-light">{section.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default SiteDesignSystem
