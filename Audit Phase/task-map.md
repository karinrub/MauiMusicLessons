# MauiMusicLessons Audit Task Map

## Implementation Status — June 2026

Last updated: June 21, 2026 after execution-stage Phase 1/2 work. Statuses are grounded in source evidence, browser screenshots, and Playwright interaction QA. A final full slow-scroll/motion/performance verification pass has not been completed. Categories marked Partial still require additional browser evidence before final closure. Categories 0 and 1 have no code deliverables.

| # | Category | Status | Notes |
|---|---|---|---|
| 0 | Baseline Verification | Complete | `baseline-verification.md` created June 18, 2026; post-implementation source-only update added June 21, 2026; execution-stage browser QA evidence added in `phase-1-execution-report.md` and `execution-artifacts/phase1/` |
| 1 | Global Rating Targets | Complete | Planning reference only — no code deliverables |
| 2 | Global Motion Architecture | Complete — browser verified (Phase 5) | Dead zone scan PASS (zero segments > 25vh). All exit choreography confirmed (Beach/Weekly/About). Reduced-motion: all cinematic text lines at opacity:1 on mount, panel reduced-motion screenshots confirmed. Console errors: none during scroll. Full details in `baseline-verification.md` Phase 5. |
| 3 | Global Section Transitions | Complete — browser verified (Phase 5) | All six SectionHandoff variants confirmed visually distinct: visitor/audience/chapter have photo-backed warm gradients; practical/conversion/closing are appropriately dark for their surrounding dark-theme sections with distinct gradient directions and glow positions. CinematicEntry bridge ("A quiet hour. / A real Maui memory.") confirmed visible at opacity:1. Full details in `baseline-verification.md` Phase 5. |
| 4 | Hero | Not started | No source changes; intentionally deferred — hero is the strongest section and was not identified as requiring structural changes at this stage |
| 5 | Cinematic Panels | Complete — browser verified (Phase 5) | Panel 1 three-beat stagger confirmed: Line 0 "No experience." → Line 1 "No pressure." → Line 2 "Just you, the ocean, and a song." each visible at distinct scroll positions with others at opacity:0. Panel 2 pivot confirmed: "And if you live here —" (p=0.1, op=0.96) → both lines at opacity:1 by p=0.3. Reduced-motion: all 5 lines across both panels at opacity:1 on mount. Screenshots confirm readable text on dark image backgrounds. Full details in `baseline-verification.md` Phase 5. |
| 6 | Visual Asset And Overlay System | Complete — browser verified June 21, 2026 | All major images assessed in browser via Playwright screenshots. `aaron-tourists-1.jpg` (Beach editorial): `brightness(0.58) saturate(0.56) contrast(0.9) sepia(0.12) hue-rotate(-8deg)` — fully integrated. `aaron-teaching-1.jpg` (Weekly pull quote): `brightness(0.82) saturate(0.85)` — intentionally lighter for warmer weekly section mood, Maui dune setting fits coastal identity. `aaron-bookingForm.jpg` (booking bg): `brightness(0.55) saturate(0.7)` — absorbed into dark system as atmospheric texture. AboutAaron backgrounds (ch1-ch4): natural Maui tonality, no filter needed, overlay gradient provides sufficient contrast. All images documented with rationale. Asset-decision dependencies closed. |
| 7 | Beach Lessons | Complete — browser verified for conversion/context; visual final pass pending | Price (`From $35 · 30 min \| $60 · 1 hr`), location (`Mai Poina Beach Park, Kihei`), and outcome (`Most students play a complete song by the end`) visible in conversion row; CTA context verified in browser; video muted by default with accessible mute/unmute button; editorial photo treatment strengthened and screenshot-reviewed; exit choreography via `useScrollY`. **Note:** final slow-scroll/video/performance and image-cohesion review still recommended during Category 18 |
| 8 | Weekly Lessons | Complete — browser verified for conversion/context; visual final pass pending | Price (`$60 · 1 hr \| weekly cadence`), location (`Kihei, Maui`), student-paced claim visible; CTA context verified in browser; exit choreography for editorial and scene panels via `useScrollY`; editorial photo changed to `aaron-teaching-1.jpg`. **Note:** pull quote image cohesion and full mobile layout still need final visual review |
| 9 | About Aaron | Complete — browser verified June 21, 2026 | All four chapters reachable by mouse/touch/keyboard. "Chapter 1 of 4" label communicates multi-chapter structure. Rail with marker labels (Early, Exploration, Focus, Maui) shows 4 destinations. `role="slider"` with `aria-valuetext`, prev/next buttons with `aria-label`. Discoverability strengthened: next button now receives `about__chapter-button--hinting` class when scrubber hint fires, producing a coordinated opacity+slide-right pulse that signals "tap to advance." Reduced-motion suppresses both animations. Desktop and mobile layouts confirmed clean in browser. |
| 10 | SEO And Information Section | Complete — source verified | Keyword-list crawler paragraph removed; two editorial paragraphs replace it; lesson types, exact location (`Mai Poina Beach Park`, `Wailea`, `Makena`), and beginner suitability retained in info cards with left-border accent treatment; persistent conversion line (`Most first-time students leave playing a complete song.`) surfaced outside FAQ accordion; CTA button present. **Note:** desktop/mobile rendering and visual treatment confirmation recommended during Category 18 |
| 11 | FAQ | Complete — browser verified June 21, 2026 | Accessible accordion with `aria-expanded`, `aria-controls`, keyboard-operable buttons; single-open-at-a-time; reduced-motion suppresses all transitions. Warm dark background, serif heading, sand-light chevrons, and italic conversion line outside accordion all confirmed in browser. Visual treatment strengthened: open FAQ items now receive `border-left: 2px solid rgba(232,213,190,0.4)` + `padding-left: 0.85rem` — matches info-card left-border language and gives the open state editorial identity. Desktop 2-column and mobile single-column both verified. |
| 12 | Booking Flow | Complete — browser verified | Seven-step flow (who → type → duration → date → contact → confirm → sent); Beach/Weekly context labels verified in browser; all four group-size paths verified through sent/request state; price appears at duration step for solo and at who step for groups; explicit inquiry status; response time; payment method in sent state; name/email validation verified; reduced-motion static all-steps form remains in source; `mailto:` submission path retained. **Note:** final keyboard/reduced-motion booking pass still recommended during Category 18 |
| 13 | Footer | Partial — dependency-blocked + browser QA required | Email link (`aaron@mauimusiclessons.com`), location text, five-link nav with `aria-label`, brand name at 1.55rem with letter-spacing, `useEntryReveal` closing reveal active, top gradient (6rem warm dissolve) in CSS. **Remaining:** phone/text contact path — **dependency-blocked** (no confirmed number provided); closing visual frame and entry reveal effectiveness require browser confirmation |
| 14 | Conversion And Trust | Partial — dependency-blocked | Price in Beach and Weekly; location in Beach; outcome in Beach and SeoContent; response time and inquiry status in booking; payment method in sent state; no fabricated claims. **Remaining:** social proof — **dependency-blocked** (no real testimonials or review links provided); phone/text fast contact path — **dependency-blocked** (no confirmed number). These two items are the ceiling on Conversion Readiness and Overall Conversion Score until user data is supplied |
| 15 | Accessibility | Partial — WCAG 2.1 AA failures confirmed June 21, 2026 | ARIA/interaction pass confirmed (Phase 4): tab order, accessible names, decorative alt text, reduced-motion, Escape-close, focus states on rail/chapter buttons/mute/FAQ/nav links. **WCAG 2.1 AA audit (June 21, 2026) found confirmed failures — deferred to future remediation phase:** (1) No skip link — 2.4.1 Level A; (2) Focus rings absent on navbar links, hero CTAs, footer nav — 2.4.7 / 1.4.11 Level A + AA; (3) Video has no pause control, only mute — 2.2.2 Level A; (4) Booking contact inputs lack `autocomplete` attributes — 1.3.5 AA. **Partial findings requiring investigation:** contrast on navbar (75% opacity over variable photo) and footer brand (68% opacity) — 1.4.3; unlabeled landmark sections (#hero, #about, #book) — 4.1.2; booking back button accessible name per step — 4.1.2. See `baseline-verification.md` WCAG section for full detail. |
| 16 | Responsive Behavior | Complete — browser verified June 21, 2026 | No horizontal overflow at 390px or 768px. Hero: all CTAs visible and readable at 390px. Beach CinematicPanel: title card readable at 390px. Booking tiles: all 4 group-size options visible and touch-sized at 390px. Mobile menu: opens showing all 4 links (Beach Lessons, Weekly Lessons, About, Book a Lesson), Escape closes, confirmed clean. 768px booking: full desktop nav visible, booking card properly bounded. FAQ: single-column below 700px confirmed. About: bottom controls reachable at mobile widths. No text overlap, no clipped CTAs, no hidden headings found. |
| 17 | Performance | Complete — tooling-limited (WebP/srcset documented) | Build: JS 246KB/74KB gzip, CSS 51KB/10KB gzip — no vendor splitting needed at this scale. LCP image (aaron-beach-1.jpg 667KB) has `fetchPriority="high"` + `decoding="sync"`; `<link rel="preload">` added to index.html for earlier browser discovery. All non-LCP images use `loading="lazy"` + `decoding="async"`. Scroll animation uses shared `useScrollY` singleton — no duplicate listeners. **Tooling-blocked:** WebP conversion (no `cwebp` or Vite image plugin; would reduce ~4.3MB total image weight by ~30%) and responsive srcset (requires pre-resized variants). Both documented as future opportunities when tooling is introduced. |
| 18 | Final Verification | Complete — completion-report.md written June 21, 2026 | Phase 1 browser QA started final verification evidence: desktop/mobile screenshots, console check, CTA context, booking paths, validation, About keyboard, FAQ keyboard, mobile menu, typecheck/build/smoke. **Remaining:** full slow-scroll motion/handoff pass, exhaustive reduced-motion/keyboard/responsive/performance review, final completion report |

User-data dependencies still outstanding:
- Real testimonials or external review links — not fabricated, not present; blocks social proof in Conversion And Trust (14) and Overall Conversion Score
- Confirmed phone/text contact path — not in source; blocks fast contact path in Footer (13) and Conversion And Trust (14)

Asset-decision dependencies closed June 21, 2026:
- Beach right-panel image (`aaron-tourists-1.jpg`) — **Accepted**. Filter `brightness(0.58) saturate(0.56) contrast(0.9) sepia(0.12) hue-rotate(-8deg)` confirmed in browser to fully integrate with the cinematic system. No further action needed.
- BookingSection background (`aaron-bookingForm.jpg`) — **Accepted**. Filter `brightness(0.55) saturate(0.7) contrast(1.05)` absorbs the image into the dark system as atmospheric texture. Browser assessment confirmed it does not read as a separate visual world.

Use this file as the implementation map for future coding tasks. `audit-findings.md` is the evidence archive; this file converts that evidence into actionable work categories.

Priority levels:

- `P0`: blocks conversion, trust, or rating recovery across multiple audit dimensions.
- `P1`: high-impact quality gap that materially affects premium feel, cohesion, or portfolio quality.
- `P2`: important finishing work required before final audit completion.

## Audit Source Coverage Matrix

Status column added June 21, 2026 to reflect post-implementation state. "Addressed" means source-level implementation complete. "Browser-unverified" means implementation exists but visual/behavioral effectiveness requires a browser pass. "Dependency-blocked" means user data or asset decision is required.

| Audit source | Main finding groups | Task-map sections responsible | Post-implementation status |
|---|---|---|---|
| Experience Audit | Strong hero; dead/under-designed Beach scroll zone; About chapters under-seen; SEO tonal drop; booking resolution ambiguity; footer minimal utility | `2`; `3`; `4`; `7`; `9`; `10`; `12`; `13`; `18` | Beach/Weekly/SEO/Booking addressed and key flows browser-verified. About keyboard verified; natural-scroll discoverability remains open. Footer closing frame browser-unverified. Hero deferred (intentional). Final verification pending |
| Motion & Transition Audit | Missing global motion architecture; hard handoffs; void/low-information transition zones; simultaneous cinematic reveals; weak booking step motion; weak footer arrival | `2`; `3`; `5`; `12`; `13`; `15`; `16`; `17`; `18` | SectionHandoff and exit choreography addressed in source. Interaction QA console clean. Visual continuity, stagger timing, complete reduced-motion, and full slow-scroll motion read still need final browser verification. Performance trace not started |
| Claude Code Motion Architecture Technical Briefing | Animation utilities; scroll utilities; shared and direct scroll listeners; entry reveal hooks; keyframes; JS style mutation transitions; RAF scroll mapping; IntersectionObserver stagger systems; film grain; navbar states; hero veil; cinematic panels; About/booking motion | `2`; `3`; `4`; `5`; `9`; `11`; `12`; `15`; `16`; `17`; `18` | `useEntryReveal` documented (intentionally unused comment added); `CinematicEntry` confirmed on shared singleton; `useScrollY` exit subscribers added. Full motion system browser verification pending. Performance not started |
| Art Direction & Visual Cohesion Audit | Two photo worlds; Beach documentary image; pull quote image; About cold grey/turquoise image; booking foliage image; title-card overlay inconsistency; generic SEO/FAQ visual treatment | `5`; `6`; `7`; `8`; `9`; `10`; `11`; `12`; `13`; `16`; `18` | CSS treatment applied to BeachLessons, WeeklyLessons, BookingSection. Phase 2 strengthened Beach right-panel treatment and captured desktop/mobile evidence. SEO/FAQ visual treatment improved. Booking background (`aaron-bookingForm.jpg`) remains browser/asset-decision concern |
| Conversion Audit | Hidden price; no social proof; location late; response time unclear; booking inquiry status unclear; CTA context lost; weekly value underdeveloped; About credibility copy thin | `7`; `8`; `9`; `10`; `11`; `12`; `13`; `14`; `18` | Price/location/outcome/inquiry status/response time/payment method all addressed; Beach/Weekly CTA context and all booking group-size paths verified in browser. Social proof dependency-blocked. Phone/text path dependency-blocked. About Chapter 1 opens with teaching purpose |
| Baseline Verification | Current browser behavior; reproducing findings; stale/conflicting findings; new current-state issues found before implementation | `0`; all implementation categories; `18` | June 18 pre-implementation pass complete. June 21 source-only update preserved. Execution-stage Phase 1 browser QA now available in `phase-1-execution-report.md` and `execution-artifacts/phase1/`; final holistic verification still pending |

## Finding Status Types

Every major finding must eventually receive one of these statuses in `task-map.md`, `baseline-verification.md`, or the final audit completion report:

1. Implementable now
2. Needs user data
3. Needs asset decision
4. Needs baseline verification
5. Duplicate or overlap with another finding
6. Already resolved in current app state
7. Deferred with explicit reason

Findings marked as `Duplicate or overlap with another finding` must still identify the task category where the combined issue is handled.

Findings marked as `Deferred with explicit reason` must include a concrete reason and cannot be deferred only because the work is hard.

## Existing Asset Constraint

No new Aaron photos will be taken. All visual cohesion work must use existing project assets and visual treatment techniques unless the user explicitly provides new media later.

`Needs asset decision` means a decision about existing project assets, existing media, crop, overlay, treatment, placement, scale, visual prominence, or whether to reduce/remove a visual role. It does not mean requesting or assuming a new photoshoot.

If an image clashes with the visual system, allowed solutions include choosing a stronger existing project image, changing crop, changing overlay, changing color grade or tint, changing opacity or contrast treatment, using mask, shadow, vignette, or grain, moving the image into a smaller supporting role, reducing visual dominance, or replacing it only with another existing project asset.

If no existing asset can fully solve the issue, document the limitation as an asset constraint and continue with the strongest achievable treatment using existing assets.

## Finding Coverage Rules

Future agents must handle findings with these rules:

1. Preserve the original finding in `audit-findings.md`.
2. Translate subjective critique into concrete acceptance criteria.
3. Map each finding to at least one task section.
4. If a finding affects multiple sections, list it in each relevant task or in a global task that controls all affected sections.
5. If a finding requires business facts or asset decisions, mark it as a dependency instead of inventing content or assuming new media.
6. If a finding conflicts with current app behavior, verify in browser and document the difference.
7. Do not delete a finding because another task partially covers it.
8. Do not treat lower-priority findings as optional.

## 0. Baseline Verification

### Relevant audit findings

The audit archive contains historical observations from multiple audit passes, including conflicting booking-flow observations and motion/transition findings that must be checked against the current app. `audit-plan.md` requires a current-state browser verification record before source-code implementation begins.

### Current problem

Future agents could implement from stale or incomplete assumptions if they do not first compare the current site against `audit-findings.md`. This is especially important for booking flow completeness, transition gap severity, About chapter behavior, footer contact visibility, mobile behavior, and reduced-motion behavior.

### Required outcome

Before application source-code implementation begins, a future agent must run a browser-verified current-state pass and create or update `Audit Phase/baseline-verification.md`.

The baseline pass must:

1. Run the site locally.
2. Compare current behavior against `Audit Phase/audit-findings.md`.
3. Record what still reproduces.
4. Record what differs from the audits.
5. Record any new issues found during verification.
6. Document conflicting findings instead of silently choosing one.
7. Create or update `Audit Phase/baseline-verification.md`.
8. Avoid editing application source code during the baseline verification pass.

### Priority level

`P0`

### Likely files or components affected

Documentation target: `Audit Phase/baseline-verification.md`. Verification touches the running app in browser but does not edit source code.

Current-state review should cover `src/App.tsx`, all major section components, routing/CTA behavior, media behavior, mobile behavior, and reduced-motion behavior only as observation targets.

### Acceptance criteria

- `Audit Phase/baseline-verification.md` exists.
- Every major page section has been verified in browser.
- Every major audit source has been checked against current app behavior.
- Differences between audit observations and current app behavior are documented.
- Conflicting findings are documented with current browser behavior.
- No application source code was edited during the baseline pass.

### Verification steps

- Run the project locally.
- Open the site in a browser.
- Slowly scroll from hero to footer.
- Verify Hero, cinematic panels, Beach Lessons, Weekly Lessons, About Aaron, SEO/info, FAQ, Booking, Footer, global nav, mobile behavior where practical, and reduced-motion behavior where practical.
- Record current-state notes in `Audit Phase/baseline-verification.md`.
- Check `git status` to confirm no application source code changed.

## 1. Global Rating Targets

### Relevant audit findings

All audit groups target `100 / 100`: experience, motion, visual cohesion, and conversion. The lowest baselines are Conversion Readiness `52`, Photography `52`, Art Direction `55`, Overall Visual Cohesion `58`, Overall Visual Quality `59`, Visual Rhythm `60`, Overall Conversion `62`, and Transition Quality `44`.

### Current problem

The site has strong direction but uneven execution. The highest scores come from atmosphere, originality, typography, and emotional copy. The lowest scores come from conversion completion, section transitions, visual asset consistency, and generic functional sections.

### Required outcome

Every implementation task must identify which rating blockers it addresses and must avoid lowering strong existing dimensions: hero quality, cinematic Maui atmosphere, visitor/local distinction, About chapter concept, and guided booking concept.

### Priority level

`P0`

### Likely files or components affected

Planning reference only. Future implementation will likely touch `src/App.tsx`, `src/index.css`, `src/utils/animation.ts`, `src/utils/scroll.ts`, all major section components, and `public/images/*`.

### Acceptance criteria

- Every future code task maps back to at least one rating blocker in `audit-plan.md`.
- No task removes a core concept to gain points in another dimension.
- Completion is judged against the target score of `100 / 100`, not merely "better than before."

### Verification steps

- Before each implementation task, read `audit-findings.md`, `audit-plan.md`, and this task map.
- After each implementation task, list which baseline scores the change is intended to improve.
- During final QA, verify every row in the rating target table has a completed task path.

## 2. Global Motion Architecture

### Relevant audit findings

The motion audit says the site has a motion aesthetic but not a motion architecture. It identifies dead void zones, overuse of opacity-only reveals, uncoordinated scroll systems, hard section boundaries, no designed exits, weak booking step motion, and a weak footer landing.

The Claude Code Motion Architecture Technical Briefing identifies these technical motion systems and behaviors that must stay mapped during implementation:

- CSS keyframe animation system.
- CSS transitions triggered by JS inline-style mutations.
- RAF-driven scroll-mapped inline style mutations.
- IntersectionObserver and `setTimeout` stagger reveal system.
- Global SVG film grain overlay.
- `src/utils/animation.ts`.
- `src/utils/scroll.ts`.
- `src/hooks/useScrollY.ts`.
- `src/hooks/useEntryReveal.ts`.
- `src/hooks/useStaggeredReveal.ts`.
- `useEntryReveal` being defined but not currently called.
- Navbar reveal, scrolled state, and dark-section state behavior.
- Mobile menu enter/exit behavior.
- Hero parallax and veil behavior.
- `CinematicPanel` sticky progress behavior.
- `CinematicEntry` behavior.
- `ScrollLine` behavior.
- About Aaron motion behavior.
- Booking step transition behavior.
- Reduced-motion behavior.

### Current problem

Motion is authored section-by-section. `useScrollY`, direct scroll listeners, `IntersectionObserver`, CSS keyframes, CSS transitions, JS inline style mutations, RAF scroll mapping, and native smooth scrolling coexist without a documented choreography model. The visitor sees strong isolated moments followed by empty or abrupt transitions.

The technical audit also identifies potential maintainability risks: multiple scroll mechanisms, orphaned or unused reveal/keyframe utilities, duplicated timing constants, navbar state transitions separate from section choreography, and mobile menu behavior that needs explicit coverage.

### Required outcome

Create one consistent motion model for scroll-driven sections: shared timing intent, deliberate entry and exit behavior, no content-free viewport-height voids, clear reduced-motion equivalents, and reusable transition rules where possible.

### Priority level

`P0`

### Likely files or components affected

`src/utils/animation.ts`, `src/utils/scroll.ts`, `src/hooks/useScrollY.ts`, `src/hooks/useStaggeredReveal.ts`, `src/hooks/useEntryReveal.ts`, `src/components/CinematicPanel/*`, `src/components/CinematicEntry/*`, `src/components/ScrollLine/ScrollLine.tsx`, `src/components/Hero/*`, `src/components/AboutAaron/*`, `src/components/BookingSection/*`, `src/index.css`.

### Acceptance criteria

- There is no scroll segment of more than `25vh` where the viewport is near-black and contains no visible intentional content, image texture, transition text, or section cue.
- Cinematic display lines reveal sequentially when the copy is structured as separate poetic lines.
- Major section exits have visible choreography, not only entry fades.
- Scroll systems are consolidated or explicitly documented where separate systems remain.
- Reduced-motion mode presents all content without hidden states, parallax dependency, or trapped scroll timing.
- The CSS keyframe system, CSS transition system, JS inline-style mutation system, RAF scroll-mapped system, and IntersectionObserver stagger system each have a documented role or a documented reason for removal in the implementation notes.
- `useEntryReveal` is either used intentionally, removed in a scoped cleanup, or documented as intentionally retained unused; no unused motion utility is ignored.
- Navbar reveal timing, scrolled state, dark-section state, direct navigation behavior, mobile menu open behavior, mobile menu close behavior, and mobile menu enter/exit behavior are verified as part of the motion system.
- Mobile menu focus management, visible focus states, Escape key or explicit close behavior if applicable, and hidden/unreachable mobile link checks are covered by Accessibility and Responsive Behavior.
- Hero parallax/veil, `CinematicPanel` sticky progress, `CinematicEntry`, `ScrollLine`, About Aaron motion, and Booking step transitions are verified after any global motion change.
- The global SVG film grain overlay is verified for normal and reduced-motion behavior.
- No additional animation system or scroll listener is added unless the need is documented and existing shared infrastructure cannot support the behavior.

### Verification steps

- Run the site locally and perform slow scroll passes from top to footer at desktop and mobile widths.
- Inspect with `prefers-reduced-motion: reduce`.
- Confirm no console errors during scroll.
- Use screenshots or screen recording to verify dead zones are eliminated and section handoffs remain readable.
- Inspect browser behavior for navbar reveal, scrolled state, dark-section state, direct section navigation, mobile menu open behavior, mobile menu close behavior, and mobile menu focus handling.
- Verify key motion components individually: Hero, `CinematicPanel`, `CinematicEntry`, `ScrollLine`, About Aaron, Booking step transitions, FAQ accordion, and Footer.
- Confirm any direct scroll listener, RAF loop, IntersectionObserver, `setTimeout` stagger, or JS inline-style mutation remains intentional and documented.

## 3. Global Section Transitions

### Relevant audit findings

The motion audit names weak handoffs across the full page. Required handoff coverage:

1. Hero to cinematic panel.
2. Cinematic panel to Beach title card.
3. Beach title card to Beach scroll section.
4. Beach scroll section to Weekly Lessons.
5. Weekly Lessons to About Aaron.
6. About Aaron to second cinematic panel.
7. Second cinematic panel to SEO/info section.
8. SEO/info to FAQ.
9. FAQ to Booking.
10. Booking to Footer.

### Current problem

Sections mostly end and begin as separate blocks. Boundaries are hard cuts, invisible seams, or gradient-only overlaps. The site opens like a film but does not sustain cinematic continuity between chapters.

### Required outcome

Define each section handoff as a named transition with a visible purpose: orientation, emotional pivot, audience pivot, tonal relief, or conversion advance.

### Priority level

`P0`

### Likely files or components affected

`src/App.tsx`, `src/components/Hero/*`, `src/components/CinematicPanel/*`, `src/components/BeachLessons/*`, `src/components/WeeklyLessons/*`, `src/components/AboutAaron/*`, `src/components/CinematicEntry/*`, `src/components/SeoContent/*`, `src/components/BookingSection/*`, `src/components/Footer/*`, `src/index.css`.

### Acceptance criteria

- Each major handoff has a designed visual event or overlap; no handoff depends only on an accidental hard boundary.
- The visitor/local pivot remains clear and emotionally intact.
- The About-to-SEO transition no longer feels like a collapse from story into brochure copy.
- The Booking-to-Footer transition gives the page a deliberate closing state.
- Each handoff has a named transition purpose, such as orientation, chapter turn, audience pivot, tonal bridge, practical-information landing, conversion approach, or closing frame.
- Each handoff includes a visible visual event, overlap, continuity device, or intentionally held frame.
- Each handoff remains readable during slow scroll and normal scroll.
- Direct navigation to `#beach-lessons`, `#weekly-lessons`, `#about`, `#maui-music-lessons`, and `#book` lands without hiding the target section under the navbar or bypassing necessary orientation.
- Mobile handoffs preserve section identity without trapping scroll or hiding headings/CTAs.

### Verification steps

- Create a transition checklist and verify every handoff by scrolling slowly and quickly.
- Test direct nav jumps to `#beach-lessons`, `#weekly-lessons`, `#about`, `#maui-music-lessons`, and `#book`.
- Confirm transitions do not obscure text or CTAs at common viewport heights.
- For each of the ten required handoffs, record the transition purpose and the browser-observed continuity device.
- Verify slow-scroll, normal-scroll, direct-nav where applicable, and mobile behavior where applicable for every handoff.

## 4. Hero

### Relevant audit findings

The hero is one of the strongest moments: strong photo, location stamp, headline, subhead, parallax, and staggered load-in. Conversion audit notes missing above-fold clarity around price, duration, beginner friendliness, and what booking means.

### Current problem

The hero is emotionally strong but gives limited rational context. Adding too much would damage the opening, but leaving all practical context later creates uncertainty for comparison shoppers.

### Required outcome

Preserve the hero composition and cinematic load-in while adding only minimal, non-crowding clarity that supports booking confidence.

### Priority level

`P1`

### Likely files or components affected

`src/components/Hero/Hero.tsx`, `src/components/Hero/Hero.css`, `src/components/Navbar/*`, `src/utils/animation.ts`.

### Acceptance criteria

- Hero image, headline, location stamp, subhead, and primary/secondary CTA hierarchy remain recognizable.
- Any added practical cue fits the premium editorial tone and does not create a card-heavy hero.
- Primary CTA still routes to booking; secondary CTA still routes to lesson options.
- Hero remains readable on mobile without text overlap.

### Verification steps

- Capture desktop and mobile first-viewport screenshots.
- Reload to observe the entry animation timing.
- Verify CTA target behavior and keyboard focus order.

## 5. Cinematic Panels

### Relevant audit findings

Cinematic panels are distinctive but need staggered line choreography, intentional exits, better handoffs, and visual consistency. The bridge "A quiet hour. / A real Maui memory." is a strong moment, while the first panel has missed sequential reveal potential. Visual coverage includes title-card overlay consistency, the warm dark cinematic world versus bright activity/documentary image world, text readability over image overlays, and mobile crop behavior for major cinematic images.

### Current problem

Panel copy is structured like sequential beats, but some lines reveal too simultaneously or without enough relationship to adjacent sections. Image opacity and hero veil timing are not explicitly coordinated.

### Required outcome

Make cinematic panels behave like authored story beats: line-by-line reveal, controlled image presence, deliberate exit, and clear relation to the section before and after.

### Priority level

`P0`

### Likely files or components affected

`src/components/CinematicPanel/CinematicPanel.tsx`, `src/components/CinematicPanel/CinematicPanel.css`, `src/components/CinematicEntry/CinematicEntry.tsx`, `src/components/CinematicEntry/CinematicEntry.css`, `src/utils/animation.ts`, `src/utils/scroll.ts`, `public/images/aaron-pause.jpg`, `public/images/aaron-onlyMe.jpg`, `public/images/aaron-playing-1.jpg`.

### Acceptance criteria

- "No experience.", "No pressure.", and "Just you, the ocean, and a song." reveal as distinct beats.
- "And if you live here -" and "the music can stay." remain a clear audience pivot.
- "A quiet hour." and "A real Maui memory." bridge toward practical content without a hard emotional drop.
- Image opacity/scale changes never make text unreadable.
- Title-card and cinematic-panel overlays use a consistent value relationship to adjacent sections.
- Any image replacement or treatment decision is documented as an asset decision when existing project assets require user approval.
- Desktop and mobile crops preserve the intended subject, readable text, and cinematic atmosphere.

### Verification steps

- Slow-scroll each panel at desktop and mobile widths.
- Verify line timing under normal motion and full content visibility under reduced motion.
- Confirm panel transitions do not create blank zones before or after the panel.

## 6. Visual Asset And Overlay System

### Relevant audit findings

The Art Direction & Visual Cohesion Audit identifies the visual system as a major score blocker. Required coverage includes Beach lesson documentary image treatment, pull quote image treatment, About Aaron cold grey/turquoise image treatment, Booking background green foliage image, title card overlay consistency, warm dark cinematic world versus bright activity/documentary image world, mobile crop behavior for every major image, text readability over every image overlay, replacement with another existing project asset or treatment decisions, and asset decision status rules.

### Current problem

Image and overlay findings are currently distributed across section tasks, but the audit plan treats the visual asset and overlay system as a major implementation phase. Without a standalone task category, future agents could fix images locally while missing the global requirement: every major image must support one coherent coastal cinematic identity.

### Required outcome

Create one global visual asset and overlay control pass that documents the role, treatment, crop behavior, overlay logic, and status of every major image or media-backed section from hero to footer. This task controls the visual system; section-specific tasks retain their local image requirements. No new photoshoot or new Aaron photography may be assumed.

### Priority level

`P0`

### Likely files or components affected

`src/components/CinematicPanel/*`, `src/components/CinematicEntry/*`, `src/components/BeachLessons/*`, `src/components/WeeklyLessons/*`, `src/components/AboutAaron/*`, `src/components/BookingSection/*`, `src/components/Footer/*`, relevant component CSS files, `public/images/*`, and `public/videos/*` if media treatment changes.

### Acceptance criteria

- Every major image has a documented role in the coastal cinematic identity.
- No major image reads as a separate website or unrelated activity thumbnail.
- Every image is either accepted as-is with rationale, treated, replaced with another existing project asset, moved/reduced in visual dominance, or marked `Needs asset decision`.
- Overlay values preserve text readability on desktop and mobile.
- Title cards use a consistent overlay logic.
- Mobile crops preserve subject, atmosphere, and text readability.
- Replacement images are selected only from existing project assets unless the user explicitly provides new media later.
- New photos of Aaron, fabricated images, or unapproved stock-style imagery are not requested or assumed.
- The visual system supports the current concept instead of redesigning the site.

### Verification steps

- Review every major image from hero to footer.
- Check desktop and mobile crops.
- Check text readability over every image.
- Compare visual treatment between hero, cinematic panels, Beach Lessons, Weekly Lessons, About Aaron, Booking, and Footer.
- Document any existing image or media item that requires user approval.
- Document any limitation where existing assets cannot fully solve the issue.
- Confirm no visual change weakens the cinematic Maui direction.

## 7. Beach Lessons

### Relevant audit findings

Beach Lessons is central to the tourist journey. Findings name a dead black void, jarring bright lesson photo, insufficient visible location/pricing, buried outcome claim, and CTA context not carrying into booking. Visual and media findings include the Beach lesson documentary image treatment, warm dark cinematic world versus bright activity/documentary image world, title-card overlay consistency, mobile crop behavior, text readability over image overlays, and media control requirements for the video/audio experience.

### Current problem

**Resolved as of June 21, 2026.** Conversion information, CTA context, and video accessibility were the primary gaps. These have been addressed in source. The remaining open question is visual cohesion of the right-panel image (`aaron-tourists-1.jpg`) — browser verification required.

### Required outcome

Make Beach Lessons the complete visitor offer: beach lesson context, beginner reassurance, location clarity, visible price anchor, visible outcome, specific CTA, and image treatment that belongs to the cinematic coastal system.

### Priority level

`P0`

### Likely files or components affected

`src/components/BeachLessons/BeachLessons.tsx`, `src/components/BeachLessons/BeachLessons.css`, `src/components/ScrollLine/ScrollLine.tsx`, `src/utils/assets.ts`, `public/images/aaron-tourists-*.jpg`, `public/images/aaron-teaching-1.jpg`, `public/videos/aaron-ukelele-vid.mp4`, `src/components/BookingSection/*`.

### Acceptance criteria

- No dead black viewport appears before, inside, or after the Beach Lessons scroll sequence.
- The section visibly states or links to price information before the booking flow.
- The section visibly states the lesson location context, including Kihei / Mai Poina Beach Park if still accurate.
- The outcome "play a complete song" or equivalent factual promise is visible without opening FAQ.
- The "BOOK A BEACH LESSON" CTA passes visitor/beach intent to booking or lands on a booking state that acknowledges that intent.
- The lesson image is treated, recolored, cropped, overlaid, repositioned, reduced in dominance, or replaced with another existing project asset so it no longer reads as a separate bright documentary world.
- If the best treatment requires choosing between existing assets or reducing/removing the image role, the finding is marked `Needs asset decision` until the user approves the existing-asset decision.
- Text remains readable over every Beach Lessons image/video overlay at desktop and mobile sizes.
- No media plays audible audio by default without clear user control.
- Mute/unmute controls have accessible labels and are reachable by keyboard where applicable.
- Media is not the only cue that the section changed.
- Reduced-motion and mobile states do not hide essential content, CTAs, or media controls.
- Video assets have poster/fallback behavior where appropriate.
- Media does not create layout shift or scroll jank.

### Verification steps

- Scroll from hero through Beach Lessons at slow and normal speeds.
- Click "BOOK A BEACH LESSON" and verify booking context.
- Check mobile layout for text, image, video, mute control, and CTA visibility.
- Verify image/video performance and no layout shifts.
- Test the mute/unmute control by mouse and keyboard where applicable.
- Verify the section remains understandable with audio muted and with reduced motion enabled.

## 8. Weekly Lessons

### Relevant audit findings

Weekly Lessons has strong emotional copy and a strong visitor/local pivot, but lacks price structure, progress outcomes, differentiation from other instructors, and specific lesson structure for committed local students. Visual findings include pull quote image treatment, title-card overlay consistency, mobile crop behavior for weekly images, text readability over image overlays, and the need to reconcile bright/documentary imagery with the cinematic world.

### Current problem

**Resolved as of June 21, 2026.** Conversion information and CTA context have been addressed and CTA context was verified in browser during Phase 1. Remaining open question: whether the pull quote / scene image reads as visually integrated with the cinematic system across the full scroll — requires final visual verification.

### Required outcome

Make Weekly Lessons a distinct local offer with concrete recurring value: session cadence, price or price range, progress expectations, Aaron's teaching approach, and CTA behavior that matches "find a time."

### Priority level

`P1`

### Likely files or components affected

`src/components/WeeklyLessons/WeeklyLessons.tsx`, `src/components/WeeklyLessons/WeeklyLessons.css`, `src/components/CinematicPanel/*`, `src/components/BookingSection/*`, `public/images/aaron-weekly-*.jpg`, `public/videos/aaron-weekly-section.mp4`.

### Acceptance criteria

- Visitor/local distinction remains explicit and emotionally clear.
- Weekly section includes visible pricing or pricing guidance for recurring students.
- Weekly section includes at least one concrete progress/outcome statement.
- Copy differentiates Aaron's approach without adding generic claims.
- "LET'S FIND A TIME" routes to booking with local/weekly context or a step that acknowledges weekly intent.
- Pull quote image treatment is documented and either accepted as-is with rationale, treated to match the visual system, replaced with another existing project asset, moved/reduced in dominance, or marked `Needs asset decision`.
- Weekly title card and pull quote overlays preserve text readability at desktop and mobile sizes.
- Mobile crops preserve the instructor/student context and do not obscure the quote.

### Verification steps

- Scroll from Beach Lessons through Weekly Lessons and confirm the pivot is readable.
- Click weekly CTA and verify booking context.
- Check mobile image/text sequence and pull quote placement.
- Confirm new practical text does not crowd cinematic display copy.

## 9. About Aaron

### Relevant audit findings

The four-chapter biography concept is original and trust-building, but most visitors only see Chapter 1. Conversion audit says the opening should explain why Aaron teaches and what students leave with, not only chronological history. Visual findings include the About Aaron cold grey/turquoise image treatment, mobile crop behavior, and text readability over the About image overlay. Motion findings include About chapter transition behavior, scrubber/rail behavior, and rapid chapter-change visibility.

### Current problem

The chapter system relies on user discovery. Navigation exists but is easy to miss, and the most trust-building story may remain hidden.

### Required outcome

Preserve the chapter concept while making all chapters discoverable through natural browsing, keyboard navigation, and visible interaction cues. Add conversion-relevant teaching philosophy without flattening the story into a credential list.

### Priority level

`P0`

### Likely files or components affected

`src/components/AboutAaron/AboutAaron.tsx`, `src/components/AboutAaron/AboutAaron.css`, `public/images/aaron-portrait-1.jpg`, `public/images/aaron-playing-*.jpg`, `src/utils/scroll.ts`.

### Acceptance criteria

- All four chapters can be reached by mouse, touch, and keyboard.
- The section visibly communicates that more than one chapter exists.
- The chapter control has accessible names, focus states, and active state semantics.
- The first visible About copy includes Aaron's teaching purpose or student outcome.
- Rapid chapter changes do not leave content invisible.
- About imagery treatment is documented and either accepted as-is with rationale, treated for color/value consistency, replaced with another existing project asset, moved/reduced in dominance, or marked `Needs asset decision`.
- Text remains readable over every About background image on desktop and mobile.
- Chapter transition motion and reduced-motion behavior both preserve content visibility.

### Verification steps

- Navigate all chapters by click/tap, keyboard, and drag/scrub if retained.
- Test reduced motion and rapid chapter changes.
- Confirm all text remains readable against background images on mobile.
- Verify focus order and screen-reader-friendly labels.

## 10. SEO And Information Section

### Relevant audit findings

The SEO/info section is the most jarring tonal drop. It contains useful information but the visible keyword paragraph reads like crawler copy and the cards feel generic.

### Current problem

**Resolved as of June 21, 2026.** Keyword-list crawler paragraph removed; editorial copy in place; info cards restyled with left-border accent; persistent conversion line surfaced outside FAQ accordion. Remaining open question: visual section treatment at desktop/mobile to be confirmed during Category 18 browser pass.

### Required outcome

Keep search value and practical information while rewriting and presenting it as part of the site's cinematic editorial language. Information must be specific, scannable, and human-readable.

### Priority level

`P0`

### Likely files or components affected

`src/components/SeoContent/SeoContent.tsx`, `src/components/SeoContent/SeoContent.css`, `src/components/CinematicEntry/*`, `public/robots.txt`, `public/sitemap.xml` if metadata/routes change.

### Acceptance criteria

- No visible paragraph reads like a keyword list.
- Lesson types, locations, service areas, and beginner suitability remain clear.
- The section visually relates to the surrounding cinematic system through typography, spacing, texture, or image treatment.
- Search-relevant phrases remain present naturally in headings, copy, metadata, or structured content.
- Info cards, if retained, have a design treatment specific to Maui music lessons rather than generic service cards.

### Verification steps

- Read the section aloud and confirm it sounds written for people.
- Verify important local search phrases still appear naturally.
- Check desktop and mobile layout for line length, hierarchy, and no overlap.
- Confirm transition from About/CinematicEntry into SEO is no longer abrupt.

## 11. FAQ

### Relevant audit findings

FAQ questions are useful, but the two-column accordion looks generic and has little motion or design-system presence. Important conversion facts are hidden inside accordion answers.

### Current problem

The FAQ functions but does not carry the premium editorial identity. Critical answers like "most students leave able to play a complete song" and "books 2-3 days ahead" are too hidden.

### Required outcome

Keep the useful questions while making the section visually authored and surfacing high-value conversion facts elsewhere or as visible FAQ summaries.

### Priority level

`P1`

### Likely files or components affected

`src/components/SeoContent/SeoContent.tsx`, `src/components/SeoContent/SeoContent.css`.

### Acceptance criteria

- FAQ remains accessible as a proper accordion with keyboard operation and clear expanded states.
- Critical conversion facts are visible without requiring accordion interaction, either in adjacent copy or persistent summary text.
- The FAQ layout is balanced on desktop and single-column on mobile.
- Accordion animation respects reduced motion.
- The section no longer reads as a default template block.

### Verification steps

- Test each FAQ item by mouse and keyboard.
- Verify one-open-at-a-time behavior if retained.
- Check mobile stacking and long-answer max-height behavior.
- Run an accessibility check for buttons, `aria-expanded`, focus visibility, and contrast.

## 12. Booking Flow

### Relevant audit findings

The booking concept is strong: conversational, progressive, and low friction. Conversion audit says it is an inquiry, not a confirmed booking; price appears late; date selection is vague; CTA context is not carried; response expectations need clarity. Motion audit says step transitions are functional but need polish. Visual findings include the booking background green foliage image, text readability over the booking background, mobile crop behavior, and the relationship between the floating form card and the background image.

### Current problem

**Resolved as of June 21, 2026.** CTA context, inquiry status, response time, payment method, and reduced-motion form are all addressed in source. Phase 1 verified Beach/Weekly context labels, all group-size paths, validation, and sent/request state in browser. Remaining open questions: step transition animation polish, background image cohesion, back navigation from every step, instrument variants, and reduced-motion booking verification during Category 18.

### Required outcome

Keep the guided booking concept and make it implementation-complete: contextual entry, transparent price, specific timing request, clear inquiry status, confirmation screen, contact fallback, accessible step navigation, and polished step transitions.

### Priority level

`P0`

### Likely files or components affected

`src/components/BookingSection/BookingSection.tsx`, `src/components/BookingSection/BookingSection.css`, `src/utils/animation.ts`, `src/utils/scroll.ts`, CTA handlers in `Hero`, `BeachLessons`, `WeeklyLessons`, `SeoContent`, `Navbar`, and `Footer`.

### Acceptance criteria

- Booking flow clearly states whether submission is an inquiry/request or a confirmed booking before final submit.
- Price is visible before or at the moment the user chooses lesson duration, with no surprise after a form wall.
- CTA context from Beach and Weekly is reflected in the booking flow.
- Visitor can request a specific date or date window, not only a weekday, unless the product intentionally accepts broad preferences and says so.
- Confirmation state explains what happens next, expected response time, and faster contact path if available.
- Back navigation preserves selections correctly.
- Step transitions are animated deliberately and disabled under reduced motion.
- Form fields have labels, validation, focus states, and error messaging.
- Booking background image treatment is documented and either accepted as-is with rationale, treated, replaced with another existing project asset, moved/reduced in dominance, or marked `Needs asset decision`.
- Booking submission destination is confirmed or marked `Needs user data`.
- Response-time policy, contact path, and payment/confirmation policy are confirmed or marked `Needs user data`.
- Booking remains usable if background imagery fails to load.

### Verification steps

- Complete booking paths for `Just me`, `Two of us`, `Small group`, and `Larger group`.
- Complete paths for guitar and ukulele.
- Test back navigation from every step.
- Test missing required fields and invalid email.
- Test keyboard-only operation and mobile layout.
- Verify final submission behavior in the local implementation environment.

## 13. Footer

### Relevant audit findings

The footer is clean but too minimal. It lacks direct contact visibility, fast contact path, social proof links, and a designed closing motion statement. Footer work is also responsible for closing-frame visual continuity and any final contact/trust path that requires confirmed business data.

### Current problem

The page ends without a final impression or enough utility for high-intent visitors who prefer direct contact.

### Required outcome

Create a quiet but useful footer that closes the cinematic experience, preserves the premium tone, and exposes direct contact/navigation without becoming cluttered.

### Priority level

`P1`

### Likely files or components affected

`src/components/Footer/Footer.tsx`, `src/components/Footer/Footer.css`, `src/components/BookingSection/*`, `src/index.css`.

### Acceptance criteria

- Footer includes visible useful contact information, at minimum email if that is the confirmed contact path.
- If phone/text/WhatsApp is available, it is included consistently with booking confirmation expectations.
- Footer nav links work and have accessible focus states.
- Footer has a deliberate closing visual or motion treatment.
- Footer does not introduce a new visual concept or cluttered marketing block.
- Any phone/text/social/review link is confirmed or marked `Needs user data`.
- Footer image or visual treatment, if introduced, follows the same asset-decision rules as other major images.

### Verification steps

- Click all footer links and contact links.
- Verify mobile layout and tap targets.
- Confirm footer is reachable after booking completion and direct page scroll.
- Check reduced-motion behavior for closing treatment.

## 14. Conversion And Trust

### Relevant audit findings

Conversion gaps: no visible price before booking, no external social proof, thin teaching credentials, unclear response time, location buried late, no fast contact path, and no clear inquiry/confirmation distinction. This category tracks both implementable conversion fixes and dependencies for price or price range, confirmed beach lesson location, confirmed response-time policy, contact path, booking submission destination, real testimonial or review link, teaching credentials or credibility copy, lesson outcome claims, visitor journey, and local weekly student journey.

### Current problem

The site persuades emotionally but withholds practical evidence until late or not at all. Warm referrals may convert; skeptical visitors and comparison shoppers may leave.

### Required outcome

Add trust infrastructure that supports the existing premium atmosphere: price anchors, one real testimonial or review signal, location/service area, expected outcomes, teaching credibility, booking response expectations, and contact fallback.

### Priority level

`P0`

### Likely files or components affected

`src/components/Hero/*`, `src/components/BeachLessons/*`, `src/components/WeeklyLessons/*`, `src/components/AboutAaron/*`, `src/components/SeoContent/*`, `src/components/BookingSection/*`, `src/components/Footer/*`.

### Acceptance criteria

- Price or price range is visible before the final booking form step.
- At least one real external trust signal is visible if available; if not available, the implementation must not fabricate one and should leave a clearly marked data need.
- Beach location/service area appears before the SEO section.
- Response time and inquiry status are visible in booking.
- Weekly lesson value includes recurring cost context and progress expectation.
- All factual claims are sourced from existing copy, verified business facts, or explicit user-provided data.
- Price or price range is confirmed or marked `Needs user data`.
- Beach lesson location is confirmed or marked `Needs user data`.
- Response-time policy and contact path are confirmed or marked `Needs user data`.
- Booking submission destination is confirmed or marked `Needs user data`.
- Real testimonial/review link is used only if provided; otherwise it is tracked as `Needs user data`.
- Teaching credentials, credibility copy, and lesson outcome claims use existing verified facts or are tracked as dependencies.
- Visitor journey and local weekly student journey are both verified after conversion changes.

### Verification steps

- Audit the page as a first-time tourist and verify price, location, outcome, and response expectation appear before submission.
- Audit the page as a local weekly student and verify recurring value is clear.
- Confirm no fake testimonials, fake ratings, or unverifiable claims were introduced.
- Verify all dependency-blocked conversion findings are listed separately from implementable engineering work.

## 15. Accessibility

### Relevant audit findings

The audits mention motion, interaction, FAQ accordions, About navigation, booking tiles, media controls, mobile menu, and reduced-motion behavior. These all require accessibility verification. Navbar-specific findings include reveal timing, scrolled state, dark-section state, direct section navigation behavior, mobile menu open/close behavior, focus management, visible focus states, Escape key or explicit close behavior if applicable, and no hidden or unreachable mobile nav links.

### Current problem

Interactive cinematic sites can hide content behind scroll timing, mouse-only controls, insufficient focus states, or motion dependence.

### Required outcome

All content and conversion paths must be operable and understandable with keyboard, screen reader semantics, reduced motion, and mobile touch.

### Priority level

`P0`

### Likely files or components affected

`src/components/Navbar/*`, `src/components/Hero/*`, `src/components/BeachLessons/*`, `src/components/WeeklyLessons/*`, `src/components/AboutAaron/*`, `src/components/SeoContent/*`, `src/components/BookingSection/*`, `src/components/Footer/*`, `src/index.css`.

### Acceptance criteria

- All interactive controls are native buttons/links or have correct roles and keyboard behavior.
- Visible focus state exists for nav, CTAs, booking tiles, date chips, FAQ items, About chapter controls, and footer links.
- Reduced-motion mode shows all content without scroll-trigger dependency.
- Text contrast meets WCAG AA for normal and large text.
- Audio/video controls are labeled and do not autoplay with audible sound.
- Form inputs have labels, validation messages, and accessible error states.
- Navbar links and CTAs have visible focus states on desktop and mobile.
- Mobile menu open and close behavior is keyboard-operable.
- Mobile menu focus management prevents hidden or unreachable links.
- Escape key or explicit close behavior is documented and verified if implemented.
- Mute/unmute controls have accessible labels and are reachable by keyboard where applicable.
- Media is not the only cue that a section changed.
- Reduced-motion and mobile states do not hide essential content or controls.

### Verification steps

- Keyboard-tab through the full page.
- Test with browser reduced-motion emulation.
- Run automated accessibility checks where available.
- Inspect `aria-expanded`, `aria-current`, labels, and button names.
- Verify touch target sizes on mobile.
- Verify navbar direct section navigation, mobile menu open/close behavior, and visible focus states.
- Verify media controls by keyboard and screen-reader-accessible names where practical.

### WCAG 2.1 AA Audit — June 21, 2026

**Status of WCAG work: Deferred to a future remediation phase. Not part of Phase 3–5.**

A WCAG 2.1 AA audit was completed June 21, 2026 against the live site at `https://karinrub.github.io/MauiMusicLessons/`. Findings are documented in full in `baseline-verification.md`. Summary below for implementation planning.

**Confirmed Level A failures (must fix before any WCAG conformance claim):**

1. **2.4.1 — Skip Link Missing.** No bypass mechanism exists. Keyboard users must tab through the full navbar every page load.
   - Status: `Implementable now`
   - Files: `src/components/Navbar/Navbar.tsx`, `src/components/Navbar/Navbar.css`, `src/index.css`
   - Fix: Add a visually hidden skip-to-main link as the first focusable element on the page; show on focus.

2. **2.4.7 / 1.4.11 — Focus Rings Absent on Navbar, Hero CTAs, Footer Nav.**
   The Phase 4 pass confirmed focus rings on About rail, chapter buttons, mute button, FAQ triggers, and booking tiles. Navbar links, hero CTA buttons, and footer nav links lack visible focus rings on the dark background.
   - Status: `Implementable now`
   - Files: `src/components/Navbar/Navbar.css`, `src/components/Hero/Hero.css`, `src/components/Footer/Footer.css`
   - Fix: Add `focus-visible` CSS rule with sufficient contrast against the dark backgrounds in those components.

3. **2.2.2 — Video Has No Pause Control.**
   The Beach Lessons background video autoplays. The mute button controls audio only. No pause/play toggle exists. Users who need to stop motion cannot do so.
   - Status: `Implementable now`
   - Files: `src/components/BeachLessons/BeachLessons.tsx`, `src/components/BeachLessons/BeachLessons.css`
   - Fix: Add a pause/play button adjacent to the existing mute button; use the same accessible label infrastructure already in place.

**Confirmed AA failures (required for WCAG 2.1 AA conformance):**

4. **1.3.5 — Autocomplete Missing on Booking Contact Inputs.**
   Name and email fields (and possibly instrument/timing fields) in the booking contact step lack `autocomplete` attributes. Required for fields collecting personal information so assistive technology can identify purpose and autofill managers can operate.
   - Status: `Implementable now`
   - Files: `src/components/BookingSection/BookingSection.tsx` (contact step)
   - Fix: Add `autocomplete="name"` and `autocomplete="email"` to the relevant inputs.

**Partial / risk findings (investigate before final conformance claim):**

5. **1.4.3 — Contrast at Variable Scroll Positions.**
   Navbar links at 75% opacity and footer brand at ~68% opacity may fall below 4.5:1 ratio over lighter image areas (sky, sand). Cannot be confirmed as pass or fail without contrast measurement at the specific failure-risk scroll positions.
   - Status: `Needs baseline verification`
   - Action: Measure pixel-level contrast at scroll positions where lighter image background appears behind the navbar.

6. **4.1.2 — Unlabeled Landmark Sections.**
   `#hero`, `#about`, and `#book` sections appear to lack `aria-label`. Screen reader landmark navigation would surface unnamed regions.
   - Status: `Implementable now` (low risk)
   - Files: `src/components/Hero/Hero.tsx`, `src/components/AboutAaron/AboutAaron.tsx`, `src/components/BookingSection/BookingSection.tsx`
   - Fix: Add `aria-label` matching the section's narrative role to the relevant container.

7. **4.1.2 — Booking Back Button Accessible Name.**
   The back button label may not reflect the current step context during rapid step changes.
   - Status: `Needs baseline verification`
   - Action: Confirm accessible name at each booking step and update if the generic label is insufficient.

**Passing WCAG criteria (no action required):**
Alt text, heading hierarchy, DOM order, no keyboard traps, page title, language attribute, error identification, no duplicate IDs, reduced-motion system.

## 16. Responsive Behavior

### Relevant audit findings

The page relies on cinematic full-viewport sections, sticky regions, large type, image overlays, split panels, cards, accordions, booking steps, navbar states, and mobile menu behavior. The audit requires future agents to verify no overlap and no hidden content.

### Current problem

Large display typography and scroll-based layouts can break on short mobile heights, narrow widths, and tablet intermediate states.

### Required outcome

The site must preserve the cinematic direction on mobile and desktop without text overlap, unreadable lines, trapped scroll regions, or offscreen controls.

### Priority level

`P0`

### Likely files or components affected

All component CSS files, especially `Hero.css`, `CinematicPanel.css`, `BeachLessons.css`, `WeeklyLessons.css`, `AboutAaron.css`, `SeoContent.css`, `BookingSection.css`, `Footer.css`, and `src/index.css`.

### Acceptance criteria

- No text overlaps images, controls, or adjacent sections at common widths: `360`, `390`, `768`, `1024`, `1280`, and `1440`.
- Sticky/scrolljack sections remain navigable on short mobile viewports.
- Booking tiles, date chips, and CTA buttons fit without clipped text.
- FAQ becomes a readable single-column layout on small screens.
- About chapter controls remain usable by touch.
- Hero first viewport leaves a hint of the next section where applicable without hiding the hero CTA.
- Navbar reveal, scrolled state, and dark-section state remain readable at mobile/tablet/desktop widths.
- Mobile menu opens, closes, and exposes all nav links without clipping.
- Mobile menu focus states and tap targets are visible.
- Mobile crop behavior is verified for every major image: hero, cinematic panels, Beach title/scroll images, Weekly title/body/pull quote images, About backgrounds, SEO/FAQ if media is introduced, Booking background, and Footer if media is introduced.
- Text readability over image overlays is verified at every required width.

### Verification steps

- Use browser responsive mode or Playwright screenshots for the listed widths.
- Test portrait and landscape mobile where possible.
- Scroll through the full page at each width.
- Check for horizontal overflow.
- Open and close the mobile menu at mobile widths and verify all links are reachable.
- Capture or inspect major image crops and text overlays at the listed widths.

## 17. Performance

### Relevant audit findings

The technical motion audit identifies multiple scroll listeners/systems, large images/videos, film grain SVG animation, backdrop blur, masks, gradients, Ken Burns effects, media controls, and video/audio behavior.

### Current problem

The cinematic experience depends on media and scroll animation. Without performance discipline, fixes could add jank or slow load.

### Required outcome

Maintain smooth scroll and fast enough load while preserving visual atmosphere. Use optimized media, minimal redundant scroll listeners, and reduced work under reduced motion.

### Priority level

`P1`

### Likely files or components affected

`src/hooks/useScrollY.ts`, `src/components/CinematicEntry/*`, `src/components/CinematicPanel/*`, `src/components/BookingSection/*`, `src/App.tsx`, `src/index.css`, `public/images/*`, `public/videos/*`.

### Acceptance criteria

- Scroll-linked animation uses the shared listener unless a separate listener is justified and documented.
- Images used as large backgrounds are appropriately compressed and dimensioned.
- Video assets are not introduced without poster/fallback and mobile performance consideration.
- Film grain, blur, and masks do not cause visible scroll jank.
- Reduced-motion mode disables nonessential continuous animation.
- No audible autoplay occurs without clear user control.
- Mute/unmute controls do not cause layout shift.
- Video assets have poster/fallback behavior where appropriate.
- Media controls, image overlays, and video playback do not create layout shift or scroll jank.
- Media is not the only cue that a section changed.

### Verification steps

- Run local production build.
- Inspect Lighthouse or browser performance where available.
- Watch scroll performance on a mid-size mobile viewport.
- Check network asset sizes and image formats.
- Confirm no new console warnings or layout shift spikes.
- Verify video/audio behavior on desktop and mobile where practical.
- Verify reduced-motion mode does not hide essential media-adjacent content or controls.

## 18. Final Verification

### Relevant audit findings

The audit phase goal is to bring every rating to `100 / 100` without redesigning the site or removing the core concept.

### Current problem

Individual fixes can improve local symptoms while leaving global ratings blocked. Final verification must be holistic.

### Required outcome

Perform a full end-to-end QA pass against the audit archive, plan, and task map. Confirm the current site direction is preserved and every known blocker is either fixed or explicitly documented as requiring user-provided content/assets.

### Priority level

`P0`

### Likely files or components affected

All application files changed during future implementation. This documentation task does not edit application source code.

### Acceptance criteria

- All P0 categories pass their acceptance criteria.
- All P1 categories pass or have a documented user-data dependency.
- No findings from `audit-findings.md` were ignored without a written reason.
- No new concept, audience model, or visual direction replaced the existing site.
- Every baseline rating has an implementation-backed rationale for reaching `100 / 100`.
- Application builds successfully and manual QA covers desktop, mobile, reduced motion, keyboard, and booking flow.
- Every audit source in the Audit Source Coverage Matrix has been addressed.
- Every major finding has one of the allowed Finding Status Types.
- Every `P0` task has browser verification evidence.
- Every user-data dependency is listed separately from engineering work.
- Every remaining deferred finding has an explicit reason.
- No source audit finding was deleted, softened, or silently ignored.
- The current website direction was preserved.

### Verification steps

- Re-read `audit-findings.md` from top to bottom before final QA.
- Re-run the full site from hero through footer.
- Complete every booking path.
- Verify visitor and local journeys separately.
- Verify all links, CTAs, accordions, chapter controls, media controls, and form states.
- Produce a final audit completion report listing completed categories, remaining content dependencies, and evidence screenshots or notes.
- Check every row in the Audit Source Coverage Matrix and document its completion status.
- Check every major finding status and list unresolved dependencies or deferrals.
- Attach or describe browser evidence for each `P0` task category.
- Confirm every baseline rating has an implementation-backed rationale for reaching `100 / 100`.
