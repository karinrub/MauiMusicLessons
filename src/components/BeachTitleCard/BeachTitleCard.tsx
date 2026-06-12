import { useRef } from 'react'
import { useScrollY } from '../../hooks/useScrollY'
import { easeOutCubic } from '../../utils/animation'
import { viewportProgress } from '../../utils/scroll'
import { publicAsset } from '../../utils/assets'
import './BeachTitleCard.css'

export default function BeachTitleCard() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const textureRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useScrollY(() => {
    const section = sectionRef.current
    const content = contentRef.current
    const texture = textureRef.current
    const title = titleRef.current
    if (!section || !content || !texture || !title) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      content.style.opacity = '1'
      content.style.transform = 'none'
      content.style.filter = 'none'
      texture.style.opacity = '0.24'
      title.style.letterSpacing = '-0.025em'
      return
    }

    const progress = viewportProgress(section, 0.92, -0.12)
    const focus = easeOutCubic(Math.min(1, progress / 0.62))
    const exit = progress > 0.82 ? easeOutCubic((progress - 0.82) / 0.18) : 0

    const scale = 0.72 + focus * 0.28
    const opacity = Math.max(0, Math.min(1, 0.2 + focus * 0.9 - exit * 0.24))
    const blur = (1 - focus) * 7 + exit * 1.4
    const y = (1 - focus) * 12 - exit * 8
    const tracking = 0.075 - focus * 0.1

    content.style.opacity = opacity.toFixed(4)
    content.style.transform = `translateY(${y.toFixed(2)}px) scale(${scale.toFixed(4)})`
    content.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none'
    title.style.letterSpacing = `${tracking.toFixed(4)}em`
    texture.style.opacity = (0.08 + focus * 0.22 - exit * 0.06).toFixed(4)
  })

  return (
    <section ref={sectionRef} className="beach-title-card" aria-labelledby="beach-title-heading">
      <div
        ref={textureRef}
        className="beach-title-card__texture"
        style={{ backgroundImage: `url(${publicAsset('/images/aaron-beach-1.jpg')})` }}
        aria-hidden="true"
      />
      <div className="beach-title-card__gradient" aria-hidden="true" />
      <div ref={contentRef} className="beach-title-card__content">
        <p className="section-eyebrow section-eyebrow--light beach-title-card__eyebrow">
          Kihei, Maui
        </p>
        <h2 ref={titleRef} id="beach-title-heading" className="beach-title-card__title">
          Ukulele by the Beach
        </h2>
        <p className="beach-title-card__subtext">
          One hour, one song, one memory the island makes with you.
        </p>
      </div>
    </section>
  )
}
