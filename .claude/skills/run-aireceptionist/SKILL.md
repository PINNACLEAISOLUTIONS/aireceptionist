---
name: run-aireceptionist
description: Serve, run, screenshot, and click through the Pinnacle AI Receptionist marketing site (static HTML/CSS/JS, pinnacleaiphoneagent.us). Use when asked to run or start the site, view it, take a screenshot, or test the live-call demo, voice studio, ROI calculator, or contact form.
---

Pinnacle AI Receptionist is a static site (`index.html`, `script.js`, `styles.css`, `assets/`) with no backend or build step. Serve it with `python3 -m http.server` and drive it with `.claude/skills/run-aireceptionist/shot.mjs` (headless Chromium via the global Playwright).

All paths are relative to the repo root.

## Prerequisites

None to install. Python 3 and the preinstalled global Playwright with Chromium at `/opt/pw-browsers/chromium` are enough.

## Run (agent path)

```bash
python3 -m http.server 8080 > /tmp/aireceptionist.log 2>&1 &
timeout 20 bash -c 'until curl -sf localhost:8080/ >/dev/null; do sleep 1; done'

mkdir -p /tmp/shots
node .claude/skills/run-aireceptionist/shot.mjs                         # -> /tmp/shots/home.png (hero)

# Click through the live-call demo and capture the phone panel after the simulation finishes
CLICK='#triggerSimCall' WAIT=15000 ELEMENT='.phone-device' \
  node .claude/skills/run-aireceptionist/shot.mjs 'http://localhost:8080/#live-demo' /tmp/shots/call.png

lsof -ti:8080 -sTCP:LISTEN | xargs -r kill       # stop
```

`shot.mjs` takes `[url] [out.png]` and these env vars:

| var | effect |
|---|---|
| `CLICK` | selector to click after load (e.g. `button.scenario-btn[data-scenario="hvac"]`, `#triggerSimCall`) |
| `WAIT` | ms to wait after the click (default 800; the call simulation needs ~15000) |
| `ELEMENT` | screenshot just this element instead of the viewport |
| `FULL=1` | full-page screenshot |

It prints the title, the screenshot path, and any console errors or failed requests.

## Gotchas

- **Use `ELEMENT=` for anything below the fold.** After clicking, the page scrolls and the sticky nav covers the top of a viewport screenshot. A viewport shot taken after `#triggerSimCall` showed the Voice Studio section, not the phone.
- **The call demo is scripted, not a real call.** It plays a fixed dental-clinic chat and ends with the "Appointment confirmed & SMS dispatch sent!" badge. The Vapi, ElevenLabs and OpenAI voice names in the Voice Studio are labels in `script.js`, with no live API calls.
- **The contact form posts to FormSubmit** (`https://formsubmit.co/ajax/...` in `script.js`), which is blocked in this sandbox. Don't submit it expecting a real send.
- **Expected console noise:** Google Fonts fails with `ERR_CERT_AUTHORITY_INVALID` because the sandbox proxy blocks external fonts, so the page falls back to system fonts.

## Test

There is no test suite in this repo.

## Troubleshooting

- **Port already in use**: `lsof -ti:8080 -sTCP:LISTEN | xargs -r kill`, then restart.
