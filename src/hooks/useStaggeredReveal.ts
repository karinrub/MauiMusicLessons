import { useEffect } from 'react'

export function useStaggeredReveal(
  containerRef: { current: Element | null },
  targetRefs: Array<{ current: HTMLElement | null }>,
  delays = [0, 60, 120],
  threshold = 0.02
): void {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const container = containerRef.current
    if (!container) return

    const targets = targetRefs.map(ref => ref.current).filter((el): el is HTMLElement => el !== null)

    if (prefersReducedMotion) {
      targets.forEach(el => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      return
    }

    const timeouts: ReturnType<typeof setTimeout>[] = []
    let triggered = false

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || triggered) return
      triggered = true
      observer.disconnect()

      targets.forEach((el, i) => {
        const timeout = setTimeout(() => {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }, delays[i] ?? 0)
        timeouts.push(timeout)
      })
    }, { threshold, rootMargin: '0px 0px -4% 0px' })

    observer.observe(container)

    return () => {
      observer.disconnect()
      timeouts.forEach(clearTimeout)
    }
  }, [])
}
