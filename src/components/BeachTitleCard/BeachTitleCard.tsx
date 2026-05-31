import { useEffect, useRef } from 'react'
import './BeachTitleCard.css'

export default function BeachTitleCard() {
  const sectionRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = sectionRef.current
    if (!section) return

    if (prefersReducedMotion) return

    const refs = [eyebrowRef.current, titleRef.current, subtextRef.current]
    const delays = [0, 80, 180]
    const timeouts: ReturnType<typeof setTimeout>[] = []
    let triggered = false

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || triggered) return
      triggered = true
      observer.disconnect()
      refs.forEach((el, i) => {
        if (!el) return
        const t = setTimeout(() => {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }, delays[i])
        timeouts.push(t)
      })
    }, { threshold: 0.05 })

    observer.observe(section)

    return () => {
      observer.disconnect()
      timeouts.forEach(clearTimeout)
    }
  }, [])

  return (
    <section ref={sectionRef} className="beach-title-card" aria-labelledby="beach-title-heading">
      <div className="beach-title-card__gradient" aria-hidden="true" />
      <div className="beach-title-card__content">
        <p ref={eyebrowRef} className="section-eyebrow section-eyebrow--light beach-title-card__eyebrow">
          Kihei, Maui
        </p>
        <h2 ref={titleRef} id="beach-title-heading" className="beach-title-card__title">
          Ukulele by the Beach
        </h2>
        <p ref={subtextRef} className="beach-title-card__subtext">
          One hour, one song, one memory the island makes with you.
        </p>
      </div>
    </section>
  )
}
