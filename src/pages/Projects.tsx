import Hero, { HeroSlide } from '../components/ui/Hero'
import { HERO_GRADIENTS } from '../utils/heroGradients'

const Projects = () => {
  const projectSlides: HeroSlide[] = [
    {
      backgroundType: 'gradient',
      backgroundValue: HERO_GRADIENTS.projects,
      heading: 'Project 1',
      subtext: 'Description of project 1 goes here.',
      buttonText: 'View Project',
    },
    {
      backgroundType: 'gradient',
      backgroundValue: HERO_GRADIENTS.projects,
      heading: 'Project 2',
      subtext: 'Description of project 2 goes here.',
      buttonText: 'View Project',
    },
    {
      backgroundType: 'gradient',
      backgroundValue: HERO_GRADIENTS.projects,
      heading: 'Project 3',
      subtext: 'Description of project 3 goes here.',
      buttonText: 'View Project',
    },
  ]

  return (
    <div className="w-full overflow-x-hidden bg-gray-1000 min-h-screen flex flex-col">
      <Hero
        slides={projectSlides}
        autoPlay={true}
        autoPlayInterval={5000}
        pauseOnHover={true}
        showNavigation={true}
        showIndicators={true}
        height="100vh"
      />
    </div>
  )
}

export default Projects
