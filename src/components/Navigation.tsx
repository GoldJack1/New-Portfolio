import { useRef, useLayoutEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { getStrokeWidth } from '../config/iconWeights'

// Animated hamburger/cross icon component
const AnimatedMenuIcon = ({ isOpen, size = 13, weight = 400 }: { isOpen: boolean; size?: number; weight?: number }) => {
  // Get stroke width in viewBox units (32x32)
  const strokeWidth = getStrokeWidth(weight)
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      style={{ overflow: 'visible' }}
    >
      {/* Top line - rotates to become part of X */}
      <line
        x1="1.11"
        y1={isOpen ? "1.11" : "5.052"}
        x2="30.89"
        y2={isOpen ? "30.89" : "5.052"}
        strokeWidth={strokeWidth}
        style={{
          transition: 'all 300ms ease-in-out',
          transformOrigin: 'center',
        }}
      />
      {/* Middle line - fades out */}
      <line
        x1="1.11"
        y1="16"
        x2="30.89"
        y2="16"
        strokeWidth={strokeWidth}
        style={{
          transition: 'all 300ms ease-in-out',
          opacity: isOpen ? 0 : 1,
        }}
      />
      {/* Bottom line - rotates to become part of X */}
      <line
        x1={isOpen ? "1.11" : "1.11"}
        y1={isOpen ? "30.89" : "26.948"}
        x2={isOpen ? "30.89" : "30.89"}
        y2={isOpen ? "1.11" : "26.948"}
        strokeWidth={strokeWidth}
        style={{
          transition: 'all 300ms ease-in-out',
          transformOrigin: 'center',
        }}
      />
    </svg>
  )
}

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

// Page title mapping for all pages
const pageTitles: Record<string, string> = {
  '/': 'Home',
  '/projects': 'Projects',
  '/about': 'About',
  '/contact': 'Contact',
  '/design-system': 'Site Design System',
  '/design-system/colors': 'Color Palette',
  '/design-system/typography': 'Typography',
  '/design-system/buttons': 'Buttons',
  '/design-system/form-controls': 'Form Controls',
  '/design-system/components': 'Components',
  '/design-system/padding': 'Padding',
  '/design-system/icons': 'Icons',
  '/design-system/test-icons': 'Test Icons',
  '/privacy-policy': 'Privacy Policy',
  '/sitemap': 'Site Map',
}

// Helper function to check if we're on a main page (one of the four main nav items)
const isMainPage = (pathname: string): boolean => {
  return (
    pathname === '/' ||
    pathname === '/projects' ||
    pathname.startsWith('/projects/') ||
    pathname === '/about' ||
    pathname === '/contact'
  )
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  
  useLayoutEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return isMobile
}

