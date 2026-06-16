# Transition Fix Workplan — Maui Music Lessons

Cross-referenced against live code. All directions are resolved — no options, no deferred decisions.

---

## What we're fixing and why

The site has three distinct failure zones:

**Zone 1 — The beach-to-weekly corridor** is the longest dead stretch on the page. The visitor earns the best line on the site ("This isn't a tourist show…") and is immediately dropped into ~8 scroll-seconds of near-black nothing. There is no human presence, no signal of what's coming. The emotional momentum built through the beach section evaporates here.

**Zone 2 — The back-half tonal collapse.** The cinematic peak ("A quiet hour. A real Maui memory.") bleeds a warm-white gradient upward into its own final line while it's still on screen. Then the visitor exits into SeoContent — which, per the CSS, is already dark (`#1a140d`). The real problem is CinematicEntry's own exit gradient invading it from below. This is a one-line CSS fix, not a re-theme.

**Zone 3 — The panel repetition.** Panel 1 (beach entry) and Panel 2 (weekly entry) use identical visual grammar — same size, same left-alignment, same weight, same motion. The `--weekly-entry` modifier class already exists in `CinematicPanel.css` with centered alignment, reduced type size, sand-colored final line, and a top veil gradient. It just needs to be active and correctly sequenced.

**What the code actually shows:** Several fixes in `FIX-LIST.md` are already implemented — `SeoContent.css` is already dark, `BeachLessons.css` already has the extended bottom padding and 28vh dissolve, and `BookingSection.css` already has the dark gradient. The remaining work is tighter than the audit implied.

---

## Execution order

### W1 — Verify `--weekly-entry` modifier is active and correct
**Status:** Completed — verified only.
**Completion note:** Verified the second `CinematicPanel` already has `cinematic-panel--weekly-entry`, `height="200vh"`, `entryStart={0.05}`, `imageRestOpacity={0.30}`, and `imageExitOpacity={0.10}`. Also verified all five items listed under “What is already fixed” remain present; no code change was needed.
**File:** `src/App.tsx`
**Why:** The modifier class is fully built in `CinematicPanel.css` (centered text, smaller type, sand-accented last line, top veil from beach exit) but must be confirmed active on the second `<CinematicPanel>`. If `className="cinematic-panel--weekly-entry"` is present, it's live. If not, add it.
**Also:** Confirm these props on the second `<CinematicPanel>`:
- `height="200vh"` (removes dead travel; matches Panel 1)
- `entryStart={0.05}` (first line arrives within ~7vh of scroll, not ~33vh)
- `imageRestOpacity={0.30}` (currently defaults to 0.13 — invisible; Panel 1 uses 0.28)
- `imageExitOpacity={0.10}` (keeps faint human presence through the exit)

**Why these specific values:** Panel 1 already runs at these settings and works. Panel 2 should match Panel 1's presence density, not its default near-invisible state.
**Risk:** Low. Props already plumbed in the component; these are value corrections.
**Verify:** After change, scroll the beach-to-weekly corridor. The panel's ambient image should be faintly visible (human presence without distraction), and the first text line should arrive quickly after the beach section ends.

---

### W2 — Fix CinematicEntry's exit gradient bleeding into SeoContent
**Status:** Completed — verified only.
**Completion note:** Verified `src/components/CinematicEntry/CinematicEntry.css` already transitions from transparent `#13100a` to dark `#1a140d`; no code change was needed.
**File:** `src/components/CinematicEntry/CinematicEntry.css`
**Why:** The audit's frame 52 problem — the warm-white band rises into the final cinematic line while it's still on screen — is caused by the `::after` gradient. The current CSS already has this fixed correctly (`rgba(19,16,10,0)` → `#1a140d 100%`). **Confirm the fix is in place and has not been reverted.** If it reads correctly, this task is a verification pass only.
**Risk:** None if confirmed. If the gradient was reverted to a white stop, restore to the dark version.

---

### W3 — Tighten the hero veil completion
**Status:** Completed — changed.
**Completion note:** Updated the hero veil progress denominator to `heroHeight * 0.6` so the veil reaches completion earlier without changing the initial 16% delay.
**File:** `src/components/Hero/Hero.tsx`
**Why:** The veil progress calculation caps at `heroHeight * 0.58` — meaning the hero reaches maximum darkness at 58% of its scroll container height and holds there through the remaining 42%. The visitor sees a stalled dim state for several scroll-seconds before Panel 1's text begins. The veil should complete just as Panel 1 starts, not stall in the middle.
**Change (line ~36–38):**
- `(sy - vh * 0.16) / (heroHeight - vh * 0.16)` → `(sy - vh * 0.16) / (heroHeight * 0.6)`
- This tightens the ramp so the veil completes to near-black well before the scroll reaches Panel 1's `entryStart: 0.04`, turning the murky hold into a clean beat.
**Risk:** Low. Only affects scroll states past 16% of the hero container. The hero at rest (top of page) is untouched. Check on short viewports (≈600px height) that the veil doesn't darken prematurely on the visible load state.

---

### W4 — Navbar dark-region coverage
**Status:** Completed — changed.
**Completion note:** Verified all required dark-region selectors were present and removed the redundant `.beach__lines` selector because `#beach-lessons` already covers the full section.
**File:** `src/components/Navbar/Navbar.tsx`
**Why:** The navbar flips to its warm-white `--scrolled` state over dark content in two zones — during the hero→Panel 1 handoff and during the beach video block — because the `darkElements` observer list has gaps.
**Check current state of the `darkElements` array (line ~26–36).** The following must all be present:
- `.cinematic-panel` (covers both panels)
- `.hero-scroll-container` (covers the hero through its full scroll exit — critical for the handoff)
- `.beach-title-card`
- `#beach-lessons` (covers the full beach section including the 84vh video block)
- `.beach__lines` (may be redundant if `#beach-lessons` covers it — remove the duplicate)
- `.weekly`
- `.cinematic-entry`
- `#about`
- `#book`

