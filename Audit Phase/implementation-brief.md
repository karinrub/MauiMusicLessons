# Implementation Brief For Future Coding Agents

This brief is for future agents who will implement the audit remediation work. Do not start coding until the required reading order is complete.

## Required Reading Order

1. `Audit Phase/audit-findings.md`
2. `Audit Phase/audit-plan.md`
3. `Audit Phase/task-map.md`
4. `Audit Phase/baseline-verification.md`
5. Relevant source files for the task category being implemented

If `Audit Phase/baseline-verification.md` does not exist, create it before editing application source code. Future agents must not start implementation from source files before reading the four Audit Phase documents above.

Read `audit-findings.md` as evidence, not as a file to edit. It contains historical observations, baseline ratings, technical notes, and conversion findings. If later audit sections conflict with earlier observations because the site changed during auditing, verify the current app behavior locally and document the current state before editing code.

## Source Of Authority

Use this authority order when instructions, findings, current behavior, or implementation details appear to conflict:

1. Explicit user instruction.
2. `Audit Phase/audit-findings.md` as preserved evidence.
3. `Audit Phase/baseline-verification.md` as current browser-verified state.
4. `Audit Phase/audit-plan.md` as strategy and scoring framework.
5. `Audit Phase/task-map.md` as implementation scope.
6. Current source code as implementation reality.

Rules:

- If audit findings conflict with current browser behavior, document the difference instead of silently choosing one.
- If current browser behavior shows that a finding is already resolved, mark it as `Already resolved in current app state` rather than deleting or weakening the original finding.
- If current browser behavior shows a new issue, document it in the task completion report or baseline verification before implementing a fix.
- Explicit user instruction overrides earlier planning language. When it changes implementation direction, document the reason in the completion report.

## Finding Status Rules

Every major finding must eventually receive one of these statuses:

1. `Implementable now`
2. `Needs user data`
3. `Needs asset decision`
4. `Needs baseline verification`
5. `Duplicate or overlap with another finding`
6. `Already resolved in current app state`
7. `Deferred with explicit reason`

Rules:

- A finding marked `Duplicate or overlap with another finding` must still identify the task category where the combined issue is handled.
- A finding marked `Deferred with explicit reason` must include a concrete reason and cannot be deferred only because the work is hard.
- A finding marked `Needs user data` or `Needs asset decision` remains part of the audit until the dependency is resolved or explicitly documented in the final report.
- Do not delete, soften, or ignore a finding because its status is not immediately implementable.

## Project Goal

Bring every audit rating to `100 / 100` while preserving the existing MauiMusicLessons direction:

- Cinematic Maui music lesson atmosphere.
- Premium editorial typography and pacing.
- Visitor beach lesson journey.
- Local weekly lesson journey.
- About Aaron chapter concept.
- Guided booking flow concept.
- Maui-specific emotional and geographic identity.

This is a refinement and completion pass, not a redesign.

## Non-Negotiable Constraints

Do not:

- Replace the site with a new concept.
- Redesign the site from scratch.
- Remove the cinematic atmosphere.
- Remove the Maui-specific emotional direction.
- Remove the distinction between visitors and locals.
- Remove the booking flow concept.
- Remove the About Aaron chapter concept.
- Remove the existing premium editorial direction.
- Turn the site into a generic service-business page.
- Fabricate reviews, ratings, testimonials, years of experience, student counts, press mentions, phone numbers, or platform links.
- Edit `Audit Phase/audit-findings.md` except for preservation metadata explicitly requested by the user.

## Implementation Rules

- Work category-by-category from `task-map.md`.
- Keep source edits scoped to the category being implemented.
- Prefer existing components, hooks, utilities, easing, typography, and CSS structure before adding new abstractions.
- Preserve strong existing moments unless the task map explicitly calls for a controlled adjustment.
- Treat practical conversion copy as part of the cinematic voice, not as generic marketing filler.
- Use real business facts only when they already exist in the code/audit or are provided by the user.
- Document any user-data dependency instead of inventing content.
- Maintain reduced-motion behavior for every motion change.
- Maintain keyboard and screen-reader accessibility for every interaction change.
- Verify responsive behavior before marking a task complete.

## Task Execution Discipline

- Implement one task category at a time.
- Do not combine unrelated P0 and P1 work in one pass.
- Do not begin the next task until the current task has been verified.
- Keep commits or change batches scoped to the active task category.
- If implementation reveals that the task map is incomplete, document the gap before continuing.
- Do not make opportunistic redesign changes outside the active task.
- Do not mark work complete because it looks better.
- Mark work complete only when the relevant acceptance criteria and browser verification pass.
- Preserve the current site concept while fixing implementation gaps.

## Media And Asset Rules

- Do not request or assume a new photoshoot.
- Do not assume new Aaron photos will be added.
- Use only existing project assets unless the user explicitly provides new media later.
- Do not fabricate images, testimonials, reviews, or business facts.
- Do not replace real project imagery with generic stock-style imagery unless explicitly approved by the user.
- Solve visual cohesion through asset selection, crop, overlay, color treatment, masking, vignette, grain, layout, placement, scale, or reducing visual dominance.
- If existing assets are insufficient, document the limitation clearly and continue with the strongest achievable treatment using existing assets.
- Preserve all existing audit goals.
- `Needs asset decision` means choosing from existing project assets, existing media, crop, overlay, treatment, placement, scale, visual prominence, or whether to reduce or remove a visual role.
- `Needs asset decision` does not mean requesting or assuming new photography.
- Replacement may only mean replacement with another existing project asset unless the user explicitly provides new media later.
- The asset constraint does not lower the target of `100 / 100`.

