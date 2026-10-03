// Usage: [CLICK='sel'] [WAIT=ms] [FULL=1] [ELEMENT='sel'] node shot.mjs [url] [out.png]   (uses the globally installed playwright)
// Loads the page in headless Chromium, prints title, console errors / failed requests, saves a screenshot.
import { createRequire } from 'module';
import { execSync } from 'child_process';
const require = createRequire(execSync('npm root -g').toString().trim() + '/');
const { chromium } = require('playwright');
const url = process.argv[2] || 'http://localhost:8080/';
const out = process.argv[3] || '/tmp/shots/home.png';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const problems = [];
page.on('console', m => m.type() === 'error' && problems.push('console: ' + m.text()));
page.on('pageerror', e => problems.push('pageerror: ' + e.message));
page.on('requestfailed', r => problems.push('failed: ' + r.url()));
page.on('response', r => r.status() >= 400 && problems.push(`${r.status()}: ${r.url()}`));
await page.goto(url, { waitUntil: 'networkidle' });
if (process.env.CLICK) { await page.click(process.env.CLICK); await page.waitForTimeout(+process.env.WAIT || 800); }
if (process.env.ELEMENT) await page.locator(process.env.ELEMENT).screenshot({ path: out });
else await page.screenshot({ path: out, fullPage: !!process.env.FULL });
console.log('title:', await page.title());
console.log('screenshot:', out);
console.log(problems.length ? problems.join('\n') : 'no console errors');
await browser.close();
