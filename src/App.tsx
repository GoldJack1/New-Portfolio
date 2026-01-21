import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AnimatedPage from './components/AnimatedPage'
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
import Padding from './pages/design-system/Padding'
import StaticHero from './pages/design-system/StaticHero'
import CarouselHero from './pages/design-system/CarouselHero'
import Icons from './pages/design-system/Icons'
import TestIcons from './pages/design-system/TestIcons'
import IconCalibration from './pages/design-system/IconCalibration'
import PrivacyPolicy from './pages/PrivacyPolicy'
import SiteMap from './pages/SiteMap'

/**
 * Check if device is mobile (matches Navigation.tsx breakpoint)
 */
function isMobile(): boolean {
  return typeof window !== 'undefined' && window.innerWidth <= 768
}

/**
 * Calculate the duration needed to scroll to top based on current scroll position
 * Uses different speeds for mobile vs desktop (mobile pages are typically longer)
 * @param scrollY - Current scroll position in pixels
 * @returns Duration in seconds
 */
function calculateScrollDuration(scrollY: number): number {
  if (scrollY <= 50) return 0 // No scroll needed
  
  const mobile = isMobile()
  
  // Mobile: slower speed since pages are longer and need more time
  // Desktop: faster speed since pages are typically shorter
  const SCROLL_SPEED = mobile ? 600 : 800 // pixels per second
  const MIN_DURATION = mobile ? 0.4 : 0.3 // minimum duration (mobile needs more time)
  const MAX_DURATION = mobile ? 2.0 : 1.5 // maximum duration (mobile pages can be very long)
  
  const duration = scrollY / SCROLL_SPEED
  return Math.max(MIN_DURATION, Math.min(MAX_DURATION, duration))
}

