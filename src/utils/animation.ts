export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function lineOpacity(
  progress: number,
  enterStart: number,
  enterEnd: number,
  exitStart: number,
  exitEnd: number
): number {
  if (progress < enterStart) return 0
  if (progress < enterEnd) return easeOutCubic((progress - enterStart) / (enterEnd - enterStart))
  if (progress < exitStart) return 1
  if (progress < exitEnd) return 1 - easeOutCubic((progress - exitStart) / (exitEnd - exitStart))
  return 0
}

export function scrollToSection(id: string, behavior: ScrollBehavior = 'smooth'): void {
  const target = document.getElementById(id)
  if (!target) return

  if (id === 'hero') {
    window.scrollTo({ top: 0, behavior })
    return
  }

  // scrollIntoView respects the scroll-margin-top values set in index.css,
  // which correctly accounts for the navbar height across all section anchors.
  target.scrollIntoView({ behavior, block: 'start' })
}
