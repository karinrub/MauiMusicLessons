Reading all five required documents before writing the package.All five documents read. Controlling corrections from this session's verification work are fully integrated. Writing the implementation planning package now.

---

# MauiMusicLessons — Implementation Planning Package
**Prepared:** June 22, 2026
**For:** Claude Code
**Authority:** `implementation-brief.md`, `completion-report.md`, `audit-report-june2026.md`, and all verification conclusions from this session. Session verification overrides the June 2026 audit where findings conflict.

---

## 1. Implementation Readiness Summary

**Ready for implementation now — six findings:**
1. About Aaron chapter image readiness (Chapter 3, Focus, internal index 2 confirmed; mechanism confirmed for all chapters)
2. Beach video loading and playback reliability (symptom confirmed; root cause bounded, not isolated; fix requires post-change validation)
3. Booking sent state recovery path (confirmed product experience defect)
4. Landmark accessible names (confirmed via DOM inspection, all six sections plus nav)
5. Booking back button context-specific accessible name (confirmed via DOM inspection)
6. Mobile touch target sizing — date chips and video controls (confirmed below 44px via DOM measurement)

**Intentionally excluded from implementation — findings not supported by current evidence:**
- CinematicPanel Line 2 dim opacity: not supported by current source or live measurement
- About Aaron exit choreography absent: exit handler confirmed present in current source
- CinematicPanel pacing / perceived dark-screen gaps: require user-driven scroll observation
- Beach and Weekly exit fade quality: visual quality unverified; require user-driven scroll observation
- Chapter 2 (Exploration, index 1) and Chapter 4 (Maui, index 3) visible flash: image-readiness risk confirmed structurally, visible symptom not directly observed
- Weekly pull quote filter treatment: visual quality finding from the audit; requires user creative direction decision before any change

**Require user decisions before implementation:**
- Custom serif typeface (Georgia vs. premium variable-weight serif)
- Weekly pull quote image treatment (stronger filter vs. image replacement vs. accept current state)
- Social proof / testimonials (content dependency)
- Phone or text contact (data dependency)
- WebP conversion and responsive srcset strategy (tooling and workflow decision)
- `text-wrap: balance` on cinematic lines (creative copy decision — affects line breaks intentionally set by the author)
- Primary button pressed/active state (interaction design decision)

**Remain release QA requirements — not implementation work yet:**
- iOS Safari video autoplay behavior
- Chapter transition visual flash on real first-visit touch interaction (Chapters 2, 3, 4)
- About Aaron exit and CinematicEntry transition visual quality during genuine scrolling
- CinematicPanel pacing quality during genuine scrolling
- Mobile keyboard behavior in booking contact step
- Navbar contrast over variable image content
- About Aaron rail label legibility at 0.52rem on real devices
- iOS scroll throttling effect on hero parallax and exit fades

---

## 2. Full Audit Finding Disposition Table

