import React, { useState } from 'react'
import Button from '../ui/Button'
import Select from '../ui/Select'
import { Icon, StrokeIconName } from '../ui/Icon'
import { 
  JWPCheckmarkCircleFilled,
  JWPCrossCircleFilled,
  JWPInfoCircleFilled2,
  JWPSearch1,
} from '../../utils/iconMap'

// Stroke icon names for dynamic generation
const strokeIconNames: { value: StrokeIconName; label: string }[] = [
  { value: 'plus', label: 'Plus' },
  { value: 'minus', label: 'Minus' },
  { value: 'cross', label: 'Cross' },
  { value: 'chevron-left', label: 'Chevron Left' },
  { value: 'chevron-right', label: 'Chevron Right' },
  { value: 'hamburger', label: 'Hamburger' },
]

// Legacy filled icons
const legacyIconComponents: Record<string, React.ReactElement> = {
  'checkmark-circle-filled': <JWPCheckmarkCircleFilled />,
  'cross-circle-filled': <JWPCrossCircleFilled />,
  'info-circle-filled': <JWPInfoCircleFilled2 />,
  'search': <JWPSearch1 />,
}

const legacyIconOptions = [
  { value: 'checkmark-circle-filled', label: 'Checkmark Circle (Filled)' },
  { value: 'cross-circle-filled', label: 'Cross Circle (Filled)' },
  { value: 'info-circle-filled', label: 'Info Circle (Filled)' },
  { value: 'search', label: 'Search' },
]

const weightOptions = [
  { value: '100', label: '100 (Thin)' },
  { value: '200', label: '200 (ExtraLight)' },
  { value: '300', label: '300 (Light)' },
  { value: '400', label: '400 (Regular)' },
  { value: '500', label: '500 (Medium)' },
  { value: '600', label: '600 (SemiBold)' },
  { value: '700', label: '700 (Bold)' },
  { value: '800', label: '800 (ExtraBold)' },
  { value: '900', label: '900 (Black)' },
]

