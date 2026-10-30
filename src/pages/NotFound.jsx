import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Car } from '../components/Icons.jsx'

export default function NotFound() {
  return (
    <section className="container-x grid min-h-[80vh] place-items-center pt-24 text-center">
      <div>
        <motion.div animate={{ x: [-20, 20, -20] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="mx-auto mb-6 w-fit text-7xl text-gold-400">
          <Car />
        </motion.div>
        <p className="eyebrow">Error 404</p>
        <h1 className="h-display mt-3 text-4xl sm:text-6xl">Wrong turn.</h1>
        <p className="mx-auto mt-4 max-w-md text-white/60">The page you’re looking for has left the garage. Let’s get you back on the road.</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/" className="btn-gold">Go Home</Link>
          <Link to="/collection" className="btn-ghost">Browse Collection</Link>
        </div>
      </div>
    </section>
  )
}
