import { Link } from 'react-router-dom'
import SubpageHero from '../../components/ui/SubpageHero'
import Button from '../../components/ui/Button'
import { Icon } from '../../components/ui/Icon'
import { PADDING_CLASSES } from '../../utils/paddingClasses'
import project1Image from '../../assets/images/projects/Hero Imgs/Project 1.jpg'
import { useGBRPDFUrl } from '../../hooks/useGBRPDFUrl'

const GBR_PDF_FILENAME = 'Final Outcome PDF Compressed.pdf'
const GBR_APP_PROTOTYPE_URL = 'https://www.figma.com/proto/FkHh8mUk0VdeWrYTuB5TvW/GBR-App-Concept?node-id=926-16114&starting-point-node-id=926%3A16114'

const GreatBritishRailwaysConcept = () => {
  const { url, loading, error, retry } = useGBRPDFUrl()

  const handleDownload = async () => {
    if (!url) return
    try {
      const res = await fetch(url, { mode: 'cors' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const blob = await res.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = GBR_PDF_FILENAME
      a.rel = 'noopener noreferrer'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      // Revoke after a delay so the browser has time to start the download
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000)
    } catch {
      // CORS or fetch failed: open in new tab so user can save from there
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="w-full overflow-x-hidden bg-gray-1000 min-h-screen flex flex-col">
      <SubpageHero
        image={project1Image}
        pageName="Great British Railways"
        subtext="A Branding & App Concept"
        shrinkOnScroll={false}
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

          <div className="mt-8 w-full relative min-h-[400px]">
            {loading && (
              <div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded border border-gray-700 bg-gray-1000/95 text-text-secondary"
                aria-live="polite"
                aria-busy="true"
              >
                <div
                  className="h-10 w-10 rounded-full border-2 border-gray-600 border-t-text-secondary motion-safe:animate-spin"
                  aria-hidden
                />
                <p className="text-lg font-medium">Loading PDF…</p>
              </div>
            )}
            {error && (
              <div className="flex flex-col items-center justify-center min-h-[200px] gap-3 text-text-secondary text-center">
                <p>Could not load the PDF. {error.message}</p>
                <Button variant="ghost" onClick={retry}>
                  Retry
                </Button>
              </div>
            )}
            {url && !loading && !error && (
              <div className="w-full flex flex-col gap-3 items-start">
                <p className="text-sm text-text-secondary">
                  This PDF may take a moment to load.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="primary"
                    widthMode="hug"
                    icon={<Icon name="link" weight={400} />}
                    onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
                  >
                    Open in new tab
                  </Button>
                  <Button
                    variant="primary"
                    widthMode="hug"
                    icon={<Icon name="download" weight={400} />}
                    onClick={handleDownload}
                  >
                    Download PDF
                  </Button>
                  <Button
                    variant="primary"
                    widthMode="hug"
                    icon={<Icon name="link" weight={400} />}
                    onClick={() => window.open(GBR_APP_PROTOTYPE_URL, '_blank', 'noopener,noreferrer')}
                  >
                    View App Prototype in Figma
                  </Button>
                </div>
                <iframe
                  src={url}
                  title="Great British Railways PDF"
                  className="w-full min-h-[600px] border border-gray-700 rounded bg-white"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default GreatBritishRailwaysConcept
