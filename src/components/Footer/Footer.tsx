import { useRef } from 'react'
import { scrollToSection } from '../../utils/animation'
import { useEntryReveal } from '../../hooks/useEntryReveal'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  const innerRef = useRef<HTMLDivElement>(null)
  useEntryReveal(innerRef)

  return (
    <footer className="footer">
      <div className="footer__inner" ref={innerRef}>
        <div className="footer__brand">
          <p className="footer__name">Aaron Grzanich</p>
          <p className="footer__tagline">Guitar &amp; Ukulele Lessons · Kihei, Maui, Hawaii</p>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          <button onClick={() => scrollToSection('beach-lessons')}>
            Beach Lessons
          </button>
          <button onClick={() => scrollToSection('weekly-lessons')}>
            Weekly Lessons
          </button>
          <button onClick={() => scrollToSection('about')}>
            About
          </button>
          <button onClick={() => scrollToSection('book')}>
            Book a Lesson
          </button>
        </nav>

        <div className="footer__contact">
          <a href="mailto:aaron@mauimusiclessons.com" className="footer__link">
            aaron@mauimusiclessons.com
          </a>
          <span className="footer__divider">·</span>
          <span>Kihei, Maui</span>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {year} Aaron Grzanich · Maui Music Lessons · All rights reserved.</p>
      </div>
    </footer>
  )
}
