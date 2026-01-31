interface SubpageHeroProps {
  image: string
  pageName: string
  subtext?: string
  className?: string
}

const SubpageHero = ({
  image,
  pageName,
  subtext,
  className = '',
}: SubpageHeroProps) => {
  return (
    <div
      className={`relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden ${className}`}
      role="banner"
      aria-label={pageName}
    >
      {/* Background image */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        aria-hidden
      />

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
