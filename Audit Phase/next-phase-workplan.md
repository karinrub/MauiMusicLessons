# MauiMusicLessons Next Phase Workplan

## Purpose

This workplan turns the audit phase documents into the next executable sequence for Codex. It is a planning document only. It does not authorize implementation by itself.

Source documents reviewed:

- `Audit Phase/audit-findings.md`
- `Audit Phase/audit-plan.md`
- `Audit Phase/task-map.md`
- `Audit Phase/baseline-verification.md`
- `Audit Phase/implementation-brief.md`

Current project structure reviewed:

- `src/App.tsx`
- `src/components/Hero/*`
- `src/components/Navbar/*`
- `src/components/CinematicPanel/*`
- `src/components/SectionHandoff/*`
- `src/components/BeachLessons/*`
- `src/components/WeeklyLessons/*`
- `src/components/AboutAaron/*`
- `src/components/CinematicEntry/*`
- `src/components/SeoContent/*`
- `src/components/BookingSection/*`
- `src/components/Footer/*`
- `src/hooks/*`
- `src/utils/*`
- `public/images/*`
- `public/videos/*`

## Current State Summary

The site has received a source-level implementation pass plus an execution-stage Phase 1 browser QA pass and a conservative Phase 2 visual treatment pass.

Source-verified improvements include:

- Section handoffs now exist between major chapters through `SectionHandoff`.
- Beach and Weekly lesson sections now show price, location/context, outcome/value cues, and pass booking context.
- SEO crawler-style visible copy has been rewritten into editorial copy.
- Booking now exposes lesson context, inquiry status, response expectation, payment method, validation, and reduced-motion static form behavior.
- About Chapter 1 now opens with teaching-purpose copy.
- Footer uses `useEntryReveal` and exposes email/location.
- CinematicEntry now uses the shared `useScrollY` singleton, resolving an earlier technical-audit finding.

Execution-stage browser-verified improvements include:

- Beach and Weekly section CTAs display context labels in booking.
- All four booking group-size paths reach the sent/request state.
- Invalid contact submission keeps visible errors.
- FAQ keyboard expansion works.
- About keyboard navigation reaches Chapter 4 and returns to Chapter 1.
- Mobile menu links work, Book navigation lands correctly, and Escape now closes the mobile menu.
- The Beach right-panel image has a stronger existing-asset treatment with desktop/mobile screenshot evidence.

The main remaining problem is now narrower: final holistic motion, visual rhythm, responsive, reduced-motion, and performance verification has not been completed. Phase 3 should focus on motion and transition refinement from current browser behavior, not broad redesign.

## Conflict Resolution Rules

When audit notes conflict, future work should prioritize:

1. Current live website behavior verified in browser.
2. User stated direction.
3. Most recent audit notes.
4. Earlier audit notes.

Known conflicts and resolutions:

- Earlier audits say the booking flow stopped after two steps. Current code and later verification show a full multi-step inquiry flow. Treat the old note as historical evidence only.
- Earlier audits say price is hidden until booking. Current code shows price in Beach and Weekly sections and in booking. Browser-confirm display and mobile behavior before doing more pricing work.
- Earlier technical audit said `CinematicEntry` used its own scroll listener. Current source shows it uses `useScrollY`. Treat the older finding as resolved unless browser/performance QA finds a new issue.
- Earlier notes describe full blank viewport gaps. Later notes describe low-information/under-designed handoffs rather than guaranteed full blank viewports. Browser QA should measure the current condition, not assume the old severity.
- Audit-plan/implementation-brief language still targets `100 / 100`; dependency-blocked social proof and phone/text contact mean the engineering phase can only document those blockers unless user data is supplied.

## Top Remaining Problems

1. Full final verification has not happened.
2. SectionHandoff visual continuity remains only partially verified; handoffs may still feel generic, repeated, or insufficiently cinematic.
3. Booking background may still create the "two photo worlds" problem; Beach right-panel image is improved but requires final art-direction acceptance.
4. About chapters remain interaction-dependent; the one-time hint may not make Chapters 2-4 discoverable during natural browsing.
5. Footer arrival and booking step motion may still feel functional rather than authored.
6. Responsive behavior has screenshot evidence at required widths but still needs full top-to-bottom review.
7. Keyboard order, focus visibility, contrast over imagery, and complete reduced-motion behavior still need exhaustive browser verification.
8. Real testimonials/review links and phone/text fast contact remain dependency-blocked.

## Highest Risk Areas

