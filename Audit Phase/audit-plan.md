# MauiMusicLessons Audit Phase Plan

## Purpose

This audit phase converts `Audit Phase/audit-findings.md` from a raw evidence archive into implementation-ready planning. The archive remains the source of truth. This plan and `task-map.md` translate the findings into a controlled sequence of future coding tasks.

The end goal is to bring every audited rating to `100 / 100` while preserving the existing website direction: a cinematic, premium, Maui-specific music lesson experience centered on Aaron Grzanich, beach lessons for visitors, weekly lessons for locals, an About Aaron chapter arc, and a guided booking flow.

This document is a project control document for autonomous coding agents. It defines the strategy, scoring framework, implementation sequence, decision rules, and completion standard. It does not authorize application source-code changes by itself.

## Current Implementation State — June 21, 2026

Implementation work is in progress. This is not a pre-implementation document. The following is a high-level status summary; `task-map.md` has the authoritative per-category breakdown.

**Completed categories (source/browser-verified where applicable):** Beach Lessons conversion and CTA context (7), Weekly Lessons conversion and CTA context (8), SEO And Information Section source and sampled browser rendering (10), Booking Flow all group-size paths and validation (12).

**Partial categories (some browser evidence now exists, final verification still pending):** Global Motion Architecture (2), Global Section Transitions (3), Cinematic Panels (5), Visual Asset And Overlay System (6), About Aaron (9), FAQ (11), Footer (13), Conversion And Trust (14), Accessibility (15), Responsive Behavior (16).

**Not started or not complete:** Hero (4) remains intentionally unchanged; Performance (17) has successful build/smoke but no performance trace; Final Verification (18) has Phase 1 evidence but is not complete.

**Execution reports now available:**
- `Audit Phase/phase-1-execution-report.md`
- `Audit Phase/phase-2-execution-report.md`
- Browser evidence in `Audit Phase/execution-artifacts/phase1/`

**Implemented during execution stage:**
- Mobile menu Escape close behavior and state-specific hamburger accessible labels.
- Stronger Beach Lessons right-panel image treatment using existing asset, filter, and warm vignette overlay.

**Outstanding dependency-blocked items:**
- Real testimonials or external review links — not provided; social proof cannot be fabricated.
- Confirmed phone/text contact path — not provided; fast contact path cannot be added.

**Critical next step:** Continue with Phase 3 motion and transition verification/tuning. Phase 1 browser QA covered key breakpoints, CTA context, all booking group-size paths, validation, FAQ keyboard behavior, About keyboard behavior, console errors, mobile menu behavior, and build/smoke. A final holistic browser QA pass is still required before the audit can close.

---

## Document Role

1. `Audit Phase/audit-findings.md` is the complete evidence archive. It preserves all observed findings, raw critique, baseline scores, technical notes, and conversion observations. Do not shorten it or rewrite its findings.
2. `Audit Phase/audit-plan.md` is the strategy and scoring framework. It explains how the findings should be prioritized, what each score requires to reach `100 / 100`, and how future work must be sequenced.
3. `Audit Phase/task-map.md` is the implementation task structure. It converts findings into task categories with likely files, acceptance criteria, and verification steps.
4. `Audit Phase/implementation-brief.md` is the operating manual for coding agents. It defines reading order, agent behavior, implementation rules, verification behavior, and final QA requirements.
5. `Audit Phase/baseline-verification.md` is the current-state browser verification record created before source-code implementation begins. It does not replace `audit-findings.md`. It records what currently reproduces in the app, documents differences between historical audit observations and current browser behavior, and resolves stale or conflicting observations only for implementation priority, not by deleting or weakening the original audit evidence. If `baseline-verification.md` does not exist, it must be created before application source-code implementation begins.

## Audit Coverage Requirement

Every major finding from every audit source must have a traceable home in `task-map.md`, `baseline-verification.md`, or the final audit completion report.

Required audit sources:

1. Experience Audit.
2. Motion & Transition Audit.
3. Claude Code Motion Architecture Technical Briefing.
4. Art Direction & Visual Cohesion Audit.
5. Conversion Audit.
6. Baseline Verification.

No finding may be dropped because it is:

1. Subjective.
2. Duplicated.
3. Difficult to implement.
4. Dependent on user-provided business information.
5. Dependent on photography or media assets.
6. Inconvenient to current code structure.
7. Lower priority than a `P0` issue.

Lower-priority findings may be sequenced after `P0` work, but they must still be tracked with an allowed status and an implementation, dependency, or deferral path.

## Finding Status Types

Every major finding must eventually receive one of these statuses in `task-map.md`, `baseline-verification.md`, or the final completion report:

1. **Implementable now:** The finding can be addressed with existing code, current content, and available assets.
2. **Needs user data:** The finding requires verified business information before implementation.
3. **Needs asset decision:** The finding requires a decision about existing project photography, video, audio, crop, overlay, treatment, placement, visual prominence, or whether an existing asset should be used at all before implementation.
4. **Needs baseline verification:** The finding must be checked in the current browser state before implementation priority can be set.
5. **Duplicate or overlap with another finding:** The finding is covered by a combined task. The status must identify the task category where the combined issue is handled.
6. **Already resolved in current app state:** Browser verification confirms the finding no longer reproduces in the current app. The original finding remains preserved in `audit-findings.md`.
7. **Deferred with explicit reason:** The finding is intentionally delayed. The status must include a concrete reason and cannot be used only because the work is hard.

Status assignment is a tracking requirement, not permission to weaken the audit. A finding with a dependency or deferral status remains part of the audit record until final completion.

## Technical Architecture Coverage

The technical findings from the Claude Code Motion Architecture Technical Briefing must be represented in `task-map.md` and verified during implementation. This plan does not prescribe exact code changes, but it requires future tasks to preserve and map the technical evidence.

Technical coverage must include:

