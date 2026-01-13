import Hero from '../components/ui/Hero'
import { HERO_GRADIENTS } from '../utils/heroGradients'

const About = () => {
  return (
    <div className="w-full overflow-x-hidden bg-gray-1000 min-h-screen flex flex-col">
      <Hero
        slides={[{
          backgroundType: 'gradient',
          backgroundValue: HERO_GRADIENTS.about,
          heading: 'About',
          subtext: "This page is under construction, please check back soon for updates.",
        }]}
        height="100vh"
      />
    </div>
  )
}

export default About
