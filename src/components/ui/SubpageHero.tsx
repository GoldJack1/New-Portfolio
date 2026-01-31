import { useState, useEffect, useRef } from 'react'

interface SubpageHeroProps {
  /** Image URL for background (used when video is not provided) */
  image?: string
  /** Video URL for background (takes precedence over image when provided) */
  video?: string
  pageName: string
  subtext?: string
  shrinkOnScroll?: boolean
  className?: string
}

const MIN_HEIGHT = 100
const SCROLL_RANGE = 100

function getMaxHeight(): number {
  if (typeof window === 'undefined') return 500
  if (window.innerWidth >= 1024) return 500
  if (window.innerWidth >= 640) return 400
  return 300
}

const SubpageHero = ({
  image,
  video,
  pageName,
  subtext,
  shrinkOnScroll = false,
  className = '',
}: SubpageHeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (video && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [video])

  const [height, setHeight] = useState(() =>
    shrinkOnScroll ? getMaxHeight() : undefined
  )

  useEffect(() => {
    if (!shrinkOnScroll) return

    const updateHeight = () => {
      const maxHeight = getMaxHeight()
      const scrollY = window.scrollY ?? window.pageYOffset
      const progress = Math.min(scrollY / SCROLL_RANGE, 1)
      const newHeight = maxHeight - (maxHeight - MIN_HEIGHT) * progress
      setHeight(Math.round(newHeight))
    }

    const handleScroll = () => {
      requestAnimationFrame(updateHeight)
    }

    updateHeight()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateHeight)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateHeight)
    }
  }, [shrinkOnScroll])

  const containerStyle = shrinkOnScroll && height !== undefined
    ? { height: `${height}px` }
    : undefined

  const heightClasses = shrinkOnScroll ? '' : 'h-[300px] sm:h-[400px] lg:h-[500px]'
  const useVideo = Boolean(video)

  return (
    <div
      className={`relative w-full overflow-hidden ${heightClasses} ${className}`}
      style={containerStyle}
      role="banner"
      aria-label={pageName}
    >
      {/* Background media */}
      {useVideo ? (
        <>
          <div className="absolute inset-0 w-full h-full bg-black" aria-hidden />
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            loop
            muted
            playsInline
            autoPlay
            preload="auto"
            aria-hidden
          >
            <source src={video} type="video/mp4" />
          </video>
        </>
      ) : image ? (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          aria-hidden
        />
      ) : null}

      {/* Blur overlay */}
      <div
        className="absolute inset-0 backdrop-blur-[15px] bg-black/30"
        aria-hidden
      />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary text-center break-words m-0">
          {pageName}
        </h1>
        {subtext && (
          <p className="mt-2 text-lg text-text-secondary text-center break-words m-0">
            {subtext}
          </p>
        )}
      </div>
    </div>
  )
}

export default SubpageHero
