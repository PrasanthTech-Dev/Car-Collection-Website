import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Arrow, ChevronLeft, ChevronRight, Shield, Wrench, Trophy, Globe, Star, Search } from '../components/Icons.jsx'
import SmartImg from '../components/SmartImg.jsx'
import Reveal from '../components/Reveal.jsx'
import Counter from '../components/Counter.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import CarCard from '../components/CarCard.jsx'
import { BRANDS, CARS, CATEGORIES, HERO_SLIDES, formatPrice, getCar } from '../data/cars.js'
import { TESTIMONIALS } from '../data/content.js'

/* ---------------------------------- HERO ---------------------------------- */
function Hero() {
  const ref = useRef(null)
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 7000)
    return () => clearInterval(t)
  }, [slide])

  const current = HERO_SLIDES[slide]
  const lines = current.title.split('\n')

  const submit = (e) => {
    e.preventDefault()
    const p = new URLSearchParams()
    if (category !== 'All') p.set('category', category)
    if (query.trim()) p.set('q', query.trim())
    navigate(`/collection${p.toString() ? `?${p}` : ''}`)
  }

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.4 }, scale: { duration: 9, ease: 'linear' } }}
            className="absolute inset-0 bg-ink-800"
          >
            <SmartImg src={current.image} alt={current.car} eager className="h-full w-full object-cover" />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/60 to-ink-950/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/50" />
      <div className="noise absolute inset-0" />

      <motion.div style={{ y: textY, opacity: fade }} className="container-x relative flex h-full flex-col justify-center pt-20">
        <AnimatePresence mode="wait">
          <motion.div key={slide} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="eyebrow mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-gold-400" /> {current.kicker}
            </motion.p>
            <h1 className="h-display max-w-3xl text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl">
              {lines.map((line, li) => (
                <span key={li} className="block overflow-hidden pb-1">
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.3 + li * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className={`block ${li === lines.length - 1 ? 'text-gradient' : ''}`}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-6 max-w-lg text-base text-white/70 sm:text-lg">
              Discover a hand-picked collection of supercars, sports cars, luxury saloons and SUVs — each one inspected, authenticated and ready to drive.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-8 flex flex-wrap gap-4">
              <Link to="/collection" className="btn-gold">
                Explore Collection <Arrow />
              </Link>
              <Link to={`/collection/${current.id}`} className="btn-ghost">
                View {current.car}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex w-full max-w-2xl flex-col gap-2 rounded-2xl border border-white/15 bg-ink-950/60 p-2 backdrop-blur-xl sm:flex-row sm:rounded-full"
        >
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Category"
            className="rounded-full bg-transparent px-5 py-3 text-sm text-white outline-none sm:w-44"
          >
            <option className="bg-ink-800" value="All">All Categories</option>
            {CATEGORIES.map((c) => (
              <option className="bg-ink-800" key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
          <div className="hidden w-px bg-white/15 sm:block" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by brand or model…"
            aria-label="Search cars"
            className="flex-1 bg-transparent px-5 py-3 text-sm text-white placeholder-white/40 outline-none"
          />
          <button type="submit" className="btn-gold !py-3">
            <Search /> Search
          </button>
        </motion.form>
      </motion.div>

      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="container-x flex items-end justify-between">
          <div className="flex items-center gap-3">
            {HERO_SLIDES.map((s, i) => (
              <button key={s.id} onClick={() => setSlide(i)} aria-label={`Show slide ${i + 1}`} className="group py-3">
                <span className={`block h-0.5 transition-all duration-500 ${i === slide ? 'w-14 bg-gold-400' : 'w-7 bg-white/30 group-hover:bg-white/60'}`} />
              </button>
            ))}
          </div>
          <motion.a
            href="#featured"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="hidden items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/60 sm:flex"
          >
            Scroll <span className="h-10 w-px bg-gradient-to-b from-gold-400 to-transparent" />
          </motion.a>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- MARQUEE --------------------------------- */
function BrandMarquee() {
  const items = [...BRANDS, ...BRANDS]
  return (
    <div className="overflow-hidden border-y border-white/10 bg-ink-900 py-6">
      <div className="flex w-max animate-marquee gap-14 whitespace-nowrap">
        {items.map((b, i) => (
          <Link key={i} to={`/collection?brand=${encodeURIComponent(b.name)}`} className="font-display text-2xl text-white/30 transition hover:text-gold-400">
            {b.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------ FEATURED CARS ------------------------------ */
function Featured() {
  const tabs = ['Featured', ...CATEGORIES.map((c) => c.name)]
  const [tab, setTab] = useState('Featured')
  const list = useMemo(() => {
    const items = tab === 'Featured' ? CARS.filter((c) => c.featured) : CARS.filter((c) => c.category === tab)
    return items.slice(0, 6)
  }, [tab])

  return (
    <section id="featured" className="section">
      <div className="container-x">
        <SectionHeading eyebrow="The Collection" title="Curated for the discerning driver" subtitle="Hand-selected vehicles from the world’s most revered marques — explore by category." />
        <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                tab === t ? 'border-gold-400 text-ink-950' : 'border-white/15 text-white/60 hover:border-white/40 hover:text-white'
              }`}
            >
              {tab === t && <motion.span layoutId="home-tab" className="absolute inset-0 rounded-full bg-gold-500" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span className="relative">{t}</span>
            </button>
          ))}
        </Reveal>
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
        <Reveal className="mt-12 text-center">
          <Link to={tab === 'Featured' ? '/collection' : `/collection?category=${tab}`} className="btn-ghost">
            View all {tab === 'Featured' ? 'cars' : tab} <Arrow />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------- CATEGORIES ------------------------------- */
function Categories() {
  return (
    <section className="section bg-ink-900">
      <div className="container-x">
        <SectionHeading eyebrow="Browse by Category" title="Find your kind of fast" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) * 0.08}>
              <Link to={`/collection?category=${c.name}`} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                <SmartImg src={c.image} alt={c.name} className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent transition-opacity group-hover:opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold-400">{CARS.filter((x) => x.category === c.name).length} vehicles</p>
                  <h3 className="h-display mt-1 text-3xl">{c.name === 'SUV' ? 'SUVs' : c.name + (c.name.endsWith('s') ? '' : 's')}</h3>
                  <p className="mt-1 max-h-0 overflow-hidden text-sm text-white/70 opacity-0 transition-all duration-500 group-hover:max-h-12 group-hover:opacity-100">{c.blurb}</p>
                </div>
                <span className="absolute right-5 top-5 grid h-11 w-11 -translate-y-2 place-items-center rounded-full bg-gold-500 text-ink-950 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <Arrow />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- SPOTLIGHT -------------------------------- */
function Spotlight() {
  const ref = useRef(null)
  const car = getCar('lamborghini-revuelto')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const specs = [
    { label: 'Horsepower', value: car.power, suffix: ' hp' },
    { label: '0–60 mph', value: car.zeroTo60, suffix: ' s', decimals: 1 },
    { label: 'Top speed', value: car.topSpeed, suffix: ' mph' },
  ]
  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[15%]">
        <SmartImg src={car.images[0]} alt={`${car.brand} ${car.name}`} className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/30" />
      <div className="container-x relative">
        <Reveal className="max-w-xl">
          <p className="eyebrow mb-3">Spotlight</p>
          <h2 className="h-display text-4xl sm:text-6xl">
            {car.brand} <span className="text-gradient">{car.name}</span>
          </h2>
          <p className="mt-5 text-white/70">{car.description}</p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {specs.map((s) => (
              <div key={s.label} className="border-l border-gold-500/50 pl-4">
                <p className="font-display text-2xl text-white sm:text-4xl">
                  <Counter to={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link to={`/collection/${car.id}`} className="btn-gold">
              Discover <Arrow />
            </Link>
            <p className="text-sm text-white/60">
              From <span className="text-lg font-semibold text-white">{formatPrice(car.price)}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------------------------- WHY US --------------------------------- */
const WHY = [
  { icon: Shield, title: 'Verified Provenance', text: 'Every car passes a 200-point inspection with a complete history report.' },
  { icon: Wrench, title: 'Concierge Service', text: 'Servicing, storage and detailing collected from your door.' },
  { icon: Trophy, title: 'Award-Winning Team', text: 'Recognised for excellence in luxury automotive retail.' },
  { icon: Globe, title: 'Worldwide Delivery', text: 'Fully insured enclosed transport to over 40 countries.' },
]
function WhyUs() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="The Royal Motors Difference" title="An experience as refined as the cars" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <motion.div whileHover={{ y: -8 }} className="card h-full p-7 transition-colors hover:border-gold-500/50">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-500/10 text-2xl text-gold-400">
                  <w.icon />
                </span>
                <h3 className="h-display mt-6 text-xl">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{w.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------- STATS ---------------------------------- */
function Stats() {
  const stats = [
    { to: 3200, suffix: '+', label: 'Cars delivered' },
    { to: 15, suffix: '', label: 'Years of excellence' },
    { to: 40, suffix: '+', label: 'Countries served' },
    { to: 98, suffix: '%', label: 'Client satisfaction' },
  ]
  return (
    <section className="border-y border-white/10 bg-gradient-to-r from-ink-900 via-ink-800 to-ink-900 py-16">
      <div className="container-x grid grid-cols-2 gap-10 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center">
            <p className="text-gradient font-display text-4xl sm:text-6xl">
              <Counter to={s.to} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/50">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------- TESTIMONIALS ------------------------------ */
function Testimonials() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % TESTIMONIALS.length), 6000)
    return () => clearInterval(t)
  }, [i])
  const t = TESTIMONIALS[i]
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading eyebrow="Testimonials" title="Trusted by collectors worldwide" />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="min-h-[250px] sm:min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                <div className="mb-5 flex justify-center gap-1 text-gold-400">
                  {[...Array(5)].map((_, k) => <Star key={k} fill="currentColor" />)}
                </div>
                <p className="font-display text-xl leading-relaxed sm:text-3xl">“{t.text}”</p>
                <p className="mt-6 font-semibold">{t.name}</p>
                <p className="text-xs uppercase tracking-widest text-gold-400">{t.role}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={() => setI((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} aria-label="Previous testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-lg transition hover:border-gold-400 hover:text-gold-400">
              <ChevronLeft />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, k) => (
                <button key={k} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`} className={`h-1.5 rounded-full transition-all ${k === i ? 'w-8 bg-gold-400' : 'w-1.5 bg-white/25'}`} />
              ))}
            </div>
            <button onClick={() => setI((i + 1) % TESTIMONIALS.length)} aria-label="Next testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-lg transition hover:border-gold-400 hover:text-gold-400">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------- CTA ----------------------------------- */
function CTA() {
  return (
    <section className="container-x pb-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-gold-500/30 bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900 px-6 py-16 text-center sm:px-16">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gold-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
          <p className="eyebrow relative mb-3">Private Viewing</p>
          <h2 className="h-display relative text-3xl sm:text-5xl">Ready to feel the <span className="text-gradient">thrill?</span></h2>
          <p className="relative mx-auto mt-5 max-w-xl text-white/60">Book a private test drive at our showroom or have your chosen car delivered to your door.</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/test-drive" className="btn-gold">Book a Test Drive</Link>
            <Link to="/contact" className="btn-ghost">Speak to an Advisor</Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <Featured />
      <Categories />
      <Spotlight />
      <WhyUs />
      <Stats />
      <Testimonials />
      <CTA />
    </>
  )
}
