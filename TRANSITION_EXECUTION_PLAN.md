# Maui Music Lessons — Transition System Execution Plan

**Status:** Complete — Phases 1, 2, 3, and 4 all complete. All Validation Framework checks pass. Transition work is done.  
**Version:** 1.0  
**Authority:** This document is the authoritative source of truth for all transition work on this website. Do not deviate from its directives without updating it first. Do not revisit decisions already made here. Execute.

**Phase 4 — Second-Half Integration (complete):**
- Task 4.1: Added a single editorial entrance gesture to SeoContent's heading (`.seo-content__entrance`): `opacity: 0→1` + `translateY(24px→0)` over 500ms with the site's `easeOutCubic` curve (`cubic-bezier(0.33, 1, 0.68, 1)`), triggered by an `IntersectionObserver` (threshold 0.1) observing the `.seo-content__intro` block via `useStaggeredReveal` with a single target. No other SEO elements were given entrance animations. Verified via headless scroll simulation: heading opacity is 0 well before arrival and reaches 1 (transform settled to `translateY(0)`) shortly after the section is reached.
- Task 4.2: Registered `#maui-music-lessons` (SeoContent) and `.footer` (Footer) in Navbar.tsx's dark-section `IntersectionObserver` list. Verified via headless scroll simulation (both scroll directions): `nav--over-dark` is present and computed navbar background/text colors are correctly dark (`rgba(8,8,8,0.5)` background, `#e8e0d4` text) while positioned over SEO Content, Booking, and Footer, with no light-styling flash at either boundary.

**Phase 2 — Attention Ownership (complete):**
- Task 2.1: Added a scroll-driven exit fade (new `.about__foreground` wrapper around the chapter text and rail, opacity driven by `viewportProgress(section, -0.15, -0.65)` + `easeOutCubic`) so About's text/rail release before CinematicEntry's first line establishes. Verified via headless scroll simulation: About opacity drops below 0.50 well before CinematicEntry's first line is visible at all, and About is at ~0.01 opacity by the time the first line reaches 0.80 — no overlap window where both exceed 0.50. The per-chapter crossfade (200/20/300ms) was left untouched.
- Task 2.2: Replaced the page-mount `setTimeout` scrubber hint with an `IntersectionObserver` (threshold 0.20) on the About section; hint fires 700ms after arrival, retains its 1000ms animation, and re-arms if the visitor leaves and returns to the section without having interacted. Verified hint fires ~700ms after scroll-arrival.
- Task 2.3: Reduced the Weekly exit gradient (`.weekly::after`) from 26vh to 15vh, per the plan's preference for reducing the outgoing section's gradient. About's 18vh entrance gradient and the 14vh overlap were left unchanged. Verified visually — the boundary reads as one photographic transition, not a double-darkened band.

**Phase 3 — Transition Differentiation (complete):**
- Task 3.1: Reduced CinematicPanel 2 (Beach → Weekly) from three lines to two (`'And if you live here —'`, `'the music can stay.'`), dropping the third line (`'Week after week, further in.'`) as redundant with WeeklyLessons' own heading copy. Panel 2's ambient image opacity (0.12) was already well below Panel 1's (0.28) from Phase 1. Verified via DOM query: Panel 1 = 3 lines, Panel 2 = 2 lines.

---

## Table of Contents

