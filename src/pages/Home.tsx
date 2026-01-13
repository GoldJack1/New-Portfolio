import Hero from '../components/ui/Hero'
import { HERO_GRADIENTS } from '../utils/heroGradients'

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden bg-gray-1000 min-h-screen flex flex-col">
      <Hero
        slides={[{
          backgroundType: 'gradient',
          backgroundValue: HERO_GRADIENTS.home,
          heading: 'Jack Wingate',
          subtext: 'Welcome to my portfolio. Explore my projects, learn about me, and get in touch.',
        }]}
        height="100vh"
      />
    </div>
  )
}

export default Home
