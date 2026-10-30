import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PageHero from '../components/PageHero.jsx'
import SmartImg from '../components/SmartImg.jsx'
import { Close, Compare as CompareIcon, Plus, Chevron, Trophy } from '../components/Icons.jsx'
import { CARS, formatPrice, getCar, img } from '../data/cars.js'
import { useStore } from '../context/StoreContext.jsx'

// best: 'max' = highest wins, 'min' = lowest wins
const ROWS = [
  { label: 'Price', get: (c) => c.price, show: (c) => formatPrice(c.price), best: 'min' },
  { label: 'Model year', get: (c) => c.year, show: (c) => c.year },
  { label: 'Category', get: (c) => c.category, show: (c) => c.category },
  { label: 'Engine', get: (c) => c.engine, show: (c) => c.engine },
  { label: 'Power', get: (c) => c.power, show: (c) => `${c.power} hp`, best: 'max' },
  { label: 'Torque', get: (c) => c.torque, show: (c) => `${c.torque} lb-ft`, best: 'max' },
  { label: '0–60 mph', get: (c) => c.zeroTo60, show: (c) => `${c.zeroTo60} s`, best: 'min' },
  { label: 'Top speed', get: (c) => c.topSpeed, show: (c) => `${c.topSpeed} mph`, best: 'max' },
  { label: 'Transmission', get: (c) => c.transmission, show: (c) => c.transmission },
  { label: 'Drivetrain', get: (c) => c.drivetrain, show: (c) => c.drivetrain },
  { label: 'Fuel type', get: (c) => c.fuel, show: (c) => c.fuel },
  { label: 'Seats', get: (c) => c.seats, show: (c) => c.seats, best: 'max' },
]

export default function Compare() {
  const { compare, toggleCompare, clearCompare, MAX_COMPARE } = useStore()
  const cars = compare.map(getCar).filter(Boolean)
  const available = CARS.filter((c) => !compare.includes(c.id))

  const isBest = (row, car) => {
    if (!row.best || cars.length < 2) return false
    const values = cars.map(row.get)
    const target = row.best === 'max' ? Math.max(...values) : Math.min(...values)
    return values.filter((v) => v === target).length < values.length && row.get(car) === target
  }

  const wins = Object.fromEntries(cars.map((c) => [c.id, ROWS.filter((r) => isBest(r, c)).length]))
  const topWins = Math.max(0, ...Object.values(wins))

  return (
    <>
      <PageHero
        eyebrow="Compare"
        title="Side by side, spec by spec"
        subtitle={`Pick up to ${MAX_COMPARE} cars and see exactly how they stack up. Best values are highlighted in gold.`}
        image={img(9, 1800)}
      />
      <section className="container-x pb-24">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {cars.length < MAX_COMPARE && (
            <div className="relative">
              <select
                value=""
                onChange={(e) => {
                  const c = getCar(e.target.value)
                  if (c) toggleCompare(c.id, `${c.brand} ${c.name}`)
                }}
                aria-label="Add a car to compare"
                className="input w-72 appearance-none !rounded-full pr-10"
              >
                <option value="">+ Add a car to compare…</option>
                {available.map((c) => (
                  <option key={c.id} value={c.id}>{c.brand} {c.name}</option>
                ))}
              </select>
              <Chevron className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50" />
            </div>
          )}
          {cars.length > 0 && (
            <button onClick={clearCompare} className="btn-ghost !py-3">Clear all</button>
          )}
        </div>

        {cars.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card flex flex-col items-center px-6 py-20 text-center">
            <CompareIcon className="mb-4 text-5xl text-gold-500/70" />
            <h2 className="h-display text-2xl sm:text-3xl">Nothing to compare yet</h2>
            <p className="mt-2 max-w-md text-sm text-white/55">Tap the compare icon on any car, or pick from the list above, to start building your comparison.</p>
            <Link to="/collection" className="btn-gold mt-6">Browse Collection</Link>
          </motion.div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-40 bg-ink-800 p-4 text-left align-bottom text-xs font-semibold uppercase tracking-widest text-white/40">Vehicle</th>
                  <AnimatePresence initial={false}>
                    {cars.map((c) => (
                      <motion.th key={c.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-ink-800 p-4 align-top font-normal">
                        <div className="relative overflow-hidden rounded-xl">
                          <SmartImg src={c.thumb} alt={`${c.brand} ${c.name}`} className="aspect-[16/10] w-full bg-ink-700 object-cover" />
                          <button onClick={() => toggleCompare(c.id, c.name)} aria-label={`Remove ${c.name}`} className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-ink-950/80 transition hover:bg-crimson-500">
                            <Close />
                          </button>
                          {topWins > 0 && wins[c.id] === topWins && cars.length > 1 && (
                            <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-gold-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-950">
                              <Trophy /> Top spec
                            </span>
                          )}
                        </div>
                        <p className="mt-3 text-[10px] uppercase tracking-widest text-gold-400">{c.brand}</p>
                        <Link to={`/collection/${c.id}`} className="h-display text-lg hover:text-gold-400">{c.name}</Link>
                      </motion.th>
                    ))}
                  </AnimatePresence>
                  {cars.length < MAX_COMPARE && (
                    <th className="bg-ink-800 p-4 align-middle">
                      <Link to="/collection" className="grid aspect-[16/10] place-items-center rounded-xl border border-dashed border-white/20 text-white/40 transition hover:border-gold-400 hover:text-gold-400">
                        <span className="flex flex-col items-center gap-1 text-xs uppercase tracking-wider"><Plus className="text-2xl" /> Add car</span>
                      </Link>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.label} className={i % 2 ? 'bg-ink-800/40' : 'bg-ink-900/40'}>
                    <td className="p-4 text-xs font-semibold uppercase tracking-widest text-white/45">{row.label}</td>
                    {cars.map((c) => {
                      const best = isBest(row, c)
                      return (
                        <td key={c.id} className={`p-4 ${best ? 'font-semibold text-gold-400' : 'text-white/85'}`}>
                          {row.show(c)}
                          {best && <span className="ml-2 text-xs">★</span>}
                        </td>
                      )
                    })}
                    {cars.length < MAX_COMPARE && <td />}
                  </tr>
                ))}
                <tr className="bg-ink-900/40">
                  <td className="p-4" />
                  {cars.map((c) => (
                    <td key={c.id} className="p-4">
                      <Link to={`/test-drive?car=${c.id}`} className="btn-gold !px-5 !py-2.5 !text-xs">Test drive</Link>
                    </td>
                  ))}
                  {cars.length < MAX_COMPARE && <td />}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  )
}
