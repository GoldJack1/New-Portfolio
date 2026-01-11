import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navigation = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Home', mobileLabel: 'Home' },
    { path: '/projects', label: 'Projects', mobileLabel: 'Projects' },
    { path: '/about', label: 'About', mobileLabel: 'About' },
    { path: '/contact', label: 'Contact', mobileLabel: 'Contact' },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-gray-400 shadow-sm w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center py-4 gap-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  px-6 py-2 rounded-full transition-all duration-200 text-sm md:text-base
                  ${
                    isActive
                      ? 'bg-gray-800 text-gray-50 shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }
                `}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          {/* Mobile Header with Hamburger */}
          <div className="flex items-center justify-between py-3">
            <h2 className="text-lg font-bold text-gray-900">Menu</h2>
            <button
              onClick={toggleMobileMenu}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-300 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="pb-4 space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`
                      block w-full px-4 py-3 rounded-full transition-all duration-200 text-base
                      ${
                        isActive
                          ? 'bg-gray-800 text-gray-50 shadow-md'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }
                    `}
                  >
                    {item.mobileLabel}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
