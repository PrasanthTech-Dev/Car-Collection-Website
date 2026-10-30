import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

export default function Counter({ to, suffix = '', decimals = 0, duration = 2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => setV(latest),
    })
    return () => controls.stop()
  }, [inView, to, duration])

  const shown = decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-US')
  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  )
}
