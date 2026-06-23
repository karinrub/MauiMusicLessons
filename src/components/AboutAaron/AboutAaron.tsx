import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, PointerEvent } from 'react'
import { publicAsset } from '../../utils/assets'
import { useScrollY } from '../../hooks/useScrollY'
import { easeOutCubic } from '../../utils/animation'
import { viewportProgress } from '../../utils/scroll'
import './AboutAaron.css'

const chapters = [
  {
    title: 'Early Years',
    label: 'Early',
    image: publicAsset('/images/aaron-portrait-1.jpg'),
    text: 'Aaron has been teaching guitar and ukulele on Maui for years — working with complete beginners and returning players to help them find their footing. Aaron began his journey in music education over two decades ago. While studying at Illinois State University, he explored guitar, piano, and music theory, discovering a love for collaboration and live performance.',
  },
  {
    title: 'Exploration & Growth',
    label: 'Exploration',
    image: publicAsset('/images/aaron-playing-1.jpg'),
    text: 'His passion for learning led him across the country - from Asheville, North Carolina, where he studied bluegrass on mandolin and banjo, to California, where he expanded into sound design, electronic music, and Afro-Latin percussion.',
  },
  {
    title: 'Focus & Teaching',
    label: 'Focus',
    image: publicAsset('/images/aaron-playing-2.jpg'),
    text: 'Years later in Colorado, working within a nonprofit music community, Aaron discovered the ukulele as his primary instrument. Its accessibility and expressive range became central to his teaching philosophy.',
  },
  {
    title: 'Maui',
    label: 'Maui',
    image: publicAsset('/images/aaron-onlyMe.jpg'),
    text: 'In 2023, Aaron moved to Maui to deepen his study of traditional Hawaiian styles and to teach in a setting that encourages presence, patience, and joy. His goal is simple: help students of any age feel comfortable, confident, and connected through music.',
  },
]

const chapterCount = chapters.length
const chapterMaxIndex = chapterCount - 1

function clampProgress(value: number) {
  return Math.min(1, Math.max(0, value))
}

function chapterFromProgress(progress: number) {
  return Math.min(chapterMaxIndex, Math.floor(clampProgress(progress) * chapterCount))
}

function progressForChapter(chapter: number) {
  return chapter / chapterMaxIndex
}

