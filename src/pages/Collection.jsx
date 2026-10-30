import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PageHero from '../components/PageHero.jsx'
import CarCard from '../components/CarCard.jsx'
import { Search, Filter, Close, Chevron } from '../components/Icons.jsx'
import { BRANDS, BRAND_INFO, CARS, CATEGORIES, formatPrice, img } from '../data/cars.js'

const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'power-desc', label: 'Power: High to Low' },
  { value: 'accel-asc', label: 'Fastest 0–60' },
  { value: 'year-desc', label: 'Newest first' },
  { value: 'name-asc', label: 'Name: A–Z' },
]
const FUELS = ['All', 'Petrol', 'Hybrid', 'Electric']
const MAX_PRICE = Math.ceil(Math.max(...CARS.map((c) => c.price)) / 10000) * 10000

export default function Collection() {
  const [params, setParams] = useSearchParams()
  const [sort, setSort] = useState('featured')
  const [fuel, setFuel] = useState('All')
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE)
  const [showFilters, setShowFilters] = useState(false)

  // Lock main page scrolling when mobile filters drawer is open
  useEffect(() => {
    if (showFilters) {
      document.body.classList.add('modal-open')
      return () => {
        document.body.classList.remove('modal-open')
      }
    }
  }, [showFilters])

  const q = params.get('q') || ''
  const category = params.get('category') || 'All'
  const brand = params.get('brand') || 'All'

  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (!value || value === 'All') next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    let list = CARS.filter((c) => {
      if (category !== 'All' && c.category !== category) return false
      if (brand !== 'All' && c.brand !== brand) return false
      if (fuel !== 'All' && c.fuel !== fuel) return false
      if (c.price > maxPrice) return false
      if (term && !`${c.brand} ${c.name} ${c.category} ${c.engine} ${c.year}`.toLowerCase().includes(term)) return false
      return true
    })
    const by = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      'power-desc': (a, b) => b.power - a.power,
      'accel-asc': (a, b) => a.zeroTo60 - b.zeroTo60,
      'year-desc': (a, b) => b.year - a.year,
      'name-asc': (a, b) => `${a.brand} ${a.name}`.localeCompare(`${b.brand} ${b.name}`),
      featured: (a, b) => Number(!!b.featured) - Number(!!a.featured),
    }[sort]
    return [...list].sort(by)
  }, [q, category, brand, fuel, maxPrice, sort])

  const activeCount = [category !== 'All', brand !== 'All', fuel !== 'All', maxPrice < MAX_PRICE, !!q].filter(Boolean).length
  const reset = () => {
    setParams({}, { replace: true })
    setFuel('All')
    setMaxPrice(MAX_PRICE)
    setSort('featured')
  }

  const Chip = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
        active ? 'border-gold-400 bg-gold-500 text-ink-950' : 'border-white/15 text-white/65 hover:border-gold-400 hover:text-white'
      }`}
    >
      {children}
    </button>
  )

  const filterPanel = (
    <div className="space-y-8">
      <div>
        <p className="label">Category</p>
        <div className="flex flex-wrap gap-2">
          {['All', ...CATEGORIES.map((c) => c.name)].map((c) => (
            <Chip key={c} active={category === c} onClick={() => setParam('category', c)}>{c}</Chip>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="brand" className="label">Brand</label>
        <div className="relative">
          <select id="brand" value={brand} onChange={(e) => setParam('brand', e.target.value)} className="input appearance-none pr-10">
            <option value="All">All brands</option>
            {BRANDS.map((b) => (
              <option key={b.name} value={b.name}>{b.name} ({b.count})</option>
            ))}
          </select>
          <Chevron className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50" />
        </div>
      </div>
      <div>
        <p className="label">Fuel / Powertrain</p>
        <div className="flex flex-wrap gap-2">
          {FUELS.map((f) => (
            <Chip key={f} active={fuel === f} onClick={() => setFuel(f)}>{f}</Chip>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between">
          <label htmlFor="price" className="label !mb-0">Max price</label>
          <span className="text-sm font-semibold text-gold-400">{formatPrice(maxPrice)}</span>
        </div>
        <input
          id="price"
          type="range"
          min={50000}
          max={MAX_PRICE}
          step={10000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink-600 accent-[#d4a64a]"
        />
        <div className="mt-2 flex justify-between text-[10px] text-white/40">
          <span>{formatPrice(50000)}</span>
          <span>{formatPrice(MAX_PRICE)}</span>
        </div>
      </div>
      <button onClick={reset} disabled={!activeCount && sort === 'featured'} className="btn-ghost w-full disabled:cursor-not-allowed disabled:opacity-40">
        Reset all filters
      </button>
    </div>
  )

  const brandMeta = brand !== 'All' ? BRAND_INFO[brand] : null
  const catMeta = category !== 'All' ? CATEGORIES.find((c) => c.name === category) : null

  const heroEyebrow = brandMeta
    ? `${brandMeta.country} · Est. ${brandMeta.founded}`
    : catMeta
    ? `${catMeta.name} Marque`
    : 'Our Collection'

  const heroTitle = brandMeta
    ? `${brand} Collection`
    : catMeta
    ? `${catMeta.name}s`
    : 'Every car, a masterpiece'

  const heroSubtitle = brandMeta
    ? `${brandMeta.blurb} Explore our curated collection of ${results.length} high-performance ${results.length === 1 ? 'model' : 'models'}.`
    : catMeta
    ? `${catMeta.blurb} Showing ${results.length} vehicles available for acquisition.`
    : 'Search, filter and sort our complete collection of supercars, sports cars, luxury saloons, SUVs, electric hypercars and classics.'

  const heroImage = brandMeta?.image || catMeta?.image || img(11, 2000, 90)

  return (
    <>
      <PageHero
        eyebrow={heroEyebrow}
        title={heroTitle}
        subtitle={heroSubtitle}
        image={heroImage}
      />
      <section className="container-x pb-24">
        {/* toolbar */}
        <div className="sticky top-[68px] z-30 -mx-5 mb-8 flex flex-wrap items-center gap-3 border-y border-white/10 bg-ink-950/90 px-5 py-3 backdrop-blur-xl sm:-mx-8 sm:px-8">
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              value={q}
              onChange={(e) => setParam('q', e.target.value)}
              placeholder="Search brand, model, engine…"
              aria-label="Search cars"
              className="input !rounded-full !pl-11"
            />
            {q && (
              <button onClick={() => setParam('q', '')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                <Close />
              </button>
            )}
          </div>
          <div className="relative">
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort cars" className="input appearance-none !rounded-full !pr-10">
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <Chevron className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50" />
          </div>
          <button onClick={() => setShowFilters(true)} className="btn-ghost !py-3 lg:hidden">
            <Filter /> Filters{activeCount > 0 && ` (${activeCount})`}
          </button>
        </div>

        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="card sticky top-[150px] p-6">
              <h2 className="h-display mb-6 flex items-center gap-2 text-lg"><Filter className="text-gold-400" /> Filters</h2>
              {filterPanel}
            </div>
          </aside>

          <div>
            <div className="mb-6 flex items-center justify-between text-sm text-white/55">
              <p>
                Showing <span className="font-semibold text-white">{results.length}</span> of {CARS.length} vehicles
              </p>
              {activeCount > 0 && (
                <button onClick={reset} className="text-xs uppercase tracking-wider text-gold-400 hover:underline">Clear filters</button>
              )}
            </div>
            {results.length > 0 ? (
              <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {results.map((car, i) => (
                    <CarCard key={car.id} car={car} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card flex flex-col items-center px-6 py-20 text-center">
                <Search className="mb-4 text-5xl text-gold-500/60" />
                <h3 className="h-display text-2xl">No cars match your search</h3>
                <p className="mt-2 max-w-sm text-sm text-white/55">Try adjusting your filters or search term to discover more of the collection.</p>
                <button onClick={reset} className="btn-gold mt-6">Reset filters</button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* mobile filters drawer */}
      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-ink-950/70 backdrop-blur-sm lg:hidden" onClick={() => setShowFilters(false)}>
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto overscroll-contain rounded-t-3xl bg-ink-900 p-6 custom-scrollbar"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="h-display text-xl">Filters</h2>
                <button onClick={() => setShowFilters(false)} aria-label="Close filters" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-xl"><Close /></button>
              </div>
              {filterPanel}
              <button onClick={() => setShowFilters(false)} className="btn-gold mt-6 w-full">Show {results.length} cars</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