| Audit Finding | Current Status | Evidence Basis | Implementation Decision | Reason |
|---|---|---|---|---|
| CinematicPanel Line 2 "No pressure." at ~20–25% opacity when Line 1 fully revealed | Resolved, superseded, or unsupported | Source verification + DOM math: not producible by current timing constants | Excluded | Verification session proved this finding does not correspond to current implementation |
| Beach video not autoplaying on desktop Chrome (readyState 0, black rectangle) | Ready now | DOM measurement (direct): readyState=0, zero buffered bytes, no resource entry in Performance API, zero events fired | Included — Phase 1 | Symptom confirmed; root cause bounded; post-change validation required |
| About Aaron Chapter image black flash — Chapter 3, Focus, index 2, aaron-playing-2.jpg | Ready now | DOM measurement (direct): naturalWidth=0, complete=false at transition time and 700ms later; CSS mechanism confirmed | Included — Phase 1 | Black render is certain from DOM evidence when naturalWidth=0; mechanism confirmed in source |
| About Aaron Chapter image readiness risk — Chapters 2 and 4 (indices 1 and 3) | Requires real device verification | DOM measurement: complete=false, naturalWidth=2200 at transition; rendered appearance not directly observed | Excluded from backlog; mechanism fix in Phase 1 covers all chapters | Visible symptom for Chapters 2 and 4 not directly observed; fix scope covers the shared mechanism |
| Booking sent state: no visible recovery path after mailto: handoff | Ready now | Source verification (direct) + DOM observation (direct): no anchor, no retry button, no mailto link in sent state | Included — Phase 1 | Confirmed product experience defect with narrow, well-bounded scope |
| Landmark sections missing accessible names | Ready now | DOM measurement (direct): aria-label=null, aria-labelledby=null on #hero, #about, #book, main, nav, footer | Included — Phase 2 | Confirmed WCAG 4.1.2; straightforward fix; well-bounded |
| Booking back button missing context-specific accessible name | Ready now | DOM measurement (direct): conv-back has text content "← Back", no aria-label | Included — Phase 2 | Confirmed WCAG 4.1.2; narrow fix scope |
| About Aaron exit choreography absent | Resolved, superseded, or unsupported | Source verification (direct): viewportProgress exit handler confirmed in AboutAaron.tsx lines 83–97 | Excluded | Current source contradicts this finding; exit handler exists |
| Beach editorial exit fade too aggressive (24% opacity while in viewport) | Requires real device verification | Inference from viewportProgress parameters; visual quality during genuine user-driven scroll not observed | Excluded | Visual quality of exit requires user-driven scroll observation; cannot confirm defect from math alone |
| Weekly editorial exit fade too aggressive | Requires real device verification | Same basis as Beach exit fade | Excluded | Same reason |
| Weekly pull quote image (aaron-teaching-1.jpg) insufficient filter treatment | Requires user decision | Visual quality finding from audit; creative direction call | Excluded | Requires user direction on filter strength vs. image replacement vs. accepting current state |
| Date chip tap targets below 44px (36px height on desktop) | Ready now | DOM measurement (direct): all date chips measured at 36px height | Included — Phase 2 | Confirmed measurement below WCAG 2.5.5 minimum; fix is scoped to CSS padding/sizing |
| Video control buttons below 44px (36×36px) | Ready now | DOM measurement (direct): .beach__video-btn measured at 36×36px | Included — Phase 2 | Same as above |
| Custom serif typeface — Georgia ceiling | Requires user decision | Audit assessment; creative direction decision | Excluded | Requires explicit user direction before any typeface change; high-impact, high-risk |
| `text-wrap: balance` on cinematic lines | Requires user decision | Typography detail finding; may conflict with intentional line breaks | Excluded | Author may have set line breaks intentionally; needs user confirmation before applying balance |
| Social proof / testimonials absent | Business, content, or tooling dependency | Confirmed data dependency throughout audit | Excluded | No real testimonial content available; cannot fabricate |
| Phone / text contact absent | Business, content, or tooling dependency | Confirmed data dependency | Excluded | Requires Aaron's confirmed contact number |
| WebP conversion and responsive srcset | Business, content, or tooling dependency | Tooling not installed; documented in completion-report.md | Excluded | Requires `vite-plugin-image-optimizer` or `cwebp` workflow decision before implementation |
| Navbar contrast over variable scroll positions (WCAG 1.4.3) | Requires real device verification | CSS analysis: rgba(255,255,255,0.75) links over rgba(10,8,6,0.14) background; pixel measurement not possible programmatically | Excluded | Cannot determine contrast ratio without pixel sampling behind navbar |
| About Aaron rail label text at 0.52rem — legibility risk | Requires real device verification | CSS source: font-size confirmed at 0.52rem; legibility at real device scale not verified | Excluded | Requires real device visual observation |
| About Aaron → CinematicEntry transition visual quality | Requires real device verification | Exit mechanism confirmed in source; visual quality during genuine scrolling not observed | Excluded | Source verified behavior, visual quality unverified |
| CinematicPanel pacing / dark-screen gaps | Requires real device verification | Timing math: 0.01 of panel travel between lines; user-driven scroll observation not performed | Excluded | Cannot assess perceptual quality from math alone |
| iOS parallax throttling — hero and exit fades | Requires real device verification | iOS platform behavior; not testable in this environment | Excluded | Real device required |
| iOS Safari video autoplay | Requires real device verification | Source confirms all required iOS attributes present; real device test not performed | Excluded | Real device required; source suggests it should work but needs confirmation |
| Mobile keyboard behavior obscuring booking CTA | Requires real device verification | Source analysis only; real viewport-shift behavior on iOS not tested | Excluded | Real device required |
| About Aaron safe-area inset (home indicator) | Requires real device verification | CSS analysis: bottom positioning may interact with home indicator | Excluded | Marginal risk; real device verification |
| Primary button pressed/active state absent | Requires user decision | Audit detail finding; interaction design direction call | Excluded | Design decision required before implementation |
| FAQ trigger hover feedback absent | Requires user decision | Audit detail finding | Excluded | Design decision required |
| Line 3 CinematicPanel wrap at semantically weak point | Requires user decision | Audit typography finding; may be intentional | Excluded | Author copy decision; not an engineering defect |
| Eyebrow letter-spacing inconsistency (0.08–0.2em range) | Requires user decision | Audit typography finding; subtle | Excluded | Creative direction call; low priority |
| Local/weekly student recurring-booking narrative gap | Requires user decision | Conversion audit finding; requires copy direction | Excluded | Copy and UX direction required from user |

