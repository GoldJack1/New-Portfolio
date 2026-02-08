import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import { Icon } from './Icon'

export interface HeroSlide {
  backgroundType: 'solid' | 'gradient' | 'image' | 'video'
  backgroundValue: string
  heading: string
  caption?: string
  subtext?: string
  buttonText?: string
  buttonLink?: string
  buttonOnClick?: () => void
  gradientOverlay?: string
  fallbackBackground?: string
}

interface HeroProps {
  slides?: HeroSlide[]
  autoPlay?: boolean
  autoPlayInterval?: number
  pauseOnHover?: boolean
  showNavigation?: boolean
  showIndicators?: boolean
  height?: string
  className?: string
}

const Hero = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  pauseOnHover = true,
  showNavigation = true,
  showIndicators = true,
  height = '100vh',
  className = '',
}: HeroProps) => {
  // If slides provided, use carousel mode; otherwise use standalone mode
  const isCarousel = slides && slides.length > 1
  const displaySlides = slides && slides.length > 0 ? slides : [
    {
      backgroundType: 'solid' as const,
      backgroundValue: '#1A2332',
      heading: 'Hero Heading',
      subtext: 'Hero subtext',
    }
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [prevHovered, setPrevHovered] = useState(false)
  const [nextHovered, setNextHovered] = useState(false)
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(new Set())
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRefsRef = useRef<(HTMLVideoElement | null)[]>([])

  // Default gradient overlay: left to right
  // gray-1000 at 90% opacity at 0%, 70% opacity at 33%, 0% opacity at 70% and 100%
  const defaultGradient = 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 33%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)'
  // Mobile gradient overlay: stronger overlay for better text readability on smaller screens
  const mobileGradient = 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 33%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.3) 100%)'

  // Auto-play functionality
  useEffect(() => {
    if (!isCarousel || !autoPlay || isPaused) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current)
        autoPlayTimerRef.current = null
      }
      return
    }

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displaySlides.length)
    }, autoPlayInterval)

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current)
      }
    }
  }, [isCarousel, autoPlay, autoPlayInterval, isPaused, displaySlides.length])

  // Handle pause on hover
  const handleMouseEnter = () => {
    if (pauseOnHover && isCarousel) {
      setIsPaused(true)
    }
  }

  const handleMouseLeave = () => {
    if (pauseOnHover && isCarousel) {
      setIsPaused(false)
    }
  }

  // Navigation functions
  const goToSlide = (index: number) => {
    if (isCarousel) {
      setCurrentSlide(index)
    }
  }

  const goToPrevious = () => {
    if (isCarousel) {
      setCurrentSlide((prev) => (prev - 1 + displaySlides.length) % displaySlides.length)
    }
  }

  const goToNext = () => {
    if (isCarousel) {
      setCurrentSlide((prev) => (prev + 1) % displaySlides.length)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isCarousel) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isCarousel, displaySlides.length])

  // Play active video, pause others when currentSlide changes
  useEffect(() => {
    const refs = videoRefsRef.current
    refs.forEach((video, i) => {
      if (video) {
        if (i === currentSlide) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      }
    })
  }, [currentSlide])

  // Preload first slide media in document head for earlier fetch
  const firstSlide = displaySlides[0]
  const firstSlideMediaUrl = firstSlide?.backgroundValue
  const firstSlideMediaType = firstSlide?.backgroundType
  useEffect(() => {
    const first = displaySlides[0]
    if (!first || (first.backgroundType !== 'image' && first.backgroundType !== 'video')) return
    const as = first.backgroundType === 'video' ? 'video' : 'image'
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = as
    link.href = first.backgroundValue
    if (as === 'video') {
      link.setAttribute('type', 'video/mp4')
    }
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [firstSlideMediaUrl, firstSlideMediaType])

  const onMediaLoaded = useCallback((index: number) => {
    setLoadedSlides((prev) => new Set(prev).add(index))
  }, [])

  // Resolve relative asset URLs (e.g. from Vite imports) so they work on all routes.
  // Root-relative paths (e.g. /images/...) are left as-is so the browser always requests same-origin (avoids cert/permission issues on some hosts).
  const resolveAssetUrl = (url: string): string => {
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//') || url.startsWith('data:')) return url
    if (url.startsWith('/') && !url.startsWith('//')) return url
    if (typeof window === 'undefined') return url
    try {
      const base = window.location.origin + import.meta.env.BASE_URL
      return new URL(url, base).href
    } catch {
      return url
    }
  }

  // Render background based on type
  const renderBackground = (
    slide: HeroSlide,
    isActive: boolean = true,
    slideIndex: number = 0,
    isMediaLoaded: boolean = false
  ) => {
    const { backgroundType, backgroundValue } = slide

    switch (backgroundType) {
      case 'video':
        return (
          <>
            <div className="absolute inset-0 w-full h-full bg-black" aria-hidden />
            {slide.fallbackBackground && (
              <div
                className="absolute inset-0 w-full h-full"
                style={{ background: slide.fallbackBackground }}
              />
            )}
            <video
              key={`video-${backgroundValue}`}
              ref={(el) => {
                if (el) videoRefsRef.current[slideIndex] = el
              }}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isActive && isMediaLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none invisible'}`}
              loop
              muted
              playsInline
              preload="auto"
              aria-hidden={!isActive}
              onCanPlayThrough={() => onMediaLoaded(slideIndex)}
            >
              <source src={resolveAssetUrl(backgroundValue)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </>
        )
      case 'image':
        return (
          <>
            <div className="absolute inset-0 w-full h-full bg-black" aria-hidden />
            {slide.fallbackBackground && (
              <div
                className="absolute inset-0 w-full h-full"
                style={{ background: slide.fallbackBackground }}
              />
            )}
            <img
              src={resolveAssetUrl(backgroundValue)}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${slide.fallbackBackground ? 'opacity-100' : (isMediaLoaded ? 'opacity-100' : 'opacity-0')}`}
              loading="eager"
              decoding="async"
              fetchPriority={isActive ? 'high' : undefined}
              onLoad={() => onMediaLoaded(slideIndex)}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          </>
        )
      case 'gradient':
        return (
          <div
            className="absolute inset-0 w-full h-full"
            style={{ background: backgroundValue }}
          />
        )
      case 'solid':
      default:
        return (
          <div
            className="absolute inset-0 w-full h-full"
            style={{ backgroundColor: backgroundValue }}
          />
        )
    }
  }

  // Render slide content
  const renderSlideContent = (slide: HeroSlide, isActive: boolean = true, slideIndex: number = 0) => {
    const gradientOverlay = slide.gradientOverlay || defaultGradient

    return (
      <div className="relative w-full h-full">
        {/* Background layer */}
        {renderBackground(slide, isActive, slideIndex, loadedSlides.has(slideIndex))}

        {/* Gradient overlay - responsive for mobile */}
        <div
          className="absolute inset-0 w-full h-full z-[1] sm:hidden"
          style={{ background: slide.gradientOverlay || mobileGradient }}
        />
        <div
          className="absolute inset-0 w-full h-full z-[1] hidden sm:block"
          style={{ background: gradientOverlay }}
        />

        {/* Content layer */}
        <div className="relative z-10 flex items-center justify-start h-full py-12 sm:py-16 lg:py-24 pl-4 pr-4 lg:pl-8 lg:pr-8">
          <div className="max-w-[75%] sm:max-w-[50%] w-full text-left flex flex-col gap-[5px] sm:gap-[10px]">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary break-words m-0" style={{ lineHeight: 'normal', letterSpacing: '-0.01em' }}>
              {slide.heading}
            </h1>
            {slide.subtext && (
              <p className="text-lg md:text-xl font-normal text-text-secondary break-words m-0" style={{ lineHeight: 'normal', letterSpacing: '0' }}>
                {slide.subtext}
              </p>
            )}
            {slide.caption && (
              <p className="text-sm sm:text-xs md:text-sm font-normal text-text-tertiary break-words m-0" style={{ lineHeight: 'normal', letterSpacing: '0.01em' }}>
                {slide.caption}
              </p>
            )}
            {slide.buttonText && (
              <div className="pt-2.5">
                {slide.buttonLink ? (
                  slide.buttonLink.startsWith('/') ? (
                    <Link to={slide.buttonLink}>
                      <Button
                        variant="primary"
                        icon={<Icon name="chevron-right" weight={400} size={14} />}
                        iconPosition="right"
                      >
                        {slide.buttonText}
                      </Button>
                    </Link>
                  ) : (
                    <a
                      href={slide.buttonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="primary"
                        icon={<Icon name="link" weight={400} size={14} />}
                        iconPosition="left"
                      >
                        {slide.buttonText}
                      </Button>
                    </a>
                  )
                ) : (
                  <Button
                    variant="primary"
                    onClick={slide.buttonOnClick}
                  >
                    {slide.buttonText}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={heroRef}
      className={`relative w-full overflow-hidden min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] ${className}`}
      style={{ height }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={isCarousel ? 'region' : undefined}
      aria-label={isCarousel ? 'Hero carousel' : 'Hero section'}
    >
      {isCarousel ? (
        <>
          {/* Carousel slides */}
          <div className="relative w-full h-full">
            {displaySlides.map((slide, index) => {
              const isActive = index === currentSlide
              return (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                  aria-hidden={!isActive}
                >
                  {renderSlideContent(slide, isActive, index)}
                </div>
              )
            })}
          </div>

          {/* Navigation controls container (buttons + indicators) */}
          {(showNavigation || showIndicators) && displaySlides.length > 1 && (
            <div
              className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 sm:gap-4 lg:gap-5"
            >
              {/* Previous button */}
              {showNavigation && (
                <Button
                  iconOnly
                  icon={<Icon name="chevron-left" weight={prevHovered ? 900 : 400} size={20} />}
                  variant="weight"
                  onClick={goToPrevious}
                  onHoverChange={setPrevHovered}
                  className="flex-shrink-0"
                  aria-label="Previous slide"
                />
              )}

              {/* Indicators */}
              {showIndicators && (
                <div
                  className="flex gap-1.5 sm:gap-2 lg:gap-2.5"
                  role="tablist"
                  aria-label="Slide indicators"
                >
                  {displaySlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 ${
                        index === currentSlide
                          ? 'bg-text-primary'
                          : 'bg-text-primary opacity-50 hover:opacity-75'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-selected={index === currentSlide}
                      role="tab"
                    />
                  ))}
                </div>
              )}

              {/* Next button */}
              {showNavigation && (
                <Button
                  iconOnly
                  icon={<Icon name="chevron-right" weight={nextHovered ? 900 : 400} size={20} />}
                  variant="weight"
                  onClick={goToNext}
                  onHoverChange={setNextHovered}
                  className="flex-shrink-0"
                  aria-label="Next slide"
                />
              )}
            </div>
          )}
        </>
      ) : (
        // Standalone mode
        renderSlideContent(displaySlides[0], true, 0)
      )}
    </div>
  )
}

export default Hero
