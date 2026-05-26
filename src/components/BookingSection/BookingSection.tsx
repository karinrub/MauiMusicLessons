import { useState, useEffect, useRef } from 'react'
import { publicAsset } from '../../utils/assets'
import './BookingSection.css'

type Step = 'who' | 'type' | 'duration' | 'date' | 'contact' | 'confirm' | 'sent'
type GroupSize = 'solo' | 'duo' | 'group_small' | 'group_large'
type Instrument = 'guitar' | 'ukulele'
type Duration = '30' | '60'

const PRICING = {
  solo_30: 35,
  solo_60: 60,
  group_2: 60,
  group_3_5: 80,
  group_6_8: 120,
}

const STEP_ORDER: Step[] = ['who', 'type', 'duration', 'date', 'contact', 'confirm', 'sent']

interface BookingData {
  groupSize: GroupSize | null
  instrument: Instrument | null
  duration: Duration | null
  preferredDate: string
  name: string
  email: string
  phone: string
}

interface ContactErrors {
  groupSize?: string
  instrument?: string
  duration?: string
  preferredDate?: string
  name?: string
  email?: string
}

function groupLabel(g: GroupSize): string {
  const labels: Record<GroupSize, string> = {
    solo: 'Just me',
    duo: 'Two of us',
    group_small: 'Small group (3–5)',
    group_large: 'Larger group (6–8)',
  }
  return labels[g]
}

function groupDescription(g: GroupSize): string {
  const desc: Record<GroupSize, string> = {
    solo: 'Solo',
    duo: 'For two',
    group_small: 'Group of 3–5',
    group_large: 'Group of 6–8',
  }
  return desc[g]
}

function groupPrice(g: GroupSize): number {
  const prices: Record<GroupSize, number> = {
    solo: PRICING.solo_60,
    duo: PRICING.group_2,
    group_small: PRICING.group_3_5,
    group_large: PRICING.group_6_8,
  }
  return prices[g]
}

function lessonSummary(data: BookingData): string {
  const parts = []
  if (data.instrument) parts.push(data.instrument === 'guitar' ? 'Guitar' : 'Ukulele')
  if (data.duration) parts.push(data.duration === '30' ? '30 min' : '1 hour')
  if (data.groupSize) parts.push(groupDescription(data.groupSize))
  return parts.join(' · ')
}