---

## 3. Execution Order

---

### Phase 1 — Core Experience Defects
**Goal:** Eliminate the three confirmed defects that most directly damage the visitor experience: the chapter image blank render, the video loading failure, and the sent-state recovery gap.

**Included work:**
- About Aaron chapter image readiness guard (all chapters, scoped to the mechanism; Chapter 3, Focus, index 2 is the confirmed case)
- Beach video loading and playback reliability
- Booking sent state recovery path

**Dependencies:** None. All three are independent of each other. Any can start first.

**Risks to preserve against:**
- Do not eager-load all four chapter images at page load — this would push 3× 2200px JPEGs into initial page weight unnecessarily
- Do not change the booking flow's step logic, selection architecture, mailto construction, or confirmation language beyond the sent state
- Do not change the chapter crossfade duration, drag behavior, keyboard navigation, or reduced-motion behavior in About Aaron
- Do not change any Beach Lessons visual treatment, pause control behavior, mute control behavior, or loop behavior
- The video fix must not create a visible black rectangle as a loading state without an intentional placeholder treatment

**Required verification before Phase 2:**
- Fresh desktop Chrome first-visit: scroll to About Aaron, navigate all four chapters immediately — confirm no black rectangle appears
- Fresh desktop Chrome first-visit: scroll to Beach — confirm video begins loading and plays, or confirm a non-black loading state
- Booking flow: complete Solo path to sent state — confirm recovery link or instruction is visible and functional
- Booking flow: confirm all four group-size paths reach sent state without regressions (Solo directly; Duo, Small Group, Larger Group via source-verified path check)
- Reduced-motion mode: confirm all three fixes are inert or degrade gracefully
- Keyboard navigation: confirm About Aaron chapter navigation remains accessible
- Mobile layout at 375px and 390px: confirm no layout shift, broken card spacing, or new overflow

---

### Phase 2 — Accessibility and Touch Target Compliance
**Goal:** Close all confirmed WCAG deferred findings and bring touch targets above the 44px minimum for confirmed undersized controls.

**Included work:**
- Landmark accessible names (all six sections plus nav)
- Booking back button context-specific accessible name (all steps and paths)
- Date chip height to 44px minimum
- Video control button dimensions to 44×44px minimum

**Dependencies:** Phase 1 must be verified complete. The booking back button fix touches `BookingSection.tsx` — ensure Phase 1 changes to `BookingSection.tsx` are stable before Phase 2 modifies the same file.

**Risks to preserve against:**
- Landmark labels must use meaningful, site-specific names — not generic strings like "Section 1"
- Anchor IDs (`#hero`, `#about`, `#book`, `#beach-lessons`) must not change — they are used by navbar scroll targeting
- Visible text and visual layout must not change
- Date chip sizing change must not cause chip row wrapping or overflow in the booking card at 375px, 390px, and 430px
- Video control size increase must not visually disrupt the beach video overlay composition at desktop or mobile widths
- Back button accessible name must update correctly for every step and both animated and reduced-motion booking paths

**Required verification before declaring implementation complete:**
- DOM inspection confirming aria-label on all landmark elements
- DOM inspection confirming conv-back aria-label updates per step across all booking paths
- Booking card layout at 375px, 390px, 430px — no wrapping, overflow, or clipping introduced by chip size change
- Video overlay at desktop width — confirm control button size increase is visually coherent
- Screen reader pass (VoiceOver on macOS minimum) on landmark navigation and back button announcement
- Keyboard focus visibility confirmed on enlarged touch targets

