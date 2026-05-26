export function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value))
}

export function viewportHeight(): number {
  return window.visualViewport?.height ?? window.innerHeight
}

export function stickyProgress(element: HTMLElement): number {
  const scrollable = element.offsetHeight - viewportHeight()
  if (scrollable <= 0) return 0
  return clamp01(-element.getBoundingClientRect().top / scrollable)
}

export function viewportProgress(
  element: HTMLElement,
  start = 0.88,
  end = 0.35
): number {
  const rect = element.getBoundingClientRect()
  const vh = viewportHeight()
  const startY = vh * start
  const endY = vh * end
  return clamp01((startY - rect.top) / Math.max(1, startY - endY))
}
