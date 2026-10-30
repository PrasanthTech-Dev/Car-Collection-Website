import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import { Plus, Search } from '../components/Icons.jsx'
import { FAQS } from '../data/content.js'
import { img } from '../data/cars.js'

const CATS = ['All', ...Array.from(new Set(FAQS.map((f) => f.cat)))]

export default function FAQ() {
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(0)

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    return FAQS.filter((f) => (cat === 'All' || f.cat === cat) && (!term || `${f.q} ${f.a}`.toLowerCase().includes(term)))
  }, [cat, q])

  return (
    <>
      <PageHero eyebrow="FAQ" title="Answers, before you ask" subtitle="Everything you need to know about buying, financing, test drives and ownership." image={img(13, 1800)} />
      <section className="container-x pb-24">
        <div className="mx-auto max-w-3xl">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input value={q} onChange={(e) => { setQ(e.target.value); setOpen(null) }} placeholder="Search questions…" aria-label="Search FAQ" className="input !rounded-full !pl-11" />
          </div>
          <div className="mb-8 flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button key={c} onClick={() => { setCat(c); setOpen(null) }} className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${cat === c ? 'border-gold-400 bg-gold-500 text-ink-950' : 'border-white/15 text-white/65 hover:border-gold-400 hover:text-white'}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <AnimatePresence initial={false} mode="popLayout">
              {list.map((f, i) => {
                const isOpen = open === f.q
                return (
                  <motion.div key={f.q} layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.03 }} className={`card overflow-hidden transition-colors ${isOpen ? 'border-gold-500/50' : ''}`}>
                    <button onClick={() => setOpen(isOpen ? null : f.q)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 p-5 text-left">
                      <span>
                        <span className="block text-[10px] uppercase tracking-[0.25em] text-gold-400">{f.cat}</span>
                        <span className="mt-1 block font-medium">{f.q}</span>
                      </span>
                      <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 text-lg">
                        <Plus />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                          <p className="px-5 pb-5 text-sm leading-relaxed text-white/65">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </AnimatePresence>
            {list.length === 0 && <p className="py-12 text-center text-white/50">No questions match your search.</p>}
          </div>

          <Reveal className="mt-14 rounded-2xl border border-gold-500/30 bg-ink-800 p-8 text-center">
            <h3 className="h-display text-2xl">Still have questions?</h3>
            <p className="mt-2 text-sm text-white/60">Our concierge team is happy to help.</p>
            <Link to="/contact" className="btn-gold mt-6">Contact Us</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
