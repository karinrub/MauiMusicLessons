# MauiMusicLessons — Implementation Handoff
## June 2026 Finishing Tasks

This document defines all remaining implementation work identified in the June 2026 grill session. Tasks are ordered by priority. Read the full task before touching any file. Do not implement tasks marked **BLOCKED** — they require Karin's input first.

---

## Ground Rules

- Read relevant source files before every change. Never assume.
- Surgical changes only. Do not refactor what you're not fixing.
- No new dependencies.
- No copy changes without explicit approval from Karin — flag copy decisions as questions before implementing.
- After each task: `npm run typecheck` and `npm run build` must pass.
- Do not touch: Hero, CinematicPanel timing, AboutAaron chapter system architecture, BookingSection step transitions, Booking→Footer color match, film grain overlay.

---

## Task 1 — P0: Beach Video Reliability
**Files:** `src/components/BeachLessons/BeachLessons.tsx`

**Problem:** The beach video renders as a black rectangle in a fresh desktop Chrome session. Chrome defers video loading for off-screen elements with a low Media Engagement Index score on GitHub Pages. The `autoPlay` HTML attribute alone does not reliably trigger loading or playback.

**Current state:** BeachLessons.tsx already has an IntersectionObserver implementation that calls `video.load()` and `video.play()` on viewport entry with `rootMargin: '900px 0px'`. Read the current source carefully — this may already be the correct fix. The audit was conducted against an earlier version. Verify whether the current IntersectionObserver implementation is sufficient by testing in a fresh desktop Chrome session before making any changes.

**If the current implementation is still failing:**
- Confirm the observer is actually firing (add a temporary console.log, remove after testing)
- Confirm `preload="none"` is set on mount and switched to `preload="auto"` before `video.load()`
- Confirm `video.play()` is called after `video.load()` within the observer callback
- Ensure the observer disconnects after first trigger

**Must preserve:**
- `videoState` tracking: `idle → loading → ready → unavailable`
- `beach__video-wrap--${videoState}` class for CSS state
- Pause/play toggle and mute toggle controls (WCAG 2.2.2)
- Reduced-motion path: start paused, hide pause control
- `aria-label` on video element
- Status message for loading/unavailable states

**Validation (required):** Open an incognito Chrome window, navigate to the local dev server or deployed site, scroll to Beach Lessons. The video must: (1) initiate a network request, (2) not remain at readyState 0, (3) visually display frames instead of a black rectangle. Confirm with DevTools Network tab.

---

## Task 2 — Weekly: Remove Em-Dashes From Body Copy
**Files:** `src/components/WeeklyLessons/WeeklyLessons.tsx`

**Problem:** Karin does not want em-dashes (—) anywhere in the Weekly section copy.

**Two instances to fix:**

1. `"Aaron teaches guitar and ukulele in weekly sessions — one hour, one person, outdoors on Maui."`
   Rewrite so the clause reads naturally without the dash. Do not simply delete the dash.

2. `"People who keep coming back describe a shift that's hard to predict at the start — the progress becomes noticeable, the hour becomes something they protect."`
   Same — rewrite the sentence structure, not just remove the character.

**⚠️ COPY REQUIRES KARIN APPROVAL.** Propose your rewrites as a question to Karin before implementing. Do not commit copy changes without sign-off.

---

## Task 3 — Weekly: Fix Editorial Exit Motion
**Files:** `src/components/WeeklyLessons/WeeklyLessons.tsx`

**Problem:** "Week after week, further in." and the editorial text exit too fast. The exit currently starts the moment the section begins leaving the viewport (`viewportProgress(editorial, 0.0, -0.5)`). There is no moment where the visitor can read the full section at rest before it begins fading.

**Fix:** Delay the exit start so the editorial panel holds at full opacity longer before fading. Change the desktop exit thresholds from `viewportProgress(editorial, 0.0, -0.5)` to something like `viewportProgress(editorial, -0.2, -0.7)` — meaning the fade doesn't begin until the element is 20% above the viewport and completes when it's 70% above. Tune until there is a clear dwell moment where all text is simultaneously visible and readable.

**Do not change** the mobile exit path (`viewportProgress(editorial, -0.6, -1.0)`) without separate mobile testing at 390×844.

**Validation:** Slow-scroll through the Weekly editorial on desktop. There must be a moment where the heading, body copy, conversion row, and CTA are all fully visible simultaneously. The exit should feel choreographed, not rushed.

---

