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
          subtext: 'Get in touch with me. Feel free to reach out if you have any questions or would like to connect!',
        }]}
        height="100vh"
      />
    </div>
  )
}

export default Contact
