import { useRef } from 'react'
import ScrollLine from '../ScrollLine/ScrollLine'
import { scrollToSection, easeOutCubic } from '../../utils/animation'
import { viewportProgress } from '../../utils/scroll'
import { publicAsset } from '../../utils/assets'
import { useStaggeredReveal } from '../../hooks/useStaggeredReveal'
import { useScrollY } from '../../hooks/useScrollY'
import './WeeklyLessons.css'

export default function WeeklyLessons() {
  const cardRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const tcTitleRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const editorialRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const quoteTextRef = useRef<HTMLQuoteElement>(null)
  const quoteCiteRef = useRef<HTMLElement>(null)

  useStaggeredReveal(cardRef, [eyebrowRef, tcTitleRef, subtextRef])
  useStaggeredReveal(sceneRef, [quoteTextRef, quoteCiteRef], [0, 120], 0.12)

  // Exit choreography: fade editorial and scene panels as they scroll above the viewport.
  // One subscription handles both panels so they exit with the same easing curve.
  useScrollY(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const editorial = editorialRef.current
    const scene = sceneRef.current

    if (editorial) {
      if (reduced) {
        editorial.style.opacity = '1'
      } else {
        const exitProgress = viewportProgress(editorial, 0.0, -0.5)
        editorial.style.opacity = (1 - easeOutCubic(exitProgress)).toFixed(3)
      }
    }
    if (scene) {
      if (reduced) {
        scene.style.opacity = '1'
      } else {
        const exitProgress = viewportProgress(scene, 0.0, -0.5)
        scene.style.opacity = (1 - easeOutCubic(exitProgress)).toFixed(3)
      }
    }
  })

  return (
    <section className="weekly" id="weekly-lessons" aria-labelledby="weekly-title-heading">

      {/* Beat 1 — Title card */}
      <div className="weekly__title-card" ref={cardRef}>
        <div
          className="weekly__tc-texture"
          style={{ backgroundImage: `url(${publicAsset('/images/aaron-teaching-1.jpg')})` }}
          aria-hidden="true"
        />
        <div className="weekly__tc-content">
          <p className="section-eyebrow section-eyebrow--light weekly__tc-eyebrow" ref={eyebrowRef}>
            For Locals &amp; Long-Term Residents
          </p>
          <h2 className="weekly__tc-title" id="weekly-title-heading" ref={tcTitleRef}>
            Weekly Lessons
          </h2>
          <p className="weekly__tc-subtext" ref={subtextRef}>
            Guitar and ukulele, week after week, with a local musician in Kihei.
          </p>
        </div>
        <div className="weekly__tc-fade" aria-hidden="true" />
      </div>

      {/* Beat 2 — Editorial two-column panel */}
      <div className="weekly__editorial" ref={editorialRef}>
        <div className="weekly__editorial-text">
          <div className="weekly__heading-block">
            <ScrollLine size="xl" weight={300} delay={0.08} color="#ede8de">
              Week after week,
            </ScrollLine>
            <ScrollLine size="xl" weight={300} delay={0.2} color="#ede8de">
              further in.
            </ScrollLine>
          </div>
          <hr className="weekly__rule" aria-hidden="true" />
          <div className="weekly__body">
            <ScrollLine size="md" weight={400} delay={0.12} exitAt={0.9} color="#ede8de">
              Aaron teaches guitar and ukulele in weekly sessions — one hour, one person, outdoors
              on Maui. Guitar or ukulele, any starting point. Each week picks up where the last one
              ended, and the pace is set by the student, not a syllabus.
            </ScrollLine>
            <ScrollLine size="md" weight={400} delay={0.22} exitAt={0.9} color="#ede8de">
              People who keep coming back describe a shift that's hard to predict at the start —
              the progress becomes noticeable, the hour becomes something they protect. At some
              point the lesson stops feeling like practice and becomes the part of the week they
              most look forward to: the one where showing up and staying curious is the whole job.
            </ScrollLine>
          </div>
          <div className="weekly__conversion-row">
            <span className="weekly__conversion-item">$60 · 1 hr &nbsp;|&nbsp; weekly cadence</span>
            <span className="weekly__conversion-divider" aria-hidden="true" />
            <span className="weekly__conversion-item">Kihei, Maui</span>
            <span className="weekly__conversion-divider" aria-hidden="true" />
            <span className="weekly__conversion-item">Student-paced — no syllabus</span>
          </div>
          <button
            className="btn btn--dark weekly__btn"
            onClick={() => {
              const bookEl = document.getElementById('book')
              if (bookEl) bookEl.dataset.lessonContext = 'weekly'
              scrollToSection('book')
            }}
          >
            Let's find a time
          </button>
        </div>
        <div className="weekly__editorial-photo">
          <div className="weekly__editorial-photo-edge" aria-hidden="true" />
          <img
            src={publicAsset('/images/aaron-teaching-1.jpg')}
            alt="Aaron sitting on a green beach bench, smiling and holding a mint green ukulele, with a coastal tree canopy above him and the ocean visible behind"
            width="1467"
            height="2200"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      {/* Beat 3 — Full-width photograph with overlaid quote */}
      <div className="weekly__scene" ref={sceneRef}>
          <img
            src={publicAsset('/images/aaron-weekly-1.jpg')}
            alt="Aaron and a young student sitting on a park bench, both playing ukulele and facing each other"
            width="720"
            height="960"
            loading="lazy"
            decoding="async"
            className="weekly__scene-img"
          />
        <div className="weekly__scene-quote">
          <blockquote className="weekly__quote-text" ref={quoteTextRef}>
            "You don't need talent. You need curiosity and a little consistency."
          </blockquote>
          <cite className="weekly__quote-cite" ref={quoteCiteRef}>— Aaron Grzanich</cite>
        </div>
        <div className="weekly__scene-fade" aria-hidden="true" />
      </div>

    </section>
  )
}