function buildMailto(data: BookingData): string {
  const subject = encodeURIComponent(`Lesson request from ${data.name.trim()}`)
  const body = encodeURIComponent([
    `Name: ${data.name.trim()}`,
    `Email: ${data.email.trim()}`,
    `Phone: ${data.phone.trim() || 'Not provided'}`,
    `Group: ${data.groupSize ? groupLabel(data.groupSize) : 'Not selected'}`,
    `Instrument: ${data.instrument === 'guitar' ? 'Guitar' : data.instrument === 'ukulele' ? 'Ukulele' : 'Not selected'}`,
    `Duration: ${data.duration === '30' ? '30 minutes' : data.duration === '60' ? '1 hour' : 'Not selected'}`,
    `Preferred date/time: ${data.preferredDate.trim()}`,
  ].join('\n'))

  return `mailto:aaron@mauimusiclessons.com?subject=${subject}&body=${body}`
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

function BookingConversation() {
  const [stepHistory, setStepHistory] = useState<Step[]>(['who'])
  const step = stepHistory[stepHistory.length - 1]
  const canGoBack = stepHistory.length > 1 && step !== 'sent' && step !== 'confirm'

  const [data, setData] = useState<BookingData>({
    groupSize: null,
    instrument: null,
    duration: null,
    preferredDate: '',
    name: '',
    email: '',
    phone: '',
  })
  const [dateInput, setDateInput] = useState('')
  const [contactErrors, setContactErrors] = useState<ContactErrors>({})
  const reduced = useReducedMotion()

  const [exitHTML, setExitHTML] = useState<string | null>(null)
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stepBodyRef = useRef<HTMLDivElement>(null)

  // confirm → sent after brief pause
  useEffect(() => {
    if (step === 'confirm') {
      const t = setTimeout(() => setStepHistory((prev) => [...prev, 'sent']), 200)
      return () => clearTimeout(t)
    }
  }, [step])

  function advance(next: Step) {
    if (!reduced && stepBodyRef.current) {
      setExitHTML(stepBodyRef.current.innerHTML)
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current)
      exitTimerRef.current = setTimeout(() => setExitHTML(null), 400)
    }
    setStepHistory((prev) => [...prev, next])
  }

  // Clears data for targetStep and all steps that follow it
  function clearDataFrom(targetStep: Step) {
    setData((prev) => {
      const d = { ...prev }
      if (targetStep === 'who') {
        d.groupSize = null; d.instrument = null; d.duration = null
        d.preferredDate = ''; d.name = ''; d.email = ''; d.phone = ''
      } else if (targetStep === 'type') {
        // duration intentionally preserved — auto-set by 'who' for non-solo
        d.instrument = null
        d.preferredDate = ''; d.name = ''; d.email = ''; d.phone = ''
      } else if (targetStep === 'duration') {
        d.duration = null
        d.preferredDate = ''; d.name = ''; d.email = ''; d.phone = ''
      } else if (targetStep === 'date') {
        d.preferredDate = ''; d.name = ''; d.email = ''; d.phone = ''
      } else if (targetStep === 'contact') {
        d.name = ''; d.email = ''; d.phone = ''
      }
      return d
    })
  }

  function goBack() {
    if (stepHistory.length <= 1) return
    const targetStep = stepHistory[stepHistory.length - 2]
    setStepHistory((prev) => prev.slice(0, -1))
    clearDataFrom(targetStep)
    setContactErrors({})
    if (STEP_ORDER.indexOf(targetStep) <= STEP_ORDER.indexOf('date')) {
      setDateInput('')
    }
  }

  function selectGroup(g: GroupSize) {
    setData((prev) => ({ ...prev, groupSize: g, duration: g !== 'solo' ? '60' : prev.duration }))
    setContactErrors((prev) => {
      const next = { ...prev }
      delete next.groupSize
      delete next.duration
      return next
    })
    if (!reduced) advance('type')
  }

  function selectInstrument(i: Instrument) {
    const isSolo = data.groupSize === 'solo'
    setData((prev) => ({ ...prev, instrument: i }))
    setContactErrors((prev) => {
      const next = { ...prev }
      delete next.instrument
      return next
    })
    if (!reduced) advance(isSolo ? 'duration' : 'date')
  }

  function selectDuration(d: Duration) {
    setData((prev) => ({ ...prev, duration: d }))
    setContactErrors((prev) => {
      const next = { ...prev }
      delete next.duration
      return next
    })
    if (!reduced) advance('date')
  }

  function submitDate() {
    if (!dateInput.trim()) return
    setData((prev) => ({ ...prev, preferredDate: dateInput.trim() }))
    setContactErrors((prev) => {
      const next = { ...prev }
      delete next.preferredDate
      return next
    })
    if (!reduced) advance('contact')
  }

  function submitContact() {
    const errs: ContactErrors = {}
    if (!data.groupSize) errs.groupSize = 'Group size is required'
    if (!data.instrument) errs.instrument = 'Instrument is required'
    if (!data.duration) errs.duration = 'Duration is required'
    if (!data.preferredDate.trim()) errs.preferredDate = 'Preferred date is required'
    if (!data.name.trim()) errs.name = 'Name is required'
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) errs.email = 'Valid email required'
    if (Object.keys(errs).length > 0) {
      setContactErrors(errs)
      return
    }

    window.location.href = buildMailto(data)
    advance('confirm')
  }

  const firstName = data.name.split(' ')[0]
  const stepIdx = STEP_ORDER.indexOf(step)

  const history: { question: string; answer: string }[] = []
  if (stepIdx > 0 && data.groupSize) {
    history.push({ question: "Who's joining?", answer: groupLabel(data.groupSize) })
  }
  if (stepIdx > 1 && data.instrument) {
    history.push({ question: 'Instrument', answer: data.instrument === 'guitar' ? 'Guitar' : 'Ukulele' })
  }
  if (data.groupSize === 'solo' && stepIdx > 2 && data.duration) {
    const price = data.duration === '30' ? PRICING.solo_30 : PRICING.solo_60
    history.push({
      question: 'Duration',
      answer: data.duration === '30' ? `30 min — $${price}` : `1 hour — $${price}`,
    })
  }
  if (stepIdx > 3 && data.preferredDate) {
    history.push({ question: 'When', answer: data.preferredDate })
  }

  const solo30Label = `30 minutes — $${PRICING.solo_30}`
  const solo60Label = `1 hour — $${PRICING.solo_60}`
  const groupSizes: GroupSize[] = ['solo', 'duo', 'group_small', 'group_large']
  const instruments: Instrument[] = ['guitar', 'ukulele']
  const durations: Duration[] = ['30', '60']
  const historySlots = [...history, ...Array(4 - history.length).fill(null)] as (
    | { question: string; answer: string }
    | null
  )[]

  // Reduced-motion: static stacked form — all steps visible at once, no back needed
  if (reduced) {
    if (step === 'confirm' || step === 'sent') {
      return (
        <div className="conv conv--reduced">
          <div className="conv-sent">
            <p className="conv-sent__headline">
              We'll see you out there{firstName ? `, ${firstName}` : ''}.
            </p>
            <p className="conv-sent__sub">Your email app should now have a draft addressed to Aaron.</p>
            {data.instrument && data.groupSize && (
              <p className="conv-sent__meta">
                {lessonSummary(data)}
              </p>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="conv conv--reduced">
        <div className="conv-step">
          <p className="conv-question">Who's joining the lesson?</p>
          <div className="booking-tiles booking-tiles--2col">
            {groupSizes.map((g) => (
              <button
                key={g}
                type="button"
                className={`booking-tile${data.groupSize === g ? ' booking-tile--selected' : data.groupSize ? ' booking-tile--unselected' : ''}`}
                onClick={() => selectGroup(g)}
              >
                {g === 'solo' ? groupLabel(g) : `${groupLabel(g)} — $${groupPrice(g)}`}
              </button>
            ))}
          </div>
          {contactErrors.groupSize && <span className="conv-error">{contactErrors.groupSize}</span>}
        </div>

        <div className="conv-step">
          <p className="conv-question">Guitar or ukulele?</p>
          <div className="booking-tiles booking-tiles--2col">
            {instruments.map((i) => (
              <button
                key={i}
                type="button"
                className={`booking-tile${data.instrument === i ? ' booking-tile--selected' : data.instrument ? ' booking-tile--unselected' : ''}`}
                onClick={() => selectInstrument(i)}
              >
                {i === 'guitar' ? 'Guitar' : 'Ukulele'}
              </button>
            ))}
          </div>
          {contactErrors.instrument && <span className="conv-error">{contactErrors.instrument}</span>}
          <p className="conv-hint">Ukuleles available to borrow if you need one.</p>
        </div>

        {data.groupSize === 'solo' && (
          <div className="conv-step">
            <p className="conv-question">How long?</p>
            <div className="booking-tiles booking-tiles--2col">
              {durations.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`booking-tile${data.duration === d ? ' booking-tile--selected' : data.duration ? ' booking-tile--unselected' : ''}`}
                  onClick={() => selectDuration(d)}
                >
                  {d === '30' ? solo30Label : solo60Label}
                </button>
              ))}
            </div>
            {contactErrors.duration && <span className="conv-error">{contactErrors.duration}</span>}
          </div>
        )}

        <div className="conv-step">
          <p className="conv-question">When are you thinking?</p>
          <input
            type="text"
            className="conv-input"
            placeholder="e.g. Dec 12, afternoon — or just a rough idea"
            value={dateInput}
            onChange={(e) => {
              setDateInput(e.target.value)
              setData((p) => ({ ...p, preferredDate: e.target.value.trim() }))
              setContactErrors((p) => { const n = { ...p }; delete n.preferredDate; return n })
            }}
          />
          {contactErrors.preferredDate && <span className="conv-error">{contactErrors.preferredDate}</span>}
          <p className="conv-hint">Aaron books 2–3 days ahead. Flexible on timing.</p>
        </div>

        <div className="conv-step">
          <p className="conv-question">Last thing — how do we reach you?</p>
          <div className="conv-inputs">
            <div>
              <input
                type="text"
                className={`conv-input${contactErrors.name ? ' conv-input--error' : ''}`}
                placeholder="Your name"
                value={data.name}
                onChange={(e) => {
                  setData((p) => ({ ...p, name: e.target.value }))
                  setContactErrors((p) => { const n = { ...p }; delete n.name; return n })
                }}
              />
              {contactErrors.name && <span className="conv-error">{contactErrors.name}</span>}
            </div>
            <div>
              <input
                type="email"
                className={`conv-input${contactErrors.email ? ' conv-input--error' : ''}`}
                placeholder="your@email.com"
                value={data.email}
                onChange={(e) => {
                  setData((p) => ({ ...p, email: e.target.value }))
                  setContactErrors((p) => { const n = { ...p }; delete n.email; return n })
                }}
              />
              {contactErrors.email && <span className="conv-error">{contactErrors.email}</span>}
            </div>
            <div>
              <input
                type="tel"
                className="conv-input"
                placeholder="Phone, optional"
                value={data.phone}
                onChange={(e) => setData((p) => ({ ...p, phone: e.target.value }))}
              />
            </div>
          </div>
          <button type="button" className="conv-action" onClick={submitContact}>
            Open Email Draft →
          </button>
        </div>
      </div>
    )
  }

  // Normal animated mode — one step at a time
  return (
    <div className="conv">
      {step !== 'confirm' && step !== 'sent' && (
        <div className="conv-history" aria-label="Booking selections">
          {historySlots.map((entry, index) => (
            <div
              key={entry ? entry.question : `history-slot-${index}`}
              className={`conv-history__entry${entry ? '' : ' conv-history__entry--empty'}`}
              aria-hidden={!entry}
            >
              <span className="conv-history__q">{entry?.question ?? 'Selection'}</span>
              <span className="conv-history__a">{entry?.answer ?? 'Pending'}</span>
            </div>
          ))}
        </div>
      )}

      {step !== 'confirm' && step !== 'sent' && (
        <div style={{ position: 'relative' }}>
          {exitHTML && (
            <div
              className="conv-step conv-step--exit"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: exitHTML }}
              aria-hidden="true"
            />
          )}
          <div ref={stepBodyRef} key={step} className="conv-step conv-step--enter">
          <button
            type="button"
            className={`conv-back${canGoBack ? '' : ' conv-back--hidden'}`}
            onClick={goBack}
            aria-hidden={!canGoBack}
            tabIndex={canGoBack ? 0 : -1}
          >
            ← Back
          </button>

          {step === 'who' && (
            <>
              <p className="conv-question">Who's joining the lesson?</p>
              <div className="booking-tiles booking-tiles--2col">
                {groupSizes.map((g) => (
                  <button
                    key={g}
                    type="button"
                    className={`booking-tile${data.groupSize === g ? ' booking-tile--selected' : data.groupSize ? ' booking-tile--unselected' : ''}`}
                    onClick={() => selectGroup(g)}
                  >
                    {g === 'solo' ? groupLabel(g) : `${groupLabel(g)} — $${groupPrice(g)}`}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 'type' && (
            <>
              <p className="conv-question">Guitar or ukulele?</p>
              <div className="booking-tiles booking-tiles--2col">
                {instruments.map((i) => (
                  <button
                    key={i}
                    type="button"
                    className={`booking-tile${data.instrument === i ? ' booking-tile--selected' : data.instrument ? ' booking-tile--unselected' : ''}`}
                    onClick={() => selectInstrument(i)}
                  >
                    {i === 'guitar' ? 'Guitar' : 'Ukulele'}
                  </button>
                ))}
              </div>
              <p className="conv-hint">Ukuleles available to borrow if you need one.</p>
            </>
          )}

          {step === 'duration' && (
            <>
              <p className="conv-question">How long?</p>
              <div className="booking-tiles booking-tiles--2col">
                {durations.map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={`booking-tile${data.duration === d ? ' booking-tile--selected' : data.duration ? ' booking-tile--unselected' : ''}`}
                    onClick={() => selectDuration(d)}
                  >
                    {d === '30' ? solo30Label : solo60Label}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 'date' && (
            <>
              <p className="conv-question">When are you thinking?</p>
              <input
                type="text"
                className="conv-input"
                placeholder="e.g. Dec 12, afternoon — or just a rough idea"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') submitDate() }}
                autoFocus
              />
              <p className="conv-hint">Aaron books 2–3 days ahead. Flexible on timing.</p>
              <button type="button" className="conv-action" onClick={submitDate}>
                Sounds good →
              </button>
            </>
          )}

          {step === 'contact' && (
            <>
              <p className="conv-question">Last thing — how do we reach you?</p>
              <div className="conv-inputs">
                <div>
                  <input
                    type="text"
                    className={`conv-input${contactErrors.name ? ' conv-input--error' : ''}`}
                    placeholder="Your name"
                    value={data.name}
                    onChange={(e) => {
                      setData((p) => ({ ...p, name: e.target.value }))
                      setContactErrors((p) => { const n = { ...p }; delete n.name; return n })
                    }}
                    autoFocus
                  />
                  {contactErrors.name && <span className="conv-error">{contactErrors.name}</span>}
                </div>
                <div>
                  <input
                    type="email"
                    className={`conv-input${contactErrors.email ? ' conv-input--error' : ''}`}
                    placeholder="your@email.com"
                    value={data.email}
                    onChange={(e) => {
                      setData((p) => ({ ...p, email: e.target.value }))
                      setContactErrors((p) => { const n = { ...p }; delete n.email; return n })
                    }}
                  />
                  {contactErrors.email && <span className="conv-error">{contactErrors.email}</span>}
                </div>
                <div>
                  <input
                    type="tel"
                    className="conv-input"
                    placeholder="Phone, optional"
                    value={data.phone}
                    onChange={(e) => setData((p) => ({ ...p, phone: e.target.value }))}
                  />
                </div>
              </div>
              <button type="button" className="conv-action" onClick={submitContact}>
                Open Email Draft →
              </button>
            </>
          )}
          </div>
        </div>
      )}

      {step === 'sent' && (
        <div key="confirmation" className="conv-sent conv-step--enter">
          <p className="conv-sent__headline">
            We'll see you out there{firstName ? `, ${firstName}` : ''}.
          </p>
          <p className="conv-sent__sub">Your email app should now have a draft addressed to Aaron.</p>
          {data.instrument && data.groupSize && (
            <p className="conv-sent__meta">
              {lessonSummary(data)}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default function BookingSection() {
  return (
    <section className="booking" id="book">
      <div className="booking__bg">
        <img
          src={publicAsset('/images/aaron-bookingForm.jpg')}
          alt="Aaron playing guitar in Maui"
          loading="lazy"
          className="booking__bg-img"
        />
        <div className="booking__bg-overlay" />
      </div>

      <div className="booking__inner">
        <div className="booking__header">
          <p className="section-eyebrow section-eyebrow--light">Ready when you are</p>
          <h2 className="booking__heading">Book a Lesson</h2>
        </div>
        <BookingConversation />
      </div>
    </section>
  )
}