function AppRoutes() {
  const location = useLocation()
  const [height, setHeight] = useState<number>(0)
  const [transitionDelay, setTransitionDelay] = useState(0)
  const [shouldAnimateHeight, setShouldAnimateHeight] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const currentPathRef = useRef<string>(location.pathname)
  const isTransitioningRef = useRef<boolean>(false)
  const heightUpdateTimeoutRef = useRef<number | null>(null)
  const lastHeightRef = useRef<number>(0)
  const isInitialMountRef = useRef<boolean>(true)

  useEffect(() => {
    // Guard against rapid route changes
    if (isTransitioningRef.current) return
    isTransitioningRef.current = true
    
    // Detect if this is initial page load (refresh) vs navigation
    const isInitialMount = isInitialMountRef.current
    const isNavigation = currentPathRef.current !== location.pathname && !isInitialMount
    
    // Only animate height during navigation, not on initial page load
    setShouldAnimateHeight(isNavigation)
    
    // Mark that we're no longer on initial mount after first render
    if (isInitialMount) {
      isInitialMountRef.current = false
    }
    
    currentPathRef.current = location.pathname
    
    // Check if user needs to scroll to top
    const scrollY = window.scrollY || window.pageYOffset
    const needsScroll = scrollY > 50
    const mobile = isMobile()
    
    // Calculate scroll duration based on distance and device
    const scrollDuration = calculateScrollDuration(scrollY)
    const scrollDurationMs = scrollDuration * 1000
    
    // Base delay: mobile needs more time for page to render (longer pages)
    const baseRenderDelay = mobile ? 0.2 : 0.15
    const baseDelay = needsScroll ? scrollDuration : baseRenderDelay
    setTransitionDelay(baseDelay)
    
    // Wait for scroll to complete, then reset delay
    // Add small buffer to ensure scroll is truly complete
    const scrollCompleteBuffer = mobile ? 100 : 50 // Mobile needs more buffer
    const totalDelay = needsScroll ? scrollDurationMs + scrollCompleteBuffer : baseRenderDelay * 1000
    
    const delayTimeout = setTimeout(() => {
      // Verify scroll is actually complete before allowing transitions
      const currentScrollY = window.scrollY || window.pageYOffset
      if (currentScrollY > 10) {
        // Still scrolling, wait a bit more
        window.scrollTo(0, 0)
        setTimeout(() => {
          setTransitionDelay(0)
          isTransitioningRef.current = false
        }, 100)
      } else {
        setTransitionDelay(0)
        isTransitioningRef.current = false
      }
    }, totalDelay)
    
    // Ensure scroll position
    if (!needsScroll) {
      window.scrollTo(0, 0)
    }
    
    /**
     * Robust height measurement function
     * Handles flex layouts, min-height constraints, and edge cases
     */
    const measurePageHeight = (page: HTMLElement): number => {
      const pageDiv = page.firstElementChild as HTMLElement
      if (!pageDiv) return page.scrollHeight
      
      // Force layout recalculation
      void pageDiv.offsetHeight
      
      // Try multiple measurement strategies
      let measuredHeight = 0
      
      // Strategy 1: Measure from first to last child (most accurate for most layouts)
      const children = Array.from(pageDiv.children) as HTMLElement[]
      if (children.length > 0) {
        const lastChild = children[children.length - 1]
        
        const lastRect = lastChild.getBoundingClientRect()
        const pageRect = pageDiv.getBoundingClientRect()
        
        // Calculate height from page top to last element bottom
        measuredHeight = lastRect.bottom - pageRect.top
        
        // Add bottom margin of last child
        const lastChildStyle = window.getComputedStyle(lastChild)
        const marginBottom = parseInt(lastChildStyle.marginBottom) || 0
        measuredHeight += marginBottom
        
        // For flex layouts, also check scrollHeight
        const scrollHeight = pageDiv.scrollHeight
        if (scrollHeight > measuredHeight && scrollHeight > 0) {
          measuredHeight = scrollHeight
        }
      } else {
        // No children, use scrollHeight
        measuredHeight = pageDiv.scrollHeight
      }
      
      // Fallback: ensure we have a valid height
      if (measuredHeight <= 0) {
        measuredHeight = pageDiv.scrollHeight || page.scrollHeight || window.innerHeight
      }
      
      return measuredHeight
    }
    
    /**
     * Find the target page (entering page) using multiple strategies
     */
    const findTargetPage = (): HTMLElement | null => {
      if (!containerRef.current) return null
      
      const pages = Array.from(containerRef.current.querySelectorAll('[data-page-content]')) as HTMLElement[]
      if (pages.length === 0) return null
      
      // Strategy 1: Find by route path (most reliable)
      for (const page of pages) {
        const routePath = page.getAttribute('data-route-path')
        if (routePath === location.pathname) {
          return page
        }
      }
      
      // Strategy 2: Find by highest opacity (entering page is most visible)
      let maxOpacity = -1
      let mostVisiblePage: HTMLElement | null = null
      for (const page of pages) {
        const style = window.getComputedStyle(page)
        const opacity = parseFloat(style.opacity)
        if (opacity > maxOpacity) {
          maxOpacity = opacity
          mostVisiblePage = page
        }
      }
      
      // Strategy 3: Use last page in DOM (most recently mounted)
      return mostVisiblePage || pages[pages.length - 1] || null
    }
    
    /**
     * Update height with debouncing and validation
     */
    const updateHeight = () => {
      // Clear any pending updates
      if (heightUpdateTimeoutRef.current) {
        clearTimeout(heightUpdateTimeoutRef.current)
        heightUpdateTimeoutRef.current = null
      }
      
      const targetPage = findTargetPage()
      if (!targetPage) return
      
      // Wait for page to be visible before measuring
      const style = window.getComputedStyle(targetPage)
      const opacity = parseFloat(style.opacity)
      
      // If page is not visible yet, wait a bit
      if (opacity < 0.1) {
        heightUpdateTimeoutRef.current = window.setTimeout(updateHeight, 50)
        return
      }
      
      const newHeight = measurePageHeight(targetPage)
      
      // Only update if height changed significantly (prevents micro-adjustments)
      const heightDiff = Math.abs(newHeight - lastHeightRef.current)
      if (newHeight > 0 && (heightDiff > 5 || lastHeightRef.current === 0)) {
        lastHeightRef.current = newHeight
        setHeight(newHeight)
      }
    }
    
    /**
     * Debounced version for observers
     */
    const debouncedUpdateHeight = () => {
      if (heightUpdateTimeoutRef.current) {
        clearTimeout(heightUpdateTimeoutRef.current)
      }
      heightUpdateTimeoutRef.current = window.setTimeout(updateHeight, 50)
    }

    // Schedule initial height updates with proper delays
    // On initial mount, set height immediately without delays
    // Mobile needs more time for longer pages to render
    const baseUpdateDelay = mobile ? 200 : 150
    const initialDelay = isInitialMount ? 0 : (needsScroll ? scrollDurationMs + (mobile ? 100 : 50) : baseUpdateDelay)
    
    // Use requestAnimationFrame to ensure DOM is ready
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // First update - immediate on initial mount, delayed on navigation
        setTimeout(updateHeight, initialDelay)
        
        // Follow-up updates to catch any late-rendering content
        // Skip follow-ups on initial mount to avoid unnecessary updates
        if (!isInitialMount) {
          const followUpInterval = mobile ? 150 : 100
          setTimeout(updateHeight, initialDelay + followUpInterval)
          setTimeout(updateHeight, initialDelay + followUpInterval * 2)
          setTimeout(updateHeight, initialDelay + followUpInterval * 3)
        }
      })
    })
    
    // Set up observers
    const resizeObserver = new ResizeObserver(() => {
      debouncedUpdateHeight()
    })
    
    const observeAllPages = () => {
      const pages = containerRef.current?.querySelectorAll('[data-page-content]')
      pages?.forEach(page => resizeObserver.observe(page))
    }
    
    observeAllPages()
    
    const mutationObserver = new MutationObserver(() => {
      observeAllPages()
      debouncedUpdateHeight()
    })
    
    if (containerRef.current) {
      mutationObserver.observe(containerRef.current, {
        childList: true,
        subtree: true
      })
    }
    
    // Periodic updates - mobile needs more frequent checks for longer pages
    const updateInterval = mobile ? 150 : 100
    const interval = setInterval(debouncedUpdateHeight, updateInterval)
    
    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(delayTimeout)
      if (heightUpdateTimeoutRef.current) {
        clearTimeout(heightUpdateTimeoutRef.current)
      }
      clearInterval(interval)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      isTransitioningRef.current = false
    }
  }, [location.pathname])

  return (
    <motion.div 
      ref={containerRef}
      layout
      animate={{
        height: height > 0 ? `${height}px` : 'auto'
      }}
      transition={{
        duration: shouldAnimateHeight ? 0.3 : 0, // No animation on initial page load
        delay: shouldAnimateHeight ? transitionDelay : 0, // No delay on initial load
        ease: [0.4, 0, 0.2, 1],
        layout: {
          duration: shouldAnimateHeight ? 0.3 : 0, // No layout animation on initial load
          delay: shouldAnimateHeight ? transitionDelay : 0,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
      style={{ 
        position: 'relative', 
        width: '100%',
        overflow: 'hidden'
      }}
    >
      <AnimatePresence initial={false}>
        <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/projects" element={<AnimatedPage><Projects /></AnimatedPage>} />
        <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
        <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
        <Route path="/design-system" element={<AnimatedPage><SiteDesignSystem /></AnimatedPage>} />
        <Route path="/design-system/colors" element={<AnimatedPage><Colors /></AnimatedPage>} />
        <Route path="/design-system/typography" element={<AnimatedPage><Typography /></AnimatedPage>} />
        <Route path="/design-system/buttons" element={<AnimatedPage><Buttons /></AnimatedPage>} />
        <Route path="/design-system/form-controls" element={<AnimatedPage><FormControls /></AnimatedPage>} />
        <Route path="/design-system/components" element={<AnimatedPage><Components /></AnimatedPage>} />
        <Route path="/design-system/padding" element={<AnimatedPage><Padding /></AnimatedPage>} />
        <Route path="/design-system/icons" element={<AnimatedPage><Icons /></AnimatedPage>} />
        <Route path="/design-system/stroke-based-icons" element={<AnimatedPage><TestIcons /></AnimatedPage>} />
        <Route path="/design-system/icon-calibration" element={<AnimatedPage><IconCalibration /></AnimatedPage>} />
        <Route path="/design-system/static-hero" element={<AnimatedPage><StaticHero /></AnimatedPage>} />
        <Route path="/design-system/carousel-hero" element={<AnimatedPage><CarouselHero /></AnimatedPage>} />
        <Route path="/privacy-policy" element={<AnimatedPage><PrivacyPolicy /></AnimatedPage>} />
        <Route path="/sitemap" element={<AnimatedPage><SiteMap /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
    </motion.div>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
        <Navigation />
        <main className="flex-grow w-full overflow-x-hidden relative">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
