# Verification history

## Latest browser verification (24 October 2026)
- 25 unit/API/matching/OCR tests pass; production build passes.
- Playwright 1.62.1 is declared and locked.
- Browser suite (`tests/e2e/browser.e2e.cjs`, 7 checks; the full WebKit pass count was not recorded) ran on the owner's machine in **Chromium and WebKit** and produced screenshots for every screenshot-bearing check in `artifacts/screenshots/` (Ammu example, two unknown products → "Cannot assess", printed-label OCR, Bangla). Screenshots are only written when a check passes.
- The same suite was re-run independently in headless Chromium against a fresh build: 7/7 passed.
- `npm run demo` produced `artifacts/demo/DoseCheck-demo.webm` (94 s, captioned, synthetic data).
- Not yet verified: physical phones, real medicine-box photos, the live deployment, Bangla speech voices, pharmacist review.

## Historical checks of the earlier server-backed version
The notes below describe the earlier 13-product server-backed version, not verification of the current browser-only OCR implementation.

# DoseCheck verification (24 October 2026, v0.4.1)

## Automated
- `npm test`: 25 passing. Covers the SQLite catalogue, API validation, exact-ingredient matching, salt-form normalisation, WHO-family matching (and no double-reporting), the Ammu scenario, cross-manufacturer paracetamol, search, OCR candidate variants, and Node OCR on a synthetic label.
- `npm run test:e2e` (headless Chromium, static build served under a sub-path like GitHub Pages): 7 passing.
  - Ammu example → 2 findings, hidden esomeprazole, NSAID family.
  - 2 unknown products → "Cannot assess" (never the clear style).
  - 1 known + 1 unknown → "Cannot assess".
  - 2 known with no overlap + 1 unknown → "Comparison incomplete" (not clear).
  - **Browser** OCR on the synthetic label suggests Ace Plus, adds nothing automatically, and makes **no third-party requests** (worker, WASM core and model all same-origin).
  - Blocked model download → recoverable "Could not read this photo" message; button re-enabled.
  - Bangla switch translates the result.
- Docker build stage reproduced outside Docker (same files copied, `npm ci --ignore-scripts && npm run build`): succeeds. The Docker image itself was not built in this environment.

## Not yet verified
Safari/WebKit and physical phones, **real medicine-box photos**, installed Bangla speech voices, GitHub Pages/Vercel deployment, pharmacist review, and user testing.
