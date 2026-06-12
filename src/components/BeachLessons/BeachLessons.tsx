import { useState, useRef } from 'react'
import ScrollLine from '../ScrollLine/ScrollLine'
import { publicAsset } from '../../utils/assets'
import './BeachLessons.css'

const lines = [
  'Never touched a ukulele? Perfect. Aaron starts where you are and makes it feel natural from the very first chord.',
  "Solo travelers who want something that belongs only to them, couples looking to learn a song together, families who didn't expect this to be the favorite part of the trip — Aaron has taught all of them.",
  "This isn't a tourist show. It's a genuine hour with a local musician who has played on this shore long enough that the lesson, the wind, and the waves all find their own rhythm.",
]

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

export default function BeachLessons() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  return (
    <section className="beach" id="beach-lessons">
      <div className="beach__video-wrap">
        <video
          ref={videoRef}
          className="beach__video"
          src={publicAsset('/videos/aaron-ukelele-vid.mp4')}
          width="1920"
          height="1080"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Aaron teaching ukulele on a Maui beach"
        />
        <div className="beach__video-overlay" />
        <button
          className="beach__mute-btn"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <MutedIcon /> : <UnmutedIcon />}
        </button>
      </div>

      <div className="beach__lines">
        <ScrollLine size="lg" weight={300} delay={0.10} exitAt={0.50} activeColor="#C4AA85" minOpacity={0.15}>
          {lines[0]}
        </ScrollLine>
        <ScrollLine size="lg" weight={300} delay={0.32} exitAt={0.65} activeColor="#F5EFE4" minOpacity={0.15}>
          {lines[1]}
        </ScrollLine>
        <ScrollLine size="lg" weight={400} delay={0.55} exitAt={0.96} activeColor="#F5EFE4" minOpacity={0.15}>
          {lines[2]}
        </ScrollLine>
      </div>
    </section>
  )
}
