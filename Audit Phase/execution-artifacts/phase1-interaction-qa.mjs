import fs from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'

const baseUrl = 'http://127.0.0.1:5173/MauiMusicLessons/'
const outDir = path.resolve('Audit Phase/execution-artifacts/phase1')

async function ready(page) {
  page.setDefaultTimeout(5000)
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(800)
}

async function clickName(page, name) {
  const matcher = typeof name === 'string' ? new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i') : name
  await page.locator('#book').getByRole('button', { name: matcher }).first().click()
  await page.waitForTimeout(350)
}

async function scrollToBook(page) {
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(600)
  await page.locator('#book').scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
}

async function bookingPath(page, groupName, needsDuration = false) {
  await scrollToBook(page)
  await clickName(page, groupName)
  await clickName(page, 'Ukulele')
  if (needsDuration) await clickName(page, '1 hour')
  await clickName(page, 'Mon')
  await clickName(page, 'Morning')
  await page.locator('#book').getByRole('button', { name: /Sounds good/i }).click()
  await page.waitForTimeout(300)
  await page.locator('#book').getByLabel(/Your name/i).fill(`QA ${String(groupName)}`)
  await page.locator('#book').getByLabel(/Email address/i).fill('qa@example.com')
  await page.locator('#book').getByRole('button', { name: /Send lesson request/i }).click()
  await page.waitForTimeout(650)
  return await page.locator('#book').evaluate(() => ({
    sent: document.body.innerText.includes('This is a lesson request, not a confirmed booking'),
    venmo: document.body.innerText.includes('cash or Venmo'),
  }))
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await context.newPage()
const consoleMessages = []
page.on('console', msg => {
  if (['error', 'warning'].includes(msg.type())) consoleMessages.push(`${msg.type()}: ${msg.text()}`)
})

const results = { consoleMessages, errors: [] }

try {
  await ready(page)

  results.beachContext = await (async () => {
    await page.getByRole('button', { name: /Book a beach lesson/i }).click()
    await page.waitForFunction(() => Math.abs(document.getElementById('book')?.getBoundingClientRect().top ?? 9999) < 700, null, { timeout: 8000 }).catch(() => {})
    await page.waitForTimeout(800)
    return page.locator('#book').evaluate(() => document.body.innerText.includes('BEACH LESSON — KIHEI, MAUI'))
  })()

  await ready(page)
  results.weeklyContext = await (async () => {
    await page.getByRole('button', { name: /Let's find a time/i }).click()
    await page.waitForFunction(() => Math.abs(document.getElementById('book')?.getBoundingClientRect().top ?? 9999) < 700, null, { timeout: 8000 }).catch(() => {})
    await page.waitForTimeout(800)
    return page.locator('#book').evaluate(() => document.body.innerText.includes('WEEKLY LESSON — KIHEI, MAUI'))
  })()

  results.bookingPaths = []
  for (const [groupName, needsDuration] of [
    ['Just me', true],
    ['Two of us', false],
    ['Small group', false],
    ['Larger group', false],
  ]) {
    try {
      results.bookingPaths.push({ groupName, ...(await bookingPath(page, groupName, needsDuration)) })
    } catch (error) {
      results.bookingPaths.push({ groupName, error: error.message })
    }
  }

  await scrollToBook(page)
  await clickName(page, 'Just me')
  await clickName(page, 'Guitar')
  await clickName(page, '30 minutes')
  await clickName(page, 'Tue')
  await clickName(page, 'Afternoon')
  await page.locator('#book').getByRole('button', { name: /Sounds good/i }).click()
  await page.waitForTimeout(300)
  await page.locator('#book').getByRole('button', { name: /Send lesson request/i }).click()
  await page.waitForTimeout(300)
  results.validationText = await page.locator('#book').evaluate(() => document.body.innerText)

  await page.goto(`${baseUrl}#about`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(800)
  await page.locator('[role="slider"]').focus()
  await page.keyboard.press('End')
  await page.waitForTimeout(500)
  results.aboutEndText = await page.locator('#about').evaluate(el => el.textContent)
  await page.keyboard.press('Home')
  await page.waitForTimeout(500)
  results.aboutHomeText = await page.locator('#about').evaluate(el => el.textContent)

  await page.goto(`${baseUrl}#maui-music-lessons`, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(800)
  const faq = page.locator('.seo-content__faq-trigger').first()
  await faq.focus()
  await page.keyboard.press('Enter')
  await page.waitForTimeout(350)
  results.faqExpanded = await faq.getAttribute('aria-expanded')

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(800)
  results.tabStops = []
  for (let i = 0; i < 26; i += 1) {
    await page.keyboard.press('Tab')
    results.tabStops.push(await page.evaluate(() => {
      const el = document.activeElement
      const rect = el?.getBoundingClientRect()
      return {
        tag: el?.tagName.toLowerCase(),
        name: (el?.getAttribute('aria-label') || el?.textContent || el?.getAttribute('placeholder') || '').replace(/\s+/g, ' ').trim().slice(0, 90),
        rect: rect ? { top: Math.round(rect.top), left: Math.round(rect.left), width: Math.round(rect.width), height: Math.round(rect.height) } : null,
        outline: el ? getComputedStyle(el).outlineStyle : null,
        shadow: el ? getComputedStyle(el).boxShadow : null,
      }
    }))
  }
} catch (error) {
  results.errors.push(error.message)
}

await page.close()
await context.close()

const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } })
const mobile = await mobileContext.newPage()
try {
  await ready(mobile)
  await mobile.getByRole('button', { name: /Open menu/i }).click()
  await mobile.waitForTimeout(250)
  results.mobileMenu = {
    opened: await mobile.locator('.navbar__mobile-menu').isVisible(),
    linkCount: await mobile.locator('.navbar__mobile-menu button').count(),
  }
  await mobile.keyboard.press('Escape')
  await mobile.waitForTimeout(250)
  results.mobileMenu.openAfterEscape = await mobile.locator('.navbar__mobile-menu').isVisible().catch(() => false)
  if (!await mobile.locator('.navbar__mobile-menu').isVisible().catch(() => false)) {
    await mobile.getByRole('button', { name: /Open menu/i }).click()
  }
  await mobile.waitForTimeout(150)
  await mobile.locator('.navbar__mobile-menu button').last().click()
  await mobile.waitForTimeout(2200)
  results.mobileMenu.openAfterLinkClick = await mobile.locator('.navbar__mobile-menu').isVisible().catch(() => false)
  results.mobileMenu.bookTop = await mobile.locator('#book').evaluate(el => Math.round(el.getBoundingClientRect().top))
} catch (error) {
  results.mobileMenu = { error: error.message }
}
await mobile.close()
await mobileContext.close()
await browser.close()

await fs.mkdir(outDir, { recursive: true })
await fs.writeFile(path.join(outDir, 'phase1-interaction-qa.json'), JSON.stringify(results, null, 2))
console.log(JSON.stringify(results, null, 2))