- Motion and section handoffs: small timing or spacing changes can break the cinematic pacing.
- Visual asset cohesion: over-filtering photos can make them muddy; under-filtering preserves the current clash.
- About chapter discoverability: adding too much instruction would weaken the cinematic tone, but the current cue may be too subtle.
- Booking flow: code uses `dangerouslySetInnerHTML` for exit animation snapshots; interaction polish must avoid validation, focus, or screen-reader regressions.
- Mobile layout: sticky panels, large display type, booking tiles, and About rail controls can fail on short/narrow viewports.
- Dependency-blocked conversion work: do not fabricate testimonials, reviews, phone numbers, ratings, years, or social links.

## Recommended Execution Order

1. Phase 1: critical fixes and browser baseline gate. **Complete.**
2. Phase 2: section-by-section polish, only after observing current browser behavior. **Partially complete: Beach right-panel image treatment done; remaining polish should be browser-confirmed only.**
3. Phase 3: motion and transition refinement across the full page. **Next.**
4. Phase 4: responsive and mobile QA.
5. Phase 5: final verification and cleanup.

Do not start with a redesign. Preserve the current structure: Hero, cinematic beach entry, Beach Lessons, weekly pivot, Weekly Lessons, About Aaron, cinematic memory bridge, SEO/FAQ, Booking, Footer.

## Phase 1: Critical Fixes

### Objective

Establish current browser truth and fix only audit blockers that are confirmed in browser as still broken. This phase should separate "source already fixed" from "visually/behaviorally still failing."

### Files Likely Involved

- Documentation: `Audit Phase/baseline-verification.md`, final task notes if created later.
- Verification targets: `src/App.tsx`, `src/components/SectionHandoff/*`, `src/components/CinematicPanel/*`, `src/components/BeachLessons/*`, `src/components/WeeklyLessons/*`, `src/components/AboutAaron/*`, `src/components/SeoContent/*`, `src/components/BookingSection/*`, `src/components/Footer/*`, `src/components/Navbar/*`.
- Test/build: `package.json`, Vite dev server, Playwright or browser manual QA.

### Specific Tasks

1. Run the site locally and complete a desktop slow-scroll pass from hero to footer at `1440 x 900`.
2. Record whether every `SectionHandoff` variant reads as intentional or as repeated gradient filler.
3. Measure whether any near-black low-information scroll segment exceeds `25vh`.
4. Verify cinematic line reveals in both `CinematicPanel` instances and `CinematicEntry`.
5. Verify Beach and Weekly conversion rows are visible before booking on desktop and mobile.
6. Verify Beach CTA produces `Beach lesson — Kihei, Maui` in booking and Weekly CTA produces `Weekly lesson — Kihei, Maui`.
7. Complete booking paths for solo, duo, small group, and large group.
8. Test invalid contact submission and verify errors remain visible and understandable.
9. Verify About chapters by click, keyboard, and rapid chapter changes.
10. Verify FAQ open/close by mouse and keyboard.
11. Verify footer reveal and closing handoff.
12. Verify reduced-motion mode shows all content and disables motion-dependent behavior.
13. Verify console has no scroll, interaction, asset, or React errors.
14. Update `baseline-verification.md` or create a separate completion note with browser evidence before implementing any non-critical polish.

### Acceptance Criteria

- Current browser behavior is documented for every major section.
- Every Partial category in `task-map.md` has either browser evidence or a precise follow-up task.
- No new source changes are made before the browser pass unless the site cannot run.
- Critical confirmed failures are ranked before visual preference work.
- Dependency-blocked items remain labeled as dependencies.

### Manual QA Steps

- Desktop slow scroll at `1440 x 900`.
- Desktop normal scroll from top to bottom.
- Direct nav jumps to `#beach-lessons`, `#weekly-lessons`, `#about`, `#maui-music-lessons`, and `#book`.
- Keyboard-only pass through nav, CTAs, video mute, About controls, FAQ, booking, and footer.
- Reduced-motion pass.
- Booking path completion for all group sizes.

### Risks

- Fixing from old notes without browser confirmation could undo source-level improvements.
- A visual bug may be viewport-specific and missed if only one desktop size is checked.
- The live GitHub Pages site may not match local source if deployment is stale.

### Dependencies

- Browser/dev server access.
- No user data required for Phase 1 except if verifying phone/testimonial absence.

### What Not To Change