---

## 4. Claude Code Prompts

---

### Phase 1 Prompt — Core Experience Defects

```
You are implementing three targeted defect fixes on MauiMusicLessons. Read the following
files before writing a single line of code:

  Audit Phase/implementation-brief.md
  Audit Phase/completion-report.md
  src/components/AboutAaron/AboutAaron.tsx
  src/components/AboutAaron/AboutAaron.css
  src/components/BeachLessons/BeachLessons.tsx
  src/components/BeachLessons/BeachLessons.css
  src/components/BookingSection/BookingSection.tsx
  src/components/BookingSection/BookingSection.css

Do not begin implementation until you have read all eight files and understand the
existing architecture of each component. Do not make assumptions about how components
are structured — inspect first.

---

DEFECT 1 — About Aaron: Chapter image readiness

The problem: When a user navigates to a new chapter in About Aaron, the CSS immediately
applies opacity:1 to the incoming chapter's background image via the --active class,
regardless of whether the image has finished loading. The CSS transition is 0.5s. If the
image has no pixel data yet, the element renders as a black rectangle for the duration
of the transition and beyond. This has been confirmed via DOM measurement for Chapter 3,
Focus, internal index 2, aaron-playing-2.jpg (naturalWidth=0 at transition time).
The mechanism is shared across all chapter transitions.

Required outcome:
- A chapter background must not become visibly black due to image unreadiness.
- Investigate the loading and decode state of each image at the moment a chapter
  transition is triggered. Choose an approach based on what you observe.
- Do not solve this by setting loading="eager" on all four chapter images at page load.
  Four 2200px JPEGs loaded eagerly would significantly increase initial page weight.
- Preserve the existing 0.5s CSS crossfade, drag behavior, keyboard navigation,
  prev/next button behavior, hint animation, and chapter count display.
- Preserve all reduced-motion behavior exactly as implemented.
- The solution must not introduce a visible delay, layout shift, or broken chapter
  navigation under any chapter-switching speed.
- The solution must work for rapid successive chapter navigation, not just sequential.

Candidate directions to investigate (do not treat as prescriptions):
  - Wait for the incoming image to be complete before applying --active, using the
    image's load event or checking img.complete.
  - Preload the next adjacent chapter image when a chapter becomes active.
  - A combination: preload adjacent images, and guard the class switch on readiness.
  Evaluate which approach best balances image readiness with page load budget.
  Document your reasoning in the completion report.

Acceptance criteria:
  - Fresh desktop Chrome first-visit: navigate from Chapter 1 to Chapter 2 to Chapter 3
    to Chapter 4 immediately, without waiting for images to load. No black rectangle
    appears at any chapter transition.
  - Repeat on a throttled connection (DevTools Network: Slow 3G) to confirm the guard
    holds under slow load conditions.
  - All four chapter backgrounds ultimately display correctly.
  - Keyboard chapter navigation and drag navigation produce the same result.
  - Reduced-motion mode: all chapters display correctly without animation.
  - No new eager-loading of all four images at initial page load.

---

DEFECT 2 — Beach Lessons: Video loading and playback reliability

The problem: In a fresh desktop Chrome session, the Beach video (aaron-ukelele-vid.mp4)
remained at readyState=0 with zero bytes buffered, zero events fired (including
loadstart), and no resource entry in the Performance API. The video region showed a
black rectangle. The video element has autoPlay, muted, loop, playsInline, and
preload="metadata". The mp4 is faststart-encoded with the moov atom at byte 32.
There is no IntersectionObserver and no programmatic play() call in the current source.

The root cause is not fully isolated. The symptom is confirmed. The cause may be
Chrome's off-screen media loading heuristic, the autoplay policy for low-engagement
origins, preload="metadata" behavior, or a combination of these.

Required outcome:
  - Ensure the video begins loading early enough to be playable when a visitor reaches
    or approaches the Beach section.
  - Preserve the existing autoPlay intent, muted initial state, loop, playsInline,
    pause control (WCAG 2.2.2), mute control, and reduced-motion behavior.
  - The visitor must not see an unexplained blank black panel. If the video is not yet
    playable when the section enters view, handle that state intentionally and visibly.
  - Do not force the full 14.3MB video into the critical initial page load unless
    validation proves that is necessary and acceptable.
  - Treat any loading approach as a hypothesis to be tested, not a guaranteed fix.
    Document what you tried and what the result was.

Investigation required before implementation:
  - Read BeachLessons.tsx fully. Understand how the video element is rendered,
    what controls exist, and what the current pause/play state management does.
  - Examine the current preload attribute and consider what Chrome does with it for
    off-screen elements.
  - Consider whether an IntersectionObserver that triggers load or play when the
    section enters the viewport would be appropriate and safe.
  - Consider whether changing preload affects the pause/play toggle behavior, the
    muted state, or the reduced-motion path.

Acceptance criteria:
  - Fresh desktop Chrome session: scroll to the Beach section at normal speed. Video
    begins playing (or is actively loading and begins playing within 1–2 seconds of
    the section entering view).
  - No black rectangle is visible to the visitor in normal use.
  - Pause and mute controls continue to function correctly.
  - Reduced-motion mode: video remains paused, no autoplay.
  - Loop behavior preserved.
  - Build passes without type errors.

Do not change the visual treatment, overlay, editorial layout, conversion row,
or CTA in BeachLessons. Do not modify any other component.

---

DEFECT 3 — Booking sent state: recovery path after mailto: handoff

The problem: The booking submission calls window.location.href = buildMailto(data),
which triggers the system mail client. It then advances to the sent/confirm state.
The sent state displays "Your email app should now have a draft addressed to Aaron."
There is no visible link, button, or instruction for what to do if the draft did
not open, or to confirm the visitor knows they must manually send the email.
A visitor who taps Send Lesson Request and sees the confirmation screen may believe
their request was sent, when it was only drafted.

Required outcome:
  - Make it unmistakably clear that the visitor must send the prepared email to
    complete the request. The sent state must not imply the request has already been
    received by Aaron.
  - Provide a visible, usable recovery path: a link or button that opens the same
    mailto: draft when tapped/clicked. The link must produce the same complete lesson
    request details as the automatic handoff — use buildMailto(data) for this.
  - Preserve the existing sent state tone and all existing text. Do not rewrite the
    confirmation headline, lesson summary, or payment method line.
  - Do not change the booking flow, step logic, selection architecture, price logic,
    or email construction.
  - The recovery path must be present in both the animated (conv step) and
    reduced-motion (conv--reduced) sent state renders.
  - Visual treatment must be consistent with the existing sent state's dark,
    editorial, cinematic tone. Do not introduce an element that reads as an error
    state or alarming warning.

Acceptance criteria:
  - Complete the Solo booking path to the sent state. Verify the recovery action is
    visible and tappable/clickable.
  - Click/tap the recovery link. Confirm it opens the mailto: draft with the correct
    pre-populated lesson details.
  - Confirm the existing inquiry status note, headline, lesson summary, and payment
    method text are unchanged.
  - Verify in reduced-motion mode that the recovery path is also present.
  - Verify at 375px and 390px mobile widths that the sent state and recovery path
    are readable and usable without overflow or clipping.

---

MUST NOT CHANGE — for all three defects:
  - No redesigns of any section.
  - No changes to copy, narrative, or content outside the specific sent state addition.
  - No new dependencies, animation libraries, or state management abstractions.
  - No unrelated source file edits.
  - No fabricated content, testimonials, phone numbers, or Aaron-related claims.
  - No changes to SectionHandoff, CinematicPanel, CinematicEntry, Navbar, Footer,
    Hero, WeeklyLessons, or SeoContent.
  - No changes to utility files (animation.ts, scroll.ts, assets.ts) unless
    absolutely required by a specific defect fix and documented with a reason.

---

Completion report required:
  After finishing all three defects, provide a report in this format:

  Files changed: [list each file and what changed]
  Validation performed: [list every test performed and its result]
  Chapter image approach: [explain the chosen approach and why]
  Video loading approach: [explain the chosen approach, what was tested, and result]
  Remaining limitations: [anything not fully resolved]
  Items requiring user input: [if any]
  Build status: [confirm npm run typecheck and npm run build pass]
```

