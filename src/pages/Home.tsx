import { PADDING_CLASSES } from '../utils/paddingClasses'

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden bg-homeBackground min-h-screen flex flex-col pt-[150px]">
      <section className={`w-full ${PADDING_CLASSES.page.full} flex-grow flex flex-col justify-center`}>
        <div className="text-left flex flex-col gap-[10px]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-text-primary mb-0 pb-[10px] break-words">
            Jack Wingate
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light text-text-secondary mb-0 break-words">
            Welcome to my portfolio
          </p>
          <p className="text-base sm:text-lg font-light text-text-tertiary max-w-2xl break-words">
            Explore my projects, learn about me, and get in touch.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home
