import React, { useState } from 'react'
import Button from '../ui/Button'
import Select from '../ui/Select'
import { 
  JWPStarFilled, 
  JWPStarOutlined,
  JWPChevronLeft,
  JWPChevronRight,
  JWPChevronUp,
  JWPChevronDown,
  JWPArrowLeft,
  JWPArrowRight,
  JWPArrowUp,
  JWPArrowDown,
  JWPCheckmark,
  JWPCheckmarkCircleFilled,
  JWPCross,
  JWPCrossCircleFilled,
  JWPInfoCircleFilled2,
  JWPSearch1,
  JWPSettingsFilled,
  JWPFilterFilled,
} from '../../utils/iconMap'

// Test icon components (16x16, all weight variants)
const TestPlus100 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" fill="currentColor" className={props.className} {...props}>
    <path d="M8,1.228v13.545" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth=".71"/>
    <path d="M14.773,8H1.228" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth=".71"/>
  </svg>
)

const TestPlus200 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" fill="currentColor" className={props.className} {...props}>
    <path d="M8,1.288v13.424" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth=".955"/>
    <path d="M14.712,8H1.288" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth=".955"/>
  </svg>
)

const TestPlus300 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" fill="currentColor" className={props.className} {...props}>
    <path d="M8,1.346v13.307" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.185"/>
    <path d="M14.653,8H1.347" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.185"/>
  </svg>
)

const TestPlus400 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" fill="currentColor" className={props.className} {...props}>
    <path d="M8,1.403v13.195" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.41"/>
    <path d="M14.598,8H1.403" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.41"/>
  </svg>
)

const TestPlus500 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" fill="currentColor" className={props.className} {...props}>
    <path d="M8,1.458v13.085" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.64"/>
    <path d="M14.543,8H1.458" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.64"/>
  </svg>
)

const TestPlus600 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" fill="currentColor" className={props.className} {...props}>
    <path d="M8,1.518v12.965" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.865"/>
    <path d="M14.482,8H1.518" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.865"/>
  </svg>
)

const TestCross100 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" fill="currentColor" className={props.className} {...props}>
    <path d="M14.773,1.228L1.228,14.773" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth=".71"/>
    <path d="M1.228,1.228l13.545,13.545" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth=".71"/>
  </svg>
)

const TestCross200 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" fill="currentColor" className={props.className} {...props}>
    <path d="M14.712,1.288L1.288,14.712" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth=".955"/>
    <path d="M1.288,1.288l13.424,13.424" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth=".955"/>
  </svg>
)

const TestCross300 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" fill="currentColor" className={props.className} {...props}>
    <path d="M14.654,1.347L1.346,14.653" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.185"/>
    <path d="M1.346,1.347l13.307,13.307" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.185"/>
  </svg>
)

const TestCross400 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" fill="currentColor" className={props.className} {...props}>
    <path d="M14.598,1.403L1.403,14.598" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.41"/>
    <path d="M1.403,1.403l13.195,13.195" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.41"/>
  </svg>
)

const TestCross500 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" fill="currentColor" className={props.className} {...props}>
    <path d="M14.543,1.458L1.458,14.543" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.64"/>
    <path d="M1.458,1.458l13.085,13.085" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.64"/>
  </svg>
)

const TestCross600 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" fill="currentColor" className={props.className} {...props}>
    <path d="M14.482,1.518L1.518,14.482" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.865"/>
    <path d="M1.518,1.518l12.965,12.965" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.865"/>
  </svg>
)

const TestCross700 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" fill="currentColor" className={props.className} {...props}>
    <path d="M14.427,1.573L1.573,14.427" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.1"/>
    <path d="M1.573,1.573l12.854,12.854" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.1"/>
  </svg>
)

