import { motion } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface AnimatedPageProps {
  children: ReactNode
}

/**
 * Check if device is mobile (matches Navigation.tsx breakpoint)
 */
function isMobile(): boolean {
  return typeof window !== 'undefined' && window.innerWidth <= 768
}

/**
 * Calculate the duration needed to scroll to top based on current scroll position
 * Uses different speeds for mobile vs desktop (mobile pages are typically longer)
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

const AnimatedPage = ({ children }: AnimatedPageProps) => {
  const location = useLocation()
  const [animationDelay, setAnimationDelay] = useState(0)
  
  useEffect(() => {
    // Check if user needs to scroll to top
    const scrollY = window.scrollY || window.pageYOffset
    const needsScroll = scrollY > 50 // Threshold: if scrolled more than 50px, delay animation
    const mobile = isMobile()
    
    if (needsScroll) {
      // Calculate scroll duration based on distance and device
      const scrollDuration = calculateScrollDuration(scrollY)
      // Add small buffer to ensure scroll completes before animation starts
      const buffer = mobile ? 0.1 : 0.05
      setAnimationDelay(scrollDuration + buffer)
    } else {
      // User is already at top - small delay on mobile for page render
      const baseDelay = mobile ? 0.05 : 0
      setAnimationDelay(baseDelay)
    }
  }, [location.pathname])
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.3,
        delay: animationDelay, // Conditional delay based on scroll position
        ease: [0.4, 0, 0.2, 1]
      }}
      className="w-full"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        minHeight: '100%'
      }}
      data-page-content
      data-route-path={location.pathname}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedPage
