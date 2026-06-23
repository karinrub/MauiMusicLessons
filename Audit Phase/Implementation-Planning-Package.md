# MauiMusicLessons — Implementation Planning Package
**Prepared:** June 22, 2026
**Updated:** June 22, 2026, after Phase 1 post-implementation verification
**For:** Claude Code
**Authority:** `audit-report-june2026.md` is the authoritative current audit. This planning package is derived from that report only. Older package content is superseded wherever it conflicts with the current audit.

---

## 1. Implementation Readiness Summary

**Ready for implementation now — Phase 2 findings only:**
1. About Aaron chapter image readiness risk, with `Chapter 3, Focus & Teaching, internal index 2, aaron-playing-2.jpg` confirmed as the readiness-risk case.
2. Desktop Chrome Beach video loading symptom, root cause unverified, with post-change validation required.

**Completed in Phase 1 for tested Chromium mobile emulation:**
1. Hero secondary CTA reaches Beach Lessons at 375×812, 390×844, and 430×932, with the Beach heading visible below the fixed navbar.
2. Weekly editorial-to-scene handoff no longer creates the previously observed large 390×844 dark interval in Chromium mobile emulation.
3. About Aaron mobile menu anchor entry now lands with the rail and chapter navigation buttons visible without user scrolling.
4. Mobile touch target sizing for the hamburger, Booking Back button, footer navigation controls, and footer email link now meets the intended 44px primary dimension in Chromium mobile measurements.

**Evidence scope for implementation:**
- The completed Phase 1 Hero CTA, Weekly handoff, About anchor entry, and target-size results are verified in Chromium mobile emulation only. Do not present them as real iPhone Safari findings.
- The Beach video issue is a desktop Chrome symptom. The same symptom was not reproduced through the tested Chromium mobile menu path, where the video reached readyState=4 and played.
- The About chapter image issue is a technical readiness risk. A later direct 390×844 chapter sequence loaded images before activation and did not show a visible blank flash. Do not describe every chapter as visually flashing.
- Real iOS Safari, real touch ergonomics, screen reader announcements, and normal mail-client behavior remain release QA boundaries.

**Intentionally excluded from implementation — resolved, superseded, unsupported, or not ready:**
- CinematicPanel Line 2 dim opacity: resolved, superseded, or unsupported by current source and DOM measurement.
- Missing About Aaron exit choreography: resolved, superseded, or unsupported; an exit handler exists in current source.
- Date chip and Beach video control target sizes: resolved for current mobile DOM; both now measure 44px.
- Landmark labels and Booking Back accessible names: resolved for current DOM; screen reader confirmation remains release QA only.
- Booking sent state recovery path: resolved in current source with manual-send guidance and `Open email draft again`; normal mail-client behavior remains release QA only.
- CinematicPanel pacing quality, Beach exit fade quality, About exit/CinematicEntry visual quality, and broad Weekly exit quality outside the confirmed 390×844 handoff: not implementation-ready without real touch observation.
- Typography, visual direction, Weekly pull quote treatment, social proof, phone/text contact, WebP/srcset, navbar contrast, and other content, business, tooling, or creative direction items.

**Require user decisions before implementation:**
- Custom serif typeface (Georgia vs. premium variable-weight serif)
- Weekly pull quote image treatment (stronger filter vs. image replacement vs. accept current state)
- Social proof / testimonials (content dependency)
- Phone or text contact (data dependency)
- WebP conversion and responsive srcset strategy (tooling and workflow decision)
- `text-wrap: balance` on cinematic lines (creative copy decision — affects line breaks intentionally set by the author)
- Primary button pressed/active state (interaction design decision)

**Remain release QA requirements — not implementation claims:**
- Hero secondary CTA behavior in real iOS Safari.
- Weekly handoff severity under real touch scrolling.
- About Aaron anchor entry, safe-area clearance, and touch usability in real iOS Safari.
- Practical tap reliability for the resized Phase 1 mobile targets.
- iOS Safari video autoplay behavior.
- First-visit About chapter transitions on real iOS Safari.
- Booking contact step with virtual keyboard on real iOS Safari.
- Final booking mailto handoff and fallback link in a normal browser/mail-client environment.
- Landmark and Booking Back screen reader announcements.
- Navbar contrast over variable imagery at mobile width.

