import { useRef } from 'react'
import ScrollLine from '../ScrollLine/ScrollLine'
import { scrollToSection } from '../../utils/animation'
import { useEntryReveal } from '../../hooks/useEntryReveal'
import { publicAsset } from '../../utils/assets'
import './WeeklyLessons.css'

export default function WeeklyLessons() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  useEntryReveal(eyebrowRef)

  return (
    <section className="weekly" id="weekly-lessons">
      <div className="weekly__content">
        <p className="section-eyebrow" ref={eyebrowRef}>For Locals &amp; Long-Term Visitors</p>
        <ScrollLine size="xl" weight={300} delay={0.08}>
          Weekly Lessons,
        </ScrollLine>
        <ScrollLine size="xl" weight={300} delay={0.2}>
          Real Progress
        </ScrollLine>
        <div className="weekly__body">
          <ScrollLine size="md" weight={400} delay={0.12} exitAt={0.9}>
            Whether you're picking up a guitar for the first time or working through a song you've
            always wanted to learn — Aaron meets you where you are and keeps things moving.
          </ScrollLine>
          <ScrollLine size="md" weight={400} delay={0.22} exitAt={0.9}>
            Lessons are available on guitar and ukulele. Beginners are welcome. You'll feel the
            difference week to week.
          </ScrollLine>
        </div>
        <button className="btn btn--dark weekly__btn" onClick={() => scrollToSection('book')}>
          Start Weekly Lessons
        </button>
      </div>

      <div className="weekly__bottom-img">
        <img
          src={publicAsset('/images/aaron-weekly-2.jpg')}
          alt="Aaron playing guitar during a weekly lesson"
          loading="lazy"
        />
      </div>
      <div className="weekly__quote">
        <blockquote>
          "You don't need talent. You need curiosity and a little consistency."
        </blockquote>
        <cite>— Aaron Grzanich</cite>
      </div>
    </section>
  )
}
