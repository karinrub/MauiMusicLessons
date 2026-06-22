# MauiMusicLessons — Next Audit Instructions
## Full Quality Audit · Mobile-First · 100/100 Target

**Version:** June 2026  
**Prepared for:** Claude (claude.ai) and GPT-4o  
**Audit type:** Deep quality, cinematic polish, and mobile experience audit  
**Goal:** Identify every gap between the current site and a 100/100 score across all rated dimensions  
**Output expected:** Structured findings per section, per device, per dimension — scored, actionable, prioritized

---

## CRITICAL INSTRUCTIONS — EXECUTE BEFORE READING ANYTHING ELSE

**Do not begin writing until you have finished reading this entire document.**

**Output format:** Return the audit in exactly this order: Executive Summary → Part 1 (Mobile) → Part 2 (Transitions) → Part 3 (Visual Cohesion) → Part 4 (Conversion) → Part 5 (Detail Pass) → Part 6 (WCAG) → Part 7 (Dependencies) → Part 8 (Scorecard) → Part 9 (Fix List) → Part 10 (Final Verdict). Do not reorder, skip, or merge sections.

**Minimum length:** This audit must be no shorter than 4,000 words. Each Part must be at least 250 words. If you find yourself summarizing, expand. If you find yourself using bullet points where prose is warranted, switch to prose. A short audit of this site is an incorrect audit.

**Diplomatic writing is wrong here.** Do not hedge. Do not say "it might be worth considering" or "one could argue." Every finding must be stated as a verdict: name the element, name the failure, describe what correct looks like. If something is excellent, say it is excellent and say why. If something is failing, say it is failing and say why. Balanced, non-committal writing is a failure mode for this document.

**How to observe:** If you have live browser access, navigate to `https://karinrub.github.io/MauiMusicLessons/` and observe each section directly before writing about it. Scroll slowly. Do not write from memory. If you do not have browser access, state clearly at the top of each section: "Assessed from provided context, not live observation" — and reason carefully from the context provided in this document. Do not fabricate observations.

**Your role:** You are a senior creative director. Motion design and conversion strategy are lenses you apply — but your primary judgment is experiential and editorial. You have set the standard for premium hospitality brands, boutique travel sites, and high-end lifestyle experiences. You hold this site to the same bar as a Maui resort, a Michelin-starred restaurant, or a luxury retreat booking page. The site's own ambition sets the floor. Your job is to find every gap between that ambition and its current execution.

**What this audit is not:** A QA pass. Everything mostly works. This audit is about quality, feeling, and the 1% details that separate 90/100 from 100/100. If something is technically functional but experientially flat, that is a finding.

---

## SITE CONTEXT AND STANDARDS

### The site's stated identity
Cinematic. Premium. Maui-specific. Emotionally precise. Not for everyone — for people who want a memory, not a transaction.

### The creative non-negotiables (do not audit these as problems)
- The dark cinematic palette throughout
- The hero as a film opening
- The three-line interstitial ("No experience. No pressure. Just you, the ocean, and a song.")
- The "And if you live here — the music can stay." audience pivot
- The four-chapter About Aaron narrative structure
- The conversational multi-step booking flow
- The pull quote ("You don't need talent. You need curiosity and a little consistency.")
- The SectionHandoff system connecting every major section boundary

### What has already been implemented (do not flag these as missing unless you verify they are still broken)
- Dead zones eliminated (zero segments > 25vh confirmed in Phase 5)
- All six SectionHandoff variants placed at every major section boundary
- Section exit choreography on Beach, Weekly, and About via scroll-mapped opacity
- CinematicPanel line stagger (sequential, not simultaneous)
- Beach/Weekly conversion rows (price, location, outcome visible before booking)
- Booking inquiry status, response time, and payment method all explicit
- WCAG 2.1 AA: skip link, focus rings, video pause control, autocomplete all implemented
- Mobile screenshots verified at 360px, 390px, 768px

### What has NOT been verified at the level this audit requires
- Mobile cinematic quality (not just "does it work" — does it feel cinematic?)
- SectionHandoff visual distinctiveness on mobile
- Transition quality at the premium level (the engineering pass confirmed existence; this audit evaluates quality)
- The 1% detail pass: typography wrapping, button states, iOS-specific behavior, font loading, scroll behavior on Safari

---

## PART 1 — MOBILE-FIRST AUDIT

**Why mobile-first:** The previous audit cycle's weakest coverage was mobile. Screenshots were taken but never evaluated for cinematic quality. Mobile is where the experience is most likely to degrade — not because it breaks, but because the premium feeling collapses on a smaller screen when spacing is tight, type wraps awkwardly, or cinematic elements reduce to generic dark blocks.

