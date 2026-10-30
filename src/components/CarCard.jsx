import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Compare, Gauge, Bolt, Arrow } from './Icons.jsx'
import SmartImg from './SmartImg.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { formatPrice } from '../data/cars.js'

export default function CarCard({ car, index = 0 }) {
  const { isWished, isCompared, toggleWishlist, toggleCompare } = useStore()
  const wished = isWished(car.id)
  const compared = isCompared(car.id)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: Math.min(index, 5) * 0.06 }}
      whileHover={{ y: -8 }}
      className="group card overflow-hidden transition-colors hover:border-gold-500/50"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-ink-700">
        <Link to={`/collection/${car.id}`} aria-label={`View ${car.brand} ${car.name}`}>
          <SmartImg
            src={car.thumb}
            alt={`${car.brand} ${car.name}`}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent opacity-80" />
        </Link>
        {car.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink-950">
            {car.badge}
          </span>
        )}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => toggleWishlist(car.id, `${car.brand} ${car.name}`)}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wished}
            className={`grid h-10 w-10 place-items-center rounded-full border backdrop-blur transition ${
              wished ? 'border-crimson-500 bg-crimson-500 text-white' : 'border-white/20 bg-ink-950/60 text-white hover:border-gold-400 hover:text-gold-400'
            }`}
          >
            <Heart fill={wished ? 'currentColor' : 'none'} className="text-lg" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => toggleCompare(car.id, `${car.brand} ${car.name}`)}
            aria-label={compared ? 'Remove from comparison' : 'Add to comparison'}
            aria-pressed={compared}
            className={`grid h-10 w-10 place-items-center rounded-full border backdrop-blur transition ${
              compared ? 'border-gold-400 bg-gold-500 text-ink-950' : 'border-white/20 bg-ink-950/60 text-white hover:border-gold-400 hover:text-gold-400'
            }`}
          >
            <Compare className="text-lg" />
          </motion.button>
        </div>
      </div>

      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-400">
          {car.brand} · {car.category}
        </p>
        <h3 className="h-display mt-1 text-xl">{car.name}</h3>
        <div className="mt-4 flex items-center gap-4 text-xs text-white/55">
          <span className="flex items-center gap-1.5">
            <Bolt className="text-gold-400" /> {car.power} hp
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge className="text-gold-400" /> 0–60 in {car.zeroTo60}s
          </span>
          <span className="ml-auto text-white/40">{car.year}</span>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/40">Starting at</p>
            <p className="text-lg font-semibold text-white">{formatPrice(car.price)}</p>
          </div>
          <Link
            to={`/collection/${car.id}`}
            className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition group-hover:border-gold-400 group-hover:bg-gold-500 group-hover:text-ink-950"
          >
            Details <Arrow />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
