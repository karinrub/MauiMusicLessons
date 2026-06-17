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
  imageWidth?: number
  imageHeight?: number
  className?: string
  imageRestOpacity?: number
  imageExitOpacity?: number
  entryStart?: number
  variant?: 'default' | 'beachEntry'
}

export default function CinematicPanel({
  lines,
  height = '270vh',
  image,
  imageAlt = '',
  imageWidth,
  imageHeight,
  className = '',
  imageRestOpacity = 0.13,
  imageExitOpacity = 0,
  entryStart = 0.08,
  variant = 'default',
}: CinematicPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const imageRef = useRef<HTMLImageElement>(null)
  const isBeachEntry = variant === 'beachEntry'

  // Reduced-motion: set styles once and skip animation
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lineRefs.current.forEach((el) => {
      if (!el) return
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
      el.style.filter = 'none'
    })
    if (imageRef.current) imageRef.current.style.opacity = Math.max(imageRestOpacity, imageExitOpacity).toString()
  }, [lines, imageRestOpacity, imageExitOpacity])

  const count = lines.length
  const spread = 0.2
  const defaultEntryPoints = lines.map((_, i) => entryStart + i * (spread / Math.max(count - 1, 1)))
  const beachEntryPoints = [0, 0.1, 0.25]
  const beachExitStarts = [0.48, 0.58, 0.78]
  const beachExitEnds = [0.64, 0.72, 0.94]

  useScrollY(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const container = containerRef.current
    if (!container) return

    const progress = stickyProgress(container)

    // Ambient image layer — barely visible, slow parallax
    const imgEl = imageRef.current
    if (imgEl) {
      let imgOp = 0
      if (isBeachEntry) {
        if (progress < 0.18) {
          imgOp = imageRestOpacity * 0.24 + easeOutCubic(progress / 0.18) * imageRestOpacity * 0.44
        } else if (progress < 0.5) {
          const arrival = easeOutCubic((progress - 0.18) / 0.32)
          imgOp = imageRestOpacity * 0.68 + arrival * imageRestOpacity * 0.32
        } else if (progress < 0.9) {
          imgOp = imageRestOpacity
        } else {
          const exitProgress = Math.min(1, (progress - 0.9) / 0.1)
          imgOp = imageRestOpacity - easeOutCubic(exitProgress) * (imageRestOpacity - imageExitOpacity)
        }

        const scale = 1.045 - progress * 0.035
        const y = -progress * 1.6
        imgEl.style.opacity = imgOp.toFixed(4)
        imgEl.style.transform = `scale(${scale.toFixed(4)}) translateY(${y.toFixed(2)}%)`
      } else {
        if (progress < 0.15) {
          imgOp = easeOutCubic(progress / 0.15) * imageRestOpacity
        } else if (progress < 0.78) {
          imgOp = imageRestOpacity
        } else {
          const exitProgress = Math.min(1, (progress - 0.78) / 0.22)
          imgOp = imageRestOpacity - easeOutCubic(exitProgress) * (imageRestOpacity - imageExitOpacity)
        }

        const scale = 1.06 - progress * 0.07
        imgEl.style.opacity = imgOp.toFixed(4)
        imgEl.style.transform = `scale(${scale.toFixed(4)})`
      }
    }

    lineRefs.current.forEach((el, i) => {
      if (!el) return

      const enterStart = isBeachEntry ? (beachEntryPoints[i] ?? 0.52) : defaultEntryPoints[i]
      const enterDuration = isBeachEntry ? (i === 0 ? 0.04 : i === 1 ? 0.08 : 0.12) : 0.15
      const enterEnd = enterStart + enterDuration
      const exitStart = isBeachEntry ? (beachExitStarts[i] ?? 0.88) : 0.8
      const exitEnd = isBeachEntry ? (beachExitEnds[i] ?? 0.99) : 0.96

      const op = lineOpacity(progress, enterStart, enterEnd, exitStart, exitEnd)
      el.style.opacity = op.toFixed(4)

      let ty = 0
      let blur = 0

      if (progress <= enterEnd) {
        const p = Math.max(0, (progress - enterStart) / (enterEnd - enterStart))
        const ep = easeOutCubic(Math.min(1, p))
        ty = (1 - ep) * (isBeachEntry ? (i === 2 ? 26 : 18) : 38)
        blur = (1 - ep) * (isBeachEntry ? 0.6 : 5)
      } else if (progress >= exitStart) {
        const p = Math.min(1, (progress - exitStart) / (exitEnd - exitStart))
        const ep = easeOutCubic(p)
        ty = -ep * (isBeachEntry ? (i === 2 ? 10 : 8) : 18)
        blur = ep * (isBeachEntry ? 0.5 : 3)
      }

      el.style.transform = `translateY(${ty.toFixed(2)}px)`
      el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none'
    })
  })

  const classes = ['cinematic-panel', className].filter(Boolean).join(' ')

  return (
    <div ref={containerRef} className={classes} style={{ height }}>
      <div className="cinematic-panel__sticky">
        {image && (
          <img
            ref={imageRef}
            src={image}
            alt={imageAlt}
            aria-hidden="true"
            width={imageWidth}
            height={imageHeight}
            loading="lazy"
            decoding="async"
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
