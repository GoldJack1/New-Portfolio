import { Link } from 'react-router-dom'
import SubpageHero from '../../components/ui/SubpageHero'
import Button from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'
import { PADDING_CLASSES } from '../../utils/paddingClasses'
import project2Image from '../../assets/images/projects/Hero Imgs/Project 2.jpg'

const RailStatistics = () => {
  return (
    <div className="w-full overflow-x-hidden bg-gray-1000 min-h-screen flex flex-col">
      <SubpageHero
        image={project2Image}
        pageName="Rail Statistics"
        subtext="Track stations visited across Great Britain"
        shrinkOnScroll={false}
      />
      <section className={`w-full ${PADDING_CLASSES.page.horizontal} pt-5 pb-5 flex-grow flex flex-col`}>
        <Link to="/projects" className="h-[45px] inline-flex">
          <Button variant="ghost" icon={<Icon name="chevron-left" weight={400} />} className="mb-6">
            Back to Projects
          </Button>
        </Link>
        <div className="max-w-3xl space-y-6 text-base sm:text-lg font-light text-text-primary">
          <p className="break-words">
            A functional app for train enthusiasts to track stations visited across Great Britain and train tickets.
          </p>
          <p className="break-words">
            Major update & Android release coming February 2026.
          </p>
        </div>
      </section>
    </div>
  )
}

export default RailStatistics
