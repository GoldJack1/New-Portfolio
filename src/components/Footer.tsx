import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com', label: 'GitHub' },
    { icon: FaLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: FaEnvelope, url: 'mailto:jack@example.com', label: 'Email' },
  ]

  const footerLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]

  const otherLinks = [
    { path: '/design-system', label: 'Site Design' },
    { path: '/privacy-policy', label: 'Privacy Policy' },
    { path: '/sitemap', label: 'Site Map' },
  ]

  return (
    <footer className="bg-gray-200 text-gray-700 py-8 px-4 md:px-8 w-full overflow-x-hidden">
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 w-full min-w-0">
          {/* Left side - Name, Copyright, Social Icons, and Links */}
          <div className="flex flex-col min-w-0 gap-4 flex-1">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 break-words">Jack Wingate</h3>
              <p className="text-xs sm:text-sm text-gray-600 break-words mb-4">
                © {currentYear} Jack Wingate. All rights reserved.
              </p>
              
              {/* Social Media Icons - Below copyright on mobile, on right on desktop */}
              <div className="flex gap-4 md:hidden">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-400 transition-colors"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Links - Side by Side */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              {/* Footer Links - Stacked Vertically */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-900">Page Links:</span>
                {footerLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Other Links - Stacked Vertically */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-900">Other Links:</span>
                {otherLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Social Media Icons (Desktop only) */}
          <div className="hidden md:flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-400 transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
