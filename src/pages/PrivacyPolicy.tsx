import SubpageHero from '../components/ui/SubpageHero'
import { PADDING_CLASSES } from '../utils/paddingClasses'
import project1Image from '../assets/images/projects/Hero Imgs/Project 1.jpg'

const PrivacyPolicy = () => {
  return (
    <div className="w-full overflow-x-hidden bg-gray-1000 min-h-screen flex flex-col">
      <SubpageHero
        image={project1Image}
        pageName="Privacy Policy"
        shrinkOnScroll
      />
      <section className={`w-full ${PADDING_CLASSES.page.horizontal} pt-5 pb-5 flex-grow flex flex-col`}>
        <div className="max-w-3xl space-y-6 text-base sm:text-lg font-light text-text-primary">
          <p className="break-words">
            This privacy policy describes how we collect, use, and protect your personal information.
          </p>
          <p className="break-words">
            Your privacy is important to us. We are committed to protecting your personal data and respecting your privacy rights.
          </p>
          <p className="break-words">
            This policy will be updated as needed to reflect changes in our practices or for legal, operational, or regulatory reasons.
          </p>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy
