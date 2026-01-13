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
          subtext: "Welcome to my portfolio! I'm Jack Wingate, and this is where I showcase my work and share a bit about myself. I'm passionate about creating beautiful, functional web experiences that make a difference. Feel free to explore my projects and reach out if you'd like to connect!",
        }]}
        height="100vh"
      />
    </div>
  )
}

export default About
