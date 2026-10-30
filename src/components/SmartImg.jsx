import { useState } from 'react'
import { Car } from './Icons.jsx'

/** Image with shimmer placeholder and an elegant fallback if the source fails to load. */
export default function SmartImg({ src, alt, className = '', eager = false, ...rest }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`${className} grid place-items-center bg-gradient-to-br from-ink-600 via-ink-700 to-ink-900 text-gold-500/50`}
      >
        <Car className="h-1/4 w-1/4 min-h-8 min-w-8" />
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      {...rest}
    />
  )
}