---

### Phase 2 Prompt — Accessibility and Touch Target Compliance

```
You are implementing accessibility and touch target fixes on MauiMusicLessons.
Read the following files before writing a single line of code:

  Audit Phase/implementation-brief.md
  Audit Phase/completion-report.md
  src/components/Hero/Hero.tsx
  src/components/BeachLessons/BeachLessons.tsx
  src/components/BeachLessons/BeachLessons.css
  src/components/WeeklyLessons/WeeklyLessons.tsx
  src/components/AboutAaron/AboutAaron.tsx
  src/components/SeoContent/SeoContent.tsx (or equivalent)
  src/components/BookingSection/BookingSection.tsx
  src/components/BookingSection/BookingSection.css
  src/components/Navbar/Navbar.tsx (or equivalent)
  src/App.tsx

Do not begin implementation until you have read all relevant files and confirmed
the current structure of each landmark section and booking component.

---

FIX 1 — Landmark accessible names

Current state: The following landmark elements have no aria-label or aria-labelledby
attribute (confirmed via DOM inspection):
  - #hero (section) — no accessible name
  - #about (section) — no accessible name
  - #book (section) — no accessible name
  - main#main-content — no accessible name
  - nav — no accessible name
  - footer — no accessible name
  Note: The Beach section (section.beach) has aria-labelledby="beach-title-heading"
  pointing to "Ukulele by the Beach" — this is correct. Do not change it.

Required outcome:
  - Give each unlabeled landmark element a meaningful, site-specific accessible name
    using aria-label.
  - Names must describe the landmark's purpose clearly for a screen reader user
    navigating by region. Use natural, descriptive language.
  - Do not change anchor IDs (#hero, #about, #book). These are used by navbar
    scroll-to-section navigation and must remain unchanged.
  - Do not change visible text, visual layout, styling, or component structure.
  - The Weekly Lessons section, if it exists as a landmark, should also receive a
    meaningful label — inspect App.tsx and the WeeklyLessons component to determine
    its current landmark state and apply the same treatment if needed.

Acceptance criteria:
  - DOM inspection confirms aria-label is present and meaningful on all six currently
    unlabeled landmarks.
  - Anchor IDs are unchanged.
  - No visible text or layout has changed.
  - VoiceOver (macOS): navigate by landmark (VO+U, Landmarks rotor). All major
    sections are announced with a clear, distinct name.

---

FIX 2 — Booking back button accessible name

Current state: The .conv-back button has text content "← Back" and no aria-label.
Its accessible name is the same ("← Back" or the arrow character followed by "Back")
regardless of which booking step the user is on. Screen reader users cannot determine
where Back returns them.

Required outcome:
  - The back button must have a context-specific accessible name for every step in
    the booking flow. Examples: "Back to group size", "Back to instrument selection",
    "Back to duration", "Back to date and time". The exact labels should be natural
    and consistent with the step naming already used in the component.
  - The accessible name must update correctly as the user moves through steps.
  - The accessible name must be correct for both the beach-lesson and weekly-lesson
    booking paths, and for all group sizes (solo, duo, small group, larger group).
  - The visible button text "← Back" must remain unchanged.
  - The reduced-motion booking path (conv--reduced) does not use a back button —
    confirm this and apply no change there.
  - Do not change the button's visual appearance, position, or click behavior.

Implementation note: Read BookingSection.tsx fully before implementing. Understand
the step history stack (stepHistory) and how the current step is determined. The
step names are already defined — use them consistently. Use aria-label on the button
element, set dynamically based on the current step.

Acceptance criteria:
  - DOM inspection at each booking step confirms the aria-label matches the current
    step's return destination.
  - Tested for: solo path (all steps), one group path (confirm the label changes
    correctly at the who/instrument/when/contact steps).
  - VoiceOver announces a meaningful, step-specific name for the back button.
  - Visible button text is unchanged.

---

FIX 3 — Touch target sizing: date chips and video controls

Current state (confirmed via DOM measurement at desktop Chrome):
  - All .date-chip elements: height=36px (below 44px WCAG 2.5.5 minimum)
  - .beach__video-btn elements: 36×36px (below 44px×44px minimum)

Required outcome:
  - Bring both elements to at least 44px in their touch-target dimension.
  - Prefer CSS solutions (increased padding, min-height, min-width) over changing
    layout structure.
  - Desktop visual proportions must be preserved or improved — do not make the chips
    or buttons look oversized on desktop.
  - Mobile widths 375px, 390px, and 430px: date chip rows must not overflow, wrap
    unexpectedly, or clip. The booking card layout must remain intact.
  - The beach video controls overlay must remain visually coherent at both desktop
    and mobile widths after the button size increase.
  - Keyboard focus visibility must remain correct on both elements.
  - Selected state on date chips must remain visually distinct.
  - Do not change the booking flow logic, date chip selection behavior, or video
    control behavior.

Investigation required before implementation:
  - Read the current CSS for .date-chip and .beach__video-btn to understand how
    sizing is currently achieved (padding, height, width, etc.).
  - Check whether increasing padding is sufficient or whether min-height/min-width
    is needed.
  - Check whether the booking card has a fixed or constrained width that would
    cause chip row overflow if chip padding increases.

Acceptance criteria:
  - DOM measurement confirms both .date-chip and .beach__video-btn are at or above
    44px in height.
  - Booking card layout at 375px and 390px viewport: no horizontal overflow,
    no unexpected chip row wrapping.
  - Beach video controls overlay: visually acceptable at 1440px and 390px viewports.
  - Selected date chip state is visually distinct.
  - Focus rings are visible on both elements.

---

MUST NOT CHANGE — for all three fixes:
  - No redesigns of any section or component.
  - No changes to visible copy, booking logic, selection behavior, price calculation,
    or mailto construction.
  - No changes to routing, anchor IDs, or scroll-to-section behavior.
  - No changes to CinematicPanel, Hero, CinematicEntry, SectionHandoff, Footer,
    or WeeklyLessons (except landmark label addition if the weekly section is
    confirmed unlabeled — scope limited to aria-label attribute only).
  - No new animation libraries, state management abstractions, or dependencies.
  - No unrelated source file edits.

---

Completion report required:

  Files changed: [list each file and what changed]
  Landmark labels applied: [list each element and the aria-label value assigned]
  Back button labels: [list each step and the aria-label value]
  Touch target measurements before and after: [measured px for chips and video btn]
  Screen reader test performed: [describe the VoiceOver pass and results]
  Mobile layout verification: [describe the viewport widths tested and results]
  Remaining limitations: [anything not fully resolved]
  Items requiring user input: [if any]
  Build status: [confirm npm run typecheck and npm run build pass]
```

