import { useState, useEffect } from 'react'
import { useScrollY } from '../../hooks/useScrollY'
import { scrollToSection } from '../../utils/animation'
import './Navbar.css'

export default function Navbar() {
  const [visible, setVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [overDark, setOverDark] = useState(false)

  useEffect(() => {
    const revealTimer = window.setTimeout(() => {
      setVisible(true)
    }, 360)

    return () => window.clearTimeout(revealTimer)
  }, [])

  useScrollY(() => {
    setScrolled(window.scrollY > window.innerHeight * 0.85)
    if (window.scrollY > window.innerHeight * 0.6) setVisible(true)
  })

  useEffect(() => {
    const darkElements = [
      ...Array.from(document.querySelectorAll<Element>('.cinematic-panel')),
      document.querySelector('.beach-title-card'),
      document.querySelector('.beach__lines'),
      document.querySelector('#about'),
      document.querySelector('#book'),
    ].filter((el): el is Element => el !== null)

    if (!darkElements.length) return

    const intersecting = new Set<Element>()

    const darkObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) intersecting.add(entry.target)
        else intersecting.delete(entry.target)
      })
      setOverDark(intersecting.size > 0)
    }, { rootMargin: '0px 0px -95% 0px', threshold: 0 })

    darkElements.forEach(el => darkObserver.observe(el))
    return () => darkObserver.disconnect()
  }, [])

  useEffect(() => {
    const target = document.getElementById('beach-lessons')
    if (!target) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0 }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  const handleNav = (id: string) => {
    setMenuOpen(false)
    scrollToSection(id)
  }

  const classes = [
    'navbar',
    visible ? 'navbar--visible' : '',
    scrolled ? 'navbar--scrolled' : '',
    overDark ? 'nav--over-dark' : '',
  ].filter(Boolean).join(' ')

  return (
    <nav className={classes}>
      <div className="navbar__inner">
        <button className="navbar__brand" onClick={() => handleNav('hero')}>
          Aaron Grzanich
        </button>

        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className="navbar__links">
          <li><button onClick={() => handleNav('beach-lessons')}>Beach Lessons</button></li>
          <li><button onClick={() => handleNav('weekly-lessons')}>Weekly Lessons</button></li>
          <li><button onClick={() => handleNav('about')}>About</button></li>
          <li>
            <button className="navbar__cta" onClick={() => handleNav('book')}>
              Book a Lesson
            </button>
          </li>
        </ul>
      </div>

      {menuOpen && (
        <ul className="navbar__mobile-menu">
          <li><button onClick={() => handleNav('beach-lessons')}>Beach Lessons</button></li>
          <li><button onClick={() => handleNav('weekly-lessons')}>Weekly Lessons</button></li>
          <li><button onClick={() => handleNav('about')}>About</button></li>
          <li><button onClick={() => handleNav('book')}>Book a Lesson</button></li>
        </ul>
      )}
    </nav>
  )
}
