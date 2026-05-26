import { useEffect } from 'react'

export function useEntryReveal(
  containerRef: { current: HTMLElement | null },
  staggerMs = 80
): void {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const elementChildren = Array.from(container.children) as HTMLElement[]
    const targets = elementChildren.length > 0 ? elementChildren : [container]

    if (prefersReducedMotion) {
      targets.forEach(el => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      return
    }

    targets.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(16px)'
      el.style.transition = 'opacity 500ms ease, transform 500ms ease'
    })

    const timeouts: ReturnType<typeof setTimeout>[] = []
    let revealed = false

    const reset = () => {
      timeouts.forEach(clearTimeout)
      timeouts.length = 0
      revealed = false
      targets.forEach(el => {
        el.style.opacity = '0'
        el.style.transform = 'translateY(16px)'
      })
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        if (entry.boundingClientRect.top > 0) reset()
        return
      }

      if (revealed) return
      revealed = true
      targets.forEach((el, i) => {
        const timeout = setTimeout(() => {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }, i * staggerMs)
        timeouts.push(timeout)
      })
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' })

    observer.observe(container)

    return () => {
      observer.disconnect()
      timeouts.forEach(clearTimeout)
    }
    // containerRef is stable (useRef object), staggerMs is a primitive — safe to omit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