---

## 5. Deferred and Decision Required Items

### Real Device QA Required Before Release

| Item | What to Test | Blocking |
|---|---|---|
| iOS Safari video autoplay | Fresh first-visit: scroll to Beach at normal speed, confirm video plays. Source has correct attributes (autoPlay, muted, playsInline) but real device test has not been performed. | Yes |
| Chapter flash — Chapters 2, 3, 4 on first visit | Real first-visit on iOS: navigate all four chapters immediately without waiting for images. Confirm no black rectangle after Phase 1 fix is deployed. | Yes |
| Booking contact step — keyboard / CTA visibility | iOS Safari: complete booking through to contact step, open keyboard, confirm Send button is reachable and visible | Yes |
| Navbar contrast over variable scroll positions | Real device at 390px: scroll slowly through every section, inspect navbar legibility over lighter and darker image zones | Yes |
| About Aaron exit → CinematicEntry | Real device: slow-scroll through About Aaron into CinematicEntry. Confirm the transition reads as an authored chapter turn, not an unexplained dark interlude | Pre-mobile implementation |
| CinematicPanel scroll pacing | Real device: slow-scroll through beachEntry CinematicPanel. Confirm three-line staging reads as intentional beats | Pre-mobile implementation |
| Beach and Weekly exit fades | Real device: slow-scroll through Beach editorial and Weekly scene exits. Confirm opacity fade reads as choreography, not disappearance | Pre-mobile implementation |
| About Aaron rail label legibility | Real device at 390px: confirm chapter label text at 0.52rem is legible at arm's length | Nonblocking QA |
| iOS parallax throttling impact | Real device: fast-swipe through hero. Observe whether parallax and veil degradation are acceptable | Nonblocking QA |
| About Aaron safe-area inset | iPhone with home indicator: confirm rail and button positions are not obscured | Nonblocking QA |

