import { useState, useEffect, useRef } from 'react'
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
  const autoPlayTimerRef = useRef<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  // Default gradient overlay: left to right
  // gray-1000 at 90% opacity at 0%, 70% opacity at 33%, 0% opacity at 70% and 100%
  const defaultGradient = 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 33%, rgba(0,0,0,0) 70%, rgba(0,0,0,0) 100%)'
  // Mobile gradient overlay: stronger overlay for better text readability on smaller screens
  const mobileGradient = 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 33%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.0) 100%)'

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

  // Render background based on type
  const renderBackground = (slide: HeroSlide, isActive: boolean = true) => {
    const { backgroundType, backgroundValue } = slide

    switch (backgroundType) {
      case 'video':
        return (
          <>
            {!isActive && slide.fallbackBackground && (
              <div
                className="absolute inset-0 w-full h-full"
                style={{ background: slide.fallbackBackground }}
              />
            )}
            {isActive && (
              <video
                key={`video-${backgroundValue}`}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={backgroundValue} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </>
        )
      case 'image':
        return (
          <>
            {slide.fallbackBackground && (
              <div
                className="absolute inset-0 w-full h-full"
                style={{ background: slide.fallbackBackground }}
              />
            )}
            <img
              src={backgroundValue}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                // Hide broken image and show fallback
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
  const renderSlideContent = (slide: HeroSlide, isActive: boolean = true) => {
    const gradientOverlay = slide.gradientOverlay || defaultGradient

    return (
      <div className="relative w-full h-full">
        {/* Background layer */}
        {renderBackground(slide, isActive)}

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
        <div className="relative z-10 flex items-center justify-start h-full py-12 sm:py-16 lg:py-24 pl-4 lg:pl-8">
          <div className="max-w-full sm:max-w-[50%] lg:max-w-[50%] w-full text-left flex flex-col gap-[5px] sm:gap-[10px]">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary break-words m-0" style={{ lineHeight: '1.25', letterSpacing: '-0.01em' }}>
              {slide.heading}
            </h1>
            {slide.subtext && (
              <p className="text-base sm:text-lg md:text-xl font-normal text-text-secondary break-words m-0" style={{ lineHeight: '1.5', letterSpacing: '0' }}>
                {slide.subtext}
              </p>
            )}
            {slide.caption && (
              <p className="text-xs sm:text-xs md:text-sm font-normal text-text-tertiary break-words m-0" style={{ lineHeight: '1.4', letterSpacing: '0.01em' }}>
                {slide.caption}
              </p>
            )}
            {slide.buttonText && (
              <div>
                {slide.buttonLink ? (
                  <a 
                    href={slide.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="primary"
                    >
                      {slide.buttonText}
                    </Button>
                  </a>
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
                  {renderSlideContent(slide, isActive)}
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
        renderSlideContent(displaySlides[0])
      )}
    </div>
  )
}

export default Hero
