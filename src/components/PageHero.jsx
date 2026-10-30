import { motion } from 'framer-motion'
import SmartImg from './SmartImg.jsx'

export default function PageHero({ eyebrow, title, subtitle, image, children }) {
  return (
    <section className="relative overflow-hidden pb-14 pt-36 sm:pb-20 sm:pt-44">
      {image && (
        <div className="absolute inset-0">
          <SmartImg src={image} alt="" eager className="h-full w-full object-cover opacity-30" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/80 to-ink-950" />
      <div className="absolute -top-24 left-1/2 h-72 w-[60rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="container-x relative">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="eyebrow mb-4">
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="h-display max-w-3xl text-4xl sm:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  )
}
