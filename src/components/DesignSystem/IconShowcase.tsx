import { useState } from 'react'
import { Icon, getStrokeIconNames, type StrokeIconName, type IconWeight } from '../ui/Icon'

// Static icons use pre-generated SVG files (no path data in code)
const STATIC_ICON_NAMES: StrokeIconName[] = ['star', 'info-circle', 'help-circle']

// Social Media Icon Components (from Footer.tsx)
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="currentColor" viewBox="0 0 16 16">
    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="currentColor" viewBox="0 0 16 16">
    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
  </svg>
)

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"/>
  </svg>
)

const BlueskyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="currentColor" viewBox="0 0 16 16">
    <path d="M3.468 1.948C5.303 3.325 7.276 6.118 8 7.616c.725-1.498 2.698-4.29 4.532-5.668C13.855.955 16 .186 16 2.632c0 .489-.28 4.105-.444 4.692-.572 2.04-2.653 2.561-4.504 2.246 3.236.551 4.06 2.375 2.281 4.2-3.376 3.464-4.852-.87-5.23-1.98-.07-.204-.103-.3-.103-.218 0-.081-.033.014-.102.218-.379 1.11-1.855 5.444-5.231 1.98-1.778-1.825-.955-3.65 2.28-4.2-1.85.315-3.932-.205-4.503-2.246C.28 6.737 0 3.12 0 2.632 0 .186 2.145.955 3.468 1.948"/>
  </svg>
)

const ThreadsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="currentColor" viewBox="0 0 16 16">
    <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161"/>
  </svg>
)

// Social icons data
const socialIcons = [
  { name: 'LinkedIn', component: LinkedInIcon },
  { name: 'X (Twitter)', component: TwitterIcon },
  { name: 'Instagram', component: InstagramIcon },
  { name: 'YouTube', component: YouTubeIcon },
  { name: 'Bluesky', component: BlueskyIcon },
  { name: 'Threads', component: ThreadsIcon },
]

const IconShowcase = () => {
  const allStrokeIconNames = getStrokeIconNames()
  const staticIconNames = allStrokeIconNames.filter((name) => STATIC_ICON_NAMES.includes(name as (typeof STATIC_ICON_NAMES)[number]))
  const dynamicStrokeIconNames = allStrokeIconNames.filter((name) => !STATIC_ICON_NAMES.includes(name as (typeof STATIC_ICON_NAMES)[number]))
  const [strokeWeight, setStrokeWeight] = useState<IconWeight>(400)

  const formatIconName = (key: string): string => {
    return key
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const weightLabels: Record<IconWeight, string> = {
    100: 'Thin',
    200: 'ExtraLight',
    300: 'Light',
    400: 'Regular',
    500: 'Medium',
    600: 'SemiBold',
    700: 'Bold',
    800: 'ExtraBold',
    900: 'Black',
  }

  return (
    <section className="mb-16 w-full overflow-x-hidden">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-6 break-words">Icons</h2>
      <div className="space-y-8 bg-gray-900 p-6 sm:p-8 rounded-2xl w-full min-w-0">
        
        {/* Static Icons */}
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-2">Static</h3>
          <p className="text-sm text-text-secondary mb-4">
            Pre-generated SVG files per size and weight. Picked at runtime from public/icons (star, info-circle, help-circle).
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 p-4 bg-gray-800 rounded-xl">
            <label className="text-sm text-text-secondary whitespace-nowrap">
              Weight: <span className="text-text-primary font-medium">{strokeWeight} ({weightLabels[strokeWeight]})</span>
            </label>
            <input
              type="range"
              min="100"
              max="900"
              step="100"
              value={strokeWeight}
              onChange={(e) => setStrokeWeight(Number(e.target.value) as IconWeight)}
              className="flex-1 w-full sm:w-auto accent-text-primary"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {staticIconNames.map((iconName) => (
              <div
                key={iconName}
                className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors"
              >
                <div className="w-8 h-8 flex items-center justify-center mb-2 text-text-primary">
                  <Icon name={iconName as StrokeIconName} weight={strokeWeight} size={24} />
                </div>
                <span className="text-xs text-text-secondary text-center break-words">
                  {formatIconName(iconName)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Stroke CSS */}
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-2">Dynamic Stroke CSS</h3>
          <p className="text-sm text-text-secondary mb-4">
            Path data in code; stroke width and scale come from CSS/weight. Used in buttons, navigation, and UI controls. Compound shapes (circled icons) shrink inner elements as stroke weight increases.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 p-4 bg-gray-800 rounded-xl">
            <label className="text-sm text-text-secondary whitespace-nowrap">
              Weight: <span className="text-text-primary font-medium">{strokeWeight} ({weightLabels[strokeWeight]})</span>
            </label>
            <input
              type="range"
              min="100"
              max="900"
              step="100"
              value={strokeWeight}
              onChange={(e) => setStrokeWeight(Number(e.target.value) as IconWeight)}
              className="flex-1 w-full sm:w-auto accent-text-primary"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {dynamicStrokeIconNames.map((iconName) => (
              <div
                key={iconName}
                className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors"
              >
                <div className="w-8 h-8 flex items-center justify-center mb-2 text-text-primary">
                  <Icon name={iconName as StrokeIconName} weight={strokeWeight} size={24} />
                </div>
                <span className="text-xs text-text-secondary text-center break-words">
                  {formatIconName(iconName)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-2">Social Media Icons</h3>
          <p className="text-sm text-text-secondary mb-4">
            Brand icons used in the footer for social media links.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {socialIcons.map(({ name, component: SocialIcon }) => (
              <div
                key={name}
                className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors"
              >
                <div className="w-8 h-8 flex items-center justify-center mb-2 text-text-primary">
                  <SocialIcon />
                </div>
                <span className="text-xs text-text-secondary text-center break-words">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default IconShowcase
