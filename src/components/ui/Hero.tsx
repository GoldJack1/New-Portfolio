import { useState, useEffect, useRef } from 'react'
import Button from './Button'

export interface HeroSlide {
  backgroundType: 'solid' | 'gradient' | 'image' | 'video'
  backgroundValue: string
  heading: string
  subtext?: string
  buttonText?: string
  buttonLink?: string
  buttonOnClick?: () => void
  gradientOverlay?: string
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
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  const autoPlayTimerRef = useRef<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  // Track window width for responsive button sizing
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
  const renderBackground = (slide: HeroSlide) => {
    const { backgroundType, backgroundValue } = slide

    switch (backgroundType) {
      case 'video':
        return (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src={backgroundValue} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      case 'image':
        return (
          <img
            src={backgroundValue}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
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
  const renderSlideContent = (slide: HeroSlide) => {
    const gradientOverlay = slide.gradientOverlay || defaultGradient

    return (
      <div className="relative w-full h-full">
        {/* Background layer */}
        {renderBackground(slide)}

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
          <div className="max-w-full sm:max-w-2xl lg:max-w-4xl w-full text-left flex flex-col gap-4 sm:gap-6 lg:gap-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold text-text-primary leading-tight sm:leading-snug lg:leading-normal break-words">
              {slide.heading}
            </h1>
            {slide.subtext && (
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-light text-text-secondary break-words">
                {slide.subtext}
              </p>
            )}
            {slide.buttonText && (
              <div className="mt-4 sm:mt-6 lg:mt-8">
                {slide.buttonLink ? (
                  <a href={slide.buttonLink}>
                    <Button
                      size={windowWidth < 640 ? 'sm' : windowWidth < 1024 ? 'md' : 'lg'}
                      variant="primary"
                    >
                      {slide.buttonText}
                    </Button>
                  </a>
                ) : (
                  <Button
                    size={windowWidth < 640 ? 'sm' : windowWidth < 1024 ? 'md' : 'lg'}
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
            {displaySlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                aria-hidden={index !== currentSlide}
              >
                {renderSlideContent(slide)}
              </div>
            ))}
          </div>

          {/* Navigation controls container (buttons + indicators) */}
          {(showNavigation || showIndicators) && displaySlides.length > 1 && (
            <div
              className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 sm:gap-4 lg:gap-5"
            >
              {/* Previous button */}
              {showNavigation && (
                <button
                  onClick={goToPrevious}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-800 bg-opacity-75 hover:bg-opacity-100 text-text-primary rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 flex-shrink-0"
                  aria-label="Previous slide"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
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
                <button
                  onClick={goToNext}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-800 bg-opacity-75 hover:bg-opacity-100 text-text-primary rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 flex-shrink-0"
                  aria-label="Next slide"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
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
