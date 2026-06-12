import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import CinematicPanel from './components/CinematicPanel/CinematicPanel'
import CinematicEntry from './components/CinematicEntry/CinematicEntry'
import BeachLessons from './components/BeachLessons/BeachLessons'
import BeachTitleCard from './components/BeachTitleCard/BeachTitleCard'
import WeeklyLessons from './components/WeeklyLessons/WeeklyLessons'
import AboutAaron from './components/AboutAaron/AboutAaron'
import BookingSection from './components/BookingSection/BookingSection'
import SeoContent from './components/SeoContent/SeoContent'
import Footer from './components/Footer/Footer'
import { publicAsset } from './utils/assets'

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
  'You live on Maui.',
  'The music can stay with you.',
  'Week after week.',
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
  return (
    <>
      <Grain />
      <Navbar />
      <main>
        <Hero />
        <CinematicPanel
          lines={PANEL_1_LINES}
          height="200vh"
          className="cinematic-panel--beach-entry"
          image={publicAsset('/images/aaron-pause.jpg')}
          imageWidth={2200}
          imageHeight={1467}
          imageRestOpacity={0.28}
          imageExitOpacity={0.08}
          entryStart={0.04}
        />
        <BeachTitleCard />
        <BeachLessons />
        <CinematicPanel
          lines={PANEL_3_LINES}
          height="200vh"
          className="cinematic-panel--weekly-entry"
          image={publicAsset('/images/aaron-playing-1.jpg')}
          imageWidth={2200}
          imageHeight={1467}
          imageRestOpacity={0.30}
          imageExitOpacity={0.10}
          entryStart={0.05}
        />
        <WeeklyLessons />
        <AboutAaron />
        <CinematicEntry
          lines={PANEL_2_LINES}
          imageSrc={publicAsset('/images/aaron-onlyMe.jpg')}
          imageWidth={2200}
          imageHeight={1467}
        />
        <SeoContent />
        <BookingSection />
      </main>
      <Footer />
    </>
  )
}

export default App
