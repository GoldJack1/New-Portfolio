import { PADDING_CLASSES } from '../utils/paddingClasses'

const PrivacyPolicy = () => {
  return (
    <div className="w-full overflow-x-hidden bg-gray-900 min-h-screen flex flex-col pt-[150px]">
      <section className={`w-full ${PADDING_CLASSES.page.full} flex-grow flex flex-col`}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary mb-8 break-words">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-base sm:text-lg font-light text-gray-200">
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