const insetOptions = [
  { value: '0', label: '0 (None)' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
]

const widthModeOptions = [
  { value: 'fixed', label: 'Fixed (min-width)' },
  { value: 'hug', label: 'Hug Contents' },
]

const iconSizeOptions = [
  { value: '13', label: '13px (Cap-height)' },
  { value: '16', label: '16px' },
  { value: '20', label: '20px' },
]

const ButtonShowcase = () => {
  // Icon-only button state
  const [iconOnlyStrokeIcon, setIconOnlyStrokeIcon] = useState<StrokeIconName>('plus')
  const [iconOnlyLegacyIcon, setIconOnlyLegacyIcon] = useState('')
  const [iconOnlyWeight, setIconOnlyWeight] = useState(400)
  const [iconOnlySize, setIconOnlySize] = useState(20)
  const [iconOnlyInset, setIconOnlyInset] = useState(0)
  const [iconOnlyWeightHovered, setIconOnlyWeightHovered] = useState(false)
  
  // Button with icon state
  const [selectedStrokeIcon, setSelectedStrokeIcon] = useState<StrokeIconName>('chevron-left')
  const [selectedLegacyIcon, setSelectedLegacyIcon] = useState('')
  const [iconWeight, setIconWeight] = useState(400)
  const [iconSize, setIconSize] = useState(13)
  const [textWeight, setTextWeight] = useState(400)
  const [buttonText, setButtonText] = useState('Button with Icon')
  const [iconInset, setIconInset] = useState(0)
  const [iconGap, setIconGap] = useState(6)
  const [widthMode, setWidthMode] = useState<'fixed' | 'hug'>('fixed')
  const [withIconWeightHovered, setWithIconWeightHovered] = useState(false)

  // Generate the icon based on current settings
  const getDemoIcon = () => {
    if (selectedLegacyIcon) {
      return legacyIconComponents[selectedLegacyIcon]
    }
    if (selectedStrokeIcon) {
      return <Icon name={selectedStrokeIcon} weight={iconWeight} size={iconSize} inset={iconInset} />
    }
    return undefined
  }

  const demoIcon = getDemoIcon()

  // Generate the icon for icon-only buttons
  const getIconOnlyIcon = (forWeightVariant = false) => {
    if (iconOnlyLegacyIcon) {
      return legacyIconComponents[iconOnlyLegacyIcon]
    }
    if (iconOnlyStrokeIcon) {
      // For weight variant, use dynamic weight based on hover state
      const weight = forWeightVariant && iconOnlyWeightHovered ? 900 : iconOnlyWeight
      return <Icon name={iconOnlyStrokeIcon} weight={weight} size={iconOnlySize} inset={iconOnlyInset} />
    }
    return undefined
  }

  const iconOnlyIcon = getIconOnlyIcon()
  const iconOnlyWeightIcon = getIconOnlyIcon(true)
  
  // Generate icon for buttons with icons (weight variant)
  const getWeightVariantIcon = () => {
    if (selectedLegacyIcon) {
      return legacyIconComponents[selectedLegacyIcon]
    }
    if (selectedStrokeIcon) {
      const weight = withIconWeightHovered ? 900 : iconWeight
      return <Icon name={selectedStrokeIcon} weight={weight} size={iconSize} inset={iconInset} />
    }
    return undefined
  }
  
  const weightVariantIcon = getWeightVariantIcon()

  return (
    <section className="mb-16 w-full overflow-x-hidden">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-6 break-words">Buttons</h2>
      <div className="space-y-8 bg-gray-900 p-6 sm:p-8 rounded-2xl w-full min-w-0">
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Variants</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-secondary mb-2">Primary</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Primary Button</Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Ghost</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Weight (hover to see effect)</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="weight">Weight Button</Button>
                <Button variant="weight" fontWeight={300}>Light → Bold</Button>
                <Button variant="weight" fontWeight={400} hoverWeight={700}>400 → 700</Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Font Weights</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Button fontWeight={300}>Light (300)</Button>
            <Button fontWeight={400}>Regular (400)</Button>
            <Button fontWeight={500}>Medium (500)</Button>
            <Button fontWeight={600}>SemiBold (600)</Button>
            <Button fontWeight={700}>Bold (700)</Button>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">States</h3>
          <div className="flex flex-wrap gap-4">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Icon Buttons</h3>
          
          {/* Controls */}
          <div className="mb-6 pb-6 border-b border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {/* Stroke Icon Select */}
              <Select
                label="Stroke Icon"
                placeholder="Select stroke icon"
                options={[
                  { value: '', label: 'None' },
                  ...strokeIconNames.map(icon => ({ value: icon.value, label: icon.label }))
                ]}
                value={iconOnlyStrokeIcon}
                onChange={(e) => {
                  setIconOnlyStrokeIcon(e.target.value as StrokeIconName)
                  if (e.target.value) setIconOnlyLegacyIcon('')
                }}
              />
              
              {/* Legacy Icon Select */}
              <Select
                label="Legacy Icon"
                placeholder="Select legacy icon"
                options={[
                  { value: '', label: 'None' },
                  ...legacyIconOptions
                ]}
                value={iconOnlyLegacyIcon}
                onChange={(e) => {
                  setIconOnlyLegacyIcon(e.target.value)
                  if (e.target.value) setIconOnlyStrokeIcon('' as StrokeIconName)
                }}
              />
              
              {/* Icon Size */}
              <Select
                label="Icon Size"
                placeholder="Select size"
                options={iconSizeOptions}
                value={iconOnlySize.toString()}
                onChange={(e) => setIconOnlySize(Number(e.target.value))}
                disabled={!!iconOnlyLegacyIcon}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Icon Weight (only for stroke icons) */}
              <Select
                label="Icon Weight"
                placeholder="Select weight"
                options={weightOptions}
                value={iconOnlyWeight.toString()}
                onChange={(e) => setIconOnlyWeight(Number(e.target.value))}
                disabled={!!iconOnlyLegacyIcon}
              />
              
              {/* Icon Inset (only for stroke icons) */}
              <Select
                label="Icon Inset"
                placeholder="Select inset"
                options={insetOptions}
                value={iconOnlyInset.toString()}
                onChange={(e) => setIconOnlyInset(Number(e.target.value))}
                disabled={!!iconOnlyLegacyIcon}
              />
            </div>
            
            {iconOnlyLegacyIcon && (
              <p className="text-xs text-text-tertiary mt-2">
                Icon weight, size, and inset options are only available for stroke icons.
              </p>
            )}
          </div>
          
          {/* Preview */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-secondary mb-2">Primary</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button iconOnly icon={iconOnlyIcon} variant="primary" />
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Ghost</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button iconOnly icon={iconOnlyIcon} variant="ghost" />
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Weight (hover to see icon weight change)</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button 
                  iconOnly 
                  icon={iconOnlyWeightIcon} 
                  variant="weight" 
                  onHoverChange={setIconOnlyWeightHovered}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Buttons with Icons</h3>
          
          {/* Controls */}
          <div className="mb-6 pb-6 border-b border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {/* Stroke Icon Select */}
              <Select
                label="Stroke Icon"
                placeholder="Select stroke icon"
                options={[
                  { value: '', label: 'None' },
                  ...strokeIconNames.map(icon => ({ value: icon.value, label: icon.label }))
                ]}
                value={selectedStrokeIcon}
                onChange={(e) => {
                  setSelectedStrokeIcon(e.target.value as StrokeIconName)
                  if (e.target.value) setSelectedLegacyIcon('')
                }}
              />
              
              {/* Legacy Icon Select */}
              <Select
                label="Legacy Icon"
                placeholder="Select legacy icon"
                options={[
                  { value: '', label: 'None' },
                  ...legacyIconOptions
                ]}
                value={selectedLegacyIcon}
                onChange={(e) => {
                  setSelectedLegacyIcon(e.target.value)
                  if (e.target.value) setSelectedStrokeIcon('' as StrokeIconName)
                }}
              />
              
              {/* Button Text Input */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-text-primary focus:outline-none focus:border-gray-500"
                  placeholder="Enter button text"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Icon Size */}
              <Select
                label="Icon Size"
                placeholder="Select size"
                options={iconSizeOptions}
                value={iconSize.toString()}
                onChange={(e) => setIconSize(Number(e.target.value))}
                disabled={!!selectedLegacyIcon}
              />
              
              {/* Icon Weight (only for stroke icons) */}
              <Select
                label="Icon Weight"
                placeholder="Select weight"
                options={weightOptions}
                value={iconWeight.toString()}
                onChange={(e) => setIconWeight(Number(e.target.value))}
                disabled={!!selectedLegacyIcon}
              />
              
              {/* Text Weight */}
              <Select
                label="Text Weight"
                placeholder="Select weight"
                options={weightOptions}
                value={textWeight.toString()}
                onChange={(e) => setTextWeight(Number(e.target.value))}
              />
              
              {/* Icon Inset (only for stroke icons) */}
              <Select
                label="Icon Inset"
                placeholder="Select inset"
                options={insetOptions}
                value={iconInset.toString()}
                onChange={(e) => setIconInset(Number(e.target.value))}
                disabled={!!selectedLegacyIcon}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {/* Width Mode */}
              <Select
                label="Width Mode"
                placeholder="Select width mode"
                options={widthModeOptions}
                value={widthMode}
                onChange={(e) => setWidthMode(e.target.value as 'fixed' | 'hug')}
              />
              
              {/* Icon Gap */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Icon Gap ({iconGap}px)
                </label>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={iconGap}
                  onChange={(e) => setIconGap(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            
            {selectedLegacyIcon && (
              <p className="text-xs text-text-tertiary mt-2">
                Icon size, weight, and inset options are only available for stroke icons.
              </p>
            )}
            
            {/* Icon Size Reference */}
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <p className="text-sm font-medium text-text-secondary mb-2">Icon Size Presets</p>
              <div className="font-mono text-xs text-text-tertiary space-y-1">
                <p><span className={iconSize === 13 ? "text-text-primary font-semibold" : ""}>13px</span> - Cap-height (18px × 0.725) - optimal for inline with text</p>
                <p><span className={iconSize === 16 ? "text-text-primary font-semibold" : ""}>16px</span> - Small</p>
                <p><span className={iconSize === 20 ? "text-text-primary font-semibold" : ""}>20px</span> - Default / Navigation</p>
              </div>
              <p className="text-xs text-text-tertiary mt-3">
                Current selection: <span className="text-text-primary font-semibold">{iconSize}px</span>
              </p>
            </div>
          </div>
          
          {/* Preview */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-secondary mb-2">Primary - Icon Left</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button icon={demoIcon} variant="primary" fontWeight={textWeight as 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900} widthMode={widthMode} iconGap={iconGap}>{buttonText}</Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Primary - Icon Right</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button icon={demoIcon} iconPosition="right" variant="primary" fontWeight={textWeight as 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900} widthMode={widthMode} iconGap={iconGap}>{buttonText}</Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Ghost - Icon Left</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button icon={demoIcon} variant="ghost" fontWeight={textWeight as 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900} widthMode={widthMode} iconGap={iconGap}>{buttonText}</Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Ghost - Icon Right</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button icon={demoIcon} iconPosition="right" variant="ghost" fontWeight={textWeight as 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900} widthMode={widthMode} iconGap={iconGap}>{buttonText}</Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Weight - Icon Left (hover to see text + icon weight change)</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button 
                  icon={weightVariantIcon} 
                  variant="weight" 
                  fontWeight={textWeight as 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900} 
                  widthMode={widthMode} 
                  iconGap={iconGap}
                  onHoverChange={setWithIconWeightHovered}
                >
                  {buttonText}
                </Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Weight - Icon Right (hover to see text + icon weight change)</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button 
                  icon={weightVariantIcon} 
                  iconPosition="right" 
                  variant="weight" 
                  fontWeight={textWeight as 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900} 
                  widthMode={widthMode} 
                  iconGap={iconGap}
                  onHoverChange={setWithIconWeightHovered}
                >
                  {buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ButtonShowcase