1. `src/utils/animation.ts`.
2. `src/utils/scroll.ts`.
3. `src/hooks/useScrollY.ts`.
4. `src/hooks/useEntryReveal.ts`.
5. `src/hooks/useStaggeredReveal.ts`.
6. CSS keyframe animation system.
7. CSS transitions triggered by JS inline-style mutations.
8. RAF-driven scroll-mapped inline style mutations.
9. IntersectionObserver and `setTimeout` stagger reveal system.
10. Global SVG film grain overlay.
11. Navbar reveal, scrolled state, and dark-section behavior.
12. Mobile menu enter/exit behavior.
13. Hero parallax and veil behavior.
14. `CinematicPanel` sticky progress behavior.
15. `CinematicEntry` behavior.
16. `ScrollLine` behavior.
17. About Aaron motion behavior.
18. Booking step transition behavior.
19. Reduced-motion behavior.
20. Section transition behavior.

Future implementation must not add additional animation systems or scroll listeners unless the need is documented and the existing shared infrastructure cannot support the behavior.

## User Data And Asset Dependencies

Some findings cannot be fully implemented until verified business information or approved asset decisions exist. Agents must not fabricate these inputs.

No new photoshoot is expected for this project. No new photos of Aaron will be taken. Future agents must use only existing project assets unless the user explicitly provides new media later.

Asset decisions mean choosing from existing project assets, approving crop/treatment/placement, approving reduced visual prominence, or approving whether an existing image should be used at all. If existing assets are insufficient for a perfect image solution, agents must document the limitation rather than request a photoshoot or invent assets.

Visual cohesion must be solved through existing asset selection, crop, overlay, color treatment, masking, vignette, grain, layout, placement, scale, or reducing the dominance of a clashing image. This constraint does not lower the target for Photography, Art Direction, Visual Cohesion, Visual Quality, or Visual Rhythm; agents must still aim for `100 / 100` within the existing-asset solution space.

Examples of user-data or asset dependencies:

1. Real testimonials.
2. Real external review links.
3. Confirmed phone number.
4. Confirmed email.
5. Confirmed response-time policy.
6. Confirmed price or price range.
7. Confirmed beach lesson location.
8. Existing project image selection, crop, treatment, placement, or reduced visual prominence.
9. Video/audio policy.
10. Booking backend or form-submission destination.

Missing business facts or asset decisions must be documented as dependencies, not silently filled in. If a dependency blocks full implementation, the engineering task should still complete any verifiable structure, accessibility, routing, treatment, crop, overlay, placement, or display logic that does not require fabricated content or new media.

## Non-Negotiable Direction

Future implementation is a completion and refinement pass, not a full redesign.

Do not:

1. Replace the current website with a new concept.
2. Redesign the site from scratch.
3. Remove the cinematic atmosphere.
4. Remove the Maui-specific emotional direction.
5. Remove the distinction between visitors and locals.
6. Remove the booking flow concept.
7. Remove the About Aaron chapter concept.
8. Remove the existing premium editorial direction.
9. Flatten the page into a generic service-business layout.

Do:

1. Preserve the hero concept, cinematic scroll language, editorial typography, Maui location signal, and premium hospitality tone.
2. Repair gaps that make the current direction feel unfinished.
3. Make functional sections feel authored instead of generic.
4. Keep SEO content useful without letting it read like crawler copy.
5. Make conversion information visible without turning the page into a sales sheet.

## Main Weaknesses Identified By The Audit

Original baseline weaknesses as of June 18, 2026 audit. Status updated June 21, 2026 after implementation pass. See `task-map.md` for per-category completion status.

1. Dead or under-designed scroll zones between major sections, especially around Beach Lessons and Weekly Lessons. — **Structurally addressed:** `SectionHandoff` placed at all six transition points; CinematicPanel 1 height raised to 226vh. Browser verification of visual continuity still needed.
2. No unified motion architecture across section entrances, exits, and handoffs. — **Partially addressed:** Exit choreography added to BeachLessons, WeeklyLessons, AboutAaron via `useScrollY`; section handoffs implemented. Phase 1 interaction console check was clean. Full choreography audit (slow-scroll dead zones, reduced-motion, handoff timing) still requires final browser pass.
3. The SEO/info block breaks tone and reads like it belongs to a different site. — **Resolved:** Keyword-list paragraph removed; replaced with editorial copy. Info cards restyled with left-border accent treatment. Persistent conversion line surfaced outside FAQ accordion.
4. The FAQ and info cards are structurally useful but visually generic. — **Partially addressed:** Info cards restyled; FAQ accessible accordion verified in source and keyboard expansion verified in browser. Final visual/reduced-motion confirmation remains.
5. The About Aaron chapter system is not discoverable enough during natural scrolling. — **Partially addressed:** Chapter 1 now opens with teaching-purpose sentence; hint animation on viewport entry. One-time hint is still the only natural-scroll discoverability mechanism. Browser verification needed.
6. The booking flow is conceptually strong but needs clearer inquiry/confirmation expectations, contextual entry from CTAs, and stronger step feedback. — **Resolved:** Context label from Beach/Weekly CTAs, explicit inquiry status before submit, response time at contact step, and payment method in sent state all implemented. Reduced-motion static form implemented.
7. Pricing, location, lesson outcomes, response time, and social proof appear too late or not at all. — **Partially resolved:** Price, location, and outcome visible in Beach and Weekly conversion rows before booking. Response time in booking contact step. Social proof remains dependency-blocked (no real testimonials provided).
8. Photography and overlays are inconsistent, creating two competing visual worlds. — **Partially addressed:** CSS filter treatment applied to BeachLessons editorial photo, WeeklyLessons scene image, and BookingSection background. Phase 2 strengthened Beach right-panel image (`aaron-tourists-1.jpg`) treatment and captured browser screenshots. Booking background and full-page art-direction acceptance remain open.
9. The dark palette has insufficient tonal relief in the second half of the page. — **Structurally addressed:** SectionHandoff variants provide tonal gradient relief at every major handoff. Visual effectiveness requires browser confirmation.
10. Footer contact and closing experience are too minimal for high-intent visitors. — **Partially addressed:** `useEntryReveal` closing reveal active; `closing` SectionHandoff placed before Footer. Phone/text path dependency-blocked (no confirmed phone number).

## Highest Priority Improvement Areas

