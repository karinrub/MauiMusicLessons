import { useRef } from 'react'
import { useScrollY } from '../../hooks/useScrollY'
import { easeOutCubic, scrollToSection } from '../../utils/animation'
import { viewportHeight } from '../../utils/scroll'
import { publicAsset } from '../../utils/assets'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)

  useScrollY(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const vh = viewportHeight()
    const container = containerRef.current
    const heroHeight = container?.offsetHeight ?? (vh * 1.6)
    const scrollY = window.scrollY
    const sy = Math.max(0, Math.min(scrollY, heroHeight))
    const img = imgRef.current
    const content = contentRef.current
    if (img) {
      const imageDrift = Math.min(vh * 0.08, sy * 0.08)
      img.style.transform = `translateY(${imageDrift.toFixed(2)}px)`
    }
    if (content) {
      const ty = sy * 0.18
      const op = Math.max(0, 1 - sy / (vh * 0.68))
      content.style.transform = `translateY(-${ty.toFixed(2)}px)`
      content.style.opacity = op.toFixed(4)
    }
    const veil = veilRef.current
    if (veil) {
      const veilProgress = Math.max(0, Math.min(1, (sy - vh * 0.16) / (heroHeight - vh * 0.16)))
      veil.style.opacity = easeOutCubic(veilProgress).toFixed(4)
    }
  })

  return (
    <div className="hero-scroll-container" ref={containerRef}>
      <section className="hero" id="hero" ref={heroRef}>
        <div className="hero__media">
          <img
            ref={imgRef}
            src={publicAsset('/images/aaron-beach-1.jpg')}
            alt="Aaron playing guitar on a Maui beach"
            width="2200"
            height="1467"
            fetchPriority="high"
            decoding="async"
            className="hero__bg"
          />
          <div className="hero__overlay" />
        </div>

        <div className="hero__content" ref={contentRef}>
          <p className="hero__eyebrow">Kihei, Maui · Hawaii</p>
          <h1 className="hero__headline">
            <span className="hero__headline-line">Guitar &amp; Ukulele </span>
            <span className="hero__headline-line">Lessons on Maui</span>
          </h1>
          <p className="hero__sub">
            Learn a song. Play it with the sound of the ocean behind you.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary" onClick={() => scrollToSection('book')}>
              BOOK A LESSON
            </button>
            <button className="btn btn--ghost" onClick={() => scrollToSection('beach-lessons')}>
              See lesson options →
            </button>
          </div>
        </div>
        <div className="hero__dark-veil" ref={veilRef} aria-hidden="true" />
      </section>
    </div>
  )
}
