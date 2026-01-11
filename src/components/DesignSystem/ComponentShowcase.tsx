import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Alert from '../ui/Alert'
import Progress from '../ui/Progress'
import Navigation from '../Navigation'

const ComponentShowcase = () => {
  return (
    <section className="mb-16 w-full overflow-x-hidden">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-50 mb-6 break-words">Components</h2>
      <div className="space-y-8 w-full min-w-0">
        <div>
          <h3 className="text-xl font-bold text-gray-50 mb-4">Navigation</h3>
          <div className="bg-gray-800 p-4 rounded-2xl">
            <p className="text-sm text-gray-300 mb-4">Pill navigation header with active/inactive states</p>
            <div className="bg-gray-900 p-4 rounded-2xl">
              <Navigation />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-50 mb-4">Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <h4 className="text-xl font-semibold text-gray-50 mb-2">Basic Card</h4>
              <p className="text-gray-200">Card content goes here</p>
            </Card>
            <Card header={<h4 className="text-xl font-semibold text-gray-50">Card with Header</h4>}>
              <p className="text-gray-200">Card with header section</p>
            </Card>
            <Card
              header={<h4 className="text-xl font-semibold text-gray-50">Card with Footer</h4>}
              footer={<p className="text-sm text-gray-300">Footer content</p>}
            >
              <p className="text-gray-200">Card with header and footer</p>
            </Card>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-50 mb-4">Badges</h3>
          <div className="flex flex-wrap gap-4">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="tertiary">Tertiary</Badge>
            <Badge variant="primary" size="sm">Small</Badge>
            <Badge variant="primary" size="lg">Large</Badge>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-50 mb-4">Alerts</h3>
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
          <h3 className="text-xl font-bold text-gray-50 mb-4">Progress Bars</h3>
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
  )
}

export default ComponentShowcase
