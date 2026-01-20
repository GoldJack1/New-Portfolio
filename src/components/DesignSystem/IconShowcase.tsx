import { iconMap } from '../../utils/iconMap'

const IconShowcase = () => {
  // Organize icons by category
  const iconCategories = {
    'Arrows': [
      'arrow-down',
      'arrow-left',
      'arrow-right',
      'arrow-up',
    ],
    'Chevrons': [
      'chevron-down',
      'chevron-left',
      'chevron-right',
      'chevron-up',
    ],
    'Status Indicators': [
      'checkmark',
      'checkmark-circle-filled',
      'checkmark-circle-outlined',
      'cross',
      'cross-circle-filled',
      'cross-circle-outlined',
    ],
    'Info': [
      'info-variant-1',
      'info-variant-2',
      'info-circle-filled-variant-1',
      'info-circle-filled-variant-2',
      'info-circle-outlined-variant-1',
      'info-circle-outlined-variant-2',
    ],
    'Navigation': [
      'hamburger-horizontal',
      'hamburger-vertical',
      'controls',
    ],
    'Actions': [
      'plus',
      'minus',
      'refresh',
      'bin-variant-3',
    ],
    'Search & Filter': [
      'search-variant-1',
      'search-variant-2',
      'filter-filled',
      'filter-outlined',
    ],
    'Stars & Ratings': [
      'star-filled',
      'star-outlined',
    ],
    'Edit': [
      'pen-filled',
      'pen-outlined',
      'pen-lr-filled',
      'pen-lr-outlined',
      'pen-rl-filled',
      'pen-rl-outlined',
    ],
    'Location': [
      'locate-filled',
      'locate-outlined',
      'map-simple',
      'station-marker',
      'station-pin',
    ],
    'Settings & Controls': [
      'settings-filled',
      'settings-outlined',
      'sort-by-horizontal',
      'sort-by-vertical',
    ],
    'Statistics': [
      'statistics-filled',
      'statistics-outlined',
    ],
  }

  const formatIconName = (key: string): string => {
    return key
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <section className="mb-16 w-full overflow-x-hidden">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-6 break-words">Icons</h2>
      <div className="space-y-8 bg-gray-900 p-6 sm:p-8 rounded-2xl w-full min-w-0">
        {Object.entries(iconCategories).map(([category, iconKeys]) => (
          <div key={category}>
            <h3 className="text-xl font-bold text-text-primary mb-4">{category}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {iconKeys.map((iconKey) => {
                const IconComponent = iconMap[iconKey as keyof typeof iconMap]
                if (!IconComponent) return null
                
                return (
                  <div
                    key={iconKey}
                    className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors"
                  >
                    <div className="w-8 h-8 flex items-center justify-center mb-2 text-text-primary">
                      <IconComponent className="w-full h-full" />
                    </div>
                    <span className="text-xs text-text-secondary text-center break-words">
                      {formatIconName(iconKey)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default IconShowcase
