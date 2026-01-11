import { useState } from 'react'
import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import Select from '../ui/Select'
import Checkbox from '../ui/Checkbox'
import Radio from '../ui/Radio'
import Toggle from '../ui/Toggle'
import Slider from '../ui/Slider'
import { FaHome } from 'react-icons/fa'

const FormControlsShowcase = () => {
  const [sliderValue, setSliderValue] = useState(50)
  const [toggleValue, setToggleValue] = useState(false)
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [radioValue, setRadioValue] = useState('option1')

  return (
    <section className="mb-16 w-full overflow-x-hidden">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 break-words">Form Controls</h2>
      <div className="space-y-8 bg-gray-200 p-6 sm:p-8 rounded-2xl w-full min-w-0">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Inputs</h3>
          <div className="space-y-4 max-w-md">
            <Input label="Text Input" placeholder="Enter text" />
            <Input label="Email Input" type="email" placeholder="email@example.com" />
            <Input label="Error State" error placeholder="Error input" />
            <Input label="Success State" success placeholder="Success input" />
            <Input label="With Left Icon" iconLeft={<FaHome />} placeholder="Search..." />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Textarea</h3>
          <div className="max-w-md">
            <Textarea label="Message" rows={4} placeholder="Enter your message" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Select</h3>
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
          <h3 className="text-xl font-bold text-gray-900 mb-4">Checkboxes</h3>
          <div className="space-y-3">
            <Checkbox label="Single Checkbox" checked={checkboxValue} onChange={(e) => setCheckboxValue(e.target.checked)} />
            <Checkbox label="Checked" checked />
            <Checkbox label="Unchecked" />
            <Checkbox label="Disabled" disabled />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Radio Buttons</h3>
          <div className="space-y-3">
            <Radio name="radio-group" label="Option 1" value="option1" checked={radioValue === 'option1'} onChange={(e) => setRadioValue(e.target.value)} />
            <Radio name="radio-group" label="Option 2" value="option2" checked={radioValue === 'option2'} onChange={(e) => setRadioValue(e.target.value)} />
            <Radio name="radio-group" label="Option 3" value="option3" checked={radioValue === 'option3'} onChange={(e) => setRadioValue(e.target.value)} />
            <Radio name="radio-group-disabled" label="Disabled" disabled />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Toggle</h3>
          <div className="space-y-3">
            <Toggle label="Toggle Switch" checked={toggleValue} onChange={setToggleValue} />
            <Toggle label="Checked" checked />
            <Toggle label="Unchecked" checked={false} />
            <Toggle label="Disabled" disabled />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Slider</h3>
          <div className="max-w-md space-y-4">
            <Slider label="Value Slider" value={sliderValue} onChange={setSliderValue} min={0} max={100} />
            <Slider label="Default Slider" defaultValue={30} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FormControlsShowcase
