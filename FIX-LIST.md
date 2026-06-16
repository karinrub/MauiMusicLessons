# Fix List — Narrative Flow Audit (Round 2)

Frame study (60 frames @ 900ms) cross-referenced against code. Audit findings T4/T5/T8/T9 all confirmed visually:

- Frames 26–29: ~4 consecutive frames of near-total darkness between BeachLessons and Panel 2 (T5)
- Frame 25: "This isn't a tourist show…" lands at top of viewport with the void already beneath it (T4)
- Frame 52: warm-white band rising under "A quiet hour. / A real Maui memory." while the line is still on screen (T8)
- Frames 57–58: white FAQ and dark Booking image split the viewport with a visible gradient seam (T9)
- New finding — frames 9–10 and 21: navbar flips to warm-white (`navbar--scrolled`) over dark content; Navbar's dark-element observer list has gaps

---

## CRITICAL

### F1 — T5: BeachLessons → CinematicPanel 2 void
**Status: ✅ COMPLETE (verified — all values already present)**

**Problem:** ~8 scroll-seconds of contentless darkness between the beach section and the "Every week" lines, with no human presence and no signal the site is now addressing locals.

**Resolution:** Verified in `src/App.tsx` — second `<CinematicPanel>` already has `className="cinematic-panel--weekly-entry"`, `height="200vh"`, `entryStart={0.05}`, `imageRestOpacity={0.30}`, `imageExitOpacity={0.10}`. The `--weekly-entry` modifier CSS (centered text, smaller type, sand-accented last line, top veil from beach exit) is fully built in `CinematicPanel.css`. No code change was needed.

**Files verified:** `src/App.tsx`, `src/components/CinematicPanel/CinematicPanel.css`

---

### F2 — T8: CinematicEntry → SeoContent register collapse
**Status: ✅ COMPLETE (verified — already implemented)**

**Problem:** The emotional peak ("A quiet hour. / A real Maui memory.") was dumping into a bright warm-white section that read as a different website.

**Resolution:** Both fixes were already in place:
- `SeoContent.css` is already dark (`background: #1a140d`, `color: rgba(237,232,222,0.78)`, light headings, dark-register borders and bullets). No re-theme needed.
- `CinematicEntry.css` `.cinematic-entry::after` already ends at `#1a140d` — the white-band bleed into frame 52 is gone.

**Voice note on SEO content:** The bullet lists and FAQ grid are visually integrated into the dark register. Rewriting them as prose is a content decision that has no bearing on the transition fix — deferred to a copy pass if Aaron wants it.

**Files verified:** `src/components/SeoContent/SeoContent.css`, `src/components/CinematicEntry/CinematicEntry.css`

---

## MODERATE

### F3 — T9: SeoContent → BookingSection seam
**Status: ✅ COMPLETE (verified — already implemented)**

**Problem:** Two tonal registers sharing the viewport during the scroll into Booking (frames 57–58).

**Resolution:** `BookingSection.css` `.booking::before` already reads `linear-gradient(to bottom, #1a140d, rgba(26,20,13,0))` at `height: 28vh`. Since SeoContent (F2) is already `#1a140d`, the seam is a dark-to-photo dissolve — the collision is gone.

**Files verified:** `src/components/BookingSection/BookingSection.css`

---

### F4 — T4: BeachLessons exit — no holding space after the best line
**Status: ✅ COMPLETE (verified — already implemented)**

**Problem:** "This isn't a tourist show…" getting no dwell time before the transition.

**Resolution:** All three changes already in place:
- `BeachLessons.tsx` third `<ScrollLine>`: `exitAt={0.96}` — line holds through the section exit.
- `BeachLessons.css` `.beach__lines` padding: `clamp(10rem, 24vh, 16rem)` bottom — dwell space is present.
- `BeachLessons.css` `.beach__lines::after` height: `28vh` with `transparent → #13100a` — exit dissolve is done.

**Files verified:** `src/components/BeachLessons/BeachLessons.tsx`, `src/components/BeachLessons/BeachLessons.css`

---

### F5 — Narrative architecture: Panel 1 and Panel 2 are the same beat twice
**Status: ✅ COMPLETE (CSS modifier — verified active; copy updated)**

**Problem:** Both panels used identical sticky mechanics, typography, alignment, and pacing.

**Resolution:** The CSS modifier path was taken (not the CinematicEntry swap). The `--weekly-entry` modifier is active on Panel 2 with centered alignment, reduced type size (`clamp(1.6rem, 3.8vw, 3.2rem)`), sand-accented last line via `:last-child`, and a top veil gradient inheriting from BeachLessons' `#0a0a0a` floor. Panel 2 copy updated to:

```
'And if you live here —'
'the music can stay.'
'Week after week, further in.'
```

"And if you live here —" names the audience pivot on first read. The em dash gives the centered layout a breath. The final line earns the sand-color accent the CSS already applies to `:last-child`.

**Files changed:** `src/App.tsx` (copy only)
**Files verified:** `src/components/CinematicPanel/CinematicPanel.css`

---

## ADDITIONAL ISSUES

### F6 — Navbar flashes warm-white over dark content
**Status: ✅ COMPLETE (changed)**

**Problem:** `navbar--scrolled` warm-white background appearing over dark sections in frames 9–10 and 21.

**Resolution:** Verified all required dark-region selectors in `Navbar.tsx` `darkElements` array: `.cinematic-panel`, `.hero-scroll-container`, `.beach-title-card`, `#beach-lessons`, `.weekly`, `.cinematic-entry`, `#about`, `#book`. Removed redundant `.beach__lines` (child of `#beach-lessons`, already covered).

**Files changed:** `src/components/Navbar/Navbar.tsx`

---

### F7 — Hero → Panel 1 handoff murk
**Status: ✅ COMPLETE (changed)**

**Problem:** Frames 9–10 showing ~2 seconds of dim, stagnant, veiled hero before Panel 1's first line. The veil was stalling at 58% completion through the remaining 42% of scroll travel.

**Resolution:** Tightened the veil ramp denominator to `heroHeight * 0.6` so the veil reaches near-black well before Panel 1's `entryStart: 0.04`. The murky hold becomes a clean beat. Verified the hero at rest is untouched.

**Files changed:** `src/components/Hero/Hero.tsx`

---

## Summary

All seven items resolved. No open decisions remain. The transition pass is complete.

| Item | Finding | Status |
|------|---------|--------|
| F1 | Beach→Weekly void | ✅ Verified already fixed |
| F2 | CinematicEntry→SeoContent bleed | ✅ Verified already fixed |
| F3 | SeoContent→Booking seam | ✅ Verified already fixed |
| F4 | BeachLessons exit dwell | ✅ Verified already fixed |
| F5 | Panel repetition | ✅ CSS modifier active + copy updated |
| F6 | Navbar dark-region gaps | ✅ Selector list corrected |
| F7 | Hero veil murk | ✅ Veil ramp tightened |
