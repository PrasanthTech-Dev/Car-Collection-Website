import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Crown, Instagram, Facebook, Youtube, Twitter, Phone, Mail, Pin, Arrow } from './Icons.jsx'
import Reveal from './Reveal.jsx'
import { useStore } from '../context/StoreContext.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Footer() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const { toast } = useStore()

  const subscribe = (e) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    setError('')
    setEmail('')
    toast('Subscribed — welcome to the Royal circle')
  }

  const cols = [
    { title: 'Explore', links: [['Collection', '/collection'], ['Brands', '/brands'], ['Compare Cars', '/compare'], ['Wishlist', '/wishlist']] },
    { title: 'Company', links: [['About Us', '/about'], ['Contact Us', '/contact'], ['FAQ', '/faq'], ['Test Drive', '/test-drive']] },
    { title: 'Categories', links: [['Supercars', '/collection?category=Supercar'], ['Sports Cars', '/collection?category=Sports'], ['Luxury', '/collection?category=Luxury'], ['SUVs', '/collection?category=SUV']] },
  ]

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-white/10 bg-ink-900">
      <div className="absolute -bottom-40 left-1/2 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="container-x relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <Reveal>
            <Link to="/" className="group flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold-500/60 bg-gradient-to-b from-ink-800/80 to-ink-950/90 text-gold-400 shadow-[0_0_15px_rgba(214,179,106,0.18)] transition-transform duration-300 group-hover:scale-105">
                <Crown className="text-2xl" />
              </span>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-wider leading-none text-white">
                  ROYAL<span className="text-gold-400"> MOTORS</span>
                </span>
                <span className="mt-1 font-sans text-[9.5px] font-semibold uppercase tracking-[0.24em] text-gold-400">
                  AUTOMOTIVE ATELIER
                </span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              A curated collection of the world’s finest supercars, sports cars, luxury saloons and SUVs — delivered with concierge-level care.
            </p>
            <form onSubmit={subscribe} noValidate className="mt-7 max-w-sm">
              <label htmlFor="news-email" className="label">
                Join the newsletter
              </label>
              <div className="flex gap-2">
                <input
                  id="news-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="input"
                />
                <button type="submit" aria-label="Subscribe" className="btn-gold !px-5">
                  <Arrow />
                </button>
              </div>
              {error && <p className="mt-2 text-xs text-crimson-500">{error}</p>}
            </form>
            <div className="mt-7 flex gap-3">
              {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-lg transition hover:-translate-y-1 hover:border-gold-400 hover:text-gold-400"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {cols.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <h4 className="eyebrow mb-5">{c.title}</h4>
                <ul className="space-y-3 text-sm text-white/60">
                  {c.links.map(([label, to]) => (
                    <li key={label}>
                      <Link to={to} className="transition hover:pl-1 hover:text-gold-400">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
            <Reveal delay={0.25}>
              <h4 className="eyebrow mb-5">Visit Us</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex gap-2.5"><Pin className="mt-0.5 shrink-0 text-gold-400" /> 21 Mayfair Avenue, London W1K 3JL</li>
                <li className="flex gap-2.5"><Phone className="mt-0.5 shrink-0 text-gold-400" /> +44 20 7946 0123</li>
                <li className="flex gap-2.5"><Mail className="mt-0.5 shrink-0 text-gold-400" /> concierge@royalmotors.com</li>
              </ul>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Royal Motors. All rights reserved. Prices are indicative and subject to availability.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="uppercase tracking-widest transition hover:text-gold-400">
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