**Devices to evaluate:** iPhone 14 / iPhone 15 standard (390×844), iPhone SE (375×667), any Android at 360px wide. Evaluate in portrait orientation. Landscape is secondary.

**Browser:** Safari on iOS is primary. Chrome Mobile is secondary. They render differently — particularly scroll behavior, font rendering, and video autoplay.

### 1.1 Hero — Mobile

Observe the hero at 390px width on iOS Safari. For each element below, state a verdict and the reason for it.

- **First viewport completeness:** State whether the headline, subhead, both CTAs, and the location stamp are all visible without scrolling. If any element is pushed below the fold, name it.
- **Image crop:** State whether the hero image crop preserves Aaron and the palm trees at narrow width, or cuts the subject awkwardly. Describe what you see.
- **Type size:** State whether the headline feels cinematic and large on mobile, or whether it shrinks to the scale of a normal heading. Be specific about the visual weight.
- **CTA sizing:** State whether both CTA buttons meet minimum 44px tap target height. State whether they stack or sit side by side. State whether the layout feels intentional.
- **Load-in animation:** State whether the staggered entry animation fires on iOS Safari. State whether it feels smooth or stutters. State whether the hero feels like a film opening or like a webpage loading.
- **Parallax:** State whether the hero parallax scroll works on iOS or whether the image snaps. Note: iOS throttles scroll events differently than desktop — this is a known failure point.
- **Veil behavior:** State whether the dark gradient veil deepens naturally as you scroll or whether it jumps.
- **Section verdict:** State whether the mobile hero delivers the same premium opening as desktop. If there is a gap, name it precisely.

### 1.2 CinematicPanel 1 — Mobile ("No experience. / No pressure. / Just you, the ocean, and a song.")

- **Stagger timing:** State whether the three lines appear at clearly distinct scroll positions, or whether the stagger feels compressed on a shorter mobile viewport. If the lines feel simultaneous, say so.
- **Text size:** State whether the display type is large enough to feel cinematic on mobile, or whether it reduces to body-copy scale.
- **Background image crop:** State whether the background image crops in a way that preserves atmosphere at narrow width. If there is no background image and the section is full black, state that.
- **Scroll budget:** State whether the panel occupies enough vertical scroll to feel like a deliberate pause, or whether a fast thumb scroll bypasses it too quickly.
- **Reduced motion:** State whether all three lines are immediately visible with iOS "Reduce Motion" enabled, and whether the section communicates its intent without scroll dependency.

### 1.3 Beach Lessons — Mobile

This is the most complex section on mobile. It has a split layout, a background video with controls, a conversion row, a CTA, and exit choreography. Evaluate each element separately.

- **Title card:** State whether "FOR VISITORS TO MAUI — Ukulele by the Beach" reads cleanly on mobile and whether the background photo crops correctly at narrow width.
- **Split layout collapse:** The desktop split (text left, photo right) collapses to stacked on mobile. State the stacking order and whether it feels designed. State whether the photo takes the right proportion of vertical space or dominates/disappears.
- **Editorial text:** State whether "Where the lesson finds its own rhythm" is legible at display size on mobile. Identify any lines that wrap at semantically wrong points or produce orphaned single words.
- **Video section:** State whether the background video autoplays on iOS. Note: iOS requires both `playsinline` and `muted` attributes — if either is missing, the video will not autoplay on iPhone. State whether the video crops acceptably at narrow width.
- **Video controls (mute + pause):** State whether both buttons are visible, whether they overlap any content, and whether the tap targets are large enough for reliable thumb interaction.
- **Conversion row (price · location · outcome):** State whether "From $35 · 30 min | $60 · 1 hr" is visible before the CTA. State whether "Mai Poina Beach Park, Kihei" is readable. State whether "Most students play a complete song by the end" appears before the user scrolls past the CTA.
- **Exit choreography:** State whether the Beach Lessons section fades out with intention as you scroll past it, or whether it cuts abruptly.
- **SectionHandoff after Beach Lessons:** Describe what the handoff to Weekly Lessons looks like on mobile. State whether the ghosted photo appears, whether the transition height is appropriate, or whether it adds unnecessary scroll space on a short viewport.

### 1.4 Weekly Lessons — Mobile

