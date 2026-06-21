import fs from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseUrl = 'http://127.0.0.1:5173/MauiMusicLessons/'
const outDir = path.resolve('Audit Phase/execution-artifacts/phase1')

const sections = [
  ['hero', '#hero'],
  ['beach-lessons', '#beach-lessons'],
  ['weekly-lessons', '#weekly-lessons'],
  ['about', '#about'],
  ['maui-music-lessons', '#maui-music-lessons'],
  ['book', '#book'],
]

const viewports = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'desktop-1280', width: 1280, height: 900 },
  { name: 'tablet-1024', width: 1024, height: 768 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-360', width: 360, height: 740 },
  { name: 'short-landscape', width: 844, height: 390 },
]

function text(el) {
  return el?.textContent?.replace(/\s+/g, ' ').trim() ?? ''
}

async function waitForReady(page) {
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.waitForTimeout(900)
}

async function captureViewport(browser, viewport, reducedMotion = 'no-preference') {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    reducedMotion,
  })
  const page = await context.newPage()
  const consoleMessages = []
  const requestFailures = []
  const badResponses = []

  page.on('console', msg => {
    if (['error', 'warning'].includes(msg.type())) {
      consoleMessages.push(`${msg.type()}: ${msg.text()}`)
    }
  })
  page.on('requestfailed', request => {
    requestFailures.push(`${request.method()} ${request.url()} ${request.failure()?.errorText ?? ''}`)
  })
  page.on('response', response => {
    if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`)
  })

  await waitForReady(page)

  const metrics = await page.evaluate(() => {
    const interactive = [...document.querySelectorAll('a, button, input, textarea, [role="slider"]')]
    const clipped = interactive
      .map((el) => {
        const rect = el.getBoundingClientRect()
        const style = getComputedStyle(el)
        return {
          name: (el.getAttribute('aria-label') || el.textContent || el.getAttribute('placeholder') || '').replace(/\s+/g, ' ').trim(),
          tag: el.tagName.toLowerCase(),
          visible: style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0,
          rect,
          clipped: rect.left < -1 || rect.right > window.innerWidth + 1,
        }
      })
      .filter(item => item.visible && item.clipped)

    const sectionRects = [...document.querySelectorAll('section, .hero-scroll-container, .cinematic-panel, .section-handoff, .cinematic-entry')]
      .map((el) => ({
        id: el.id || '',
        className: el.className?.toString() || '',
        top: Math.round(el.getBoundingClientRect().top + window.scrollY),
        height: Math.round(el.getBoundingClientRect().height),
      }))

    return {
      url: location.href,
      title: document.title,
      scrollHeight: document.documentElement.scrollHeight,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      bodyScrollWidth: document.body.scrollWidth,
      docScrollWidth: document.documentElement.scrollWidth,
      horizontalOverflow: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) > window.innerWidth + 1,
      brokenImages: [...document.images]
        .filter(img => img.complete && img.naturalWidth === 0)
        .map(img => img.currentSrc || img.src),
      unlabeledControls: interactive
        .filter((el) => !((el.getAttribute('aria-label') || el.getAttribute('aria-valuetext') || el.textContent || el.getAttribute('placeholder') || '').trim()))
        .map(el => el.outerHTML.slice(0, 160)),
      clippedControls: clipped.map(item => ({
        name: item.name,
        tag: item.tag,
        left: Math.round(item.rect.left),
        right: Math.round(item.rect.right),
        width: Math.round(item.rect.width),
      })),
      sections: sectionRects,
      grainDisplay: getComputedStyle(document.querySelector('.grain')).display,
      heroCtaVisible: Boolean(document.querySelector('.hero__actions')),
    }
  })

  await page.screenshot({
    path: path.join(outDir, `${viewport.name}-${reducedMotion === 'reduce' ? 'reduced-' : ''}top.png`),
    fullPage: false,
  })

  for (const [name, selector] of sections) {
    await page.locator(selector).scrollIntoViewIfNeeded().catch(() => {})
    await page.waitForTimeout(180)
    await page.screenshot({
      path: path.join(outDir, `${viewport.name}-${reducedMotion === 'reduce' ? 'reduced-' : ''}${name}.png`),
      fullPage: false,
    })
  }

  await page.close()
  await context.close()
  return {
    name: viewport.name,
    reducedMotion,
    ...metrics,
    consoleMessages,
    requestFailures,
    badResponses,
  }
}

async function runInteractionPass(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()
  const consoleMessages = []
  page.on('console', msg => {
    if (['error', 'warning'].includes(msg.type())) consoleMessages.push(`${msg.type()}: ${msg.text()}`)
  })
  await waitForReady(page)

  const navResults = []
  for (const [name, selector] of sections.slice(1)) {
    await page.click(`button:has-text("${name === 'maui-music-lessons' ? 'Book Maui Music Lessons' : name === 'book' ? 'Book a Lesson' : name === 'about' ? 'About' : name === 'weekly-lessons' ? 'Weekly Lessons' : 'Beach Lessons'}")`).catch(async () => {
      await page.evaluate((id) => document.getElementById(id)?.scrollIntoView(), name)
    })
    await page.waitForTimeout(450)
    const data = await page.locator(selector).evaluate((el) => {
      const r = el.getBoundingClientRect()
      return { top: Math.round(r.top), bottom: Math.round(r.bottom) }
    })
    navResults.push({ name, ...data })
  }

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(800)
  await page.click('text=Book a beach lesson')
  await page.waitForTimeout(900)
  const beachContext = await page.locator('#book').evaluate(() => document.body.innerText.includes('Beach lesson — Kihei, Maui'))
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(800)
  await page.click("text=Let's find a time")
  await page.waitForTimeout(900)
  const weeklyContext = await page.locator('#book').evaluate(() => document.body.innerText.includes('Weekly lesson — Kihei, Maui'))

  const bookingPaths = []
  const groupButtons = [
    ['solo', 'Just me'],
    ['duo', 'Two of us'],
    ['group_small', 'Small group'],
    ['group_large', 'Larger group'],
  ]

  for (const [key, label] of groupButtons) {
    await page.goto(`${baseUrl}#book`, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(900)
    await page.getByRole('button', { name: new RegExp(label, 'i') }).click()
    await page.getByRole('button', { name: /Ukulele/i }).click()
    if (key === 'solo') {
      await page.getByRole('button', { name: /1 hour/i }).click()
    }
    await page.getByRole('button', { name: /Monday/i }).click()
    await page.getByRole('button', { name: /Morning/i }).click()
    await page.getByRole('button', { name: /Sounds good/i }).click()
    await page.getByLabel(/Your name/i).fill(`QA ${key}`)
    await page.getByLabel(/Email address/i).fill(`qa-${key}@example.com`)
    await page.getByRole('button', { name: /Send to Aaron/i }).click()
    await page.waitForTimeout(600)
    const sent = await page.locator('#book').evaluate(() => document.body.innerText.includes('This is a lesson request, not a confirmed booking'))
    bookingPaths.push({ key, sent })
  }

  await page.goto(`${baseUrl}#book`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(900)
  await page.getByRole('button', { name: /Just me/i }).click()
  await page.getByRole('button', { name: /Guitar/i }).click()
  await page.getByRole('button', { name: /30 minutes/i }).click()
  await page.getByRole('button', { name: /Tuesday/i }).click()
  await page.getByRole('button', { name: /Afternoon/i }).click()
  await page.getByRole('button', { name: /Sounds good/i }).click()
  await page.getByRole('button', { name: /Send to Aaron/i }).click()
  await page.waitForTimeout(250)
  const validationText = await page.locator('#book').evaluate(() => document.body.innerText)

  await page.goto(`${baseUrl}#about`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(900)
  await page.locator('[role="slider"]').focus()
  await page.keyboard.press('End')
  await page.waitForTimeout(500)
  const aboutEnd = await page.locator('#about').evaluate(() => document.body.innerText.includes('Maui'))
  await page.keyboard.press('Home')
  await page.waitForTimeout(500)
  const aboutHome = await page.locator('#about').evaluate(() => document.body.innerText.includes('Early Years'))

  await page.goto(`${baseUrl}#maui-music-lessons`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(900)
  const faq = page.locator('.seo-content__faq button').first()
  await faq.focus()
  await page.keyboard.press('Enter')
  await page.waitForTimeout(300)
  const faqExpanded = await faq.getAttribute('aria-expanded')

  const tabStops = []
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(900)
  for (let i = 0; i < 28; i += 1) {
    await page.keyboard.press('Tab')
    tabStops.push(await page.evaluate(() => {
      const el = document.activeElement
      return {
        tag: el?.tagName.toLowerCase(),
        text: (el?.getAttribute('aria-label') || el?.textContent || el?.getAttribute('placeholder') || '').replace(/\s+/g, ' ').trim().slice(0, 80),
        visibleOutline: el ? getComputedStyle(el).outlineStyle !== 'none' || getComputedStyle(el).boxShadow !== 'none' : false,
      }
    }))
  }

  await page.close()
  await context.close()

  return {
    navResults,
    beachContext,
    weeklyContext,
    bookingPaths,
    validationVisible: /name/i.test(validationText) && /email/i.test(validationText),
    aboutKeyboard: { end: aboutEnd, home: aboutHome },
    faqExpanded,
    tabStops,
    consoleMessages,
  }
}

async function runMobileMenuPass(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  await waitForReady(page)
  await page.getByRole('button', { name: /Toggle menu/i }).click()
  await page.waitForTimeout(250)
  const opened = await page.locator('.navbar__mobile-menu').isVisible()
  const linkCount = await page.locator('.navbar__mobile-menu button').count()
  await page.keyboard.press('Escape')
  await page.waitForTimeout(250)
  const remainsAfterEscape = await page.locator('.navbar__mobile-menu').isVisible().catch(() => false)
  await page.getByRole('button', { name: /Toggle menu/i }).click()
  await page.waitForTimeout(150)
  await page.getByRole('button', { name: /Book a Lesson/i }).last().click()
  await page.waitForTimeout(600)
  const closedAfterClick = await page.locator('.navbar__mobile-menu').isVisible().catch(() => false)
  const bookTop = await page.locator('#book').evaluate(el => Math.round(el.getBoundingClientRect().top))
  await page.close()
  await context.close()
  return { opened, linkCount, remainsAfterEscape, closedAfterClick, bookTop }
}

await fs.mkdir(outDir, { recursive: true })

const browser = await chromium.launch({ headless: true })
try {
  const viewportResults = []
  for (const viewport of viewports) {
    viewportResults.push(await captureViewport(browser, viewport))
  }
  viewportResults.push(await captureViewport(browser, { name: 'reduced-desktop-1440', width: 1440, height: 900 }, 'reduce'))
  viewportResults.push(await captureViewport(browser, { name: 'reduced-mobile-390', width: 390, height: 844 }, 'reduce'))

  const interactionResults = await runInteractionPass(browser)
  const mobileMenu = await runMobileMenuPass(browser)

  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    viewportResults,
    interactionResults,
    mobileMenu,
  }

  await fs.writeFile(path.join(outDir, 'phase1-browser-qa.json'), JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))
} finally {
  await browser.close()
}
