import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Compare, Menu, Close, Crown } from './Icons.jsx'
import { useStore } from '../context/StoreContext.jsx'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/collection', label: 'Collection' },
  { to: '/brands', label: 'Brands' },
  { to: '/compare', label: 'Compare' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function Badge({ n }) {
  if (!n) return null
  return (
    <motion.span
      key={n}
      initial={{ scale: 0.4 }}
      animate={{ scale: 1 }}
      className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-ink-950"
    >
      {n}
    </motion.span>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { wishlist, compare } = useStore()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (open) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-white/10 bg-ink-950/85 py-3 backdrop-blur-xl' : 'bg-transparent py-5'
        }`}
      >
        <div className="container-x flex items-center justify-between gap-4">
          <Link to="/" className="group flex items-center gap-3" aria-label="Royal Motors home">
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

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `group relative text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                    isActive ? 'text-gold-400' : 'text-white/70 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px bg-gold-400 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/compare" aria-label="Compare cars" className="relative hidden h-10 w-10 place-items-center rounded-full border border-white/15 text-lg transition hover:border-gold-400 hover:text-gold-400 sm:grid lg:hidden">
              <Compare />
              <Badge n={compare.length} />
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="relative grid h-10 w-10 place-items-center rounded-full border border-white/15 text-lg transition hover:border-gold-400 hover:text-gold-400">
              <Heart />
              <Badge n={wishlist.length} />
            </Link>
            <Link to="/test-drive" className="btn-gold hidden !px-5 !py-2.5 sm:inline-flex">
              Book Test Drive
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-xl lg:hidden"
              aria-label="Open menu"
            >
              <Menu />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink-950/70 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-ink-900 p-7"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-gold-500/60 bg-gradient-to-b from-ink-800/80 to-ink-950/90 text-gold-400 shadow-[0_0_12px_rgba(214,179,106,0.15)]">
                    <Crown className="text-xl" />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-display text-lg font-bold tracking-wider leading-none text-white">
                      ROYAL<span className="text-gold-400"> MOTORS</span>
                    </span>
                    <span className="mt-0.5 font-sans text-[8.5px] font-semibold uppercase tracking-[0.22em] text-gold-400">
                      AUTOMOTIVE ATELIER
                    </span>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-xl">
                  <Close />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto" aria-label="Mobile">
                {[...LINKS, { to: '/wishlist', label: 'Wishlist' }, { to: '/faq', label: 'FAQ' }].map((l, i) => (
                  <motion.div key={l.to} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.05 }}>
                    <NavLink
                      to={l.to}
                      end={l.end}
                      className={({ isActive }) =>
                        `block border-b border-white/5 py-4 font-display text-2xl ${isActive ? 'text-gold-400' : 'text-white/85'}`
                      }
                    >
                      {l.label}
                      {l.label === 'Compare' && compare.length > 0 && <span className="ml-2 text-sm text-gold-400">({compare.length})</span>}
                      {l.label === 'Wishlist' && wishlist.length > 0 && <span className="ml-2 text-sm text-gold-400">({wishlist.length})</span>}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <Link to="/test-drive" className="btn-gold mt-6">
                Book Test Drive
              </Link>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
