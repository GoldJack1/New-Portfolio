import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Button from '../components/ui/Button'

const Contact = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <section className="w-full max-w-2xl px-4 md:px-8 py-16 md:py-24">
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
