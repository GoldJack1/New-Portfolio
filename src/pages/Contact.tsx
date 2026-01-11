import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Button from '../components/ui/Button'
import { PADDING_CLASSES } from '../utils/paddingClasses'

const Contact = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <section className={`w-full ${PADDING_CLASSES.page.full} bg-gray-50`}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 break-words">
          Contact
        </h1>
        <div className="bg-gray-200 p-6 sm:p-8 rounded-2xl w-full min-w-0">
          <form className="space-y-6 w-full">
            <Input
              label="Name"
              id="name"
              name="name"
              placeholder="Your name"
            />
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
            />
            <Textarea
              label="Message"
              id="message"
              name="message"
              rows={6}
              placeholder="Your message"
            />
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Contact
