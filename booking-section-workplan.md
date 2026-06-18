# BookingSection — Implementation Workplan
**Status:** Approved for implementation  
**Files:** `src/components/BookingSection/BookingSection.tsx`, `src/components/BookingSection/BookingSection.css`  
**Do not modify any other component unless explicitly noted.**

---

## Purpose

This document is the single source of truth for all BookingSection improvements. It was produced after a live design review, frame-by-frame video analysis, and code inspection. The design strategy has been approved. This document converts that strategy into executable tasks.

**Why this work exists:** The BookingSection has the right architecture but two structural problems that damage conversion quality: (1) the panel resizes between every step, destroying visual stability, and (2) the tallest steps overflow the viewport, forcing the user to scroll to reach CTA buttons. These problems compound at the highest-commitment moments in the flow. The section was designed around its initial view, not its interaction journey.

**What success looks like:** A user who arrives at the BookingSection and begins booking never has to scroll to find a button, never loses visual context, and arrives at the confirmation state feeling like they've made a personal connection — not submitted a form.

**What must remain unchanged:** See Non-Negotiable Constraints below.

---

## Non-Negotiable Constraints

### Design elements — do not change
- Background image (`aaron-bookingForm.jpg`) — file, position, overlay values
- `object-position: center 30%` on `.booking__bg-img`
- Overlay CSS values on `.booking__bg-overlay` — do not adjust opacity
- Ken Burns animation (`kenBurnsSubtle`) — keep as-is
- `margin-bottom: -1px` on `.booking` — this is a Footer color-match seam, do not remove
- All color variables (`--color-sand`, `--color-sand-light`, etc.)
- Georgia serif font usage throughout
- All tile visual states: default, hover, selected (`booking-tile--selected`), unselected (`booking-tile--unselected`)
- History chip display (`.conv-history`, `.conv-history__entry`, `.conv-history__q`, `.conv-history__a`)
- Step entry/exit animation direction and easing (`step-enter`, `step-exit` keyframes)
- Reduced-motion fallback (`conv--reduced`) — must remain fully functional after all changes
- `mailto:` submission mechanism — do not replace with a fetch/API call
- Confirmation copy: "We'll see you out there, [Name]." — do not change this string

### Interaction patterns — do not change
- Auto-advance on tile selection (selecting a tile immediately advances to next step without a button)
- Back navigation clearing downstream data (`clearDataFrom`)
- Step history array pattern (`stepHistory`, `advance`, `goBack`)
- `useReducedMotion` hook behavior

### Architecture — do not change
- Component lives in `BookingSection/BookingSection.tsx` — do not split into separate files unless a task explicitly requires it
- CSS lives in `BookingSection/BookingSection.css` — no inline styles, no CSS modules rename
- `BookingConversation` is an inner component of `BookingSection` — keep this structure
- `STEP_ORDER` array controls step sequencing — preserve this pattern for the date step even as its UI changes
- `buildMailto` function — do not modify the email format or recipient

### Brand constraints
- All copy must be warm, personal, unhurried
- No exclamation points
- No generic UX language ("Submit", "Next", "Continue", "Proceed")
- Aaron is always referred to by first name only

---

## Approved Findings

These are the confirmed truths from the review. Implementation decisions must be consistent with all of them.

**Structural**
- The panel resizes on every step. This is the root cause of most visual problems.
- The section was designed for its arrival state, not its interaction journey.
- Steps 2 and 3 (instrument, duration) create visual void below a shortened panel.
- Steps 4 and 5 (date, contact) cause the panel to overflow the viewport.
- Panel height instability makes the section feel like a prototype, not a finished product.

**Overflow**
- The date step's "SOUNDS GOOD →" button is below the fold at common desktop viewport heights.
- The contact step's "OPEN EMAIL DRAFT →" button is below the fold. At this step, the footer is visible.
- The section heading ("Book a Lesson") is off-screen during the contact step.
- The user loses all visual context at the highest-commitment moment in the flow.

**Image**
- The background image is compositionally strong and contributes emotionally.
- It shows a teacher/student scene — exactly right for this section's purpose.
- It contributes at its best during the initial (pre-interaction) view.
- Image degradation during interaction is a symptom of panel instability, not an image problem.
- Do not touch the image, overlay, or Ken Burns animation. Fixing the panel will fix the image relationship.

