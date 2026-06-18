# BookingSection — Final Polish Workplan
**Status:** Structural implementation complete. Final polish phase remaining.  
**Files:** `src/components/BookingSection/BookingSection.tsx`, `src/components/BookingSection/BookingSection.css`  
**Do not modify any other component unless explicitly noted.**

---

## Purpose

This document is the single source of truth for remaining BookingSection work. The structural implementation is complete and validated via live review. Panel stabilization, overflow elimination, contact step visibility, back navigation, group path logic, duration skipping, and the day/time chip interface are all working correctly.

Three issues remain before the BookingSection is considered production complete.

---

## Non-Negotiable Constraints

These must be respected throughout all remaining work. Do not revisit them.

### Design — do not change
- Background image (`aaron-bookingForm.jpg`) — file, position, overlay values
- `object-position: center 30%` on `.booking__bg-img`
- Overlay CSS values on `.booking__bg-overlay` — do not adjust opacity
- Ken Burns animation (`kenBurnsSubtle`) — keep as-is
- `margin-bottom: -1px` on `.booking` — Footer color-match seam, never remove
- All color variables (`--color-sand`, `--color-sand-light`, etc.)
- All tile visual states: default, hover, selected, unselected
- History chip display (`.conv-history`, `.conv-history__entry`, `.conv-history__q`, `.conv-history__a`)
- Step entry/exit animation direction and easing (`step-enter`, `step-exit` keyframes)
- Reduced-motion fallback (`conv--reduced`) — must remain fully functional

### Interaction — do not change
- Auto-advance on tile selection
- Back navigation and `clearDataFrom()` cascade
- `STEP_ORDER` array and step sequencing
- `useReducedMotion` hook behavior
- `buildMailto` function — do not modify email format or recipient
- `mailto:` submission mechanism — do not replace with fetch/API
- Confirmation copy: "We'll see you out there, [Name]." — do not change

### Brand — do not change
- All copy must be warm, personal, unhurried
- No exclamation points
- No generic UX language ("Submit", "Next", "Continue", "Proceed")
- Aaron is always referred to by first name only

---

## What Is Already Working — Do Not Reopen

The following were confirmed correct in live post-implementation review. Do not revisit.

- Panel height stability
- Overflow elimination on all steps
- Contact step CTA visible without scrolling at 1440×707
- Footer fully hidden during all active booking steps
- Back navigation with correct state cascade
- Group path (Two of us / Small group / Larger group) skipping duration step correctly
- Duration step (Just me path only) showing correct per-duration pricing
- Day/time chip interface functioning correctly with multi-select days and single-select time
- Optional note field accepting and passing text to email
- Confirmation screen rendering correctly with personalized name
- Step transitions (step-enter / step-exit keyframes) — 300ms exit / 260ms enter with 90ms overlap is correct behavior
- Reduced-motion fallback

---

## Remaining Work

### Finding 1 — Solo Pricing History Chip

**Objective:** Remove the price range from the WHO'S JOINING history chip when "Just me" is selected.

**Current behavior:** After selecting "Just me", the history chip displays "Just me - $35 / $60". The price range appears because duration has not yet been chosen. The UI is exposing pricing uncertainty at a moment when it serves no purpose.

**Why this matters:** The chip is intended to confirm a decision the user has made. Price is not yet a confirmed decision at the group-size step — it depends on duration. Showing "$35 / $60" makes the chip feel provisional and slightly unfinished. All other chips show only resolved information.

**Required behavior:** The WHO'S JOINING chip for "Just me" must display only "Just me" — no price. Pricing for the solo path is fully resolved in the duration chip ("1 hour — $60" or "30 minutes — $35"), which is the correct place for it.

**Implementation guidance:**

In `BookingSection.tsx`, locate the logic that builds the history chip answer for the group/participants step. For group options ("Two of us", "Small group (3–5)", "Larger group (6–8)"), the price is flat and known immediately — those chips may continue to show price. For "Just me", strip the price from the chip answer. Only show "Just me".

The duration chip already resolves pricing for the solo path. No other changes are needed.

Do not change the duration tile labels or the duration chip — they are correct as-is.

Do not change group option chip labels — those prices are confirmed at selection time.

**Validation:**
- Select "Just me" — history chip shows "Just me" only, no price
- Select "Two of us" — history chip shows "Two of us - $60" (unchanged)
- Select "Small group (3–5)" — chip shows correct group price (unchanged)
- Select "Larger group (6–8)" — chip shows correct group price (unchanged)
- Continue to duration step — chip for "Just me" still shows "Just me" only
- Select "30 minutes" — duration chip shows "30 minutes — $35"
- Select "1 hour" — duration chip shows "1 hour — $60"
- Back-navigate from duration to group size — WHO'S JOINING chip still shows "Just me" only

**Completion criteria:** The string "$35 / $60" never appears anywhere in the BookingSection UI.

---

### Finding 2 — Availability Note Trust Gap

**Objective:** Confirm to the user that their optional scheduling note was received, without cluttering the history chip system.

**Current behavior:** The availability step includes an optional text field ("Anything else about timing? (optional)"). Users enter meaningful scheduling context here — e.g., "We're leaving Sunday so ideally earlier in the week." The note is passed correctly into the email Aaron receives. However, after the user advances to the contact step, the note is invisible. There is no confirmation it was captured. The WHEN history chip shows only "Fri · Afternoon" — the note is absent from the summary. This creates a small but real trust gap.

