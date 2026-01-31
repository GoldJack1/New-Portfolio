import { Link } from 'react-router-dom'
import SubpageHero from '../../components/ui/SubpageHero'
import Button from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'
import { PADDING_CLASSES } from '../../utils/paddingClasses'
import project3Video from '../../assets/images/projects/Hero Imgs/Project 3.mp4'

const Webtext = () => {
  return (
    <div className="w-full overflow-x-hidden bg-gray-1000 min-h-screen flex flex-col">
      <SubpageHero
        video={project3Video}
        pageName="Webtext"
        subtext="INTERNET + TELETEXT = WEBTEXT"
        shrinkOnScroll
      />
      <section className={`w-full ${PADDING_CLASSES.page.horizontal} pt-5 pb-5 flex-grow flex flex-col`}>
        <Link to="/projects" className="h-[45px] inline-flex">
          <Button variant="ghost" icon={<Icon name="chevron-left" weight={400} />} className="mb-6">
            Back to Projects
          </Button>
        </Link>
        <div className="w-full">
          <p className="mb-4 text-base sm:text-lg font-light text-text-secondary break-words">
            Warning: This video has some intermittent moments of flickering on the CRT. Please skip forward to 0:36 if you have epilepsy.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/uCOQdq30EuQ"
              title="Webtext - INTERNET + TELETEXT = WEBTEXT"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Webtext