**Date step**
- The free-text date input breaks the tile-based interaction language established in steps 1–3.
- It is the only step that requires typing, scrolling, and clicking a button.
- It introduces cognitive load at the point of highest uncertainty (tourists don't know their exact schedule).
- It is the weakest interaction in the flow and must be replaced.

**Contact step**
- Three inputs is correct — name, email, phone (optional).
- The step question ("Last thing — how do we reach you?") is good — keep it.
- Enter key does not trigger submission — this is a bug.
- The step has no emotional warmth before the submit button.
- "OPEN EMAIL DRAFT →" names the mechanism, not the outcome.

**Transition**
- The SeoContent → BookingSection transition works but is not intentionally designed.
- It can be improved with a single CSS addition to the SeoContent bottom edge.

**What is not a problem**
- The history chip display — this is one of the strongest design details on the site.
- The tile design, spacing, and selection states.
- The step animation timing and direction.
- The confirmation screen copy.
- The `mailto:` mechanism.
- The reduced-motion fallback.

---

## Final Design Direction

When all phases are complete, the BookingSection must behave as follows:

**Visual stability:** The panel maintains a consistent visual footprint from initial load through the confirmation state. It does not shrink on steps 2–3. It does not grow beyond the viewport on steps 4–5. The background image is compositionally stable and emotionally present throughout the entire interaction.

**Interaction quality:** Steps 1–4 (group, instrument, duration, date) all use the same tile/chip interaction model. The user never changes from clicking to typing as their primary interaction mode until the contact step (name/email). No step requires scrolling to reach a CTA. The Enter key works on every text input.

**Emotional experience:** The flow feels like a short, pleasant conversation. The date step feels as effortless as the tile steps. The contact step has a single line of warmth before the submit button. The submit button names the outcome, not the mechanism. The confirmation screen is the emotional peak.

**Conversion experience:** A user who begins the flow (clicks step 1) has no friction barrier preventing completion. Every CTA is visible without scrolling. Every input has keyboard support. The flow completes in under 60 seconds for a motivated user.

---

## Implementation Phases

### Phase 1 — Panel Height Stabilization
**Objective:** Give `.booking__inner` a fixed visual footprint that holds throughout all steps.

**Rationale:** This is the root cause fix. All other visual problems — image degradation, void below panel on short steps, overflow on tall steps — are symptoms of this instability. Fix this first so subsequent phases build on a stable foundation.

**Dependencies:** None. This is the first change.

**Tasks:**

1. **Measure the contact step's rendered height.** Open the live site at `http://localhost:5173` (or the dev server URL). Navigate to the BookingSection. Complete steps 1–3 quickly to reach step 5 (contact). Open DevTools, select `.booking__inner`, and read its rendered `offsetHeight`. Note this value.

2. **Set `min-height` on `.booking__inner`.** In `BookingSection.css`, add `min-height` to `.booking__inner`. The value must be large enough to contain the contact step at the most common viewport heights (1440×900, 1280×800). Use `min-height: 680px` as the starting value. Adjust upward if the contact step still overflows at 1280×800. Do not use a viewport-relative value (`vh`) for this — the panel must not grow unboundedly on tall displays.

   ```css
   .booking__inner {
     /* existing properties preserved */
     min-height: 680px;
   }
   ```

3. **Set `min-height` on `.conv`.** The current value is `24rem`. This is insufficient. Change to `min-height: 480px`. This prevents the conversational container from collapsing on short steps (instrument, duration).

   ```css
   .conv {
     min-height: 480px;
   }
   ```

4. **Remove height constraints that fight the stabilization.** Check `.conv:not(.conv--reduced) .conv-step` — its `min-height: 11rem` is fine and can stay. Check `@media (max-width: 560px)` — `.conv` has `min-height: 28rem` there. Update this to `min-height: 480px` to match.

5. **Verify steps 2 and 3 no longer create visual void.** After setting panel min-height, the instrument and duration steps (2 tiles each) should sit at the top of the conversational container with whitespace below them. This whitespace is intentional — it allows the background image's compositional relationship to the panel to remain stable. Do not add spacers or centering to fill this whitespace. Leave it.

6. **Verify the panel does not cause new problems at 1024×768.** At this viewport size, the panel may still overflow on the contact step. If it does, reduce padding (`clamp(1.75rem, 4vw, 2.6rem)`) to `clamp(1.5rem, 3vw, 2rem)` at `max-width: 1024px`. Only make this change if needed — do not touch padding speculatively.

**Completion criteria:**
- Panel visual footprint is consistent across all steps when viewed at 1440×900
- Panel does not shrink visibly between steps 1, 2, 3
- No step causes `.booking__inner` to grow beyond its min-height
- Background image strips on left and right of panel remain consistently visible across all steps

**Validation requirements:** See Phase 1 Validation Checklist below.

---

### Phase 2 — Eliminate Overflow and Scroll Requirements
**Objective:** Ensure every step's CTA is visible without scrolling at all target viewports.

**Rationale:** Phase 1 may resolve overflow at 1440px viewports. Phase 2 addresses the remaining cases and adds a safety net for all viewport sizes. This phase also fixes the Enter key regression on the contact step.

**Dependencies:** Phase 1 must be complete and validated before beginning Phase 2.

**Tasks:**

1. **Add a ref to `.booking__inner`.** In `BookingSection.tsx`, add:
   ```typescript
   const bookingInnerRef = useRef<HTMLDivElement>(null)
   ```
   Attach it to the `.booking__inner` div in `BookingSection`:
   ```tsx
   <div className="booking__inner" ref={bookingInnerRef}>
   ```
   Pass `bookingInnerRef` as a prop to `BookingConversation`, or lift the `scrollIntoView` call into `BookingSection` and pass a callback. The simplest implementation is to lift it.

2. **Add conditional scroll-into-view on step advance.** After `setStepHistory` is called in `advance()`, check whether the bottom of `.booking__inner` is below the visible viewport. If so, scroll the panel into view:
   ```typescript
   function advance(next: Step) {
     // existing exit animation logic unchanged
     if (!reduced && stepBodyRef.current) {
       setExitHTML(stepBodyRef.current.innerHTML)
       if (exitTimerRef.current) clearTimeout(exitTimerRef.current)
       exitTimerRef.current = setTimeout(() => setExitHTML(null), 400)
     }
     setStepHistory((prev) => [...prev, next])
     // Scroll panel into view if it overflows viewport
     requestAnimationFrame(() => {
       if (bookingInnerRef.current) {
         const rect = bookingInnerRef.current.getBoundingClientRect()
         if (rect.bottom > window.innerHeight - 16) {
           bookingInnerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
         }
       }
     })
   }
   ```
   The `requestAnimationFrame` ensures the DOM has updated after the step change before measuring. The `- 16` gives 16px of bottom breathing room. The check prevents unnecessary scrolling on steps where the panel fits.

3. **Account for the fixed navbar height in the scroll.** The navbar is approximately 60px tall. If `scrollIntoView({ block: 'start' })` places the panel flush against the top of the viewport, the navbar will overlap it. Add a CSS scroll-margin to `.booking__inner`:
   ```css
   .booking__inner {
     scroll-margin-top: 80px;
   }
   ```
   This tells the browser to leave 80px of space above the panel when scrolling it into view.

4. **Add Enter key handler to the contact step name input.** In the contact step JSX, add `onKeyDown` to the name input:
   ```tsx
   onKeyDown={(e) => { if (e.key === 'Enter') submitContact() }}
   ```

5. **Add Enter key handler to the contact step email input:**
   ```tsx
   onKeyDown={(e) => { if (e.key === 'Enter') submitContact() }}
   ```

6. **Add Enter key handler to the contact step phone input:**
   ```tsx
   onKeyDown={(e) => { if (e.key === 'Enter') submitContact() }}
   ```

7. **Verify reduced-motion path is unaffected.** The `advance` function has a `if (!reduced)` guard for animations. The scroll behavior should fire regardless of reduced-motion preference — it is a layout behavior, not an animation. Verify the `scrollIntoView` call is outside the `if (!reduced)` guard.

**Completion criteria:**
- At 1440×900: no step requires scrolling to reach a CTA
- At 1280×800: no step requires scrolling to reach a CTA
- At 1024×768: no step requires scrolling to reach a CTA
- Enter key on name, email, or phone input triggers `submitContact()`
- Enter key on date input continues to trigger `submitDate()` (regression check)
- Footer is not visible during any active booking step

**Validation requirements:** See Phase 2 Validation Checklist below.

---

### Phase 3 — Replace Date Text Input with Day/Time Chip Selection
**Objective:** Make the date step feel as effortless and consistent as the tile steps.

**Rationale:** The free-text date input is the single biggest friction point in the flow. It breaks the tile-based interaction model, requires typing, and causes uncertainty for tourists who don't know their exact schedule. Chip selection removes all three problems.

**Dependencies:** Phases 1 and 2 must be complete. The chip layout has its own height — it must be built into a stable, tested panel.

**Tasks:**

1. **Add `PreferredDays` and `PreferredTime` types to `BookingSection.tsx`:**
   ```typescript
   type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
   type TimeOfDay = 'morning' | 'afternoon' | 'evening'
   ```

2. **Update `BookingData` interface** to replace `preferredDate: string` with:
   ```typescript
   preferredDays: DayOfWeek[]
   preferredTime: TimeOfDay | null
   preferredDateNote: string
   ```

3. **Add initial values** in the `useState` call for `data`:
   ```typescript
   preferredDays: [],
   preferredTime: null,
   preferredDateNote: '',
   ```

4. **Update `clearDataFrom`** to clear the new fields wherever `preferredDate` was previously cleared. Replace all `d.preferredDate = ''` with:
   ```typescript
   d.preferredDays = []
   d.preferredTime = null
   d.preferredDateNote = ''
   ```

5. **Update `buildMailto`** to use the new fields:
   ```typescript
   const dayLabels: Record<DayOfWeek, string> = {
     mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday',
     fri: 'Friday', sat: 'Saturday', sun: 'Sunday'
   }
   const timeLabels: Record<TimeOfDay, string> = {
     morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening'
   }
   // In the body array:
   `Preferred days: ${data.preferredDays.map(d => dayLabels[d]).join(', ') || 'Not specified'}`,
   `Preferred time: ${data.preferredTime ? timeLabels[data.preferredTime] : 'Not specified'}`,
   `Timing note: ${data.preferredDateNote.trim() || 'None'}`,
   ```

6. **Update `submitDate`** to check that at least one day OR one time is selected (either is sufficient to advance):
   ```typescript
   function submitDate() {
     const hasDay = data.preferredDays.length > 0
     const hasTime = data.preferredTime !== null
     if (!hasDay && !hasTime) return
     setContactErrors((prev) => {
       const next = { ...prev }
       delete next.preferredDate
       return next
     })
     if (!reduced) advance('contact')
   }
   ```

7. **Update `submitContact` validation** to check `preferredDays.length === 0 && preferredTime === null` instead of `!preferredDate.trim()`. The error message should be: `'Please select at least one preferred day or time'`.

8. **Replace the date step JSX** (the `step === 'date'` block) with the chip interface:

   ```tsx
   {step === 'date' && (
     <>
       <p className="conv-question">When works for you?</p>
       
       <div className="date-chip-group">
         <p className="date-chip-label">Day</p>
         <div className="date-chips">
           {(['mon','tue','wed','thu','fri','sat','sun'] as DayOfWeek[]).map((day) => {
             const labels: Record<DayOfWeek, string> = {
               mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu',
               fri: 'Fri', sat: 'Sat', sun: 'Sun'
             }
             const selected = data.preferredDays.includes(day)
             return (
               <button
                 key={day}
                 type="button"
                 className={`date-chip${selected ? ' date-chip--selected' : ''}`}
                 onClick={() => {
                   setData((prev) => ({
                     ...prev,
                     preferredDays: selected
                       ? prev.preferredDays.filter((d) => d !== day)
                       : [...prev.preferredDays, day]
                   }))
                 }}
               >
                 {labels[day]}
               </button>
             )
           })}
         </div>
       </div>

       <div className="date-chip-group">
         <p className="date-chip-label">Time</p>
         <div className="date-chips">
           {(['morning','afternoon','evening'] as TimeOfDay[]).map((time) => {
             const labels: Record<TimeOfDay, string> = {
               morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening'
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

       {(data.preferredDays.length > 0 || data.preferredTime !== null) && (
         <button type="button" className="conv-action" onClick={submitDate}>
           Sounds good →
         </button>
       )}
     </>
   )}
   ```
   
   Note: The "Sounds good →" button appears only when at least one chip is selected. Before any chip is selected, there is no button — the interface guides through selection rather than presenting a dead button.

9. **Add chip CSS to `BookingSection.css`:**

   ```css
   /* ─── Date chip selection ────────────────────────────────── */
   .date-chip-group {
     margin-bottom: 1.25rem;
   }

   .date-chip-label {
     font-family: var(--font-sans);
     font-size: 0.65rem;
     text-transform: uppercase;
     letter-spacing: 0.12em;
     color: rgba(255, 255, 255, 0.4);
     margin-bottom: 0.65rem;
   }

   .date-chips {
     display: flex;
     flex-wrap: wrap;
     gap: 0.5rem;
   }

   .date-chip {
     padding: 0.5rem 0.9rem;
     border: 1px solid rgba(255, 255, 255, 0.22);
     background: rgba(255, 255, 255, 0.055);
     color: #fff;
     font-family: var(--font-serif);
     font-size: 0.95rem;
     font-weight: 300;
     cursor: pointer;
     border-radius: 0;
     transition:
       border-color 200ms ease,
       background-color 200ms ease;
   }

   .date-chip:hover {
     border-color: rgba(232, 213, 190, 0.5);
     background: rgba(255, 255, 255, 0.08);
   }

   .date-chip--selected {
     border-color: rgba(232, 213, 190, 0.9);
     background: rgba(232, 213, 190, 0.16);
     box-shadow: inset 0 0 0 1px rgba(232, 213, 190, 0.72);
   }

   .date-note-input {
     margin-top: 0.5rem;
     margin-bottom: 0;
   }
   ```

10. **Update the reduced-motion static form** to match the new date fields. In the `conv--reduced` return block, replace the date `<input type="text">` section with the chip interface (same JSX as above). The reduced-motion version shows all steps simultaneously, so the chips should appear in the same position relative to other steps.

11. **Update `lessonSummary`** if it references `preferredDate` — replace with a composed string from `preferredDays` and `preferredTime` for the confirmation screen's `conv-sent__meta`. If `preferredDays` is empty and `preferredTime` is null, omit timing from the summary.

**Completion criteria:**
- Date step shows 7 day chips and 3 time chips
- Day chips are multi-select; time chips are single-select
- "Sounds good →" button appears only after at least one chip is selected
- Auto-advance does NOT fire on the date step — user must click the button (chips need deliberate selection before proceeding)
- Optional text note is present and functional but not required
- `buildMailto` correctly formats the selected days and time in the email body
- Reduced-motion static form shows the chip interface
- Validation error fires if user somehow reaches submit with no date info (edge case in reduced-motion form)

**Validation requirements:** See Phase 3 Validation Checklist below.

---

### Phase 4 — Contact Step and Closing Moment
**Objective:** Elevate the emotional quality of the final step and the submit action.

**Rationale:** The structural work is done at this point. This phase improves the copy and adds one line of warmth before the submit button. These are the smallest changes with the most emotional impact.

**Dependencies:** Phases 1–3 complete. The contact step must be stable and visible before refining its content.

**Tasks:**

1. **Replace the section subtitle.** In `BookingSection.tsx`, in the `BookingSection` component (not `BookingConversation`), change:
   ```tsx
   // FROM:
   <p className="booking__sub">Choose the basics, then send Aaron a lesson request by email.</p>
   // TO:
   <p className="booking__sub">Pick what works, and Aaron will take it from there.</p>
   ```

2. **Add warmth hint above the submit button.** In the contact step JSX (both the animated and reduced-motion versions), add a `conv-hint` paragraph between the phone input and the submit button:
   ```tsx
   <p className="conv-hint">Aaron will follow up within a day or two.</p>
   <button type="button" className="conv-action" onClick={submitContact}>
     Send to Aaron →
   </button>
   ```

3. **Replace the submit button label.** Change `Open Email Draft →` to `Send to Aaron →` in both the animated contact step and the reduced-motion contact step.

4. **Verify the hint text renders correctly.** The existing `.conv-hint` style is:
   ```css
   font-size: 0.82rem;
   color: rgba(255, 255, 255, 0.52);
   margin-top: 0.75rem;
   line-height: 1.7;
   ```
   This is the correct register — small, quiet, reassuring. Do not increase the font size or change the color. The hint should not compete with the question heading or the submit button.

**Completion criteria:**
- Subtitle reads "Pick what works, and Aaron will take it from there."
- Hint text "Aaron will follow up within a day or two." appears between phone input and submit button
- Submit button reads "Send to Aaron →" in both animated and reduced-motion modes
- Hint text is visible without scrolling (Phase 2 ensures this)
- No other copy changes anywhere in the component

**Validation requirements:** See Phase 4 Validation Checklist below.

---

### Phase 5 — Transition Refinement
**Objective:** Make the SeoContent → BookingSection transition intentional.

**Rationale:** The transition currently works by fortunate layout behavior. This phase makes it designed. It is the lowest-risk, lowest-impact phase and belongs last.

**Dependencies:** All previous phases complete. This phase touches a different component.

**Tasks:**

1. **Identify the SeoContent component.** Find `src/components/SeoContent/` (or equivalent). Locate its CSS file.

2. **Add a bottom gradient to the SeoContent section.** In the SeoContent CSS, add a `::after` pseudo-element that fades the section's bottom edge to `#1a140d` (the color used in BookingSection's `booking::before` gradient):
   ```css
   .seo-content {
     position: relative; /* ensure if not already set */
   }

   .seo-content::after {
     content: '';
     position: absolute;
     bottom: 0;
     left: 0;
     right: 0;
     height: 20vh;
     background: linear-gradient(to bottom, transparent, #1a140d);
     pointer-events: none;
     z-index: 1;
   }
   ```
   If the SeoContent section already has a background color set, confirm it matches or is compatible with `#1a140d`. If SeoContent uses a different dark value, use that value instead — the goal is a seamless color match at the boundary.

