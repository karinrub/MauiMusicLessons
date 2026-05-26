import { useEffect, useRef } from 'react'

type ScrollCallback = () => void

// Module-level singleton — one listener shared across all subscribers
const subscribers = new Set<ScrollCallback>()
let rafId = 0
let ticking = false

function flushSubscribers() {
  ticking = false
  subscribers.forEach(fn => fn())
}

function handleScroll() {
  if (!ticking) {
    ticking = true
    rafId = requestAnimationFrame(flushSubscribers)
  }
}

function subscribeScroll(fn: ScrollCallback): () => void {
  if (subscribers.size === 0) {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    window.visualViewport?.addEventListener('resize', handleScroll)
  }
  subscribers.add(fn)
  return () => {
    subscribers.delete(fn)
    if (subscribers.size === 0) {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      window.visualViewport?.removeEventListener('resize', handleScroll)
      cancelAnimationFrame(rafId)
      ticking = false
    }
  }
}

// Stable wrapper via ref so callers never need to worry about closure staleness.
// Calls callback once immediately on mount for initial state.
export function useScrollY(callback: ScrollCallback): void {
  const cbRef = useRef(callback)
  cbRef.current = callback

  useEffect(() => {
    const fn = () => cbRef.current()
    fn()
    return subscribeScroll(fn)
  }, [])
}
