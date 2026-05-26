import { useRef } from 'react'
import { useScrollY } from '../../hooks/useScrollY'
import { scrollToSection } from '../../utils/animation'
import { viewportHeight } from '../../utils/scroll'
import { publicAsset } from '../../utils/assets'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useScrollY(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const hero = heroRef.current
    const vh = viewportHeight()
    const heroHeight = hero?.offsetHeight ?? vh
    const sy = Math.max(0, Math.min(window.scrollY, heroHeight))
    const img = imgRef.current
    const content = contentRef.current
    if (img) {
      img.style.transform = `translateY(${(sy * 0.36).toFixed(2)}px)`
    }
    if (content) {
      const ty = sy * 0.18
      const op = Math.max(0, 1 - sy / (vh * 0.68))
      content.style.transform = `translateY(-${ty.toFixed(2)}px)`
      content.style.opacity = op.toFixed(4)
    }
  })

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero__media">
        <img
          ref={imgRef}
          src={publicAsset('/images/aaron-beach-1.jpg')}
          alt="Aaron playing guitar on a Maui beach"
          className="hero__bg"
        />
        <div className="hero__overlay" />
      </div>

      <div className="hero__content" ref={contentRef}>
        <p className="hero__eyebrow">Kihei, Maui · Hawaii</p>
        <h1 className="hero__headline">
          <span className="hero__headline-line">Guitar &amp; Ukulele</span>
          <span className="hero__headline-line">Lessons on Maui</span>
        </h1>
        <p className="hero__sub">
          Private lessons with a local musician —<br />
          for visitors and residents alike.
        </p>
        <div className="hero__actions">
          <button className="btn btn--primary" onClick={() => scrollToSection('book')}>
            Book a Lesson
          </button>
          <button className="btn btn--ghost" onClick={() => scrollToSection('beach-lessons')}>
            See Lesson Options
          </button>
        </div>
      </div>
    </section>
  )
}