3. **Verify the transition does not hide SeoContent content.** The `::after` gradient must be positioned behind text content (z-index lower than text) but above the section background. Check that FAQ accordion items near the bottom of SeoContent are not obscured.

4. **Verify the gradient does not conflict with BookingSection's `booking::before` gradient.** The two gradients should produce a continuous fade: SeoContent fades out to `#1a140d`, BookingSection fades in from `#1a140d` with its own `booking::before`. There should be no visible seam or color discontinuity at the boundary.

**Completion criteria:**
- SeoContent bottom edge fades smoothly into the BookingSection background
- No SeoContent content is obscured by the gradient
- No visible color seam at the SeoContent/BookingSection boundary
- Gradient does not appear on mobile where it may be too prominent relative to shorter section heights

**Validation requirements:** See Phase 5 Validation Checklist below.

---

## Validation Checklists

### Phase 1 Validation — Panel Stabilization

**Visual checks (run at 1440×900, 1280×800, 1024×768)**
- [ ] Panel width and horizontal position are identical across all steps
- [ ] Panel height does not visibly change between step 1 and step 2
- [ ] Panel height does not visibly change between step 2 and step 3
- [ ] Background image left strip (guitarist's shirt) is visible at the same width across all steps
- [ ] Background image right strip (child with pink hat) is visible at the same width across all steps
- [ ] Panel has no content overflow at any step

**Interaction checks**
- [ ] Tile selection still auto-advances (no regression)
- [ ] Back button still functions correctly
- [ ] History chips display correctly with new min-heights

**Responsive checks**
- [ ] At `max-width: 768px`, panel behaves correctly
- [ ] At `max-width: 560px`, panel behaves correctly
- [ ] At `max-width: 360px`, panel behaves correctly

**Regression checks**
- [ ] `margin-bottom: -1px` on `.booking` is unchanged
- [ ] Footer color seam is intact
- [ ] Reduced-motion form layout is unchanged

---

### Phase 2 Validation — Overflow and Scroll

**Scroll checks (at all three viewport sizes)**
- [ ] Step 1 (group size): all 4 tiles and question visible without scrolling
- [ ] Step 2 (instrument): both tiles, hint text visible without scrolling
- [ ] Step 3 (duration): both tiles, prices visible without scrolling
- [ ] Step 4 (date chips): all chips and "Sounds good →" button visible without scrolling
- [ ] Step 5 (contact): question, all 3 inputs, hint text, and "Send to Aaron →" visible without scrolling
- [ ] Footer is not visible during steps 1–5
- [ ] "Book a Lesson" heading remains visible or is scrolled off gracefully (not jarringly)

**Keyboard checks**
- [ ] Enter on date input calls `submitDate()` (regression — must still work)
- [ ] Enter on name input calls `submitContact()`
- [ ] Enter on email input calls `submitContact()`
- [ ] Enter on phone input calls `submitContact()`
- [ ] Tab order is logical across all steps

**Scroll behavior checks**
- [ ] Scroll-into-view fires when panel bottom is below viewport
- [ ] Scroll-into-view does NOT fire unnecessarily when panel is fully visible
- [ ] `scroll-margin-top: 80px` prevents navbar from overlapping panel after scroll
- [ ] Smooth scroll behavior is present (not instant jump)
- [ ] Scroll behavior fires regardless of reduced-motion preference

**Regression checks**
- [ ] `advance()` function animation logic is unchanged
- [ ] `goBack()` function is unchanged
- [ ] `clearDataFrom()` function is unchanged

---

### Phase 3 Validation — Date Chip Interface

**Visual checks**
- [ ] 7 day chips render in a single wrapped row (Mon–Sun)
- [ ] 3 time chips render in a single row (Morning, Afternoon, Evening)
- [ ] Chip visual matches tile visual style (border, background, selected state)
- [ ] "Day" and "Time" labels render in uppercase at correct opacity
- [ ] Optional note input renders below chips without gap issues
- [ ] "Sounds good →" button is invisible when no chips selected
- [ ] "Sounds good →" button appears after first chip selection
- [ ] History chip for date step reads correctly (e.g. "Sat, Sun · Morning")

**Interaction checks**
- [ ] Selecting a day chip toggles it (click once = selected, click again = deselected)
- [ ] Selecting a time chip replaces previous selection (only one time can be selected)
- [ ] Selecting multiple days works correctly
- [ ] Clicking "Sounds good →" advances to contact step
- [ ] Back from contact step clears all chips (day, time, and note)

**Email body checks**
- [ ] `buildMailto` includes selected days by full name (e.g. "Saturday, Sunday")
- [ ] `buildMailto` includes selected time (e.g. "Morning")
- [ ] `buildMailto` includes note if entered, or "None" if not
- [ ] Empty selection is not possible to submit (button hidden until selection made)

**Reduced-motion checks**
- [ ] Chip interface appears in the static stacked form
- [ ] Chip selections work in reduced-motion mode
- [ ] Validation error fires if static form is submitted without date selection

**Responsive checks**
- [ ] At mobile (`max-width: 560px`), day chips wrap across two rows cleanly
- [ ] At mobile, time chips fit in one row or wrap cleanly
- [ ] Chip tap targets are at least 44×44px on mobile

---

### Phase 4 Validation — Copy and Contact Step

**Copy checks**
- [ ] Subtitle reads exactly: "Pick what works, and Aaron will take it from there."
- [ ] Hint reads exactly: "Aaron will follow up within a day or two."
- [ ] Submit button reads exactly: "Send to Aaron →"
- [ ] All three copy changes appear in both animated and reduced-motion modes
- [ ] No other copy has changed anywhere in the component

**Visual checks**
- [ ] Hint text is visually smaller than the question and larger than nothing — `.conv-hint` style unchanged
- [ ] Hint text does not crowd the submit button — adequate margin between them
- [ ] Submit button appearance (sand-light fill, dark text, uppercase, border) is unchanged

**Regression checks**
- [ ] Confirmation copy "We'll see you out there" is unchanged
- [ ] History chip labels are unchanged
- [ ] All step question text is unchanged except as explicitly specified

---

### Phase 5 Validation — Transition

**Visual checks at 1440×900**
- [ ] SeoContent bottom fades smoothly — no hard edge
- [ ] BookingSection background image appears seamlessly below the fade
- [ ] No visible color seam or brightness discontinuity at boundary
- [ ] FAQ accordion items near the bottom of SeoContent are fully readable

**Responsive checks**
- [ ] Transition gradient does not obscure content at `max-width: 768px`
- [ ] At mobile, gradient height (`20vh`) is proportionally appropriate — reduce to `12vh` at `max-width: 560px` if needed

**Regression checks**
- [ ] SeoContent layout and content are unchanged
- [ ] SeoContent padding and spacing are unchanged
- [ ] BookingSection `booking::before` gradient is unchanged

---

## Testing Requirements

### Viewport sizes — test every phase at all of these
- 1440 × 900 (primary)
- 1280 × 800
- 1024 × 768
- 768 × 1024 (tablet portrait)
- 390 × 844 (iPhone 14 — mobile primary)
- 360 × 780 (Android baseline)

### Interaction tests
- Complete the full flow from step 1 through confirmation: Just me → Guitar → 30 minutes → [date chips] → contact → send
- Complete the full flow as a group: Larger group (6–8) → Ukulele → [date chips] → contact → send (no duration step)
- Complete the full flow as a duo: Two of us → Guitar → [date chips] → contact → send (no duration step)
- Use Back at every step and verify state clears correctly
- Begin flow, reach step 3, go back to step 1, re-select different group, verify downstream clears

### Animation tests
- Confirm step-exit animation fires on every forward advance
- Confirm step-enter animation fires after exit completes
- Confirm no blank panel flash between exit and enter (the animation gap issue)
- Confirm history chips animate in correctly after each selection
- Confirm Ken Burns animation is running on the background image (background-motion test)

### Keyboard tests
- Tab through entire form — focus order must be logical
- Enter on date input → advances
- Enter on name → submits contact
- Enter on email → submits contact
- Enter on phone → submits contact
- Shift+Tab navigates backward through inputs
- Space bar activates focused tile buttons
- Space bar activates focused chip buttons

### Scroll tests
- At 1280×800: verify no step requires scrolling
- At 1024×768: verify no step requires scrolling
- Verify `scroll-margin-top` keeps panel below navbar after scroll
- Verify scroll fires when panel bottom is below fold
- Verify scroll does NOT fire when panel is fully visible

### Reduced-motion tests
- Enable `prefers-reduced-motion: reduce` in system settings or via DevTools
- Verify static stacked form renders correctly
- Verify all chip interactions work in static form
- Verify submit works in static form
- Verify Ken Burns animation is disabled

### Edge cases
- Submit contact with empty name → validation error fires
- Submit contact with invalid email → validation error fires
- Submit contact with valid name and email, empty phone → succeeds (phone is optional)
- Submit date step with no chips selected → button is not visible (cannot submit)
- Submit date step with only day selected (no time) → "Sounds good →" is visible and works
- Submit date step with only time selected (no day) → "Sounds good →" is visible and works
- Go back from contact to date — chips are cleared
- Resize browser window during interaction — panel remains stable

---

## Definition of Done

The BookingSection is complete when **all** of the following are observable. These are binary checks — pass or fail.

### Structural
- [ ] The panel (`booking__inner`) does not visibly resize between steps 1, 2, and 3
- [ ] The panel does not visibly resize between steps 3 and 4
- [ ] Background image flanking strips are visible and consistent width across all steps at 1440×900
- [ ] Footer is not visible during any active booking step (steps 1–5)

### Overflow
- [ ] At 1440×900: zero steps require scrolling to reach a CTA
- [ ] At 1280×800: zero steps require scrolling to reach a CTA
- [ ] At 1024×768: zero steps require scrolling to reach a CTA
- [ ] The contact step's "Send to Aaron →" button is fully visible without scrolling at all three viewports

### Interaction
- [ ] Steps 1–4 (group, instrument, duration, date) all use tile/chip interaction — no typing required to make a selection
- [ ] The date step "Sounds good →" button is not visible until at least one chip is selected
- [ ] Enter key on name input triggers `submitContact()`
- [ ] Enter key on email input triggers `submitContact()`
- [ ] Enter key on phone input triggers `submitContact()`
- [ ] Enter key on date note input does not trigger submission (it is an optional field)
- [ ] Back navigation at every step clears the correct downstream data

### Copy
- [ ] Subtitle: "Pick what works, and Aaron will take it from there."
- [ ] Warmth hint: "Aaron will follow up within a day or two."
- [ ] Submit button: "Send to Aaron →"
- [ ] Confirmation: "We'll see you out there, [Name]." (unchanged)

### Email output
- [ ] `buildMailto` includes selected preferred days by full name
- [ ] `buildMailto` includes selected preferred time
- [ ] `buildMailto` includes optional note or "None"
- [ ] Subject line format is unchanged
- [ ] Recipient (`aaron@mauimusiclessons.com`) is unchanged

### Reduced-motion
- [ ] Static stacked form renders correctly with chip interface
- [ ] All chips are interactive in reduced-motion mode
- [ ] Submit works in reduced-motion mode
- [ ] Ken Burns animation is absent when reduced-motion is enabled

### Regression
- [ ] `margin-bottom: -1px` on `.booking` is unchanged
- [ ] Footer color seam is visually intact
- [ ] All existing tile styles and states are unchanged
- [ ] History chip display is unchanged
- [ ] Step entry/exit animations are unchanged
- [ ] `clearDataFrom` logic clears the correct fields

### Transition
- [ ] SeoContent bottom edge fades to BookingSection without a visible seam or hard edge

---

## Future Considerations (Out of Scope)

The following ideas were considered during the design review and explicitly excluded from this implementation. Do not implement these during this workplan. They are logged here for future reference only.

**Left-aligned panel layout.** Positioning `.booking__inner` to the left third of the viewport with the background image visible at right is a valid design direction. It was excluded because it requires compositional changes, mobile layout rework, and reduced-motion adjustments that are disproportionate to the current phase. Revisit after all five phases are shipped and validated.

**Real-time availability system.** A calendar picker or availability API would replace the chip selection. This requires backend infrastructure that does not exist. The chip approach is a permanent solution for this business scale, not a placeholder.

**Animated confirmation state.** Adding a checkmark animation, confetti, or other celebration to the confirmation screen. The current copy ("We'll see you out there") is the right ending. Adding animation risks cheapening it.

**Parallax image effect.** Making the background image scroll at a different rate than the panel. This would require a scroll listener and could conflict with the existing Ken Burns animation and `overflow: hidden` containment. Not worth the risk.

**Price surfacing in group tiles.** Showing price on the group size tiles (step 1) at point of selection rather than in the history chip after selection. This is a good idea but low priority relative to the structural work. Logging here for future reference.

**FAQ → Booking transition redesign.** Beyond the Phase 5 gradient, a more elaborate transition (parallax, crossfade, video) was considered and rejected. The transition is a supporting detail, not a conversion driver.

---

*End of document. All design decisions are final. Implementation proceeds in phase order. No phase begins until the preceding phase passes all validation checks.*