**Why this matters:** Tourists in particular use this field to communicate their vacation window — it is the most practically important piece of information they provide. If they can't see that it was received, they may wonder whether to repeat it in the name field, add it to the email field, or start over. The fix must close this loop without damaging the chip system.

**Decision required:** Do not assume the examples below are the correct implementation. Evaluate and choose the approach that best fits the existing design language.

Options to evaluate:

Option A — Inline acknowledgment below the field. When the note field contains text, show a small confirmation beneath it: something like "✓ We'll pass this along to Aaron." This appears while the user is on the availability step and disappears when they advance. The chip remains as "Fri · Afternoon" — clean and scannable.

Option B — Append a note indicator to the WHEN chip. When a note is present, the WHEN chip shows "Fri · Afternoon · note added" or a small icon/indicator. This gives the user a persistent receipt. Risk: adds visual complexity to the chip row.

Option C — Add a fifth history chip "YOUR NOTE" with a truncated version of the note text (e.g., first 40 chars + "..."). This treats the note as a first-class answered question. Risk: may feel heavy for what is optional supplementary info.

**Evaluation criteria for choosing:** The solution must (1) confirm to the user the note was received, (2) not add visual noise to the history chip grid, (3) feel consistent with the warm and unhurried tone of the rest of the flow, (4) work correctly with back navigation — if the user goes back and clears the note, the confirmation must disappear.

**Implementation guidance:** Whichever option is chosen, implement it cleanly. If Option A: a conditional element below the textarea that renders when `noteValue.trim().length > 0`. If Option B or C: modify the chip rendering logic in the history array construction. All implementations must handle the reduced-motion fallback correctly.

**Validation:**
- Enter text in the optional note field — confirmation appears
- Clear the text field — confirmation disappears
- Advance to contact step — user can see that the note was received (either via chip, persistent indicator, or chosen mechanism)
- Back-navigate to availability step — note text is still present in the field, confirmation still visible
- Submit with note — verify note appears in the generated email (do not break this)
- Submit without note — no note indicator visible anywhere in the flow

**Completion criteria:** A user who enters text in the optional note field has clear visual confirmation that it was captured before they advance to the contact step.

---

### Finding 3 — Final Polish Pass

**Objective:** Review the BookingSection as a finished product and identify any remaining refinements that should be made before declaring it production complete.

**Scope:** This is not a redesign task. Do not invent work. Read the component code, inspect the CSS, and interact with the live site. Only include issues that genuinely exist and genuinely affect quality.

**Areas to inspect:**

1. **Copy consistency** — Read every string in the flow. Check for tone inconsistencies, awkward phrasing, or any string that sounds generic. The bar is: every word should sound like Aaron said it.

2. **Reduced-motion path** — Interact with the full flow with `prefers-reduced-motion: reduce` active (or using the `.conv--reduced` class). Confirm it presents a complete, usable layout — not just an unstyled form.

3. **Chip grid layout at 4 chips** — Verify the two-column history chip grid looks correct when all four chips are present (WHO'S JOINING / INSTRUMENT / DURATION / WHEN). Check alignment, spacing, and that no chip is visually orphaned.

4. **Mobile layout** — If there is a `@media (max-width: 768px)` block for BookingSection, verify it is still coherent after the implementation changes. The primary target is desktop, but the mobile layout must not be broken.

5. **Empty state / first arrival** — Scroll to the section fresh. Confirm the initial arrival view (section heading + "Pick what works..." subtext + four group-size tiles) is visually correct and no previous session state is leaking.

6. **Keyboard navigation** — Tab through the flow. Confirm focus states are visible on all interactive elements (tiles, chips, BACK button, text inputs, submit button).

**Implementation guidance:** For each genuine issue found, fix it. For each area that is already correct, note it as confirmed and move on. Do not generate tasks for things that are working.

**Validation:** After this pass, go through the full booking flow one final time as a user who has never seen the site before. If anything feels off, fix it. If nothing does, the BookingSection is done.

**Completion criteria:** The full flow — from initial arrival through confirmation — can be completed without friction, confusion, or any moment that feels unpolished.

---

## Definition of Done

The BookingSection is production complete when all of the following are true:

- [ ] "Just me" chip shows "Just me" only — no price range
- [ ] Group option chips (Two of us / Small group / Larger group) still show correct flat prices
- [ ] Duration chip (solo path) correctly shows resolved pricing
- [ ] Optional note capture is confirmed to the user before they advance
- [ ] Note confirmation disappears correctly if the field is cleared
- [ ] Note content passes correctly into the generated email
- [ ] Final polish pass complete — no copy, layout, focus, or mobile issues outstanding
- [ ] Full flow tested: solo path (Just me → Guitar → 1 hour → chips + note → contact → confirm)
- [ ] Full flow tested: group path (Two of us → Guitar → chips → contact → confirm)
- [ ] Back navigation tested at every step — state cascade correct
- [ ] Reduced-motion path tested — complete and usable
- [ ] No regressions to any previously working behavior

---

## What This Document Does Not Cover

The following are confirmed working and out of scope for this document:

- Panel height stabilization
- Overflow / scroll elimination
- Contact step CTA visibility
- Step transition timing
- Day/time chip interface
- Optional note field plumbing
- Back navigation and state cascade
- Group path and duration skip logic
- Confirmation screen

Issues deferred to future workplans (not blocking production):

- Real-time availability integration (requires backend)
- Left-aligned panel layout variant
- Animated confirmation state
- Price display in group-size tiles
- SeoContent → BookingSection transition refinement
