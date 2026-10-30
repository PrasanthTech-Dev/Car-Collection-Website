import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PageHero from '../components/PageHero.jsx'
import CarCard from '../components/CarCard.jsx'
import { Heart } from '../components/Icons.jsx'
import { formatPrice, getCar, img } from '../data/cars.js'
import { useStore } from '../context/StoreContext.jsx'

export default function Wishlist() {
  const { wishlist, clearWishlist } = useStore()
  const cars = wishlist.map(getCar).filter(Boolean)
  const total = cars.reduce((sum, c) => sum + c.price, 0)

  return (
    <>
      <PageHero
        eyebrow="Wishlist & Favorites"
        title="Your dream garage"
        subtitle="Save the cars you love and come back to them any time. Your list is stored on this device."
        image={img(4, 1800)}
      />
      <section className="container-x pb-24">
        {cars.length > 0 ? (
          <>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink-800/60 p-5">
              <p className="text-sm text-white/60">
                <span className="font-display text-2xl text-white">{cars.length}</span> {cars.length === 1 ? 'car' : 'cars'} saved · combined value{' '}
                <span className="font-semibold text-gold-400">{formatPrice(total)}</span>
              </p>
              <div className="flex gap-3">
                <Link to="/compare" className="btn-ghost !py-2.5">Go to Compare</Link>
                <button onClick={clearWishlist} className="btn-ghost !py-2.5 hover:!border-crimson-500 hover:!text-crimson-500">Clear all</button>
              </div>
            </div>
            <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {cars.map((c, i) => <CarCard key={c.id} car={c} index={i} />)}
              </AnimatePresence>
            </motion.div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card flex flex-col items-center px-6 py-24 text-center">
            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.6 }} className="mb-5 text-6xl text-gold-500/70">
              <Heart />
            </motion.div>
            <h2 className="h-display text-2xl sm:text-3xl">Your wishlist is empty</h2>
            <p className="mt-2 max-w-md text-sm text-white/55">Tap the heart on any car to save it here. Build the perfect collection, one favourite at a time.</p>
            <Link to="/collection" className="btn-gold mt-7">Explore Collection</Link>
          </motion.div>
        )}
      </section>
    </>
  )
}
