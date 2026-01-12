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
    <div className="w-full overflow-x-hidden bg-gray-1000 min-h-screen flex flex-col pt-[150px]">
      <section className={`w-full ${PADDING_CLASSES.page.full} flex-grow flex flex-col`}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary mb-8 break-words">
          Site Map
        </h1>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-text-primary mb-4">All Pages</h2>
          <ul className="space-y-2">
            {pages.map((page) => (
              <li key={page.path} className="space-y-1">
                <Link
                  to={page.path}
                  className="text-lg text-text-primary hover:text-text-primary transition-colors underline"
                >
                  {page.label}
                </Link>
                {page.children && (
                  <ul className="ml-6 mt-2 space-y-1">
                    {page.children.map((child) => (
                      <li key={child.path}>
                        <Link
                          to={child.path}
                          className="text-base text-text-secondary hover:text-text-primary transition-colors underline"
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