---

## 2. Full Audit Finding Disposition Table

| Audit Finding | Current Status | Evidence Basis | Implementation Decision | Reason |
|---|---|---|---|---|
| Hero secondary CTA `See lesson options ->` fails to reach Beach Lessons at 390×844 | Resolved for tested Chromium mobile emulation after Phase 1 | Post-implementation DOM measurement and browser observation: CTA reaches Beach at 375×812, 390×844, and 430×932 with Beach heading visible below fixed navbar | Completed — Phase 1 | No active implementation work remains for Chromium mobile. Real iOS Safari behavior remains release QA. |
| Weekly editorial-to-scene handoff creates visible dark interval at 390×844 | Resolved for tested Chromium mobile emulation after Phase 1 | Post-implementation screenshot observation and DOM measurement: at comparable 390×844 handoff, `.weekly__editorial` opacity=1 and content remains visible; no large dark interval occupies the viewport | Completed — Phase 1 | No active implementation work remains for the tested Chromium mobile handoff. Real touch/iOS severity remains release QA. |
| About Aaron rail and controls below viewport after mobile menu About entry | Resolved for tested Chromium mobile emulation after Phase 1 | Post-implementation DOM measurement: rail and chapter buttons visible without scrolling at 375×812, 390×844, and 430×932; Next advances to Chapter 2 | Completed — Phase 1 | No active implementation work remains for Chromium mobile. Real iOS safe-area and touch usability remain release QA. |
| Touch targets — hamburger, Booking Back, footer navigation controls, footer email link | Resolved for tested Chromium mobile emulation after Phase 1 | Post-implementation DOM measurement across tested mobile viewports: hamburger 44×44px; Booking Back ≈59.56×44px; footer nav controls 44px high; footer email ≈199.45×44px | Completed — Phase 1 | No active implementation work remains for Chromium mobile dimensions. Practical thumb ergonomics remain release QA. |
| Chapter 3, Focus & Teaching, internal index 2, aaron-playing-2.jpg — image readiness risk | Ready now | DOM measurement: initial complete=false and naturalWidth=0; later 390×844 sequence did not visibly flash | Included — Phase 2 | Confirmed technical risk with likely visible impact. Implementation should address readiness mechanism without claiming universal visible flash. |
| Beach video — black rectangle, no playback on desktop Chrome | Ready now | DOM measurement, Network observation, Source verification: readyState=0, zero buffered bytes, no resource entry, zero events fired | Included — Phase 2 | Confirmed desktop Chrome symptom, root cause unverified. Do not prescribe root cause; post-change validation is required. |
| Beach video mobile playback path | Resolved, superseded, or unsupported as mobile defect | Direct browser observation and DOM measurement in Chromium mobile emulation: mobile menu path reached readyState=4, paused=false, buffered playback visible | Excluded as mobile defect | Do not treat the desktop symptom as universal mobile failure. iOS Safari autoplay remains release QA. |
| About Aaron Chapter 2 and Chapter 4 visible flash | Requires real device verification | DOM measurement showed complete=false with naturalWidth=2200; visible result not observed | Excluded as standalone implementation finding | Shared readiness mechanism can be covered by the Chapter 3 risk; visible flash not independently confirmed. |
| Booking sent state: no visible recovery path after mailto handoff | Resolved, superseded, or unsupported | Source verification in current audit: manual-send instruction and `Open email draft again` recovery link present; final handoff blocked by audit environment | Excluded | No longer an active implementation defect. Normal mail-client handoff/fallback behavior remains release QA. |
| Landmark sections missing accessible names | Resolved, superseded, or unsupported | DOM measurement: meaningful landmark labels present on navigation, main, footer, and sections | Excluded | No longer an active implementation defect. Screen reader announcement remains release QA. |
| Booking back button missing context-specific accessible name | Resolved, superseded, or unsupported | DOM measurement: contextual labels present (`Back to who's joining`, `Back to instrument selection`, `Back to lesson duration`, `Back to preferred day and time`) | Excluded | No longer an active implementation defect. Screen reader announcement remains release QA. |
| Date chip tap targets below 44px | Resolved, superseded, or unsupported | DOM measurement: current date chips measure 44px high | Excluded | No current implementation action. |
| Beach video controls below 44px | Resolved, superseded, or unsupported | DOM measurement: current Beach video controls measure 44×44px | Excluded | No current implementation action. |
| CinematicPanel Line 2 "No pressure." at ~20–25% opacity when Line 1 fully revealed | Resolved, superseded, or unsupported | Source verification + DOM measurement: not producible by current timing constants | Excluded | Current audit removed this from active backlog. |
| About Aaron exit choreography absent | Resolved, superseded, or unsupported | Source verification: exit handler confirmed in current source | Excluded | Current audit removed this from active backlog. |
| Beach editorial exit fade quality | Source verified behavior, visual quality unverified | Source verification only; genuine real-touch scroll not observed | Excluded | Not implementation-ready. |
| Weekly exit fade quality outside the confirmed 390×844 handoff defect | Source verified behavior, visual quality unverified | One confirmed mobile defect exists, but broad generalization across viewports/browsers is not supported | Excluded | Only the 390×844 editorial-to-scene dark interval is implementation-ready. |
| About Aaron exit → CinematicEntry transition visual quality | Source verified behavior, visual quality unverified | Exit mechanism confirmed; real-touch visual quality not observed | Excluded | Not implementation-ready. |
| CinematicPanel pacing / dark-screen gaps | Source verified behavior, visual quality unverified | Timing inference only; real-touch visual quality not observed | Excluded | Not implementation-ready. |
| Weekly pull quote image (aaron-teaching-1.jpg) insufficient filter treatment | Requires user decision | Visual quality finding from audit; creative direction call | Excluded | Requires user direction on filter strength vs. image replacement vs. accepting current state |
| Custom serif typeface — Georgia ceiling | Requires user decision | Audit assessment; creative direction decision | Excluded | Requires explicit user direction before any typeface change; high-impact, high-risk |
| `text-wrap: balance` on cinematic lines | Requires user decision | Typography detail finding; may conflict with intentional line breaks | Excluded | Author may have set line breaks intentionally; needs user confirmation before applying balance |
| Social proof / testimonials absent | Business, content, or tooling dependency | Confirmed data dependency throughout audit | Excluded | No real testimonial content available; cannot fabricate |
| Phone / text contact absent | Business, content, or tooling dependency | Confirmed data dependency | Excluded | Requires Aaron's confirmed contact number |
| WebP conversion and responsive srcset | Business, content, or tooling dependency | Current audit classifies this as a tooling/workflow dependency, not an approved implementation item | Excluded | Requires tooling and workflow decision before implementation |
| Navbar contrast over variable scroll positions (WCAG 1.4.3) | Requires real device verification | Pixel-level contrast measurement not performed | Excluded | Release QA / measurement boundary, not implementation-ready. |
| About Aaron rail label text at ~8.32px in mobile emulation | Requires real device verification | DOM measurement in Chromium mobile emulation; real touch/visual legibility not verified | Excluded | Release QA boundary, not implementation-ready as a standalone defect. |
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

### Phase 1 — Chromium Mobile Experience Defects — Completed
**Goal:** Address the four mobile findings that were implementation-ready before Phase 1: Hero secondary CTA anchor failure, Weekly editorial-to-scene dark interval, About Aaron mobile anchor-entry composition, and undersized mobile targets.

**Post-implementation status:** Completed and verified in a fresh Chromium browser session using the specified mobile emulation viewports. This completion is not a real iPhone Safari or real touch claim.

**Included work:**
- Hero secondary CTA failing to reach Beach Lessons at 390×844.
- Weekly editorial-to-scene visible dark interval at 390×844.
- About Aaron mobile menu anchor entry leaving rail and previous/next controls below the initial viewport at tested mobile widths.
- Mobile touch target sizing for hamburger, Booking Back button, footer navigation controls, and footer email link.

**Dependencies:** None confirmed by the audit. Investigate each issue from current source before making changes.

**Risks to preserve against:**
- Do not turn Chromium mobile emulation findings into real iOS Safari claims.
- Do not change anchor IDs, visible section copy, lesson content, pricing, booking logic, or mailto construction.
- Do not remove or simplify cinematic sections to avoid the mobile defects.
- Do not treat broad motion pacing, visual direction, or typography questions as part of this phase.
- Do not reintroduce page-level horizontal overflow at 375×812, 390×844, or 430×932.
- Do not reduce existing working target sizes for date chips or Beach video controls.

**Verification completed before Phase 2:**
- Chromium mobile emulation at 375×812, 390×844, and 430×932: `See lesson options ->` reaches Beach Lessons. After scrolling completes, the Beach section heading is visible below the fixed navbar.
- Chromium mobile emulation at 390×844: slow-scroll through Weekly editorial-to-scene handoff showed the previously observed large dark interval resolved for the tested handoff state; 375×812 and 430×932 regression checks found no new clipping, overlap, layout collapse, or horizontal overflow.
- Chromium mobile emulation at 375×812, 390×844, and 430×932: after mobile menu navigation to About, the rail and chapter navigation buttons are visible without user scrolling.
- DOM measurement at tested mobile widths: hamburger, Booking Back button, footer navigation controls, and footer email link meet the intended 44px primary touch dimension.
- Regression check at 375×812, 390×844, and 430×932: no page-level horizontal overflow, clipped primary hero content, overlapping controls, or booking layout collapse observed.
- Focus-visible and reduced-motion rules remain present in source; keyboard focus traversal could not be directly exercised by the automation surface and remains part of real-device/browser QA.

---

### Phase 2 — Media and Chapter Readiness Risks
**Goal:** Address the two remaining implementation-ready technical risks: About Aaron chapter image readiness and the desktop Chrome Beach video loading symptom.

**Included work:**
- About Aaron chapter image readiness guard, scoped to the lazy-loaded chapter background mechanism. `Chapter 3, Focus & Teaching, internal index 2, aaron-playing-2.jpg` is the confirmed readiness-risk case.
- Desktop Chrome Beach video loading symptom, with root cause unverified and post-change validation required.

**Dependencies:** Phase 1 should be verified first so mobile layout changes do not mask or complicate media/chapter validation.

**Risks to preserve against:**
- Do not claim a universal visible chapter flash. The current audit confirms a readiness risk and inconsistent visual outcome, not a consistently reproduced flash.
- Do not eager-load all four 2200px chapter images at initial page load unless investigation proves it is necessary and acceptable.
- Preserve chapter crossfade, drag behavior, keyboard navigation, previous/next controls, hint behavior, chapter count, and reduced-motion behavior.
- Do not claim the Beach video root cause is known. The audit says root cause is unverified.
- Do not treat the Beach video symptom as a universal mobile defect. Chromium mobile menu navigation played the video.
- Preserve current pause/play control, mute control, loop, playsInline behavior, and reduced-motion behavior.
- Do not force the full 14.3MB video into critical initial load unless validation proves that is necessary and acceptable.

**Required verification before declaring implementation complete:**
- Fresh desktop Chrome: scroll to About Aaron and navigate all four chapters immediately; confirm no blank or black chapter background appears during activation.
- Chromium mobile emulation at 390×844: repeat direct chapter navigation sequence and confirm no visible blank or black chapter background appears.
- Reduced-motion mode: confirm chapter backgrounds display correctly without motion-dependent blank states.
- Fresh desktop Chrome: scroll to Beach at normal speed and confirm the video begins loading and plays, or confirm an intentional non-black loading state is visible until playback is possible.
- Network/DOM observation after video work: document readyState, buffered state, relevant events, and whether a resource request is initiated.
- Reduced-motion mode: confirm video behavior respects reduced-motion intent and does not autoplay if current reduced-motion behavior prevents it.
- Build/typecheck pass.

---

## 4. Claude Code Prompts

---

### Phase 1 Prompt — Chromium Mobile Experience Defects

**Status:** Executed and verified for tested Chromium mobile emulation. This prompt is retained as historical implementation scope and should not be rerun unless later regression evidence reopens Phase 1.

