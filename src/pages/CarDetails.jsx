import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Heart, Compare, ChevronLeft, ChevronRight, Expand, Close, Check, Calendar, Phone, Star, Gauge, Bolt } from '../components/Icons.jsx'
import SmartImg from '../components/SmartImg.jsx'
import Reveal from '../components/Reveal.jsx'
import CarCard from '../components/CarCard.jsx'
import Counter from '../components/Counter.jsx'
import { CARS, formatPrice, getCar, monthly } from '../data/cars.js'
import { useStore } from '../context/StoreContext.jsx'
import NotFound from './NotFound.jsx'

export default function CarDetails() {
  const { id } = useParams()
  const car = getCar(id)
  const { isWished, isCompared, toggleWishlist, toggleCompare } = useStore()
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const [lightbox, setLightbox] = useState(false)
  const [tab, setTab] = useState('specs')

  useEffect(() => {
    setActive(0)
    setTab('specs')
  }, [id])

  useEffect(() => {
    if (!lightbox) return
    const prevBodyOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
    }
  }, [lightbox])

  if (!car) return <NotFound />

  const go = (d) => {
    setDir(d)
    setActive((a) => (a + d + car.images.length) % car.images.length)
  }
  const jump = (i) => {
    setDir(i > active ? 1 : -1)
    setActive(i)
  }

  const name = `${car.brand} ${car.name}`
  const wished = isWished(car.id)
  const compared = isCompared(car.id)
  const related = CARS.filter((c) => c.id !== car.id && (c.category === car.category || c.brand === car.brand)).slice(0, 3)

  const specs = [
    ['Engine', car.engine],
    ['Power', `${car.power} hp`],
    ['Torque', `${car.torque} lb-ft`],
    ['0–60 mph', `${car.zeroTo60} s`],
    ['Top speed', `${car.topSpeed} mph`],
    ['Transmission', car.transmission],
    ['Drivetrain', car.drivetrain],
    ['Fuel type', car.fuel],
    ['Seats', car.seats],
    ['Model year', car.year],
    ['Category', car.category],
  ]

  const slide = {
    enter: (d) => ({ x: d * 80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d * -80, opacity: 0 }),
  }

  return (
    <>
      <section className="container-x pb-10 pt-28 sm:pt-32">
        <Link to="/collection" className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/55 transition hover:text-gold-400">
          <ArrowLeft /> Back to collection
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr]">
          {/* gallery */}
          <div>
            <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-ink-800">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div
                  key={active}
                  custom={dir}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <SmartImg src={car.images[active]} alt={`${name} view ${active + 1}`} eager className="h-full w-full object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
              {car.badge && <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink-950">{car.badge}</span>}
              <button onClick={() => go(-1)} aria-label="Previous image" className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ink-950/60 text-xl backdrop-blur transition hover:bg-gold-500 hover:text-ink-950 sm:opacity-0 sm:group-hover:opacity-100">
                <ChevronLeft />
              </button>
              <button onClick={() => go(1)} aria-label="Next image" className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-ink-950/60 text-xl backdrop-blur transition hover:bg-gold-500 hover:text-ink-950 sm:opacity-0 sm:group-hover:opacity-100">
                <ChevronRight />
              </button>
              <button onClick={() => setLightbox(true)} aria-label="Open fullscreen" className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-ink-950/60 text-lg backdrop-blur transition hover:bg-gold-500 hover:text-ink-950">
                <Expand />
              </button>
              <p className="absolute bottom-4 left-4 rounded-full bg-ink-950/60 px-3 py-1 text-xs backdrop-blur">
                {active + 1} / {car.images.length}
              </p>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {car.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => jump(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`relative aspect-[16/10] overflow-hidden rounded-xl border-2 transition ${i === active ? 'border-gold-400' : 'border-transparent opacity-55 hover:opacity-100'}`}
                >
                  <SmartImg src={src.replace('w=1400', 'w=400')} alt="" className="h-full w-full object-cover bg-ink-700" />
                </button>
              ))}
            </div>
          </div>

          {/* info */}
          <Reveal x={30} y={0}>
            <p className="eyebrow">{car.brand} · {car.category}</p>
            <h1 className="h-display mt-2 text-4xl sm:text-5xl">{car.name}</h1>
            <div className="mt-3 flex items-center gap-3 text-sm text-white/60">
              <span className="flex items-center gap-1 text-gold-400"><Star fill="currentColor" /> {car.rating}</span>
              <span>·</span>
              <span>{car.year}</span>
              <span>·</span>
              <span>{car.fuel}</span>
            </div>
            <p className="mt-6 leading-relaxed text-white/65">{car.description}</p>

            <div className="mt-7 flex items-end gap-4 border-y border-white/10 py-6">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40">Price</p>
                <p className="font-display text-4xl text-gold-400">{formatPrice(car.price)}</p>
              </div>
              <p className="pb-1 text-xs text-white/45">
                Est. <span className="text-white/80">{formatPrice(monthly(car.price))}/mo</span>
                <br />
                20% down · 60 mo · 5.9% APR
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {[
                { icon: Bolt, v: car.power, s: ' hp', l: 'Power' },
                { icon: Gauge, v: car.zeroTo60, s: ' s', l: '0–60', d: car.zeroTo60 < 2 ? 2 : 1 },
                { icon: Gauge, v: car.topSpeed, s: ' mph', l: 'Top speed' },
              ].map((s) => (
                <div key={s.l} className="card p-4">
                  <s.icon className="mx-auto mb-1 text-gold-400" />
                  <p className="font-display text-xl sm:text-2xl"><Counter to={s.v} suffix={s.s} decimals={s.d || 0} /></p>
                  <p className="text-[10px] uppercase tracking-widest text-white/45">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={`/test-drive?car=${car.id}`} className="btn-gold flex-1"><Calendar /> Book Test Drive</Link>
              <Link to={`/test-drive?type=enquiry&car=${car.id}`} className="btn-ghost flex-1"><Phone /> Enquire</Link>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                onClick={() => toggleWishlist(car.id, name)}
                aria-pressed={wished}
                className={`flex items-center justify-center gap-2 rounded-full border py-3 text-xs font-semibold uppercase tracking-wider transition ${wished ? 'border-crimson-500 bg-crimson-500/15 text-crimson-500' : 'border-white/15 hover:border-gold-400 hover:text-gold-400'}`}
              >
                <Heart fill={wished ? 'currentColor' : 'none'} className="text-base" /> {wished ? 'Saved' : 'Wishlist'}
              </button>
              <button
                onClick={() => toggleCompare(car.id, name)}
                aria-pressed={compared}
                className={`flex items-center justify-center gap-2 rounded-full border py-3 text-xs font-semibold uppercase tracking-wider transition ${compared ? 'border-gold-400 bg-gold-500/15 text-gold-400' : 'border-white/15 hover:border-gold-400 hover:text-gold-400'}`}
              >
                <Compare className="text-base" /> {compared ? 'In compare' : 'Compare'}
              </button>
            </div>
          </Reveal>
        </div>

        {/* specs & features */}
        <div className="mt-16">
          <div className="flex gap-2 border-b border-white/10">
            {[['specs', 'Specifications'], ['features', 'Key Features']].map(([k, label]) => (
              <button key={k} onClick={() => setTab(k)} className={`relative px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition ${tab === k ? 'text-gold-400' : 'text-white/50 hover:text-white'}`}>
                {label}
                {tab === k && <motion.span layoutId="detail-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-gold-400" />}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {tab === 'specs' ? (
              <motion.dl key="specs" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 grid gap-x-10 sm:grid-cols-2">
                {specs.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between border-b border-white/10 py-4 text-sm">
                    <dt className="text-white/50">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </motion.dl>
            ) : (
              <motion.ul key="features" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {car.features.map((f, i) => (
                  <motion.li key={f} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="card flex items-center gap-3 p-4 text-sm">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold-500/15 text-gold-400"><Check /></span>
                    {f}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-x pb-24 pt-10">
          <Reveal>
            <h2 className="h-display mb-8 text-3xl">You may also like</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c, i) => <CarCard key={c.id} car={c} index={i} />)}
          </div>
        </section>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] grid place-items-center bg-ink-950/95 p-4" onClick={() => setLightbox(false)} role="dialog" aria-modal="true" aria-label="Image viewer">
            <button onClick={() => setLightbox(false)} aria-label="Close" className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-white/20 text-2xl"><Close /></button>
            <button onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="Previous" className="absolute left-4 grid h-12 w-12 place-items-center rounded-full border border-white/20 text-2xl hover:bg-gold-500 hover:text-ink-950"><ChevronLeft /></button>
            <button onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="Next" className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 text-2xl hover:bg-gold-500 hover:text-ink-950"><ChevronRight /></button>
            <motion.div key={active} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-h-[85vh] w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
              <SmartImg src={car.images[active]} alt={`${name} view ${active + 1}`} eager className="max-h-[85vh] w-full rounded-xl object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
