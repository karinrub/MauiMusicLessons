import { useEffect, useRef, useState } from 'react'
import { useScrollY } from '../../hooks/useScrollY'
import { easeOutCubic } from '../../utils/animation'
import { stickyProgress } from '../../utils/scroll'
import { publicAsset } from '../../utils/assets'
import './AboutAaron.css'

const images = [
  { src: publicAsset('/images/aaron-portrait-1.jpg'), alt: 'Aaron Grzanich, music teacher on Maui' },
  { src: publicAsset('/images/aaron-playing-1.jpg'), alt: 'Aaron playing guitar' },
  { src: publicAsset('/images/aaron-pause.jpg'), alt: 'Aaron in a moment between songs' },
]

const phrases = ['A musician', 'who loves', 'to teach.']

export default function AboutAaron() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [activePhrase, setActivePhrase] = useState(0)
  const [prevPhrase, setPrevPhrase] = useState<number | null>(null)

  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const activePhraseRef = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prevClearRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // IO-driven phrase cycling with interval
  useEffect(() => {
    if (reducedMotion) {
      subRef.current?.classList.add('about__sub--visible')
      return
    }
    const section = sectionRef.current
    if (!section) return

    const startCycling = () => {
      if (intervalRef.current) return
      subRef.current?.classList.add('about__sub--visible')
      intervalRef.current = setInterval(() => {
        const prev = activePhraseRef.current
        const next = (prev + 1) % phrases.length
        activePhraseRef.current = next
        setPrevPhrase(prev)
        setActivePhrase(next)
        if (prevClearRef.current) clearTimeout(prevClearRef.current)
        prevClearRef.current = setTimeout(() => setPrevPhrase(null), 450)
      }, 3500)
    }

    const stopCycling = () => {
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
      if (prevClearRef.current) { clearTimeout(prevClearRef.current); prevClearRef.current = null }
      activePhraseRef.current = 0
      setActivePhrase(0)
      setPrevPhrase(null)
      subRef.current?.classList.remove('about__sub--visible')
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) startCycling()
      else stopCycling()
    }, { threshold: 0 })

    observer.observe(section)

    return () => {
      observer.disconnect()
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (prevClearRef.current) clearTimeout(prevClearRef.current)
    }
  }, [reducedMotion])

  // Full-panel fade-out after scroll progress 0.9
  useScrollY(() => {
    if (reducedMotion) return
    const section = sectionRef.current
    const sticky = stickyRef.current
    if (!section || !sticky) return
    const progress = stickyProgress(section)
    const panelOp = progress < 0.9
      ? 1
      : Math.max(0, 1 - easeOutCubic((progress - 0.9) / 0.08))
    sticky.style.opacity = panelOp.toFixed(4)
  })

  return (
    <>
      <section className={`about${reducedMotion ? ' about--reduced' : ''}`} id="about" ref={sectionRef}>
        <div className="about__sticky" ref={stickyRef}>
          <div className="about__left">
            <div className="about__phrase-wrap">
              {phrases.map((phrase, i) => (
                <span
                  key={i}
                  className={`about__phrase${
                    i === activePhrase ? ' about__phrase--active' :
                    i === prevPhrase ? ' about__phrase--exiting' :
                    ''
                  }`}
                >
                  {phrase}
                </span>
              ))}
            </div>
            <p className="about__sub" ref={subRef}>
              He's been playing on Maui for years. Teaching found him naturally.
            </p>
          </div>
          <div className="about__right">
            {images.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className={`about__img${i === activePhrase ? ' about__img--active' : i === prevPhrase ? ' about__img--exiting' : ''}`}
                style={{
                  zIndex: i === activePhrase ? 3 : i === prevPhrase ? 2 : 1,
                }}
              />
            ))}
          </div>
        </div>
      </section>
      <div className="about__epilogue">
        <img
          src={publicAsset('/images/aaron-teaching-1.jpg')}
          alt="Aaron teaching a student on Maui"
          loading="lazy"
          className="about__epilogue-img"
        />
        <p className="about__epilogue-text">
          He works with beginners who've never held an instrument, with kids, with couples on
          vacation, and with regulars who come back every week. No sheet music required to start.
        </p>
      </div>
    </>
  )
}
