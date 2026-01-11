import { Link } from 'react-router-dom'

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
      ]
    },
    { path: '/privacy-policy', label: 'Privacy Policy' },
    { path: '/sitemap', label: 'Site Map' },
  ]

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24 w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 break-words">
          Site Map
        </h1>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">All Pages</h2>
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
