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

export function scrollToSection(id: string, behavior: ScrollBehavior = 'auto'): void {
  const target = document.getElementById(id)
  if (!target) return

  if (id === 'hero') {
    window.scrollTo({ top: 0, behavior })
    return
  }

  // scrollIntoView does not work reliably in this layout (sticky/transform
  // ancestors prevent the browser from computing the scroll target correctly).
  // Use the live visual position so transformed or overlapped sections do not
  // leave the browser aiming at a stale layout offset.
  const scrollMargin = parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0
  const targetTop = target.getBoundingClientRect().top + window.scrollY - scrollMargin
  window.scrollTo({ top: Math.max(0, targetTop), behavior })
}
