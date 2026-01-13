import Hero, { HeroSlide } from '../components/ui/Hero'
import { HERO_GRADIENTS } from '../utils/heroGradients'
import project1Image from '../assets/images/projects/Hero Imgs/Project 1.jpg'
import project2Image from '../assets/images/projects/Hero Imgs/Project 2.jpg'
import project3Video from '../assets/images/projects/Hero Imgs/Project 3.mp4'

const Projects = () => {
  const projectSlides: HeroSlide[] = [
    {
      backgroundType: 'image',
      backgroundValue: project1Image,
      fallbackBackground: HERO_GRADIENTS.projects,
      heading: 'Great British Railways',
      subtext: "A new era for Britain's Railways, uniting track and Train under one brand.",
      buttonText: 'View Project',
    },
    {
      backgroundType: 'image',
      backgroundValue: project2Image,
      fallbackBackground: HERO_GRADIENTS.projects,
      heading: 'Rail Statistics',
      subtext: "A functional app, for train enthusiasts to track stations visited across Great Britain and train tickets.",
      caption: "(Major Update & Android Relase coming February 2026)",
      buttonText: 'View Project',
    },
    {
      backgroundType: 'video',
      backgroundValue: project3Video,
      heading: 'IN TERNET + TELETEXT = WEBTEXT',
      subtext: 'A retro-inspired concept blending the nostalgia of teletext with the use of todays modern web.',
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