1. **Booking and conversion clarity:** expose price, location, outcome, social proof, response expectations, and inquiry status before the visitor is asked to submit.
2. **Motion architecture:** eliminate dead voids, coordinate section exits/entries, stagger cinematic lines, and make transitions readable as intentional.
3. **Visual cohesion:** reconcile photo choices, overlays, color temperature, and section backgrounds so all imagery belongs to one coastal cinematic world.
4. **About Aaron discoverability:** make all four chapters accessible and visible without requiring a hidden interaction.
5. **SEO/FAQ integration:** keep search value and practical answers while bringing those sections into the site's editorial voice and visual system.

## Score Blockers

These are the lowest scoring or highest-leverage blockers. Baseline scores are from the original June 2026 audit. Implementation work completed June 21, 2026 has partially addressed several blockers — remaining gaps are noted. All scores still target `100 / 100`. See the Rating Target Table for the full picture.

### Transition Quality — Baseline 44 / 100

Original blockers: hard section seams, content-free near-black gaps, missing section exits, weak FAQ-to-booking movement, unceremonious footer arrival.

**Post-implementation state:** `SectionHandoff` placed at all six transition points with distinct tonal gradients and ghosted images. CinematicPanel 1 height raised to 226vh. `closing` SectionHandoff precedes Footer. `useEntryReveal` active in Footer.

**Remaining blockers:** Visual continuity of every handoff, slow/fast scroll readability, and footer closing frame effectiveness require final browser verification. Phase 1 browser evidence exists for key interactions and screenshots, but not for the full motion choreography.

### Conversion Readiness — Baseline 52 / 100

Original blockers: hidden pricing, no external social proof, no fast contact path, unclear booking/inquiry status, late location information, insufficient weekly lesson value detail.

**Post-implementation state:** Price, location, and outcome surfaced in Beach and Weekly conversion rows. Explicit inquiry status and response time in booking flow. Context labels from Beach/Weekly CTAs. Payment method disclosed in sent state.

**Remaining blockers:** Social proof (testimonials/reviews) is dependency-blocked — no real testimonials provided. Phone/text fast contact path is dependency-blocked — no confirmed number. These two items cap the score ceiling until user data is supplied.

### Photography — Baseline 52 / 100

Original blockers: "two photo worlds" problem — atmospheric coastal imagery beside bright saturated documentary images without unifying treatment.

**Post-implementation state:** CSS filters applied to BeachLessons editorial photo (brightness 0.72, saturate 0.78, contrast 0.94), WeeklyLessons scene image (brightness 0.82, saturate 0.85, contrast 0.96), and BookingSection background (brightness 0.55, saturate 0.7, contrast 1.05). Weekly editorial photo changed to `aaron-teaching-1.jpg`.

**Remaining blockers:** Beach right-panel image (`aaron-tourists-1.jpg`) has improved treatment and browser screenshots but still needs final art-direction acceptance. Pull quote image integration remains partially verified. BookingSection background (green foliage composition) may still read as foreign despite filter treatment. Final browser QA required to assess effective resolution.

### Art Direction — Baseline 55 / 100

Original blockers: inconsistent image selection and overlay discipline across beach lesson, pull quote, and booking imagery.

**Post-implementation state:** Filter treatment applied to multiple images. SectionHandoff ghosted images at 10–20% opacity with desaturate/contrast filters.

**Remaining blockers:** Whether all treated images now read as belonging to the coastal cinematic system requires final browser observation. Beach image treatment is improved; no asset-replacement decision has been made for images where filter treatment may still be insufficient.

### Overall Visual Cohesion — Baseline 58 / 100

Original blockers: mixed photo worlds, generic functional sections, under-integrated FAQ/SEO layouts, uneven visual rhythm.

**Post-implementation state:** SEO copy replaced with editorial voice. FAQ info cards restyled with left-border accent. SectionHandoff system provides tonal rhythm across the full page.

**Remaining blockers:** Visual continuity of the full page as a single authored experience requires final browser review. Beach photo cohesion is improved; Booking background and overall photo-world cohesion still need final acceptance.

### Interaction Design — Baseline 58 / 100

Original blockers: booking step motion functional but not authored, generic microinteractions, mobile menu behavior, About chapter discoverability, keyboard/reduced-motion verification needed.

**Post-implementation state:** Booking flow context labels, explicit inquiry status, reduced-motion static form. About Aaron ARIA slider, keyboard nav (ArrowKeys, Home, End), hint animation on viewport entry.

**Remaining blockers:** About chapter discoverability in natural scroll is the highest remaining gap here. Keyboard tab order, visible focus states, mobile menu polish, and reduced-motion behavior all require browser verification.

### Overall Motion System — Baseline 65 / 100

Original blockers: multiple coexisting motion systems, no documented global choreography, opacity-heavy reveals, weak exits, uncoordinated section transitions.

**Post-implementation state:** Exit choreography added to BeachLessons, WeeklyLessons, AboutAaron via shared `useScrollY` singleton. `useEntryReveal` comment documenting intentional-unused status added. `CinematicEntry` confirmed on shared singleton (prior isolated-listener claim was stale).

**Remaining blockers:** Full choreography read — whether the page now feels like one motion system rather than independent animated sections — requires a complete browser scroll pass. Cinematic panel line stagger timing, section exit timing, and dead zone elimination remain open for final motion QA.

## Recommended Implementation Order

### 1. Baseline Verification Pass

**Purpose:** Establish the current behavior before implementation begins.

**Why this phase comes first:** The audit archive contains observations from multiple passes. Some findings conflict because later observations captured behavior that earlier passes missed. Agents must verify the present app before changing it.

**Required outcomes:**

1. Run the site locally.
2. Record current behavior for hero, cinematic panels, Beach Lessons, Weekly Lessons, About Aaron, SEO/FAQ, booking, and footer.
3. Note any audit finding that no longer matches current behavior.
4. Do not change source code during this phase.

**Score categories affected:** All categories indirectly, because this phase prevents work from being based on stale assumptions.

**Completion criteria:**

1. A current-state checklist exists.
2. Conflicting findings are documented, not silently resolved.
3. The next implementation task can identify its exact source finding and current app behavior.

### 2. Global Motion Architecture