const Navigation = () => {
  const indicatorRef = useRef<HTMLDivElement>(null)
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const location = useLocation()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showGradient, setShowGradient] = useState(false)

  // Reset menu state when switching between mobile and desktop
  useLayoutEffect(() => {
    setMenuOpen(false)
    // Force layout recalculation on breakpoint change
    if (isMobile) {
      // Small delay to ensure DOM has updated
      requestAnimationFrame(() => {
        document.body.offsetHeight // Force reflow
      })
    }
  }, [isMobile])

  // Track scroll position to show/hide gradient
  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      // Navbar height (~45px) + 40px = 85px threshold
      setShowGradient(scrollY > 85)
    }

    // Check initial scroll position
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useLayoutEffect(() => {
    if (isMobile) return

    let animationFrame: number | undefined
    let fontLoadListener: (() => void) | undefined

    function updateIndicator() {
      // Only show indicator on main pages
      if (!isMainPage(location.pathname)) {
        if (indicatorRef.current) {
          indicatorRef.current.style.display = 'none'
        }
        return
      }
      
      if (indicatorRef.current) {
        indicatorRef.current.style.display = 'block'
      }
      
      const activeIdx = navItems.findIndex((item) => {
        if (item.to === '/projects') {
          return location.pathname === '/projects' || location.pathname.startsWith('/projects/')
        }
        return item.to === location.pathname
      })
      const activeLink = navRefs.current[activeIdx]
      const navBg = activeLink?.parentElement
      if (activeLink && navBg && indicatorRef.current) {
        const navRect = navBg.getBoundingClientRect()
        const linkRect = activeLink.getBoundingClientRect()
        // Set a minimum width (e.g., 60px) to prevent shrinking
        const minWidth = 60
        const width = Math.max(linkRect.width, minWidth)
        // Match the height of the button
        const height = linkRect.height
        indicatorRef.current.style.left = linkRect.left - navRect.left + 'px'
        indicatorRef.current.style.width = width + 'px'
        indicatorRef.current.style.height = height + 'px'
      }
    }

    function handleUpdate() {
      // Use requestAnimationFrame to ensure layout is stable
      animationFrame = requestAnimationFrame(updateIndicator)
    }

    // Initial update
    handleUpdate()
    // Update on window resize
    window.addEventListener('resize', handleUpdate)

    // Update after fonts are loaded (if browser supports it)
    if (document.fonts && document.fonts.ready) {
      fontLoadListener = () => handleUpdate()
      document.fonts.ready.then(fontLoadListener)
    }

    return () => {
      window.removeEventListener('resize', handleUpdate)
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame)
      // No need to remove fontLoadListener as it's a one-time promise
    }
  }, [location.pathname, isMobile])

  // Get current page title - show for all pages
  const getCurrentTitle = () => {
    // Check exact match first
    if (pageTitles[location.pathname]) {
      return pageTitles[location.pathname]
    }
    // For projects sub-pages, show "Projects"
    if (location.pathname.startsWith('/projects/')) {
      return 'Projects'
    }
    // Fallback to empty string if no match
    return ''
  }
  const currentTitle = getCurrentTitle()

  if (isMobile) {
    return (
      <div key="mobile-nav" className={`nav-wrapper mobile-nav-wrapper ${showGradient ? 'gradient-visible' : ''}`}>
        <nav className="nav-bg mobile-nav-bg">
          <div className={`mobile-pill ${menuOpen ? 'menu-open' : ''}`}>
            <span className="mobile-pill-title">{currentTitle}</span>
            <button
              className="mobile-hamburger"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <AnimatedMenuIcon isOpen={menuOpen} weight={400} size={13} />
            </button>
          </div>
          {menuOpen && (
            <div className="mobile-dropdown">
              {navItems.map((item) => {
                // Only show active state on main pages
                let isActive = false
                if (isMainPage(location.pathname)) {
                  if (item.to === '/projects') {
                    isActive = location.pathname === '/projects' || location.pathname.startsWith('/projects/')
                  } else {
                    isActive = item.to === location.pathname
                  }
                }
                return (
                  <button
                    key={item.to}
                    className={
                      'mobile-dropdown-link' + (isActive ? ' active' : '')
                    }
                    onClick={() => {
                      setMenuOpen(false)
                      navigate(item.to)
                    }}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          )}
        </nav>
      </div>
    )
  }

  // Desktop nav
  return (
    <div key="desktop-nav" className={`nav-wrapper ${showGradient ? 'gradient-visible' : ''}`}>
      <nav className="nav-bg" role="navigation" aria-label="Main navigation">
        <div className="nav-indicator" ref={indicatorRef} aria-hidden="true"></div>
        {navItems.map((item, idx) => {
          // Only show active state on main pages
          let isActive = false
          if (isMainPage(location.pathname)) {
            if (item.to === '/projects') {
              isActive = location.pathname === '/projects' || location.pathname.startsWith('/projects/')
            } else {
              isActive = item.to === location.pathname
            }
          }
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={'nav-link font-geologica font-medium text-base' + (isActive ? ' active' : '')}
              ref={(el) => (navRefs.current[idx] = el)}
              end={item.to === '/'}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}

export default Navigation
