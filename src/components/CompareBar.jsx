import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Compare, Close } from './Icons.jsx'
import SmartImg from './SmartImg.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { getCar } from '../data/cars.js'

export default function CompareBar() {
  const { compare, toggleCompare, clearCompare } = useStore()
  const { pathname } = useLocation()
  const cars = compare.map(getCar).filter(Boolean)
  const visible = cars.length > 0 && pathname !== '/compare'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-2xl items-center gap-3 rounded-2xl border border-gold-500/40 bg-ink-800/95 p-3 shadow-2xl backdrop-blur-xl sm:bottom-5"
        >
          <div className="flex -space-x-2">
            {cars.map((c) => (
              <div key={c.id} className="group relative h-11 w-11 overflow-hidden rounded-full border-2 border-ink-800 bg-ink-600">
                <SmartImg src={c.thumb} alt={c.name} className="h-full w-full object-cover" />
                <button
                  onClick={() => toggleCompare(c.id, c.name)}
                  aria-label={`Remove ${c.name}`}
                  className="absolute inset-0 grid place-items-center bg-ink-950/80 text-sm opacity-0 transition group-hover:opacity-100 focus:opacity-100"
                >
                  <Close />
                </button>
              </div>
            ))}
          </div>
          <p className="flex-1 text-sm text-white/70">
            <span className="font-semibold text-white">{cars.length}</span> selected
            <span className="hidden sm:inline"> · compare up to 3 cars</span>
          </p>
          <button onClick={clearCompare} className="text-xs uppercase tracking-wider text-white/50 hover:text-white">
            Clear
          </button>
          <Link to="/compare" className="btn-gold !px-5 !py-2.5">
            <Compare /> Compare
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
