import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import Counter from '../components/Counter.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import SmartImg from '../components/SmartImg.jsx'
import { Arrow, Shield, Star, Bolt, Wrench } from '../components/Icons.jsx'
import { TEAM, TIMELINE, VALUES } from '../data/content.js'
import { img } from '../data/cars.js'

const ICONS = [Shield, Star, Bolt, Wrench]

export default function About() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Built on a love of the automobile" subtitle="Since 2009 Royal Motors has connected discerning drivers with the world’s most extraordinary cars." image={img(12, 1800)} />

      <section className="container-x grid items-center gap-12 pb-20 lg:grid-cols-2">
        <Reveal x={-30} y={0}>
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl border border-gold-500/30" />
            <SmartImg src={img(4, 1200)} alt="Royal Motors showroom" className="relative aspect-[4/3] w-full rounded-2xl bg-ink-700 object-cover" />
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -bottom-6 -right-2 rounded-2xl bg-gold-500 px-6 py-4 text-ink-950 shadow-2xl sm:-right-6">
              <p className="font-display text-4xl font-bold"><Counter to={15} suffix="+" /></p>
              <p className="text-[10px] font-semibold uppercase tracking-widest">Years of excellence</p>
            </motion.div>
          </div>
        </Reveal>
        <Reveal x={30} y={0}>
          <p className="eyebrow mb-3">Our Story</p>
          <h2 className="h-display text-3xl sm:text-5xl">Passion first. Profit second.</h2>
          <p className="mt-6 leading-relaxed text-white/65">
            Royal Motors began with six cars and a single conviction: buying a great car should feel as thrilling as driving one. Today our team of enthusiasts curates supercars, sports cars, luxury saloons, SUVs and collectible classics for clients in more than 40 countries.
          </p>
          <p className="mt-4 leading-relaxed text-white/65">
            Every vehicle is inspected by marque specialists, documented in full and presented with total transparency — so your only decision is which one to drive home.
          </p>
          <Link to="/collection" className="btn-gold mt-8">View the Collection <Arrow /></Link>
        </Reveal>
      </section>

      <section className="bg-ink-900 py-20">
        <div className="container-x grid grid-cols-2 gap-10 lg:grid-cols-4">
          {[[3200, '+', 'Cars delivered'], [40, '+', 'Countries'], [120, '+', 'Marques sourced'], [98, '%', 'Satisfaction']].map(([to, s, l], i) => (
            <Reveal key={l} delay={i * 0.08} className="text-center">
              <p className="text-gradient font-display text-4xl sm:text-6xl"><Counter to={to} suffix={s} /></p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/50">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="What we stand for" title="Our values" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => {
              const Icon = ICONS[i]
              return (
                <Reveal key={v.title} delay={i * 0.08}>
                  <motion.div whileHover={{ y: -8 }} className="card h-full p-7 transition-colors hover:border-gold-500/50">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-500/10 text-2xl text-gold-400"><Icon /></span>
                    <h3 className="h-display mt-5 text-xl">{v.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">{v.text}</p>
                  </motion.div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-ink-900 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Our journey" title="Milestones" />
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-gold-500 via-gold-500/30 to-transparent sm:left-1/2" />
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} x={i % 2 ? 30 : -30} y={0} className={`relative mb-10 pl-12 sm:w-1/2 sm:pl-0 ${i % 2 ? 'sm:ml-auto sm:pl-12' : 'sm:pr-12 sm:text-right'}`}>
                <span className={`absolute left-[11px] top-2 h-3 w-3 rounded-full bg-gold-500 ring-4 ring-ink-900 sm:left-auto ${i % 2 ? 'sm:-left-1.5' : 'sm:-right-1.5'}`} />
                <p className="font-display text-3xl text-gold-400">{t.year}</p>
                <p className="mt-1 text-sm text-white/60">{t.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading eyebrow="The people" title="Meet the team" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.08}>
                <motion.div whileHover={{ y: -6 }} className="card p-6 text-center">
                  <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-gold-500/40 bg-gradient-to-br from-ink-600 to-ink-800 font-display text-3xl text-gold-400">
                    {m.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <h3 className="h-display mt-5 text-lg">{m.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-widest text-white/45">{m.role}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