export default function AboutAaron() {
  const [activeChapter, setActiveChapter] = useState(0)
  const [backgroundChapter, setBackgroundChapter] = useState(0)
  const [displayedChapter, setDisplayedChapter] = useState(0)
  const [dragProgress, setDragProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isTextVisible, setIsTextVisible] = useState(true)
  const [isHinting, setIsHinting] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const foregroundRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])
  const activeChapterRef = useRef(0)
  const requestedBackgroundRef = useRef(0)
  const dragProgressRef = useRef(0)
  const hasInteractedRef = useRef(false)
  const textHasMountedRef = useRef(false)
  const hintHasRunRef = useRef(false)
  const textSwapRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const textFadeInRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hintDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hintEndRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const requestBackgroundChapter = (chapter: number) => {
    requestedBackgroundRef.current = chapter
    const img = imageRefs.current[chapter]

    if (!img) return

    if (img.complete && img.naturalWidth > 0) {
      setBackgroundChapter(chapter)
      return
    }

    img.loading = 'eager'
    img.fetchPriority = 'high'

    img.decode()
      .then(() => {
        if (requestedBackgroundRef.current === chapter) setBackgroundChapter(chapter)
      })
      .catch(() => {
        if (
          requestedBackgroundRef.current === chapter &&
          img.complete &&
          img.naturalWidth > 0
        ) {
          setBackgroundChapter(chapter)
        }
      })
  }

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Releases About's text/rail attention as the section exits, ahead of CinematicEntry's
  // first line establishing itself — see TRANSITION_EXECUTION_PLAN.md Task 2.1.
  useScrollY(() => {
    const foreground = foregroundRef.current
    if (!foreground) return

    if (reducedMotion) {
      foreground.style.opacity = '1'
      return
    }

    const section = sectionRef.current
    if (!section) return

    const exitProgress = viewportProgress(section, -0.15, -0.65)
    foreground.style.opacity = (1 - easeOutCubic(exitProgress)).toFixed(3)
  })

  useEffect(() => {
    activeChapterRef.current = activeChapter

    if (textSwapRef.current) clearTimeout(textSwapRef.current)
    if (textFadeInRef.current) clearTimeout(textFadeInRef.current)

    if (!textHasMountedRef.current) {
      textHasMountedRef.current = true
      setDisplayedChapter(activeChapter)
      setIsTextVisible(true)
      return
    }

    if (reducedMotion) {
      setDisplayedChapter(activeChapter)
      setIsTextVisible(true)
      return
    }

    setIsTextVisible(false)
    textSwapRef.current = setTimeout(() => {
      setDisplayedChapter(activeChapter)
      textFadeInRef.current = setTimeout(() => {
        setIsTextVisible(true)
      }, 20)
    }, 200)

    return () => {
      if (textSwapRef.current) clearTimeout(textSwapRef.current)
      if (textFadeInRef.current) clearTimeout(textFadeInRef.current)
    }
  }, [activeChapter, reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    const section = sectionRef.current
    if (!section) return

    const clearPendingHint = () => {
      if (hintDelayRef.current) {
        clearTimeout(hintDelayRef.current)
        hintDelayRef.current = null
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (hasInteractedRef.current || hintHasRunRef.current || hintDelayRef.current) return
          hintDelayRef.current = setTimeout(() => {
            hintDelayRef.current = null
            if (hasInteractedRef.current) return
            hintHasRunRef.current = true
            setIsHinting(true)
            hintEndRef.current = setTimeout(() => setIsHinting(false), 1600)
          }, 700)
        } else {
          clearPendingHint()
          if (!hasInteractedRef.current) hintHasRunRef.current = false
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      clearPendingHint()
      if (hintEndRef.current) clearTimeout(hintEndRef.current)
    }
  }, [reducedMotion])

  // Preload lazy chapter images when About Aaron approaches the viewport so
  // images are ready before first chapter navigation rather than only at
  // activation time. This is a hypothesis: if images load before the user
  // reaches About, requestBackgroundChapter will find img.complete=true and
  // activate instantly with no decode wait.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        for (let i = 1; i < chapters.length; i++) {
          const img = imageRefs.current[i]
          if (!img || (img.complete && img.naturalWidth > 0)) continue
          img.loading = 'eager'
          img.fetchPriority = 'high'
          img.decode().catch(() => {})
        }
      },
      { rootMargin: '300px 0px' }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const updateProgressFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current
    if (!rail) return

    const bounds = rail.getBoundingClientRect()
    const nextProgress = clampProgress((event.clientX - bounds.left) / bounds.width)
    const nextChapter = chapterFromProgress(nextProgress)

    dragProgressRef.current = nextProgress
    setDragProgress(nextProgress)

    if (nextChapter !== activeChapterRef.current) {
      activeChapterRef.current = nextChapter
      setActiveChapter(nextChapter)
      requestBackgroundChapter(nextChapter)
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    hasInteractedRef.current = true
    if (hintDelayRef.current) clearTimeout(hintDelayRef.current)
    if (hintEndRef.current) clearTimeout(hintEndRef.current)
    setIsHinting(false)
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
    updateProgressFromPointer(event)
  }

  const selectChapter = (chapter: number) => {
    const nextChapter = Math.min(chapterMaxIndex, Math.max(0, chapter))
    const nextProgress = progressForChapter(nextChapter)

    hasInteractedRef.current = true
    if (hintDelayRef.current) clearTimeout(hintDelayRef.current)
    if (hintEndRef.current) clearTimeout(hintEndRef.current)
    setIsHinting(false)
    activeChapterRef.current = nextChapter
    dragProgressRef.current = nextProgress
    setActiveChapter(nextChapter)
    requestBackgroundChapter(nextChapter)
    setDragProgress(nextProgress)
  }

  const goToPreviousChapter = () => selectChapter(activeChapterRef.current - 1)
  const goToNextChapter = () => selectChapter(activeChapterRef.current + 1)

  const handleRailKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const incrementKeys = ['ArrowRight', 'ArrowUp', 'PageUp']
    const decrementKeys = ['ArrowLeft', 'ArrowDown', 'PageDown']

    if (incrementKeys.includes(event.key)) {
      event.preventDefault()
      selectChapter(activeChapterRef.current + 1)
    } else if (decrementKeys.includes(event.key)) {
      event.preventDefault()
      selectChapter(activeChapterRef.current - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      selectChapter(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      selectChapter(chapterMaxIndex)
    }
  }

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return

    const snappedChapter = Math.round(dragProgressRef.current * chapterMaxIndex)
    const snappedProgress = progressForChapter(snappedChapter)

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    activeChapterRef.current = snappedChapter
    dragProgressRef.current = snappedProgress
    setIsDragging(false)
    setActiveChapter(snappedChapter)
    requestBackgroundChapter(snappedChapter)
    setDragProgress(snappedProgress)
  }

  return (
    <section ref={sectionRef} className="about" id="about" aria-label="About Aaron">
      <div className="about__backgrounds" aria-hidden="true">
        {chapters.map((chapter, index) => (
          <img
            key={chapter.title}
            ref={(el) => { imageRefs.current[index] = el }}
            className={`about__background${index === backgroundChapter ? ' about__background--active' : ''}`}
            src={chapter.image}
            alt=""
            width="2200"
            height="1467"
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            draggable="false"
            onLoad={() => {
              if (requestedBackgroundRef.current === index) setBackgroundChapter(index)
            }}
          />
        ))}
      </div>

      <div className="about__overlay" aria-hidden="true" />

      <div ref={foregroundRef} className="about__foreground">
        <div className={`about__content${isTextVisible ? ' about__content--visible' : ''}`}>
          <p className="section-eyebrow about__eyebrow">About Aaron</p>
          <p className="about__chapter-count">Chapter {displayedChapter + 1} of {chapterCount}</p>
          <h2 className="about__title">{chapters[displayedChapter].title}</h2>
          <p className="about__text">{chapters[displayedChapter].text}</p>
        </div>

        <button
          type="button"
          className="about__chapter-button about__chapter-button--prev"
          onClick={goToPreviousChapter}
          disabled={activeChapter === 0}
          aria-label="Previous chapter"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M15 6 9 12l6 6" />
          </svg>
        </button>

        <div
          ref={railRef}
          className={`about__rail${isDragging ? ' about__rail--dragging' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerMove={(event) => {
            if (isDragging) updateProgressFromPointer(event)
          }}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onKeyDown={handleRailKeyDown}
          role="slider"
          tabIndex={0}
          aria-label="About Aaron chapter"
          aria-valuemin={0}
          aria-valuemax={chapterMaxIndex}
          aria-valuenow={activeChapter}
          aria-valuetext={chapters[activeChapter].title}
          style={{ '--about-drag-progress': dragProgress } as CSSProperties}
        >
          <div className="about__rail-line" />
          <div className="about__markers" aria-hidden="true">
            {chapters.map((chapter, index) => (
              <div
                className={`about__marker${index === activeChapter ? ' about__marker--active' : ''}`}
                key={chapter.label}
              >
                <span className="about__marker-tick" />
                <span className="about__marker-label">{chapter.label}</span>
              </div>
            ))}
          </div>
          <div className={`about__scrubber${isHinting ? ' about__scrubber--hint' : ''}`} aria-hidden="true">
            <span className="about__scrubber-dot" />
          </div>
        </div>

        <button
          type="button"
          className={`about__chapter-button about__chapter-button--next${isHinting ? ' about__chapter-button--hinting' : ''}`}
          onClick={goToNextChapter}
          disabled={activeChapter === chapterMaxIndex}
          aria-label="Next chapter"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  )
}
