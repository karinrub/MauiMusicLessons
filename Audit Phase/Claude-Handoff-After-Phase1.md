# MauiMusicLessons — Claude Handoff After Phase 1

## 1. Project Status

Phase 1 is complete for tested Chromium mobile emulation.

Phase 1 fixed and verified:

1. Hero secondary CTA reaches Beach.
2. Weekly dark interval at 390×844 is resolved for the tested Chromium mobile handoff.
3. About mobile anchor entry now shows chapter navigation visibility without user scrolling.
4. Mobile hamburger, Booking Back, footer navigation, and footer email touch targets now meet the intended 44px primary dimension in Chromium mobile measurements.

`npm run typecheck` and `npm run build` passed after Phase 1 verification.

Real iOS Safari and real touch validation were not performed. Phase 1 results must not be described as real iPhone Safari or real thumb ergonomics evidence.

Current workspace state at handoff: no uncommitted website source changes were present when this file was created.

## 2. Authority and Read Order

Authority order:

1. Audit Phase/audit-report-june2026.md
2. Audit Phase/Implementation-Planning-Package.md
3. This handoff document

The next agent must read `Audit Phase/audit-report-june2026.md` and `Audit Phase/Implementation-Planning-Package.md` completely before touching code.

## 3. What Must Not Be Reopened

Keep these out of scope unless direct current evidence proves a regression:

- Phase 1 fixes, unless a direct regression is observed.
- CinematicPanel Line 2 opacity claim.
- Missing About exit choreography claim.
- Date chip and Beach video control sizing.
- Landmark labels.
- Booking Back accessible names.
- Booking sent-state recovery path.
- Typography, visual direction, social proof, phone or text contact.
- WebP or responsive image workflow.
- Broad motion pacing and unverified transition quality.
- Any real iOS only issue not yet observed on a real device.

## 4. Phase 2 Approved Scope

Only these two items are ready for Phase 2 implementation.

### 4.1 About Aaron Chapter Image Readiness Risk

- Confirmed risk case: Chapter 3, Focus & Teaching, internal index 2, aaron-playing-2.jpg.
- `complete=false` and `naturalWidth=0` were observed during initial inspection.
- A visible flash was not consistently reproduced.
- Do not claim every chapter flashes.
- Do not eagerly load all chapter images without evidence and justification.

### 4.2 Desktop Chrome Beach Video Loading Symptom

- Desktop symptom: `readyState=0`, no buffered data, no resource timing entry, no relevant media events.
- Root cause remains unverified.
- Chromium mobile menu navigation played the video successfully.
- Do not treat this as a universal mobile video defect.
- Do not force the full video into initial page load without measured justification.

## 5. Phase 2 Guardrails

- No redesigns.
- No new dependencies.
- No unrelated source edits.
- Preserve chapter navigation, drag, keyboard, reduced motion, crossfades, and image composition.
- Preserve video autoplay intent, muted initial state, loop, `playsInline`, pause and mute controls, and current 44px control sizing.
- Preserve all Phase 1 behavior.
- Validate changes in fresh Chromium desktop and at mobile 390×844.
- Run `npm run typecheck` and `npm run build`.

## 6. Required Phase 2 Validation

### 6.1 Chapter Readiness

- Fresh desktop Chromium: Chapter 1 → 2 → 3 → 4 immediately after entering About.
- Mobile 390×844: same sequence.
- No blank or black active chapter background.
- Rapid navigation does not leave content or controls hidden.
- Reduced motion remains correct.

### 6.2 Beach Video

- Fresh desktop Chromium: reach Beach through ordinary scrolling.
- Record `readyState`, buffered state, events, and network behavior.
- Video plays or a deliberate nonblack loading state is visible.
- Pause and mute still work.
- Mobile 390×844 menu navigation still plays video.
- Video controls remain 44×44.

## 7. Release QA Still Required

These are release QA boundaries, not implementation claims:

- Real iPhone Safari Hero CTA.
- Real touch Weekly transition feel.
- About safe area and touch usability.
- Practical tap reliability.
- iOS video autoplay.
- First visit chapter transitions on iPhone Safari.
- Booking keyboard behavior.
- Final mailto and fallback link behavior.
- VoiceOver landmark and Back button announcements.
- Navbar contrast over imagery.

## 8. Claude Role Separation

### Claude Chat

- Review implementation reports against the audit.
- Check scope discipline and evidence claims.
- Do not invent visual findings without browser evidence.
- Do not turn real device QA boundaries into source assumptions.

### Claude Code

- Implement only approved Phase 2 scope.
- Test, document evidence, preserve constraints, and stop after Phase 2.
- Do not begin new audit or redesign work.
