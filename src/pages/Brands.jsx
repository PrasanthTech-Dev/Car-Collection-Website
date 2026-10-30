import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import SmartImg from '../components/SmartImg.jsx'
import { Arrow, Close, Bolt, Gauge } from '../components/Icons.jsx'
import { BRANDS, CARS, CATEGORIES, formatPrice, img } from '../data/cars.js'

export default function Brands() {
  const [country, setCountry] = useState('All')
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [activeModelIndex, setActiveModelIndex] = useState(0)
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  // Prevent main page scrolling when slide/modal is open
  useEffect(() => {
    if (selectedBrand) {
      document.body.classList.add('modal-open')
      return () => {
        document.body.classList.remove('modal-open')
      }
    }
  }, [selectedBrand])

  const countries = ['All', ...Array.from(new Set(BRANDS.map((b) => b.country)))]
  const list = BRANDS.filter((b) => country === 'All' || b.country === country)

  const brandCars = selectedBrand ? CARS.filter((c) => c.brand === selectedBrand) : []
  const activeCar = brandCars[activeModelIndex] || brandCars[0]
  const brandData = selectedBrand ? BRANDS.find((b) => b.name === selectedBrand) : null

  const openBrandModal = (brandName) => {
    setSelectedBrand(brandName)
    setActiveModelIndex(0)
    setActivePhotoIndex(0)
  }

  return (
    <>
      <PageHero
        eyebrow="Brands & Categories"
        title="The world’s finest marques"
        subtitle="Explore our collection by manufacturer or by the type of driving experience you’re after."
        image={img(2, 2000, 90)}
      />

      <section className="container-x pb-20">
        <SectionHeading align="left" eyebrow="Shop by Category" title="Choose your driving style" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) * 0.08}>
              <Link to={`/collection?category=${c.name}`} className="group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                <SmartImg src={c.image} alt={c.name} className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <div>
                    <h3 className="h-display text-2xl">{c.name}</h3>
                    <p className="mt-1 text-xs text-white/60">{CARS.filter((x) => x.category === c.name).length} vehicles · {c.blurb}</p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30 transition group-hover:border-gold-400 group-hover:bg-gold-500 group-hover:text-ink-950">
                    <Arrow />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink-900 py-20">
        <div className="container-x">
          <SectionHeading align="left" eyebrow="Shop by Brand" title="Heritage, craftsmanship, performance" />
          <div className="mb-10 flex flex-wrap gap-2">
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setCountry(c)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  country === c ? 'border-gold-400 bg-gold-500 text-ink-950' : 'border-white/15 text-white/65 hover:border-gold-400 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((b, i) => (
              <motion.div key={b.name} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <div
                  onClick={() => openBrandModal(b.name)}
                  className="group card relative flex h-full cursor-pointer flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-gold-500/70 hover:shadow-[0_10px_30px_rgba(214,179,106,0.15)]"
                >
                  {/* High Quality Car Image for the Brand */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink-950">
                    <SmartImg
                      src={b.image}
                      alt={`${b.name} car`}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent opacity-90" />
                    
                    {/* Brand Monogram Badge */}
                    <div className="absolute left-3.5 top-3.5 grid h-10 w-10 place-items-center rounded-xl border border-gold-500/50 bg-ink-950/80 font-display text-base font-bold text-gold-400 shadow-md backdrop-blur">
                      {b.name
                        .split(/[\s-]/)
                        .map((w) => w[0])
                        .join('')
                        .slice(0, 2)}
                    </div>

                    {/* Model count badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold">
                      <span className="rounded-md border border-white/15 bg-ink-950/70 px-2 py-0.5 text-[11px] text-white/80 backdrop-blur">
                        {b.country} · Est. {b.founded}
                      </span>
                      <span className="rounded-full bg-gold-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-950 shadow">
                        {b.count} {b.count === 1 ? 'Model' : 'Models'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="h-display text-xl font-bold transition-colors group-hover:text-gold-400">{b.name}</h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-white/60 line-clamp-2">{b.blurb}</p>

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs font-semibold uppercase tracking-wider text-gold-400">
                      <span className="flex items-center gap-1.5 transition-colors group-hover:text-gold-300">
                        View Models & Photos
                      </span>
                      <Arrow className="transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* High-Quality Interactive Brand Showcase Modal */}
      <AnimatePresence>
        {selectedBrand && activeCar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/85 p-3 sm:p-6 backdrop-blur-md overflow-hidden overscroll-none touch-none"
            onClick={() => setSelectedBrand(null)}
            onTouchMove={(e) => {
              if (e.target === e.currentTarget) e.preventDefault()
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="card relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden border border-gold-500/50 bg-ink-900 p-0 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-3.5 sm:px-6 sm:py-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl border border-gold-500/50 bg-ink-950 font-display text-base sm:text-lg font-bold text-gold-400">
                    {brandData?.name
                      .split(/[\s-]/)
                      .map((w) => w[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                      {brandData?.name}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-white/50">
                      {brandData?.country} · Est. {brandData?.founded} · {brandCars.length} {brandCars.length === 1 ? 'Model available' : 'Models available'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-white/15 text-lg transition hover:border-gold-400 hover:text-gold-400"
                  aria-label="Close"
                >
                  <Close />
                </button>
              </div>

              {/* Modal scrollable content - isolated scrollbar */}
              <div
                className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain p-4 sm:p-6 custom-scrollbar"
                style={{ touchAction: 'pan-y' }}
              >
                {/* Model switcher tabs if multiple models */}
                {brandCars.length > 1 && (
                  <div className="mb-5 flex flex-wrap gap-2">
                    {brandCars.map((c, idx) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setActiveModelIndex(idx)
                          setActivePhotoIndex(0)
                        }}
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                          activeModelIndex === idx
                            ? 'bg-gold-500 text-ink-950 shadow-md'
                            : 'border border-white/15 text-white/70 hover:border-gold-400 hover:text-white'
                        }`}
                      >
                        {c.name} ({c.year})
                      </button>
                    ))}
                  </div>
                )}

                {/* High Resolution Car Showcase Display */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-950 shadow-inner">
                  <SmartImg
                    src={activeCar.images[activePhotoIndex] || activeCar.thumb}
                    alt={`${activeCar.brand} ${activeCar.name}`}
                    className="h-full w-full object-cover transition-all duration-500"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent" />
                  
                  {activeCar.badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-950 shadow">
                      {activeCar.badge}
                    </span>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">
                        {activeCar.category} · {activeCar.engine}
                      </p>
                      <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                        {activeCar.name}
                      </h3>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-white/50">Price</p>
                      <p className="font-display text-2xl font-bold text-gold-400">
                        {formatPrice(activeCar.price)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Angle / Gallery Thumbnails */}
                {activeCar.images && activeCar.images.length > 1 && (
                  <div className="mt-3 flex gap-2.5 sm:gap-3 overflow-x-auto overflow-y-hidden pb-1 max-w-full overscroll-contain custom-scrollbar">
                    {activeCar.images.map((imgUrl, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePhotoIndex(i)}
                        className={`relative aspect-[16/10] h-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                          activePhotoIndex === i ? 'border-gold-400 scale-105' : 'border-white/15 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <SmartImg src={imgUrl} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Performance Specs */}
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl border border-white/10 bg-ink-950/60 p-3">
                    <span className="flex items-center gap-1.5 text-xs text-gold-400">
                      <Bolt /> Power
                    </span>
                    <p className="mt-1 font-display text-lg font-bold text-white">{activeCar.power} hp</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-ink-950/60 p-3">
                    <span className="flex items-center gap-1.5 text-xs text-gold-400">
                      <Gauge /> 0–60 mph
                    </span>
                    <p className="mt-1 font-display text-lg font-bold text-white">{activeCar.zeroTo60} s</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-ink-950/60 p-3">
                    <span className="flex items-center gap-1.5 text-xs text-gold-400">
                      Top Speed
                    </span>
                    <p className="mt-1 font-display text-lg font-bold text-white">{activeCar.topSpeed} mph</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-ink-950/60 p-3">
                    <span className="flex items-center gap-1.5 text-xs text-gold-400">
                      Drivetrain
                    </span>
                    <p className="mt-1 font-display text-lg font-bold text-white">{activeCar.drivetrain}</p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-white/65">
                  {activeCar.description}
                </p>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                  <Link
                    to={`/collection?brand=${encodeURIComponent(selectedBrand)}`}
                    className="text-xs font-semibold uppercase tracking-wider text-gold-400 hover:underline"
                  >
                    Explore all {brandCars.length} {selectedBrand} {brandCars.length === 1 ? 'model' : 'models'} in Collection &rarr;
                  </Link>
                  <div className="flex gap-3">
                    <Link
                      to={`/collection/${activeCar.id}`}
                      className="btn-gold !py-2.5 !px-5 text-xs"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/test-drive?car=${activeCar.id}`}
                      className="btn-ghost !py-2.5 !px-5 text-xs"
                    >
                      Book Test Drive
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
