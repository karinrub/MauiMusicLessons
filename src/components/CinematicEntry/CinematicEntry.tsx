import { useEffect, useRef } from 'react'
import { easeOutCubic, lineOpacity } from '../../utils/animation'
import { viewportProgress } from '../../utils/scroll'
import './CinematicEntry.css'

interface CinematicEntryProps {
  lines: string[]
  imageSrc?: string
  imageWidth?: number
  imageHeight?: number
}

export default function CinematicEntry({ lines, imageSrc, imageWidth, imageHeight }: CinematicEntryProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = sectionRef.current
    if (!section) return

    if (prefersReducedMotion) {
      lineRefs.current.forEach(el => {
        if (!el) return
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      if (imageRef.current) imageRef.current.style.opacity = '0.13'
      return
    }

    const count = lines.length
    const spread = 0.28
    const entryPoints = lines.map((_, i) => 0.08 + i * (spread / Math.max(count - 1, 1)))

    let rafId: number

    const update = () => {
      const progress = viewportProgress(section, 0.88, -0.55)

      if (imageRef.current) {
        const imgOp = progress < 0.14
          ? (progress / 0.14) * 0.13
          : progress > 0.86
            ? Math.max(0, 1 - (progress - 0.86) / 0.14) * 0.13
            : 0.13
        imageRef.current.style.opacity = imgOp.toFixed(4)
      }

      lineRefs.current.forEach((el, i) => {
        if (!el) return

        const enterStart = entryPoints[i]
        const enterEnd = enterStart + 0.28
        const exitStart = 0.84
        const exitEnd = 1
        const op = lineOpacity(progress, enterStart, enterEnd, exitStart, exitEnd)

        let ty = 0
        if (progress <= enterEnd) {
          const p = Math.max(0, (progress - enterStart) / Math.max(0.001, enterEnd - enterStart))
          ty = (1 - easeOutCubic(Math.min(1, p))) * 18
        } else if (progress >= exitStart) {
          const p = Math.min(1, (progress - exitStart) / Math.max(0.001, exitEnd - exitStart))
          ty = -easeOutCubic(p) * 12
        }

        el.style.opacity = op.toFixed(4)
        el.style.transform = `translateY(${ty.toFixed(2)}px)`
      })
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.visualViewport?.addEventListener('resize', onScroll)
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.visualViewport?.removeEventListener('resize', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [lines])

  return (
    <section ref={sectionRef} className="cinematic-entry">
      {imageSrc && (
        <img
          ref={imageRef}
          src={imageSrc}
          alt=""
          aria-hidden="true"
          width={imageWidth}
          height={imageHeight}
          loading="lazy"
          decoding="async"
          className="cinematic-entry__image"
        />
      )}
      <div className="cinematic-entry__lines">
        {lines.map((line, i) => (
          <p key={i} className="cinematic-entry__line">
            <span
              ref={el => { lineRefs.current[i] = el }}
              className="cinematic-entry__text"
            >
              {line}
            </span>
          </p>
        ))}
      </div>
    </section>
  )
}
