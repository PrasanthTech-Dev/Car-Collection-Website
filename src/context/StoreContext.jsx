import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from '../components/Icons.jsx'

const Ctx = createContext(null)
const MAX_COMPARE = 3

const load = (key, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem(key))
    return v ?? fallback
  } catch {
    return fallback
  }
}
const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable */
  }
}

export function StoreProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => load('royal_wishlist', load('apex_wishlist', [])))
  const [compare, setCompare] = useState(() => load('royal_compare', load('apex_compare', [])))
  const [toasts, setToasts] = useState([])

  useEffect(() => save('royal_wishlist', wishlist), [wishlist])
  useEffect(() => save('royal_compare', compare), [compare])

  const toast = useCallback((message) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, message }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600)
  }, [])

  const toggleWishlist = useCallback(
    (id, name) => {
      const has = wishlist.includes(id)
      setWishlist(has ? wishlist.filter((x) => x !== id) : [...wishlist, id])
      toast(has ? `${name || 'Car'} removed from wishlist` : `${name || 'Car'} saved to wishlist`)
    },
    [wishlist, toast]
  )

  const toggleCompare = useCallback(
    (id, name) => {
      if (compare.includes(id)) {
        setCompare(compare.filter((x) => x !== id))
        toast(`${name || 'Car'} removed from comparison`)
      } else if (compare.length >= MAX_COMPARE) {
        toast(`You can compare up to ${MAX_COMPARE} cars`)
      } else {
        setCompare([...compare, id])
        toast(`${name || 'Car'} added to comparison`)
      }
    },
    [compare, toast]
  )

  const value = {
    wishlist,
    compare,
    toast,
    toggleWishlist,
    toggleCompare,
    clearWishlist: () => setWishlist([]),
    clearCompare: () => setCompare([]),
    isWished: (id) => wishlist.includes(id),
    isCompared: (id) => compare.includes(id),
    MAX_COMPARE,
  }

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-24 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-2 px-4 sm:bottom-8">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="flex items-center gap-2 rounded-full border border-gold-500/40 bg-ink-800/95 px-5 py-3 text-sm text-white shadow-2xl backdrop-blur"
            >
              <Check className="text-gold-400" />
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  )
}

export const useStore = () => useContext(Ctx)
