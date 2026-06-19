import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import CinematicPanel from './components/CinematicPanel/CinematicPanel'
import CinematicEntry from './components/CinematicEntry/CinematicEntry'
import BeachLessons from './components/BeachLessons/BeachLessons'
import WeeklyLessons from './components/WeeklyLessons/WeeklyLessons'
import AboutAaron from './components/AboutAaron/AboutAaron'
import BookingSection from './components/BookingSection/BookingSection'
import SeoContent from './components/SeoContent/SeoContent'
import Footer from './components/Footer/Footer'
import SectionHandoff from './components/SectionHandoff/SectionHandoff'
import { publicAsset } from './utils/assets'
import { scrollToSection } from './utils/animation'

const PANEL_1_LINES = [
  'No experience.',
  'No pressure.',
  'Just you, the ocean, and a song.',
]

const PANEL_2_LINES = [
  'A quiet hour.',
  'A real Maui memory.',
]

const PANEL_3_LINES = [
  'And if you live here —',
  'the music can stay.',
]

function Grain() {
  return (
    <svg className="grain" aria-hidden="true" focusable="false">
      <filter id="grain-filter" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch">
          <animate attributeName="seed" from="0" to="10" dur="0.5s" repeatCount="indefinite" />
        </feTurbulence>
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  )
}

function App() {
  useEffect(() => {
    let alignmentTimers: number[] = []
    const alignHashTarget = () => {
      const nextHash = window.location.hash.slice(1)
      if (nextHash) scrollToSection(nextHash, 'auto')
    }

    const queueHashAlignment = () => {
      alignmentTimers.forEach(window.clearTimeout)
      alignmentTimers = [0, 120, 420, 900, 1600].map((delay) => (
        window.setTimeout(alignHashTarget, delay)
      ))
    }

    if (window.location.hash) queueHashAlignment()
    window.addEventListener('load', alignHashTarget, { once: true })
    window.addEventListener('hashchange', queueHashAlignment)

    return () => {
      alignmentTimers.forEach(window.clearTimeout)
      window.removeEventListener('load', alignHashTarget)
      window.removeEventListener('hashchange', queueHashAlignment)
    }
  }, [])

  return (
    <>
      <Grain />
      <Navbar />
      <main>
        <Hero />
        <CinematicPanel
          lines={PANEL_1_LINES}
          variant="beachEntry"
          height="226vh"
          className="cinematic-panel--beach-entry"
          image={publicAsset('/images/aaron-pause.jpg')}
          imageWidth={2200}
          imageHeight={1467}
          imageRestOpacity={0.42}
          imageExitOpacity={0.4}
        />
        <SectionHandoff
          variant="visitor"
          image={publicAsset('/images/aaron-teaching-1.jpg')}
        />
        <BeachLessons />
        <SectionHandoff
          variant="audience"
          image={publicAsset('/images/aaron-playing-1.jpg')}
        />
        <CinematicPanel
          lines={PANEL_3_LINES}
          height="154vh"
          className="cinematic-panel--weekly-entry"
          image={publicAsset('/images/aaron-playing-1.jpg')}
          imageWidth={2200}
          imageHeight={1467}
          imageRestOpacity={0.38}
          imageExitOpacity={0.14}
          entryStart={0}
        />
        <WeeklyLessons />
        <SectionHandoff
          variant="chapter"
          image={publicAsset('/images/aaron-portrait-1.jpg')}
        />
        <AboutAaron />
        <CinematicEntry
          lines={PANEL_2_LINES}
          imageSrc={publicAsset('/images/aaron-onlyMe.jpg')}
          imageWidth={2200}
          imageHeight={1467}
        />
        <SectionHandoff
          variant="practical"
          image={publicAsset('/images/aaron-onlyMe.jpg')}
        />
        <SeoContent />
        <SectionHandoff
          variant="conversion"
          image={publicAsset('/images/aaron-bookingForm.jpg')}
        />
        <BookingSection />
      </main>
      <Footer />
    </>
  )
}

export default App
