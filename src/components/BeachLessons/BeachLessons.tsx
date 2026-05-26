import { useEffect, useRef } from 'react'
import ScrollLine from '../ScrollLine/ScrollLine'
import { publicAsset } from '../../utils/assets'
import './BeachLessons.css'

const lines = [
  'Never touched a ukulele? Perfect. Aaron starts where you are and makes it feel natural from the very first chord.',
  'Learn together. These lessons are designed for anyone — solo travelers, couples, or a whole crew.',
  "This isn't a tourist show. It's a genuine hour with a local musician who loves what he does.",
]

export default function BeachLessons() {
  const videoWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = videoWrapRef.current
    if (!wrap) return

    let triggered = false
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || triggered) return
      triggered = true
      observer.disconnect()
      wrap.classList.add('beach__video-wrap--visible')
    }, { rootMargin: '-10% 0px' })

    observer.observe(wrap)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="beach" id="beach-lessons">
      <div className="beach__video-wrap" ref={videoWrapRef}>
        <video
          className="beach__video"
          src={publicAsset('/videos/aaron-ukelele-vid.mp4')}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Aaron teaching ukulele on a Maui beach"
        />
        <div className="beach__video-overlay" />
      </div>

      <div className="beach__lines">
        {lines.map((text, i) => (
          <ScrollLine
            key={i}
            size="lg"
            weight={300}
            delay={[0.15, 0.28, 0.42][i]}
          >
            {text}
          </ScrollLine>
        ))}
      </div>
    </section>
  )
}
