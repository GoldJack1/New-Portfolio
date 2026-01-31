import { Link } from 'react-router-dom'
import SubpageHero from '../../components/ui/SubpageHero'
import Button from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'
import { PADDING_CLASSES } from '../../utils/paddingClasses'
import project1Image from '../../assets/images/projects/Hero Imgs/Project 1.jpg'

const GreatBritishRailwaysConcept = () => {
  return (
    <div className="w-full overflow-x-hidden bg-gray-1000 min-h-screen flex flex-col">
      <SubpageHero
        image={project1Image}
        pageName="Great British Railways"
        subtext="A Branding & App Concept"
        shrinkOnScroll
      />
      <section className={`w-full ${PADDING_CLASSES.page.horizontal} pt-5 pb-5 flex-grow flex flex-col`}>
        <div className="max-w-[1024px] mx-auto w-full flex flex-col gap-2.5">
          <Link to="/projects" className="h-[45px] inline-flex">
            <Button variant="ghost" icon={<Icon name="chevron-left" weight={400} />} className="mb-6">
              Back to Projects
            </Button>
          </Link>
          <div className="space-y-6 text-base sm:text-lg md:text-xl text-left text-text-primary" style={{ lineHeight: 1.5, letterSpacing: 0 }}>
          <p className="break-words">
            This is a concept of what I spent many months of research and development as part of my Final Major Project to create a refreshed brand identity for Great British Railways. This was completed back in April 2025, before the actual branding was revealed in December 2025 as part of ongoing nationalisation plans.
          </p>
          <p className="break-words">
            My concept took a different approach to the classic design, by making a look that was familiar but fresh, whilst incorporating the unique elements of railway, such as the metallic shine in the logo, resembling the shine that you see on rails.
          </p>
          <p className="break-words">
            (This website is currently under construction, so project pages will temporarily be showing PDF versions of the final outcome until I get time to update the page to be more comprehensive.)
          </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GreatBritishRailwaysConcept
