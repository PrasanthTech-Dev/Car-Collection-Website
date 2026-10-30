import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PageHero from '../components/PageHero.jsx'
import SmartImg from '../components/SmartImg.jsx'
import { Check, Chevron, Calendar, Phone, Clock, Shield } from '../components/Icons.jsx'
import { CARS, formatPrice, getCar, img } from '../data/cars.js'
import { useStore } from '../context/StoreContext.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+()\d\s-]{7,18}$/
const SLOTS = ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00']
const BUDGETS = ['Under $100k', '$100k – $250k', '$250k – $500k', '$500k+']

const todayStr = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

function Field({ label, error, children, htmlFor }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} role="alert" className="mt-1.5 text-xs text-crimson-500">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function TestDrive() {
  const [params] = useSearchParams()
  const { toast } = useStore()
  const initialCar = getCar(params.get('car'))?.id || ''
  const [mode, setMode] = useState(params.get('type') === 'enquiry' ? 'enquiry' : 'drive')
  const [done, setDone] = useState(null)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: '', email: '', phone: '', car: initialCar, date: '', slot: '', location: 'Showroom', budget: '', message: '', consent: false,
  })

  const car = getCar(form.car)
  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Please enter your full name'
    if (!EMAIL_RE.test(form.email)) e.email = 'Enter a valid email address'
    if (!PHONE_RE.test(form.phone)) e.phone = 'Enter a valid phone number'
    if (!form.car) e.car = 'Please choose a car'
    if (mode === 'drive') {
      if (!form.date) e.date = 'Pick a date'
      else if (form.date < todayStr()) e.date = 'Date cannot be in the past'
      if (!form.slot) e.slot = 'Select a time slot'
    } else {
      if (form.message.trim().length < 10) e.message = 'Tell us a little more (at least 10 characters)'
    }
    if (!form.consent) e.consent = 'Please accept to continue'
    return e
  }

  const submit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      toast('Please fix the highlighted fields')
      return
    }
    const ref = 'RM-' + Math.random().toString(36).slice(2, 8).toUpperCase()
    const record = { ref, mode, ...form, createdAt: new Date().toISOString() }
    try {
      const all = JSON.parse(localStorage.getItem('royal_requests') || localStorage.getItem('apex_requests') || '[]')
      localStorage.setItem('royal_requests', JSON.stringify([record, ...all]))
    } catch {
      /* ignore */
    }
    setDone(record)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const reset = () => {
    setDone(null)
    setErrors({})
    setForm({ name: '', email: '', phone: '', car: '', date: '', slot: '', location: 'Showroom', budget: '', message: '', consent: false })
  }

  const inputCls = (k) => `input ${errors[k] ? '!border-crimson-500' : ''}`
  const sorted = useMemo(() => [...CARS].sort((a, b) => `${a.brand}${a.name}`.localeCompare(`${b.brand}${b.name}`)), [])

  return (
    <>
      <PageHero
        eyebrow="Test Drive & Enquiries"
        title="Experience it for yourself"
        subtitle="Book a private test drive at our showroom, or send an enquiry and one of our advisors will be in touch within 24 hours."
        image={img(0, 1800)}
      />
      <section className="container-x pb-24">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="card mx-auto max-w-2xl p-8 text-center sm:p-12">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.15 }} className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-gold-500 text-4xl text-ink-950">
                <Check />
              </motion.div>
              <h2 className="h-display text-3xl">{done.mode === 'drive' ? 'Test drive requested' : 'Enquiry received'}</h2>
              <p className="mt-3 text-white/60">
                Thank you, <span className="text-white">{done.name.split(' ')[0]}</span>. We’ve sent a confirmation to <span className="text-white">{done.email}</span>.
              </p>
              <div className="mx-auto mt-7 max-w-sm rounded-xl border border-gold-500/30 bg-ink-900 p-5 text-left text-sm">
                <p className="text-[10px] uppercase tracking-widest text-white/40">Reference</p>
                <p className="font-display text-2xl text-gold-400">{done.ref}</p>
                <dl className="mt-4 space-y-2 text-white/70">
                  <div className="flex justify-between"><dt>Vehicle</dt><dd className="text-white">{getCar(done.car)?.brand} {getCar(done.car)?.name}</dd></div>
                  {done.mode === 'drive' && (
                    <>
                      <div className="flex justify-between"><dt>Date</dt><dd className="text-white">{new Date(done.date + 'T00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long' })}</dd></div>
                      <div className="flex justify-between"><dt>Time</dt><dd className="text-white">{done.slot}</dd></div>
                      <div className="flex justify-between"><dt>Location</dt><dd className="text-white">{done.location}</dd></div>
                    </>
                  )}
                </dl>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button onClick={reset} className="btn-gold">Make another request</button>
                <Link to="/collection" className="btn-ghost">Keep browsing</Link>
              </div>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
              <form onSubmit={submit} noValidate className="card p-6 sm:p-9">
                <div className="relative mb-8 grid grid-cols-2 rounded-full border border-white/10 bg-ink-900 p-1">
                  {[['drive', 'Book Test Drive', Calendar], ['enquiry', 'Send Enquiry', Phone]].map(([k, label, Icon]) => (
                    <button type="button" key={k} onClick={() => { setMode(k); setErrors({}) }} className={`relative flex items-center justify-center gap-2 rounded-full py-3 text-xs font-semibold uppercase tracking-wider transition ${mode === k ? 'text-ink-950' : 'text-white/60 hover:text-white'}`}>
                      {mode === k && <motion.span layoutId="td-mode" className="absolute inset-0 rounded-full bg-gold-500" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                      <span className="relative flex items-center gap-2"><Icon /> {label}</span>
                    </button>
                  ))}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" error={errors.name} htmlFor="td-name">
                    <input id="td-name" className={inputCls('name')} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Jane Doe" autoComplete="name" />
                  </Field>
                  <Field label="Email" error={errors.email} htmlFor="td-email">
                    <input id="td-email" type="email" className={inputCls('email')} value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@email.com" autoComplete="email" />
                  </Field>
                  <Field label="Phone" error={errors.phone} htmlFor="td-phone">
                    <input id="td-phone" type="tel" className={inputCls('phone')} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+44 7700 900123" autoComplete="tel" />
                  </Field>
                  <Field label="Select car" error={errors.car} htmlFor="td-car">
                    <div className="relative">
                      <select id="td-car" className={`${inputCls('car')} appearance-none pr-10`} value={form.car} onChange={(e) => set('car', e.target.value)}>
                        <option value="">Choose a vehicle…</option>
                        {sorted.map((c) => <option key={c.id} value={c.id}>{c.brand} {c.name} ({c.year})</option>)}
                      </select>
                      <Chevron className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50" />
                    </div>
                  </Field>

                  {mode === 'drive' ? (
                    <>
                      <Field label="Preferred date" error={errors.date} htmlFor="td-date">
                        <input id="td-date" type="date" min={todayStr()} className={`${inputCls('date')} [color-scheme:dark]`} value={form.date} onChange={(e) => set('date', e.target.value)} />
                      </Field>
                      <Field label="Location" htmlFor="td-loc">
                        <div className="relative">
                          <select id="td-loc" className="input appearance-none pr-10" value={form.location} onChange={(e) => set('location', e.target.value)}>
                            <option>Showroom</option>
                            <option>Home / Office delivery</option>
                          </select>
                          <Chevron className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50" />
                        </div>
                      </Field>
                      <div className="sm:col-span-2">
                        <Field label="Time slot" error={errors.slot}>
                          <div className="flex flex-wrap gap-2" role="group" aria-label="Time slot">
                            {SLOTS.map((s) => (
                              <button type="button" key={s} onClick={() => set('slot', s)} aria-pressed={form.slot === s} className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition ${form.slot === s ? 'border-gold-400 bg-gold-500 text-ink-950' : 'border-white/15 text-white/70 hover:border-gold-400'}`}>
                                <Clock /> {s}
                              </button>
                            ))}
                          </div>
                        </Field>
                      </div>
                    </>
                  ) : (
                    <Field label="Budget (optional)" htmlFor="td-budget">
                      <div className="relative">
                        <select id="td-budget" className="input appearance-none pr-10" value={form.budget} onChange={(e) => set('budget', e.target.value)}>
                          <option value="">Select a range…</option>
                          {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                        </select>
                        <Chevron className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50" />
                      </div>
                    </Field>
                  )}

                  <div className="sm:col-span-2">
                    <Field label={mode === 'drive' ? 'Notes (optional)' : 'Your message'} error={errors.message} htmlFor="td-msg">
                      <textarea id="td-msg" rows={4} className={`${inputCls('message')} resize-none`} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder={mode === 'drive' ? 'Anything we should prepare?' : 'Tell us what you’re looking for — specification, colour, financing…'} />
                    </Field>
                  </div>
                </div>

                <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-white/60">
                  <input type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-1 h-4 w-4 accent-[#d4a64a]" />
                  I agree to be contacted by Royal Motors regarding this request.
                </label>
                {errors.consent && <p role="alert" className="mt-1.5 text-xs text-crimson-500">{errors.consent}</p>}

                <button type="submit" className="btn-gold mt-8 w-full sm:w-auto">
                  {mode === 'drive' ? 'Confirm Test Drive' : 'Send Enquiry'}
                </button>
              </form>

              <aside className="space-y-6">
                <div className="card overflow-hidden">
                  <div className="aspect-[16/10] bg-ink-700">
                    <AnimatePresence mode="wait">
                      <motion.div key={car?.id || 'none'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                        <SmartImg src={car ? car.thumb : img(11, 900)} alt={car ? `${car.brand} ${car.name}` : 'Showroom'} className="h-full w-full object-cover" />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="p-5">
                    {car ? (
                      <>
                        <p className="text-[11px] uppercase tracking-[0.25em] text-gold-400">{car.brand}</p>
                        <h3 className="h-display text-xl">{car.name}</h3>
                        <p className="mt-1 text-sm text-white/55">{car.power} hp · 0–60 in {car.zeroTo60}s · {formatPrice(car.price)}</p>
                      </>
                    ) : (
                      <p className="text-sm text-white/55">Select a car to see a preview of your choice.</p>
                    )}
                  </div>
                </div>
                <div className="card space-y-4 p-6 text-sm text-white/65">
                  <p className="flex gap-3"><Shield className="mt-0.5 shrink-0 text-xl text-gold-400" /> Fully insured test drives with a specialist on hand.</p>
                  <p className="flex gap-3"><Clock className="mt-0.5 shrink-0 text-xl text-gold-400" /> Sessions last around 45 minutes. Bring your licence and ID.</p>
                  <p className="flex gap-3"><Phone className="mt-0.5 shrink-0 text-xl text-gold-400" /> Prefer to talk? Call +44 20 7946 0123.</p>
                </div>
              </aside>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}