---

### User Content or Business Decisions Required

| Item | Decision Needed |
|---|---|
| Social proof / testimonials | Provide 1–3 real student testimonials or a verified external review source (Google, TripAdvisor). Blocking on Conversion Readiness dimension. |
| Phone or text contact | Provide Aaron's confirmed phone or text number for Footer and booking sent state. Blocking on Conversion Readiness and Footer utility. |

---

### Creative Direction Decisions

| Item | Decision Needed |
|---|---|
| Custom serif typeface | Evaluate replacing Georgia with a variable-weight premium serif (Cormorant Garamond, EB Garamond, Playfair Display, or similar). Decision affects Art Direction, Perceived Polish, Originality scores significantly. No implementation until explicitly approved. |
| Weekly pull quote image treatment | Current filter (brightness 0.82, saturate 0.85) does not fully integrate aaron-teaching-1.jpg into the dark cinematic system. Options: (a) stronger filter (closer to Beach right-panel: brightness 0.58–0.74, saturate 0.56–0.62), (b) replace with a naturally darker existing image, (c) accept current treatment. No implementation until explicitly directed. |
| `text-wrap: balance` on cinematic lines | Apply to CinematicPanel, CinematicEntry, and hero headline to prevent orphan lines. Affects how line breaks fall — may conflict with intentional author choices. Confirm before implementing. |
| Primary button pressed/active state | No `:active` down-state is currently defined. Add transform, opacity, or color change on press. Design direction required. |
| CinematicPanel Line 3 wrap | "Just you, the ocean, and a song." wraps at "a song." as a short orphan line at desktop width. Whether this is intentional requires author confirmation before any text-wrap treatment. |
| Beach and Weekly exit fade aggressiveness | viewportProgress(0.0, -0.5) drives opacity to ~24% while content is still in viewport. If visual quality during genuine user scroll confirms this is too aggressive, widening the range to (0.2, -0.4) or similar would require user direction. Cannot change without first observing the actual transition during real scrolling. |

