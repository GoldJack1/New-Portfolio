import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    // Scroll happens synchronously before browser paint
    // This ensures scroll starts before page transition animation
    const scrollY = window.scrollY || window.pageYOffset
    
    if (scrollY > 50) {
      // User is scrolled down - smooth scroll to top
      // This will start immediately, before any animations
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    } else {
      // Already at top - ensure we're at position 0 (in case of rounding errors)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      })
    }
  }, [pathname])

  return null
}

export default ScrollToTop
