const About = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <section className="w-full px-4 md:px-8 pb-16 md:pb-24 bg-gray-50">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 break-words">
          About
        </h1>
        <div className="space-y-6 text-base sm:text-lg font-light text-gray-700">
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