---

### Engineering or Tooling Decisions to Address After Approved Phases Complete

| Item | What Is Needed |
|---|---|
| WebP conversion and responsive srcset | Install `vite-plugin-image-optimizer` or run `cwebp` batch conversion. Requires tooling decision, workflow for updating image references, and srcset breakpoint strategy. Estimated +12 performance points. Address after Phase 2 is verified. |
| iOS Safari smooth scroll polyfill | `scrollIntoView({ behavior: 'smooth' })` is unreliable on iOS Safari < 15.4. Requires decision on whether to add a polyfill or implement a manual scroll fallback in `scrollToSection`. Address after real device QA identifies severity. |
| Booking flow weekly-student path | The booking form asks the same questions for tourists and recurring local students. If user decides to address the weekly narrative gap, a booking flow addition or copy change is needed. Not implementable without user direction on what a recurring student needs to communicate. |

---

## 6. Final Implementation Gate

**Claude Code may start Phase 1 immediately.** No additional information is required. The scope is fully specified. All required source files are identified.

**Claude Code may proceed to Phase 2** only after all Phase 1 acceptance criteria are verified in a fresh desktop Chrome session, including:
- Fresh first-visit chapter navigation through all four About Aaron chapters with no black rectangle
- Fresh first-visit scroll to Beach with confirmed video loading or intentional non-black loading state
- Solo booking path completed to sent state with visible recovery path confirmed functional
- All three defect areas verified in reduced-motion mode
- `npm run typecheck` and `npm run build` both pass cleanly

**The project may be considered implementation complete** (for confirmed desktop findings) after Phase 2 acceptance criteria are met, including:
- DOM inspection confirming all landmark labels
- DOM inspection confirming step-specific back button aria-labels across all booking paths
- Touch target measurement confirming date chips and video buttons at or above 44px
- VoiceOver landmark and back button announcement confirmed
- Mobile layout at 375px, 390px, 430px confirmed without overflow or clipping
- `npm run typecheck` and `npm run build` both pass cleanly

**Real iOS Safari QA must occur before release.** The seven items marked "Must verify before release" in the mobile verification table are not optional. Specifically: iOS Safari video autoplay, chapter flash on real first-visit touch interaction, booking contact step keyboard visibility, and navbar contrast over variable scroll positions must each be directly observed on a real device before the site is published to the public. These are not engineering gaps — they are verification requirements that cannot be substituted with desktop testing or CSS analysis.