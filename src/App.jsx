import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Menu,
  X,
  ArrowRight,
  Star,
  Wifi,
  Utensils,
  Waves,
  Car,
  Clock,
  ConciergeBell,
  BedDouble,
  Users,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
} from 'lucide-react'

const gold = '#E8B653'

const rooms = [
  {
    name: 'Standard Room',
    price: 1800,
    guests: 2,
    beds: '1 Queen Bed',
    image:
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=85',
    description: 'A comfortable, beautifully designed room for a relaxing stay.',
  },
  {
    name: 'Deluxe Room',
    price: 2800,
    guests: 2,
    beds: '1 King Bed',
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=85',
    description: 'Extra space, elegant interiors, and a little more luxury.',
  },
  {
    name: 'Executive Suite',
    price: 4500,
    guests: 3,
    beds: 'King Bed',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85',
    description: 'A sophisticated suite for business and premium comfort.',
  },
  {
    name: 'Family Room',
    price: 3800,
    guests: 4,
    beds: '2 Beds',
    image:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=85',
    description: 'More room to relax and enjoy your time together.',
  },
]

const facilities = [
  { icon: Wifi, name: 'Free Wi-Fi', detail: 'Stay connected' },
  { icon: Utensils, name: 'Restaurant', detail: 'Delicious dining' },
  { icon: Clock, name: '24/7 Reception', detail: 'Here to help' },
  { icon: Waves, name: 'Swimming Pool', detail: 'Relax and unwind' },
  { icon: Car, name: 'Parking', detail: 'Safe parking' },
  { icon: ConciergeBell, name: 'Room Service', detail: 'Comfort at your door' },
]

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-amber-600">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 leading-7 text-slate-500">{description}</p>}
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [formStatus, setFormStatus] = useState('')
  const [bookingRoom, setBookingRoom] = useState('')

  const navLinks = [
    ['Home', '#home'],
    ['Rooms', '#rooms'],
    ['Facilities', '#facilities'],
    ['About', '#about'],
    ['Contact', '#contact'],
  ]

  function bookRoom(roomName) {
    setBookingRoom(roomName || 'Your preferred room')
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSending(true)
    setFormStatus('')

    const form = event.currentTarget
    const formData = new FormData(form)
    formData.append('_subject', 'New Bekam Hotel website inquiry')
    formData.append('_captcha', 'true')

    try {
      const response = await fetch('https://formsubmit.co/ajax/bekambx@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Message could not be sent')
      }

      setFormStatus(
        'Your message was submitted! If this is your first submission, check your inbox to activate FormSubmit.'
      )
      form.reset()
      setBookingRoom('')
    } catch {
      setFormStatus(
        'We could not submit your message. Please email bekambx@gmail.com directly or try again.'
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="overflow-hidden bg-white text-slate-900">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-slate-950/90 text-white shadow-lg backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400 text-slate-950">
              <BedDouble size={25} />
            </span>
            <span>
              <span className="block text-lg font-extrabold tracking-wide">
                BEKAM <span className="text-amber-400">HOTEL</span>
              </span>
              <span className="text-[9px] uppercase tracking-[.3em] text-slate-400">
                Comfort meets elegance
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm text-slate-200 transition hover:text-amber-400"
              >
                {label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => bookRoom('')}
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
            >
              Book Now
            </button>
          </nav>

          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-white/20 p-2 md:hidden"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-white/10 bg-slate-950 px-5 py-4 md:hidden">
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-3 text-sm hover:bg-white/10"
              >
                {label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                bookRoom('')
              }}
              className="mt-3 w-full rounded-full bg-amber-400 px-5 py-3 font-bold text-slate-950"
            >
              Book Your Stay
            </button>
          </nav>
        )}
      </header>

      <main>
        <section id="home" className="relative flex min-h-[680px] items-center bg-slate-950 pt-24 sm:min-h-[750px]">
          <img
            src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=2000&q=90"
            alt="Elegant hotel bedroom"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/65 to-slate-950/15" />
          <div className="relative mx-auto w-full max-w-7xl px-5 py-24 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-white/10 px-4 py-2 text-xs font-semibold text-amber-300 backdrop-blur">
                <Star size={14} fill={gold} />
                WELCOME TO BEKAM HOTEL
              </div>
              <h1 className="text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-7xl">
                Your Comfort.
                <br />
                <span className="text-amber-400">Our Priority.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-slate-200 sm:text-lg">
                Discover a beautiful place to relax, recharge, and create unforgettable
                memories. Experience hospitality designed around you.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => bookRoom('')}
                  className="inline-flex items-center gap-3 rounded-full bg-amber-400 px-7 py-4 font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-amber-300"
                >
                  Book Your Stay <ArrowRight size={18} />
                </button>
                <a
                  href="#about"
                  className="inline-flex items-center gap-3 rounded-full border border-white/50 px-7 py-4 font-semibold transition hover:bg-white/10"
                >
                  Discover Us
                </a>
              </div>
              <div className="mt-12 flex flex-wrap gap-7 text-sm text-slate-200">
                <span>
                  <strong className="text-amber-400">01.</strong> Personal service
                </span>
                <span>
                  <strong className="text-amber-400">02.</strong> Elegant rooms
                </span>
                <span>
                  <strong className="text-amber-400">03.</strong> Relaxing stays
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="rooms" className="scroll-mt-20 bg-white px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Stay your way"
              title="Rooms & Suites"
              description="Find a space that feels like yours, from a cozy room to a spacious suite."
            />

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {rooms.map((room, index) => (
                <motion.article
                  key={room.name}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      loading="lazy"
                      className="h-56 transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-900">
                      Guest favorite
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900">{room.name}</h3>
                    <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                      {room.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-b border-slate-100 pb-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Users size={15} /> {room.guests} guests
                      </span>
                      <span className="flex items-center gap-1">
                        <BedDouble size={15} /> {room.beds}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <span className="text-xl font-extrabold text-slate-900">
                          {room.price.toLocaleString()} ETB
                        </span>
                        <span className="block text-xs text-slate-400">per night · sample price</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => bookRoom(room.name)}
                        aria-label={`Inquire about ${room.name}`}
                        className="rounded-full bg-slate-900 p-3 text-white transition hover:bg-amber-400 hover:text-slate-950"
                      >
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
            <p className="mt-5 text-xs text-slate-400">
              Room prices are illustrative. Confirm actual prices and availability with the hotel.
            </p>
          </div>
        </section>

        <section id="facilities" className="scroll-mt-20 bg-amber-50/70 px-5 py-24 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionTitle
                eyebrow="Everything you need"
                title="Little comforts. Lasting memories."
                description="Enjoy thoughtful amenities designed to make every moment of your stay more comfortable."
              />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {facilities.map(({ icon: Icon, name, detail }) => (
                  <div
                    key={name}
                    className="rounded-2xl border border-amber-100 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span className="mb-4 inline-flex rounded-xl bg-amber-100 p-3 text-amber-700">
                      <Icon size={23} />
                    </span>
                    <h3 className="font-bold text-slate-900">{name}</h3>
                    <p className="mt-1 text-xs text-slate-500">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85"
                alt="Resort swimming pool and hotel"
                loading="lazy"
                className="h-[440px] rounded-3xl shadow-xl"
              />
              <div className="absolute -bottom-5 left-4 right-4 rounded-2xl bg-slate-950 p-5 text-white shadow-xl sm:left-8 sm:right-8">
                <p className="text-xs uppercase tracking-widest text-amber-400">The Bekam experience</p>
                <p className="mt-2 text-lg font-bold">Arrive as a guest. Leave with memories.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-20 px-5 py-24 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85"
                alt="Contemporary hotel exterior"
                loading="lazy"
                className="h-[420px] rounded-3xl shadow-lg"
              />
            </motion.div>
            <div>
              <SectionTitle
                eyebrow="A place you'll love"
                title="Hospitality with heart."
                description="At Bekam Hotel, comfort and thoughtful service are at the center of the experience. Whether you're traveling for work, enjoying a getaway, or spending time with loved ones, we want you to feel welcome."
              />
              <div className="space-y-4 text-sm text-slate-600">
                {[
                  'Comfortable, carefully designed spaces',
                  'Friendly and attentive service',
                  'A welcoming place to relax and recharge',
                ].map((item) => (
                  <p key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="shrink-0 text-amber-600" size={19} />
                    {item}
                  </p>
                ))}
              </div>
              <button
                type="button"
                onClick={() => bookRoom('')}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-slate-900 px-7 py-4 font-bold text-white transition hover:bg-amber-400 hover:text-slate-950"
              >
                Plan Your Visit <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 bg-slate-950 px-5 py-24 text-white lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-amber-400">
                Get in touch
              </p>
              <h2 className="text-4xl font-extrabold sm:text-5xl">
                Let&apos;s plan your <span className="text-amber-400">stay.</span>
              </h2>
              <p className="mt-5 max-w-md leading-7 text-slate-300">
                Have a question, need more details, or want to inquire about a room? Send us a
                message and we&apos;ll get back to you.
              </p>

              <div className="mt-9 space-y-6">
                <a href="tel:0964110631" className="flex items-center gap-4">
                  <span className="rounded-xl bg-white/10 p-3 text-amber-400">
                    <Phone />
                  </span>
                  <span>
                    <span className="block text-xs text-slate-400">Phone</span>
                    <strong>0964110631</strong>
                  </span>
                </a>
                <a href="mailto:bekambx@gmail.com" className="flex items-center gap-4">
                  <span className="rounded-xl bg-white/10 p-3 text-amber-400">
                    <Mail />
                  </span>
                  <span>
                    <span className="block text-xs text-slate-400">Email</span>
                    <strong>bekambx@gmail.com</strong>
                  </span>
                </a>
                <div className="flex items-center gap-4">
                  <span className="rounded-xl bg-white/10 p-3 text-amber-400">
                    <MapPin />
                  </span>
                  <span>
                    <span className="block text-xs text-slate-400">Location</span>
                    <strong>Ethiopia</strong>
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 text-slate-900 shadow-2xl sm:p-9">
              <h3 className="text-2xl font-bold">Send us a message</h3>
              <p className="mt-2 text-sm text-slate-500">
                Fill in the details below and we&apos;ll receive your inquiry by email.
              </p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold">
                  Your name
                  <input
                    name="name"
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Enter your name"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                  />
                </label>
                <label className="text-sm font-semibold">
                  Your email
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                  />
                </label>
              </div>

              <label className="mt-5 block text-sm font-semibold">
                Subject
                <select
                  name="subject"
                  defaultValue="Room inquiry"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:border-amber-500"
                >
                  <option>Room inquiry</option>
                  <option>Booking request</option>
                  <option>Facilities question</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="mt-5 block text-sm font-semibold">
                Message
                <textarea
                  name="message"
                  required
                  minLength={10}
                  maxLength={3000}
                  rows={5}
                  placeholder="Tell us about your plans, preferred dates, or questions..."
                  className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </label>

              {bookingRoom && (
                <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-amber-50 p-3 text-sm">
                  <span>
                    Interested in: <strong>{bookingRoom}</strong>
                  </span>
                  <button type="button" onClick={() => setBookingRoom('')} className="text-amber-800 underline">
                    Clear
                  </button>
                </div>
              )}

              {bookingRoom && <input type="hidden" name="preferred_room" value={bookingRoom} />}

              {formStatus && (
                <p role="status" aria-live="polite" className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-slate-800">
                  {formStatus}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-amber-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-amber-300 disabled:cursor-wait disabled:opacity-60"
              >
                <Send size={18} />
                {sending ? 'Sending...' : 'Send Message'}
              </button>
              <p className="mt-4 text-xs leading-5 text-slate-400">
                Your message is handled by FormSubmit, a third-party form service.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950 px-5 py-7 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <a href="#home" className="font-extrabold tracking-wide">
            BEKAM <span className="text-amber-400">HOTEL</span>
          </a>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Bekam Hotel. All rights reserved.
          </p>
          <a href="mailto:bekambx@gmail.com" className="text-sm text-amber-400 hover:text-amber-300">
            Contact us <ArrowRight className="ml-1 inline" size={15} />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
