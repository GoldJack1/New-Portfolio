const About = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <section className="max-w-4xl mx-auto px-4 md:px-8 py-16 md:py-24 w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 break-words">
          About
        </h1>
        <div className="space-y-6 text-base sm:text-lg text-gray-700">
          <p className="break-words">
            Welcome to my portfolio! I'm Jack Wingate, and this is where I showcase
            my work and share a bit about myself.
          </p>
          <p className="break-words">
            I'm passionate about creating beautiful, functional web experiences
            that make a difference.
          </p>
          <p className="break-words">
            Feel free to explore my projects and reach out if you'd like to connect!
          </p>
        </div>
      </section>
    </div>
  )
}

export default About
