import { useRef } from 'react'
import { useScrollY } from '../../hooks/useScrollY'
import { lineOpacity, easeOutCubic } from '../../utils/animation'
import { viewportProgress } from '../../utils/scroll'

const BODY_COPY_THRESHOLD_PX = 32 // 2rem at 16px base

const SIZE_MAP = {
  xl: 'clamp(2.4rem, 8vw, 5rem)',
  lg: 'clamp(1.6rem, 5.5vw, 3rem)',
  md: 'clamp(1rem, 1.8vw, 1.4rem)',
}

interface ScrollLineProps {
  children: React.ReactNode
  delay?: number
  exitAt?: number
  size?: 'xl' | 'lg' | 'md'
  weight?: 300 | 400
  color?: string
}

export default function ScrollLine({
  children,
  delay = 0,
  exitAt = 0.85,
  size = 'xl',
  weight = 300,
  color = 'var(--color-dark)',
}: ScrollLineProps) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const isBodyCopyRef = useRef<boolean | null>(null)

  useScrollY(() => {
    const span = spanRef.current
    if (!span) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      span.style.opacity = '1'
      span.style.transform = 'none'
      span.style.filter = 'none'
      return
    }

    if (isBodyCopyRef.current === null) {
      isBodyCopyRef.current = parseFloat(window.getComputedStyle(span).fontSize) < BODY_COPY_THRESHOLD_PX
    }

    const progress = viewportProgress(span, 0.86, -0.08)

    const enterStart = delay
    const enterEnd = delay + 0.32
    const exitStart = exitAt
    const exitEnd = Math.min(1, exitAt + 0.216)

    const rawOp = lineOpacity(progress, enterStart, enterEnd, exitStart, exitEnd)
    const op = progress < enterStart ? 0.12 : rawOp
    span.style.opacity = op.toFixed(4)

    let ty = 0
    let blur = 0

    if (progress <= enterEnd) {
      const p = Math.max(0, (progress - enterStart) / Math.max(0.001, enterEnd - enterStart))
      const ep = easeOutCubic(Math.min(1, p))
      ty = (1 - ep) * 28
      blur = isBodyCopyRef.current ? 0 : (1 - ep) * 3
    } else if (progress >= exitStart) {
      const p = Math.min(1, (progress - exitStart) / Math.max(0.001, exitEnd - exitStart))
      const ep = easeOutCubic(p)
      ty = -ep * 14
    }

    span.style.transform = `translateY(${ty.toFixed(2)}px)`
    span.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none'
  })

  return (
    <p style={{ margin: 0, padding: 0 }}>
      <span
        ref={spanRef}
        style={{
          display: 'block',
          fontFamily: 'var(--font-serif)',
          fontSize: SIZE_MAP[size],
          fontWeight: weight,
          color,
          lineHeight: 1.22,
          letterSpacing: '-0.02em',
          opacity: 0,
          willChange: 'transform, opacity',
          transition: 'opacity 600ms ease-in-out, filter 400ms ease-in-out',
        }}
      >
        {children}
      </span>
    </p>
  )
}