## Task 4 — Weekly: Show aaron-teaching-1.jpg Fully (No Crop)
**Files:** `src/components/WeeklyLessons/WeeklyLessons.css`

**Problem:** `aaron-teaching-1.jpg` (1467×2200, portrait) is displayed in `.weekly__editorial-photo` with `object-fit: cover` and a fixed height (`clamp(520px, 74vh, 780px)`), which crops the bottom of the image. Aaron's full figure — face, body, and bench — must be visible.

**Current CSS:**
```css
.weekly__editorial-photo img {
  height: clamp(520px, 74vh, 780px);
  object-fit: cover;
  object-position: center 18%;
}
```

**Fix options (choose the cleanest):**
- Change `object-fit: cover` to `object-fit: contain` with a matching background color (`#1c1409`) so the full portrait is shown within the column without cropping. This may show narrow letterbox strips at top/bottom — acceptable if they match the section background.
- Or: remove the fixed height and let the image define its own height at natural aspect ratio within the flex column. The right column will then be taller than the left text column — this may require `align-items: flex-start` on `.weekly__editorial` instead of `center`.

**Do not** add black bars that differ from the section background color. Do not distort the image.

**Validate** at desktop 1440 and mobile 390. At mobile, the photo is stacked above the text (`flex-direction: column-reverse`) with `aspect-ratio: 3/4` — adjust the mobile rule if needed so the full portrait is also visible there.

---

## Task 5 — Weekly: Replace Scene Image with aaron-weekly-2.jpg
**Files:** `src/components/WeeklyLessons/WeeklyLessons.tsx`, `src/components/WeeklyLessons/WeeklyLessons.css`

**Problem:** The current scene image (`aaron-weekly-1.jpg` — Aaron with a young boy in a park) does not match the site's visual world and is not the strongest proof for the Weekly local-student audience.

**Fix:**
1. In `WeeklyLessons.tsx`, change the `weekly__scene-img` src from `aaron-weekly-1.jpg` to `aaron-weekly-2.jpg`
2. Update dimensions: `aaron-weekly-2.jpg` is portrait (check actual dimensions with an image tool before hardcoding width/height attributes)
3. Update the `alt` attribute: `"Aaron pointing at a ukulele chord chart with a student, Maui coastline and ocean visible behind them"`
4. In `WeeklyLessons.css`, update `.weekly__scene-img` filter from `brightness(0.82) saturate(0.85) contrast(0.96)` to approximately `brightness(0.58) saturate(0.60) contrast(0.90)` — the image has a bright sky that needs more aggressive treatment to integrate into the dark cinematic system. Tune visually; the target is consistent with `aaron-tourists-1.jpg` in Beach Lessons.

**Validate:** The scene image must read as the same visual world as the rest of the site — dark, warm-tinted, cinematic. The bright sky must not blow out. The teaching dynamic (Aaron pointing at the chart, student engaged) must be legible.

---

## Task 6 — Weekly: Strengthen CTA and Marketing Clarity
**Files:** `src/components/WeeklyLessons/WeeklyLessons.tsx`

**Problem:** A local visitor considering ongoing weekly lessons finishes the section without a clear sense that Aaron has exactly what they're looking for. The section needs a clearer ask — the visitor should finish it knowing: this is for me, this is what I get, and I know what to do next.

**Direction:**
- The issue is clarity of ask, not emotional tone. The existing copy voice is correct.
- The conversion row (`$60 · 1 hr | weekly cadence | Kihei, Maui | Student-paced — no syllabus`) is present but may need reordering or emphasis to land harder.
- The CTA button "Let's find a time" is acceptable but could be more direct for a local who knows they want this.
- Do not add bullet lists, feature grids, or marketing blocks. Stay within the existing section structure.
- Do not fabricate testimonials, statistics, or outcomes.

**⚠️ COPY REQUIRES KARIN APPROVAL.** Propose specific changes as questions before implementing.

---

## Task 7 — About Aaron: Fix Chapter Image Readiness (Prevent Black Flash)
**Files:** `src/components/AboutAaron/AboutAaron.tsx` (and related CSS if needed)

**Problem:** Chapters 2, 3, and 4 use `loading="lazy"`. Chapter 3 (`aaron-playing-2.jpg`) was confirmed at `naturalWidth=0` at initial DOM inspection in a fresh session. The chapter activation mechanism applies the `--active` class (which sets `opacity: 1`) immediately with no check for whether the image has loaded. On first visit or slow connections, this produces a black or blank flash.

