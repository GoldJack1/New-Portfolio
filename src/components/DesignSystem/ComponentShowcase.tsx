import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Alert from '../ui/Alert'
import Progress from '../ui/Progress'
import Navigation from '../Navigation'
import Hero from '../ui/Hero'

const ComponentShowcase = () => {
  return (
    <section className="mb-16 w-full overflow-x-hidden">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-6 break-words">Components</h2>
      <div className="space-y-8 w-full min-w-0">
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Navigation</h3>
          <div className="bg-gray-900 p-4 rounded-2xl">
            <p className="text-sm text-text-secondary mb-4">Pill navigation header with active/inactive states</p>
            <div className="bg-gray-800 p-4 rounded-2xl">
              <Navigation />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <h4 className="text-xl font-semibold text-text-primary mb-2">Basic Card</h4>
              <p className="text-text-primary">Card content goes here</p>
            </Card>
            <Card header={<h4 className="text-xl font-semibold text-text-primary">Card with Header</h4>}>
              <p className="text-text-primary">Card with header section</p>
            </Card>
            <Card
              header={<h4 className="text-xl font-semibold text-text-primary">Card with Footer</h4>}
              footer={<p className="text-sm text-text-secondary">Footer content</p>}
            >
              <p className="text-text-primary">Card with header and footer</p>
            </Card>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Badges</h3>
          <div className="flex flex-wrap gap-4">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="tertiary">Tertiary</Badge>
            <Badge variant="primary" size="sm">Small</Badge>
            <Badge variant="primary" size="lg">Large</Badge>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Alerts</h3>
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
            <Alert type="info" variant="primary">
              Primary variant alert (gray-800)
            </Alert>
            <Alert type="info" variant="secondary">
              Secondary variant alert (gray-600)
            </Alert>
            <Alert type="info" variant="tertiary">
              Tertiary variant alert (gray-700)
            </Alert>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Progress Bars</h3>
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
        <div>
          <h3 className="text-xl font-bold text-text-primary mb-4">Hero</h3>
          <div className="space-y-8">
            <div>
              <p className="text-sm text-text-secondary mb-4">Standalone Hero with Solid Background</p>
              <div className="bg-gray-900 p-4 rounded-2xl overflow-hidden">
                <Hero
                  slides={[
                    {
                      backgroundType: 'solid',
                      backgroundValue: '#7F0000',
                      heading: 'Welcome to My Portfolio',
                      subtext: 'Explore my projects and get in touch',
                      buttonText: 'View Projects',
                      buttonOnClick: () => alert('Button clicked!'),
                    },
                  ]}
                  height="400px"
                />
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-4">Standalone Hero with Gradient Background</p>
              <div className="bg-gray-900 p-4 rounded-2xl overflow-hidden">
                <Hero
                  slides={[
                    {
                      backgroundType: 'gradient',
                      backgroundValue: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      heading: 'Creative Solutions',
                      subtext: 'Building amazing experiences',
                      buttonText: 'Learn More',
                    },
                  ]}
                  height="400px"
                />
              </div>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-4">Carousel Hero (Auto-play enabled)</p>
              <div className="bg-gray-900 p-4 rounded-2xl overflow-hidden">
                <Hero
                  slides={[
                    {
                      backgroundType: 'solid',
                      backgroundValue: '#397F00',
                      heading: 'Project One',
                      subtext: 'First slide in carousel',
                      buttonText: 'Explore',
                    },
                    {
                      backgroundType: 'solid',
                      backgroundValue: '#00377F',
                      heading: 'Project Two',
                      subtext: 'Second slide in carousel',
                      buttonText: 'Discover',
                    },
                    {
                      backgroundType: 'solid',
                      backgroundValue: '#7F0070',
                      heading: 'Project Three',
                      subtext: 'Third slide in carousel',
                      buttonText: 'View More',
                    },
                  ]}
                  autoPlay={true}
                  autoPlayInterval={4000}
                  height="400px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComponentShowcase
