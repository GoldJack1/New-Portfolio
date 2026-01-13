import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Hero, { HeroSlide } from '../../components/ui/Hero'
import { PADDING_CLASSES } from '../../utils/paddingClasses'
import { HERO_GRADIENTS } from '../../utils/heroGradients'

const CarouselHero = () => {
  const carouselSlides: HeroSlide[] = [
    {
      backgroundType: 'solid',
      backgroundValue: '#397F00',
      heading: 'Project One',
      subtext: 'First slide in the carousel',
      buttonText: 'Explore',
    },
    {
      backgroundType: 'solid',
      backgroundValue: '#00377F',
      heading: 'Project Two',
      subtext: 'Second slide in the carousel',
      buttonText: 'Discover',
    },
    {
      backgroundType: 'solid',
      backgroundValue: '#7F0070',
      heading: 'Project Three',
      subtext: 'Third slide in the carousel',
      buttonText: 'View More',
    },
  ]

  const gradientCarouselSlides: HeroSlide[] = [
    {
      backgroundType: 'gradient',
      backgroundValue: HERO_GRADIENTS.home,
      heading: 'Creative Design',
      subtext: 'Beautiful gradient backgrounds',
      buttonText: 'Learn More',
    },
    {
      backgroundType: 'gradient',
      backgroundValue: HERO_GRADIENTS.projects,
      heading: 'Modern Solutions',
      subtext: 'Innovative approaches to design',
      buttonText: 'Get Started',
    },
    {
      backgroundType: 'gradient',
      backgroundValue: HERO_GRADIENTS.about,
      heading: 'Future Ready',
      subtext: 'Building for tomorrow',
      buttonText: 'Explore',
    },
  ]

  return (
    <div className="w-full overflow-x-hidden bg-gray-1000 min-h-screen flex flex-col pt-[150px]">
      <section className={`w-full ${PADDING_CLASSES.page.full} flex-grow flex flex-col`}>
        <div className="mb-8">
          <Link to="/design-system">
            <Button variant="ghost" size="sm" className="mb-4">
              ← Back to Design System
            </Button>
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-text-primary mb-4 break-words">
            Carousel Hero
          </h1>
          <p className="text-lg text-text-secondary break-words">
            Hero component with carousel functionality, auto-play, and navigation controls
          </p>
        </div>

        <section className="mb-16 w-full overflow-x-hidden">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-6 break-words">Carousel Hero Examples</h2>
          <div className="space-y-8 w-full min-w-0">
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4">Basic Carousel (Auto-play Enabled)</h3>
              <div className="bg-gray-900 p-4 rounded-2xl overflow-hidden">
                <p className="text-sm text-text-secondary mb-4">Carousel with auto-play, navigation buttons, and indicators</p>
                <Hero
                  slides={carouselSlides}
                  autoPlay={true}
                  autoPlayInterval={4000}
                  pauseOnHover={true}
                  showNavigation={true}
                  showIndicators={true}
                  height="400px"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4">Gradient Carousel</h3>
              <div className="bg-gray-900 p-4 rounded-2xl overflow-hidden">
                <p className="text-sm text-text-secondary mb-4">Carousel with gradient backgrounds</p>
                <Hero
                  slides={gradientCarouselSlides}
                  autoPlay={true}
                  autoPlayInterval={5000}
                  pauseOnHover={true}
                  showNavigation={true}
                  showIndicators={true}
                  height="400px"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4">Manual Navigation Only</h3>
              <div className="bg-gray-900 p-4 rounded-2xl overflow-hidden">
                <p className="text-sm text-text-secondary mb-4">Carousel with auto-play disabled - manual navigation only</p>
                <Hero
                  slides={carouselSlides}
                  autoPlay={false}
                  showNavigation={true}
                  showIndicators={true}
                  height="400px"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4">Without Indicators</h3>
              <div className="bg-gray-900 p-4 rounded-2xl overflow-hidden">
                <p className="text-sm text-text-secondary mb-4">Carousel without slide indicators</p>
                <Hero
                  slides={carouselSlides}
                  autoPlay={true}
                  autoPlayInterval={4000}
                  showNavigation={true}
                  showIndicators={false}
                  height="400px"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4">Without Navigation Buttons</h3>
              <div className="bg-gray-900 p-4 rounded-2xl overflow-hidden">
                <p className="text-sm text-text-secondary mb-4">Carousel without navigation buttons (use indicators or keyboard arrows)</p>
                <Hero
                  slides={carouselSlides}
                  autoPlay={true}
                  autoPlayInterval={4000}
                  showNavigation={false}
                  showIndicators={true}
                  height="400px"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4">Fast Auto-play</h3>
              <div className="bg-gray-900 p-4 rounded-2xl overflow-hidden">
                <p className="text-sm text-text-secondary mb-4">Carousel with faster auto-play interval (2 seconds)</p>
                <Hero
                  slides={carouselSlides}
                  autoPlay={true}
                  autoPlayInterval={2000}
                  pauseOnHover={true}
                  showNavigation={true}
                  showIndicators={true}
                  height="400px"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4">Mixed Background Types</h3>
              <div className="bg-gray-900 p-4 rounded-2xl overflow-hidden">
                <p className="text-sm text-text-secondary mb-4">Carousel with different background types</p>
                <Hero
                  slides={[
                    {
                      backgroundType: 'solid',
                      backgroundValue: '#7F0000',
                      heading: 'Solid Background',
                      subtext: 'First slide with solid color',
                      buttonText: 'View',
                    },
                    {
                      backgroundType: 'gradient',
                      backgroundValue: HERO_GRADIENTS.contact,
                      heading: 'Gradient Background',
                      subtext: 'Second slide with gradient',
                      buttonText: 'Explore',
                    },
                    {
                      backgroundType: 'solid',
                      backgroundValue: '#00377F',
                      heading: 'Another Solid',
                      subtext: 'Third slide with different solid color',
                      buttonText: 'Discover',
                    },
                  ]}
                  autoPlay={true}
                  autoPlayInterval={4000}
                  showNavigation={true}
                  showIndicators={true}
                  height="400px"
                />
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  )
}

export default CarouselHero