**Purpose:** Establish one coherent motion model before local section edits.

**Why this phase comes here:** Dead zones and uncoordinated scroll behavior affect multiple sections. Fixing section copy or imagery first can be invalidated if scroll timing changes later.

**Required outcomes:**

1. No content-free near-black viewport gaps remain.
2. Scroll-triggered entrances and exits follow a consistent timing logic.
3. Cinematic line reveals support the structure of the copy.
4. Reduced-motion mode exposes all content without motion dependency.
5. Any separate scroll listener or animation system is justified or consolidated.

**Score categories affected:** Transition Quality, Overall Motion System, Motion Design, Scroll Experience, Emotional Impact, Portfolio Quality, Overall Experience.

**Completion criteria:**

1. Full-page slow scroll shows no dead viewport-height voids.
2. Major animated sections have entry and exit behavior.
3. Reduced-motion browser testing passes.
4. No console errors appear during scroll.

### 3. Global Section Transitions

**Purpose:** Make every major handoff feel authored.

**Why this phase comes here:** Once the motion architecture is stable, each section boundary can be assigned a deliberate role: chapter turn, audience pivot, tonal bridge, conversion approach, or closing frame.

**Required outcomes:**

1. Hero to cinematic panel has a coordinated visual handoff.
2. Cinematic panel to Beach title card does not hard-cut.
3. Beach to Weekly transition preserves the visitor/local pivot.
4. Weekly to About establishes About as its own chapter.
5. About to SEO avoids emotional collapse.
6. FAQ to Booking creates a clear movement toward action.
7. Booking to Footer resolves the page with a deliberate close.

**Score categories affected:** Transition Quality, Emotional Impact, Cohesion, Visual Rhythm, Perceived Polish, Overall Motion System.

**Completion criteria:**

1. Each handoff can be named and described in browser.
2. No handoff relies only on accidental adjacency.
3. Fast and slow scroll passes both remain readable.

### 4. Visual Asset And Overlay System

**Purpose:** Reconcile image selection, cropping, overlays, and color temperature.

**Why this phase comes here:** Once scroll and transitions are stable, imagery can be treated in context. Image fixes must be judged by the sections around them, not as isolated assets.

**Required outcomes:**

1. Beach scrolljack image no longer clashes with the dark cinematic system.
2. Pull quote image either matches the visual world or is treated to belong to it.
3. Booking background image supports the coastal Maui identity through existing-asset selection, treatment, crop, placement, reduced dominance, or another approved existing project asset.
4. Title card overlays sit at the correct value relative to adjacent dark sections.
5. About Aaron color temperature is reconciled without losing the chapter concept.

**Score categories affected:** Photography, Art Direction, Overall Visual Cohesion, Visual Identity, Visual Rhythm, Premium Feel, Portfolio Visual Quality.

**Completion criteria:**

1. No primary image reads as a separate website or generic activity thumbnail.
2. Text remains readable on every treated image.
3. Desktop and mobile crops preserve subject and atmosphere.

### 5. Hero And Visitor/Local Positioning

**Purpose:** Preserve the strong hero while adding only necessary clarity.

**Why this phase comes here:** The hero is already one of the strongest elements. It should be edited only after the global system reveals whether above-fold clarity is still needed.

**Required outcomes:**

1. Hero concept, image, location stamp, headline, and subhead remain recognizable.
2. CTA hierarchy remains clear.
3. Any added practical cue does not crowd the first viewport.
4. Visitor and local paths remain understandable.

**Score categories affected:** Storytelling, Emotional Impact, Conversion Readiness, Premium Feel, Overall Experience.

**Completion criteria:**

1. Desktop and mobile first-viewport screenshots show no crowding.
2. Hero CTAs route correctly.
3. The opening still reads as cinematic, not informational-first.

### 6. Beach Lessons

**Purpose:** Make the visitor offer emotionally strong and practically complete.

**Why this phase comes here:** Beach Lessons is the primary tourist conversion section and is affected by motion, image, price, location, outcome, and CTA context.

**Required outcomes:**

1. Scroll rhythm is repaired.
2. Visitor location context appears before the SEO section.
3. Price or price range appears before deep booking steps.
4. The "play a complete song" outcome or equivalent is visible without opening FAQ.
5. The CTA carries beach lesson intent into booking.

**Score categories affected:** Conversion Readiness, Emotional Impact, Storytelling, Photography, Visual Cohesion, Scroll Experience, Overall Conversion Score.

**Completion criteria:**

1. "BOOK A BEACH LESSON" lands on booking with beach context acknowledged.
2. Visitor can understand price, location, and likely outcome before form submission.
3. Section works on mobile without hidden controls or text overlap.

### 7. Weekly Lessons

**Purpose:** Make the local/long-term resident offer concrete enough for recurring commitment.

**Why this phase comes after Beach Lessons:** The page is structured tourist-first. The weekly offer must build from, not compete with, the visitor arc.

**Required outcomes:**

1. The visitor/local distinction remains explicit.
2. Weekly lesson pricing or pricing guidance appears.
3. Progress expectations are concrete.
4. Aaron's teaching approach is differentiated without generic claims.
5. The weekly CTA carries local/weekly context into booking.

**Score categories affected:** Conversion Readiness, Storytelling, Cohesion, Overall Conversion Score, Premium Feel.

**Completion criteria:**

1. A local visitor can identify cost context, lesson cadence, and expected progress.
2. "LET'S FIND A TIME" does not imply a calendar if no calendar exists.
3. Booking flow acknowledges weekly intent when entered from the weekly CTA.

### 8. About Aaron

**Purpose:** Preserve the chapter concept while making all chapters discoverable and useful for trust.

**Why this phase comes here:** Visitor and weekly offers define what the user needs to trust. About Aaron should then answer why Aaron is credible for those offers.

**Required outcomes:**

1. All four chapters are discoverable during natural browsing.
2. Chapter controls are keyboard and touch accessible.
3. First visible About copy includes teaching purpose or student outcome.
4. Rapid chapter changes do not leave text invisible.
5. The chapter system remains a narrative, not a credential list.

**Score categories affected:** Storytelling, Portfolio Quality, Conversion Readiness, Interaction Design, Accessibility, Overall Experience.