- Do not change application code during the initial browser baseline pass.
- Do not rewrite copy, swap images, or tune motion before documenting what currently fails.
- Do not edit `audit-findings.md`.

## Phase 2: Section By Section Polish

### Objective

Polish each section only where Phase 1 confirms current issues. Keep the existing website structure and premium cinematic island direction.

### Files Likely Involved

- `src/components/Hero/*`
- `src/components/Navbar/*`
- `src/components/BeachLessons/*`
- `src/components/WeeklyLessons/*`
- `src/components/AboutAaron/*`
- `src/components/SeoContent/*`
- `src/components/BookingSection/*`
- `src/components/Footer/*`
- `src/components/SectionHandoff/*`
- `public/images/*`

### Specific Tasks

1. Hero: only add minimal clarity if Phase 1 shows the first viewport still feels too vague; do not add a hero card or sales block.
2. Beach Lessons: confirm the conversion row, CTA context, video control, and `aaron-tourists-1.jpg` treatment; if the image still clashes, adjust crop/treatment/dominance or choose another existing project asset.
3. Weekly Lessons: confirm local value row, CTA context, and pull quote image treatment; if the quote/photo still clashes, adjust existing treatment or document an asset decision.
4. About: improve chapter discoverability if the current hint is missed; prefer visible state/cue refinements over explanatory instructional text.
5. FAQ: make the accordion feel authored if browser QA still reads as generic; preserve useful questions and accessible accordion semantics.
6. Booking: polish step motion only if current behavior feels flat or causes focus/scroll issues; preserve guided inquiry flow and current factual content.
7. Footer: improve closing frame only if browser QA confirms the current reveal/handoff is weak; keep it quiet and useful.
8. Navbar: polish mobile menu behavior and focus states only where browser QA finds issues.

### Acceptance Criteria

- Each section polish item maps to a current browser finding.
- No section is redesigned from scratch.
- Existing audience split remains explicit: visitors first, locals second.
- Practical details remain in the site's editorial voice.
- All changed sections pass desktop, mobile, keyboard, and reduced-motion checks relevant to the change.

### Manual QA Steps

- Review each changed section in isolation and in the full scroll context.
- Compare before/after screenshots when changing imagery, overlays, or spacing.
- Click every CTA in the changed section.
- Test keyboard and reduced-motion behavior for every changed interaction.

### Risks

- Local section polish can reintroduce repeated template-like patterns.
- Adding visible practical details can crowd the cinematic tone.
- Asset treatment changes can damage text contrast or mobile crop quality.

### Dependencies

- Real testimonials/reviews: user data required.
- Phone/text/WhatsApp path: user data required.
- Asset changes must use existing project assets unless the user supplies new media.

### What Not To Change

- Do not remove the hero concept, cinematic panels, Beach/Weekly structure, About chapter concept, FAQ, booking flow, or quiet footer.
- Do not fabricate social proof or contact information.
- Do not add generic cards, badges, ratings, or marketing blocks.

## Phase 3: Motion And Transition Refinement

### Objective

Make the full page feel like one choreographed experience rather than independent animated sections. Refine handoffs, entries, exits, reduced-motion behavior, and interactive motion.

### Files Likely Involved

- `src/App.tsx`
- `src/components/SectionHandoff/*`
- `src/components/CinematicPanel/*`
- `src/components/CinematicEntry/*`
- `src/components/ScrollLine/ScrollLine.tsx`
- `src/components/Hero/*`
- `src/components/BeachLessons/*`
- `src/components/WeeklyLessons/*`
- `src/components/AboutAaron/*`
- `src/components/BookingSection/*`
- `src/components/Navbar/*`
- `src/hooks/useScrollY.ts`
- `src/hooks/useEntryReveal.ts`
- `src/hooks/useStaggeredReveal.ts`
- `src/utils/animation.ts`
- `src/utils/scroll.ts`
- `src/index.css`

### Specific Tasks

1. Audit all handoffs in current browser order:
   Hero to first cinematic panel; first cinematic panel to visitor handoff; visitor handoff to Beach; Beach to audience handoff; audience handoff to weekly pivot; weekly pivot to Weekly; Weekly to chapter handoff; chapter handoff to About; About to CinematicEntry; CinematicEntry to practical handoff; practical handoff to SEO; SEO/FAQ to conversion handoff; conversion handoff to Booking; Booking to closing handoff; closing handoff to Footer.
