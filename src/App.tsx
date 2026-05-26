import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import CinematicPanel from './components/CinematicPanel/CinematicPanel'
import CinematicEntry from './components/CinematicEntry/CinematicEntry'
import BeachLessons from './components/BeachLessons/BeachLessons'
import BeachTitleCard from './components/BeachTitleCard/BeachTitleCard'
import WeeklyLessons from './components/WeeklyLessons/WeeklyLessons'
import AboutAaron from './components/AboutAaron/AboutAaron'
import BookingSection from './components/BookingSection/BookingSection'
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
  'Every week,',
  'a little further',
  'into the music.',
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
          height="210vh"
          image={publicAsset('/images/aaron-tourists-2.jpg')}
        />
        <BeachTitleCard />
        <BeachLessons />
        <CinematicPanel
          lines={PANEL_3_LINES}
          height="250vh"
          image={publicAsset('/images/aaron-playing-1.jpg')}
        />
        <WeeklyLessons />
        <AboutAaron />
        <CinematicEntry
          lines={PANEL_2_LINES}
          imageSrc={publicAsset('/images/aaron-onlyMe.jpg')}
        />
        <BookingSection />
      </main>
      <Footer />
    </>
  )
}

export default App
