import { useState, useEffect, useRef } from 'react'
import type React from 'react'
import { publicAsset } from '../../utils/assets'
import './BookingSection.css'

type Step = 'who' | 'type' | 'duration' | 'date' | 'contact' | 'confirm' | 'sent'
type GroupSize = 'solo' | 'duo' | 'group_small' | 'group_large'
type Instrument = 'guitar' | 'ukulele'
type Duration = '30' | '60'
type TimeOfDay = 'morning' | 'afternoon' | 'evening'

const PRICING = {
  solo_30: 35,
  solo_60: 60,
  group_2: 60,
  group_3_5: 80,
  group_6_8: 120,
}

const STEP_ORDER: Step[] = ['who', 'type', 'duration', 'date', 'contact', 'confirm', 'sent']
const BACK_STEP_LABELS: Record<Step, string> = {
  who: "Back to who's joining",
  type: 'Back to instrument selection',
  duration: 'Back to lesson duration',
  date: 'Back to preferred day and time',
  contact: 'Back to contact information',
  confirm: 'Back to lesson request review',
  sent: 'Back to sent request',
}

interface BookingData {
  groupSize: GroupSize | null
  instrument: Instrument | null
  duration: Duration | null
  selectedDateStart: string | null
  selectedDateEnd: string | null
  preferredTime: TimeOfDay | null
  preferredDateNote: string
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

// ─── Calendar helpers ────────────────────────────────────────

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const DOW_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function toISO(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function formatDateDisplay(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return `${MONTH_NAMES[m - 1]} ${d}, ${y}`
}

function formatDateRange(start: string, end: string): string {
  const [sy, sm, sd] = start.split('-').map(Number)
  const [ey, em, ed] = end.split('-').map(Number)
  if (sy === ey) {
    if (sm === em) return `${MONTH_NAMES[sm - 1]} ${sd} – ${ed}, ${sy}`
    return `${MONTH_NAMES[sm - 1]} ${sd} – ${MONTH_NAMES[em - 1]} ${ed}, ${sy}`
  }
  return `${formatDateDisplay(start)} – ${formatDateDisplay(end)}`
}

function shiftDays(iso: string, n: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  return toISO(new Date(y, m - 1, d + n))
}

function shiftMonths(iso: string, n: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  const target = new Date(y, m - 1 + n, 1)
  const daysInTarget = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()
  return toISO(new Date(target.getFullYear(), target.getMonth(), Math.min(d, daysInTarget)))
}

// ─── Group/instrument/duration helpers ──────────────────────

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

function groupPriceText(g: GroupSize): string {
  return g === 'solo' ? `$${PRICING.solo_30} / $${PRICING.solo_60}` : `$${groupPrice(g)}`
}

function groupSummary(g: GroupSize): string {
  return `${groupLabel(g)} - ${groupPriceText(g)}`
}

function lessonPriceText(data: BookingData): string | null {
  if (!data.groupSize) return null
  if (data.groupSize === 'solo') {
    if (!data.duration) return groupPriceText(data.groupSize)
    return data.duration === '30' ? `$${PRICING.solo_30}` : `$${PRICING.solo_60}`
  }
  return `$${groupPrice(data.groupSize)}`
}

function durationLabel(d: Duration): string {
  return d === '30' ? '30 minutes' : '1 hour'
}

function durationPriceText(d: Duration): string {
  return d === '30' ? `$${PRICING.solo_30}` : `$${PRICING.solo_60}`
}

function lessonSummary(data: BookingData): string {
  const parts = []
  if (data.instrument) parts.push(data.instrument === 'guitar' ? 'Guitar' : 'Ukulele')
  if (data.duration) parts.push(data.duration === '30' ? '30 min' : '1 hour')
  if (data.groupSize) parts.push(groupDescription(data.groupSize))
  const price = lessonPriceText(data)
  if (price) parts.push(price)
  return parts.join(' · ')
}

const TIME_LABELS: Record<TimeOfDay, string> = {
  morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening',
}

function buildMailto(data: BookingData): string {
  const subject = encodeURIComponent(`Lesson request from ${data.name.trim()}`)
  let dateText = 'Not specified'
  if (data.selectedDateStart && data.selectedDateEnd) {
    dateText = formatDateRange(data.selectedDateStart, data.selectedDateEnd)
  } else if (data.selectedDateStart) {
    dateText = formatDateDisplay(data.selectedDateStart)
  }
  const body = encodeURIComponent([
    `Name: ${data.name.trim()}`,
    `Email: ${data.email.trim()}`,
    `Phone: ${data.phone.trim() || 'Not provided'}`,
    `Group: ${data.groupSize ? groupLabel(data.groupSize) : 'Not selected'}`,
    `Instrument: ${data.instrument === 'guitar' ? 'Guitar' : data.instrument === 'ukulele' ? 'Ukulele' : 'Not selected'}`,
    `Duration: ${data.duration === '30' ? '30 minutes' : data.duration === '60' ? '1 hour' : 'Not selected'}`,
    `Preferred date: ${dateText}`,
    `Preferred time: ${data.preferredTime ? TIME_LABELS[data.preferredTime] : 'Not specified'}`,
    `Timing note: ${data.preferredDateNote.trim() || 'None'}`,
  ].join('\n'))
  return `mailto:aaron@mauimusiclessons.com?subject=${subject}&body=${body}`
}

// ─── Reduced-motion hook ─────────────────────────────────────

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

// ─── BookingCalendar component ───────────────────────────────

interface BookingCalendarProps {
  selectedStart: string | null
  selectedEnd: string | null
  onSelect: (date: string) => void
}

function BookingCalendar({ selectedStart, selectedEnd, onSelect }: BookingCalendarProps) {
  const today = new Date()
  const todayISO = toISO(today)
  const tomorrowISO = shiftDays(todayISO, 1)

  const initialISO =
    selectedStart && selectedStart > todayISO ? selectedStart : tomorrowISO

  const [viewYear, setViewYear] = useState(() => Number(initialISO.slice(0, 4)))
  const [viewMonth, setViewMonth] = useState(() => Number(initialISO.slice(5, 7)) - 1)
  const [focusedISO, setFocusedISO] = useState<string>(initialISO)

  const gridRef = useRef<HTMLDivElement>(null)
  const focusReqRef = useRef(false)

  useEffect(() => {
    if (!focusReqRef.current || !gridRef.current) return
    focusReqRef.current = false
    gridRef.current
      .querySelector<HTMLButtonElement>(`[data-date="${focusedISO}"]`)
      ?.focus()
  }, [focusedISO])

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const cells: (string | null)[] = []
  for (let i = 0; i < firstDayOfMonth; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(
      `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    )
  }

  function prevMonth() {
    const d = new Date(viewYear, viewMonth - 1, 1)
    setViewYear(d.getFullYear())
    setViewMonth(d.getMonth())
  }

  function nextMonth() {
    const d = new Date(viewYear, viewMonth + 1, 1)
    setViewYear(d.getFullYear())
    setViewMonth(d.getMonth())
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    let newISO: string | null = null

    switch (e.key) {
      case 'ArrowRight': newISO = shiftDays(focusedISO, 1); break
      case 'ArrowLeft':  newISO = shiftDays(focusedISO, -1); break
      case 'ArrowDown':  newISO = shiftDays(focusedISO, 7); break
      case 'ArrowUp':    newISO = shiftDays(focusedISO, -7); break
      case 'PageDown':   newISO = shiftMonths(focusedISO, 1); break
      case 'PageUp':     newISO = shiftMonths(focusedISO, -1); break
      case 'Enter': {
        e.preventDefault()
        if (focusedISO > todayISO) onSelect(focusedISO)
        return
      }
      default: return
    }

    if (!newISO) return
    e.preventDefault()
    focusReqRef.current = true
    setFocusedISO(newISO)
    setViewYear(Number(newISO.slice(0, 4)))
    setViewMonth(Number(newISO.slice(5, 7)) - 1)
  }

  return (
    <div className="booking-cal">
      <div className="booking-cal__header">
        <span className="booking-cal__month" aria-live="polite">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <div className="booking-cal__nav">
          <button
            type="button"
            className="booking-cal__nav-btn"
            onClick={prevMonth}
            aria-label="Previous month"
          >
            ←
          </button>
          <button
            type="button"
            className="booking-cal__nav-btn"
            onClick={nextMonth}
            aria-label="Next month"
          >
            →
          </button>
        </div>
      </div>

      <div className="booking-cal__dow-row" aria-hidden="true">
        {DOW_LABELS.map((label) => (
          <span key={label} className="booking-cal__dow">{label}</span>
        ))}
      </div>

      <div
        ref={gridRef}
        className="booking-cal__grid"
        role="group"
        aria-label="Select a date"
        onKeyDown={handleKeyDown}
      >
        {cells.map((iso, idx) => {
          if (!iso) {
            return (
              <div
                key={`empty-${idx}`}
                className="booking-cal__cell booking-cal__cell--empty"
                aria-hidden="true"
              />
            )
          }

          const isDisabled = iso <= todayISO
          const isToday = iso === todayISO
          const isSelected = iso === selectedStart || iso === selectedEnd
          const isInRange = !!(
            selectedStart && selectedEnd &&
            iso > selectedStart && iso < selectedEnd
          )
          const isFocused = iso === focusedISO

          const cls = ['booking-cal__cell']
          if (isDisabled) cls.push('booking-cal__cell--disabled')
          if (isToday) cls.push('booking-cal__cell--today')
          if (isInRange) cls.push('booking-cal__cell--in-range')
          if (isSelected) cls.push('booking-cal__cell--selected')

          const dayNum = Number(iso.slice(8))
          const [y, m, d] = iso.split('-').map(Number)
          const dateObj = new Date(y, m - 1, d)
          const ariaLabel = `${dateObj.toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
          })}${isDisabled ? ', unavailable' : ''}${isSelected ? ', selected' : ''}`

          return (
            <button
              key={iso}
              type="button"
              className={cls.join(' ')}
              data-date={iso}
              tabIndex={isFocused ? 0 : -1}
              aria-label={ariaLabel}
              aria-pressed={isSelected}
              onClick={() => {
                setFocusedISO(iso)
                if (!isDisabled) onSelect(iso)
              }}
              onFocus={() => setFocusedISO(iso)}
            >
              {dayNum}
            </button>
          )
        })}
      </div>

      {selectedStart && (
        <p className="booking-cal__selection">
          {selectedEnd
            ? formatDateRange(selectedStart, selectedEnd)
            : formatDateDisplay(selectedStart)}
        </p>
      )}
    </div>
  )
}

// ─── BookingConversation ─────────────────────────────────────

function BookingConversation({ bookingInnerRef }: { bookingInnerRef: React.RefObject<HTMLDivElement | null> }) {
  const [stepHistory, setStepHistory] = useState<Step[]>(['who'])
  const step = stepHistory[stepHistory.length - 1]
  const canGoBack = stepHistory.length > 1 && step !== 'sent' && step !== 'confirm'

  const [lessonContext, setLessonContext] = useState<'beach' | 'weekly' | null>(null)

  useEffect(() => {
    const sectionEl = document.getElementById('book')
    const ctxNow = sectionEl?.dataset.lessonContext as 'beach' | 'weekly' | undefined
    if (ctxNow) {
      setLessonContext(ctxNow)
      delete sectionEl!.dataset.lessonContext
      return
    }
    const el = document.getElementById('book')
    if (!el) return
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const ctx = el.dataset.lessonContext as 'beach' | 'weekly' | undefined
          if (ctx) {
            setLessonContext(ctx)
            delete el.dataset.lessonContext
          }
        }
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const [data, setData] = useState<BookingData>({
    groupSize: null,
    instrument: null,
    duration: null,
    selectedDateStart: null,
    selectedDateEnd: null,
    preferredTime: null,
    preferredDateNote: '',
    name: '',
    email: '',
    phone: '',
  })
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
    requestAnimationFrame(() => {
      if (bookingInnerRef.current) {
        const rect = bookingInnerRef.current.getBoundingClientRect()
        if (rect.bottom > window.innerHeight - 16) {
          bookingInnerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    })
  }

  function clearDataFrom(targetStep: Step) {
    setData((prev) => {
      const d = { ...prev }
      if (targetStep === 'who') {
        d.groupSize = null; d.instrument = null; d.duration = null
        d.selectedDateStart = null; d.selectedDateEnd = null
        d.preferredTime = null; d.preferredDateNote = ''
        d.name = ''; d.email = ''; d.phone = ''
      } else if (targetStep === 'type') {
        d.instrument = null
        d.selectedDateStart = null; d.selectedDateEnd = null
        d.preferredTime = null; d.preferredDateNote = ''
        d.name = ''; d.email = ''; d.phone = ''
      } else if (targetStep === 'duration') {
        d.duration = null
        d.selectedDateStart = null; d.selectedDateEnd = null
        d.preferredTime = null; d.preferredDateNote = ''
        d.name = ''; d.email = ''; d.phone = ''
      } else if (targetStep === 'date') {
        d.selectedDateStart = null; d.selectedDateEnd = null
        d.preferredTime = null; d.preferredDateNote = ''
        d.name = ''; d.email = ''; d.phone = ''
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

  function handleDateSelect(iso: string) {
    setData((prev) => {
      const { selectedDateStart: start, selectedDateEnd: end } = prev
      if (!start) {
        return { ...prev, selectedDateStart: iso, selectedDateEnd: null }
      }
      if (!end) {
        if (iso === start) {
          return { ...prev, selectedDateStart: null, selectedDateEnd: null }
        }
        if (iso > start) {
          return { ...prev, selectedDateEnd: iso }
        }
        return { ...prev, selectedDateStart: iso, selectedDateEnd: null }
      }
      return { ...prev, selectedDateStart: iso, selectedDateEnd: null }
    })
    setContactErrors((p) => { const n = { ...p }; delete n.preferredDate; return n })
  }

  function submitDate() {
    if (!data.selectedDateStart) return
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
    if (!data.selectedDateStart) errs.preferredDate = 'Please select at least one date'
    if (!data.name.trim()) errs.name = 'Name is required'
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) errs.email = 'Valid email required'
    if (Object.keys(errs).length > 0) {
      setContactErrors(errs)
      return
    }

    window.location.href = mailtoHref
    advance('confirm')
  }

  const firstName = data.name.split(' ')[0]
  const stepIdx = STEP_ORDER.indexOf(step)
  const backTargetStep = canGoBack ? stepHistory[stepHistory.length - 2] : null
  const backLabel = backTargetStep ? BACK_STEP_LABELS[backTargetStep] : 'Back'
  const mailtoHref = buildMailto(data)

  const history: { question: string; answer: string }[] = []
  if (stepIdx > 0 && data.groupSize) {
    const whoAnswer = data.groupSize === 'solo' ? groupLabel(data.groupSize) : groupSummary(data.groupSize)
    history.push({ question: "Who's joining?", answer: whoAnswer })
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
  if (stepIdx > 3 && data.selectedDateStart) {
    const datePart = data.selectedDateEnd
      ? formatDateRange(data.selectedDateStart, data.selectedDateEnd)
      : formatDateDisplay(data.selectedDateStart)
    const timePart = data.preferredTime ? TIME_LABELS[data.preferredTime] : ''
    const whenAnswer = [datePart, timePart].filter(Boolean).join(' · ')
    history.push({ question: 'When', answer: whenAnswer })
  }

  const groupSizes: GroupSize[] = ['solo', 'duo', 'group_small', 'group_large']
  const instruments: Instrument[] = ['guitar', 'ukulele']
  const durations: Duration[] = ['30', '60']

  const contextLabel = lessonContext === 'beach'
    ? 'Beach lesson — Kihei, Maui'
    : lessonContext === 'weekly'
      ? 'Weekly lesson — Kihei, Maui'
      : null

  function SentState({ className = '' }: { className?: string }) {
    return (
      <div className={`conv-sent${className ? ` ${className}` : ''}`}>
        <p className="booking__inquiry-note">This is a lesson request, not a confirmed booking. Aaron will reply within a day or two to confirm details after you send the email.</p>
        <p className="conv-sent__headline">
          We'll see you out there{firstName ? `, ${firstName}` : ''}.
        </p>
        <p className="conv-sent__sub">Your email app should now have a draft addressed to Aaron. Please send that email to complete your lesson request.</p>
        <a className="conv-action conv-action--mailto" href={mailtoHref}>
          Open email draft again
        </a>
        {data.instrument && data.groupSize && (
          <p className="conv-sent__meta">
            {lessonSummary(data)}
          </p>
        )}
        <p className="conv-sent__sub">Aaron accepts cash or Venmo.</p>
      </div>
    )
  }

  // Reduced-motion: static stacked form
  if (reduced) {
    if (step === 'confirm' || step === 'sent') {
      return (
        <div className="conv conv--reduced">
          <SentState />
        </div>
      )
    }

    return (
      <div className="conv conv--reduced">
        {contextLabel && (
          <p className="booking__context-label">{contextLabel}</p>
        )}
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
                <span className="booking-tile__label">{groupLabel(g)}</span>
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
                <span className="booking-tile__label">{i === 'guitar' ? 'Guitar' : 'Ukulele'}</span>
              </button>
            ))}
          </div>
          {contactErrors.instrument && <span className="conv-error">{contactErrors.instrument}</span>}
          {data.groupSize && data.groupSize !== 'solo' && <p className="conv-hint">{groupSummary(data.groupSize)}</p>}
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
                  <span className="booking-tile__label">{durationLabel(d)}</span>
                  <span className="booking-tile__meta">{durationPriceText(d)}</span>
                </button>
              ))}
            </div>
            {contactErrors.duration && <span className="conv-error">{contactErrors.duration}</span>}
          </div>
        )}

        <div className="conv-step">
          <p className="conv-question">When works for you?</p>
          <p className="booking__date-note">
            Aaron books 2–3 days ahead. Share your preferred window and he'll confirm availability.
          </p>

          <BookingCalendar
            selectedStart={data.selectedDateStart}
            selectedEnd={data.selectedDateEnd}
            onSelect={handleDateSelect}
          />

          <div className="date-chip-group">
            <p className="date-chip-label">Time</p>
            <div className="date-chips">
              {(['morning','afternoon','evening'] as TimeOfDay[]).map((time) => {
                const labels: Record<TimeOfDay, string> = {
                  morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening',
                }
                const selected = data.preferredTime === time
                return (
                  <button
                    key={time}
                    type="button"
                    className={`date-chip${selected ? ' date-chip--selected' : ''}`}
                    onClick={() => {
                      setData((prev) => ({ ...prev, preferredTime: selected ? null : time }))
                      setContactErrors((p) => { const n = { ...p }; delete n.preferredDate; return n })
                    }}
                  >
                    {labels[time]}
                  </button>
                )
              })}
            </div>
          </div>

          <input
            type="text"
            className="conv-input date-note-input"
            placeholder="Anything else about timing? (optional)"
            value={data.preferredDateNote}
            onChange={(e) => setData((prev) => ({ ...prev, preferredDateNote: e.target.value }))}
          />
          {data.preferredDateNote.trim().length > 0 && (
            <p className="note-confirm">We'll pass this along to Aaron.</p>
          )}
          {contactErrors.preferredDate && <span className="conv-error">{contactErrors.preferredDate}</span>}
        </div>

        <div className="conv-step">
          <p className="conv-question">Last thing — how do we reach you?</p>
          <div className="conv-inputs">
            <div>
              <input
                aria-label="Your name"
                type="text"
                autoComplete="name"
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
                aria-label="Email address"
                type="email"
                autoComplete="email"
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
                aria-label="Phone number (optional)"
                type="tel"
                autoComplete="tel"
                className="conv-input"
                placeholder="Phone, optional"
                value={data.phone}
                onChange={(e) => setData((p) => ({ ...p, phone: e.target.value }))}
              />
            </div>
          </div>
          <p className="conv-hint">Aaron will follow up within a day or two.</p>
          <button type="button" className="conv-action" onClick={submitContact}>
            Send lesson request
          </button>
        </div>
      </div>
    )
  }

  // Normal animated mode — one step at a time
  return (
    <div className="conv">
      {contextLabel && step === 'who' && (
        <p className="booking__context-label">{contextLabel}</p>
      )}
      {step !== 'confirm' && step !== 'sent' && history.length > 0 && (
        <div className="conv-history" aria-label="Booking selections">
          {history.map((entry) => (
            <div
              key={entry.question}
              className="conv-history__entry"
            >
              <span className="conv-history__q">{entry.question}</span>
              <span className="conv-history__a">{entry.answer}</span>
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
            aria-label={backLabel}
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
                    <span className="booking-tile__label">{groupLabel(g)}</span>
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
                    <span className="booking-tile__label">{i === 'guitar' ? 'Guitar' : 'Ukulele'}</span>
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
                    <span className="booking-tile__label">{durationLabel(d)}</span>
                    <span className="booking-tile__meta">{durationPriceText(d)}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 'date' && (
            <>
              <p className="conv-question">When works for you?</p>
              <p className="booking__date-note">
                Aaron books 2–3 days ahead. Share your preferred window and he'll confirm availability.
              </p>

              <BookingCalendar
                selectedStart={data.selectedDateStart}
                selectedEnd={data.selectedDateEnd}
                onSelect={handleDateSelect}
              />

              <div className="date-chip-group">
                <p className="date-chip-label">Time</p>
                <div className="date-chips">
                  {(['morning','afternoon','evening'] as TimeOfDay[]).map((time) => {
                    const labels: Record<TimeOfDay, string> = {
                      morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening',
                    }
                    const selected = data.preferredTime === time
                    return (
                      <button
                        key={time}
                        type="button"
                        className={`date-chip${selected ? ' date-chip--selected' : ''}`}
                        onClick={() => {
                          setData((prev) => ({ ...prev, preferredTime: selected ? null : time }))
                        }}
                      >
                        {labels[time]}
                      </button>
                    )
                  })}
                </div>
              </div>

              <input
                type="text"
                className="conv-input date-note-input"
                placeholder="Anything else about timing? (optional)"
                value={data.preferredDateNote}
                onChange={(e) => setData((prev) => ({ ...prev, preferredDateNote: e.target.value }))}
              />
              {data.preferredDateNote.trim().length > 0 && (
                <p className="note-confirm">We'll pass this along to Aaron.</p>
              )}

              {data.selectedDateStart && (
                <button type="button" className="conv-action" onClick={submitDate}>
                  Sounds good →
                </button>
              )}
            </>
          )}

          {step === 'contact' && (
            <>
              <p className="conv-question">Last thing — how do we reach you?</p>
              <div className="conv-inputs">
                <div>
                  <input
                    aria-label="Your name"
                    type="text"
                    autoComplete="name"
                    className={`conv-input${contactErrors.name ? ' conv-input--error' : ''}`}
                    placeholder="Your name"
                    value={data.name}
                    onChange={(e) => {
                      setData((p) => ({ ...p, name: e.target.value }))
                      setContactErrors((p) => { const n = { ...p }; delete n.name; return n })
                    }}
                    onKeyDown={(e) => { if (e.key === 'Enter') submitContact() }}
                    autoFocus
                  />
                  {contactErrors.name && <span className="conv-error">{contactErrors.name}</span>}
                </div>
                <div>
                  <input
                    aria-label="Email address"
                    type="email"
                    autoComplete="email"
                    className={`conv-input${contactErrors.email ? ' conv-input--error' : ''}`}
                    placeholder="your@email.com"
                    value={data.email}
                    onChange={(e) => {
                      setData((p) => ({ ...p, email: e.target.value }))
                      setContactErrors((p) => { const n = { ...p }; delete n.email; return n })
                    }}
                    onKeyDown={(e) => { if (e.key === 'Enter') submitContact() }}
                  />
                  {contactErrors.email && <span className="conv-error">{contactErrors.email}</span>}
                </div>
                <div>
                  <input
                    aria-label="Phone number (optional)"
                    type="tel"
                    autoComplete="tel"
                    className="conv-input"
                    placeholder="Phone, optional"
                    value={data.phone}
                    onChange={(e) => setData((p) => ({ ...p, phone: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === 'Enter') submitContact() }}
                  />
                </div>
              </div>
              <p className="conv-hint">Aaron will follow up within a day or two to confirm your lesson.</p>
              <button type="button" className="conv-action" onClick={submitContact}>
                Send lesson request
              </button>
            </>
          )}
          </div>
        </div>
      )}

      {step === 'sent' && (
        <SentState className="conv-step--enter" />
      )}
    </div>
  )
}

export default function BookingSection() {
  const bookingInnerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="booking" id="book" aria-labelledby="booking-heading">
      <div className="booking__bg">
        <img
          src={publicAsset('/images/aaron-bookingForm.jpg')}
          alt="Aaron playing guitar in Maui"
          loading="lazy"
          className="booking__bg-img"
        />
        <div className="booking__bg-overlay" />
      </div>

      <div className="booking__inner" ref={bookingInnerRef}>
        <div className="booking__header">
          <p className="section-eyebrow section-eyebrow--light">Ready when you are</p>
          <h2 className="booking__heading" id="booking-heading">Book a Lesson</h2>
          <p className="booking__sub">Pick what works, and Aaron will take it from there.</p>
        </div>
        <BookingConversation bookingInnerRef={bookingInnerRef} />
      </div>
    </section>
  )
}