```
You are implementing four targeted mobile experience fixes on MauiMusicLessons.
Use Audit Phase/audit-report-june2026.md as the authoritative audit. Do not use older
audit package findings to expand scope.

Approved Phase 1 scope only:
  1. Hero secondary CTA `See lesson options ->` fails to reach Beach Lessons at
     390×844 in Chromium mobile emulation.
  2. Weekly editorial-to-scene handoff creates a visible dark interval at 390×844
     in Chromium mobile emulation.
  3. About Aaron mobile menu anchor entry leaves the rail and previous/next controls
     below the initial viewport.
  4. Hamburger, Booking Back button, footer navigation controls, and footer email
     link are below the intended 44px mobile touch target dimension.

Do not implement anything outside those four findings. In particular, do not change
landmark labels, Booking Back accessible names, date chips, Beach video controls,
booking sent state recovery, typography, social proof, WebP/srcset, phone/text contact,
CinematicPanel pacing, or About Aaron exit choreography.

---

FIX 1 — Hero secondary CTA to Beach

Current evidence:
  - At 390×844, selecting `See lesson options ->` from the Hero stopped around
    scrollY=376.
  - Beach remained approximately 2232px below the viewport.
  - DOM expectation indicated the intended target was approximately scrollY=2516,
    based on offsetTop=2608 and scroll-margin-top=92px.
  - The primary `BOOK A LESSON` CTA worked.
  - Evidence is Chromium mobile emulation only, not real iOS Safari.

Required outcome:
  - The secondary Hero CTA must navigate to the intended Beach Lessons target in
    Chromium mobile emulation at 390×844.
  - Preserve the primary `BOOK A LESSON` behavior.
  - Preserve anchor IDs and existing visible CTA copy.
  - Do not assume root cause without inspecting the current source and DOM behavior.

Acceptance criteria:
  - At 390×844 Chromium mobile emulation, select `See lesson options ->`; scrolling
    completes with the Beach section heading or first intended Beach content visible
    below the fixed navbar.
  - At 375×812 and 430×932, the same CTA does not stop near the Hero or leave Beach
    far below the viewport.
  - Primary `BOOK A LESSON` still reaches Booking.
  - No page-level horizontal overflow is introduced.

---

FIX 2 — Weekly editorial-to-scene dark interval

Current evidence:
  - At 390×844, slow scrolling from Weekly editorial content into the scene handoff
    showed a large dark interval occupying most of the viewport.
  - `.weekly__editorial` still occupied approximately top=-488 to bottom=721 but
    opacity was 0.
  - `.weekly__scene` began around top=721.
  - Screenshot reference: S5 weekly dark interval.
  - Evidence is Chromium mobile emulation only; real touch severity is release QA.

Required outcome:
  - Reduce or eliminate the confirmed large dark interval at the 390×844 Weekly
    editorial-to-scene handoff.
  - Preserve Weekly content, CTA behavior, and the pull quote scene.
  - Do not generalize this into a broad motion-system rewrite.
  - Do not alter unrelated CinematicPanel pacing, About exit choreography, typography,
    or image art direction.

Acceptance criteria:
  - At 390×844 Chromium mobile emulation, slow-scroll through Weekly editorial into
    the scene and confirm the previous large dark interval no longer occupies most
    of the viewport.
  - Verify at 375×812 and 430×932 that the handoff does not create new clipping,
    overlap, or layout collapse.
  - Confirm no page-level horizontal overflow is introduced.

---

FIX 3 — About Aaron mobile anchor entry

Current evidence:
  - At 390×844, entering About Aaron through the mobile menu showed chapter content
    but placed the chapter rail and previous/next controls below the visible viewport.
  - Rail and controls began around 865.67px, beyond the 844px viewport.
  - Same risk was measured at 375×812 and 430×932.
  - Screenshot reference: S6 About initial.
  - Chapter labels measured about 8.32px tall, but label legibility is a separate
    real-device QA boundary, not the implementation scope here.

Required outcome:
  - After mobile menu navigation to About, at least one obvious chapter navigation
    control and the rail or a clear chapter navigation affordance must be visible
    without user scrolling at 375×812, 390×844, and 430×932.
  - Preserve chapter navigation, drag behavior, keyboard behavior, chapter count,
    reduced-motion behavior, and visible narrative content.
  - Do not claim or attempt to resolve real iPhone safe-area behavior without real
    device testing.

Acceptance criteria:
  - At 375×812, 390×844, and 430×932 Chromium mobile emulation, open the mobile menu,
    select About, and confirm the rail and previous/next controls are not below the
    initial viewport.
  - Chapter navigation still works by controls, drag/pointer where supported, keyboard,
    and reduced-motion mode.
  - No new overlap, clipping, horizontal overflow, or content loss.

---

FIX 4 — Mobile touch target sizing

Current evidence:
  - Mobile hamburger: approximately 38×38.5px.
  - Booking Back button: approximately 51.56×37.5px.
  - Footer navigation controls: approximately 16.5px high.
  - Footer email link: approximately 23.93px high.
  - Current date chips are 44px high.
  - Current Beach video controls are 44×44px.
  - Evidence is DOM measurement in Chromium mobile emulation; real thumb ergonomics
    remains release QA.

Required outcome:
  - Bring the hamburger, Booking Back button, footer navigation controls, and footer
    email link to the intended 44px primary touch dimension.
  - Preserve visible labels, navigation behavior, booking Back behavior, footer
    destination behavior, and current focus visibility.
  - Do not modify date chip sizing or Beach video control sizing except to preserve
    their already-resolved 44px dimensions.

Acceptance criteria:
  - DOM measurement at 375×812, 390×844, and 430×932 confirms target dimensions at
    or above 44px for the four undersized target groups.
  - Booking Back remains visually clear and functionally correct at every applicable
    booking step.
  - Mobile menu still opens, closes, and navigates correctly.
  - Footer nav and email link remain readable and usable without overlap or clipping.
  - No page-level horizontal overflow is introduced.

---

MUST NOT CHANGE — for all Phase 1 work:
  - No redesigns of any section.
  - No changes to copy, narrative, prices, testimonials, contact details, or booking
    mailto content.
  - No new dependencies, animation libraries, or state management abstractions.
  - No unrelated source file edits.
  - No fabricated content, testimonials, phone numbers, or Aaron-related claims.
  - No changes to resolved landmark labels, resolved Booking Back accessible names,
    resolved booking sent-state recovery, resolved date chip sizing, or resolved
    Beach video control sizing.

---

Completion report required:
  After finishing Phase 1, provide a report in this format:

  Files changed: [list each file and what changed]
  Validation performed: [list every test performed and its result]
  Hero CTA result: [390×844 plus 375×812 and 430×932 results]
  Weekly handoff result: [before/after evidence at 390×844]
  About anchor result: [375×812, 390×844, 430×932 results]
  Touch target measurements: [before/after dimensions for hamburger, Booking Back,
    footer nav, footer email]
  Remaining limitations: [anything not fully resolved]
  Release QA still required: [real iOS Safari / real touch checks not completed]
  Build status: [confirm npm run typecheck and npm run build pass]
```

