import { useState } from 'react'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Select from '../components/ui/Select'
import Checkbox from '../components/ui/Checkbox'
import Radio from '../components/ui/Radio'
import Toggle from '../components/ui/Toggle'
import Slider from '../components/ui/Slider'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Alert from '../components/ui/Alert'
import Progress from '../components/ui/Progress'
import { FaHeart, FaStar, FaHome } from 'react-icons/fa'

const SiteDesignSystem = () => {
  const [sliderValue, setSliderValue] = useState(50)
  const [toggleValue, setToggleValue] = useState(false)
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [radioValue, setRadioValue] = useState('option1')

  const colorPalette = [
    { name: '50', hex: '#F0F4F8', text: 'gray-50' },
    { name: '100', hex: '#D9E2EC', text: 'gray-100' },
    { name: '200', hex: '#C5D4E3', text: 'gray-200' },
    { name: '300', hex: '#A8B8CC', text: 'gray-300' },
    { name: '400', hex: '#7A8FA8', text: 'gray-400' },
    { name: '500', hex: '#5A6B7F', text: 'gray-500' },
    { name: '600', hex: '#4A5A6B', text: 'gray-600' },
    { name: '700', hex: '#3A4757', text: 'gray-700' },
    { name: '800', hex: '#2A3442', text: 'gray-800' },
    { name: '900', hex: '#1A2332', text: 'gray-900' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-12 break-words">
          Site Design System
        </h1>

        {/* Color Palette */}
        <section className="mb-16 w-full overflow-x-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 break-words">Color Palette</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4 w-full min-w-0">
            {colorPalette.map((color) => (
              <div key={color.name} className="text-center">
                <div
                  className="w-full h-24 rounded-2xl mb-2"
                  style={{ backgroundColor: color.hex }}
                />
                <p className="text-sm font-semibold text-gray-900">{color.name}</p>
                <p className="text-xs text-gray-600">{color.text}</p>
                <p className="text-xs text-gray-500 font-mono">{color.hex}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-2xl text-gray-50">
              <h3 className="font-semibold mb-2">Primary</h3>
              <p className="text-sm">#2A3442 (gray-800)</p>
            </div>
            <div className="bg-gray-500 p-6 rounded-2xl text-gray-50">
              <h3 className="font-semibold mb-2">Secondary</h3>
              <p className="text-sm">#5A6B7F (gray-500)</p>
            </div>
            <div className="bg-gray-300 p-6 rounded-2xl text-gray-900">
              <h3 className="font-semibold mb-2">Tertiary</h3>
              <p className="text-sm">#A8B8CC (gray-300)</p>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16 w-full overflow-x-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 break-words">Typography</h2>
          <div className="space-y-4 bg-gray-200 p-6 sm:p-8 rounded-2xl w-full min-w-0">
            <div>
              <p className="text-xs text-gray-600 mb-1">Font Family: Geologica</p>
              <h1 className="text-5xl font-bold text-gray-900">Heading 1</h1>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900">Heading 2</h2>
            </div>
            <div>
              <h3 className="text-3xl font-semibold text-gray-900">Heading 3</h3>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-gray-900">Heading 4</h4>
            </div>
            <div>
              <p className="text-lg text-gray-700">Body Large - Lorem ipsum dolor sit amet</p>
            </div>
            <div>
              <p className="text-base text-gray-700">Body - Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Body Small - Secondary text with lower contrast</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Caption - Tertiary text with lowest contrast</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16 w-full overflow-x-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 break-words">Buttons</h2>
          <div className="space-y-8 bg-gray-200 p-6 sm:p-8 rounded-2xl w-full min-w-0">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tertiary">Tertiary</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">States</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Icon Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button iconOnly icon={<FaHeart />} />
                <Button iconOnly icon={<FaStar />} size="md" />
                <Button iconOnly icon={<FaHome />} size="lg" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Buttons with Icons</h3>
              <div className="flex flex-wrap gap-4">
                <Button icon={<FaHeart />}>With Icon</Button>
                <Button icon={<FaStar />} variant="secondary">Secondary Icon</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Form Controls */}
        <section className="mb-16 w-full overflow-x-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 break-words">Form Controls</h2>
          <div className="space-y-8 bg-gray-200 p-6 sm:p-8 rounded-2xl w-full min-w-0">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Inputs</h3>
              <div className="space-y-4 max-w-md">
                <Input label="Text Input" placeholder="Enter text" />
                <Input label="Email Input" type="email" placeholder="email@example.com" />
                <Input label="Error State" error placeholder="Error input" />
                <Input label="Success State" success placeholder="Success input" />
                <Input label="With Left Icon" iconLeft={<FaHome />} placeholder="Search..." />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Textarea</h3>
              <div className="max-w-md">
                <Textarea label="Message" rows={4} placeholder="Enter your message" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Select</h3>
              <div className="max-w-md">
                <Select
                  label="Choose Option"
                  placeholder="Select an option"
                  options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' },
                  ]}
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Checkboxes</h3>
              <div className="space-y-3">
                <Checkbox label="Single Checkbox" checked={checkboxValue} onChange={(e) => setCheckboxValue(e.target.checked)} />
                <Checkbox label="Checked" checked />
                <Checkbox label="Unchecked" />
                <Checkbox label="Disabled" disabled />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Radio Buttons</h3>
              <div className="space-y-3">
                <Radio name="radio-group" label="Option 1" value="option1" checked={radioValue === 'option1'} onChange={(e) => setRadioValue(e.target.value)} />
                <Radio name="radio-group" label="Option 2" value="option2" checked={radioValue === 'option2'} onChange={(e) => setRadioValue(e.target.value)} />
                <Radio name="radio-group" label="Option 3" value="option3" checked={radioValue === 'option3'} onChange={(e) => setRadioValue(e.target.value)} />
                <Radio name="radio-group-disabled" label="Disabled" disabled />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Toggle</h3>
              <div className="space-y-3">
                <Toggle label="Toggle Switch" checked={toggleValue} onChange={setToggleValue} />
                <Toggle label="Checked" checked />
                <Toggle label="Unchecked" checked={false} />
                <Toggle label="Disabled" disabled />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Slider</h3>
              <div className="max-w-md space-y-4">
                <Slider label="Value Slider" value={sliderValue} onChange={setSliderValue} min={0} max={100} />
                <Slider label="Default Slider" defaultValue={30} />
              </div>
            </div>
          </div>
        </section>

        {/* Components */}
        <section className="mb-16 w-full overflow-x-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 break-words">Components</h2>
          <div className="space-y-8 w-full min-w-0">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Basic Card</h4>
                  <p className="text-gray-700">Card content goes here</p>
                </Card>
                <Card header={<h4 className="text-xl font-semibold text-gray-900">Card with Header</h4>}>
                  <p className="text-gray-700">Card with header section</p>
                </Card>
                <Card
                  header={<h4 className="text-xl font-semibold text-gray-900">Card with Footer</h4>}
                  footer={<p className="text-sm text-gray-600">Footer content</p>}
                >
                  <p className="text-gray-700">Card with header and footer</p>
                </Card>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Badges</h3>
              <div className="flex flex-wrap gap-4">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="tertiary">Tertiary</Badge>
                <Badge variant="primary" size="sm">Small</Badge>
                <Badge variant="primary" size="lg">Large</Badge>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Alerts</h3>
              <div className="space-y-4 max-w-2xl">
                <Alert type="info" dismissible>
                  This is an info alert with important information.
                </Alert>
                <Alert type="success" dismissible>
                  Success! Your action was completed successfully.
                </Alert>
                <Alert type="warning" dismissible>
                  Warning: Please review this before proceeding.
                </Alert>
                <Alert type="error" dismissible>
                  Error: Something went wrong. Please try again.
                </Alert>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Progress Bars</h3>
              <div className="space-y-6 max-w-2xl">
                <Progress value={25} label="Progress 25%" />
                <Progress value={50} label="Progress 50%" />
                <Progress value={75} label="Progress 75%" />
                <Progress value={100} label="Complete" />
                <div className="flex flex-col items-center gap-8">
                  <Progress value={60} variant="circular" size="sm" />
                  <Progress value={60} variant="circular" size="md" />
                  <Progress value={60} variant="circular" size="lg" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SiteDesignSystem
