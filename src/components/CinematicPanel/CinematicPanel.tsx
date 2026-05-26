import { useEffect, useRef } from 'react'
import { useScrollY } from '../../hooks/useScrollY'
import { lineOpacity, easeOutCubic } from '../../utils/animation'
import { stickyProgress } from '../../utils/scroll'
import './CinematicPanel.css'

interface CinematicPanelProps {
  lines: string[]
  height?: string
  image?: string
  imageAlt?: string
}

export default function CinematicPanel({ lines, height = '270vh', image, imageAlt = '' }: CinematicPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const imageRef = useRef<HTMLImageElement>(null)

  // Reduced-motion: set styles once and skip animation
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lineRefs.current.forEach((el) => {
      if (!el) return
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
      el.style.filter = 'none'
    })
    if (imageRef.current) imageRef.current.style.opacity = '0.12'
  }, [lines])

  const count = lines.length
  const spread = 0.26
  const entryPoints = lines.map((_, i) => 0.07 + i * (spread / Math.max(count - 1, 1)))

  useScrollY(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const container = containerRef.current
    if (!container) return

    const progress = stickyProgress(container)

    // Ambient image layer — barely visible, slow parallax
    const imgEl = imageRef.current
    if (imgEl) {
      let imgOp = 0
      if (progress < 0.12) imgOp = (progress / 0.12) * 0.13
      else if (progress < 0.82) imgOp = 0.13
      else imgOp = Math.max(0, (1 - (progress - 0.82) / 0.15)) * 0.13

      const scale = 1.06 - progress * 0.07
      imgEl.style.opacity = imgOp.toFixed(4)
      imgEl.style.transform = `scale(${scale.toFixed(4)})`
    }

    lineRefs.current.forEach((el, i) => {
      if (!el) return

      const enterStart = entryPoints[i]
      const enterEnd = enterStart + 0.18
      const exitStart = 0.76
      const exitEnd = 0.93

      const op = lineOpacity(progress, enterStart, enterEnd, exitStart, exitEnd)
      el.style.opacity = op.toFixed(4)

      let ty = 0
      let blur = 0

      if (progress <= enterEnd) {
        const p = Math.max(0, (progress - enterStart) / (enterEnd - enterStart))
        const ep = easeOutCubic(Math.min(1, p))
        ty = (1 - ep) * 38
        blur = (1 - ep) * 5
      } else if (progress >= exitStart) {
        const p = Math.min(1, (progress - exitStart) / (exitEnd - exitStart))
        const ep = easeOutCubic(p)
        ty = -ep * 18
        blur = ep * 3
      }

      el.style.transform = `translateY(${ty.toFixed(2)}px)`
      el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none'
    })
  })

  return (
    <div ref={containerRef} className="cinematic-panel" style={{ height }}>
      <div className="cinematic-panel__sticky">
        {image && (
          <img
            ref={imageRef}
            src={image}
            alt={imageAlt}
            aria-hidden="true"
            loading="lazy"
            className="cinematic-panel__image"
          />
        )}
        <div className="cinematic-panel__lines">
          {lines.map((line, i) => (
            <p key={i} className="cinematic-panel__line">
              <span
                ref={(el) => { lineRefs.current[i] = el }}
                className="cinematic-panel__text"
              >
                {line}
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