2. Tune only the handoffs that fail the browser pass; avoid making all handoffs visually identical.
3. Confirm `CinematicPanel` beach-entry lines read as three distinct beats.
4. Confirm "And if you live here — / the music can stay." lands as an audience pivot, not just a decorative line.
5. Confirm "A quiet hour. / A real Maui memory." bridges into practical content without an abrupt tonal drop.
6. Confirm Beach, Weekly, and About exit fades do not leave content invisible too early or too late.
7. Verify Navbar reveal, scrolled state, dark-section state, direct navigation, and mobile menu motion.
8. Verify Booking step enter/exit does not create focus, scroll, validation, or invisible-DOM problems.
9. Document any remaining separate animation mechanism and why it exists.

### Acceptance Criteria

- No content-free near-black zone exceeds `25vh`.
- Each handoff has a visible purpose and distinct enough treatment.
- Section exits are as intentional as entries.
- Motion does not hide content or create scroll traps.
- Reduced-motion mode shows all content without dependency on parallax, sticky timing, or animation.
- No new animation library is introduced.
- No new scroll listener is added unless existing shared infrastructure cannot support the behavior and the reason is documented.

### Manual QA Steps

- Desktop slow-scroll recording or careful observation.
- Desktop fast/normal scroll pass.
- Direct nav jump pass.
- Reduced-motion scroll pass.
- Console check during scroll and booking interactions.
- Mobile scroll pass at minimum `390 x 844`.

### Risks

- Over-refining motion can create overdone animations and reduce the calm premium feel.
- Extending scroll budgets can recreate dead zones.
- Reusing the same handoff treatment everywhere can feel template-like.

### Dependencies

- Phase 1 browser evidence.
- Any image-dependent handoff decisions must use existing assets.

### What Not To Change

- Do not delete cinematic pauses to solve timing.
- Do not flatten the page into a standard service layout.
- Do not make motion the only cue that a section changed.

## Phase 4: Responsive And Mobile QA

### Objective

Confirm the site works across mobile, tablet, desktop, and short viewport contexts without text overlap, clipped controls, hidden content, horizontal overflow, or broken image crops.

### Files Likely Involved

- All component CSS files.
- `src/index.css`
- `src/components/Navbar/*`
- `src/components/BookingSection/*`
- `src/components/AboutAaron/*`
- `src/components/SeoContent/*`
- `src/components/SectionHandoff/*`

### Specific Tasks

1. Test widths: `360`, `390`, `768`, `1024`, `1280`, and `1440`.
2. Include at least one short landscape/mobile-height check.
3. Verify hero first viewport remains readable and CTA-visible.
4. Verify mobile menu opens, closes, exposes all links, and has visible focus/tap states.
5. Verify Beach and Weekly split layouts stack cleanly, with conversion rows readable.
6. Verify video mute control is reachable and does not overlap content.
7. Verify all major image crops preserve subject and text readability.
8. Verify About chapter rail/buttons fit and remain touch usable.
9. Verify FAQ is single-column on mobile and long answers do not overflow.
10. Verify booking tiles, date chips, inputs, errors, and sent state fit without clipped text.
11. Verify footer links/contact wrap cleanly.

### Acceptance Criteria

- No horizontal overflow at required widths.
- No text/control overlap.
- No CTA, booking tile, date chip, input, FAQ item, or About control is clipped.
- Mobile menu has reachable links and an accessible close path.
- Major image overlays remain readable.
- Sticky/scroll sections do not trap scrolling.

### Manual QA Steps

- Use browser responsive mode or Playwright screenshots at all required widths.
- Scroll top to bottom at each width.
- Complete at least one booking path at `390`.
- Interact with About chapters and FAQ at mobile width.
- Test reduced motion at mobile width.

### Risks

- Desktop polish can worsen mobile crops or scroll height.
- Large display type can collide with controls on short screens.
- Booking form state changes can shift layout unexpectedly.

### Dependencies

- Phase 2 and Phase 3 changes should be mostly complete before full responsive QA.

### What Not To Change

- Do not make mobile a stripped-down version of the experience.
- Do not hide essential content, CTAs, or controls on mobile to avoid layout work.

## Phase 5: Final Verification And Cleanup

### Objective

Verify the audit phase holistically, clean up only safe technical/documentation issues, and produce final evidence that remaining blockers are either fixed or explicitly dependency-bound.

### Files Likely Involved

- All changed source files.
- `Audit Phase/baseline-verification.md`
- `Audit Phase/task-map.md` or a future final audit completion report.
- `public/images/*` and `public/videos/*` only if asset changes occurred.

