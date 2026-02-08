import Hero from '../components/ui/Hero'
import { HERO_GRADIENTS } from '../utils/heroGradients'

// Served from public/ so the same URL works locally and on Netlify (avoids build/path issues)
const HOME_IMAGE_URL = '/images/home/IMG_6734.JPG'

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden bg-gray-1000 min-h-screen flex flex-col">
      <Hero
        slides={[{
          backgroundType: 'image',
          backgroundValue: HOME_IMAGE_URL,
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
