import { Link } from 'react-router-dom'
import SubpageHero from '../../components/ui/SubpageHero'
import Button from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'
import { PADDING_CLASSES } from '../../utils/paddingClasses'
import project3Video from '../../assets/images/projects/Hero Imgs/Project 3.mp4'

const Webtext = () => {
  const embedShellUrl = import.meta.env.VITE_MUTTLEE_EMBED_SHELL_URL as string | undefined

  return (
    <div className="w-full overflow-x-hidden bg-gray-1000 min-h-screen flex flex-col">
      <SubpageHero
        video={project3Video}
        pageName="Webtext"
        subtext="INTERNET + TELETEXT = WEBTEXT"
        shrinkOnScroll={false}
      />
      <section className={`w-full ${PADDING_CLASSES.page.horizontal} pt-5 pb-5 flex-grow flex flex-col`}>
        <Link to="/projects" className="h-[45px] inline-flex">
          <Button variant="ghost" icon={<Icon name="chevron-left" weight={400} />} className="mb-6">
            Back to Projects
          </Button>
        </Link>
        <div className="w-full">
          <p className="mt-4 mb-4 text-base sm:text-lg font-light text-text-secondary break-words">
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

        <div className="w-full mt-10">
          <p className="text-base sm:text-lg font-light text-text-secondary break-words mb-4">
            Teletext Simulator | Click on the frame below and enter a page number using the keyboard or the
            virtual remote. For colour options, use the virtual remote.
            <br />
            <br />
            Please note there may be glitches, as this is a simulator. When you enter a page number, the screen may
            go blank; please wait up to 20 seconds and it will appear. If nothing appears, enter/click 0 until it
            reappears, or refresh the page.
          </p>

          {!embedShellUrl ? (
            <div className="w-full rounded-lg border border-white/10 bg-black/20 p-5 text-text-secondary">
              <p className="font-medium text-text-primary">Embed shell URL not set.</p>
              <p className="mt-2 text-sm">
                Add <code className="text-text-secondary">VITE_MUTTLEE_EMBED_SHELL_URL</code> to your environment and redeploy.
              </p>
            </div>
          ) : (
            <div className="relative w-full rounded-lg overflow-hidden bg-black">
              <iframe
                title="Muttlee teletext viewer"
                src={embedShellUrl}
                className="w-full h-[72vh] sm:h-[75vh] min-h-[520px] border-0"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Webtext