**Completion criteria:**

1. Mouse, touch, and keyboard can reach every chapter.
2. Active chapter state is visible and accessible.
3. Mobile layout keeps chapter text readable against imagery.

### 9. SEO And Information Section

**Purpose:** Keep search value and practical details without breaking the editorial voice.

**Why this phase comes after core story sections:** SEO content must support the existing narrative, not define the narrative.

**Required outcomes:**

1. Visible copy no longer reads as a keyword list.
2. Lesson types, locations, service areas, and beginner suitability remain clear.
3. Search phrases appear naturally in headings, body copy, metadata, or structured content.
4. Info cards or replacements feel specific to Maui music lessons.
5. The transition from About/CinematicEntry into this section is controlled.

**Score categories affected:** Cohesion, Originality, Premium Feel, Typography, Portfolio Visual Quality, Overall Visual Quality, Storytelling.

**Completion criteria:**

1. A human reader can understand the section without encountering crawler-sounding prose.
2. Local SEO information is still present.
3. Layout, typography, and motion match the site's design system.

### 10. FAQ

**Purpose:** Keep hesitation-removal content while removing generic section behavior.

**Why this phase comes after SEO:** FAQ and SEO share practical information. They should be integrated as one authored lower-page information system.

**Required outcomes:**

1. FAQ remains an accessible accordion.
2. High-value answers are surfaced outside hidden accordion state when needed.
3. Layout is balanced on desktop and readable on mobile.
4. Visual treatment reflects the site, not a default template.
5. Reduced-motion behavior is respected.

**Score categories affected:** Originality, Perceived Polish, Typography, Interaction Design, Conversion Readiness, Accessibility.

**Completion criteria:**

1. FAQ buttons expose correct expanded/collapsed state.
2. Keyboard operation works.
3. Critical conversion facts are visible before booking.

### 11. Booking Flow And CTA Routing

**Purpose:** Complete the conversion path while preserving the guided conversational flow.

**Why this phase comes after offer sections:** Booking needs context from Beach, Weekly, SEO, FAQ, and trust content. Implementing it earlier risks a generic form.

**Required outcomes:**

1. Section-specific CTAs pass or display intent.
2. Price appears before surprise or form-wall moments.
3. The flow clearly states inquiry/request status before final submit.
4. Date or timing request is specific enough for tourists.
5. Confirmation state explains next steps and response expectations.
6. Step transitions feel deliberate and remain accessible.

**Score categories affected:** Conversion Readiness, Overall Conversion Score, Interaction Design, Premium Feel, Storytelling, Motion Design.

**Completion criteria:**

1. All booking paths can be completed in browser.
2. Back navigation preserves selections.
3. Required-field validation works.
4. Keyboard and mobile operation pass.
5. Final state does not imply confirmed booking unless confirmation is real.

### 12. Footer And Trust Paths

**Purpose:** Give high-intent users a useful final destination and make the page end deliberately.

**Why this phase comes after booking:** Footer content must align with the booking response model and direct-contact policy.

**Required outcomes:**

1. Footer exposes confirmed contact paths.
2. Footer links work and have accessible focus states.
3. The page has a closing visual or motion statement.
4. Footer remains quiet and does not become a second landing page.

**Score categories affected:** Conversion Readiness, Premium Feel, Transition Quality, Perceived Polish, Overall Experience.

**Completion criteria:**

1. Contact links work.
2. Footer is readable on mobile.
3. Booking-to-footer transition feels intentional.

### 13. Conversion And Trust Pass

**Purpose:** Verify that practical decision-making information exists across the full journey.

**Why this phase comes here:** After individual sections are repaired, conversion facts must be checked as a system.

**Required outcomes:**

1. Price or price range appears before final submission.
2. Location/service area appears before SEO or booking-only moments.
3. Response expectations are clear.
4. Social proof is added only if real proof is available.
5. Unsupported trust claims are not introduced.

**Score categories affected:** Conversion Readiness, Overall Conversion Score, Trust-related blockers in Premium Feel and Portfolio Quality.

**Completion criteria:**

1. Tourist journey exposes price, location, outcome, and next step.
2. Local journey exposes recurring value and progress expectation.
3. No fake testimonial, fake review, fake rating, or unverifiable claim exists.

### 14. Accessibility Pass

**Purpose:** Verify that the cinematic experience remains usable for keyboard, screen-reader, reduced-motion, and touch users. Includes WCAG 2.1 AA conformance remediation (deferred to a future phase after Phase 3–5 completion).

**Why this phase comes after interaction work:** Accessibility must be checked after controls and motion are implemented, not before.

**WCAG 2.1 AA status:** A WCAG 2.1 AA audit was completed June 21, 2026. Confirmed failures are documented in `baseline-verification.md` and `task-map.md` Category 15. These are deferred to a future remediation phase and will not block Phases 3–5 from proceeding. The site cannot claim WCAG 2.1 AA conformance until all confirmed failures are resolved.

Confirmed failures (deferred):
1. Skip link missing — 2.4.1 Level A
2. Focus rings absent on navbar links, hero CTAs, footer nav — 2.4.7 / 1.4.11 Level A + AA
3. Video no pause control — 2.2.2 Level A
4. Booking contact inputs lack `autocomplete` — 1.3.5 AA