---

### Phase 2 Prompt — Media and Chapter Readiness Risks

```
You are implementing two targeted media/readiness fixes on MauiMusicLessons.
Use Audit Phase/audit-report-june2026.md as the authoritative audit. Do not use older
planning package findings to expand scope.

Approved Phase 2 scope only:
  1. About Aaron chapter image readiness risk.
  2. Desktop Chrome Beach video loading symptom, root cause unverified.

Do not implement anything outside those two findings. In particular, do not change
Booking sent state recovery, landmark labels, Booking Back accessible names, date chips,
Beach video control dimensions, Hero CTA behavior, Weekly handoff, About anchor layout,
typography, image art direction, WebP/srcset, phone/text contact, or social proof.

---

FIX 1 — About Aaron chapter image readiness

Current evidence:
  - Initial inspection found Chapter 3, Focus & Teaching, internal index 2,
    aaron-playing-2.jpg with complete=false and naturalWidth=0.
  - The CSS activation mechanism can show an unreadied active image.
  - In a later direct 390×844 chapter navigation sequence, all chapter images were
    loaded before activation and no visible blank flash occurred.
  - Therefore this is a technical readiness risk with inconsistent visible outcome,
    not a visually confirmed universal flash defect.

Required outcome:
  - A chapter background should not become visibly blank or black because the incoming
    image is not ready.
  - Investigate image loading/decode state and choose an approach based on current
    source behavior.
  - Preserve chapter crossfade, drag behavior, keyboard navigation, previous/next
    controls, hint behavior, chapter count, reduced-motion behavior, and image payload
    discipline.
  - Do not solve this by eagerly loading every 2200px chapter image at initial page
    load unless investigation proves it is necessary and acceptable.

Acceptance criteria:
  - Fresh desktop Chrome first visit: navigate Chapter 1 → Chapter 2 → Chapter 3 →
    Chapter 4 immediately after entering About; no blank or black chapter background
    appears.
  - Chromium mobile emulation at 390×844: repeat direct chapter navigation sequence;
    no blank or black chapter background appears.
  - Reduced-motion mode: all chapters display correctly.
  - Rapid successive chapter navigation does not leave text or background in a stuck
    hidden state.
  - No new eager initial load of all four 2200px chapter images unless explicitly
    justified by measured validation.

---

FIX 2 — Desktop Chrome Beach video loading symptom

Current evidence:
  - In desktop Chrome, the Beach video remained readyState=0 with zero buffered bytes.
  - No video resource entry appeared in Performance Resource Timing.
  - No relevant video events fired across the observed period.
  - The mp4 itself is reachable and faststart-encoded.
  - The root cause is unverified.
  - Chromium mobile menu navigation to Beach did not reproduce the symptom; the video
    reached readyState=4, paused=false, buffered, and played.

Required outcome:
  - Improve desktop Chrome loading/playback reliability or provide an intentional
    non-black loading state if playback is not yet possible.
  - Treat any loading approach as a hypothesis to validate, not a guaranteed fix.
  - Preserve autoPlay intent, muted initial state, loop, playsInline, pause/play
    control, mute control, existing control dimensions, and reduced-motion behavior.
  - Do not claim the root cause is solved unless validation proves it.
  - Do not convert the desktop symptom into a universal mobile defect.

Acceptance criteria:
  - Fresh desktop Chrome: scroll to Beach at normal speed and confirm the video
    begins loading and plays, or an intentional non-black loading state is visible
    until playback is possible.
  - DOM/network observation records readyState, buffered state, video events, and
    resource request behavior after the change.
  - Pause/play and mute controls still function.
  - Reduced-motion behavior remains correct.
  - Chromium mobile emulation at 390×844 via mobile menu still plays video and keeps
    controls at 44×44px.

---

MUST NOT CHANGE — for all Phase 2 work:
  - No redesigns of any section or component.
  - No changes to visible copy, booking logic, selection behavior, price calculation,
    mailto construction, landmark labels, Booking Back accessible names, or mobile
    touch target sizing outside preserving existing resolved states.
  - No new animation libraries, state management abstractions, or dependencies.
  - No unrelated source file edits.
  - No fabricated content, testimonials, phone numbers, or Aaron-related claims.

---

Completion report required:
  After finishing Phase 2, provide a report in this format:

  Files changed: [list each file and what changed]
  Chapter image approach: [explain the chosen approach and why]
  Video loading approach: [explain the hypothesis, what changed, and what was tested]
  Validation performed: [list every desktop/mobile/reduced-motion/network check]
  Remaining limitations: [anything not fully resolved]
  Release QA still required: [iOS Safari, real touch, normal mail-client checks not completed]
  Build status: [confirm npm run typecheck and npm run build pass]
```

