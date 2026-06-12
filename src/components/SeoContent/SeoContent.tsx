import { scrollToSection } from '../../utils/animation'
import './SeoContent.css'

const serviceAreas = [
  'Kihei',
  'Wailea',
  'Makena',
  'Lahaina',
  'Kaanapali',
  'Wailuku',
  'Paia',
  'Upcountry Maui',
]

const lessonTypes = [
  'Private guitar lessons on Maui',
  'Ukulele lessons for beginners',
  'Beach music lessons in Kihei',
  'Weekly guitar and ukulele lessons for residents',
  'Family and couples ukulele lessons',
  'Visitor-friendly Maui music experiences',
]

const faqs = [
  {
    question: 'Do I need experience before taking a music lesson on Maui?',
    answer: 'No. Aaron teaches complete beginners, returning players, families, couples, and weekly students. Lessons start with your current comfort level and focus on playing music right away.',
  },
  {
    question: 'Are lessons available for visitors staying in Kihei or Wailea?',
    answer: 'Yes. Beach ukulele and guitar lessons are designed for Maui visitors who want a relaxed local music experience in South Maui, including Kihei, Wailea, and nearby areas.',
  },
  {
    question: 'Can locals take weekly guitar or ukulele lessons?',
    answer: 'Yes. Weekly lessons are available for Maui residents and long-term visitors who want consistent progress on guitar or ukulele.',
  },
  {
    question: 'Do I need to bring a ukulele?',
    answer: 'Ukuleles can be borrowed for lessons when needed. Guitar students should mention whether they have an instrument when requesting a lesson time.',
  },
]

export default function SeoContent() {
  return (
    <section className="seo-content" id="maui-music-lessons" aria-labelledby="seo-content-heading">
      <div className="seo-content__inner">
        <div className="seo-content__intro">
          <p className="section-eyebrow">Maui Music Lessons</p>
          <h2 id="seo-content-heading">Guitar and Ukulele Lessons on Maui</h2>
          <p>
            Aaron Grzanich teaches private music lessons on Maui for visitors, locals, families,
            couples, and beginners. Lessons are available for guitar and ukulele, with beach
            sessions in Kihei and weekly instruction for students who want steady progress.
          </p>
          <p>
            If you are searching for Maui ukulele lessons, guitar lessons in Kihei, beginner music
            lessons near Wailea, or a memorable musical activity while visiting Hawaii, these
            lessons are built around a simple goal: help you feel comfortable, musical, and present.
          </p>
          <button className="btn btn--dark seo-content__button" onClick={() => scrollToSection('book')}>
            Book Maui Music Lessons
          </button>
        </div>

        <div className="seo-content__lists" aria-label="Lesson options and service areas">
          <div>
            <h3>Lesson Options</h3>
            <ul>
              {lessonTypes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Serving Maui</h3>
            <ul>
              {serviceAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="seo-content__faq">
          <h3>Music Lessons on Maui FAQ</h3>
          <div className="seo-content__faq-grid">
            {faqs.map((faq) => (
              <article className="seo-content__faq-item" key={faq.question}>
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { faqs, lessonTypes, serviceAreas }
