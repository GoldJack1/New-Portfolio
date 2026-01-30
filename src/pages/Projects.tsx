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
      subtext: "A Branding & App Concept for GBR, Designed in April 2025, before the actual branding was revealed.",
      caption: "(Full Project Page & more coming soon, in the meantime, you can check out the app prototype in Figma)",
      buttonText: 'View Prototype in Figma',
      buttonLink: 'https://www.figma.com/proto/FkHh8mUk0VdeWrYTuB5TvW/GBR-App-Concept?page-id=0%3A1&node-id=926-16114&p=f&t=O3dJI1ieVvsrb1CN-0&scaling=scale-down&content-scaling=fixed&starting-point-node-id=926%3A16114&show-proto-sidebar=1',
    },
    {
      backgroundType: 'image',
      backgroundValue: project2Image,
      fallbackBackground: HERO_GRADIENTS.projects,
      heading: 'Rail Statistics',
      subtext: "A functional app, for train enthusiasts to track stations visited across Great Britain and train tickets.",
      caption: "(Major Update & Android Relase coming February 2026)",
      buttonText: 'Download Beta App',
      buttonLink: 'https://linktr.ee/Railstatistics',
    },
    {
      backgroundType: 'video',
      backgroundValue: project3Video,
      heading: 'INTERNET + TELETEXT = WEBTEXT',
      subtext: 'A retro-inspired concept blending the nostalgia of teletext with the use of todays modern web.',
      buttonText: 'View on Youtube',
      buttonLink: 'https://youtu.be/uCOQdq30EuQ?si=njU-BTOkkkIk_O5Y',
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