---

## 5. Deferred and Decision Required Items

### Real Device QA Required Before Release

| Item | What to Test | Blocking |
|---|---|---|
| Hero secondary CTA to Beach | Real iPhone Safari: select `See lesson options ->` from Hero and confirm whether it reaches Beach Lessons | Yes |
| Weekly editorial-to-scene dark interval | Real iPhone Safari: slow-scroll Weekly editorial into scene at 390px-equivalent width; assess whether the dark interval is visible and disruptive | Yes |
| About Aaron anchor entry and safe area | Real iPhone Safari: use mobile menu to enter About; confirm rail/control discoverability and safe-area clearance | Yes |
| Undersized mobile targets | Real device: interact with hamburger, Booking Back, footer nav controls, and footer email; assess practical tap reliability after implementation | Yes |
| iOS Safari video autoplay | Fresh first-visit: navigate to Beach through menu and normal scroll; observe whether video autoplays, begins loading, or remains blank | Yes |
| Chapter image transitions — first visit touch sequence | Real first-visit on iOS: navigate all four chapters immediately after arriving at About; observe for black rectangles or blank states after implementation | Yes |
| Booking contact step — keyboard / CTA visibility | iOS Safari: complete booking through contact step, open keyboard, confirm Send button is reachable and visible | Yes |
| Booking final mailto handoff and fallback link | Normal browser/device mail client: submit booking, verify draft opens, manual-send guidance appears, and `Open email draft again` works | Yes |
| Landmark and Back label screen reader behavior | VoiceOver on iOS or macOS: verify landmark rotor names and contextual Back button announcements | Yes |
| Navbar contrast over variable scroll positions | Real device at 390px: scroll slowly through every section, inspect navbar legibility over lighter and darker image zones | Yes |
| About Aaron exit → CinematicEntry | Real device: slow-scroll through About Aaron into CinematicEntry. Confirm transition quality before treating it as an implementation defect | Pre-mobile implementation |
| CinematicPanel scroll pacing | Real device: slow-scroll through beachEntry CinematicPanel. Confirm three-line staging before treating pacing as an implementation defect | Pre-mobile implementation |
| Hero parallax / veil on iOS swipe | Real device: fast-swipe through hero; observe whether parallax or veil behavior is disruptive | Nonblocking QA |

