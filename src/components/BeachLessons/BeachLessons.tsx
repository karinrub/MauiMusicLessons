import { useRef, useState, useEffect } from 'react'
import ScrollLine from '../ScrollLine/ScrollLine'
import { scrollToSection, easeOutCubic } from '../../utils/animation'
import { viewportProgress } from '../../utils/scroll'
import { publicAsset } from '../../utils/assets'
import { useStaggeredReveal } from '../../hooks/useStaggeredReveal'
import { useScrollY } from '../../hooks/useScrollY'
import './BeachLessons.css'

function MutedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}

function UnmutedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

export default function BeachLessons() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  // WCAG 2.2.2: under reduced-motion, start paused so autoplay is suppressed
  const [showPauseControl, setShowPauseControl] = useState(true)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      const video = videoRef.current
      if (video) video.pause()
      setIsPaused(true)
      setShowPauseControl(false)
    }
  }, [])
  const cardRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const tcTitleRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const editorialRef = useRef<HTMLDivElement>(null)

  useStaggeredReveal(cardRef, [eyebrowRef, tcTitleRef, subtextRef])

  // Exit choreography: fade the editorial panel as it scrolls above the viewport.
  // ScrollLines inside already exit their text; this fade removes the photo so the
  // section exits with choreography rather than cutting to the next element.
  useScrollY(() => {
    const editorial = editorialRef.current
    if (!editorial) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      editorial.style.opacity = '1'
      return
    }
    const exitProgress = viewportProgress(editorial, 0.0, -0.5)
    editorial.style.opacity = (1 - easeOutCubic(exitProgress)).toFixed(3)
  })

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    const nextMuted = !video.muted
    video.muted = nextMuted
    video.volume = nextMuted ? video.volume : 1
    setIsMuted(nextMuted)

    if (!nextMuted && video.paused) {
      video.play().catch(() => {
        video.muted = true
        setIsMuted(true)
      })
    }
  }

  const togglePause = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
      setIsPaused(false)
    } else {
      video.pause()
      setIsPaused(true)
    }
  }

  return (
    <section className="beach" id="beach-lessons" aria-labelledby="beach-title-heading">

      {/* Beat 1 — Title card */}
      <div className="beach__title-card" ref={cardRef}>
        <div
          className="beach__tc-texture"
          style={{ backgroundImage: `url(${publicAsset('/images/aaron-teaching-1.jpg')})` }}
          aria-hidden="true"
        />
        <div className="beach__tc-content">
          <p className="section-eyebrow section-eyebrow--light beach__tc-eyebrow" ref={eyebrowRef}>
            For Visitors to Maui
          </p>
          <h2 className="beach__tc-title" id="beach-title-heading" ref={tcTitleRef}>
            Ukulele by the Beach
          </h2>
          <p className="beach__tc-subtext" ref={subtextRef}>
            One hour, one song, one memory the island makes with you.
          </p>
        </div>
        <div className="beach__tc-fade" aria-hidden="true" />
      </div>

      {/* Beat 2 — Video */}
      <div className="beach__video-wrap">
        <video
          ref={videoRef}
          className="beach__video"
          src={publicAsset('/videos/aaron-ukelele-vid.mp4')}
          width="1920"
          height="1080"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          aria-label="Aaron teaching ukulele on a Maui beach"
        />
        <div className="beach__video-overlay" />
        <div className="beach__video-controls">
          {showPauseControl && (
            <button
              type="button"
              className="beach__video-btn"
              onClick={togglePause}
              aria-label={isPaused ? 'Play video' : 'Pause video'}
              aria-pressed={isPaused}
            >
              {isPaused ? <PlayIcon /> : <PauseIcon />}
            </button>
          )}
          <button
            type="button"
            className="beach__video-btn"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            aria-pressed={!isMuted}
          >
            {isMuted ? <MutedIcon /> : <UnmutedIcon />}
          </button>
        </div>
      </div>

      {/* Beat 3 — Editorial panel */}
      <div className="beach__editorial" ref={editorialRef}>
        <div className="beach__editorial-text">
          <div className="beach__heading-block">
            <ScrollLine size="xl" weight={300} delay={0.08} color="#ede8de">
              Where the lesson
            </ScrollLine>
            <ScrollLine size="xl" weight={300} delay={0.2} color="#ede8de">
              finds its own rhythm.
            </ScrollLine>
          </div>
          <hr className="beach__rule" aria-hidden="true" />
          <div className="beach__body">
            <ScrollLine size="md" weight={400} delay={0.12} exitAt={0.9} color="#ede8de">
              Never touched a ukulele? Perfect. Aaron starts where you are and makes it feel natural from the very first chord.
            </ScrollLine>
            <ScrollLine size="md" weight={400} delay={0.22} exitAt={0.9} color="#ede8de">
              Solo travelers who want something that belongs only to them, couples looking to learn a song together, families who didn't expect this to be the favorite part of the trip — Aaron has taught all of them.
            </ScrollLine>
          </div>
          <div className="beach__conversion-row">
            <span className="beach__conversion-item">From $35 · 30 min &nbsp;|&nbsp; $60 · 1 hr</span>
            <span className="beach__conversion-divider" aria-hidden="true" />
            <span className="beach__conversion-item">Mai Poina Beach Park, Kihei</span>
            <span className="beach__conversion-divider" aria-hidden="true" />
            <span className="beach__conversion-item">Most students play a complete song by the end</span>
          </div>
          <div className="beach__cta">
            <button
              className="btn btn--dark beach__btn"
              onClick={() => {
                const bookEl = document.getElementById('book')
                if (bookEl) bookEl.dataset.lessonContext = 'beach'
                scrollToSection('book')
              }}
            >
              Book a beach lesson
            </button>
          </div>
        </div>
        <div className="beach__editorial-photo">
          <div className="beach__editorial-photo-edge" aria-hidden="true" />
          <img
            src={publicAsset('/images/aaron-tourists-1.jpg')}
            alt="Two women learning ukulele together at Mai Poina Beach Park in Kihei, Maui, smiling with palm trees and the ocean behind them"
            width="1080"
            height="1440"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>


    </section>
  )
}
