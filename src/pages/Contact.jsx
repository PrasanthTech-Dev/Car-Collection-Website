import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import { Pin, Phone, Mail, Clock, Check } from '../components/Icons.jsx'
import { img } from '../data/cars.js'
import { useStore } from '../context/StoreContext.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const { toast } = useStore()
  const [form, setForm] = useState({ name: '', email: '', subject: 'General enquiry', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const submit = (ev) => {
    ev.preventDefault()
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Please enter your name'
    if (!EMAIL_RE.test(form.email)) e.email = 'Enter a valid email address'
    if (form.message.trim().length < 10) e.message = 'Message should be at least 10 characters'
    setErrors(e)
    if (Object.keys(e).length) return
    try {
      const all = JSON.parse(localStorage.getItem('royal_messages') || localStorage.getItem('apex_messages') || '[]')
      localStorage.setItem('royal_messages', JSON.stringify([{ ...form, at: new Date().toISOString() }, ...all]))
    } catch {
      /* ignore */
    }
    setSent(true)
    toast('Message sent — we’ll reply within 24 hours')
  }

  const info = [
    { icon: Pin, title: 'Showroom', lines: ['21 Mayfair Avenue', 'London W1K 3JL'] },
    { icon: Phone, title: 'Call us', lines: ['+44 20 7946 0123', 'Mon–Sat, 9am–7pm'] },
    { icon: Mail, title: 'Email', lines: ['concierge@royalmotors.com', 'Replies within 24h'] },
    { icon: Clock, title: 'Opening hours', lines: ['Mon–Fri 9:00–19:00', 'Sat 10:00–17:00 · Sun by appt.'] },
  ]

  return (
    <>
      <PageHero eyebrow="Contact Us" title="Let’s talk cars" subtitle="Questions about a vehicle, financing or delivery? Our advisors are here to help." image={img(1, 1800)} />
      <section className="container-x pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="card p-6 sm:p-9">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                    <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-gold-500 text-3xl text-ink-950"><Check /></div>
                    <h2 className="h-display text-2xl">Thank you, {form.name.split(' ')[0]}.</h2>
                    <p className="mt-2 text-white/60">Your message is on its way to our team.</p>
                    <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: 'General enquiry', message: '' }) }} className="btn-ghost mt-6">Send another</button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2">
                    <h2 className="h-display text-2xl sm:col-span-2">Send us a message</h2>
                    <div>
                      <label htmlFor="c-name" className="label">Name</label>
                      <input id="c-name" className={`input ${errors.name ? '!border-crimson-500' : ''}`} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Your name" />
                      {errors.name && <p role="alert" className="mt-1.5 text-xs text-crimson-500">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="c-email" className="label">Email</label>
                      <input id="c-email" type="email" className={`input ${errors.email ? '!border-crimson-500' : ''}`} value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@email.com" />
                      {errors.email && <p role="alert" className="mt-1.5 text-xs text-crimson-500">{errors.email}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="c-subject" className="label">Subject</label>
                      <select id="c-subject" className="input" value={form.subject} onChange={(e) => set('subject', e.target.value)}>
                        {['General enquiry', 'Buying a car', 'Selling / trade-in', 'Financing', 'Delivery & shipping', 'Servicing'].map((s) => <option key={s} className="bg-ink-800">{s}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="c-msg" className="label">Message</label>
                      <textarea id="c-msg" rows={5} className={`input resize-none ${errors.message ? '!border-crimson-500' : ''}`} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="How can we help?" />
                      {errors.message && <p role="alert" className="mt-1.5 text-xs text-crimson-500">{errors.message}</p>}
                    </div>
                    <div className="sm:col-span-2"><button type="submit" className="btn-gold">Send Message</button></div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {info.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.07}>
                  <motion.div whileHover={{ y: -5 }} className="card h-full p-5">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-500/10 text-xl text-gold-400"><c.icon /></span>
                    <h3 className="mt-4 text-xs font-semibold uppercase tracking-widest text-gold-400">{c.title}</h3>
                    {c.lines.map((l) => <p key={l} className="mt-1 text-sm text-white/65">{l}</p>)}
                  </motion.div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <div className="relative h-60 overflow-hidden rounded-2xl border border-white/10 bg-ink-800">
                <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden="true">
                  <defs>
                    <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0V36" fill="none" stroke="#262633" strokeWidth="1" /></pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <path d="M0 150 Q120 90 220 140 T460 100" stroke="#d4a64a" strokeOpacity=".4" strokeWidth="3" fill="none" />
                  <path d="M120 0 Q150 120 110 260" stroke="#3a3a4a" strokeWidth="6" fill="none" />
                </svg>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute -inset-5 animate-ping rounded-full bg-gold-500/30" />
                  <span className="relative grid h-12 w-12 place-items-center rounded-full bg-gold-500 text-xl text-ink-950"><Pin /></span>
                </div>
                <p className="absolute bottom-3 left-4 rounded-full bg-ink-950/80 px-3 py-1 text-xs text-white/70">21 Mayfair Avenue, London</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