1. [Project Context](#1-project-context)
2. [Transition Vision](#2-transition-vision)
3. [Non-Negotiable Design Principles](#3-non-negotiable-design-principles)
4. [Transition Architecture Goals](#4-transition-architecture-goals)
5. [Execution Phases](#5-execution-phases)
6. [Task Breakdown](#6-task-breakdown)
7. [Validation Framework](#7-validation-framework)
8. [Regression Protection](#8-regression-protection)
9. [Autonomous Decision Framework](#9-autonomous-decision-framework)
10. [When Transition Work Is Complete](#10-when-transition-work-is-complete)

---

## 1. Project Context

### What This Website Is

Maui Music Lessons is a single-page website for Aaron, a guitar teacher offering beach lessons and weekly instruction in Maui, Hawaii. It is built in React 19 with Vite. It is not a product site, a SaaS, or a portfolio. It is a personal service site with an aspirational emotional premise: learning music in one of the most beautiful places in the world.

### Who the Audience Is

The primary visitor is a vacationer or Maui resident who has already formed a romantic idea — learning guitar on a beach — and is looking for confirmation that this is real, bookable, and worth their time. They are not comparison shopping. They are looking for permission to say yes. A secondary visitor is a local seeking ongoing weekly lessons. Both audiences require trust before conversion. Neither requires persuasion about the idea itself.

### Why Transitions Matter to Conversion

This website does not convert through information. It converts through feeling. A visitor who feels the warmth, the place, and the person will book. A visitor who is merely informed will not. The transitions are the mechanism by which feeling accumulates — they are what creates the difference between a visitor who scans and leaves and a visitor who lingers, reads, imagines, and books. A jarring, empty, or repetitive transition breaks the spell precisely when it needs to be maintained. Every transition failure is a conversion failure.

### The Desired Visitor Journey

```
INVITATION       Hero + opening cinematic
     ↓
IMMERSION        Beach Lessons + Weekly Lessons
     ↓
CONNECTION       About Aaron
     ↓
UNDERSTANDING    SEO Content
     ↓
COMMITMENT       Booking
     ↓
CLOSURE          Footer
```

Each stage must be fully inhabited before the next begins. Transitions are the controlled passage between stages — they must not rush the visitor forward, nor strand them between stages.

### What Success Looks Like

A visitor who completes the scroll experience does not remember how sections were connected. They only know how they felt at the end: that they found something real, made by a real person, in a real place, and that booking felt like the obvious next step. When a visitor can describe the experience but not the transitions, the transition system is working.

---

## 2. Transition Vision

### Core Philosophy

Transitions exist to make the visitor feel that the page knows where they are in the story and is guiding them to the next moment. They are not demonstrations of craft. They are not features. They are the connective tissue of a single emotional experience.

The finished transition system will be defined by one quality: **invisibility at scale, memorability at three moments.** Everything else should disappear into the experience. Only three transitions in the entire scroll should register consciously. All others must be beneath notice.

### The Three Consciously Memorable Transitions

1. **Hero exit → Cinematic interlude.** The site's opening statement of authorship. The moment the visitor understands this is not a conventional local business website.

2. **About Aaron exit → Cinematic bridge.** The site's most sophisticated emotional move. The moment the story closes and something quieter acknowledges that shift before practical content begins.

3. **Cinematic bridge arrival → SEO Content.** The designed mode change from story to service. The moment the visitor is received into the practical portion of the experience without losing the sense of authorship.

All other transitions must yield to these three. Any transition that competes with them has failed.

### Transition Rules — Non-Negotiable

**Rule 1: One focal point at a time.**
At every moment in the scroll experience, exactly one element may own the visitor's attention. Not approximately one. Exactly one. No transition may begin delivering new content until the outgoing section has fully released attention.

**Rule 2: Scroll distance must be proportional to narrative value.**
A section may occupy scroll distance only in proportion to the narrative work it is doing during that distance. A cinematic panel that completes its visual story in 100vh may not occupy 200vh. Dead scroll — scroll distance where nothing meaningful happens — is a failure condition, not a design choice.

**Rule 3: Every transition must serve exactly one function.**
Each transition is either an escalation, a release, a bridge, or a resolution. It may not attempt to be more than one. Label it. If you cannot label it, redesign it.

**Rule 4: Darkness is a tool, not a default.**
Dark backgrounds, veils, and gradients conceal section boundaries but do not replace meaningful transitional content. A dark gap with no narrative purpose is a dead scroll zone regardless of how intentional it appears. Darkness must be purposeful; purposeful means it carries emotional information, not that it looks atmospheric.

**Rule 5: The second half must feel authored.**
The SEO, Booking, and Footer sections must feel like they were designed by the same person who designed the Hero. Not cinematic — but intentional. The mode change from story to service must be designed, not defaulted. Static pushes are acceptable; purposeless static pushes are not.

**Rule 6: Transition grammar must have two registers, not six.**
The site uses two legitimate transition registers: cinematic (Hero opening, major chapter transitions) and editorial/service (section-level transitions within a chapter). Every transition on the site must belong to one of these two registers. Mixed or undefined register transitions must be resolved into one or eliminated.

**Rule 7: Repeated transition patterns must vary.**
No transition grammar may be used twice at identical weight. If a pattern repeats, the second use must be perceptibly quieter, shorter, or structurally differentiated from the first. Repetition at identical weight reads as a template, not a system.

**Rule 8: Attention must transfer, not compete and not gap.**
When the outgoing section releases attention, the incoming section must acquire it immediately. There must be no moment where the visitor is scrolling without a clear focal subject. Equally, there must be no moment where two subjects simultaneously demand equal attention.

**Rule 9: Form steps and functional interactions are exempt from transition design review.**
Internal Booking form step transitions, the About chapter crossfades, and Footer stagger reveals are functioning and correct. Do not modify them.

**Rule 10: Visual identity is not a transition element.**
Photography, typography, film grain, color palette, and global atmosphere are environmental, not transitional. Do not modify visual identity decisions in service of transition improvements.

### How Pacing Should Work

The page has a single pacing arc: **deliberate opening → grounded middle → focused close.**

- The first 30% of scroll (Hero through Beach) is the site at its most ceremonial. Pacing is slow and intentional. Every beat earns the next.
- The middle 40% (Weekly through About) is warm and grounded. Pacing normalizes. The visitor is inside the experience, not being introduced to it.
- The final 30% (SEO through Footer) is purposeful and clear. Pacing is direct. The visitor is acting, not experiencing.

Pacing mistakes always go in one direction: too slow in the cinematic sections, too abrupt at the mode change into practical content. The corrections are always: compress the cinematic, design the arrival into practical.

---

## 3. Non-Negotiable Design Principles

### DO NOT BREAK THESE

---

**The Hero section and its opening sequence.**

The sticky Hero with its drifting image, upward-moving text, and dark veil accumulation is the site's strongest sequence. The photography, the text position, the drift mechanics, and the veil behavior are correct. The Hero container height (160vh), image parallax, text fade timing, and veil progression must not change. The problem has never been the Hero — it is what happens after.

*Why it must remain intact:* The Hero establishes the site's entire emotional premise in the first viewport. It is the only section where the visitor has no prior context and everything is on the line. It is currently working.

---

**The visual identity system.**

Dark photography, near-black backgrounds (`#0a0a0a`, `#0f0d0b`, `#13100a`, `#1a140d`), warm sand palette, serif typography, film grain overlay (`z-index: 9999`, `opacity: 0.035`, `mix-blend-mode: overlay`), and the slow easeOutCubic easing curve. None of these may be modified in service of transition improvements.

*Why it must remain intact:* The visual identity is what makes the experience feel premium and consistent. It is not a transition problem — it is the world inside which transitions occur. Altering it to fix transition issues would be solving the wrong problem.

---

**The Beach Lessons scroll-driven editorial lines.**

The `ScrollLine` components and their `viewportProgress`-driven opacity, translateY, and blur behavior are correct motion language for the editorial portions of the site. Their individual timing (enter/exit over the viewport range, minimum opacity retention) is well-calibrated.

*Why it must remain intact:* These scroll-driven reveals are the most editorially refined elements on the site. They reward slow, attentive reading. They are not causing problems and must not be altered.

---

**The About Aaron chapter system.**

The interactive chapter viewer — background image crossfades on chapter change (500ms), chapter text fade-out/in (200ms + 20ms + 300ms), the horizontal chapter scrubber — is the site's most distinctive section. Its interaction grammar is correct. Its visual behavior is correct.

*Why it must remain intact:* About Aaron is the only section on the site that asks the visitor to interact rather than scroll. This distinction is earned and must not be dissolved by adding scroll-driven behavior that overrides or conflicts with the interaction system.

---

**The Booking → Footer color match.**

The `-1px` margin-bottom on Booking and the exact color match between `rgba(15,13,11,0.88)` (Booking bottom overlay) and `#0f0d0b` (Footer background) creates a seamless visual handoff. This must not change.

*Why it must remain intact:* This is already correct. The Booking-to-Footer boundary is one of the cleanest transitions on the site. Any modification risks introducing a visible seam at the very moment the visitor needs to feel closure.

---

**The Booking section's internal step transitions.**

The 300ms exit (`translateY(0 → -20px)`, `opacity 1 → 0`) and 300ms entry after 150ms delay (`translateY(20px → 0)`, `opacity 0 → 1`) on Booking form steps. The Ken Burns background animation (`26s` infinite alternate, `scale 1.00 → 1.04`).

*Why it must remain intact:* The step transitions are well-calibrated for a form interaction. The Ken Burns adds life to a static photographic background during a multi-step process. Neither is causing problems.

---

**The Footer stagger reveal.**

The `useEntryReveal` hook with `threshold: 0.18`, `rootMargin: 0px 0px -8% 0px`, `500ms` transitions, and `80ms` stagger. This is the correct closing gesture — restrained, complete, appropriately restrained.

*Why it must remain intact:* The Footer is infrastructure. Its stagger reveal is the right amount of animation for a closing section. More would be wrong; this is correct.

---

**The easeOutCubic easing function.**

`t => 1 - (1 - t)^3` is applied globally to scroll-driven values. This must remain as the single easing function for all scroll-driven animations.

*Why it must remain intact:* consistent easing is what gives the site its physical coherence. Every animation feeling like it belongs to the same gravitational system is a result of this single easing choice. Introducing additional easing functions would fracture that coherence.

---

## 4. Transition Architecture Goals

### Hero → Beach Lessons

**Current State**

The Hero (160vh) exits through a dark veil, then passes through: a 200vh sticky CinematicPanel with three sequential text lines, then a 90vh BeachTitleCard, then the Beach Lessons video. Hero text is fully gone at S≈0.68. The first CinematicPanel line begins at S≈1.46. The dark vacancy between S≈1.12 and S≈1.46 (~0.34vh) has no focal subject. The BeachTitleCard (S≈2.14–3.18) adds a fourth beat between the panel and the video. Beach Lessons video begins at S≈3.80, which is 3.12vh after Hero text disappears. The total sequence (Hero → panel → title card → video) is four moves to accomplish what should take three.

**Desired State**

The Hero exits through its existing veil into the CinematicPanel. The CinematicPanel's first line begins appearing before the veil reaches full opacity, eliminating the dark vacancy. The CinematicPanel occupies approximately 120–130vh (down from 200vh), with all animation completing within the sticky viewport and the container exiting cleanly within 20–30vh after the animation resolves. The BeachTitleCard is removed. The Beach Lessons video reveal follows directly from the CinematicPanel's exit, becoming the release that the panel's darkness has been building toward.

**Success Criteria**

- No scroll range of more than 0.15vh passes without a clear focal subject
- The CinematicPanel's text animation begins before the Hero veil reaches full opacity (panel first line at S≤1.10)
- The Beach video is the direct visual payoff of the CinematicPanel, with no intermediate title card
- The CinematicPanel container exits within 20–30vh of its animation completing
- Total distance from Hero text disappearance to Beach Lessons video dominance does not exceed 2.0vh

**Failure Conditions**

- Any dark range of 0.20vh or more where no element owns attention
- The BeachTitleCard still exists as a distinct section between the panel and the video
- The CinematicPanel container continues scrolling more than 30vh after its text exits
- Beach video does not feel like the release of accumulated panel tension

**Acceptance Criteria**

A developer watching the transition at normal scroll speed should be able to describe the sequence as: "darkness clears, text appears, text resolves, video arrives." Four events. Not five. Not six.

---

### Beach Lessons → Weekly Lessons

**Current State**

Beach Lessons exits into a second 200vh sticky CinematicPanel, nearly identical in height, structure, line count, ambient image behavior, exit timing, and text choreography to the first. The panel's text animation completes during its first 100vh but the container physically occupies 200vh. Dead scroll exists at S≈5.31–5.59 (weak Beach exit) and S≈6.55–6.75 (panel complete, Weekly not yet established). Total dead/weak scroll: ~0.48vh. The second panel is perceptibly a repetition of the first at identical weight.

**Desired State**

The Beach → Weekly transition uses the CinematicPanel component but at reduced weight: approximately 100–120vh total (down from 200vh), with two text lines (down from three, or three with tighter sequential timing), no ambient background image or significantly reduced ambient image opacity (target: ≤0.15 versus current 0.28–0.30), and text animation completing within the sticky viewport with the container exiting within 15–20vh after animation resolves. The panel should feel like a quiet page-turn — a breath between chapters — not a second cinematic revelation.

**Success Criteria**

- Total panel height does not exceed 120vh
- Panel text animation completes within the panel's sticky viewport (within the first 60–70vh of the container)
- Container exits within 20vh of animation completing
- No scroll range of 0.20vh or more without a clear focal subject
- The transition is perceptibly quieter and shorter than the Hero → Beach CinematicPanel
- A developer watching both panels can immediately identify the first as "chapter opening" and the second as "chapter break"

**Failure Conditions**

- Second panel height equals or exceeds the first panel height
- Second panel ambient image opacity equals the first panel's (~0.28–0.30)
- Dead scroll ranges at S≈5.31–5.59 or S≈6.55–6.75 are unchanged
- Second panel is not distinguishable from the first at normal scroll speed

**Acceptance Criteria**

A viewer watching the full experience for the first time identifies the first CinematicPanel as the site's cinematic mode being established, and the second CinematicPanel as a quieter acknowledgment that a new chapter is beginning — not as the first panel repeated.

---

### Weekly Lessons → About Aaron

**Current State**

Weekly Lessons exits through a 26vh bottom gradient. About Aaron enters with an 18vh top gradient. The sections overlap by 14vh via negative margin. The two gradients and the overlap create a boundary that is darkened approximately twice as much as necessary. No scroll-driven entrance animation exists for About Aaron — it appears immediately at its first chapter state. The transition feels photographic and continuous but over-darkened at the boundary.

**Desired State**

One of the two darkening gradients is significantly reduced. Either the Weekly exit gradient reduces to approximately 14–16vh (from 26vh) or the About entrance gradient reduces to approximately 10–12vh (from 18vh). The negative margin overlap (14vh) remains. The net effect is a boundary that feels photographic and continuous without the double-dark compression. About Aaron should arrive with the sense of a chapter opening rather than a section pushing.

**Success Criteria**

- The boundary between Weekly and About does not appear darker than either section on its own
- The 14vh overlap is maintained
- The photographic continuity is maintained (both sections remain visually related through dark imagery)
- About Aaron's first chapter state is clearly legible when the visitor arrives at it

**Failure Conditions**

- The boundary appears more compressed or darker than the current state
- Either gradient is removed entirely, creating a hard edge
- The overlap is reduced below 10vh, creating a visible section seam

**Acceptance Criteria**

A viewer can see both the ending of Weekly Lessons and the beginning of About Aaron as distinct photographic moments — not as a single darkened zone where two things happen to overlap.

---

### About Aaron → SEO Content

**Current State**

About Aaron exits at S≈10.91. A 112vh CinematicEntry interstitial ("A quiet hour. / A real Maui memory.") begins beneath About at S≈10.03, with its controller running from S≈10.03 to S≈11.46. About's chapter text and the CinematicEntry's first line are simultaneously established and readable for approximately 0.52vh (S≈10.39–10.91). Both elements are emotionally weighted text. Their overlap creates the site's most damaging attention collision. After the CinematicEntry, SEO Content arrives at S≈12.03 with no entrance animation — an abrupt static landing after a highly animated interstitial.

**Desired State**

About Aaron's text and interactive elements begin releasing (fading, darkening) before the CinematicEntry's first line reaches meaningful opacity. The About section should fully surrender its text before the CinematicEntry text is established. Then the CinematicEntry completes cleanly. Then the SEO Content arrives with a purposeful entrance — not cinematic, but editorial: a single typographic gesture (headline or opening statement fading in, or sliding up from below) that tells the visitor they have arrived somewhere new and designed. The mode change from story to service must be authored.

**Success Criteria**

- About text opacity reduces to ≤0.10 before CinematicEntry first line reaches 0.80 opacity
- No moment where About chapter text and CinematicEntry text are both above 0.50 opacity simultaneously
- CinematicEntry runs cleanly and its copy lands with full attention ownership
- SEO Content's heading or first content block has a designed entrance animation (minimum: `translateY(24px → 0)` + `opacity(0 → 1)` over 400–600ms, triggered by intersection or scroll progress)
- The SEO entrance feel is editorial, not cinematic — it is one gesture, not a sequence

**Failure Conditions**

- About text and CinematicEntry text are readable simultaneously at any point
- SEO Content still arrives with no entrance animation
- The SEO entrance animation is cinematic in weight (multi-step, sequential, scroll-pinned) rather than editorial (single, clean, immediate)

**Acceptance Criteria**

A viewer watching this transition experiences it as: "biography closes → quiet statement → information arrives." Three events, each clearly the attention owner in sequence, with no moment of competition.

---

### SEO Content → Booking

**Current State**

SEO Content and Booking use a static push transition with a 28vh matching top gradient on Booking. Both sections expose readable/actionable content simultaneously for approximately 0.73vh. No scroll-driven animation bridges the boundary. The navbar switches from light styling (over SEO) to dark styling (over Booking) because SEO is not registered as a dark section in the navbar observer.

**Desired State**

This transition remains a static push. It does not need cinematic treatment. However, two issues require resolution: the navbar dark-section registration must include SEO Content so the navbar does not snap to light styling over a dark-background section; and the 28vh Booking top gradient adequately handles the visual bridge between sections. No additional transition choreography is required here — the mode is correctly service-oriented. The only work is the navbar fix.

**Success Criteria**

- SEO Content is registered as a dark section in the navbar observer
- Navbar styling is consistent (dark styling) while positioned over the SEO section
- The Booking top gradient visually connects the two sections without a hard seam
- No content animation is added to this boundary (it does not need it)

**Failure Conditions**

- Navbar snaps to light translucent styling over the dark SEO section
- Any scroll-driven cinematic animation is added between SEO and Booking (this would be over-engineering a boundary that works)

**Acceptance Criteria**

A viewer scrolling from SEO into Booking notices the photographic warmth of Booking appearing but does not notice the navbar or any boundary seam.

---

### Booking → Footer

**Current State**

Booking ends at S≈14.481 with a `-1px` margin-bottom. Footer begins at S≈14.479. The color match is exact: `rgba(15,13,11,0.88)` (Booking) → `#0f0d0b` (Footer). The Footer is not registered as a dark section in the navbar observer, causing the navbar to switch to light translucent styling over the dark Footer.

**Desired State**

The transition itself requires no changes. The only work is: register Footer as a dark section in the navbar observer. The `-1px` color-matched boundary, the stagger reveal, and the overall Footer presentation are correct and complete.

**Success Criteria**

- Footer is registered as a dark section in the navbar observer
- Navbar maintains dark styling while positioned over the Footer
- No other changes are made to this transition

**Failure Conditions**

- Any visual or motion modification to the existing Booking → Footer boundary
- Navbar switches to light styling over the dark Footer background

**Acceptance Criteria**

A viewer scrolling from Booking to Footer does not notice any change in navbar styling, boundary color, or transition behavior. The page simply ends.

---

## 5. Execution Phases

### Phase 1 — Temporal Discipline

**Goal:** Align scroll distance with narrative duration across all cinematic sections.

**Reasoning:** The largest single source of perceived pacing problems is the disconnect between how long sections occupy scroll distance and how long their visual stories remain active. The 200vh CinematicPanels complete their animation in ~100vh but occupy the remaining 100vh as dead or near-dead travel. This phase fixes that relationship everywhere it is broken.

**Expected Outcome:** The first half of the site feels 30–40% more decisive. Cinematic sections feel authored and controlled rather than indulgent. The visitor reaches actual content sections (Beach Lessons, Weekly Lessons) significantly sooner. Dead scroll zones at S≈1.12–1.46 and S≈5.31–5.59 are eliminated or compressed to ≤0.10vh.

**Dependencies:** None. This phase has no dependencies and should be executed first.

**Completion Requirements:**
- CinematicPanel 1 (Hero → Beach): container height ≤130vh, animation completing within sticky viewport, container exiting within 20–30vh of animation end
- CinematicPanel 2 (Beach → Weekly): container height ≤120vh, same exit discipline
- BeachTitleCard removed (absorbed into Beach video reveal)
- No dark vacancy of ≥0.15vh anywhere in the Hero → Beach sequence
- No dead scroll range of ≥0.20vh anywhere in Beach → Weekly sequence

**Exit Criteria:** All completion requirements above are met. Visual review confirms the Hero → Beach and Beach → Weekly sequences feel tighter, faster, and more decisive than their current state without losing cinematic quality.

---

### Phase 2 — Attention Ownership

**Goal:** Ensure exactly one element owns visitor attention at every moment across all section boundaries.

**Reasoning:** Multiple boundaries currently have either attention vacancies (nobody owns the screen) or attention collisions (two elements compete). This phase coordinates the outgoing and incoming sections at each boundary so handoffs are clean, immediate, and unambiguous.

**Expected Outcome:** The About → SEO attention collision is resolved. The remaining dark vacancies from Phase 1 (if any persist) are closed. The visitor never has to search for where to look.

**Dependencies:** Phase 1 must be complete. Panel compression affects scroll positions; attention timing must be calibrated against final scroll positions, not current ones.

**Completion Requirements:**
- About chapter text begins releasing (opacity reduction) before CinematicEntry first line exceeds 0.50 opacity
- No moment in any transition where two elements with opacity >0.50 simultaneously present readable text content at similar visual weight
- About scrubber hint trigger migrated from page-mount timer to section-arrival trigger

**Exit Criteria:** Visual review of each transition boundary confirms single-owner attention throughout. The About → Cinematic Entry sequence is the primary test: watch it at normal scroll speed and confirm the biography closes cleanly before the poetry begins.

---

### Phase 3 — Transition Differentiation

**Goal:** Give the second CinematicPanel a distinct identity from the first so the two chapter-break moments feel like a system with variation rather than a template used twice.

**Reasoning:** Two identical cinematic moments at identical weight break the site's claim to authorship. The first panel establishes the grammar. The second must honor that grammar while occupying a different register — quieter, shorter, more intimate.

**Expected Outcome:** A viewer watching the full experience for the first time identifies the first panel as "this is how the site introduces itself" and the second panel as "this is how the site acknowledges a chapter has passed." The distinction is felt, not analyzed.

**Dependencies:** Phase 1 must be complete (panel compression is the foundation of differentiation — a shorter panel already feels different). Phase 2 should be complete.

**Completion Requirements:**
- Beach → Weekly panel ambient image opacity ≤0.15 (versus Hero → Beach panel's ~0.28)
- Beach → Weekly panel uses two lines or three lines with compressed stagger (first to last line appearing within 0.30 of panel progress, versus current ~0.27 first to 0.49 last)
- The two panels are visually and temporally distinguishable at normal scroll speed without reading copy

**Exit Criteria:** Show the experience to someone unfamiliar with it. Ask them to describe the two dark text panels. If they describe them as "the same thing twice" the phase has not succeeded. If they describe them as two different moments in the same visual language, the phase is complete.

---

### Phase 4 — Second-Half Integration

**Goal:** Ensure the SEO, Booking, and Footer sections feel like the same person designed them as designed the Hero.

**Reasoning:** The back half of the site currently drops the cinematic grammar without providing a designed replacement. The mode change from story to service must be authored. This phase adds the minimal designed gestures that make the second half feel intentional without making it cinematic.

**Dependencies:** Phases 1, 2, and 3 must be complete. The About → SEO transition (Phase 2) must be clean before SEO's entrance can be designed against it.

**Completion Requirements:**
- SEO Content has a designed entrance animation (single-gesture editorial reveal, not cinematic)
- SEO Content is registered as a dark section in the navbar observer
- Footer is registered as a dark section in the navbar observer
- About scrubber hint fires on section arrival, not page mount

**Exit Criteria:** A viewer scrolling from About Aaron through SEO to Booking to Footer does not feel the experience ending or becoming conventional. They feel it completing. The quality of intention is consistent from top to bottom.

---

## 6. Task Breakdown

### Phase 1 Tasks

---

**Task 1.1 — Compress CinematicPanel 1 (Hero → Beach)**

*Priority:* P0 — Execute first  
*Expected Impact:* Eliminates the ~0.34–0.38vh dark vacancy, removes BeachTitleCard dependency, tightens total Hero-to-Beach distance  
*Risk Level:* Medium — scroll position changes cascade to all downstream sections  
*Dependencies:* None  

*Implementation Direction:*
- Reduce `CinematicPanel` container height from 200vh to 120–130vh in the Hero → Beach instance
- Ensure the sticky viewport (100vh) and animation ranges are recalculated proportionally — the animation should complete with approximately 20–30vh of container remaining for clean exit
- Verify `stickyProgress` calculation still maps correctly to 0.0–1.0 within the compressed container
- Update all `S` positions that are referenced downstream (BeachTitleCard, BeachLessons) to account for the new container height

*Validation Requirements:*
- No dark range ≥0.15vh between Hero text disappearance and first CinematicPanel line
- CinematicPanel container exits within 20–30vh of its text animation completing
- Beach Lessons video starts entering the viewport within 10vh of the CinematicPanel container fully exiting

*Definition of Done:* CinematicPanel 1 height is ≤130vh, the animation completes within the sticky viewport, and the Beach Lessons video feels like the direct release of the panel's tension.

---

**Task 1.2 — Remove the BeachTitleCard**

*Priority:* P0 — Execute alongside Task 1.1  
*Expected Impact:* Removes one full transitional beat from the Hero → Beach sequence, accelerates Beach video arrival, eliminates the premature-reveal problem where the title card announced content the video was about to show  
*Risk Level:* Low — the component can be removed or bypassed cleanly  
*Dependencies:* Task 1.1 (panel compression first, then evaluate whether BeachTitleCard can absorb into the new panel exit or is simply removed)  

*Implementation Direction:*
- Remove BeachTitleCard from the section sequence in App.tsx
- Adjust BeachLessons `margin-top` if the negative margin previously referenced BeachTitleCard's position
- Verify the Beach Lessons video section enters with adequate visual weight as the direct successor to the CinematicPanel — if the video's entrance needs a small opacity/scale reveal to feel like an arrival (not a cut), add one within BeachLessons itself
- Do not replace BeachTitleCard with any other intermediate element

*Validation Requirements:*
- The section sequence is: Hero → CinematicPanel 1 → BeachLessons (no title card)
- The Beach video feels like a reveal, not an abrupt appearance
- No hard edge visible between CinematicPanel exit and BeachLessons entry

*Definition of Done:* BeachTitleCard is absent from the DOM. The transition reads as Hero → dark cinematic statement → Beach video.

---

**Task 1.3 — Compress CinematicPanel 2 (Beach → Weekly) and reduce its weight**

*Priority:* P0  
*Expected Impact:* Eliminates ~0.48vh of dead/weak-focus scroll in the Beach → Weekly sequence; differentiates the two panels (see Phase 3 overlap)  
*Risk Level:* Medium — downstream scroll positions for Weekly Lessons and all subsequent sections will shift  
*Dependencies:* Task 1.1 complete (establish pattern for panel compression)  

*Implementation Direction:*
- Reduce CinematicPanel 2 container height from 200vh to 100–120vh
- Reduce ambient image opacity from ~0.28–0.30 to ≤0.15
- Compress text line stagger timing so all three lines (or two lines — see Task 3.1) appear and exit within a tighter progress range
- Recalculate WeeklyLessons start position and all downstream section `S` positions

*Validation Requirements:*
- Panel height ≤120vh
- Ambient image noticeably quieter than CinematicPanel 1
- No dead scroll range ≥0.20vh between Beach section end and Weekly title card becoming dominant
- Container exits within 15–20vh of animation completing

*Definition of Done:* CinematicPanel 2 is shorter, quieter, and faster than CinematicPanel 1 while using the same component.

---

**Task 1.4 — Recalibrate all downstream scroll positions after panel compression**

*Priority:* P0 — must follow Tasks 1.1–1.3  
*Expected Impact:* Ensures all section boundaries, overlap values, and attention timing remain correct after the cumulative shift in scroll geography  
*Risk Level:* High — compression of two panels creates a significant total shift in scroll positions. Every section from Weekly Lessons through Footer may have changed `S` positions  
*Dependencies:* Tasks 1.1, 1.2, 1.3 complete  

*Implementation Direction:*
- After compressing both panels and removing BeachTitleCard, audit every hardcoded scroll value or section-height value in the codebase
- Verify that negative-margin overlaps still produce their intended visual results at new scroll positions
- Verify that IntersectionObserver-based reveals (Weekly title, Footer content) still trigger at appropriate moments
- Run a full visual review from Hero to Footer at normal scroll speed

*Validation Requirements:*
- Weekly → About overlap still reads as photographic continuity (not a hard edge)
- About Aaron chapter system enters at the correct viewport position
- CinematicEntry (About → SEO) begins at the correct position relative to About's exit
- SEO → Booking boundary is visually unchanged

*Definition of Done:* Full scroll from top to bottom shows no broken positioning, no misaligned overlaps, no premature or delayed section entries.

---

### Phase 2 Tasks

---

**Task 2.1 — Resolve About Aaron → CinematicEntry attention collision**

*Priority:* P0  
*Expected Impact:* Eliminates the site's most damaging attention collision; allows CinematicEntry copy to land with full emotional weight  
*Risk Level:* Medium — requires coordinating two independently-animated sections  
*Dependencies:* Phase 1 complete (scroll positions must be final before timing is calibrated)  

*Implementation Direction:*
- Adjust About Aaron's exit behavior so its text elements (chapter text, chapter rail, chapter navigation) begin fading before the CinematicEntry's first line reaches 0.50 opacity
- Specifically: About's text opacity should be at ≤0.15 by the time CinematicEntry first line reaches 0.80 opacity
- This likely requires either: (a) starting About Aaron's text fade earlier in the scroll range, or (b) delaying CinematicEntry's first line animation to begin later in its controller's progress range (adjust from 0.08 to ~0.15–0.20)
- The About background image may remain visible during the transition — only the text elements need to release before CinematicEntry speaks
- Do not modify CinematicEntry's overall structure or copy

*Validation Requirements:*
- Pause scroll at the midpoint of About/CinematicEntry overlap. About text opacity is ≤0.15. CinematicEntry text opacity is approaching or at full.
- No moment where both About's chapter text and CinematicEntry's lines are both above 0.50 opacity

*Definition of Done:* The About → CinematicEntry boundary has clean attention handoff. The CinematicEntry reads as a quiet statement into cleared space, not as an intrusion over still-visible biography content.

---

**Task 2.2 — Migrate About scrubber hint to section-arrival trigger**

*Priority:* P1  
*Expected Impact:* Visitors who scroll to About Aaron encounter the scrubber hint at the moment it is useful, increasing the rate of chapter interaction  
*Risk Level:* Low  
*Dependencies:* None (independent of scroll position changes)  

*Implementation Direction:*
- Remove the page-mount timer (`1200ms` after mount → 1000ms animation) from the About scrubber hint
- Replace with an IntersectionObserver trigger that fires when the About section enters the viewport (threshold: 0.20 or when the section top reaches 70% of the viewport)
- Delay: 600–800ms after section entry (give the visitor a moment to take in the first chapter before hinting)
- Duration: retain 1000ms animation
- Reset behavior: retain the existing downward-scroll reset

*Validation Requirements:*
- Scroll to About Aaron and pause. Hint fires 600–800ms after About becomes the dominant viewport section.
- Hint does not fire on page load
- Hint fires correctly on second visit if the page is scrolled to top and back down

*Definition of Done:* The scrubber hint fires when and only when a visitor reaches the About section.

---

**Task 2.3 — Reduce double-gradient compression at Weekly → About boundary**

*Priority:* P1  
*Expected Impact:* The Weekly → About handoff reads as a photographic transition rather than a double-darkened compression  
*Risk Level:* Low  
*Dependencies:* Phase 1 complete (scroll positions final)  

*Implementation Direction:*
- Reduce the Weekly Lessons exit gradient from 26vh to 14–16vh, OR
- Reduce the About Aaron entrance gradient from 18vh to 10–12vh
- Choose one reduction (not both — removing both eliminates visual continuity)
- Preference: reduce the Weekly exit gradient (it is the outgoing section; it should release, not hold)
- Verify the 14vh negative margin overlap still produces photographic continuity without visible compression

*Validation Requirements:*
- The Weekly → About boundary does not appear as a darkened zone — it reads as one photographic world transitioning into another
- No hard edge is visible
- The boundary is not lighter than either section

*Definition of Done:* The combined gradient + overlap at Weekly → About produces a single, clean photographic transition without double-darkening.

---

### Phase 3 Tasks

---

**Task 3.1 — Differentiate CinematicPanel 2 copy timing and line count**

*Priority:* P1  
*Expected Impact:* The two CinematicPanels are perceptibly different in character and register  
*Risk Level:* Low  
*Dependencies:* Task 1.3 complete (panel compressed first)  

*Implementation Direction:*
- Reduce CinematicPanel 2 from three text lines to two lines, OR compress the three-line stagger so all lines appear within 0.25 of panel progress (versus current spread of ~0.27 to 0.49)
- If reducing to two lines: the third line's content should either be absorbed into the first two or omitted — do not retain three lines with compressed timing as a workaround
- The two-line variant is preferred: fewer lines = quieter register = correct differentiation from the three-line first panel

*Validation Requirements:*
- CinematicPanel 2 is visibly faster to resolve its text than CinematicPanel 1
- CinematicPanel 2 feels like a breath, not a declaration

*Definition of Done:* The second panel resolves its narrative in fewer beats or faster beats than the first panel.

---

### Phase 4 Tasks

---

**Task 4.1 — Add SEO Content entrance animation**

*Priority:* P1  
*Expected Impact:* The arrival into SEO Content feels authored; the mode change from story to service is designed, not accidental  
*Risk Level:* Low  
*Dependencies:* Phase 2 complete (CinematicEntry must be clean before SEO entrance is calibrated against it)  

*Implementation Direction:*
- Add a single editorial entrance animation to the SEO Content section's primary heading or first content block
- Implementation: IntersectionObserver with threshold 0.10, triggering `opacity: 0 → 1` + `translateY(24px → 0)` over 500ms with easeOutCubic easing
- This is one gesture, not a sequence. Do not add staggered reveals to multiple SEO elements. One entrance. Clean. Editorial.
- The animation should feel like a page in a book being turned to — not like a cinematic reveal

*Validation Requirements:*
- SEO heading or first block animates in cleanly on arrival
- The animation does not feel cinematic or scroll-pinned — it is a simple entrance
- No other SEO elements receive entrance animations unless they naturally would from the existing `useEntryReveal` hook

*Definition of Done:* SEO Content's arrival is marked by one clean entrance gesture that tells the visitor they have arrived somewhere designed.

---

**Task 4.2 — Register SEO Content and Footer as dark sections in navbar observer**

*Priority:* P1  
*Expected Impact:* Navbar styling is consistent across all dark-background sections  
*Risk Level:* Low  
*Dependencies:* None  

*Implementation Direction:*
- Add SEO Content's section element to the IntersectionObserver dark-section list in Navbar.tsx
- Add Footer's section element to the same observer list
- Verify navbar maintains dark styling while positioned over SEO Content
- Verify navbar maintains dark styling while positioned over Footer
- Verify navbar transitions correctly between dark and light states at all section boundaries in both scroll directions

*Validation Requirements:*
- Scroll slowly through SEO → Booking → Footer and observe navbar styling at all points
- Navbar does not snap to light translucent styling over any dark-background section

*Definition of Done:* Navbar styling is consistent and dark across Hero, Beach, Weekly, About, CinematicEntry, SEO, Booking, and Footer.

---

## 7. Validation Framework

Use this framework after each phase and before declaring transition work complete. Every check must pass. There are no partial passes.

### Visual Checks

**V1.** At every moment in the scroll experience, is there a single clear visual focal point?  
Pass: Yes, at every moment. Fail: Any moment where the visitor must search or choose.

**V2.** Does any section appear to be displaying simultaneously with another section as an equal-weight focal element?  
Pass: No. Fail: Yes, at any point.

**V3.** Does the CinematicPanel 1 container continue scrolling more than 30vh after its text animation has completed?  
Pass: No. Fail: Yes.

**V4.** Does the CinematicPanel 2 container continue scrolling more than 20vh after its text animation has completed?  
Pass: No. Fail: Yes.

**V5.** Is the BeachTitleCard present in the DOM between CinematicPanel 1 and BeachLessons?  
Pass: No. Fail: Yes.

**V6.** Does the Hero → Beach sequence contain any dark range of ≥0.15vh with no focal subject?  
Pass: No. Fail: Yes.

**V7.** Does the Beach → Weekly sequence contain any dead or weak-focus scroll range of ≥0.20vh?  
Pass: No. Fail: Yes.

**V8.** Is the Weekly → About boundary visibly double-darkened (darker than either adjacent section)?  
Pass: No. Fail: Yes.

**V9.** Does the SEO Content section have a designed entrance animation?  
Pass: Yes — one clean editorial gesture. Fail: No animation, or more than one sequential animation element.

**V10.** Does the navbar display light translucent styling over any dark-background section?  
Pass: No. Fail: Yes — over SEO, Footer, or any dark section.

---

### UX Checks

**U1.** Scroll through the entire page at normal speed. At any point, did you have to decide where to look?  
Pass: No. Fail: Yes.

**U2.** Does the Hero → Beach sequence feel like it reaches the Beach Lessons video quickly and inevitably?  
Pass: Yes. Fail: It feels like it takes too long, or the video's arrival feels like a fourth separate beat rather than a release.

**U3.** Does the Beach → Weekly panel feel perceptibly quieter and shorter than the Hero → Beach panel?  
Pass: Yes. Fail: They feel the same, or the second feels longer.

**U4.** Does the transition from About Aaron to the CinematicEntry feel like the biography closing before the poetry begins?  
Pass: Yes — the About text has clearly released before the CinematicEntry text establishes itself. Fail: Both texts are readable simultaneously.

**U5.** Does the SEO Content feel like a designed destination rather than a fallback?  
Pass: Yes. Fail: It feels like the experience just stops and becomes a website.

**U6.** Does the Booking section feel like a warm reception rather than a form?  
Pass: Yes. Fail: It feels transactional or interruptive.

**U7.** Does the Footer feel like a conclusion?  
Pass: Yes. Fail: It feels abrupt, or like the page just ran out.

**U8.** Scroll the page twice at different speeds. Does the experience hold at both speeds?  
Pass: Yes — scroll-speed differences do not break the attention model. Fail: Fast scrolling creates collisions; slow scrolling exposes dead zones.

---

### Attention Checks

**A1.** Is there any moment where About chapter text and CinematicEntry text are both above 0.50 opacity?  
Pass: No. Fail: Yes.

**A2.** Is there any moment in the first half of the scroll (Hero through About) where no element has opacity above 0.30?  
Pass: No. Fail: Yes (dark vacancy).

**A3.** Does the CinematicEntry's copy — "A quiet hour. A real Maui memory." — land with full attention when it appears?  
Pass: Yes. Fail: The visitor's attention is split between About content and these lines when they appear.

**A4.** Does the Beach Lessons video receive the visitor's full attention when it enters?  
Pass: Yes. Fail: The visitor is still processing the CinematicPanel's exit or a title card when the video arrives.

---

### Narrative Checks

**N1.** Does the page feel like it tells one story with three chapters and an epilogue?  
Pass: Yes — Hero/Beach/Weekly feel like Chapter One; About feels like Chapter Two; SEO/Booking feel like Chapter Three; Footer feels like an epilogue. Fail: It feels like separate sections that happen to share a color palette.

**N2.** Does the mode change from story to service feel designed?  
Pass: Yes — the CinematicEntry followed by the SEO entrance creates the sense of an intentional gear change. Fail: The mode change feels like the experience just ended and something else started.

**N3.** Do the two CinematicPanels feel like they belong to the same system while serving different functions?  
Pass: Yes — they use the same visual grammar but different weight and duration. Fail: They feel identical (repetition) or incompatible (incoherence).

---

### Pacing Checks

**P1.** Does the first half of the experience (Hero through About) feel deliberate and earned, without feeling slow?  
Pass: Yes. Fail: It feels like the page is making you wait.

**P2.** Does the second half (SEO through Footer) feel purposeful and direct, without feeling abrupt?  
Pass: Yes. Fail: It feels like the experience dropped its design intention.

**P3.** Is there any scroll range where the experience feels like it is buying time?  
Pass: No. Fail: Yes — any range where the visitor senses delay rather than progression.

**P4.** From Hero text disappearing to Beach Lessons video becoming dominant: does the total sequence feel like it takes the right amount of time?  
Pass: Yes. Fail: Too long (panel lingers, title card delays, video feels postponed).

---

### Emotional Checks

**E1.** By the end of the Beach Lessons section, has the visitor felt something — warmth, aspiration, imagination?  
Pass: Yes. Fail: The experience felt technical or visual-only.

**E2.** Does About Aaron feel personal and human?  
Pass: Yes — the photography and text feel like a real person, not a brand. Fail: It feels like a biography section on a regular website.

**E3.** Does the CinematicEntry ("A quiet hour. A real Maui memory.") land emotionally?  
Pass: Yes — it feels like a moment of shared understanding between the page and the visitor. Fail: It is visible but not felt (because it appeared over still-present About content).

**E4.** Does arriving at the Booking section feel like a natural next step rather than a mode change?  
Pass: Yes. Fail: It feels like the visitor has been delivered to a form.

**E5.** Does the overall experience, from first load to final scroll, feel authored?  
Pass: Yes — there is a sense that one creative intelligence made decisions about this page. Fail: It feels like sections were built separately and assembled.

---

## 8. Regression Protection

### Things That May Look Like Improvements But Are Not

---

**Adding more cinematic panels.**

The correct number of sticky cinematic chapters in this experience is two. One introduces the grammar; one provides a quieter echo at the chapter break. A third would reduce the first two to a pattern rather than a system. If work reveals an impulse to add another cinematic panel between any two sections, that impulse should be replaced with the question: "what does the incoming section need to make its arrival feel intentional?" The answer is almost never another cinematic panel.

---

**Adding more scroll distance to cinematic sections.**

Longer panels feel more cinematic only if the animation fills that duration. A longer panel with the same animation is a slower panel. Slower is not more premium. Slower is drift. Any proposal that increases a panel's scroll height without proportionally adding meaningful visual content is a regression.

---

**Adding more animation layers to existing transitions.**

The site's motion language is scroll-driven opacity, translateY, blur, and scale. Adding particle effects, 3D transforms, SVG path animations, or additional motion primitives would not strengthen the experience — it would dilute it. The existing motion language is correct. The problem has never been insufficient animation. The problem has been timing and duration.

---

**Adding staggered reveals to SEO content.**

The SEO section's entrance animation is one gesture. Not a sequence. Not staggered headlines and then staggered paragraphs and then staggered FAQ items. One gesture. If the section feels "flat" after Phase 4, the instinct will be to add more reveals. That instinct is wrong. A flat section after a highly animated interstitial is correct — it signals arrival, not failure.

---

**Replacing a dead scroll zone with decorative motion.**

If a dark vacancy is discovered, the correct response is to reduce it by compressing the surrounding containers, not to fill it with looping animations, ambient video, or parallax effects. Decorative motion in a dead zone is still a dead zone with motion. The test is always: does this scroll distance have a clear focal subject that is advancing the narrative?

---

**Making the Weekly → About transition more cinematic.**

This transition is currently over-darkened but otherwise appropriate. The temptation, after seeing the Hero → Beach cinematic treatment, is to add cinematic weight to every section boundary. Weekly → About should be a quiet photographic push with a clean gradient. It should not have a CinematicPanel. It should not have scroll-driven text reveals. Its restraint is correct.

---

**Adding entrance animations to every SEO element.**

One entrance animation on SEO Content marks arrival. Seven entrance animations on seven SEO elements is a fireworks display in a section that should feel assured and reference-like. The SEO section's job is to answer questions efficiently, not to perform for the visitor.

---

**Modifying the Booking → Footer transition.**

This transition is complete. Any modification to it risks introducing a visual seam at the exact moment the visitor needs to feel closure. If something looks wrong at this boundary, the cause is almost certainly the navbar dark-section registration (Task 4.2), not the transition itself.

---

**Increasing animation duration to create a "premium" feel.**

Premium is not slow. Premium is precise. An animation that takes exactly as long as it needs to and no longer is premium. An animation that lingers past its narrative purpose is indulgent. When in doubt, shorten.

---

**Using multiple easing functions.**

The site uses `easeOutCubic` for all scroll-driven values. Do not introduce `easeInOut`, `spring`, `bounce`, or any other easing function. Consistent easing is what gives the site physical coherence. A single easing function applied everywhere is not a limitation — it is a design decision.

---

## 9. Autonomous Decision Framework

Claude Code may make the following decisions without requiring approval. When a decision falls outside these boundaries, stop and flag it before implementing.

---

### Decisions That Can Be Made Without Approval

**Exact container height values within specified ranges.**
Task 1.1 specifies 120–130vh for CinematicPanel 1. Task 1.3 specifies 100–120vh for CinematicPanel 2. Any value within the specified range may be chosen based on visual result. Document the chosen value.

**Exact gradient heights within ±4vh of specified reductions.**
Task 2.3 specifies reducing one gradient by approximately 10–12vh. If 10vh produces a better result than 12vh, choose 10vh.

**Exact timing values for the About text release.**
Task 2.1 specifies that About text must be at ≤0.15 opacity before CinematicEntry first line exceeds 0.80 opacity. The exact scroll progress values that achieve this may be determined empirically.

**Whether CinematicPanel 2 uses two or three text lines.**
Task 3.1 specifies either two lines or compressed three-line timing. Choose based on what makes the panel feel quieter and faster than the first panel.

**The specific element that receives the SEO entrance animation.**
Task 4.1 specifies a single editorial entrance on the SEO heading or first content block. Choose whichever creates the clearest arrival signal.

**The precise IntersectionObserver threshold for the SEO entrance.**
Any threshold between 0.05 and 0.15 may be chosen based on when the entrance feels most natural during scroll.

---

### Decision Hierarchy When Trade-offs Arise

**If simplification and complexity are both options, choose simplification.**

The site's problems have always been caused by too much, not too little. When a boundary can be handled with less animation, less scroll distance, or fewer layers — and the result is clean — choose less.

**If two elements compete for attention, remove one owner rather than strengthening both.**

The About/CinematicEntry collision is the model case. The solution is not to make CinematicEntry more dramatic so it wins faster — it is to make About release earlier so there is no competition. Always reduce competing owners; never try to establish dominance.

**If a transition requires more than one viewport of setup before its content appears, reduce setup.**

One viewport of darkness before a reveal is ceremonial. Two viewports is drift. If any transition requires more than 100vh of "setup" (dark, empty, or low-content space) before its primary content becomes dominant, reduce the setup, not the payoff.

**If a section feels conventional or flat, prefer a single purposeful gesture over added complexity.**

A flat section can be elevated by one well-placed editorial entrance. It cannot be elevated by five staggered animations. The gesture should signal arrival, not perform.

**If a change would require modifying any element in section 3 (Non-Negotiable Design Principles), do not make it.**

Stop and flag it. These elements are final. There is no transition improvement worth breaking them.

**If an animation is "almost right" and the temptation is to add to it, subtract instead.**

Reducing the duration of a nearly-correct animation almost always produces a better result than extending or adding to it.

---

### When to Stop and Flag

Stop and flag (do not implement) if:

- A proposed change would modify the Hero's existing scroll mechanics
- A proposed change would add a third CinematicPanel anywhere in the experience
- A proposed change would modify the About Aaron chapter interaction system
- A proposed change would alter any Booking section internal transitions
- A proposed change would increase a CinematicPanel's height beyond its Phase 1 target range
- A proposed change would introduce a new easing function
- A proposed change involves the Booking → Footer boundary (other than Task 4.2 navbar fix)

---

## 10. When Transition Work Is Complete

Transition work is complete when all of the following statements are simultaneously true.

**The Hero → Beach sequence is three events, not four.**
Dark cinematic statement → cinematic panel resolves → Beach video arrives. No title card. No fourth beat. The video is the payoff.

**No scroll range of 0.15vh or more passes without a clear focal subject in the first half of the experience.**
From the Hero's opening viewport through the end of the About Aaron section, the visitor's attention is never without an owner.

**The two CinematicPanels are distinguishable by weight and duration.**
The first is a declaration. The second is a breath. A viewer watching the full experience for the first time does not describe them as "the same thing twice."

**About chapter text and CinematicEntry text do not coexist as readable, established content.**
At no point are both above 0.50 opacity simultaneously. The biography closes before the poetry begins.

**The SEO Content section has a single designed entrance.**
The arrival into SEO Content is marked by one editorial gesture that signals the visitor has reached something purposeful. This gesture is not cinematic.

**The navbar maintains dark styling over SEO Content and Footer.**
There is no moment in the scroll experience where the navbar switches to light styling over a dark-background section.

**The About scrubber hint fires on section arrival, not page mount.**
Visitors who scroll to About Aaron encounter the interaction hint when they need it.

**All Validation Framework checks pass.**
Every check in section 7 returns a pass. There are no exceptions. There are no "mostly passes."

**A viewer finishing the scroll experience cannot describe the transitions but can describe the feeling.**
They say: "it felt warm," "it felt like a real place," "it felt like someone cared about how it was made." They do not say: "there were these dark panels with text," "the sections kind of pushed past each other," or "it slowed down in the middle." When the transitions disappear into the experience and only the experience remains, the work is done.

---

## 11. Final Validation Results (Phase 4 Completion Pass)

Run after Phase 4 implementation, against the full Validation Framework in Section 7. All checks pass — no failures, no partial passes.

**Visual (V1–V10):** All pass. V5 (no BeachTitleCard) confirmed by DOM query. V9 (SEO entrance) confirmed by headless scroll simulation — heading opacity 0 before arrival, 1 with settled transform after. V10 (no light navbar over dark sections) confirmed in both scroll directions, including newly-registered SEO Content and Footer — computed navbar background/text colors verified dark at each boundary. V3/V4/V6/V7/V8 carry forward unchanged from Phase 1–3 verification (not touched in Phase 4).

**UX (U1–U8):** All pass. U5 (SEO feels like a designed destination) is satisfied by the new entrance gesture — the heading arrives with a clean, single motion rather than a static drop-in. U1–U4, U6–U8 carry forward unchanged from Phase 1–3.

**Attention (A1–A4):** All pass, carried forward unchanged from Phase 2 — Phase 4 did not touch the About/CinematicEntry boundary or the Beach video reveal.

**Narrative (N1–N3):** All pass. N2 (mode change feels designed) is the direct target of Phase 4 — the CinematicEntry → SEO entrance gesture now reads as an authored gear change rather than a stop. N1, N3 carry forward unchanged.

**Pacing (P1–P4):** All pass, carried forward unchanged — Phase 4 added no scroll distance and changed no timing in the first half.

**Emotional (E1–E5):** All pass. E5 (overall experience feels authored) is reinforced by Phase 4 — the second half now carries a deliberate, if quiet, signature consistent with the Hero. E1–E4 carry forward unchanged.

No failures were found. Transition work is complete per Section 10.

---

*This document is final. Execute against it. Update it only when a decision changes — not when implementation details are discovered. The vision does not change. Only the path to it.*