- **Title card:** State whether "FOR LOCALS & LONG-TERM RESIDENTS — Weekly Lessons" stacks cleanly on mobile. Identify any wrapping issues.
- **"And if you live here" line:** This is the most important single line in the section. State whether it appears with enough visual space to land with weight on mobile, or whether it is compressed into a small text element.
- **Split layout collapse:** Apply the same evaluation as Beach Lessons. State the stacking order and whether it feels intentional.
- **Pull quote + photo:** State whether the full-bleed photo crops correctly on mobile and whether the student/instructor context is preserved. State whether the quote text is legible over the photo at 390px. State whether the quote card proportions feel correct or oversized/undersized at narrow width.
- **Conversion row:** State whether "$60 · 1 hr | weekly cadence" is visible before the CTA.
- **CTA:** State whether "LET'S FIND A TIME" meets minimum 44px tap target height and reads correctly at mobile scale.

### 1.5 SectionHandoff Variants — Mobile (Critical Gap)

This is the highest-priority section of the mobile audit. The SectionHandoff component has six variants — visitor, audience, chapter, practical, conversion, closing — and this is where premium desktop transitions most commonly degrade into generic dark gradients on mobile. Evaluate each variant individually.

For each variant, report all five of the following:
- **Height:** State whether the handoff height is appropriate for mobile scroll, or whether it adds unnecessary dead scroll on a short viewport.
- **Ghosted photo:** State whether the ghosted/faded photo appears at the correct opacity on mobile and whether the narrow crop preserves the intended image.
- **Gradient:** State whether the gradient reads as a purposeful tonal bridge or as a generic dark separator indistinguishable from the sections around it.
- **Visual distinctiveness:** State whether this variant is visually distinguishable from the other five variants on mobile. If it has collapsed into the same dark gradient as its neighbors, say so.
- **Glow position:** State whether the glow/light source reads correctly at narrow width, or whether the narrow crop has eliminated it.

End each variant with one of these four verdicts: **Working as intended / Degraded on mobile / Generic on mobile / Needs redesign for mobile.** Do not use any other verdict wording.

### 1.6 About Aaron — Mobile

- **Chapter navigation rail:** State whether the timeline (EARLY / EXPLORATION / FOCUS / MAUI) is visible on mobile, whether the labels are readable, and whether the tap targets are large enough for reliable navigation.
- **Prev/next buttons:** State whether they are sized and positioned for comfortable thumb navigation on a phone.
- **Hint animation:** State whether the chapter hint pulse animation fires on mobile and whether it is noticeable at 390px or disappears at small scale.
- **Chapter backgrounds:** Navigate all four chapters. For each chapter, state whether the photo background crops correctly on mobile and whether text is legible over it.
- **Chapter content:** State whether the text is sized and spaced correctly for mobile reading. Identify any overflow or clipping.
- **Chapter transitions:** State whether the chapter-to-chapter transition feels smooth on iOS or whether there is visible jank or a flash between chapters.

### 1.7 CinematicEntry ("A quiet hour. / A real Maui memory.") — Mobile

- State whether both lines appear at clearly distinct scroll positions on mobile.
- State whether the text size and weight feel cinematic on a small screen, or whether the lines shrink to ordinary reading scale.
- State whether the background image crops in a way that preserves atmosphere on narrow screens.

### 1.8 SEO / FAQ Section — Mobile

- **Info cards:** State whether the cards ("Lesson Types", "Where Lessons Happen") stack cleanly at mobile width and whether the left-border accent treatment is visible at that scale.
- **Editorial paragraphs:** State whether the editorial paragraphs read at a comfortable line length on mobile. Identify any orphaned words.
- **FAQ:** State whether the two-column grid collapses to single-column on mobile. State whether the accordion is touch-friendly. State whether expanded answers display fully without overflow or clipping.
- **Conversion line:** State whether "Most first-time students leave playing a complete song." is prominent enough on mobile to serve its purpose.

### 1.9 Booking Flow — Mobile (All Paths)

Walk all four group-size paths on mobile. This is a quality audit, not a functional check. Every step must be assessed for visual quality, not just whether it advances.

