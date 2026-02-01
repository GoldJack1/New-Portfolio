import Hero from '../components/ui/Hero'
import { HERO_GRADIENTS } from '../utils/heroGradients'
import homeImage from '../assets/images/home/IMG_6734.jpg'

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden bg-gray-1000 min-h-screen flex flex-col">
      <Hero
        slides={[{
          backgroundType: 'image',
          backgroundValue: homeImage,
          fallbackBackground: HERO_GRADIENTS.home,
          heading: 'Welcome to my portfolio!',
          subtext: 'This website is currently under construction, please check back soon for updates. In the meantime, you can check out some of my recent projects.',
          caption: '(Will hopefully be completed by Spring 2026)',
        }]}
        height="100vh"
      />
    </div>
  )
}

export default Home