---

### User Content or Business Decisions Required

| Item | Decision Needed |
|---|---|
| Social proof / testimonials | Provide 1–3 real student testimonials or a verified external review source (Google, TripAdvisor). Blocking on Conversion Readiness dimension. |
| Phone or text contact | Provide Aaron's confirmed phone or text number if a faster contact path is desired. Blocking on Conversion Readiness and Footer utility. |

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
| WebP conversion and responsive srcset | Tooling and workflow decision required. Excluded from approved implementation scope. |
| iOS Safari smooth scroll fallback | Only consider after real iOS Safari QA confirms the Hero secondary CTA problem exists on Safari and requires a Safari-specific approach. |
| Booking flow weekly-student path | Requires user direction on recurring-student booking needs. Excluded from approved implementation scope. |

---

## 6. Final Implementation Gate

**Phase 1 is complete for tested Chromium mobile emulation.** The four Chromium mobile experience defects listed in Section 3 are no longer active implementation scope unless later regression or real-device QA reopens them.

**Claude Code may proceed to Phase 2 when explicitly requested.** Phase 1 acceptance criteria have been verified in a fresh Chromium browser session using the specified mobile emulation viewports, including:
- Hero secondary CTA verified at 375×812, 390×844, and 430×932 in Chromium mobile emulation
- Weekly editorial-to-scene handoff verified at 390×844, with regression checks at 375×812 and 430×932
- About mobile menu anchor entry verified at 375×812, 390×844, and 430×932
- Hamburger, Booking Back, footer navigation, and footer email target dimensions measured at or above 44px
- No page-level horizontal overflow or booking layout collapse introduced at the three tested mobile widths
- `npm run typecheck` and `npm run build` both pass cleanly

**The project may be considered implementation complete** (for approved implementation scope) after Phase 2 acceptance criteria are met, including:
- Fresh desktop Chrome chapter navigation through all four About Aaron chapters with no blank or black background
- Chromium mobile 390×844 chapter sequence with no blank or black background
- Fresh desktop Chrome Beach video validation with readyState, buffered state, video events, and resource request behavior documented
- Chromium mobile 390×844 Beach video path still playing through mobile menu navigation
- Reduced-motion checks for chapter and video behavior
- `npm run typecheck` and `npm run build` both pass cleanly

**Real iOS Safari, screen reader, real touch, and normal mail-client QA must occur before release.** These checks are not implementation claims and cannot be substituted with Chromium emulation: Hero secondary CTA behavior on iOS Safari, Weekly dark interval severity under real touch, About safe-area/touch usability, practical tap reliability, iOS Safari video autoplay, first-visit chapter transitions, iOS keyboard behavior in Booking, final mailto handoff/fallback link, landmark and Back screen reader announcements, and navbar legibility over variable imagery.