This constraint does not lower the target for Photography, Art Direction, Visual Cohesion, Visual Quality, or Visual Rhythm. Future agents must still aim for `100 / 100` using the existing project assets.

## Motion And Technical Architecture Rules

- Do not introduce Framer Motion, GSAP, or another animation library unless explicitly approved by the user.
- Prefer existing motion utilities and shared scroll infrastructure before creating new systems.
- Do not add new scroll listeners when the existing shared scroll subscriber can support the behavior.
- Do not solve dead zones by deleting cinematic sections or flattening the experience.
- Do not hide content behind scroll timing, hover-only interaction, or motion-only cues.
- Every motion change must have a reduced-motion equivalent.
- Every section transition change must be verified by slow scroll, normal scroll, direct nav jump, and mobile scroll where practical.
- Navbar reveal behavior, scrolled state, dark-section state, and mobile menu behavior must be preserved or intentionally updated with verification.
- Booking step transitions, FAQ transitions, About chapter transitions, and media controls must remain accessible.
- Any new motion abstraction, scroll listener, RAF loop, IntersectionObserver usage, or inline-style mutation pattern must be documented with a reason.

## What Not To Change

Do not remove or replace these core elements:

- Hero concept, location stamp, and emotional subhead.
- Cinematic interstitial copy structure.
- Beach Lessons as the primary visitor offer.
- Weekly Lessons as the local/long-term resident offer.
- "And if you live here - the music can stay." audience pivot.
- About Aaron as a chaptered narrative.
- FAQ as a practical hesitation-removal section.
- Booking as a guided conversational flow.
- Footer as a quiet close to the experience.

You may refine copy, motion, layout, imagery, overlays, routing, and interaction details only when the change directly maps to audit findings and preserves the concept.

## How To Use audit-findings.md

Use it to answer:

- What was observed?
- Which score did the issue affect?
- Which moments are strongest and must be protected?
- Which weaknesses are explicitly named?
- Which technical files and animation systems were identified?

Do not summarize it away. When implementing a task, cite the specific finding category in your working notes or final response.

## How To Use audit-plan.md

Use it to understand:

- The purpose of the audit phase.
- The global target of `100 / 100`.
- The non-negotiable direction constraints.
- The rating target table.
- The recommended implementation order.
- The definition of done.

If a proposed code change conflicts with `audit-plan.md`, do not make that change without explicit user approval.

## How To Use task-map.md

Use it as the implementation checklist. Each category includes:

- Relevant findings.
- Current problem.
- Required outcome.
- Priority level.
- Likely files/components.
- Acceptance criteria.
- Verification steps.

Do not mark a category complete until its acceptance criteria and verification steps have been satisfied.

## Required Implementation Order

1. Baseline verification pass.
2. Global motion architecture.
3. Global section transitions.
4. Visual asset and overlay cohesion across cinematic panels, Beach, Weekly, About, and Booking.
5. Hero clarity refinements, if still needed after baseline verification.
6. Beach Lessons conversion and motion repair.
7. Weekly Lessons conversion and local-value repair.
8. About Aaron discoverability and accessibility.
9. SEO and information section voice/integration.
10. FAQ visual and accessibility refinement.
11. Booking flow completion, context, accessibility, and confirmation clarity.
12. Footer utility and closing moment.
13. Conversion and trust pass across the full page.
14. Accessibility pass.
15. Responsive pass.
16. Performance pass.
17. Final verification.

## Required Verification After Each Task

After each implementation task:

- Run the relevant local checks for the project.
- Perform browser verification for the changed task area.
- Perform desktop checks where relevant.
- Perform mobile checks where relevant.
- Perform reduced-motion checks where relevant.
- Perform keyboard and accessibility checks where relevant.
- Verify no unrelated source file was unintentionally changed.
- Confirm the change preserves the cinematic Maui direction.
- Report files changed.
- Report audit findings addressed.
- Report which audit ratings the task is intended to improve.
- Report acceptance criteria completed.
- Report remaining blockers.
- Report user-data dependencies.
- Report asset-decision dependencies.
- Confirm that no unrelated source files were changed.

## Required Final Response Format For Coding Tasks

Future coding agents must end each implementation task with this format:

Summary:
Files changed:
Audit findings addressed:
Ratings targeted:
Acceptance criteria completed:
Verification performed:
Remaining blockers:
User-data dependencies:
Asset-decision dependencies:
Next recommended task:

## Final QA Requirements

Before considering the audit complete:

- Verify every audit source has been addressed through the task map.
- Verify every major finding has a status.
- Verify every P0 category has browser verification evidence.
- Verify every remaining deferred issue has an explicit reason.
- Verify every user-data dependency is separated from implementable engineering work.
- Verify every asset-decision dependency is separated from implementable engineering work.
- Verify no original audit finding was deleted, softened, or silently ignored.
- Verify no source code work began before baseline verification existed.
- Verify no new photoshoot or new Aaron photography was requested or assumed.
- Verify the current website direction was preserved.
- Run a production build.
- Scroll the full page from hero to footer at desktop and mobile widths.
- Test all nav links and CTAs.
- Complete every booking path.
- Test booking validation and final confirmation behavior.
- Test FAQ accordion behavior.
- Test About Aaron chapter navigation by mouse/touch and keyboard.
- Test reduced-motion mode.
- Check for text overlap, clipped buttons, horizontal overflow, unreadable image overlays, and blank scroll zones.
- Verify direct contact and response-time messaging.
- Verify no fake testimonials or unsupported claims were introduced.
- Revisit the rating target table in `audit-plan.md` and confirm every blocker has been addressed or documented as a user-data dependency.

## Stopping Rule

Stop after documentation or planning tasks when the user explicitly says not to implement. For this audit documentation pass, do not edit application source code and do not implement website changes.
