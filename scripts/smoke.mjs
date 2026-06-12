import { spawn } from 'node:child_process'
import { chromium } from 'playwright'

const baseUrl = 'http://127.0.0.1:4173/MauiMusicLessons/'
const server = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], {
  stdio: ['ignore', 'pipe', 'pipe'],
})

let output = ''
server.stdout.on('data', chunk => { output += chunk.toString() })
server.stderr.on('data', chunk => { output += chunk.toString() })

function waitForServer() {
  return new Promise((resolve, reject) => {
    const started = Date.now()
    const timer = setInterval(async () => {
      if (Date.now() - started > 15000) {
        clearInterval(timer)
        reject(new Error(`Timed out waiting for Vite.\n${output}`))
        return
      }

      try {
        const response = await fetch(baseUrl)
        if (response.ok) {
          clearInterval(timer)
          resolve()
        }
      } catch {
        // Server is still starting.
      }
    }, 250)
  })
}

async function checkViewport(browser, viewport) {
  const page = await browser.newPage({ viewport })
  const consoleMessages = []
  const badResponses = []
  const failedRequests = []

  page.on('console', msg => {
    if (['error', 'warning'].includes(msg.type())) consoleMessages.push(`${msg.type()}: ${msg.text()}`)
  })
  page.on('response', response => {
    if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`)
  })
  page.on('requestfailed', request => {
    failedRequests.push(`${request.method()} ${request.url()} ${request.failure()?.errorText ?? ''}`)
  })

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1000)

  const result = await page.evaluate(() => {
    const brokenImages = [...document.images]
      .filter(img => img.complete && img.naturalWidth === 0)
      .map(img => img.currentSrc || img.src)
    const unnamedControls = [...document.querySelectorAll('button,a,input,[role="slider"]')]
      .filter(el => !((el.getAttribute('aria-label') || el.getAttribute('aria-valuetext') || el.textContent || el.getAttribute('placeholder') || '').trim()))
      .map(el => el.outerHTML.slice(0, 120))

    return {
      h1: document.querySelector('h1')?.textContent?.trim() ?? '',
      widthOverflow: document.body.scrollWidth > window.innerWidth,
      brokenImages,
      unnamedControls,
      hasAboutSlider: Boolean(document.querySelector('#about [role="slider"][tabindex="0"]')),
    }
  })

  await page.close()

  return {
    name: `${viewport.width}x${viewport.height}`,
    ...result,
    consoleMessages,
    badResponses,
    failedRequests,
  }
}

try {
  await waitForServer()
  const browser = await chromium.launch({ headless: true })
  const results = [
    await checkViewport(browser, { width: 1440, height: 900 }),
    await checkViewport(browser, { width: 390, height: 844 }),
  ]
  await browser.close()

  const failures = results.flatMap(result => {
    const messages = []
    if (result.h1 !== 'Guitar & Ukulele Lessons on Maui') messages.push(`${result.name}: unexpected H1 "${result.h1}"`)
    if (result.widthOverflow) messages.push(`${result.name}: horizontal overflow`)
    if (!result.hasAboutSlider) messages.push(`${result.name}: About slider semantics missing`)
    if (result.brokenImages.length) messages.push(`${result.name}: broken images ${result.brokenImages.join(', ')}`)
    if (result.unnamedControls.length) messages.push(`${result.name}: unnamed controls ${result.unnamedControls.join(', ')}`)
    if (result.consoleMessages.length) messages.push(`${result.name}: console messages ${result.consoleMessages.join(', ')}`)
    if (result.badResponses.length) messages.push(`${result.name}: bad responses ${result.badResponses.join(', ')}`)
    if (result.failedRequests.length) messages.push(`${result.name}: failed requests ${result.failedRequests.join(', ')}`)
    return messages
  })

  if (failures.length) {
    console.error(failures.join('\n'))
    process.exitCode = 1
  } else {
    console.log('Smoke checks passed')
  }
} finally {
  server.kill()
}
