import Hero from '../components/ui/Hero'
import { HERO_GRADIENTS } from '../utils/heroGradients'

const Contact = () => {
  return (
    <div className="w-full overflow-x-hidden bg-gray-1000 min-h-screen flex flex-col">
      <Hero
        slides={[{
          backgroundType: 'gradient',
          backgroundValue: HERO_GRADIENTS.contact,
          heading: 'Contact',
          subtext: "This page is under construction, please check back soon for updates.",
        }]}
        height="100vh"
      />
    </div>
  )
}

export default Contact