- **Step 1 (Who's joining):** State whether the four tiles fit cleanly at 390px. State whether they stack 2×2 or 1×4. State whether the layout feels designed.
- **Step 2 (Instrument):** State whether Guitar / Ukulele tiles are proportioned correctly on mobile.
- **Step 3 (Duration):** State whether the duration tiles fit. State whether the price appears at the correct step.
- **Step 4 (Date):** State whether the date chips are sized for reliable touch. State whether the date selection works on mobile.
- **Step 5 (Contact):** State whether the keyboard push hides the CTA or the form context. State whether autocomplete activates on mobile inputs.
- **Step 6 (Confirm):** State whether the booking summary is readable on mobile.
- **Step 7 (Sent):** State whether the inquiry status ("This is a lesson request, not a confirmed booking"), response time, and payment method are all visible without scrolling on mobile.
- **Back navigation:** State whether tapping Back is responsive or whether there is a visible delay or flash before the prior step appears.
- **Booking card proportions:** State whether the floating card feels correctly proportioned relative to the background photo on mobile, or whether it feels oversized, undersized, or disconnected from the background.

### 1.10 Footer — Mobile

- State whether the footer feels like a deliberate close to the experience on mobile, or whether it just appears as a small text block at the bottom of the page.
- State whether all five nav links are correctly sized for touch.
- State whether the email link is a tappable `mailto:` link.
- State whether the brand name is readable and correctly scaled.
- State whether the entry reveal animation fires on mobile.

---

## PART 2 — DESKTOP TRANSITION QUALITY AUDIT

The previous audit cycle confirmed that transitions exist and are technically functional. This audit evaluates whether they feel authored at a premium level.

For each transition, answer: **Does this feel like a creative direction decision, or does it feel like a default?**

### 2.1 Transition Evaluation Framework

For each of the 14 major transitions on the page, report:
1. **Name:** What is transitioning to what
2. **Mechanism:** What visual event is happening (gradient, ghosted photo, glow, exit fade, entry fade)
3. **Purpose:** What is the tonal/emotional intent (orientation, pivot, relief, conversion approach, chapter turn, closing)
4. **Quality verdict:** Is the intent legible to a first-time visitor? Does the execution match the intent?
5. **Mobile verdict:** Does the same transition degrade on mobile?
6. **Score:** 1–10 for premium feel

### 2.2 The 14 Transitions to Evaluate

1. Hero → CinematicPanel 1 (visitor handoff)
2. CinematicPanel 1 → Beach Lessons title card (Beach entry)
3. Beach Lessons title card → Beach editorial scrolljack (section deepening)
4. Beach editorial scrolljack → SectionHandoff audience (Beach exit / Weekly approach)
5. SectionHandoff audience → Weekly Lessons title card (audience pivot)
6. Weekly Lessons title card → Weekly editorial / pull quote (section deepening)
7. Weekly Lessons → SectionHandoff chapter (Weekly exit / About approach)
8. SectionHandoff chapter → About Aaron (chapter entry)
9. About Aaron → CinematicEntry (emotional bridge)
10. CinematicEntry → SectionHandoff practical (SEO approach)
11. SectionHandoff practical → SEO / FAQ (information landing)
12. SEO / FAQ → SectionHandoff conversion (Booking approach)
13. SectionHandoff conversion → Booking flow (conversion entry)
14. Booking flow → SectionHandoff closing → Footer (closing frame)

### 2.3 Specific Quality Directives Per Transition

**Hero → CinematicPanel 1:**
Scroll slowly through the hero exit and into the cinematic panel. State whether the hero's gradient fully dissolves into the panel's background, or whether there is a visible seam where the two sections meet as distinct layers. Name the failure if one exists.

**Cinematic lines stagger:**
Scroll into the CinematicPanel section and pause halfway through. At that pause point, state exactly how many of the three lines ("No experience." / "No pressure." / "Just you, the ocean, and a song.") are visible. The correct answer is 1 or 2 — if all three are visible simultaneously, the stagger is not working. State your finding.

**Beach Lessons exit:**
Scroll past the Beach section CTA into the SectionHandoff. State whether the Beach content fades out with choreographed intention or cuts off abruptly. Describe what the transition looks like.

**"And if you live here" delivery:**
Describe the visitor's scroll experience in the 2–3 seconds between the Beach exit and the appearance of "And if you live here — the music can stay." State whether the SectionHandoff sets that line up emotionally, or whether the pivot arrives cold.

**About → CinematicEntry:**
State whether the About Aaron section has a designed exit or simply stops. State whether CinematicEntry ("A quiet hour. / A real Maui memory.") feels like it emerged naturally from About, or whether it arrives as a disconnected element.

**CinematicEntry → SEO:**
This is the hardest tonal transition on the page. Scroll slowly from CinematicEntry through the SectionHandoff "practical" variant into the SEO section. State whether the transition feels like a designed gear-shift into useful information, or whether the SEO section still arrives as a cold-water moment. Be specific about what you observe in the handoff itself.

**Booking → Footer:**
After the booking sent state, scroll to the footer. State whether the closing SectionHandoff and footer arrival feel like a cinematic ending — a designed closing frame — or whether the page simply runs out. This is a binary verdict: it either closes like a film or it doesn't.

---

## PART 3 — VISUAL COHESION AND PHOTOGRAPHY AUDIT

### 3.1 The Single Coherent Visual World Test

Look at the following moments side by side in your memory (or by taking screenshots and comparing): hero image, CinematicPanel background, Beach right-panel photo (`aaron-tourists-1.jpg`), Beach video, Weekly pull quote photo (`aaron-teaching-1.jpg`), About chapter backgrounds (all four), booking background (`aaron-bookingForm.jpg`).

Ask: do all of these images feel like they exist in the same visual universe? Same color temperature range? Same darkness/atmosphere level? Same sense of Maui?

Report which images feel most cohesive and which feel most out-of-place, and why.

### 3.2 Per-Image Evaluation

**Hero image:** Is the film grain overlay working correctly over the hero image on mobile? Does it contribute to the cinematic feel or look like a low-resolution artifact on small screens?

**CinematicPanel 1 background:** Does the image behind "No experience." / "No pressure." / "Just you, the ocean, and a song." read as the same Maui world as the hero? Is text legible at all scroll positions?

**Beach right-panel image (`aaron-tourists-1.jpg`):** The filter `brightness(0.58) saturate(0.56) contrast(0.9) sepia(0.12) hue-rotate(-8deg)` was implemented to integrate this image. Does it look cinematic and integrated, or does it still read as a brighter documentary photo that was darkened? On mobile, where the image is seen at narrower crop, does the filter still hold?

**Beach video:** Does the video's visual tone match the surrounding dark system? Is the mute button visible and correctly styled against the video background?

**Weekly Lessons pull quote image (`aaron-teaching-1.jpg`):** Is the filter `brightness(0.82) saturate(0.85)` creating appropriate visual integration? The intent was a slightly lighter treatment to match the warmer weekly section mood. Does that read correctly on both desktop and mobile?

**About Aaron chapter backgrounds (all four chapters):** Navigate through all four chapters. Do the backgrounds feel consistent in value and tone across the chapter progression? Does each chapter's background support the text legibility? On mobile, do the crops work for each chapter?

**Booking background (`aaron-bookingForm.jpg`):** The filter `brightness(0.55) saturate(0.7) contrast(1.05)` was applied. Does the booking card float over this image correctly, or does the card boundary feel harsh against the background? On mobile, does the background image still read as atmospheric, or does it disappear into near-black?

### 3.3 Overlay System Consistency

Do all major section overlays (hero gradient, CinematicPanel overlay, SectionHandoff gradients, booking card backdrop) feel like they belong to the same design system? Or do some feel darker, some lighter, some warmer, some cooler in a way that reads as accidental rather than designed?

### 3.4 Typography Visual Consistency

Audit these typographic elements visually:
- Do all display/serif headlines feel like they're using the same typeface at the same design weight across sections?
- Does the eyebrow small-caps system (FOR VISITORS TO MAUI / FOR LOCALS & LONG-TERM RESIDENTS / ABOUT AARON / MAUI MUSIC LESSONS / READY WHEN YOU ARE) feel consistent?
- On mobile, does the scale relationship between eyebrow / headline / subhead feel proportionally correct, or does mobile scaling compress the hierarchy?
- Are there any lines of text that break at semantically wrong points? (e.g., "the music can" on one line and "stay." orphaned on the next)

---

## PART 4 — CONVERSION COMPLETENESS AUDIT

This part has two distinct modes. Execute them separately. Do not blend them.

### 4.1 Tourist Journey — Narrative Mode

You are a first-time tourist who found this site by searching "ukulele lessons Maui." You have never heard of Aaron Grzanich. You are slightly skeptical — this looks beautiful, but you want to know it is real before you book anything.

Walk the site from hero to footer as this person. At each section listed below, write two to four sentences stating exactly what this visitor now knows, feels, and wants to do next. Be specific. Do not write what the site intends to communicate — write what actually lands for a skeptical tourist encountering it for the first time.

**Hero:** What does this person know and feel after the first viewport? Do they know what this is, or is the ambiance so atmospheric it could be anything?

**CinematicPanel 1 ("No experience. No pressure."):** Has their hesitation been addressed? Does this land as reassurance or as decorative copy?

**Beach Lessons (full section):** Do they now know the price, location, and outcome before they see the CTA? Or are those facts buried below it?

**About Aaron (Chapter 1 only — most visitors won't click through):** After seeing only Chapter 1, does this person trust Aaron enough to book? What is the single fact they carry forward?

**CinematicEntry ("A quiet hour. A real Maui memory."):** Does this line still speak to the tourist at this late point in the journey, or has it become detached from their specific desire?

**FAQ:** Has the FAQ removed their final hesitations? Name the specific hesitation it addressed most effectively and any hesitation it failed to address.

**Booking — sent state:** Does this person feel like they accomplished something, or like they filled out a contact form into the void? State whether the sent state builds or loses confidence.

### 4.2 Local Weekly Student Journey — Narrative Mode

You are a Kihei local considering weekly lessons. You're not a tourist seeking a memory — you want a teacher you can commit to for months.

Walk the same journey. At each section, state what this person knows, feels, and decides. Pay particular attention to:
- The exact moment "And if you live here — the music can stay." first acknowledges them
- Whether Weekly Lessons gives them enough concrete information (price, cadence, teaching approach) to make a real decision
- Whether the booking flow feels appropriate for a recurring relationship or only for a tourist one-off

### 4.3 Conversion Gap Analysis — Binary Checklist

This is separate from the narrative above. For each item, state exactly one of: **Present / Absent / Unclear.** Then write one sentence explaining your verdict. Do not use any other status words.

| Conversion Element | Status | One-Sentence Verdict |
|---|---|---|
| Price visible before booking form | | |
| Location visible before booking form | | |
| Outcome claim visible before booking form | | |
| Inquiry vs. confirmed booking distinction | | |
| Response time expectation | | |
| Payment method | | |
| Fast contact alternative (phone/text) | ABSENT — dependency-blocked | No phone or text number confirmed by Aaron |
| Social proof (testimonial / review) | ABSENT — dependency-blocked | No real testimonials or review links provided |
| Aaron's credentials / reason to trust | | |
| What happens after you submit | | |

---

## PART 5 — DETAIL PASS

This is where 90/100 becomes 100/100. Every item here is small. Cumulatively they define whether the site reads as finished or as almost finished.

### 5.1 Typography Details

For every major text block on the page:

- **Orphans and widows:** Are there single words isolated on their own line? ("You don't need talent. You need curiosity and a" / "little consistency." — does this break well or awkwardly?)
- **Line break semantics:** Do lines break at natural phrase boundaries, or do they break mid-phrase in a way that changes the rhythm of the copy?
- **Mobile type wrapping:** At 390px, do any headings wrap in a way that destroys the visual hierarchy (e.g., a three-word headline becoming one word per line)?
- **Letter-spacing consistency:** Do all small-caps eyebrow labels use the same letter-spacing value?
- **Serif vs. sans consistency:** Is every UI element (buttons, labels, form inputs) using the intended typeface, or are there any browser-default fallbacks appearing?

### 5.2 Interactive States

For every interactive element:

**Buttons (all CTAs):**
- Hover state: does it feel premium (subtle shift) or aggressive (large color flash)?
- Active/pressed state: is there a down-state visual response?
- Focus state: is the focus ring visible and styled to match the system (not a default browser blue outline)?
- Disabled state: if any button can be disabled, does it look intentional?

**Nav links:**
- Hover state: present and premium?
- Active/current section state: does the nav visually indicate which section is in view?
- Focus ring: visible, styled correctly?

**Booking tiles (Just me / Two of us / etc.):**
- Hover state: does the tile respond before clicking?
- Selected state: is the selected tile visually distinct and clearly selected?
- Focus ring: keyboard-navigable with visible focus?

**Date chips:**
- Hover: subtle shift?
- Selected: clearly distinguished from unselected?
- Disabled (unavailable dates): visually distinct?

**FAQ accordion items:**
- Hover: subtle background or text shift?
- Open/active state: is the open item visually distinct from closed items?
- Focus: keyboard-navigable with visible focus ring?

**About Aaron chapter buttons:**
- Hover: responds?
- Active/current chapter: clearly indicated?
- Focus: keyboard-navigable?

### 5.3 iOS Safari Specific

These are failure modes specific to Safari on iOS that would not appear in Chrome:

- **`scroll-behavior: smooth` on direct nav links:** On iOS Safari, smooth scroll on `<a href="#section">` links can cause unexpected jumps or ignored behavior. Tap each nav link (Beach Lessons / Weekly Lessons / About / Book a Lesson) on mobile and verify they scroll to the correct section without skipping, overshooting, or ignoring the tap.
- **Video autoplay on iOS:** The Beach Lessons background video requires `autoplay muted playsinline` to autoplay on iOS. Without `playsinline` the video does not autoplay on iPhone. Verify the video starts on page load on iPhone Safari without user interaction.
- **`position: sticky` behavior:** The CinematicPanel uses a sticky/pinned scroll region. iOS handles sticky positioning slightly differently than desktop Chrome. Verify the panel pins and unpins at the correct scroll positions on iPhone.
- **Input field zoom:** iOS Safari zooms in on form fields with `font-size` smaller than 16px. Verify the booking contact step inputs (name, email, phone) do not trigger an unexpected zoom on tap. If they do, the font-size needs to be at minimum 16px.
- **`vh` units on iOS:** iOS Safari calculates `100vh` as the full screen height including the browser chrome, which causes elements that should fill the viewport to extend behind the nav bar. Verify that full-viewport sections (hero, CinematicPanels, booking card background) do not have content cut off behind the Safari browser bar at the bottom.
- **Safe area insets:** On iPhone with a notch/dynamic island, check that no content or interactive elements are obscured by the hardware cutout or home indicator bar.

### 5.4 Font Loading

- Is there a visible FOUT (Flash Of Unstyled Text) on first load? Before the custom serif typeface loads, does the page briefly render in a system serif or sans-serif?
- Does the hero's headline appear in the correct typeface from the first visible frame, or does it swap mid-animation?
- Are the fonts preloaded via `<link rel="preload">`?

### 5.5 Performance Feel

These are not Lighthouse scores — they are felt experiences:

- **Time to first meaningful content:** On a mid-speed mobile connection (simulated 3G/4G), how long does the hero take to appear? Does the page feel fast or does it feel like it's loading?
- **Scroll smoothness:** During the Beach Lessons and CinematicPanel scroll-pinned sections, does the animation feel smooth (60fps) or does it stutter on mobile?
- **Video load:** Does the Beach Lessons video appear quickly or is there a blank placeholder while it loads?
- **Image rendering:** Do images appear sharp or do they appear blurry before loading (low-resolution placeholder → high-resolution swap)?

### 5.6 Reduced Motion (iOS Setting)

In iOS Settings → Accessibility → Motion → Reduce Motion, enable the system preference and reload the site. Verify:

- Does all content appear without scroll-trigger dependency? (No content hidden behind opacity:0 waiting for scroll events that may not fire)
- Does the CinematicPanel content appear fully without scrolling through the panel?
- Does the About Aaron section show its content without requiring chapter navigation?
- Does the booking flow still animate step transitions, or does it use the static all-steps form?
- Is anything broken, missing, or invisible in reduced-motion mode?

### 5.7 Dark Mode / System Theme

On iOS with Dark Mode enabled (Settings → Display & Brightness → Dark), reload the site:

- Do any colors invert unexpectedly? (The site is already dark, but some background colors defined in light values may flip incorrectly)
- Do any form input backgrounds turn white or light gray in dark mode (iOS default form styling)?
- Do any overlay colors become incorrect?

---

## PART 6 — WCAG PARTIAL FINDINGS (DEFERRED)

Three WCAG 2.1 AA findings remain deferred. This audit does not fix them, but must report their current status:

**1.4.3 — Contrast at variable scroll positions:**
Navbar links render at 75% opacity. Footer brand/nav text at ~68% opacity. Both appear over variable photo backgrounds that can include lighter areas (sky, sand, water). Report: what are the worst-case scroll positions where lighter image areas appear behind the navbar? Does the contrast feel legible at those positions?

**4.1.2 — Unlabeled landmark sections:**
`#hero`, `#about`, and `#book` may lack `aria-label`. This is a screen reader navigation issue. Note whether this is still unresolved.

**4.1.2 — Booking back button accessible name:**
The back button's accessible name may not reflect the current step context. Verify: does the back button label change per step, or does it always say "Back"?

---

## PART 7 — DEPENDENCY-BLOCKED SCORING IMPACT

These items cannot be fixed in code. Report them as explicit scoring ceilings.

### Social Proof
**Current state:** No testimonials, no external review links, no student count.  
**Score ceiling:** Conversion Readiness and Overall Conversion cannot reach 100/100 without real social proof.  
**What is needed:** 1–3 real student testimonials (written or quoted) OR a link to a verified external review source (Google Business, TripAdvisor, Yelp, or similar).  
**Estimated score impact when resolved:** +8–12 points on Conversion Readiness.

### Phone/Text Contact Path
**Current state:** Email only (`aaron@mauimusiclessons.com`). No phone, no text, no WhatsApp.  
**Score ceiling:** Footer Utility and Fast Contact dimensions are capped.  
**What is needed:** A confirmed phone number or text-friendly contact path Aaron is willing to publish.  
**Estimated score impact when resolved:** +5–8 points on Conversion Readiness, +10–15 points on Footer score.

### WebP / Responsive Srcset
**Current state:** All 13 images are JPEG, no WebP alternatives, no responsive srcset for mobile viewports. Total image payload ~4.4MB.  
**Score ceiling:** Performance score capped due to image payload.  
**What is needed:** Either `vite-plugin-image-optimizer` or a `cwebp` command-line conversion pass.  
**Estimated score impact when resolved:** +10–15 points on Performance score.

---

## PART 8 — SCORING

**Scoring rules:**
- Do not estimate from memory or general knowledge. Every score must be grounded in a specific observation you made during this audit.
- If you could not directly observe something (no browser access, or a section you could not navigate), write "Unverified" in the Current Estimate column and state what prevented verification.
- Do not round all scores to multiples of 5. If you observed a specific improvement, the score should reflect it precisely.
- The Primary Blocker must be one specific, named thing — not a category. "Mobile transitions" is not specific. "SectionHandoff 'audience' variant collapses to generic gradient at 390px" is specific.

Fill every cell. Do not leave any cell blank.

| Dimension | Baseline | Current Estimate | Gap to 100 | Primary Blocker |
|---|---|---|---|---|
| Transition Quality | 44 | | | |
| Conversion Readiness | 52 | | | |
| Photography | 52 | | | |
| Art Direction | 55 | | | |
| Overall Visual Cohesion | 58 | | | |
| Motion Design | 65 | | | |
| Scroll Experience | 65 | | | |
| Storytelling | 74 | | | |
| Mobile Experience | 70 | | | |
| Interaction Design | 58 | | | |
| Perceived Polish | 74 | | | |
| Emotional Impact | 78 | | | |
| Atmosphere | 82 | | | |
| Originality | 80 | | | |
| Performance | 60 | | | |
| Accessibility | 70 | | | |
| Overall Experience | 73 | | | |

---

## PART 9 — PRIORITY FIX LIST

After completing all parts of the audit, produce a ranked list of the top 15 fixes that would move the overall score closest to 100/100.

For each fix:
- **Fix name:** One precise sentence describing what changes
- **Component / file:** Where the fix lives
- **Score dimension affected:** Which rated dimension this improves
- **Estimated score impact:** How many points this fix is worth
- **Effort estimate:** Low (CSS / single attribute change) / Medium (component logic) / High (architectural change)
- **Mobile impact:** Does this fix matter more on mobile than desktop?

Format as a table.

---

## PART 10 — FINAL VERDICT

Write 3–5 paragraphs. No headers. No numbered points. No bullet lists.

Your verdict must cover: where the site stands right now relative to 100/100, what the single most damaging remaining gap is, what the single strongest thing is that must never be touched, and what this site needs to become to be the best music lesson website in the world — not just the best one in Maui.

Write it in the site's own register. This site opened like a film — your verdict should read like the kind of critique that belongs in that register. Precise, unhurried, direct. No hedging. No business language. No "going forward" or "one could argue." Write the critique this site has earned.

---

## DELIVERY FORMAT

Return the audit in exactly this section order. Do not reorder, skip, or merge any section.

1. Executive Summary (3–5 paragraphs, no bullet lists)
2. Part 1 — Mobile Audit (one subsection per mobile element, in the order they appear on the page)
3. Part 2 — Desktop Transition Quality (all 14 transitions evaluated using the framework in 2.1)
4. Part 3 — Visual Cohesion and Photography
5. Part 4 — Conversion Completeness (4.1 narrative, 4.2 narrative, 4.3 table — in that order)
6. Part 5 — Detail Pass (all seven subsections: typography, interactive states, iOS Safari, font loading, performance feel, reduced motion, dark mode)
7. Part 6 — WCAG Deferred Status
8. Part 7 — Dependency-Blocked Ceilings
9. Part 8 — Scorecard (every cell filled, no blanks except "Unverified" where stated)
10. Part 9 — Priority Fix List (table format, exactly 15 rows)
11. Part 10 — Final Verdict (prose only, no headers or lists)

**If you run out of context or response length before completing all parts:** Do not stop mid-section. Complete the current section, then write: "AUDIT INCOMPLETE — stopped after Part [X]. Remaining parts: [list]." Do not silently truncate findings.

**Final rule:** Do not compress sections. Do not summarize findings into bullet lists when prose is warranted. If you observed something that surprised you — positive or negative — describe it in full. This audit is the direct input to the next implementation pass. Incomplete findings produce incomplete fixes.