If `#beach-lessons` is present, `.beach__lines` can be removed (it's a child of `#beach-lessons`). If `.hero-scroll-container` is missing, add it.
**Risk:** Low. Observer pattern is unchanged; these are selector corrections.
**Verify:** Scroll slowly through the hero, beach video, and beach lines sections. The navbar should never show a warm-white background in any of these zones.

---

### W5 — Panel 2 copy: make the audience pivot legible
**Status:** Completed — changed.
**Completion note:** Replaced `PANEL_3_LINES` with the specified local-audience pivot copy; no styling or structure was changed.
**File:** `src/App.tsx`
**Why:** The current `PANEL_3_LINES` copy ("You live on Maui. / The music can stay with you. / Week after week.") doesn't visually signal the tourist→local pivot on first read. The first line is the moment the site changes audiences. It needs to immediately name that shift.
**Change `PANEL_3_LINES` to:**
```
'And if you live here —'
'the music can stay.'
'Week after week, further in.'
```
**Why this copy:** "And if you live here —" uses a conjunction that explicitly acknowledges the shift from the tourist register. The em dash creates a pause that the centered `--weekly-entry` layout will honor. "Week after week, further in." echoes the Weekly Lessons section headline and lands the sand-color accent (already on the last line via CSS `:last-child`) on the phrase that earns it — not on a bare "Week after week."
**Risk:** Copy-only change in `App.tsx`. Zero styling impact.

---

## What is already fixed (verify, don't re-implement)

The following items from `FIX-LIST.md` are already in the codebase. Confirm each is present and unchanged before running the session:

- **`SeoContent.css`** — already dark (`background: #1a140d`, light text). No re-theme needed.
- **`BookingSection.css` `.booking::before`** — already `linear-gradient(to bottom, #1a140d, rgba(26,20,13,0))` at `28vh`. Seam fix is done.
- **`BeachLessons.css` `.beach__lines`** — already `padding: 4rem 0 clamp(10rem, 24vh, 16rem)`. Dwell space is done.
- **`BeachLessons.css` `.beach__lines::after`** — already `height: 28vh` with `transparent → #13100a` gradient. Exit dissolve is done.
- **`BeachLessons.tsx` third ScrollLine** — already `exitAt={0.96}`. Line holds through the section exit.

If any of these have been reverted, restore them before the W1–W5 session.

---

## Out of scope

These are content and structural decisions that belong to a separate pass, not a transition fix:

- Testimonials and social proof (requires real student quotes from Aaron)
- "Just me" missing price in BookingSection (requires pricing decision)
- About Aaron bio rewrite (copy/voice work)
- Footer strengthening (social links, secondary CTA)
- Booking flow endpoint clarity (Calendly vs. email — integration decision)

---

## File change summary

| File | Task | Change type |
|------|------|-------------|
| `src/App.tsx` | W1, W5 | Props + copy |
| `src/components/CinematicEntry/CinematicEntry.css` | W2 | Verify only |
| `src/components/Hero/Hero.tsx` | W3 | Scroll math |
| `src/components/Navbar/Navbar.tsx` | W4 | Selector list |

---

## Session structure for Claude Code + codex

All five work items fit in a single Claude Code session. W2 is a verification pass — if already correct it costs nothing. The total surface is 2 files with code changes (`Hero.tsx`, `Navbar.tsx`), 1 props-and-copy change (`App.tsx`), and 1 CSS confirm (`CinematicEntry.css`).

Start with W2 (read the file, confirm or fix), then W1 (the heaviest — confirms props, verifies modifier class, confirms already-fixed items), then W3, W4, W5 in order.

---

## Completion Log

| Task ID | Files touched | Result | Short reason | Verification performed |
|---------|---------------|--------|--------------|------------------------|
| W2 | `src/components/CinematicEntry/CinematicEntry.css` | Verified only | Exit gradient already ends at dark `#1a140d`. | Inspected the `cinematic-entry::after` gradient; `npm run typecheck` and `npm run smoke` passed. |
| W1 | `src/App.tsx`; `src/components/CinematicPanel/CinematicPanel.css`; `src/components/SeoContent/SeoContent.css`; `src/components/BookingSection/BookingSection.css`; `src/components/BeachLessons/BeachLessons.css`; `src/components/BeachLessons/BeachLessons.tsx` | Verified only | Weekly-entry modifier, required Panel 2 props, and all already-fixed transition items were present. | Inspected the modifier CSS, panel props, and five already-fixed values; `npm run typecheck` and `npm run smoke` passed. |
| W3 | `src/components/Hero/Hero.tsx` | Changed | Tightened the veil completion ramp using `heroHeight * 0.6`. | Reviewed the scoped diff; `npm run typecheck` and `npm run smoke` passed. |
| W4 | `src/components/Navbar/Navbar.tsx` | Changed | Removed redundant `.beach__lines`; all required dark-region coverage remains. | Inspected the final selector list; `npm run typecheck` and `npm run smoke` passed. |
| W5 | `src/App.tsx` | Changed | Applied the specified local-audience pivot copy. | Reviewed the scoped diff; `npm run typecheck` and `npm run smoke` passed. |
