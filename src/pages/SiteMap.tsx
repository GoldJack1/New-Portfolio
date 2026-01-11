import { Link } from 'react-router-dom'
import { PADDING_CLASSES } from '../utils/paddingClasses'

interface PageLink {
  path: string
  label: string
  children?: PageLink[]
}

const SiteMap = () => {
  const pages: PageLink[] = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { 
      path: '/design-system', 
      label: 'Site Design System', 
      children: [
        { path: '/design-system/colors', label: 'Color Palette' },
        { path: '/design-system/typography', label: 'Typography' },
        { path: '/design-system/buttons', label: 'Buttons' },
        { path: '/design-system/form-controls', label: 'Form Controls' },
        { path: '/design-system/components', label: 'Components' },
        { path: '/design-system/padding', label: 'Padding' },
      ]
    },
    { path: '/privacy-policy', label: 'Privacy Policy' },
    { path: '/sitemap', label: 'Site Map' },
  ]

  return (
    <div className="w-full overflow-x-hidden">
      <section className={`w-full ${PADDING_CLASSES.page.full} bg-gray-50`}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 break-words">
          Site Map
        </h1>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All Pages</h2>
          <ul className="space-y-2">
            {pages.map((page) => (
              <li key={page.path} className="space-y-1">
                <Link
                  to={page.path}
                  className="text-lg text-gray-700 hover:text-gray-900 transition-colors underline"
                >
                  {page.label}
                </Link>
                {page.children && (
                  <ul className="ml-6 mt-2 space-y-1">
                    {page.children.map((child) => (
                      <li key={child.path}>
                        <Link
                          to={child.path}
                          className="text-base text-gray-600 hover:text-gray-900 transition-colors underline"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default SiteMap
