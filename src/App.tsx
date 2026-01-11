import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import SiteDesignSystem from './pages/SiteDesignSystem'
import Colors from './pages/design-system/Colors'
import Typography from './pages/design-system/Typography'
import Buttons from './pages/design-system/Buttons'
import FormControls from './pages/design-system/FormControls'
import Components from './pages/design-system/Components'
import PrivacyPolicy from './pages/PrivacyPolicy'
import SiteMap from './pages/SiteMap'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-gray-200">
        <Navigation />
        <main className="flex-grow w-full overflow-x-hidden bg-gray-200">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/design-system" element={<SiteDesignSystem />} />
            <Route path="/design-system/colors" element={<Colors />} />
            <Route path="/design-system/typography" element={<Typography />} />
            <Route path="/design-system/buttons" element={<Buttons />} />
            <Route path="/design-system/form-controls" element={<FormControls />} />
            <Route path="/design-system/components" element={<Components />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/sitemap" element={<SiteMap />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
