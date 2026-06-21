import { useRef, useState } from 'react'
import { scrollToSection } from '../../utils/animation'
import { useStaggeredReveal } from '../../hooks/useStaggeredReveal'
import './SeoContent.css'

const faqs = [
  {
    question: 'Do I need experience before taking a music lesson on Maui?',
    answer: 'No. Aaron teaches complete beginners, returning players, families, couples, and weekly students. Lessons start with your current comfort level and focus on playing music right away.',
  },
  {
    question: 'Do I need to bring a ukulele?',
    answer: 'Ukuleles can be borrowed for lessons when needed. Guitar students should mention whether they have an instrument when requesting a lesson time.',
  },
  {
    question: 'How far in advance should I book?',
    answer: 'Aaron books 2–3 days ahead. If you have a specific date in mind, reach out early — spots fill quickly during busy seasons.',
  },
  {
    question: 'What will I actually learn in one lesson?',
    answer: 'In a single session, most students leave able to play a complete song — chords, strumming pattern, and all. Aaron starts where you are and keeps it musical from the first few minutes.',
  },
  {
    question: 'What if I need to cancel or reschedule?',
    answer: 'Aaron is flexible. If your plans change, just reach out as early as you can and he\'ll work with you.',
  },
]

export default function SeoContent() {
  const introRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  useStaggeredReveal(introRef, [headingRef], [0], 0.1)

  return (
    <section className="seo-content" id="maui-music-lessons" aria-labelledby="seo-content-heading">
      <div className="seo-content__inner">
        <div className="seo-content__intro" ref={introRef}>
          <p className="section-eyebrow">Maui Music Lessons</p>
          <h2 id="seo-content-heading" ref={headingRef} className="seo-content__entrance">Guitar and Ukulele Lessons on Maui</h2>
          <p>
            Aaron teaches on Maui — beach lessons in Kihei for visitors passing through, and
            weekly sessions for locals who want to keep playing. Guitar and ukulele, any level,
            outdoors.
          </p>
          <p>
            Private lessons with a working musician who has been teaching on the island for years.
            One student at a time. One hour that belongs to you.
          </p>
          <button className="btn btn--dark seo-content__button" onClick={() => scrollToSection('book')}>
            Book Maui Music Lessons
          </button>
        </div>

        <div className="seo-content__details">
          <div className="seo-content__info-card seo-content__lesson-types">
            <h3>Lesson Types</h3>
            <ul>
              <li>
                <span>Beach lessons</span>
                <p>One-hour ukulele sessions for visitors, couples, families, and beginners.</p>
              </li>
              <li>
                <span>Weekly lessons</span>
                <p>Guitar or ukulele instruction for local and long-term students building steady progress.</p>
              </li>
            </ul>
          </div>

          <div className="seo-content__info-card seo-content__service-area">
            <h3>Where Lessons Happen</h3>
            <p>
              Aaron teaches at Mai Poina Beach Park in Kihei, or at the student's vacation rental
              if they're staying in Kihei, Wailea, or Makena.
            </p>
          </div>
        </div>

        <p className="seo-content__conversion-line">
          Most first-time students leave playing a complete song.
        </p>

        <div className="seo-content__faq">
          <h3>Music Lessons on Maui FAQ</h3>
          <div className="seo-content__faq-grid">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index
              const answerId = `seo-faq-answer-${index}`

              return (
                <article className={`seo-content__faq-item${isOpen ? ' seo-content__faq-item--open' : ''}`} key={faq.question}>
                  <h4>
                    <button
                      type="button"
                      className="seo-content__faq-trigger"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    >
                      <span>{faq.question}</span>
                      <span className="seo-content__faq-icon" aria-hidden="true" />
                    </button>
                  </h4>
                  <div className="seo-content__faq-answer" id={answerId}>
                    <p>{faq.answer}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export { faqs }
