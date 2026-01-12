import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'
import { PADDING_CLASSES } from '../utils/paddingClasses'

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
    <footer 
      className="bg-gray-1000 text-gray-300 w-full relative"
      style={{
        paddingTop: '2rem',
        paddingBottom: '2rem',
        marginBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className={`w-full ${PADDING_CLASSES.footer.horizontal} relative z-10`}>
        <div className="flex flex-col gap-6 w-full min-w-0">
          {/* Row 1: Copyright on far left, Social icons on far right */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 w-full">
            {/* Copyright Section - Far Left */}
            <div className="flex flex-col gap-[5px] justify-start items-start h-fit" style={{ flexDirection: 'column' }}>
              <h3 className="text-lg sm:text-xl font-normal text-text-primary mb-0 break-words" style={{ height: '25px' }}>Jack Wingate</h3>
              <p className="text-xs sm:text-sm font-thin text-text-tertiary break-words mb-0" style={{ height: '16px' }}>
                © {currentYear} Jack Wingate. All rights reserved.
              </p>
            </div>
            
            {/* Social Media Icons - Far Right */}
            <div className="flex gap-4 justify-end items-start pt-1 h-[46px]">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-text-primary hover:bg-gray-600 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Row 2: Page Links (100px wide) and Other Links (fixed 100px width) */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            {/* Footer Links - Stacked Vertically, 100px wide */}
            <div className="flex flex-col gap-2" style={{ width: '150px' }}>
              <span className="text-sm font-normal text-text-secondary">Page Links:</span>
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-text-primary hover:text-text-primary transition-colors font-extralight"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Other Links - Stacked Vertically, fixed 100px width */}
            <div className="flex flex-col gap-2" style={{ width: '100px' }}>
              <span className="text-sm font-normal text-text-secondary">Other Links:</span>
              {otherLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-text-primary hover:text-text-primary transition-colors font-extralight"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