**Fix:**
- Before applying the `--active` class to a chapter, check if the chapter's `<img>` element has `img.complete === true`
- If `complete` is false, attach a one-time `load` event listener on the image; apply `--active` in that callback instead of immediately
- The visual transition (CSS `transition: opacity 0.5s`) should still run — it just needs to start from a loaded state
- Cover all four chapters, not just Chapter 3

**Do not change:**
- Chapter navigation architecture (prev/next, rail, drag, keyboard)
- Hint animation
- Reduced-motion behavior
- Chapter label or content structure

**Validation:** On a throttled connection (Chrome DevTools → Slow 3G), navigate to About Aaron immediately after page load. Click through all four chapters rapidly. No chapter should show a black or blank frame at activation.

---

## Task 8 — About Aaron Chapter 4: Replace aaron-onlyMe.jpg
**Files:** `src/components/AboutAaron/AboutAaron.tsx`

**Problem:** `aaron-onlyMe.jpg` is used as both the About Aaron Chapter 4 background AND the CinematicEntry background image. A visitor who sees it full-screen in Chapter 4 immediately encounters it again in CinematicEntry — this breaks the forward narrative momentum.

**Fix:** Replace the Chapter 4 background image in AboutAaron with a different image. CinematicEntry keeps `aaron-onlyMe.jpg` unchanged.

**Chapter 4 is the "Maui" chapter** — the arrival beat of Aaron's personal story. The replacement image must feel like Maui, like arrival, like this is where he belongs.

**⚠️ BLOCKED — requires Karin to confirm the replacement image.** Leading candidate from the unused asset inventory: `aaron-beach-1.jpg` (Aaron standing on the wide Maui beach with palm trees — strong sense of place and arrival). Do not implement until Karin confirms.

---

## Task 9 — CinematicEntry: Make aaron-onlyMe.jpg More Visible
**Files:** `src/components/CinematicEntry/CinematicEntry.css`, `src/components/CinematicEntry/CinematicEntry.tsx`

**Problem:** The `aaron-onlyMe.jpg` image in CinematicEntry is currently capped at `opacity: 0.30` at peak visibility, behind a radial mask that fades it to transparent at the edges. Karin wants the image more present — it should read as atmospheric depth, not an invisible texture.

**Current behavior (from CinematicEntry.tsx):**
```js
const imgOp = progress < 0.14
  ? (progress / 0.14) * 0.30
  : progress > 0.86
    ? Math.max(0, 1 - (progress - 0.86) / 0.14) * 0.30
    : 0.30
```
Peak opacity is `0.30`.

**Current CSS mask:**
```css
mask-image: radial-gradient(ellipse 75% 70% at 50% 50%, rgba(0,0,0,0.6) 0%, transparent 100%);
```
The mask's alpha is `0.6`, meaning even at the center the image is at 60% of its opacity value.

**Fix:** Increase the peak opacity and/or relax the mask to make the image more present. Start by raising peak opacity to `0.45–0.55` and the mask center alpha to `0.75–0.85`. Tune visually — the text "A quiet hour. / A real Maui memory." must remain fully legible over the image at all viewport widths. The image should feel like it belongs to the scene, not like it's barely there.

Also update the reduced-motion fallback in CinematicEntry.tsx (currently sets `imageRef.current.style.opacity = '0.18'`) to match the new peak value.

**Validate:** The two text lines must remain clearly legible at all contrast levels. The image must feel atmospheric and present without competing with the text.

---

## Validation Checklist (Run After All Tasks)

- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] Beach video plays in fresh incognito Chrome session (Task 1)
- [ ] Weekly editorial dwell moment exists — full section visible simultaneously (Task 3)
- [ ] Aaron fully visible in Weekly right panel photo, no cropping (Task 4)
- [ ] Weekly scene image is aaron-weekly-2.jpg, dark-filtered, integrated (Task 5)
- [ ] About Aaron: all four chapters navigate without black flash on throttled connection (Task 7)
- [ ] CinematicEntry image is more present, text remains legible (Task 9)
- [ ] No horizontal overflow at 390px and 1440px
- [ ] Reduced-motion pass: all content visible, no motion dependencies
- [ ] Console clean: no errors during scroll or interaction

---

## Blocked — Awaiting Karin Input

**Task 2 (copy):** Propose em-dash rewrite phrasing for Karin's approval before implementing.
**Task 6 (copy):** Propose Weekly CTA/marketing copy changes for Karin's approval before implementing.
**Task 8 (image):** Confirm Chapter 4 replacement image with Karin before implementing. Leading candidate: `aaron-beach-1.jpg`.
