import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Hero, { HeroSlide } from '../../components/ui/Hero'
import { PADDING_CLASSES } from '../../utils/paddingClasses'
import { HERO_GRADIENTS } from '../../utils/heroGradients'

const StaticHero = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Determine button size based on breakpoint (desktop: md, mobile/tablet: sm)
  const buttonSize = windowWidth >= 1024 ? 'md' : 'sm'
  const solidHero: HeroSlide = {
    backgroundType: 'solid',
    backgroundValue: '#7F0000',
    heading: 'Welcome to My Portfolio',
    subtext: 'Explore my projects and get in touch',
    buttonText: 'View Projects',
    buttonOnClick: () => console.log('Button clicked!'),
  }

  const gradientHero: HeroSlide = {
    backgroundType: 'gradient',
    backgroundValue: HERO_GRADIENTS.home,
    heading: 'Creative Solutions',
    subtext: 'Building amazing experiences with modern technology',
    buttonText: 'Learn More',
  }

  return (
    <div className="w-full overflow-x-hidden bg-gray-1000 min-h-screen flex flex-col pt-[150px]">
      <section className={`w-full ${PADDING_CLASSES.page.full} flex-grow flex flex-col`}>
        <div className="mb-8">
          <Link to="/design-system">
            <Button variant="ghost" size={buttonSize} className="mb-4">
              ← Back to Design System
            </Button>
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text-primary mb-4 break-words">
            Static Hero
          </h1>
          <p className="text-lg text-text-secondary break-words">
            Standalone hero component with various background types
          </p>
        </div>

        <section className="mb-16 w-full overflow-x-hidden">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-6 break-words">Static Hero Examples</h2>
          <div className="space-y-8 w-full min-w-0">
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4">Solid Background</h3>
              <div className="bg-gray-900 p-4 rounded-2xl overflow-hidden">
                <p className="text-sm text-text-secondary mb-4">Hero with solid color background</p>
                <Hero
                  slides={[solidHero]}
                  height="400px"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4">Gradient Background</h3>
              <div className="bg-gray-900 p-4 rounded-2xl overflow-hidden">
                <p className="text-sm text-text-secondary mb-4">Hero with gradient background</p>
                <Hero
                  slides={[gradientHero]}
                  height="400px"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4">Image Background</h3>
              <div className="bg-gray-900 p-4 rounded-2xl overflow-hidden">
                <p className="text-sm text-text-secondary mb-4">Hero with image background (placeholder - use your own image URL)</p>
                <Hero
                  slides={[{
                    backgroundType: 'image',
                    backgroundValue: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&h=1080&fit=crop',
                    heading: 'Beautiful Landscape',
                    subtext: 'Hero with image background',
                    buttonText: 'Explore',
                  }]}
                  height="400px"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4">Without Button</h3>
              <div className="bg-gray-900 p-4 rounded-2xl overflow-hidden">
                <p className="text-sm text-text-secondary mb-4">Hero without a button</p>
                <Hero
                  slides={[{
                    backgroundType: 'solid',
                    backgroundValue: '#00377F',
                    heading: 'Simple Hero',
                    subtext: 'Just heading and subtext, no button',
                  }]}
                  height="400px"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4">Full Viewport Height</h3>
              <div className="bg-gray-900 p-4 rounded-2xl overflow-hidden">
                <p className="text-sm text-text-secondary mb-4">Hero with full viewport height (100vh)</p>
                <Hero
                  slides={[{
                    backgroundType: 'gradient',
                    backgroundValue: HERO_GRADIENTS.contact,
                    heading: 'Full Height Hero',
                    subtext: 'This hero takes up the full viewport height',
                    buttonText: 'Get Started',
                  }]}
                  height="600px"
                />
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  )
}

export default StaticHero