### Specific Tasks

1. Run `npm run typecheck`.
2. Run `npm run build`.
3. Run `npm run smoke` if available and appropriate.
4. Perform full-page browser QA from hero to footer.
5. Verify every nav link and CTA target.
6. Complete all booking paths and validation states.
7. Verify reduced-motion behavior.
8. Verify keyboard-only operation.
9. Verify no console errors.
10. Verify no unsupported claims, fake social proof, fake contact paths, or new stock-like media were introduced.
11. Confirm every major finding has one allowed status.
12. Confirm dependency-blocked items are listed separately from engineering work.
13. Remove or document any unused motion utility only if it is clearly safe and in scope.
14. Produce final completion notes with files changed, findings addressed, verification performed, blockers, dependencies, and next recommended task.

### Acceptance Criteria

- All P0 categories have browser evidence.
- All P1 categories are either complete or documented with explicit dependency/deferral reason.
- Production build succeeds.
- No audit source finding is deleted, softened, or silently ignored.
- Current site direction is preserved.
- Remaining blockers are limited to user data, asset decisions, or explicitly documented deferrals.

### Manual QA Steps

- Full desktop QA.
- Full mobile QA.
- Reduced-motion QA.
- Keyboard QA.
- Booking QA.
- Visual cohesion QA.
- Final `git status` review.

### Risks

- Cleanup can become opportunistic refactoring. Keep it scoped.
- Rating language can imply `100 / 100` despite dependency-blocked social proof/contact items. Document ceilings honestly.

### Dependencies

- User-provided testimonials/review links for social proof.
- User-provided phone/text/WhatsApp path if direct fast contact should be added.
- User approval for any existing-asset swap or reduced image prominence if a browser pass shows current treatment is insufficient.

### What Not To Change

- Do not continue making aesthetic changes during final verification unless a blocking defect is found.
- Do not revise the site concept.
- Do not change audit evidence files except approved planning/status updates.

## Section Specific Plans

### Hero

Objective: Preserve the strongest opening while confirming it still supports conversion confidence.

Files likely involved: `src/components/Hero/Hero.tsx`, `src/components/Hero/Hero.css`, `src/components/Navbar/*`, `src/utils/animation.ts`.

Specific tasks:

- Verify hero image, location stamp, headline, subhead, and CTA hierarchy at desktop and mobile.
- Verify hero load-in timing and reduced-motion fallback.
- Verify `Book a Lesson` and `See lesson options` targets.
- Only if QA shows clarity remains a blocker, add a minimal practical cue using existing facts already present elsewhere; do not add a card.

Acceptance criteria:

- First viewport remains cinematic, premium, calm, and Maui-specific.
- CTAs are visible and keyboard-focusable.
- No text overlaps or crowding at `360`, `390`, and desktop widths.

Manual QA steps: reload page, observe entry, tab through hero controls, test CTAs, capture mobile/desktop first viewport.

Risks: overloading the hero with practical copy; weakening the strongest audited section.

Dependencies: none unless adding user-data facts, which should be avoided here.

What not to change: hero concept, location stamp, main headline, emotional subhead, primary/secondary CTA structure.

### Beach Lessons

Objective: Make the visitor offer fully credible in browser: no dead zones, coherent imagery, visible price/location/outcome, contextual booking.

Files likely involved: `src/components/BeachLessons/*`, `src/components/ScrollLine/ScrollLine.tsx`, `src/components/BookingSection/*`, `src/components/SectionHandoff/*`, `public/images/aaron-tourists-1.jpg`, `public/videos/aaron-ukelele-vid.mp4`.

Specific tasks:

- Verify the conversion row is visible and readable before booking.
- Verify `Book a beach lesson` sets booking context.
- Verify `aaron-tourists-1.jpg` treatment in browser; if still too bright/documentary, adjust CSS filter/overlay/crop/dominance or propose an existing-asset substitution.
- Verify video autoplays muted, mute control is labeled, and no audio starts without user action.
- Verify Beach section entry/exit and adjacent handoffs do not produce low-information scroll bands.

Acceptance criteria:

- Visitor understands price, location, and outcome before form submission.
- Image/video supports the coastal cinematic system.
- CTA context appears in booking.
- Media controls are accessible and do not overlap on mobile.

Manual QA steps: slow-scroll hero through Beach, toggle mute, click CTA, inspect mobile layout, test reduced motion.

Risks: image treatment may reduce authenticity or readability; video can create performance or layout issues.

