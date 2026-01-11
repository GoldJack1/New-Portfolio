import { PADDING_CLASSES } from '../utils/paddingClasses'

const Projects = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <section className={`w-full ${PADDING_CLASSES.page.full}`}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-50 mb-8 break-words">
          Projects
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <div className="bg-gray-800 p-6 rounded-2xl w-full min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-50 mb-4 break-words">Project 1</h2>
            <p className="text-gray-300 break-words">
              Description of project 1 goes here.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl w-full min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-50 mb-4 break-words">Project 2</h2>
            <p className="text-gray-300 break-words">
              Description of project 2 goes here.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl w-full min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-50 mb-4 break-words">Project 3</h2>
            <p className="text-gray-300 break-words">
              Description of project 3 goes here.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Projects
