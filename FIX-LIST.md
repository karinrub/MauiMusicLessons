# Prioritized Fix List — Narrative Flow Audit (Round 2)

Frame study (60 frames @ 900ms) cross-referenced against code. Audit findings T4/T5/T8/T9 all confirmed visually:

- Frames 26–29: ~4 consecutive frames of near-total darkness between BeachLessons and Panel 2 (T5)
- Frame 25: "This isn't a tourist show…" lands at top of viewport with the void already beneath it (T4)
- Frame 52: warm-white band rising under "A quiet hour. / A real Maui memory." while the line is still on screen (T8)
- Frames 57–58: white FAQ and dark Booking image split the viewport with a visible gradient seam (T9)
- New finding — frames 9–10 and 21: navbar flips to warm-white (`navbar--scrolled`) over dark content; Navbar's dark-element observer list has gaps

---

## CRITICAL

### F1 — T5: BeachLessons → CinematicPanel 2 void

**Problem:** ~8 scroll-seconds of contentless darkness between the beach section and the "Every week" lines, with no human presence and no signal the site is now addressing locals.

**What to change:**

In `src/App.tsx` (second `<CinematicPanel>`, lines 65–72):

- `entryStart`: `0.22` → `0.05` (first line begins arriving within ~7vh of scroll instead of ~33vh)
- `height`: `"250vh"` → `"200vh"` (matches Panel 1's already-fixed height; removes ~50vh of dead travel)
- Add `imageRestOpacity={0.30}` (currently inherits default `0.13` — invisible per frames 26–29; Panel 1's fixed value of 0.28 is the proven reference)
- Add `imageExitOpacity={0.10}` (currently defaults to 0; keeps faint human presence through the exit instead of fading to pure black before WeeklyLessons' title card — fixes the black beat visible at frame 33)
- Change `PANEL_3_LINES` copy so line 1 names the audience pivot, e.g. `'And if you live here —'` / `'every week,'` / `'a little further into the music.'` (exact copy is Karin/Aaron's call; the requirement is that the first line addresses residents so the tourist→local pivot is explicit)

**Files:** `src/App.tsx` only (props + copy). No component changes.

**Why this fixes it:** Eliminates the dark travel before and after the text, makes the ambient image read as a person, and makes the audience shift legible in the copy itself.

**Risk:** Low. Props are already plumbed; Panel 1 uses the same values successfully. Verify WeeklyLessons' `-8vh` margin-top still overlaps cleanly after the height change.

**Dependencies:** Do before F4 (F4 lengthens the beach exit; F1 shortens what follows — they balance). Superseded in part by F5 if the architectural option there is taken.

---

### F2 — T8: CinematicEntry → SeoContent register collapse

**Problem:** The emotional peak ("A quiet hour. / A real Maui memory.") dumps directly into a bright warm-white brochure grid that reads as a different website.

**What to change:** Re-theme SeoContent to stay in the site's dark register (Booking, which follows, is also dark — the white section is the only break in the entire back half):

In `src/components/SeoContent/SeoContent.css`:

- `.seo-content`: `background: var(--color-warm-white)` → a dark warm tone continuous with CinematicEntry, e.g. `#1a140d` (one step warmer/lighter than `#13100a` so the section still registers as a chapter change); `color: var(--color-dark-2)` → `rgba(237, 232, 222, 0.78)`
- `.seo-content__intro h2`, `.seo-content h3`, `.seo-content__faq-item h4`: `color: var(--color-dark)` → `#ede8de`
- `.seo-content::before` gradient: end color `var(--color-warm-white)` → `#1a140d`; keep the `rgba(184, 154, 112, 0.24)` mid-stop (the warm shimmer is good — it just must land dark)
- `.seo-content__faq-item` border: `rgba(44, 36, 24, 0.14)` → `rgba(237, 232, 222, 0.14)`
- `.seo-content__lists li::before`: `var(--color-sand-dark)` → `var(--color-sand)`

In `src/components/CinematicEntry/CinematicEntry.css`:

- `.cinematic-entry::after`: replace the dark→white gradient (stops at `rgba(209,188,158,0.5)` / `rgba(250,247,242,0.96)`) with a quiet dark settle, e.g. `rgba(19,16,10,0)` → `#1a140d 100%`. This removes the white band that invades frame 52 while the peak line is still on screen.

In `src/components/SeoContent/SeoContent.tsx` / `App.tsx`:

- `.seo-content__button` uses `btn--dark` — switch to the light-on-dark button variant used elsewhere on dark sections (`btn--primary` or `btn--ghost`, match WeeklyLessons' CTA which sits on the same background).

**Voice note:** The bullet lists and FAQ keyword copy still contradict the site's voice even on a dark background. Visually demoting them (the re-theme does most of this) is the in-architecture fix. Rewriting SeoContent as prose or collapsing the FAQ requires an SEO-vs-narrative tradeoff — **requires architectural decision:** how much SEO keyword surface is Aaron willing to trade for voice consistency? Do not restructure until that's decided.

**Files:** `SeoContent.css`, `CinematicEntry.css`, `SeoContent.tsx` (button class only).

**Why this fixes it:** The visitor stays in one tonal world from the emotional peak through booking; SeoContent becomes a quiet informational chapter instead of a brochure interruption.

**Risk:** Medium. CSS-only, but check every text element in SeoContent for contrast (WCAG AA on `#1a140d`), and the `btn` variant rendering. WeeklyLessons' `btn--dark` on dark bg is the existing precedent to copy.

**Dependencies:** Must happen before F3 (F3's correct values depend on SeoContent's final background).

---

## MODERATE

### F3 — T9: SeoContent → BookingSection seam

**Problem:** Two tonal registers visibly share the viewport during the scroll into Booking (frames 57–58).

**What to change:** In `src/components/BookingSection/BookingSection.css`:

- `.booking::before`: `background: linear-gradient(to bottom, var(--color-warm-white), rgba(250,247,242,0))` → `linear-gradient(to bottom, #1a140d, rgba(26,20,13,0))` (assuming F2's `#1a140d`); raise `height: 18vh` → `28vh` so the booking photo resolves gradually from the SeoContent tone instead of appearing behind a thin white scrim.

**Files:** `BookingSection.css` only.

**Why this fixes it:** Once both neighbors are dark, the seam is a dark-to-photo dissolve instead of a white-to-dark collision; the mechanical split disappears.

**Risk:** Low.

**Dependencies:** After F2. If F2's background value changes, this gradient must match it exactly.

---

### F4 — T4: BeachLessons exit — no holding space after the best line

**Problem:** "This isn't a tourist show…" gets no dwell time before the scroll carries the visitor into the Panel 2 transition.

**What to change:** In `src/components/BeachLessons/BeachLessons.tsx`:

- Third `<ScrollLine>` (line 76): `exitAt={0.87}` → `exitAt={0.96}` — the line holds at full opacity essentially until it leaves the viewport instead of dimming early.

In `src/components/BeachLessons/BeachLessons.css`:

- `.beach__lines` bottom padding: `7rem` → `clamp(10rem, 24vh, 16rem)` — gives the line dead-quiet space after it lands.
- `.beach__lines::after` height: `120px` → `28vh`, gradient unchanged (`transparent` → `#13100a`) — converts the added padding into a slow dissolve toward Panel 2 rather than a hard black floor.

**Files:** `BeachLessons.tsx`, `BeachLessons.css`.

**Why this fixes it:** The emotional peak gets a beat of silence before the transition begins, and the transition starts inside the section's own space instead of in the void.

**Risk:** Low. Adds ~10–15vh of page height; F1 removes ~50vh, so net travel still shrinks.

**Dependencies:** Pair with F1 — doing F4 without F1 lengthens the approach to the void.

---

### F5 — Narrative architecture: Panel 1 and Panel 2 are the same beat twice

**Problem:** Both panels use identical sticky mechanics, typography, alignment, and pacing, so the second one reads as a rerun and its impact is diminished.

**What to change (in-architecture option):** Give the second panel its own modifier, mirroring how `--beach-entry` already differentiates Panel 1:

- `App.tsx`: add `className="cinematic-panel--weekly-entry"` to the second `<CinematicPanel>`.
- `CinematicPanel.css`: new `--weekly-entry` block — center the lines (`text-align: center`, centered padding), reduce size to `clamp(1.7rem, 3.6vw, 3.2rem)`, color the final line with `var(--color-sand-light)` via the existing `em` support (wrap "into the music." in `<em>` — `lines` accepts strings, so this needs the line rendered through the existing `__text em` styling; if `lines` can't carry markup, apply the accent color to the last child via CSS `:last-child`), and add a `::before` top gradient pulling from `#0a0a0a` (BeachLessons' floor) so the panel inherits the beach's darkness rather than restarting from its own.

**Stronger option — requires architectural decision:** Replace the second `CinematicPanel` with the existing `CinematicEntry` component (non-sticky, shorter, different motion grammar — and it currently appears only once, before SeoContent). This would make the three text interludes use two genuinely distinct mechanisms and would resolve most of T5's void by itself (112vh vs 200–250vh). It requires adding an `imageRestOpacity` prop to CinematicEntry (its 0.13 is hardcoded in three places) and deciding whether the pre-SeoContent moment should keep CinematicEntry or also change — that sequencing choice is the decision to make, not mine to take here.

**Files:** `App.tsx`, `CinematicPanel.css` (in-architecture option); `CinematicEntry.tsx` + `App.tsx` (architectural option).

**Why this fixes it:** Distinct typographic and spatial treatment makes Panel 2 a new narrative beat instead of a repeated device.

**Risk:** Medium (in-architecture option) — the `--beach-entry` precedent shows modifier blocks are safe, but center alignment needs checking on mobile breakpoints. The architectural option is Low risk mechanically but changes pacing decisions that should be approved first.

**Dependencies:** Coordinate with F1 — if the architectural option is chosen, F1's prop changes apply to CinematicEntry instead.

---

## ADDITIONAL ISSUES (found in frames/code, not in audit)

### F6 — Navbar flashes warm-white over dark content

**Problem:** In frames 9–10 (hero → Panel 1 overlap) and frame 21 (beach video region), the fixed navbar shows its `navbar--scrolled` warm-white background over dark/video content because the dark-element observer list in `Navbar.tsx` has gaps.

**What to change:** In `src/components/Navbar/Navbar.tsx`, `darkElements` (lines ~26–32) currently observes `.cinematic-panel`, `.beach-title-card`, `.beach__lines`, `#about`, `#book`. Add: `#beach-lessons` (the whole `.beach` section — replaces `.beach__lines`, which misses the 84vh video block above it), `.weekly`, and `.cinematic-entry`. For frames 9–10: the hero is dark once veiled, but `.hero` isn't observed and Panel 1's top hasn't entered the observer's top-5% band; observing `.hero-scroll-container` would keep the nav dark through the handoff — but verify against the hero's *unveiled* state at the top of the page (the nav is transparent there, `scrolled` is false, so it's safe).

**Files:** `Navbar.tsx` only.

**Why this fixes it:** The observer's coverage matches the page's actual dark regions, so the nav never presents its light theme over dark sections.

**Risk:** Low. Pure selector additions; the IntersectionObserver pattern is unchanged.

**Dependencies:** None. Can ship independently.

---

### F7 — Hero → Panel 1 handoff murk (minor)

**Problem:** Frames 9–10 show ~2 seconds of dim, stagnant, veiled beach image before Panel 1's first line — the hero never fully resolves to the panel's black, so the transition reads as murk rather than a deliberate fade-to-black.

**What to change:** In `src/components/Hero/Hero.tsx` line 37: raise the veil ceiling `* 0.58` → `* 0.85`, and tighten the ramp so it completes before the panel's text zone: `(sy - vh * 0.16) / (heroHeight * 0.82)` → `(sy - vh * 0.16) / (heroHeight * 0.6)`. The hero then lands at near-black just as Panel 1 (entryStart 0.04, already fixed) begins its first line — the fade becomes a beat, not a stall.

**Files:** `Hero.tsx` only.

**Why this fixes it:** The hero completes its exit instead of hovering at 58% darkness through the handoff.

**Risk:** Low. Only affects scroll states past 16% of the hero; the resting hero is untouched. Check that the veil doesn't darken too early on short viewports (min-height 600px case).

**Dependencies:** None, but review together with F1/F5 since all three shape the first dark interlude.

---

## Suggested execution order

1. **F6** (independent, low risk, visible win)
2. **F1 + F4** together (the beach→weekly corridor, both ends)
3. **F2 → F3** in sequence (the back-half register, F3 values depend on F2)
4. **F7** (polish on the first transition)
5. **F5** after the architectural decision (CinematicPanel modifier vs CinematicEntry swap) and the SeoContent voice decision from F2 are made

Two decisions needed from you/Aaron before full completion:

1. **F5:** differentiate Panel 2 with a CSS modifier, or swap it to CinematicEntry (changes site rhythm, resolves more of T5)?
2. **F2:** how much SEO keyword surface (bullets, FAQ grid) can be rewritten into prose without losing the search rationale for the section?