const iconOptions = [
  { value: '', label: 'None' },
  { value: 'star-filled', label: 'Star (Filled)' },
  { value: 'star-outlined', label: 'Star (Outlined)' },
  { value: 'chevron-left', label: 'Chevron Left' },
  { value: 'chevron-right', label: 'Chevron Right' },
  { value: 'chevron-up', label: 'Chevron Up' },
  { value: 'chevron-down', label: 'Chevron Down' },
  { value: 'arrow-left', label: 'Arrow Left' },
  { value: 'arrow-right', label: 'Arrow Right' },
  { value: 'arrow-up', label: 'Arrow Up' },
  { value: 'arrow-down', label: 'Arrow Down' },
  { value: 'checkmark', label: 'Checkmark' },
  { value: 'checkmark-circle-filled', label: 'Checkmark Circle (Filled)' },
  { value: 'cross', label: 'Cross' },
  { value: 'cross-circle-filled', label: 'Cross Circle (Filled)' },
  { value: 'info-circle-filled', label: 'Info Circle (Filled)' },
  { value: 'search', label: 'Search' },
  { value: 'settings-filled', label: 'Settings (Filled)' },
  { value: 'filter-filled', label: 'Filter (Filled)' },
  { value: 'test-plus-100', label: 'Plus (Test 100)' },
  { value: 'test-plus-200', label: 'Plus (Test 200)' },
  { value: 'test-plus-300', label: 'Plus (Test 300)' },
  { value: 'test-plus-400', label: 'Plus (Test 400)' },
  { value: 'test-plus-500', label: 'Plus (Test 500)' },
  { value: 'test-plus-600', label: 'Plus (Test 600)' },
  { value: 'test-cross-100', label: 'Cross (Test 100)' },
  { value: 'test-cross-200', label: 'Cross (Test 200)' },
  { value: 'test-cross-300', label: 'Cross (Test 300)' },
  { value: 'test-cross-400', label: 'Cross (Test 400)' },
  { value: 'test-cross-500', label: 'Cross (Test 500)' },
  { value: 'test-cross-600', label: 'Cross (Test 600)' },
  { value: 'test-cross-700', label: 'Cross (Test 700)' },
]

const iconComponents: Record<string, React.ReactElement> = {
  'star-filled': <JWPStarFilled />,
  'star-outlined': <JWPStarOutlined />,
  'chevron-left': <JWPChevronLeft />,
  'chevron-right': <JWPChevronRight />,
  'chevron-up': <JWPChevronUp />,
  'chevron-down': <JWPChevronDown />,
  'arrow-left': <JWPArrowLeft />,
  'arrow-right': <JWPArrowRight />,
  'arrow-up': <JWPArrowUp />,
  'arrow-down': <JWPArrowDown />,
  'checkmark': <JWPCheckmark />,
  'checkmark-circle-filled': <JWPCheckmarkCircleFilled />,
  'cross': <JWPCross />,
  'cross-circle-filled': <JWPCrossCircleFilled />,
  'info-circle-filled': <JWPInfoCircleFilled2 />,
  'search': <JWPSearch1 />,
  'settings-filled': <JWPSettingsFilled />,
  'filter-filled': <JWPFilterFilled />,
  'test-plus-100': <TestPlus100 />,
  'test-plus-200': <TestPlus200 />,
  'test-plus-300': <TestPlus300 />,
  'test-plus-400': <TestPlus400 />,
  'test-plus-500': <TestPlus500 />,
  'test-plus-600': <TestPlus600 />,
  'test-cross-100': <TestCross100 />,
  'test-cross-200': <TestCross200 />,
  'test-cross-300': <TestCross300 />,
  'test-cross-400': <TestCross400 />,
  'test-cross-500': <TestCross500 />,
  'test-cross-600': <TestCross600 />,
  'test-cross-700': <TestCross700 />,
}

const ButtonShowcase = () => {
  const [selectedIcon, setSelectedIcon] = useState('')
  const demoIcon = selectedIcon ? iconComponents[selectedIcon] : undefined

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
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-secondary mb-2">Primary</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button iconOnly icon={<JWPStarFilled />} variant="primary" />
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Ghost</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button iconOnly icon={<JWPStarOutlined />} variant="ghost" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-4 pb-4 border-b border-gray-700">
            <div className="max-w-xs">
              <Select
                label="Choose icon for buttons with icons"
                placeholder="Select an icon"
                options={iconOptions}
                value={selectedIcon}
                onChange={(e) => setSelectedIcon(e.target.value)}
              />
            </div>
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Buttons with Icons</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-secondary mb-2">Primary - Icon Left</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button icon={demoIcon} variant="primary">Button with Icon</Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Primary - Icon Right</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button icon={demoIcon} iconPosition="right" variant="primary">Button with Icon</Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Ghost - Icon Left</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button icon={demoIcon} variant="ghost">Button with Icon</Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Ghost - Icon Right</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button icon={demoIcon} iconPosition="right" variant="ghost">Button with Icon</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ButtonShowcase
