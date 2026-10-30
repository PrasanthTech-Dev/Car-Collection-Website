import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', className = '' }) {
  return (
    <Reveal className={`mb-12 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="h-display text-3xl sm:text-5xl">{title}</h2>
      <div className={`mt-5 h-px w-20 bg-gradient-to-r from-gold-500 to-transparent ${align === 'center' ? 'mx-auto' : ''}`} />
      {subtitle && <p className="mt-5 text-base leading-relaxed text-white/60">{subtitle}</p>}
    </Reveal>
  )
}