Partial findings requiring investigation (deferred):
5. Contrast on navbar/footer at variable scroll positions — 1.4.3
6. Unlabeled landmark sections (#hero, #about, #book) — 4.1.2
7. Booking back button accessible name per step — 4.1.2

**Required outcomes:**

1. All interactive controls are keyboard-operable.
2. Focus states are visible.
3. Motion alternatives are complete.
4. Forms have labels, validation messages, and accessible errors.
5. Text contrast is sufficient against image overlays.
6. WCAG 2.1 AA confirmed failures resolved (deferred phase).

**Score categories affected:** Interaction Design, Conversion Readiness, Overall Experience, Accessibility-dependent task-map categories.

**Completion criteria:**

1. Keyboard-only full-page navigation succeeds.
2. Reduced-motion mode shows all content.
3. FAQ, About chapters, booking tiles, date chips, nav, and footer controls pass interaction checks.
4. All WCAG 2.1 AA confirmed failures resolved and re-verified (deferred — required before WCAG conformance claim).

### 15. Responsive Pass

**Purpose:** Verify that the experience works across mobile, tablet, desktop, and short viewport heights.

**Why this phase comes after content and interaction work:** Copy, layout, images, and controls must be close to final before responsive verification has meaning.

**Required outcomes:**

1. No horizontal overflow.
2. No text/control overlap.
3. Sticky or scrolljack sections remain navigable.
4. Booking flow fits on mobile.
5. About and FAQ controls remain usable by touch.

**Score categories affected:** Scroll Experience, Interaction Design, Typography, Conversion Readiness, Overall Experience.

**Completion criteria:**

1. Browser verification passes at `360`, `390`, `768`, `1024`, `1280`, and `1440` widths.
2. Mobile first viewport remains coherent.
3. No CTA or form control is clipped.

### 16. Performance Pass

**Purpose:** Preserve smooth cinematic behavior while controlling media and scroll cost.

**Why this phase comes near the end:** Performance must be measured after final media, motion, and layout decisions are in place.

**Required outcomes:**

1. Production build succeeds.
2. Scroll performance remains smooth.
3. Media assets are appropriately sized and compressed.
4. Continuous animation is disabled or reduced when appropriate.
5. No new console errors or layout shift issues are introduced.

**Score categories affected:** Perceived Polish, Scroll Experience, Overall Motion System, Portfolio Quality, Overall Experience.

**Completion criteria:**

1. Local production build passes.
2. Browser performance inspection shows no obvious scroll jank.
3. Network inspection does not reveal avoidable oversized image or media assets.

### 17. Final Audit Verification

**Purpose:** Confirm that the work satisfies the audit, not just individual tickets.

**Why this phase comes last:** Every score reaches `100 / 100` only when local fixes work together across the full page.

**Required outcomes:**

1. Every major finding has a task-map home.
2. Every rating has a documented path to `100 / 100`.
3. Every future implementation task has acceptance criteria.
4. Every task can be verified in browser.
5. The current site direction is preserved.

**Score categories affected:** All categories.

**Completion criteria:**

1. Full page browser QA passes.
2. Visitor and local journeys both pass.
3. Booking paths pass.
4. Reduced motion, keyboard, responsive, and performance checks pass.
5. Remaining dependencies are limited to explicit user-provided data or approved existing-asset decisions, such as real testimonials, verified phone number, or a decision about which existing asset/treatment to use.

## Rating Target Table

Baseline scores are from the original June 2026 audit. All scores target `100 / 100`. The "Remaining blockers" column reflects execution-stage state as of June 21, 2026. Scores have not been re-rated; re-rating requires final holistic browser QA (Category 18).

| Audit Area | Baseline | Target | Remaining Blockers (Post-Implementation) | Responsible Task Categories |
|---|---:|---:|---|---|
| Storytelling | 74 | 100 | About chapter discoverability still depends on one-time hint; all content present | About Aaron; Final Verification |
| Emotional Impact | 78 | 100 | SectionHandoff addresses dead zones structurally; full slow-scroll continuity still needs final verification | Global motion architecture; Global section transitions; Final Verification |
| Atmosphere | 82 | 100 | SEO atmosphere drop resolved; Beach image improved; Booking background and full atmosphere pass remain | Cinematic panels; Final Verification |
| Cohesion | 66 | 100 | SEO/FAQ integrated; Beach image improved; Booking/background photo-world cohesion still needs final acceptance | Visual Asset And Overlay System; Final Verification |
| Originality | 80 | 100 | SEO voice resolved; FAQ keyboard/rendering sampled; final visual/reduced-motion treatment remains | FAQ; Final Verification |
| Premium Feel | 72 | 100 | Booking resolution verified; visual consistency and handoff polish still need final pass | Visual cohesion; Final Verification |
| Conversion Readiness | 52 | 100 | Price/location/outcome, CTA context, booking paths, validation verified; social proof and phone path dependency-blocked | Conversion And Trust (dependency); Final Verification |
| Portfolio Quality | 77 | 100 | SEO resolved; booking verified; visual cohesion, motion, and About natural-scroll discoverability remain | Final Verification |
| Overall Experience | 73 | 100 | Lower-half structural work and key interactions verified; holistic browser pass needed | Final Verification |
| Overall Motion System Rating | 68 | 100 | Exit choreography added; system-level motion read still needs final slow-scroll pass | Global motion architecture; Final Verification |
| Motion Design | 72 | 100 | Section-level exits added; unified choreography read still needs final verification | Global motion architecture; Final Verification |
| Transition Quality | 44 | 100 | SectionHandoff and panel heights address structure; final visual continuity pass required | Global section transitions; Final Verification |
| Scroll Experience | 65 | 100 | Dead zone structure addressed; real slow/normal scroll timing still needs final pass | Global motion architecture; Final Verification |
| Interaction Design | 58 | 100 | Booking, FAQ, About keyboard, mobile menu verified; About natural-scroll discovery and exhaustive keyboard/reduced-motion remain; **WCAG 2.1 AA failures confirmed June 21, 2026 (deferred): skip link missing (2.4.1), focus rings absent on navbar/hero CTAs/footer nav (2.4.7/1.4.11), video no pause control (2.2.2), autocomplete missing on booking contact inputs (1.3.5)** | Accessibility; Responsive Behavior; Final Verification |
| Perceived Polish | 74 | 100 | Generic blocks reduced; transition polish still needs final browser pass | Final Verification |
| Motion Originality | 77 | 100 | Cinematic language preserved; lower-section motion polish still needs final pass | Final Verification |
| Motion Portfolio Quality | 68 | 100 | Closing SectionHandoff + Footer reveal added; effectiveness still needs final verification | Footer; Final Verification |
| Overall Motion System | 65 | 100 | Architecture improved but system-level coherence still needs final slow-scroll verification | Final Verification |
| Overall Visual Cohesion Score | 58 | 100 | Beach image treatment improved; Booking background and full photo-world acceptance remain | Visual Asset And Overlay System; Final Verification |
| Visual Identity | 62 | 100 | Typography/color intact; final photo identity cohesion pass remains | Visual Asset And Overlay System; Final Verification |
| Art Direction | 55 | 100 | Beach image treatment improved; Booking/background and full art-direction read remain | Visual Asset And Overlay System; Final Verification |
| Photography | 52 | 100 | Filters applied to multiple images; Beach right-panel improved; Booking background cohesion remains | Visual Asset And Overlay System; Final Verification |
| Typography | 74 | 100 | SEO hierarchy improved; sampled desktop/mobile rendering good; exhaustive responsive typography pass remains | Responsive Behavior; Final Verification |
| Visual Rhythm | 60 | 100 | SectionHandoff tonal rhythm added; full-page rhythm still needs final pass | Final Verification |
| Portfolio Visual Quality | 63 | 100 | SEO/FAQ design improved; Beach image improved; final visual edit remains | Final Verification |
| Overall Visual Quality | 59 | 100 | Structure and copy improved; browser visual pass needed for re-rating | Final Verification |
| Overall Conversion Score | 62 | 100 | Price/location/outcome/status resolved; social proof dependency-blocked | Conversion And Trust (dependency); Final Verification |

## What 100/100 Means

### Storytelling

Storytelling reaches `100 / 100` only when the page has a complete readable arc: hero promise, visitor offer, local offer, Aaron's full chapter story, practical information, FAQ reassurance, booking request, and footer close. All four About chapters must be discoverable. SEO content must support the story instead of interrupting it. Booking must make the final next step explicit.

### Emotional Impact

Emotional Impact reaches `100 / 100` only when no dead scroll zone breaks momentum, every major emotional peak has a clean lead-in and exit, the visitor/local pivot lands clearly, the pull quote or equivalent trust moment remains visible, and booking provides a clear payoff instead of ambiguity.

### Atmosphere

Atmosphere reaches `100 / 100` only when every section belongs to the cinematic Maui music lesson world. Dark sections must include deliberate texture, image, transition, or copy purpose. Practical sections must use the same editorial voice, type system, spacing, and visual restraint as the cinematic sections.

### Cohesion

Cohesion reaches `100 / 100` only when the hero, cinematic panels, Beach Lessons, Weekly Lessons, About Aaron, SEO/info, FAQ, booking, and footer feel like one authored experience. Functional information must not look like a separate template. Images must share a consistent coastal visual language or a deliberate treatment that unifies them.

### Originality

Originality reaches `100 / 100` only when the custom choices remain visible across the whole page: cinematic scroll beats, visitor/local audience split, About chapter structure, human booking flow, Maui-specific copy, and authored lower-page practical sections. FAQ, SEO, and footer cannot read as generic service-business blocks.

### Premium Feel

Premium Feel reaches `100 / 100` only when the site does not leave visitors stranded, does not show unfinished scroll zones, does not expose crawler-sounding visible copy, does not use visually incompatible feature images, and does not rely on generic cards or accordions without site-specific treatment.

### Conversion Readiness

Conversion Readiness reaches `100 / 100` only when a first-time visitor can identify price or price range, location/service area, lesson outcome, response expectation, booking/request status, and a contact path before or during booking without searching the footer or opening every FAQ item.

### Portfolio Quality

Portfolio Quality reaches `100 / 100` only when a reviewer can scroll the full page and see finished craft in motion, transitions, imagery, copy, interaction, accessibility, and conversion. No major section may read as a prototype, placeholder, SEO compromise, or unfinished implementation.

### Overall Experience

Overall Experience reaches `100 / 100` only when the full journey from hero to footer is complete, coherent, accessible, responsive, performant, and conversion-capable while preserving the cinematic Maui direction.

### Overall Motion System Rating

Overall Motion System Rating reaches `100 / 100` only when the site has a documented, consistent motion architecture across load-in, scroll, section entry, section exit, interactive states, reduced-motion mode, and footer close.

### Motion Design

Motion Design reaches `100 / 100` only when motion supports content hierarchy. Hero load-in, cinematic lines, scrolljack reveals, About chapter changes, FAQ disclosure, booking steps, and footer arrival must each have timing and behavior that matches their role.

### Transition Quality

Transition Quality reaches `100 / 100` only when every major section handoff has an intentional visual transition, no content-free viewport gaps remain, section exits are designed as clearly as section entries, and the footer arrival feels like a deliberate closing frame.

### Scroll Experience

Scroll Experience reaches `100 / 100` only when slow scrolling, normal scrolling, direct nav jumps, and mobile scrolling all keep the user oriented. Sticky sections must not trap, hide, or delay content. Scroll-triggered copy must become visible before the user suspects the page is broken.

### Interaction Design

Interaction Design reaches `100 / 100` only when every interactive element has a clear state, accessible keyboard behavior, touch behavior, hover/focus behavior where applicable, and response timing. Booking steps, About chapters, FAQ items, nav controls, media controls, and footer links must all be verified in browser.

### Perceived Polish

Perceived Polish reaches `100 / 100` only when visible seams, unfinished voids, generic lower-page blocks, inconsistent media treatment, awkward line breaks, clipped controls, and unexplained interaction states are absent at common desktop and mobile sizes.

### Motion Originality

Motion Originality reaches `100 / 100` only when the cinematic motion language remains distinctive beyond the hero. Lower sections, FAQ, booking, and footer must contain motion decisions that support the site's point of view without adding distracting effects.

### Motion Portfolio Quality

Motion Portfolio Quality reaches `100 / 100` only when a motion reviewer can identify a system-level choreography: consistent easing, coordinated section handoffs, intentional exits, meaningful stagger, accessible reduced-motion behavior, and a closing motion statement.

### Overall Motion System

Overall Motion System reaches `100 / 100` only when the site no longer feels like independent animated sections. The scroll listener strategy, timing constants, reveal patterns, reduced-motion behavior, and transition decisions must operate as one maintainable system.

### Overall Visual Cohesion Score

Overall Visual Cohesion Score reaches `100 / 100` only when every photo, overlay, crop, background, card, accordion, and section texture belongs to the same coastal cinematic identity. No image may read as an unrelated activity thumbnail or ungraded candid inserted into an editorial system.

### Visual Identity

Visual Identity reaches `100 / 100` only when typography, color, image treatment, spacing, CTA styling, practical content blocks, and footer behavior all express the same Maui music lesson brand. The identity must remain recognizable beyond the hero.

### Art Direction

Art Direction reaches `100 / 100` only when every image choice and treatment is intentional for subject, setting, light quality, color temperature, crop, and adjacent section context. If an image does not support the coastal cinematic system, it must be treated, recropped, repositioned, reduced in visual dominance, removed from a dominant role, or replaced with another existing project asset until the strongest achievable existing-asset solution is reached.

### Photography

Photography reaches `100 / 100` only when the hero, Beach Lessons, Weekly Lessons, pull quote, About Aaron, cinematic bridge, booking, and footer imagery share a coherent visual world or are deliberately differentiated for a documented reason. Overlays must preserve readability and unify color/value.

### Typography

Typography reaches `100 / 100` only when display type, body copy, labels, nav, FAQ, booking fields, cards, and footer text use consistent hierarchy, readable line lengths, responsive sizing, and no wasted ghost headlines or awkward low-contrast text.

### Visual Rhythm

Visual Rhythm reaches `100 / 100` only when the page alternates density, image, text, darkness, relief, and action in a controlled sequence. Bright images, flat sections, and dense copy blocks must not interrupt the rhythm without a transition or visual rationale.

### Portfolio Visual Quality

Portfolio Visual Quality reaches `100 / 100` only when an art director can review the full page without identifying unfinished image edits, generic template sections, unresolved overlay decisions, or visual compromises that weaken the concept.

### Overall Visual Quality

Overall Visual Quality reaches `100 / 100` only when concept, typography, imagery, motion, practical content, responsive behavior, and final page rhythm are all visually resolved in browser.

### Overall Conversion Score

Overall Conversion Score reaches `100 / 100` only when tourists, locals, skeptical first-time visitors, and high-intent visitors can each understand the offer, trust Aaron, evaluate price and logistics, submit or contact confidently, and know what happens next.

## Finding Translation Rules

Future agents must convert audit findings into implementation work using these rules:

1. Preserve the original finding. Do not edit `audit-findings.md` to make a problem sound smaller or easier.
2. Translate subjective critique into concrete acceptance criteria. For example, convert "jarring tonal drop" into criteria about visible copy tone, section transition, typography, layout, and adjacent-section continuity.
3. If multiple findings describe the same issue, merge them into one task while preserving each evidence source in notes or task references.
4. If findings conflict, document the conflict and verify current browser behavior instead of choosing silently.
5. If a proposed change would weaken the current creative direction, reject it.
6. If a proposed change solves one score but damages another, revise the change before implementation.
7. If a finding requires business facts, testimonials, phone number, platform links, or an asset decision, mark it as a dependency instead of fabricating content. Do not request or assume a new photoshoot; use existing project assets unless the user explicitly provides new media later.
8. If a finding maps to several files, keep the implementation scoped to the smallest set that satisfies acceptance criteria.
9. If a task affects motion, verify normal motion and reduced-motion behavior before completion.
10. If a task affects conversion, verify both tourist and local paths before completion.

## Agent Behavior Rules

Future coding agents must follow these rules:

1. Do not redesign the site from scratch.
2. Do not simplify the experience to make implementation easier.
3. Do not remove cinematic sections, booking flow, About chapter structure, visitor/local split, or premium editorial tone.
4. Do not mark a task complete without browser verification.
5. Do not treat SEO, FAQ, footer, or conversion content as generic service business sections.
6. Do not make changes that are not traceable to an audit finding, task-map item, or explicit user instruction.
7. Do not introduce fake reviews, fake ratings, fake scarcity, fake availability, fake credentials, or unsupported claims.
8. Do not hide important content behind motion, hover-only states, or inaccessible controls.
9. Do not allow mobile or reduced-motion behavior to be a lower-quality version of the desktop experience.
10. Do not report success without naming the verification performed.

## Completion Standard

The audit phase can be considered successful only when:

1. Every major audit finding has a home in `task-map.md`.
2. Every rating has a clear path to `100 / 100`.
3. Every future implementation task has acceptance criteria.
4. Every task can be verified in browser.
5. The current site direction is preserved.
6. The documentation is detailed enough for a coding agent to continue without asking broad strategic questions.
7. Score blockers have been prioritized before lower-impact refinements.
8. Conflicting findings are documented and resolved by current browser verification.
9. User-data and asset dependencies are separated from implementable engineering work.
10. Every major finding has a mapped status.
11. Every score blocker has at least one task-map category responsible for it.
12. Every `P0` blocker has a planned browser-verification path.
13. Every dependency-blocked finding identifies the exact missing user data, asset decision, or verification input.
14. Every technical architecture finding has a task-map home or a documented reason for deferral.
15. `baseline-verification.md` exists before application source-code implementation begins.
16. No original audit finding was deleted, softened, or silently ignored.
17. No documentation file gives future agents permission to redesign the website from scratch.
18. No application source code is changed during documentation-only tasks.

## Definition Of Done For The Audit Phase

The audit documentation phase is done when:

1. `audit-findings.md` is preserved as the complete evidence archive, with only a preservation header added.
2. `audit-plan.md` includes document roles, coverage rules, finding statuses, score strategy, implementation order, `What 100/100 Means`, and completion standard.
3. `task-map.md` includes an implementation home for every major finding, with files, acceptance criteria, and verification steps.
4. `implementation-brief.md` includes operating rules for future coding agents, including required reading order, constraints, implementation rules, verification behavior, and final QA requirements.
5. `baseline-verification.md` is created before source-code implementation.
6. At least one planning document contains a rating target table with all available baseline audit ratings, target `100`, blockers, and responsible categories.
7. The audit documentation can guide a coding agent without requiring broad strategic interpretation.
8. Any remaining unknowns are listed as user-data, asset, or verification dependencies.
9. No application source code has been edited during this documentation phase.
10. No future task can reasonably claim it was told to redesign the site from scratch.