Dependencies: asset decision if current photo cannot be solved with treatment.

What not to change: visitor positioning, beginner reassurance, beach lesson concept, actual lesson media unless replacing with an existing project asset.

### Weekly Lessons

Objective: Keep the local arc emotionally strong while confirming recurring value and visual cohesion.

Files likely involved: `src/components/WeeklyLessons/*`, `src/components/CinematicPanel/*`, `src/components/BookingSection/*`, `src/components/SectionHandoff/*`, `public/images/aaron-teaching-1.jpg`, `public/images/aaron-weekly-1.jpg`.

Specific tasks:

- Verify weekly conversion row is visible and readable.
- Verify `Let's find a time` sets weekly booking context.
- Verify the pull quote image and quote card do not break the visual world.
- Verify the visitor/local pivot remains clear after handoff and motion changes.
- Do not invent progress milestones beyond current verified facts.

Acceptance criteria:

- Local visitor sees cost/cadence context and Aaron's student-paced approach.
- Quote remains a strong permission-lowering moment.
- Weekly imagery matches the coastal cinematic identity or is documented for asset decision.

Manual QA steps: scroll Beach-to-Weekly, click weekly CTA, inspect quote image on desktop/mobile, test reduced motion.

Risks: making Weekly too practical can flatten its emotional role; unsupported milestones would violate audit rules.

Dependencies: user data required for stronger outcomes/testimonials.

What not to change: "And if you live here — the music can stay.", weekly/local distinction, pull quote unless visual QA requires treatment.

### About

Objective: Preserve the chaptered narrative while making all four chapters discoverable and accessible.

Files likely involved: `src/components/AboutAaron/*`, `src/utils/scroll.ts`, `src/hooks/useScrollY.ts`, `public/images/aaron-portrait-1.jpg`, `public/images/aaron-playing-1.jpg`, `public/images/aaron-playing-2.jpg`, `public/images/aaron-onlyMe.jpg`.

Specific tasks:

- Verify all chapters can be reached by pointer, keyboard, and drag/scrub.
- Verify the one-time hint is noticeable during normal scroll; if not, strengthen the existing cue without adding explanatory instructional text.
- Verify rapid chapter changes do not leave content invisible.
- Verify image color/value treatment and text contrast per chapter.
- Verify mobile rail/buttons remain usable.

Acceptance criteria:

- All four chapters are discoverable and accessible.
- First visible copy includes teaching purpose.
- Active chapter state is clear visually and semantically.
- Reduced-motion chapter changes keep content visible.

Manual QA steps: use prev/next, rail click, keyboard arrows/Home/End, rapid changes, mobile touch, reduced motion.

Risks: over-explaining the interaction; hiding strong story content behind subtle controls.

Dependencies: asset decision if any chapter image remains tonally incompatible.

What not to change: chapter concept, chapter labels, narrative arc, Maui arrival story.

### FAQ

Objective: Keep hesitation-removal content and accessible accordion behavior while avoiding a generic template feel.

Files likely involved: `src/components/SeoContent/SeoContent.tsx`, `src/components/SeoContent/SeoContent.css`.

Specific tasks:

- Verify accordion button semantics, focus state, expanded state, and one-open behavior.
- Verify high-value conversion line remains visible outside accordion.
- If browser QA still reads generic, adjust spacing, type rhythm, rule treatment, or section texture within current design language.
- Verify mobile single-column behavior and long answer expansion.

Acceptance criteria:

- FAQ is keyboard-operable.
- Critical conversion facts are not hidden exclusively inside accordion answers.
- FAQ visually belongs to the MauiMusicLessons system.

Manual QA steps: open every FAQ by mouse and keyboard, test mobile width, reduced motion, and focus states.

Risks: over-styling FAQ into a decorative section; breaking accessible disclosure behavior.

Dependencies: none.

What not to change: useful FAQ questions/answers unless user provides updated facts.

### Booking

Objective: Preserve the guided inquiry flow and confirm it is complete, clear, accessible, and mobile-safe.

Files likely involved: `src/components/BookingSection/*`, CTA handlers in `Hero`, `Navbar`, `BeachLessons`, `WeeklyLessons`, `SeoContent`, `Footer`, `src/utils/animation.ts`, `src/utils/scroll.ts`.

Specific tasks:

- Verify context labels from Beach and Weekly CTAs.
- Verify every group-size path, instrument path, back navigation path, validation state, sent state, and `mailto:` behavior.
- Verify inquiry/request status appears before or during final submission as intended.
- Verify reduced-motion static all-steps form.
- Verify step enter/exit animation does not cause focus, layout, or invisible snapshot problems.
- Verify booking background image cohesion and fallback readability.

Acceptance criteria:

- Visitor can complete all paths without confusion.
- Form does not imply a confirmed booking.
- Back navigation preserves or clears selections intentionally.
- Keyboard and mobile operation pass.
- Background image does not compromise visual cohesion or text contrast.

Manual QA steps: complete solo 30, solo 60, duo, small group, large group; test validation; test keyboard; test mobile; test reduced motion.

Risks: changing motion can break step state; `mailto:` behavior varies by environment.

Dependencies: confirmed backend/contact path if changing away from `mailto:`; phone/text path user data.

What not to change: guided conversational booking concept, low-pressure inquiry tone, current verified pricing unless user changes it.

### Footer

Objective: Make the ending useful and deliberate without turning it into another marketing section.

Files likely involved: `src/components/Footer/*`, `src/components/SectionHandoff/*`, `src/hooks/useEntryReveal.ts`, `src/index.css`.

Specific tasks:

- Verify `useEntryReveal` footer reveal in browser.
- Verify closing SectionHandoff creates a deliberate landing.
- Verify footer nav links and email link.
- Add phone/text only if user provides confirmed data.
- Add social/review links only if user provides real links.

Acceptance criteria:

- Footer feels like a quiet close.
- Email/location remain visible.
- Nav/contact links are keyboard and mobile accessible.
- No fabricated contact or trust signals.

Manual QA steps: scroll Booking-to-Footer, click every footer link, tab through footer, inspect mobile wrap.

Risks: overbuilding the footer; making the close feel generic or cluttered.

Dependencies: phone/text/social/review data from user.

What not to change: quiet footer tone, brand name, email contact path.

### Navbar

Objective: Preserve persistent navigation while verifying direct navigation, dark-section state, mobile menu, and focus behavior.

Files likely involved: `src/components/Navbar/*`, `src/utils/animation.ts`, `src/index.css`.

Specific tasks:

- Verify direct nav offsets do not hide headings under the navbar.
- Verify dark-section and scrolled state remain readable across all sections.
- Verify mobile menu open/close behavior, focus states, and link reachability.
- Add or refine mobile menu enter/exit only if it improves clarity without distracting from the site.

Acceptance criteria:

- Desktop and mobile nav links work.
- Mobile menu has visible focus and reachable controls.
- Navbar state does not obscure text or CTAs.

Manual QA steps: click every nav item from top/midpage/footer, test mobile hamburger, keyboard-tab through nav, reduced-motion check.

Risks: nav timing changes can disrupt section orientation; mobile menu animation can create focus traps.

Dependencies: none.

What not to change: persistent nav model, brand button, Beach/Weekly/About/Book links.

### Global Motion System

Objective: Keep one maintainable motion architecture across scroll, reveal, handoff, interaction, and reduced-motion behavior.

Files likely involved: `src/utils/animation.ts`, `src/utils/scroll.ts`, `src/hooks/useScrollY.ts`, `src/hooks/useEntryReveal.ts`, `src/hooks/useStaggeredReveal.ts`, `src/index.css`, all motion-heavy components.

Specific tasks:

- Verify all scroll-linked components use shared `useScrollY` unless documented otherwise.
- Verify keyframe, transition, IntersectionObserver, inline-style, and RAF scroll roles are understood and not duplicated unnecessarily.
- Verify film grain is disabled under reduced motion.
- Verify unused utilities/keyframes are either intentionally retained or cleaned up during final cleanup only.

Acceptance criteria:

- No unexplained scroll listener divergence.
- Reduced-motion behavior is complete.
- Motion timings support content hierarchy.
- No overdone animation or disconnected decorative effects.

Manual QA steps: code review plus browser scroll, reduced-motion pass, console/performance check.

Risks: cleanup can become broad refactoring; consolidating too aggressively can break stable behavior.

Dependencies: none.

What not to change: vanilla CSS/React motion approach; no Framer Motion/GSAP without explicit approval.

### Section Handoffs

Objective: Ensure every handoff is purposeful, visually distinct enough, and not a repeated decorative gradient.

Files likely involved: `src/App.tsx`, `src/components/SectionHandoff/*`, adjacent section CSS files.

Specific tasks:

- Verify all current handoffs in order and name their purpose.
- Tune variants only where browser QA shows a failure.
- Avoid making every transition look like the same tonal wash.
- Verify mobile handoffs do not consume too much scroll height.

Acceptance criteria:

- Handoffs feel like chapter turns, audience pivots, practical landings, conversion approaches, or closing frames.
- No abrupt hard cuts or long empty bands remain.
- Mobile scroll remains efficient and oriented.

Manual QA steps: slow-scroll every handoff desktop/mobile; direct-nav to sections; compare visual distinctiveness.

Risks: repeated handoff treatments can become template-like; excessive height can recreate dead zones.

Dependencies: asset decision if ghosted images are wrong for a handoff.

What not to change: overall page order and section identities.

### Mobile Layout

Objective: Preserve the cinematic site on mobile while keeping all content and controls usable.

Files likely involved: all component CSS files and `src/index.css`.

Specific tasks:

- Verify required widths `360`, `390`, `768`, `1024`, `1280`, `1440`.
- Verify hero, cinematic panels, Beach, Weekly, About, SEO/FAQ, Booking, Footer, Navbar.
- Verify no horizontal overflow, clipped text, clipped buttons, or hidden controls.
- Verify major image crops and overlay readability.

Acceptance criteria:

- Mobile is complete, not reduced to a lower-quality fallback.
- Every conversion path works on mobile.
- Text and controls do not overlap.

Manual QA steps: full mobile scroll, booking completion, FAQ, About, nav, reduced motion.

Risks: scroll-heavy sections may feel too long or cramped; fixed/sticky behavior can fail on short screens.

Dependencies: none.

What not to change: mobile should not remove essential content or CTAs.

## Verification Checklist

- [x] Local dev site runs.
- [ ] Desktop slow-scroll pass complete.
- [ ] Desktop normal-scroll pass complete.
- [x] Mobile `360`, `390`, `768` screenshot checks complete.
- [x] Tablet/desktop `1024`, `1280`, `1440` screenshot checks complete.
- [ ] Reduced-motion pass complete. Phase 1 screenshots captured; full interaction pass still needed.
- [ ] Keyboard-only pass complete. Phase 1 sampled About/FAQ/tab order; exhaustive pass still needed.
- [x] Console check complete for interaction QA.
- [ ] All nav links and CTAs tested.
- [x] Beach and Weekly booking context tested.
- [x] All booking group-size paths tested.
- [x] Booking validation tested.
- [ ] About chapter controls tested by pointer, keyboard, and touch where practical. Keyboard Home/End verified; pointer/touch final pass still needed.
- [ ] FAQ tested by pointer and keyboard. Keyboard verified; pointer/reduced-motion final pass still needed.
- [ ] Video mute/unmute tested.
- [ ] Footer links tested.
- [ ] Major image crops reviewed. Phase 1/2 screenshots captured; final art-direction pass still needed.
- [ ] Text contrast over image overlays reviewed.
- [ ] No fake testimonials, reviews, ratings, phone numbers, social links, or unsupported claims introduced.
- [x] `npm run typecheck` passes.
- [x] `npm run build` passes.
- [x] `npm run smoke` run if appropriate.
- [x] Remaining dependencies documented.

## Definition Of Done For This Audit Phase

This audit phase is done when:

1. The current post-implementation site has browser verification evidence.
2. Every major finding has one allowed status: implemented, browser-verified, dependency-blocked, asset-decision-blocked, duplicate/overlap, already resolved, or explicitly deferred.
3. All P0 browser-confirmed defects are fixed or documented as dependencies.
4. Section handoffs are verified as intentional and not generic repeated fillers.
5. Visual asset cohesion is verified or unresolved assets are documented with exact decisions needed.
6. About chapters are verified as discoverable and accessible.
7. Booking paths, validation, context labels, inquiry status, and sent state are verified.
8. Responsive behavior passes required widths.
9. Accessibility and reduced-motion passes are complete.
10. Production build passes.
11. No source audit finding was deleted, softened, or silently ignored.
12. The current custom, cinematic, premium, calm, island-based direction is preserved.
13. Remaining blockers are limited to explicit user data, approved asset decisions, or documented deferrals.

## What Codex Should Do Next After Plan Approval

Codex should start with Phase 1 only: run the local site, perform the full post-implementation browser QA pass, and update the audit notes with current browser evidence. After that, Codex should fix only the confirmed critical failures before moving into section polish.

Do not begin implementation from this document alone unless the user approves moving from planning into code changes.
